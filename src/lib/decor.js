import chalk from "chalk";
import fig from "figures";

const { red, yellow, green, blue, magenta, cyanBright } = chalk;
const { lozengeOutline } = fig;

const R = (strText) => red(strText);
const G = (strText) => green(strText);
const B = (strText) => blue(strText);
const Y = (strText) => yellow(strText);
const P = (strText) => magenta(strText);
const C = (strText) => cyanBright(strText);

const gem = P(lozengeOutline);

export const TitleDecor = (txt) =>
  `${gem + gem + gem + C(` ${txt} `) + gem + gem + gem}`;
