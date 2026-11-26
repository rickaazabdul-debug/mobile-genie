import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

const MAX_BYTES = 15 * 1024 * 1024; // 15MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No photo or video file provided." },
        { status: 400 }
      );
    }

    if (
      !file.type.startsWith("image/") &&
      !file.type.startsWith("video/")
    ) {
      return NextResponse.json(
        { error: "Only image or short video files are supported." },
        { status: 400 }
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "File exceeds 15MB limit. Please upload a smaller photo or clip." },
        { status: 400 }
      );
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const blob = await put(`damage-uploads/${Date.now()}-${safeName}`, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json({
      url: blob.url,
      filename: file.name,
      contentType: file.type,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Upload failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
