import http from "http";
import { request } from "http";
import { router } from "../routes/heroRoutes.js";

const server = http.createServer();

export function serverLogic() {
    server.on("request", (req, res) => {
        res.writeHead((req.statusCode = 200), {
            "Content-Type": "application/json",
        });

        const url = new URL(req.url, "http://" + req.headers.host);
        const pathName = Object.fromEntries(url.searchParams);
        const method = req.method;

        const reqSegments = url.pathname.split("/").filter(Boolean);
        let routeHandler = null;
        req.params = {};

        const routeForMethod = router[method] || {};
        const routePath = Object.keys(routeForMethod);

        for (let route of routePath) {
            const routeParameters = route.split("/").filter(Boolean);

            if (routeParameters.length !== reqSegments.length) continue;
            let matched = true;
            let tempParams = {};

            for (let i in routeParameters) {
                if (routeParameters[i].startsWith(":")) {
                    const paramName = routeParameters[i].slice(1);
                    tempParams[paramName] = reqSegments[i];
                } else if (routeParameters[i] !== reqSegments[i]) {
                    matched = false;
                    break;
                }
            }
            if (matched) {
                routeHandler = router[method][route];
                req.params = tempParams;
                break;
            }
        }
        if (routeHandler) {
            req.query = pathName;
            routeHandler(req, res);
        } else {
            res.statusCode = 404;
            res.end(`Url ${url} not found`);
        }
    });
}

export function startServer() {
    server.listen(3000, () => {
        console.log("VIGIL Server is running on port 3000 ...");
    });
}

startServer();
serverLogic();
