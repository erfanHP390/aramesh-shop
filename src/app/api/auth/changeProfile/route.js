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
