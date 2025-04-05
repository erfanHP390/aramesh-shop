import connectToDB from "@/configs/db";
import { isValidObjectId } from "mongoose";
import CommentModel from "@/models/Comment";
import { validateEmail } from "@/utils/auth";

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

    const comment = await CommentModel.findOne({ _id: id });

    if (!comment) {
      return Response.json(
        { message: "comment not found" },
        {
          status: 404,
        }
      );
    }

    await CommentModel.findOneAndDelete({ _id: id });

    return Response.json({ message: "comment deleted successfully" });
  } catch (err) {
    return Response.json(`interval error server ${err}`, {
      status: 500,
    });
  }
}

export async function PUT(req, { params }) {
  try {
    connectToDB();
    const id = params.id;

    const reqBody = await req.json();
    const { body, email, score, isAccept } = reqBody;

    if (!body || !score) {
      return Response.json(
        { message: "all fields must be filled" },
        { status: 400 }
      );
    }

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      return Response.json(
        { message: "email is not valid" },
        { status: 422 }
      );
    }

    if (!id) {
      return Response.json(
        { message: "id must be sent" },
        { status: 400 }
      );
    }

    if (!isValidObjectId(id)) {
      return Response.json(
        { message: "id is not valid" },
        { status: 422 }
      );
    }

    const comment = await CommentModel.findOne({ _id: id });
    if (!comment) {
      return Response.json(
        { message: "comment is not found" },
        { status: 404 }
      );
    }

    await CommentModel.updateOne(
      { _id: id },
      {
        $set: {
          email,
          body,
          score: score !== undefined ? score : comment.score, // اگر score ارسال نشده از مقدار قبلی استفاده کن
        },
      }
    );

    return Response.json(
      { message: "comment is updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: `interval error server: ${err.message}` },
      { status: 500 }
    );
  }
}
