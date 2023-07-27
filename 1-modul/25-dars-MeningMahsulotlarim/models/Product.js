import { Schema, model, SchemaType } from "mongoose"

const productsSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
})

const Products = model('Products', productsSchema)
export default Products