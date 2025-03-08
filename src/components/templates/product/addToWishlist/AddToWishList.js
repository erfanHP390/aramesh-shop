"use client"
import Link from 'next/link';
import React from 'react'
import { CiHeart } from "react-icons/ci";


export default function AddToWishList() {


    const addToWishList = async () => {
        console.log("is run");
        
    }

  return (
        <div onClick={addToWishList}>
          <CiHeart />
          <Link href="/wishlist">افزودن به علاقه مندی ها</Link>
        </div>  )
}
