import * as data from '../data/dubrovno_2019.json'
import * as collection from '../database/collections/clusters'

const id = '5d90aa2b9d768a3b165f0c2e';

const saveDataToDb = async (id) => {
  console.log(`Saving ${data.length} circles to ${id} cluster`);
  const dbRes = await collection.insertCircles({
    id,
    circles: data,
  });
  console.log(`Res: ${dbRes}`);
}

saveDataToDb(id);
