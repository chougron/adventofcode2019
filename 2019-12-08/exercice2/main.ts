import * as fs from 'fs';
import * as readline from 'readline';

const dataStream = readline.createInterface({
  input: fs.createReadStream('2019-12-08/exercice1/input.txt'),
});

dataStream.on('line', (data: string) => {
  const dataLength = data.length;
  const layerSize = 25 * 6;
  let position = 0;

  const layers: string[][] = [];
  let imageChars: string[] = [];
  while (position < dataLength){
    const layer = data.slice(position, position + layerSize);
    position += layerSize;

    const chars = layer.split('');
    layers.push(chars);
  }

  const layersLength = layers.length;
  imageChars = layers[0];
  for (let i = 1; i < layersLength; i++){
    const currentLayer = layers[i];
    for (let j = 0; j < layerSize; j++){
      if (imageChars[j] === '2'){
        imageChars[j] = currentLayer[j];
      }
    }
  }

  const image = imageChars.map(char => char === '0' ? ' ' : '#').join('');
  for (let i = 0; i < 6; i++){
    console.log(image.slice(i * 25, i * 25 + 25));
  }
});
