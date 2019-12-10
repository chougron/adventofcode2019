import * as fs from 'fs';
import * as readline from 'readline';

const dataStream = readline.createInterface({
  input: fs.createReadStream('2019-12-08/exercice1/input.txt'),
});

dataStream.on('line', (data: string) => {
  const dataLength = data.length;
  const layerSize = 25 * 6;
  let position = 0;

  let minOccurences: number = Infinity;

  let result: number = 0;
  while (position < dataLength){
    const layer = data.slice(position, position + layerSize);
    position += layerSize;

    const chars = layer.split('');

    let occurences0 = 0, occurences1 = 0, occurences2 = 0;
    chars.forEach(char => {
      if (char === '0'){
        occurences0++;
      } else if (char === '1'){
        occurences1++;
      } else if (char === '2'){
        occurences2++;
      }
    });
    if (occurences0 < minOccurences){
      minOccurences = occurences0;
      result = occurences1 * occurences2;
    }
  }

  console.log(result);
});
