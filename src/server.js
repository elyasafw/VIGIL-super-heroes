import http from "http";

const server = http.createServer();

export function startServer() {
    server.listen(3000, () => {
        console.log("VIGIL Server is running on port 3000 ...");
    });
}
