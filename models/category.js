const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String },
    description: { type: String },
    isFeatured: { type: Boolean },
  },
  { timestamps: true }
);

const Categories =
  mongoose.models.Categories || mongoose.model('Categories', categoriesSchema);

// export default Categories;
module.exports = Categories;
