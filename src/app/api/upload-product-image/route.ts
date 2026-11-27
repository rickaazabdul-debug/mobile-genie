import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

const MAX_BYTES = 10 * 1024 * 1024; // 10MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No image file provided." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files (JPG, PNG, WebP) are supported." },
        { status: 400 }
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Image exceeds 10MB limit." },
        { status: 400 }
      );
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const blob = await put(`product-images/${Date.now()}-${safeName}`, file, {
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json({
      url: blob.url,
      filename: file.name,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Image upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
