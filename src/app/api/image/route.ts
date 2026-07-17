import { storage } from "@/models/server/config";
import { questionAttachmentBucket } from "@/models/name";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    noStore();
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get("fileId");

    if (!fileId) {
        return new NextResponse("Missing fileId", { status: 400 });
    }

    try {
        // Appwrite Server SDK getFileView gets the raw file, which is unblocked on free plans
        const arrayBuffer = await storage.getFileView(questionAttachmentBucket, fileId);
        const buffer = Buffer.from(arrayBuffer);

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": "image/png",
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error: any) {
        console.error("API IMAGE PROXY ERROR:", error);
        return new NextResponse(error.message || "Internal Server Error", { status: 500 });
    }
}
