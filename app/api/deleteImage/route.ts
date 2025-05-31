// /api/delete-image.ts
import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "@/config/cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { public_id } = req.body;
  if (!public_id) return res.status(400).json({ error: "Missing public_id" });

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete image" });
  }
}
