import * as fs from 'fs';
import * as readline from 'readline';

const dataStream = readline.createInterface({
  input: fs.createReadStream('2019-12-02/exercice2/input.txt'),
});

let input: string;

let codes: string[] = [];
dataStream.on('line', (program: string) => {
  input = program;
  console.log(loop());
});

function loop(): {noun: number, verb: number} {
  for (let noun = 0; noun <= 99; noun++){
    for (let verb = 0; verb <= 99; verb++){
      if (searchForNounAndVerb(noun, verb)){
        return{noun, verb};
      }
    }
  }
  return {noun: -1, verb: -1};
}

function searchForNounAndVerb(noun: number, verb: number): boolean {
  codes = input.split(',');
  // Restore gravity assist program
  codes[1] = `${noun}`;
  codes[2] = `${verb}`;
  // Go through the program
  let position = 0;
  while (codes[position] !== '99'){
    const index1 = parseInt(codes[position + 1], 10);
    const index2 = parseInt(codes[position + 2], 10);
    const index3 = parseInt(codes[position + 3], 10);
    let result;
    if (codes[position] === '1'){
      result = parseInt(codes[index1], 10) + parseInt(codes[index2], 10);
    }
    if (codes[position] === '2'){
      result = parseInt(codes[index1], 10) * parseInt(codes[index2], 10);
    }
    codes[index3] = `${result}`;
    position += 4;
  }

  return codes[0] === '19690720';
}
