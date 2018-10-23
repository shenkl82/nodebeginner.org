const http = require("http");

module.exports.start = () => {
    http.createServer((request, response) => {
        console.log(`Received request for ${request.url}`);
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("Hello, World");
        response.end();
    }).listen(8000);

    console.log("Server has started.");
};