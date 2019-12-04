import * as fs from 'fs';
import * as readline from 'readline';

const dataStream = readline.createInterface({
  input: fs.createReadStream('2019-12-03/exercice1/input.txt'),
});

interface Coordinates {
  x: number;
  y: number;
}

const gridMap: Map<string, number[]> = new Map();

const intersections: Coordinates[] = [];
let wireIndex = 0;
dataStream.on('line', (wireInstructions: string) => {
  const instructions = wireInstructions.split(',');

  const coordinates: Coordinates = {x: 0, y: 0};
  instructions.forEach(instruction => {
    const direction = instruction.slice(0, 1);
    const length = parseInt(instruction.slice(1, instruction.length), 10);
    for (let i = 0; i < length; i++){
      switch (direction){
        case 'R':
          coordinates.x++;
          break;
        case 'L':
          coordinates.x--;
          break;
        case 'U':
          coordinates.y++;
          break;
        case 'D':
          coordinates.y--;
          break;
      }
      const index = `${coordinates.x}-${coordinates.y}`;
      if (gridMap.has(index)){
        const lines = gridMap.get(index) as number[];
        if (!lines.includes(wireIndex)){
          lines.push(wireIndex);
          gridMap.set(index, lines);
        }
        if (lines.length > 1){
          intersections.push({x: coordinates.x, y: coordinates.y});
        }
      } else {
        gridMap.set(index, [wireIndex]);
      }
    }

    wireIndex++;
  });
});

dataStream.on('close', () => {
  let closestDistance = Infinity;
  intersections.forEach(coordinates => {
    const distance = Math.abs(coordinates.x) + Math.abs(coordinates.y);
    if (distance < closestDistance){
      closestDistance = distance;
    }
  });
  console.log(closestDistance);
});
