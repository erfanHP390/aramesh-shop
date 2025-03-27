import connectToDB from "@/configs/db";
import { writeFile } from "fs/promises";
import path from "path";
import BlogModel from "@/models/Blog";

export async function POST(req) {
  try {
    connectToDB();

    const formData = await req.formData();

    const titr = formData.get("titr");
    const title = formData.get("title");
    const author = formData.get("author");
    const description = formData.get("description");
    const shortDesc = formData.get("shortDesc");
    const img = formData.get("img");

    const buffer = Buffer.from(await img.arrayBuffer());
    const filename = Date.now() + img.name;
    const imgPath = path.join(process.cwd(), "public/uploads/blogs" + filename);

    await writeFile(imgPath, buffer);

    if (!titr || !title || !shortDesc || !description || !author) {
      return Response.json(
        { message: "all fields must have something " },
        {
          status: 400,
        }
      );
    }

    if (!img) {
      return Response.json(
        { message: "article has not image" },
        {
          status: 400,
        }
      );
    }

    await BlogModel.create({
      titr,
      title,
      shortDesc,
      description,
      author,
      img: `http://localhost:3000/uploads/blogs/${filename}`,
    });

    return Response.json(
      { message: "article is created successfully" },
      { status: 201 }
    );

    
  } catch (err) {
    return Response.json(
      { message: `interval error server ${err}` },
      {
        status: 500,
      }
    );
  }
}
