const axios = require('axios');
const fs = require('fs');
const Categories = require('../models/category');
const Products = require('../models/products');
const db = require('../utils/db');
const data = require('../utils/data');
(async () => {
  try {
    await db.connect();
    await Categories.deleteMany();
    await Categories.insertMany(data.categories);
    await Products.deleteMany();
    await Products.insertMany(data.products);
    const products = await Products.find({});
    await db.disconnect();

    const newProducts = products.map((product) => {
      return {
        name: product.name,
        category: product.category,
        slug: product.slug,
      };
    });
    const newData = JSON.stringify(newProducts);
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
    return products.data;
  } catch (error) {
    console.log('my error', error);
  }
})();
