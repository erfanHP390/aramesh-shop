import connectToDB from "@/configs/db";
import { authAdmin } from "@/utils/authUserLink";
import OrderModel from "@/models/Orders";
import { isValidObjectId } from "mongoose";
import ProductModel from "@/models/Product";
const mongoose = require("mongoose");

export async function PUT(req, { params }) {
  try {
    connectToDB();

    const admin = await authAdmin();
    if (!admin) {
      return Response.json(
        { message: "This route is protected" },
        { status: 401 }
      );
    }

    const { id } = params;
    if (!id) {
      return Response.json(
        { message: "Order ID is required" },
        { status: 400 }
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

    const body = await req.json();

    const {
      firstName,
      lastName,
      company,
      province,
      city,
      address,
      postCode,
      mobile,
      email,
      description,
      totalPrice,
      postPrice,
      basket,
      products,
      orderCode,
      isPay,
    } = body;

    const existingOrder = await OrderModel.findOne({ _id: id });
    if (!existingOrder) {
      return Response.json({ message: "Order not found" }, { status: 404 });
    }

    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          firstName: firstName || existingOrder.firstName,
          lastName: lastName || existingOrder.lastName,
          company: company || existingOrder.company,
          province: province || existingOrder.province,
          city: city || existingOrder.city,
          address: address || existingOrder.address,
          postCode: postCode || existingOrder.postCode,
          mobile: mobile || existingOrder.mobile,
          email: email || existingOrder.email,
          description: description || existingOrder.description,
          totalPrice: totalPrice || existingOrder.totalPrice,
          postPrice: postPrice || existingOrder.postPrice,
          basket: basket || existingOrder.basket,
          products: products || existingOrder.products,
          orderCode: orderCode || existingOrder.orderCode,
          isPay: isPay || existingOrder.isPay,
        },
      },
      { new: true }
    );

    if (existingOrder.basket && Array.isArray(existingOrder.basket)) {
      for (const item of existingOrder.basket) {
        const productId = item.id;
        const count = item.count;

        if (mongoose.Types.ObjectId.isValid(productId)) {
          await ProductModel.findByIdAndUpdate(
            productId,
            { $inc: { uses: -count } },
            { new: true }
          );
        }
      }
    }

    if (basket && Array.isArray(basket)) {
      for (const item of basket) {
        const productId = item.id;
        const count = item.count;

        if (mongoose.Types.ObjectId.isValid(productId)) {
          await ProductModel.findByIdAndUpdate(
            productId,
            { $inc: { uses: count } },
            { new: true }
          );
        }
      }
    }

    for (const item of basket) {
      const productId = item.id;
      const count = item.count;

      if (!mongoose.Types.ObjectId.isValid(productId)) continue;

      const product = await ProductModel.findById(productId);
      if (!product) continue;

      const currentUses = product.uses;
      const prevCount =
        existingOrder.basket.find((p) => p.id === item.id)?.count || 0;
      const newUses = currentUses - prevCount + count;

      if (newUses > product.stock) {
        return Response.json(
          {
            message: `محصول ${product.title} بیش از موجودی انبار انتخاب شده است.`,
          },
          { status: 419 }
        );
      }
    }

    return Response.json(
      { message: "Order updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating order:", err);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
