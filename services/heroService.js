import fs from "fs/promises";

const dataPath = "./src/data/serverData.json";
let data = "";

export async function readData() {
    try {
        data = await fs.readFile(dataPath, "utf8");
    } catch (error) {
        console.log(error);
    }
}

export async function writeData(data) {
    try {
        await fs.writeFile(dataPath, data, "utf8");
        console.log("Data update successfully");
    } catch (error) {
        console.log(error);
    }
}
