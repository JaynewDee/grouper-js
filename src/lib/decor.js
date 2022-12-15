import chalk from "chalk";
import fig from "figures";

const { red, yellow, green, magenta, cyanBright } = chalk;
const { lozengeOutline } = fig;

const R = (strText) => red(strText);
const Y = (strText) => yellow(strText);
const G = (strText) => green(strText);
const P = (strText) => magenta(strText);
const C = (strText) => cyanBright(strText);

const gem = P(lozengeOutline);

export const Decor = (txt) =>
  `${gem + gem + gem + C(` ${txt} `) + gem + gem + gem}`;
