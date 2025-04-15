"use client"
import styles from "@/styles/p-user/sendTicket.module.css"
import { swalAlert, toastSuccess } from "@/utils/helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";


function SendTicket() {

  const router = useRouter()
    const [title , setTitle] = useState("")
    const [body , setBody] = useState("")
    const [departments , setDepartments] = useState([])
    const [subDepartments , setSubDepartments] = useState([])
    const [departmentID , setDepartmentID] = useState(-1)
    const [subDepartmentID , setSubDepartmentID] = useState(-1)
    const [priority , setPriority] = useState(1)

    useEffect(() => {

        const getDepartments = async () => {
            const res = await fetch("/api/departments")
            const data =await res.json()
            setDepartments(data);
        }

        getDepartments()
    } , [])

    useEffect(() => {

        const getSubDepartments = async () => {
            const res = await fetch(`/api/departments/sub/${departmentID}`)
            if(res.status === 200) {
                const data =await res.json()
                setSubDepartments(data);
            }
        }

        getSubDepartments()
    } , [departmentID])


    const sendTicket = async () => {

      if(!title || !body || !departmentID || !subDepartmentID || !priority) {
        swalAlert("لطفا تمامی موارد را پر کنید"  , "error" , "فهمیدم")
      }

      const ticket = {
        title,body,department: departmentID , subDepartment: subDepartmentID , priority
      }

      const res = await fetch("/api/ticket" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          },
          body: JSON.stringify(ticket)
      })

      if(res.status === 201) {
        toastSuccess(
          "تیکت شما  با موفقیت انجام شد",
          "top-center",
          5000,
          false,
          true,
          true,
          true,
          undefined,
          "colored"
        );
          router.replace("/p-user/tickets")
      }


    }

  return (
    <main className={styles.container}>
    <h1 className={styles.title}>
      <span>ارسال تیکت جدید</span>
      <Link href="/p-user/tickets"> همه تیکت ها</Link>
    </h1>

    <div className={styles.content}>
      <div className={styles.group}>
        <label>دپارتمان را انتخاب کنید:</label>
        <select  onChange={(event => setDepartmentID(event.target.value))} >
          <option  value={-1}>لطفا دپارتمان را انتخاب نمایید.</option>

          {departments.map((department) => (
              <option value={department._id}>{department.title}</option>
            ))}

        </select>
      </div>
      <div className={styles.group}>
        <label>نوع تیکت را انتخاب کنید:</label>
        <select  onChange={(event) => setSubDepartmentID(event.target.value)}>
          <option  value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
          
          {subDepartments.map((subDepartment) => (
              <option value={subDepartment._id}>{subDepartment.title}</option>
            ))}
        </select>
      </div>
      <div className={styles.group}>
        <label>عنوان تیکت را وارد کنید:</label>
        <input placeholder="عنوان..." type="text"  value={title}  onChange={(event) => setTitle(event.target.value)}  />
      </div>
      <div className={styles.group}>
        <label>سطح اولویت تیکت را انتخاب کنید:</label>
        <select  onChange={(event) => setPriority(event.target.value)}>
          <option  value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
          <option value={1}>کم</option>
          <option value={2}>متوسط</option>
          <option value={3}>بالا</option>
        </select>
      </div>
    </div>
    <div className={styles.group}>
      <label>محتوای تیکت را وارد نمایید:</label>
      <textarea rows={10}  value={body}  onChange={(event) => setBody(event.target.value)}></textarea>
    </div>
    <div className={styles.uploader}>
      <span>حداکثر اندازه: 6 مگابایت</span>
      <span>فرمت‌های مجاز: jpg, png.jpeg, rar, zip</span>
      <input type="file" />
    </div>

    <button className={styles.btn}  onClick={sendTicket}>
      <IoIosSend />
      ارسال تیکت
    </button>
  </main>
  )
}

export default SendTicket
