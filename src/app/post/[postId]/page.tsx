"use client";
import styles from "@/app/page.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { IPost } from "../page";

export default function PostDetails({
  params,
}: {
  params: { postId: string };
}) {
  const postId = params.postId;
  const [dataPost, setDataPost] = useState<IPost>();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [inputState, setInputState] = useState({
    title: "",
    description: "",
  });

  const fetchDetailsPost = async () => {
    try {
      const res = await fetch(`http://localhost:3000/post/api/${postId}`);

      const data = await res.json();
      console.log("Checking post data", data);
      setDataPost(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log({ name: e.target.name, valua: e.target.value });
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdatePost = async () => {
    try {
      const res = await fetch(`http://localhost:3000/post/api/${postId}`, {
        method: "PUT",
        body: JSON.stringify({
          ...inputState,
        }),
      });
      const data = await res.json();

      console.log("Created data post", data);
      if (data) {
        fetchDetailsPost();
        setIsEdit(false);
        setInputState({
          title: "",
          description: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchDetailsPost();
    }
  }, [postId]);

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
      <h1>Details Post</h1>
      <h2>
        Title:{" "}
        {isEdit ? (
          <input
            type="text"
            name="title"
            onChange={handleOnChangeInput}
            id="title"
            value={inputState.title}
          />
        ) : (
          <span>{dataPost?.title}</span>
        )}
      </h2>
      <h3>
        Descripton:{" "}
        {isEdit ? (
          <input
            type="text"
            name="description"
            onChange={handleOnChangeInput}
            id="description"
            value={inputState.description}
          />
        ) : (
          <span>{dataPost?.description}</span>
        )}
      </h3>

      {isEdit ? (
        <button onClick={handleUpdatePost}>Edit Post</button>
      ) : (
        <button
          onClick={() => {
            setIsEdit(true);
            setInputState({
              title: dataPost?.title || "",
              description: dataPost?.description || "",
            });
          }}
        >
          Edit Post
        </button>
      )}
    </main>
  );
}
