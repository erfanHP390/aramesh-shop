import connectToDB from "@/configs/db";
import CommentBlogModel from "@/models/CommentBlog"
import { authAdmin } from "@/utils/authUserLink";
import { isValidObjectId } from "mongoose";

export async function PUT(req) {
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

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return Response.json(
        { message: "id have send" },
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

    await CommentBlogModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isAccept: true,
        },
      }
    );

    return Response.json({ message: "is accepted by admin successfully" });
  } catch (err) {
    return Response.json(
      { message: `interval error server => ${err.message}` },
      {
        status: 500,
      }
    );
  }
}
