const http = require("http");
const path = require("path");
const fs = require("fs/promises");



let server = http.createServer(async (req, res) => {
  let url = req.url;
  let method = req.method;

  if (url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html; charser=utf8",
    });
    if (method === "GET") {
      const htmlPage = await fs.readFile(
        path.join(__dirname, "views", "index.html")
      );
      res.write(htmlPage);
      res.end();
    } else if (method === "POST") {
      let body = [];
      let obj = {}
      req.on("data", (data) => {
        let newData = Buffer.from(data).toString();
        newData = newData.split('&')
        body[0] = newData[0].split('=')[1]
        body[1] = + newData[1].split('=')[1]
        obj['name'] = body[0]
        obj['number'] = body[1]
      });
      req.on("end", async() => {
        //   console.log(obj)
          let userData = await fs.readFile(path.join(__dirname, 'data.json'), 'utf8')
          userData = await JSON.parse(userData)
          console.log(body[0])
          let validUser = userData.users.find(element=>element['name']===body[0])
          if(validUser){
            console.log('bunday user bor')
            res.end('Bunday user mavjud')
          }else{
            userData.users[userData.users.length]=obj
             await fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(userData))
            res.end('User qo`shildi')
          }
          
        });
    }
  }
});

server.listen(3000, () => {
  console.log("Server 3000 - portda ishlamoqda...");
});
