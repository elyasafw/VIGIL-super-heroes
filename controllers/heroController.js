import {
    readData,
    writeData,
    filteredData,
    sortData,
    paginateData,
    getHeroesByQuery,
} from "../services/heroService.js";

export async function checkHealthServer(req, res) {
    try {
        const healthReport = {
            status: "UP",
            message: "VIGIL Server is healthy and running",
            time: new Date().toISOString(),
        };
        res.end(JSON.stringify(healthReport, null, 2));
    } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ status: "DOWN", error: error.message }));
    }
}

export async function getHeroes(req, res) {
    try {
        const allHeroes = await getHeroesByQuery(req.query);
        res.end(JSON.stringify(allHeroes, null, 2));
    } catch (error) {
        req.statusCode = 500;
        res.end(JSON.stringify({ error: `Internal Server Error - ${error}` }));
    }
}

export async function searchHeroByID(req, res) {
    try {
        const allHeroes = await readData();
        const hero = allHeroes.find((hero) => hero.id == req.params.id);
        if (!hero) {
            res.statusCode = 404;
            res.end(
                JSON.stringify({
                    message: `hero ID: ${req.params.id} not found`,
                }),
            );
        }
        res.end(JSON.stringify(hero, null, 4));
    } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: `${error}` }));
    }
}
