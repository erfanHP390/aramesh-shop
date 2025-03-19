import connectToDB from "@/configs/db";
import { isValidObjectId } from "mongoose";
import CommentModel from "@/models/Comment"

export async function DELETE(req, { params }) {
  try {
    connectToDB();
    const id = params.id;

    if (!id) {
      return Response.json(
        { message: "must send one id" },
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

      const comment = await CommentModel.findOne({_id: id})

      if(!comment) {
        return Response.json({message: "comment not found"} , {
          status: 404
        })
      }

      await CommentModel.findOneAndDelete({_id: id})

      return Response.json({message: "comment deleted successfully"})

  } catch (err) {
    return Response.json(`interval error server ${err}`, {
      status: 500,
    });
  }
}
