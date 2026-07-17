import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { databases } from "@/models/server/config";
import { db, questionCollection } from "@/models/name";
import { Query } from "node-appwrite";
import slugify from "@/utils/slugify";
import HeroSectionHeader from "./HeroSectionHeader";

export default async function HeroSection() {
    const questions = await databases.listDocuments(db, questionCollection, [
        Query.orderDesc("$createdAt"),
        Query.limit(15),
    ]);

    return (
        <HeroParallax
            header={<HeroSectionHeader />}
            products={questions.documents.map(q => ({
                title: q.title,
                link: `/questions/${q.$id}/${slugify(q.title)}`,
                thumbnail: q.attachmentId
                    ? `/api/image?fileId=${q.attachmentId}`
                    : "/placeholder.png",
            }))}
        />
    );
}
