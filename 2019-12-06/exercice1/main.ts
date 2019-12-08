import * as fs from 'fs';
import * as readline from 'readline';
import { OrbitingObject } from './types';

const dataStream = readline.createInterface({
  input: fs.createReadStream('2019-12-06/exercice1/input.txt'),
});

const orbitingObjects: Map<string, OrbitingObject> = new Map();

dataStream.on('line', (orbit: string) => {
  const objects = orbit.split(')');
  const orbited = objects[0];
  const orbiting = objects[1];

  const orbitedObject: OrbitingObject = orbitingObjects.has(orbited)
    ? (orbitingObjects.get(orbited) as OrbitingObject)
    : {
        name: orbited,
        orbitedBy: [],
      };

  const orbitingObject: OrbitingObject = orbitingObjects.has(orbiting)
    ? (orbitingObjects.get(orbiting) as OrbitingObject)
    : {
        name: orbiting,
        orbitedBy: [],
      };

  orbitedObject.orbitedBy.push(orbitingObject);

  orbitingObjects.set(orbited, orbitedObject);
  orbitingObjects.set(orbiting, orbitingObject);
});

dataStream.on('close', () => {
  const COM = orbitingObjects.get('COM');
  if (COM === undefined) {
    console.log('NO COM...');
  } else {
    console.log(countOrbits(COM, 0));
  }
});

function countOrbits(object: OrbitingObject, deepness: number): number {
  let total = deepness;
  object.orbitedBy.forEach(orbiting => {
    total += countOrbits(orbiting, deepness + 1);
  });
  return total;
}
