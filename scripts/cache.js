const axios = require('axios');
const fs = require('fs');

async function getAllProductsList() {
  try {
    const products = await axios.get(`${process.env.BASE_URL}/api/seed`);
    return products;
  } catch (error) {
    console.log('my error', error);
  }
}

(() => {
  const fetchData = getAllProductsList();
  const newData = JSON.stringify(fetchData.data);
  const fileContents = `export const products = ${newData}`;
  try {
    fs.readdirSync('cache');
  } catch (e) {
    fs.mkdirSync('cache');
  }

  fs.writeFile('cache/data.js', fileContents, function (err) {
    // writing to the cache/data.js file
    if (err) return console.log(err);
    console.log("Products's name, slug and category cached.");
  });
})();
