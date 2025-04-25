import connectToDB from "@/configs/db";
import { isValidObjectId } from "mongoose";
import { authAdmin } from "@/utils/authUserLink";
import BlogModel from "@/models/Blog"
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

    const isExistBlog = await BlogModel.findOne({ _id: id });

    if (!isExistBlog) {
      return Response.json(
        { message: "blog  is not found" },
        {
          status: 404,
        }
      );
    }

        // delete image from uploads file
        if (isExistBlog.img) {
          try {
            // extract file url-address 
            const imgUrl = new URL(isExistBlog.img);
            const filePath = path.join(
              process.cwd(),
              "public",
              imgUrl.pathname
            );
            
            await unlink(filePath);
            console.log(`img is deleted successfully: ${filePath}`);
          } catch (err) {
            console.error(`err in delete: ${err.message}`);
          }
        }

    await BlogModel.findOneAndDelete({ _id: id });

    return Response.json({ message: "blog is deleted successfully" });
  } catch (err) {
    return Response.json(
      { message: `interval error server for create product => ${err}` },
      {
        status: 500,
      }
    );
  }
}
