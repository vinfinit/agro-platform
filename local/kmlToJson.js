import fs from 'fs'
import util from 'util'
import parseKml from '../utils/kml'
import * as collection from '../database/collections/clusters'

const id = '5f06f9a824b6b1f53773589b';
const inputFile = `~/Downloads/2020.kml`;

const saveKmlToDb = async (id, inputFile) => {
  console.log(`Reading ${inputFile}`);
  const kml = await util.promisify(fs.readFile)(inputFile);
  const data = parseKml(kml);

  console.log(`Saving ${data.length} fields to ${id} cluster`);
  const dbRes = await collection.insertFields({
    id,
    fields: data,
  });
  console.log(`Res: ${dbRes}`);
}

saveKmlToDb(id, inputFile);
