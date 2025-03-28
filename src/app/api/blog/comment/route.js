import connectToDB from "@/configs/db";
import { validateEmail } from "@/utils/auth";
import CommentBlogModel from "@/models/CommentBlog";
import BlogModel from "@/models/Blog";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { name, email, education, description, blogID } = body;

    if (!name  || !email || !description || !blogID || !education) {
      return Response.json(
        { message: "all fields must have something expect score" },
        {
          status: 400,
        }
      );
    }

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      return Response.json(
        { message: "email is not valid" },
        {
          status: 422,
        }
      );
    }

    const commentForBlog =await CommentBlogModel.create({
      name,
      email,
      education,
      description,
      blogID,
    });

    const updatedComment = await BlogModel.findOneAndUpdate(
      { _id: blogID },
      {
        $push: {
          comments: commentForBlog._id,
        },
      }
    );


    return Response.json({message: "comment for blog is created successfully"} , {status: 201})

  } catch (err) {
    return Response.json(
      { message: `interval error server ${err}` },
      {
        status: 500,
      }
    );
  }
}
