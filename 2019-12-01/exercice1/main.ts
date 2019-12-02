import * as fs from 'fs';
import * as readline from 'readline';

const dataStream = readline.createInterface({
  input: fs.createReadStream('2019-12-01/exercice1/input.txt'),
});

let sumModules = 0;
dataStream.on('line', (moduleWeight: string) => {
  const formattedWeigth = parseInt(moduleWeight, 10);
  const requiredFuel = Math.floor(formattedWeigth / 3) - 2;
  sumModules += requiredFuel;
});

dataStream.on('close', () => {
    console.log(sumModules);
});
