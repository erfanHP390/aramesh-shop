import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout";
import React from "react";
import styles from "@/components/templates/p-admin/tickets/TicketTable.module.css";
import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import TicketTable from "@/components/templates/p-admin/tickets/TicketTable";
import { authUser } from "@/utils/authUserLink";
import Title from "@/components/modules/p-user/title/Title";
import { IoTicketOutline } from "react-icons/io5";
import EmptyCart from "@/components/modules/EmptyCart/EmptyCart";

const page = async () => {
  connectToDB();
  const tickets = await TicketModel.find({ isAnswer: false })
    .sort({ _id: -1 })
    .populate("user")
    .populate("department")
    .populate("subDepartment")
    .lean();

  const user = await authUser();

  return (
    <AdminPanelLayout>
      <main>
        <Title title={" تیکت ها"} />
        {tickets.length === 0 ? (
          <>
            <EmptyCart
              icon={<IoTicketOutline />}
              title={"تیکتی وجود ندارد"}
            />
          </>
        ) : (
          <>
          <TicketTable
            tickets={JSON.parse(JSON.stringify(tickets))}
            email={user.email}
            phone={user.phone}
          />
          </>
        )}
      </main>
    </AdminPanelLayout>
  );
};

export default page;
