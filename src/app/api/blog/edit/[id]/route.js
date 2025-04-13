import connectToDB from "@/configs/db";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import BlogModel from "@/models/Blog";
import { isValidObjectId } from "mongoose";
import { authAdmin, authUser } from "@/utils/authUserLink";

export async function PUT(req, { params }) {
  try {

    const admin = await authAdmin()
    if(!admin) {
      return Response.json({message: "this route is protected"} , {
        status: 401
      })
    }

    connectToDB();

    const id = params.id;

    // اعتبارسنجی ID
    if (!id) {
      return Response.json(
        { message: "id is required" },
        { status: 400 }
      );
    }

    if (!isValidObjectId(id)) {
      return Response.json(
        { message: "id is not valid" },
        { status: 422 }
      );
    }

    const formData = await req.formData();
    const titr = formData.get("titr");
    const title = formData.get("title");
    const shortDesc = formData.get("shortDesc");
    const author = formData.get("author");
    const description = formData.get("description");
    const img = formData.get("img");
    const updatedAt = formData.get(new Date())

    // ابتدا محصول موجود را پیدا کنید
    const existingBlog = await BlogModel.findOne({_id: id});
    if (!existingBlog) {
      return Response.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const updateData = {
      titr: titr || existingBlog.titr,
      title: title || existingBlog.title,
      shortDesc: shortDesc || existingBlog.shortDesc,
      description: description || existingBlog.description,
      author: author || existingBlog.author,
      img: img || existingBlog.img,
      updatedAt: updatedAt || existingBlog.updatedAt,
    };

    if (img && img.size > 0) {
      if (existingBlog.img) {
        try {
          const imgUrl = new URL(existingBlog.img);
          const filePath = path.join(process.cwd(), "public", imgUrl.pathname);
          await unlink(filePath);
          console.log(`تصویر قدیمی با موفقیت حذف شد: ${filePath}`);
        } catch (err) {
          console.error(`خطا در حذف تصویر قدیمی: ${err.message}`);
        }
      }

      const buffer = Buffer.from(await img.arrayBuffer());
      const filename = Date.now() + img.name;
      const imgPath = path.join(process.cwd(), "public/uploads/" + filename);
      await writeFile(imgPath, buffer);

      updateData.img = `http://localhost:3000/uploads/${filename}`;
    }

    await BlogModel.findByIdAndUpdate(id, updateData, { new: true });

    return Response.json({ 
      message: "blog is updated successfully",
    });

  } catch (err) {
    return Response.json(
      { message: `interval err server: ${err.message}` },
      { status: 500 }
    );
  }
}