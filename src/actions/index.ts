"use server";

import Post from "@/app/config/models/Post";
import conectDB from "@/app/config/mongoose";
import { revalidatePath } from "next/cache";

export async function getListPost(limit: number, page: number) {
  await conectDB();
  const res = await fetch(
    `http://localhost:3000/post/api?limit=${limit}&page=${page}`,
    {
      next: { tags: ["list-post"], revalidate: 2 },
    }
  );

  const data = await res.json();
  const totalsPages = data?.meta.totalPages;

  return {
    data: data.data,
    totalsPages,
  };
}

export async function createPost(preState: any, data: FormData) {
  const title = data.get("title");
  const description = data.get("description");

  const exitedTitle = await Post.findOne({ title });

  if (!exitedTitle) {
    await Post.create({ title: title, description: description });
    revalidatePath("list-post");
    return {
      message: "Successfully",
    };
  }
  return {
    message: "The post title is existing",
  };
  //   const res = await fetch(`http://localhost:3000/post/api`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       title,
  //       description,
  //     }),
  //   });
  //   const response = await res.json();
  //   revalidatePath("list-post");
  //   return response;
}

export const deletePost = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/post/api/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    revalidatePath("list-post");
    return data;
  } catch (error) {
    console.log(error);
  }
};
