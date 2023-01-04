import chalk from "chalk";
import fig from "figures";

const { red, yellow, green, blue, magenta, cyanBright } = chalk;
const { lozengeOutline } = fig;

export const Rb = (strText) => red.bold(strText);
export const G = (strText) => green(strText);
export const B = (strText) => blue(strText);
export const Y = (strText) => yellow(strText);
export const P = (strText) => magenta(strText);
export const C = (strText) => cyanBright(strText);

const gem = P(lozengeOutline);

export const TitleDecor = (txt) =>
  `${gem + gem + gem + C(` ${txt} `) + gem + gem + gem}`;

export const ErrorDecor = (errorTxt) =>
  `${gem + gem + gem + Y(` ${errorTxt} `) + "\n" + gem + gem + gem}`;
