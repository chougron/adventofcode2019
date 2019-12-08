import * as fs from "fs";
import * as readline from "readline";
import { OpCode, ParameterMode } from "./types";

const dataStream = readline.createInterface({
  input: fs.createReadStream("2019-12-05/exercice1/input.txt")
});

let codes: number[] = [];
const input = 1;
dataStream.on("line", (program: string) => {
  const stringCode = program.split(",");
  codes = stringCode.map(string => parseInt(string, 10));

  // Go through the program
  let position = 0;
  while (true) {
    const { opCode, parameters } = getOpCodeAndParameters(codes[position]);
    if (opCode === OpCode.END) {
      // Break the loop if END
      break;
    }

    switch (opCode) {
      case OpCode.ADD:
        codes[codes[position + 3]] =
          getParameterValue(codes, parameters[0], position + 1) +
          getParameterValue(codes, parameters[1], position + 2);
        position += 4;
        break;
      case OpCode.MULTIPLY:
        codes[codes[position + 3]] =
          getParameterValue(codes, parameters[0], position + 1) *
          getParameterValue(codes, parameters[1], position + 2);
        position += 4;
        break;
      case OpCode.SET:
        codes[codes[position + 1]] = input;
        position += 2;
        break;
      case OpCode.OUTPUT:
        console.log(getParameterValue(codes, parameters[0], position + 1));
        position += 2;
    }
  }
});

function getParameterValue(
  codes: number[],
  parameterMode: ParameterMode | undefined,
  codePosition: number
): number {
  if (parameterMode === ParameterMode.IMMEDIATE) {
    return codes[codePosition];
  }

  return codes[codes[codePosition]];
}

function getOpCodeAndParameters(
  code: number
): { opCode: OpCode; parameters: ParameterMode[] } {
  const opCode = code % 100;
  code = Math.floor(code / 100);

  const parameters: ParameterMode[] = [];
  while (code !== 0) {
    let parameter = code % 10;
    if (parameter !== 0 && parameter !== 1) {
      parameter = 0;
    }
    code = Math.floor(code / 10);
    parameters.push(parameter);
  }
  return { opCode, parameters };
}
