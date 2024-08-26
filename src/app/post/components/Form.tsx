"use client";
import { createPost } from "@/actions";
import React, { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

const intialState = {
  message: "",
};

const Form = () => {
  const [state, formAction] = useFormState(createPost, intialState);

  const refForm = useRef<HTMLFormElement | null>(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.message) {
      alert(state.message);
    }
  }, [state]);
  return (
    <form
      action={(formData: FormData) => {
        formAction(formData);
        refForm.current?.reset();
      }}
      ref={refForm}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <label htmlFor="title">Description</label>
          <textarea typeof="text" name="description" id="description" />
        </div>
        <button type="submit">{pending ? "Loading Create" : "Create"}</button>;
      </div>
    </form>
  );
};

export default Form;
