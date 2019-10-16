# SOPT 25th Server part
- [1차 세미나](##1차-세미나) - 자바스크립트 기초, 라우팅, 내장 모듈
- [2차 세미나](##2차-세미나) 


## 1차 세미나
------------
### 1. HTTP 모듈을 이용한 Server 구현
```
const http = require('http');

http.createServer((req, res)=>{
    console.log(`get message: ${req.url}`);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello nodejs');
    res.end();
}).listen(3000);
```

### 2. Express를 이용한 Server 구현

   **Express** : 웹 및 모바일 애플리케이션을 위한 일련의 강력한 기능을 제공하는 간결하고 유연한 Node.js 웹 애플리케이션 프레임워크입니다.

   **설치** \
   `$ npm install express --save`

   **프로젝트 생성** \
   `express [projectName]`

   **실행** \
   프로젝트 레벨에서 실행 \
   `cd [projectName]` \
   `npm install`\
   `npm start`

### 3. javascript 기초

    3.1 기본자료형 : Boolean, Number, String, Null, Undefined, Symbol 

    3.2 객체 
    
    - Function, Array, Object
    - 관련된 데이터와 함수(property와 method)의 집합
    - {} 키워드
    - memberName: memberValue형태
    - 모든 객체는 JSON으로 표기가 가능하다.
    - JSON 표기법으로 객체를 만들 수 있다.
    ```
    var person = {};
    var object = { 
        name: “윤희성”, 
        part: “server”
    };
    ```

    3.3 배열
    - 자바스크립트에서 배열은 객체다. 즉 다양한 메소드를 지원한다.
    - 자바스크립트에서 배열에는 어떤 값도 들어 갈 수 있다.
    - [] 키워드를 이용해서 표현

    ```
    var array1 = [];
    var array2 = [1, 2, 3, 4, 5];
    var array3 = [“윤희성”, 3, 4.5, false, {name: “heesung”, part: ”server”}];
    ```

    3.4 함수
    - 자바스크립트에서 함수는 객체다
    - 함수를 생성하는 방법에는 함수 선언식과 함수 표현식이 있다.
    - 호이스팅에 영향을 받는 함수 선언식
    ```
    function add(x, y){ 
        return x + y;
    }
    ```
    - 호이스팅에 영향을 받지 않는 함수 선언식
    ```
    var add = function(x, y) { 
        return x + y;
    }
    var add = (x, y) => { 
        return x + y;
    }
    ```

    3.5 일급 객체
    - 변수 or 데이터 구조에 담을 수 있다.
    - 다른 함수의 파라미터로 전달할 수 있다.
    - 반환 값으로 사용할 수 있다.
    - 런타임 시 생성될 수 있다.

    3.6 var, let, const
    - 재 선언 가능 : 같은 이름의 변수를 다시 선언할 수 있다.
    ```
    var a = 24;
    var a = 25;
    ```
    - 재 할당 가능 : 변수가 새로운 값을 가질 수 있다. 
    ```
    var a = 24;
    a = 25;
    ```
    |var|let|const|
    |:-:|:-:|:-:|
    |재 선언 가능|재 선언 불가능|재 선언 불가능|
    |재 할당 가능|재 할당 가능|재 할당 불가능|

### 4. 라우팅
   
   라우팅은 URI(또는 경로) 및 특정한 HTTP 요청 메소드(GET, POST 등)인 특정 엔드포인트에 대한 클라이언트 요청에 애플리 케이션이 응답하는 방법을 결정하는 것을 말합니다.

   4.1 라우팅 따라가기

   - package.json \
   ./bin/www 파일 실행

   - ./bin/www \
  app 변수를 통해서 ../app(app.js)를 가져온다. port를 지정하고, server를 구동하는 코드들이 있다.
   - App.js
    
    app.use('/',indexRouter);
    app.use('/users',usersRouter);
    
    
    인덱스 파일은 '/'에 연결되며, users.js파일은 /users에 연결된다.

    localhost:3000 => indexRouter(index.js) \
    localhost:3000/users => usersRouter(users.js)

    - Index.js, Users.js \
    request를 받아서 response를 처리하는 로직이 들어간다.

    
    router.{METHOD}():
    현재 path에 특정 METHOD로 요청이 오면 이를 인 식하고 처리합니다.
    ※ method에는 get, post, put, delete등이 있습니다
    

### 5. 내장 모듈 소개

    5.1 url

    ```
    // include url module
    var url = require('url');
    var address = 'http://localhost:8080/index.php?type=page&action=update&id=5221';
    var q = url.parse(address, true);
    
    console.log(q.host); //returns 'localhost:8080'
    console.log(q.pathname); //returns '/index.php'
    console.log(q.search); //returns '?type=page&action=update&id=5221'
    
    var qdata = q.query; // returns an object: { type: page, action: 'update',id='5221' }
    console.log(qdata.type); //returns 'page'
    console.log(qdata.action); //returns 'update'
    console.log(qdata.id); //returns '5221'
    ```

    5.2 query string

    ![image](https://user-images.githubusercontent.com/35513039/66933697-68678c80-f074-11e9-9b00-a60188add641.png)

    ```
    var qStr = 'where=nexearch&query=querystring&sm=top_hty&fbm=1&ie=utf8';
    var qObj = querystring.parse(qStr);
    console.log(qObj);
    console.log(querystring.stringify(qObj));
    ```

    5.3 util

    ```
    var data = util.format('%d, %s, %j', 25, 'sopt', { name: 'heesung youn'}); console.log(data); //returns '25, sopt, {"name": "heesung youn"}'
    ```

    5.4 crypto

    ```
    var crypto = require('crypto');

    var algorithm = 'aes-192-cbc'
    var password = 'Password used to generate key'
    var secretKey = crypto.scryptSync(password, 'salt', 24);
    var input = '암화화할 문자열';
    const iv = Buffer.alloc(16, 0);

    var cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    var cipheredOutput = cipher.update(input, 'utf8', 'base64'); 
    cipheredOutput += cipher.final('base64');

    var decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decrypted = decipher.update(cipheredOutput, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    var decipheredOutput = decrypted;

    console.log('기존 문자열: ' + input);
    console.log('암호화된 문자열: ' + cipheredOutput);
    console.log('복호화된 문자열: ' + decipheredOutput);
    ```

    5.5 fs

    ```
    var fs = require('fs');
    
    var text = fs.readFileSync('text.txt', 'utf8');
    console.log(text);

    var data = 'Hello FileSystem';

    fs.writeFileSync('text2.txt', data, 'utf8');
    console.log('동기적 파일 쓰기 완료');
    ```