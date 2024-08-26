import styles from "@/app/page.module.css";
import { pages } from "next/dist/build/templates/app-page";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import conectDB from "../config/mongoose";
import Pagination from "./components/Pagination";
import { revalidatePath } from "next/cache";
import { useFormStatus } from "react-dom";
import ButtonCreate from "./components/ButtonCreate";
import { createPost, getListPost } from "@/actions";
import ItemPost from "./components/ItemPost";
import Form from "./components/Form";

export interface IPost {
  title: string;
  description: string;
  _id: string;
}

export default async function ListPost({ searchParams }: any) {
  const page = searchParams?.page ?? 1;
  const limit = searchParams?.limit ?? 5;
  const posts = await getListPost(limit, page);

  // const [listPost, setListPost] = useState<{
  //   data: IPost[];
  //   totalPages: number;
  // }>({ data: [], totalPages: 0 });

  // const [params, setParams] = useState({
  //   page: 1,
  //   limit: 8,
  // });

  // const [inputState, setInputState] = useState({
  //   title: "",
  //   description: "",
  // });

  // const fetchListPost = async () => {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:3000/post/api?limit=${params.limit}&page=${params.page}`
  //     );
  //     const data = await res.json();
  //     setListPost({
  //       data: data.data,
  //       totalPages: data.meta.totalPages,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleOnChangeInput = (
  //   e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   console.log({ name: e.target.name, valua: e.target.value });
  //   setInputState({
  //     ...inputState,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleCreate = async () => {
  //   try {
  //     const res = await fetch(`http://localhost:3000/post/api`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         ...inputState,
  //       }),
  //     });
  //     const data = await res.json();

  //     console.log("Created data post", data);
  //     if (data) {
  //       fetchListPost();
  //       setInputState({
  //         title: "",
  //         description: "",
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleUpdate = () => {};

  // useEffect(() => {
  //   fetchListPost();
  // }, [params.page]);
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Form />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {posts?.data?.map((post: IPost) => (
          <div key={post._id}>
            <ItemPost item={post} />
          </div>
        ))}
      </div>
      <Pagination
        totalPages={posts.totalsPages}
        currentPage={+page}
        currentLimit={+limit}
      />
    </main>
  );
}
