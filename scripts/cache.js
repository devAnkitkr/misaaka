const axios = require('axios');
const fs = require('fs');

async function getAllProductsList() {
  try {
    const products = await axios.get(`${process.env.BASE_URL}/api/seed`);
    console.log(process.env.BASE_URL, products);
    return products;
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  const { data } = await getAllProductsList();
  const newData = JSON.stringify(data);
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
