import chalk from "chalk";
import fig from "figures";

const { red, yellow, green, magenta, cyanBright } = chalk;
const { lozengeOutline } = fig;

export const Red = (strText) => red(strText);
export const Yellow = (strText) => yellow(strText);
export const Green = (strText) => green(strText);
export const Purple = (strText) => magenta(strText);
export const Cyan = (strText) => cyanBright(strText);

const gem = Purple(lozengeOutline);

export const Decor = (txt) =>
  `${gem + gem + gem + Cyan(` ${txt} `) + gem + gem + gem}`;
