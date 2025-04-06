import connectToDB from "@/configs/db";
import { writeFile } from "fs/promises";
import path from "path";
import UserProfileModel from "@/models/UserProfile";
import UserModel from "@/models/User"

export async function POST(req) {
  try {
    connectToDB();

    const formData = await req.formData();
    const img = formData.get("img");
    const user = formData.get("user");

    const buffer = Buffer.from(await img.arrayBuffer());
    const filename = Date.now() + img.name;
    const imgPath = path.join(process.cwd(), "public/uploads/" + filename);
    await writeFile(imgPath, buffer);

    if(!user) {
        return Response.json({message: "all fields must have something expect score"} , {
          status: 400
        } )
      }
   
      if(!img) {
        return Response.json({message: "product has not image"} , {
          status: 400
        })
      }

      const isUserExist = await UserModel.findOne({_id: user})
      if(!isUserExist) {
        return Response.json({message: "user not found"} , {
            status: 404
        })
      }

      await UserProfileModel.create({user , img: `http://localhost:3000/uploads/${filename}`})

      return Response.json({message: "user-profile is created successfully"} , {
        status: 201
    })

  } catch (err) {
    return Response.json(
      { message: `interval error server for create product => ${err}` },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req) {

  try {

    connectToDB()

    const formData = await req.formData();
    const img = formData.get("img");
    const user = formData.get("user");

    // Validate inputs
    if (!user) {
      return Response.json(
        { message: "User ID is required" },
        {
          status: 400,
        }
      );
    }

    if (!img) {
      return Response.json(
        { message: "Image is required" },
        {
          status: 400,
        }
      );
    }

    // Check if user exists
    const isUserExist = await UserModel.findOne({ _id: user });
    if (!isUserExist) {
      return Response.json(
        { message: "User not found" },
        {
          status: 404,
        }
      );
    }

    // Process the new image
    const buffer = Buffer.from(await img.arrayBuffer());
    const filename = Date.now() + img.name;
    const imgPath = path.join(process.cwd(), "public/uploads/" + filename);
    await writeFile(imgPath, buffer);

    const newImageUrl = `http://localhost:3000/uploads/${filename}`;

    // Find and update the user profile
    const updatedProfile = await UserProfileModel.findOneAndUpdate(
      { user }, // Find by user ID
      { img: newImageUrl }, // Update the image
      { new: true, upsert: true } // Return the updated document, create if doesn't exist
    );

    return Response.json(
      {
        message: "User profile image updated successfully",
      },
      {
        status: 200,
      }
    );

  } catch (err) {
    return Response.json(
      { message: `interval error server for create product => ${err}` },
      {
        status: 500,
      }
    );
  }

}