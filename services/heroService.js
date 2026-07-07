import { stat } from "fs";
import fs from "fs/promises";

const dataPath = "./src/data/serverData.json";

export async function readData() {
    try {
        const data = await fs.readFile(dataPath, "utf8");
        return JSON.parse(data);
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

export function filteredData(data, query) {
    const { status, power, minLevel, maxLevel, search } = query;
    const filtered = data.filter((hero) => {
        (!status || hero.status === status,
            !power || hero.power === power,
            !minLevel || hero.minLevel === minLevel,
            !maxLevel || hero.maxLevel === maxLevel,
            !search || hero.search === search);
    });
    return filtered;
}

export function sortData(data, sortBy, order = "asc") {
    if (!sortBy) return data;
    const copyData = [...data];
    copyData.sort((heroA, heroB) => {
        heroA[sortBy] > heroB[sortBy]
            ? 1
            : heroA[sortBy] < heroB[sortBy]
              ? -1
              : 0;
    });
    if (order === "desc") {
        copyData.reverse();
    }
    return copyData;
}

export function paginateData(data, page = 1, limit = 20) {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skipCount = (pageNumber - 1) * limitNumber;

    const paginated = data.slice(skipCount, skipCount + limitNumber);
    return paginated;
}
