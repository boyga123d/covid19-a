import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import { FD, GenMD } from "field-descriptions/lib";
import { FDefaults } from "../constants/variables";
import { StandardEmbed } from "../constants/classes";
import { GetVCVietnamData } from "../constants/functions";
export default class VCVietNamCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      description: "Gets Vietnam Data",
      group: "covidbot",
      memberName: "vcvietnam",
      name: "vcvietnam",
    });
  }
  async run(message: CommandoMessage) {
    const data = await GetVCVietnamData();
    const {
    total
    } = data;
    return message.embed(
      new StandardEmbed({
        title: "Được tạo bởi AP - Do not reup",
        color: "#ED1B24",      
        description: `${GenMD("Thống kê covid 19 tại Việt Nam:", {
          bold: true,
          underline: true,
        })}\n${FD(
          [          
            { name: `Tổng người được tim Vaccine`, value: total.toLocaleString()},

          ],
          FDefaults
        )}`,
        url:
          "https://disease.sh/v3/covid-19/vaccine/coverage/countries/vietnam?lastdays=1&fullData=true",

      })
    );
    }
}
