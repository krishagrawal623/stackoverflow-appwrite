import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";

let storagePromise: Promise<any> | null = null;

export default async function getOrCreateStorage() {
    if (!storagePromise) {
        storagePromise = (async () => {
            try {
                await storage.getBucket(questionAttachmentBucket);
                console.log("Storage Connected");
            } catch (error) {
                try {
                    await storage.createBucket(
                        questionAttachmentBucket,
                        questionAttachmentBucket,
                        [
                            Permission.create("users"),
                            Permission.read("any"),
                            Permission.read("users"),
                            Permission.update("users"),
                            Permission.delete("users"),
                        ],
                        false,
                        undefined,
                        undefined,
                        ["jpg", "png", "gif", "jpeg", "webp", "heic"]
                    );

                    console.log("Storage Created");
                    console.log("Storage Connected");
                } catch (err) {
                    console.error("Error creating storage:", err);
                }
            }
        })();
    }
    return storagePromise;
}
