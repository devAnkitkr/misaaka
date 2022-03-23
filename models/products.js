import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    images: [{ type: String }],
    price: { type: Number, required: true },
    discount: { type: Number },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    features: [{ type: String }],
    isFeatured: { type: Boolean },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
