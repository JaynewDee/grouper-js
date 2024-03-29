import chalk from "chalk";
import fig from "figures";

const { yellow, magenta, cyanBright } = chalk;
const { lozengeOutline } = fig;

type Txt = string;

export const Y = (strText: Txt) => yellow(strText);
export const P = (strText: Txt) => magenta(strText);
export const C = (strText: Txt) => cyanBright(strText);

const gem: string = P(lozengeOutline);

export const TitleDecor = (txt: string) =>
  `${gem + gem + gem + C(` ${txt} `) + gem + gem + gem}`;

export const ErrorDecor = (errorTxt: string) =>
  `${gem + gem + gem + Y(` ${errorTxt} `) + "\n" + gem + gem + gem}`;
