### 1) npm init -y

### npm install nodemone express mongoose dotenv cors bcrypt jsonwebtoken multer 
```
Wrote to C:\Users\Shree\Desktop\foodie\package.json:
{
  "name": "foodie",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
### 2) create index.js file
### 3)```
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1",
            "server": "nodemon index.js"
            },
        ```

### 4)write in index.js
            ```
            const express=require("express");
            const app=express();
            app.listen(8080,()=>{
                console.log(`server is running at port 8080`)
            })
            ```
### 5)create db.js for connection 