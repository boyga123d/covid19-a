import axios from "axios";
import { stringify } from "querystring";
import { GlobalData, StateData, VietnamData , VCVietnamData } from "./types";

export async function GetStateData(state: string): Promise<StateData> {
  const { data }: { data: StateData } = await axios.get(
    `https://disease.sh/v3/covid-19/states/${state}?${stringify({
      yesterday: false,
      allowNull: false,
    })}`
  );
  return data;
}
export async function GetGlobalData(): Promise<GlobalData> {
  const { data }: { data: GlobalData } = await axios.get(
    "https://disease.sh/v3/covid-19/all?yesterday=false&twoDaysAgo=false&allowNull=false"
  );
  return data;
}
export async function GetVietnamData(): Promise<VietnamData> {
  const { data }: { data: VietnamData } = await axios.get(
    "https://disease.sh/v3/covid-19/countries/Vietnam?yesterday=false&twoDaysAgo=flase&allowNull=false"
  );
  return data;
}
export async function GetVCVietnamData(): Promise<VCVietnamData> {
  const { data }: { data: VCVietnamData } = await axios.get(
    "https://disease.sh/v3/covid-19/vaccine/coverage/countries/vietnam?lastdays=1&fullData=true"
  );
  return data;
}
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export async function GetNationalData(metric: string): Promise<StateData[]> {
  const { data }: { data: StateData[] } = await axios.get(
    `https://disease.sh/v3/covid-19/states?${stringify({
      sort: metric,
      yesterday: false,
      allowNull: false,
    })}`
  );
  return data;
}
