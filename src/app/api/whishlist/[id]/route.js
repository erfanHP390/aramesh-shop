import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUserLink";
import WishlistModel from "@/models/Wishlist"


export async function DELETE(req, {params}) {

    console.log("its params id =>>>>>>>",params.id);
    

    
    try {
        connectToDB();
        const user = await authUser();
        if (!user) {
          return Response.json(
            { message: "Please login first !!" },
            { status: 401 }
          );
        }
    
        const productID = params.id;
        await WishlistModel.findOneAndDelete({
          user: user._id,
          product: productID,
        });
    
        return Response.json({ message: "Product removed successfully :))" });
      } catch (err) {
        return Response.json(
          { message: err },
          {
            status: 500,
          }
        );
      }

}