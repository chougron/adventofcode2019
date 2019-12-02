import * as fs from 'fs';
import * as readline from 'readline';

const dataStream = readline.createInterface({
  input: fs.createReadStream('2019-12-01/exercice2/input.txt'),
});

let sumModules = 0;
dataStream.on('line', (moduleWeight: string) => {
  const formattedWeigth = parseInt(moduleWeight, 10);
  const requiredFuel = calculateFuelForWeight(formattedWeigth);
  sumModules += requiredFuel;
});

function calculateFuelForWeight(weight: number): number {
  const requiredFuel = Math.floor(weight / 3) - 2;
  if (requiredFuel < 0){
    return 0;
  }
  if (requiredFuel > 0){
    let fuelForFuel = calculateFuelForWeight(requiredFuel);
    if (fuelForFuel < 0){
      fuelForFuel = 0;
    }
    return requiredFuel + fuelForFuel;
  }
  return requiredFuel;
}

dataStream.on('close', () => {
    console.log(sumModules);
});
