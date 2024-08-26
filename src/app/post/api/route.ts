import Post from "@/app/config/models/Post";
import conectDB from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await conectDB();

  try {
    const { title, description } = await req.json();
    const exited = await Post.findOne({ title });
    if (!exited) {
      const newPost = await Post.create({ title, description });
      return NextResponse.json(
        {
          data: newPost,
          message: "Created post successfully",
        },
        { status: 201, statusText: "Created" }
      );
    }
    return NextResponse.json(
      {
        data: null,
        message: "The title post  is already in the database",
      },
      { status: 400, statusText: "Invalid" }
    );
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json(
      {
        data: null,
        message: "Error creating post",
      },
      { status: 400, statusText: "Failed to create post" }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const limit = req.nextUrl.searchParams.get("limit") ?? 8;
    const page = req.nextUrl.searchParams.get("page") ?? 1;

    const totalsPosts = await Post.countDocuments();

    const totalPages = Math.ceil(totalsPosts / +limit);

    const allPosts = await Post.find()
      .skip((+page - 1) * +limit)
      .limit(+limit);
    return NextResponse.json(
      {
        data: allPosts,
        meta: {
          totalPages,
          totalCount: totalsPosts,
        },
        message: "Successfully",
      },
      { status: 201, statusText: "Created" }
    );
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json(
      {
        data: null,
        message: "Error creating post",
      },
      { status: 400, statusText: "Failed to create post" }
    );
  }
}
