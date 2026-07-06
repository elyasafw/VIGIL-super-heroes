import http from "http";

const server = http.createServer();

server.listen(3000, () => {
    console.log("VIGIL Server is running on port 3000");
});
