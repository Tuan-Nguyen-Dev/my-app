import Post from "@/app/config/models/Post";
import conectDB from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { postId: string } }
) {
  try {
    const id = context.params.postId;

    const postId = await Post.findById(id);
    if (postId) {
      return NextResponse.json(
        {
          data: postId,

          message: "Successfully",
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        data: null,

        message: "The post is not found",
      },
      { status: 400, statusText: "Failed" }
    );
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json(
      {
        data: null,
        message: "Error post",
      },
      { status: 500, statusText: "Failed to create post" }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: { postId: string } }
) {
  try {
    const id = context.params.postId;
    const { title, description } = await req.json();
    const postId = await Post.findById(id);
    if (postId) {
      const exitedTitle = await Post.findOne({ title, _id: { $ne: id } });
      if (!exitedTitle) {
        const updated = await Post.findByIdAndUpdate(
          id,
          { title, description },
          { new: true }
        );

        return NextResponse.json(
          {
            data: updated,

            message: "Successfully",
          },
          { status: 201 }
        );
      }
      return NextResponse.json(
        {
          data: null,

          message: "The title posit is dulicatie",
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        data: null,

        message: "The post is not found",
      },
      { status: 400, statusText: "Failed" }
    );
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json(
      {
        data: null,
        message: "Error post",
      },
      { status: 500, statusText: "Failed to create post" }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { postId: string } }
) {
  try {
    const id = context.params.postId;
    const postId = await Post.findById(id);
    if (postId) {
      const deleteId = await Post.findByIdAndDelete(id, { new: true });
      return NextResponse.json(
        {
          data: deleteId,
          message: "Successfully",
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        data: null,

        message: "The post is not found",
      },
      { status: 400, statusText: "Failed" }
    );
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json(
      {
        data: null,
        message: "Error post",
      },
      { status: 500, statusText: "Failed to create post" }
    );
  }
}
