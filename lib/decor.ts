import chalk from "chalk";
import fig from "figures";
import { cursorTo } from "readline";

import ora from "ora";

const { stdout } = process;

const { red, yellow, green, blue, magenta, cyanBright } = chalk;
const { lozengeOutline } = fig;

type Txt = string;

export const Rb = (strText: Txt) => red.bold(strText);
export const G = (strText: Txt) => green(strText);
export const B = (strText: Txt) => blue(strText);
export const Y = (strText: Txt) => yellow(strText);
export const P = (strText: Txt) => magenta(strText);
export const C = (strText: Txt) => cyanBright(strText);

const gem: string = P(lozengeOutline);

export const TitleDecor = (txt: string) =>
  `${gem + gem + gem + C(` ${txt} `) + gem + gem + gem}`;

export const ErrorDecor = (errorTxt: string) =>
  `${gem + gem + gem + Y(` ${errorTxt} `) + "\n" + gem + gem + gem}`;

/////////////////////////////////
/// Terminal "Loading" Spinner
/////////////////////////////////

export const Spinner = (isLoading: boolean) => {

};

// const spinnerStates = ["-", "\\", "|", "/"];

// export const Spinner = (
//   index = 0,
//   states: string[] = spinnerStates,
//   interval: number
// ) => {
//   process.stdout.write("\x1B[?25l");
//   setInterval(() => {
//     let char = states[index];
//     if (index === states.length) {
//       index = 0;
//       char = states[index];
//     }

//     stdout.write(char);

//     cursorTo(stdout, 0, 0);

//     index += 1;
//   }, interval);
// };
