import connectToDB from "@/configs/db";
import DepartmentModel from "@/models/Department";
import { authAdmin } from "@/utils/authUserLink";

export async function POST(req) {
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
    const { title } = body;

    if (!title) {
      return Response.json(
        { message: "please fill all fields" },
        {
          status: 400,
        }
      );
    }

    await DepartmentModel.create({ title });

    return Response.json(
      { message: "department is created successfully" },
      {
        status: 201,
      }
    );
  } catch (err) {
    return Response.json(
      { message: `interval error server => ${err}` },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  connectToDB();

  const departments = await DepartmentModel.find({});

  return Response.json(departments);
}
