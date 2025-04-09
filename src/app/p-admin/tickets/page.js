import AdminPanelLayout from "@/components/layouts/AdminPanelLayout/AdminPanelLayout";
import React from "react";
import styles from "@/components/templates/p-admin/tickets/TicketTable.module.css";
import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import TicketTable from "@/components/templates/p-admin/tickets/TicketTable";
import { authUser } from "@/utils/authUserLink";

const page = async () => {
    connectToDB();
    const tickets = await TicketModel.find({})
      .sort({ _id: -1 })
      .populate("user")
      .populate("department")
      .populate("subDepartment")
      .lean();

      const user =await authUser()
  
    return (
      <AdminPanelLayout>
        <main>
          {tickets.length === 0 ? (
            <p className={styles.empty}>تیکتی وجود ندارد</p>
          ) : (
            <TicketTable
              tickets={JSON.parse(JSON.stringify(tickets))}
              title="لیست تیکت ها"
              email={user.email}
              phone={user.phone}
            />
          )}
        </main>
      </AdminPanelLayout>
    );
  };
  
  export default page;
  