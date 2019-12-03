import * as fs from 'fs';
import * as readline from 'readline';

const dataStream = readline.createInterface({
  input: fs.createReadStream('2019-12-02/exercice1/input.txt'),
});

let codes: string[] = [];
dataStream.on('line', (program: string) => {
  codes = program.split(',');
  // Restore gravity assist program
  codes[1] = '12';
  codes[2] = '2';
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
});

dataStream.on('close', () => {
    console.log(codes[0]);
});
