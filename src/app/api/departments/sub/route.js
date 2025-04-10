import connectToDB from "@/configs/db";
import SubDepartmentModel from "@/models/SubDepartment";
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
    const { title, department } = body;

    if (!title || !department) {
      return Response.json(
        { message: "please fill all fields" },
        {
          status: 400,
        }
      );
    }

    const isValidDepartment = await DepartmentModel.findOne({
      _id: department,
    });
    if (!isValidDepartment) {
      return Response.json(
        { message: "department is not found" },
        {
          status: 404,
        }
      );
    }

    await SubDepartmentModel.create({ title, department });

    return Response.json(
      { message: "sub-department is created successfully" },
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
