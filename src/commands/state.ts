import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import { stringify } from "query-string";
import { escape } from "querystring";
import { states, FDefaults } from "../constants/variables";
import { FD, GenMD } from "field-descriptions/lib";
import { StandardEmbed } from "../constants/classes";
import { GetStateData } from "../constants/functions";
export default class StateCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      description: "Get Data for specific state",
      group: "covidbot",
      memberName: "state",
      name: "state",
      argsCount: 1,
      args: [
        {
          key: "state",
          prompt: "What State Do You Want The Data For",
          type: "string",
          validate: (state: string) => {
            return states
              .map((state) => {
                return state.toLowerCase();
              })
              .includes(state)
              ? true
              : `Invalid state, Valid states are ${states.join(",")}`;
          },
        },
      ],
    });
  }
  async run(message: CommandoMessage, { state }: { state: string }) {
    const data = await GetStateData(state);
    const {
      state: state2,
      cases,
      deaths,
      recovered,
      tests,
      updated,
      active,
    } = data;
    return message.embed(
      new StandardEmbed({
        title: `Data for ${state2}`,
        url: `https://disease.sh/v3/covid-19/states/${escape(
          state
        )}?${stringify({
          yesterday: false,
          allowNull: false,
        })}`,
        description: `${GenMD("Totals:", {
          bold: true,
          underline: true,
        })}\n${FD(
          [
            { name: "Tổng ca mắc Covid 19", value: cases.toLocaleString() },
            { name: "Số trường hợp chết do Covid 19", value: deaths.toLocaleString() },
            { name: "Số trường hợp đã bình phục", value: recovered.toLocaleString() },
            { name: "Cách ly: ", value: tests.toLocaleString() },
          ],
          FDefaults
        )}\n${GenMD("Daily Changes:", { bold: true, underline: true })}\n${FD(
          [{ name: "Các trường hợp nhiễm mới:", value: active.toLocaleString() }],
          FDefaults
        )}`,
        timestamp: updated,
      })
    );
  }
}
