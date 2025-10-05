import connectToDB from "@/configs/db";
import { isValidObjectId } from "mongoose";
import ProductModel from "@/models/Product";
import { authAdmin } from "@/utils/authUserLink";
import { unlink } from "fs/promises";
import path from "path";
import { URL } from "url";

export async function DELETE(req, { params }) {
  try {
    connectToDB();
    const admin = await authAdmin();
    if (!admin) {
      return Response.json(
        { message: "this route is protected" },
        {
          status: 401,
        }
      );
    }

    if (
      admin.name === "ادمین" &&
      admin.email === "admin@email.com" &&
      admin.phone === "09991111212"
    ) {
      return Response.json(
        { message: "this route is protected" },
        { status: 403 }
      );
    } else {
      const id = params.id;

      if (!id) {
        return Response.json(
          { message: "id must sent" },
          {
            status: 400,
          }
        );
      }

      if (!isValidObjectId(id)) {
        return Response.json(
          { message: "id is not valid" },
          {
            status: 422,
          }
        );
      }

      const isExistProduct = await ProductModel.findOne({ _id: id });

      if (!isExistProduct) {
        return Response.json(
          { message: "product is not found" },
          {
            status: 404,
          }
        );
      }

      // delete image from uploads-file
      if (isExistProduct.img) {
        try {
          // extract from url-address
          const imgUrl = new URL(isExistProduct.img);
          const filePath = path.join(process.cwd(), "public", imgUrl.pathname);

          await unlink(filePath);
          console.log(`img is deleted successfully: ${filePath}`);
        } catch (err) {
          console.error(`err in delete img: ${err.message}`);
        }
      }

      await ProductModel.findOneAndDelete({ _id: id });

      return Response.json(
        { message: "product is deleted successfully" },
        { status: 200 }
      );
    }
  } catch (err) {
    return Response.json(
      { message: `interval error server for create product => ${err}` },
      {
        status: 500,
      }
    );
  }
}
