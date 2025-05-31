// api/upload-image.ts
import { NextResponse } from "next/server";
import cloudinary from "@/config/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "PropertyWebsite" }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(buffer);
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
