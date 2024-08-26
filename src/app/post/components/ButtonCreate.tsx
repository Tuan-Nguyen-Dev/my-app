"use client";
import { useFormStatus } from "react-dom";

const ButtonCreate = () => {
  const { pending } = useFormStatus();

  return <button type="submit">{pending ? "Loading Create" : "Create"}</button>;
};

export default ButtonCreate;
