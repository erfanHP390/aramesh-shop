import connectToDB from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import UserModel from "@/models/User";
import ProductModel from "@/models/Product";
import mongoose from 'mongoose';

export async function POST(req) {
    connectToDB();

    try {
        const body = await req.json();
        const { user, product } = body;

        if (!user || !product) {
            return Response.json({ message: "user/product must have something" }, {
                status: 400
            });
        }

        // Use 'new' with ObjectId
        const userId = mongoose.Types.ObjectId.isValid(user) ? new mongoose.Types.ObjectId(user) : null;
        const productId = mongoose.Types.ObjectId.isValid(product) ? new mongoose.Types.ObjectId(product) : null;

        if (!userId) {
            return Response.json({ message: "Invalid user ID" }, {
                status: 422
            });
        }

        if (!productId) {
            return Response.json({ message: "Invalid product ID" }, {
                status: 422
            });
        }

        const isValidUser = await UserModel.findOne({ _id: userId });
        if (!isValidUser) {
            return Response.json({ message: "user not found!" }, {
                status: 404
            });
        }

        const isValidProduct = await ProductModel.findOne({ _id: productId });
        if (!isValidProduct) {
            return Response.json({ message: "product not found!" }, {
                status: 404
            });
        }


        const wish = await WishlistModel.findOne({user , product})

        if(!wish) {
            await WishlistModel.create({ user: userId, product: productId }); 
        }


        return Response.json({ message: "product added wishlist successfully" }, {
            status: 201
        });

    } catch (err) {
        return Response.json({ message: `interval error server: ${err}` }, {
            status: 500
        });
    }
}