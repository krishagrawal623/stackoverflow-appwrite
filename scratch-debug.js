const { Client, Storage } = require("node-appwrite");

const endpoint = "https://cloud.appwrite.io/v1";
const projectId = "6a58eb2f00338a4a1428";
const apikey = "standard_139de4246ac339234d4c51c7ef0b9fdf5df2b372a4031a6199c5a9f53add704d860c06e0865c347c1945b0851ad56c75ae54958f1f9802f360aa791a1ffd917f4f6e93c9d2272114915034f78471d0b812d477b65ee61d1b4715136e5f98f3264e9f0de02e6769b086f2c0c9468e2b006f9c4bcbe7295a4ebb93c3d29cad9ab8";

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apikey);

const storage = new Storage(client);

async function run() {
    try {
        const fileId = "6a5a5a1b000c51ae6d7b";
        console.log(`Getting file preview for fileId = ${fileId}...`);
        const buffer = await storage.getFilePreview("question-attachment", fileId);
        console.log("Success! Preview retrieved successfully. Buffer length:", buffer.length);
    } catch (e) {
        console.error("Error retrieving preview from Appwrite Server SDK:");
        console.error("- Name:", e.name);
        console.error("- Code:", e.code);
        console.error("- Message:", e.message);
        console.error("- Full error:", e);
    }
}

run();
