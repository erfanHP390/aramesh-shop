import connectToDB from "@/configs/db";
import UserProfileModel from "@/models/UserProfile";
import { isValidObjectId } from "mongoose";
import { unlink } from "fs/promises";
import path from "path";
import { URL } from "url";

export async function DELETE(req, { params }) {
  try {
    connectToDB();

    const id = params.id;

    if (!id) {
      return Response.json(
        { message: "must send one id" },
        { status: 400 }
      );
    }

    if (!isValidObjectId(id)) {
      return Response.json(
        { message: "id is not valid" },
        { status: 422 }
      );
    }

    const isExistProfile = await UserProfileModel.findOne({ user: id });

    if (!isExistProfile) {
      return Response.json(
        { message: "user-Profile not found" },
        { status: 404 }
      );
    }

    // حذف فایل تصویر از سیستم فایل
    if (isExistProfile.img) {
      try {
        // استخراج مسیر فایل از URL
        const imgUrl = new URL(isExistProfile.img);
        const filePath = path.join(
          process.cwd(),
          "public",
          imgUrl.pathname
        );
        
        await unlink(filePath);
        console.log(`تصویر با موفقیت حذف شد: ${filePath}`);
      } catch (err) {
        console.error(`خطا در حذف تصویر: ${err.message}`);
        // حتی اگر حذف فایل با خطا مواجه شد، ادامه دهید
      }
    }

    // حذف رکورد از دیتابیس
    await UserProfileModel.findOneAndDelete({ user: id });

    return Response.json(
      { message: "user-profile is deleted successfully" },
      { status: 200 }
    );

  } catch (err) {
    console.error("Error in DELETE operation:", err);
    return Response.json(
      { message: `Internal server error: ${err.message}` },
      { status: 500 }
    );
  }
}