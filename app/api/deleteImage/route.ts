import { NextResponse } from "next/server";
import cloudinary from "@/config/cloudinary";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const publicId = body.public_id;

    if (!publicId) {
      return NextResponse.json({ error: "Missing public_id" }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok" && result.result !== "not found") {
      return NextResponse.json(
        { error: "Failed to delete image" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Image deleted", result });
  } catch (err) {
    console.error("Cloudinary delete error:", err);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
