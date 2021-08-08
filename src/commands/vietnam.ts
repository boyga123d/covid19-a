import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import { FD, GenMD } from "field-descriptions/lib";
import { FDefaults } from "../constants/variables";
import { StandardEmbed } from "../constants/classes";
import { GetVietnamData } from "../constants/functions";
export default class VietNamCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      description: "Gets Vietnam Data",
      group: "covidbot",
      memberName: "vietnam",
      name: "vietnam",
    });
  }
  async run(message: CommandoMessage) {
    const data = await GetVietnamData();
    const {
      cases,
      deaths,
      recovered,
      active,
      todayCases,
      todayDeaths,
      todayRecovered,
      updated,
    } = data;
    return message.embed(
      new StandardEmbed({
        title: "Copyright by AP - Do not reup",
        color: "#ED1B24",      
        description: `${GenMD("Thống kê covid 19 tại Việt Nam:", {
          bold: true,
          underline: true,
        })}\n${FD(
          [          
            { name: "Tổng ca mắc Covid 19", value: cases.toLocaleString() },
            { name: "Số trường hợp chết do Covid 19", value: deaths.toLocaleString() },
            { name: "Số trường hợp đã bình phục", value: recovered.toLocaleString() },
            { name: "Đang điều trị ", value: active.toLocaleString() },
          ],
          FDefaults
        )}\n${GenMD("Cập nhật số ca mỗi ngày", { bold: true, underline: true })}\n${FD(
          [
            { name: "Số ca nhiễm mới hôm nay", value: todayCases.toLocaleString() },
            { name: "Số trường hợp tử vong", value: todayDeaths.toLocaleString() },
          
            {
              name: "Số trường hợp đã hồi phục",
              value: todayRecovered.toLocaleString(),
            },
          ],
          FDefaults
        )}`,
        url:
          "https://disease.sh/v3/covid-19/countries/Vietnam?yesterday=false&twoDaysAgo=flase&allowNull=false",
        timestamp: updated,
        footer: { text: "" },
      })
    );
    }
}
