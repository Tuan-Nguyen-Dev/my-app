"use client";

import React from "react";
import { IPost } from "../page";
import Link from "next/link";
import { deletePost } from "@/actions";

const ItemPost = ({ item }: { item: IPost }) => {
  return (
    <div key={item._id}>
      <Link href={`/post/${item._id}`}>
        <span>{item.title}</span>
      </Link>
      <button onClick={() => deletePost(item._id)}>X</button>
    </div>
  );
};

export default ItemPost;
