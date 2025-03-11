"use client"
import styles from "@/styles/p-user/sendTicket.module.css"
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";


function SendTicket() {

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
        <select>
          <option  value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
          
          {subDepartments.map((subDepartment) => (
              <option value={subDepartment._id}>{subDepartment.title}</option>
            ))}
        </select>
      </div>
      <div className={styles.group}>
        <label>عنوان تیکت را وارد کنید:</label>
        <input placeholder="عنوان..." type="text" />
      </div>
      <div className={styles.group}>
        <label>سطح اولویت تیکت را انتخاب کنید:</label>
        <select>
          <option>لطفا یک مورد را انتخاب نمایید.</option>
          <option value="3">کم</option>
          <option value="2">متوسط</option>
          <option value="1">بالا</option>
        </select>
      </div>
    </div>
    <div className={styles.group}>
      <label>محتوای تیکت را وارد نمایید:</label>
      <textarea rows={10}></textarea>
    </div>
    <div className={styles.uploader}>
      <span>حداکثر اندازه: 6 مگابایت</span>
      <span>فرمت‌های مجاز: jpg, png.jpeg, rar, zip</span>
      <input type="file" />
    </div>

    <button className={styles.btn}>
      <IoIosSend />
      ارسال تیکت
    </button>
  </main>
  )
}

export default SendTicket
