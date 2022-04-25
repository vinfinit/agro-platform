require('dotenv').config();

import * as fs from 'fs'
import * as util from 'util'
import parseKml from '../utils/kml'
import * as collection from '../database/collections/clusters'

const id = '6265e885404968271d1801cd';
const inputFile = `/Users/vpudding/Downloads/2021.kml`;

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
