import connectToDB from "@/configs/db";
import OrderModel from "@/models/Orders"


export async function GET(req , {params}) {
    try {
        connectToDB()
        const code = params.code;

        if (!code) {
            return Response.json(
              { message: "must send one code" },
              {
                status: 400,
              }
            );
          }

          const userOrder = await OrderModel.findOne({orderCode: code})

          if (!userOrder) {
            return Response.json(
              { message: "userOrder not found" },
              {
                status: 404,
              }
            );
          }

          return Response.json(userOrder)

    } catch (err) {
        return Response.json(
          { message: `interval error server => ${err}` },
          {
            status: 500,
          }
        );
      }
}