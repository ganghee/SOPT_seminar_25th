# SOPT 25th Server part
- [1차 세미나](##1차-세미나) - 자바스크립트 기초, 라우팅, 내장 모듈
- [2차 세미나](##2차-세미나) - 


## 1차 세미나
------------
1. HTTP 모듈을 이용한 Server 구현
```
const http = require('http');

http.createServer((req, res)=>{
    console.log(`get message: ${req.url}`);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello nodejs');
    res.end();
}).listen(3000);
```