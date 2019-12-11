# 🌟 SOPT 25th Server part 🌟
- [1차 세미나](#-1차-세미나) - 자바스크립트 기초, 라우팅, 내장 모듈
- [2차 세미나](#-2차-세미나) - Node.js, 동기 비동기, Promise, async/await
- [3차 세미나](#-3차-세미나) - AWS, RDS, CRUD
- [4차 세미나](#-4차-세미나) - Database, EC2
- [5차 세미나](#-5차-세미나) - Multer, S3, IAM, JWT
- [6차 세미나](#-6차-세미나) - REST API, API 문서
- [7차 세미나](#-7차-세미나) - moment, cron, request, Error handling
------------

\
\
\
[]()
## 🔥 1차 세미나
\
[]()
### 🍀1. HTTP 모듈을 이용한 Server 구현
   ```javascript
   const http = require('http');

   http.createServer((req, res)=>{
        console.log(`get message: ${req.url}`);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Hello nodejs');
        res.end();
   }).listen(3000);
   ```

\
\
[]()
### 🍀2. Express를 이용한 Server 구현

  - **Express** : 웹 및 모바일 애플리케이션을 위한 일련의 강력한 기능을 제공하는 간결하고 유연한 Node.js 웹 애플리케이션 프레임워크입니다.

  - **설치** \
  `$ npm install express --save`

  - **프로젝트 생성** \
  `express [projectName]`

  - **실행** \
  프로젝트 레벨에서 실행 \
  `cd [projectName]` \
  `npm install`\
  `npm start`
\
\
[]()
### 🍀3. javascript 기초

+ **3.1 기본자료형** : Boolean, Number, String, Null, Undefined, Symbol 

+ **3.2 객체**

    - Function, Array, Object
    - 관련된 데이터와 함수(property와 method)의 집합
    - {} 키워드
    - memberName: memberValue형태
    - 모든 객체는 JSON으로 표기가 가능하다.
    - JSON 표기법으로 객체를 만들 수 있다.
      ```javascript
      var person = {};
      var object = { 
          name: “윤희성”, 
          part: “server”
      };
      ```

- **3.3 배열**
     - 자바스크립트에서 배열은 객체다. 즉 다양한 메소드를 지원한다.
     - 자바스크립트에서 배열에는 어떤 값도 들어 갈 수 있다.
     - [] 키워드를 이용해서 표현

       ```javascript
        var array1 = [];
        var array2 = [1, 2, 3, 4, 5];
        var array3 = [“윤희성”, 3, 4.5, false, {name: “heesung”, part: ”server”}];
       ```

- **3.4 함수**
    - 자바스크립트에서 함수는 객체다
    - 함수를 생성하는 방법에는 함수 선언식과 함수 표현식이 있다.
    - 호이스팅에 영향을 받는 함수 선언식
      ```javascript
      function add(x, y){ 
          return x + y;
      }
      ```
    - 호이스팅에 영향을 받지 않는 함수 선언식
      ```javascript
      var add = function(x, y) { 
          return x + y;
      }
      var add = (x, y) => { 
          return x + y;
      }
      ```

- **3.5 일급 객체**
  - 변수 or 데이터 구조에 담을 수 있다.
  - 다른 함수의 파라미터로 전달할 수 있다.
  - 반환 값으로 사용할 수 있다.
  - 런타임 시 생성될 수 있다.

- **3.6 var, let, const**
  - 재 선언 가능 : 같은 이름의 변수를 다시 선언할 수 있다.
    ```javascript
    var a = 24;
    var a = 25;
    ```
  - 재 할당 가능 : 변수가 새로운 값을 가질 수 있다. 
    ```javascript
    var a = 24;
    a = 25;
    ```
    |var|let|const|
    |:-:|:-:|:-:|
    |재 선언 가능|재 선언 불가능|재 선언 불가능|
    |재 할당 가능|재 할당 가능|재 할당 불가능|
\
\
[]()
### 🍀4. 라우팅
   
   라우팅은 URI(또는 경로) 및 특정한 HTTP 요청 메소드(GET, POST 등)인 특정 엔드포인트에 대한 클라이언트 요청에 애플리케이션이 응답하는 방법을 결정하는 것을 말합니다.

   - **4.1 라우팅 따라가기**

     - **package.json** \
     ./bin/www 파일 실행

     - **./bin/www** \
    app 변수를 통해서 ../app(app.js)를 가져온다. port를 지정하고, server를 구동하는 코드들이 있다.

     - **App.js** \
      app.use('/',indexRouter); \
      app.use('/users',usersRouter); \
      인덱스 파일은 '/'에 연결되며, users.js파일은 /users에 연결된다.

        localhost:3000 => indexRouter(index.js) \
        localhost:3000/users => usersRouter(users.js)

      - **Index.js, Users.js** \
        request를 받아서 response를 처리하는 로직이 들어간다. \
        router.{METHOD}():
        현재 path에 특정 METHOD로 요청이 오면 이를 인식하고 처리합니다. \
        ※ method에는 get, post, put, delete등이 있습니다
      
\
\
[]()
### 🍀5. 내장 모듈 소개

   - **5.1 url**

        ```javascript
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

   - **5.2 query string**

        <img src="https://user-images.githubusercontent.com/35513039/66933697-68678c80-f074-11e9-9b00-a60188add641.png" width="50%"/>

        ```javascript
        var qStr = 'where=nexearch&query=querystring&sm=top_hty&fbm=1&ie=utf8';
        var qObj = querystring.parse(qStr);
        console.log(qObj);
        console.log(querystring.stringify(qObj));
        ```

   - **5.3 util**

        ```javascript
        var data = util.format('%d, %s, %j', 25, 'sopt', { name: 'heesung youn'}); console.log(data); //returns '25, sopt, {"name": "heesung youn"}'
        ```

   - **5.4 crypto**

        ```javascript
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

   - **5.5 fs**

        ```javascript
        var fs = require('fs');
        
        var text = fs.readFileSync('text.txt', 'utf8');
        console.log(text);

        var data = 'Hello FileSystem';

        fs.writeFileSync('text2.txt', data, 'utf8');
        console.log('동기적 파일 쓰기 완료');
        ```
\
\
\
[]()
## 🔥 2차 세미나
\
[]()
### 🍀 1. node.js

**1.1 정의**

Node.js는 확장성 있는 네트워크 애플리케이션 개발에 사용되는 소프트웨어 플랫폼이다. 

<img src="https://user-images.githubusercontent.com/35513039/66976620-874e3900-f0dd-11e9-858a-ed2224423dad.png" width="50%"/>

**1.2 런타임**

프로그램이 실행되고 있을 때 존재하는 곳 \
즉 컴퓨터 내에서 프로그램이 실행되면 그것이 바로 프로그램의 런타임이다. \
좀 더 구체적으로 말하면 프로그래밍 언어가 구동되는 환경이라고 말하면 된다. \
JavaScript라면 Web Browser에서 작동하는 JavaScript 측면이 있고 Node.js 환경에서 작동하는 측면이 있다.
여기에서 Browser와 Node.js를 런타임이라고 볼 수 있다.

**1.3 특징**

- **Non-Bloking I/O**

    - 동기(Blocking, Sync) : 요청을 하고 완료를 할 때까지 기다리는 방식
    - 비동기(Non-Blocking, Async) : 방식은 요청을 하고 바로 제어권을 돌려 받는 방식 즉 요청을 하고 다시 프로그램을 처리하다가 완료 이벤트가 발생하면 미리 지정한 처리를 진행한다.

        \
        <img src="https://user-images.githubusercontent.com/35513039/66980936-44945d00-f0ed-11e9-8c93-fa61d2fa0754.png" width="50%"/>

    
- **Single Thread**

    하나의 쓰레드로만 동작한다.
    
    \
    <img src="https://user-images.githubusercontent.com/35513039/66981423-a3a6a180-f0ee-11e9-96ef-083d717cc0f5.png" width="50%"/>

    \
    []()
- **이벤트 기반**

    이벤트가 발생 할 때 미리 지정해 놓은 작업을 수행하는 방식 \
    노드는 이벤트에 Callback 함수를 지정해서 동작

    **동시성(concurrency) vs 병렬성(parallelism)** \
    동시성은 흐름을 실행시키는 것은 하나 이지만 time-slicing, time-quantum 등으로 작은 단위로 나누어서 돌아가며 마치 동시에 실행되는것처럼 만들어 주는 방식이다 \
    병렬성은 실제 흐름을 실행시키는 것이 복수 개인 것을 의미한다. \
    Node.js는 기본적으로 Single Thread이기 때문에 동시성을 가지고 있으며 Node.js Core API에 패키지 된 cluster 또는 child_process 모듈을 통해 “병렬 처리”를 지원한다. \
    즉 동시성과 병렬성 모두 가지고 있다.

**1.4 구조**


- **V8**  \
구글에서 Chome 브라우저 용으로 개발한 자바스크립트 엔진 \
혁신적인 설계와 속도, 효울적인 메모리 관리로 높은 평가

- **Libuv** \
C언어로 만들어져서 낮은 수준의 기능들을 javascript에 매핑하고 사용하도록 해주는 바인딩 세트

- **Core Javascript** \
Node.js API을 구현
\
\
[]()
### 🍀 2. 동기/비동기
```javascript
function task1(){ 
setTimeout(function(){
    console.log('task1'); 
    }, 0);
}
function task2(){
    console.log('task2'); 
}
function task3(){
    console.log('task3');
}
```

task1 : 비동기 \
task2 : 동기\
task3 : 동기

- 2.1   **fs모듈: 동기 파일 쓰기**

    ```javascript
    const fs = require('fs');

    const numArr = [1, 2, 3, 4, 5];
    const fileCommonName = 'syncText';
    numArr.forEach((num) => {
        const fileName = fileCommonName+num;
        const data = `reserved message for the '${fileName}'`; 
        fs.writeFileSync(`${fileName}.txt`, data); 
        console.log(`file[${fileName}] write complete`);
    })
    ```

    결과
    ```javascript
    file[syncText1] write complete
    file[syncText2] write complete
    file[syncText3] write complete 
    file[syncText4] write complete 
    file[syncText5] write complete
    ```

- 2.2 **fs모듈: 비동기 파일 쓰기**

    ```javascript
    const fs = require('fs');
    const numArr = [1, 2, 3, 4, 5];
    const fileCommonName = 'asyncText';

    numArr.forEach((num) => {
        const fileName = fileCommonName+num;
        const data = `reserved message for the '${fileName}'`; 
        fs.writeFile(`${fileName}.txt`, data, ()=>{
            console.log(`file[${fileName}] write complete`); 
            });
    });
    ```

    결과
    ```
    file[asyncText3] write complete 
    file[asyncText4] write complete 
    file[asyncText2] write complete 
    file[asyncText1] write complete 
    file[asyncText5] write complete
    ```

- 2.3 **Cypto pbkdf2**

    가장 많이 사용되는 key derivation function
    해시 함수의 컨테이너인 PBKDF2는 솔트를 적용한 후 해시 함수의 반복 횟수를 임의로 선택한다. \
    PBKDF2는 아주 가볍고 구현하기 쉬우며, SHA와 같이 검증된 해시 함수만을 사용한다 

    \
    <img src="https://user-images.githubusercontent.com/35513039/66986310-a0fd7980-f0f9-11e9-8078-cd53a38d900d.png" width="50%"/>

    - **Hash** \
    해시 알고리즘은 문자열을 특정 규칙을 이용해 다른 문자열로 치환하는 방식 해시 알고리즘으로는 sha256, sha512 등

    -  **Salt** \
    해시 알고리즘으로 암호화 하기 전에 우선 평문 암호에 salt라고 불리는 임의의 문자열을 붙인 후 암호화 이렇게 하여 원본 암호를 더 찾기 어렵게 만든다.

    - **Key stretching** \
    해시 알고리즘으로 암호화 하기 전에 우선 평문 암호에 salt라고 불리는 임의의 문자열을 붙인 후 암호화 이렇게 하여 원본 암호를 더 찾기 어렵게 만든다.

    - **Pbkdf2** \
    PRF: 난수(예: HMAC) \
    Password: 패스워드 \
    Salt: 암호학 솔트 \
    c: 원하는 iteration 반복 수 \
    DLen: 원하는 다이제스트 길이

    ```javascript
    const crypto = require('crypto’); const fs = require('fs');
    const password = 'password'; crypto.randomBytes(32, (err, salt) => {
        if(err) throw err;
        crypto.pbkdf2(password, salt, 1, 32, 'sha512', (err, derivedKey) => {
            if(err) throw err;
            fs.writeFile('password.txt', derivedKey.toString('hex'), (err) => {
                if(err) throw err;
                console.log('complete write password'); 
            })
        }) 
    })
    ```

    > 문제점
    > callback함수 안에 callback함수 안에 callback함수 안에 결과를 출력하는 로직
    > 이처럼 여러 콜백함수가 중첩되어 코드를 읽기 어려워지는 것을 콜백헬 이라고 한다.
    > 비동기 처리에는 다양한 장점이 있지만 이 Callback hell이 발생하는 문제점이 있다.

\
\
[]()

## **Callback Hell을 최소화 하는 3가지 방법**

__1. Keep your code shallow__ \
    콜백함수를 명시적으로 정의하여서 연결해주면 Callback hell을 최소화 할 수 있습니다.
```javascript
const crypto = require('crypto');
const fs = require('fs');

const password = 'password1234';
crypto.randomBytes(32, madeSaltFunc);

function madeSaltFunc(err, salt) {
    if(err) throw err;
    crypto.pbkdf2(password, salt, 1, 32, 'sha512', madeKeyFunc);
}
function madeKeyFunc(err, derivedKey) {
    if(err) throw err;
    fs.writeFile('password.txt', derivedKey.toString('hex'), wroteFileFunc);
}
function wroteFileFunc(err) {
    if(err) throw err;
    console.log('complete write password');
}
```
__2. Modularize__ \
    작은 모듈을 만들고 이를 조립하여 큰 모듈을 만들어서 콜백 헬을 감소시키는 방법
    
Practice-module-pbkdf-fix2.js
```javascript
const fs = require('fs');
const encryption = require('./encryption');

const password = 'password1234';
encryption(password, (error, derivedKey) => {
    fs.writeFile('password2.txt', derivedKey, wroteFileFunc);
    function wroteFileFunc(err) {
        if(err) throw err;
        console.log('complete write password');
    }
})
```
encryption.js
```javascript
const crypto = require('crypto');
const pbkdf2 = require('pbkdf2');

function encryptPBKDF2(password, next){
    crypto.randomBytes(32, madeSaltFunc);
    function madeSaltFunc(err, salt) {
        if(err) throw err;
        pbkdf2.pbkdf2(password, salt, 1, 32, 'sha512', madeKeyFunc);
    }
    function madeKeyFunc(err, derivedKey) {
        if(err) throw err;
        next(err, derivedKey.toString('hex'));
    }
}

module.exports = encryptPBKDF2;
```

__3. Handle every single error__ \
    콜백 함수의 첫 번째 인자를 error 관련 값으로 지정
```javascript
run(function(err){
    if(err) throw err
    window.alert('done')
})
```
\
\
[]()

### 🍀 **3. Promise**

비동기 처리에 사용되는 객체 \
프로미스 객체가 생성되는 순간 알 수 없는 값을 처리 \
값을 바로 반환하는 대신에 Promise 객체를 반환해서 **비동기 메소드를 동기 메소드처럼** 만들어 줌

- **3.1 Promise의 3가지 상태**
  - pending: 최초 생성된 시점의 상태
  - fulfilled: 작업이 성공적으로 완료 된 상태
  - rejected: 작업이 실패한 상태

-  **3.2 객체 만드는 법**
    ```javascript
    function readFile(filename, enc){
        return new Promise(function (fulfill, reject){ ... });
    }
    ```

- **3.3 Promise의 흐름** \
resolve 함수를 호출하면 fulfilled 상태가 되며 reject 함수를 호출하면 rejected 상태가 됩니다. fulfilled 상태는 then을 통해서 전달되며 rejected는 catch를 통해서 전달됩니다.
    
    \
    <img src="https://user-images.githubusercontent.com/35513039/66990901-07869580-f102-11e9-8e9a-43a9aa183c05.png" width="50%"/>

- **3.4 Promise 실습**  \
Promise 객체를 이용하여 랜덤 점수를 배열로 받는다. 그 배열 원소들의 합을 구한다. 그리고 그 합의 등급을 매겨보자
    ```javascript
    function getScoreArray(size){
        return new Promise(function(resolve, reject){
            if(size <= 0){
                reject(new Error("size must be positive"));
                return;
            }
            const arr = [...Array(size)].map(idx => parseInt(Math.random()*11));
            console.log(`array is ${arr}`);
            resolve(arr);
        });
    }

    function getSum(arr) {
        return new Promise(function(resolve, reject){
            const sum = arr.reduce((prev, current) => prev + current);
            if(sum <= 0){
                reject(new Error("sum must be larger than 0"));
                return;
            }
            console.log(`sum: ${sum}`);
            resolve(sum);
        });
    }

    function getGrade(result){
        return new Promise(function (resolve, reject){
            let grade;
            switch(parseInt(result / 10)){
                case 9:
                case 8:
                    grade = 'A';
                    break;
                case 7:
                    grade = 'B';
                    break;
                case 6:
                    grade = 'C';
                    break;
                case 5:
                    grade = 'D';
                default:
                    reject(new Error(`too low score(${result})`));
                    return;
            }
            resolve(grade);
        });
    }

    getScoreArray(-1)
    .catch(err => {
        console.log(`Error: ${err}`);
        return [...Array(5).fill(10)];
    })
    .then(getSum)
    .then(getGrade)
    .then((result) => console.log(`grade is ${result}`))
    .catch(err => {
        console.log(`Error3: ${err}`);
    })
    ```

- **3.5 json2csv 모듈** \
json2csv 모듈은 JSON 형태의 Javascript 객체를 CSV형태의 String으로 변환해준다.

    Practice-json2csv.js 
    ```javascript
    const json2csv = require('json2csv');

    const jsonArray = [{
        id: 'admin',
        pw: 'admin',
        name: '관리자'
        },
        {
        id: 'heesung',
        pw: '1q2w3e4r!',
        name: '윤희성'
        },
        {
        id: 'starbucks',
        pw: 'JamongBlackHoneyTea',
        name: '스타벅스'
        }];

        const resultCsv = json2csv.parse(jsonArray)
        console.log(resultCsv)
    ```

    출력값
    ```javascript
    "id","pw","name"
    "admin","admin","관리자" "heesung","1q2w3e4r!","윤희성" "starbucks","JamongBlackHoneyTea","스타벅스"
    ```

- **3.6 csvtojson 모듈**\
csvtojson 모듈은 csv포맷에서 JSON으로 가져오는 모듈입니다.

    csvtojson.csv 
    ```javascript
    "id","pw","name"
    "admin","admin","관리자" "heesung","1q2w3e4r!","윤희성" "starbucks","JamongBlackHoneyTea","스타벅스"
    ```

    Practice-csvtojson.js
    ```javascript
    const csv = require('csvtojson');

    csv().fromFile('./csvtojson.csv').then((jsonArr) => {
        if (!jsonArr) {
            console.log(`file read err: ${err}`);
            return;
        }
        console.log(jsonArr);
    }, (err) => {
        console.log(`err with readCSV: ${err}`);
    })
    ```
    출력값 
    ```javascript
    [ { id: 'admin', pw: 'admin', name: '관리자' },
    { id: 'heesung', pw: '1q2w3e4r!', name: '윤희성' },
    { id: 'starbucks', pw: 'JamongBlackHoneyTea', name: '스타벅스' } ]
    ```
\
\
[]()
### 🍀 **4. Async/Await**

ES6 이후에 나온 자바스크립트 비동기 패턴.
기존의 비동기 처리 방식인 콜백함수와 Promise의 단점을 보완 하여 읽기 좋은 코드로 만들어 준다. \
Promise에 비해 문법이 간단하고 가독성이 좋기 때문에 많이 사용하는 방법이다.

- **객체 만드는 법** \
function 앞에 async 를 붙이고 처리할 비동기 메소드 앞에 await만 붙이면 된다.

    ```
    async function 함수명(){
        await 비동기_처리_메소드_명();
    }
    ```

- **비동기 함수를 Promise버젼과 Async/Await버젼으로 살펴보기** 

    ```javascript
    function fetchItems() {
        return new Promise(function (resolve, reject) {
            var items = [1, 2, 3];
            resolve(items); 
        });
    }  
    ```

- **Promise**
    ```javascript
    function promiseVer(){
        fetchItems().then(resultItems => {
            console.log(resultItems); //[1,2,3]
        });
    }
    ```

- **Async/Await**
    ```javascript
    async function asyncVer(){
        const resultItems = await fetchItems();
        console.log(resiltItems); //[1,2,3]
    }
    ```
\
\
\
[]()
## 🔥 3차 세미나
\
[]()
### 🍀 1. AWS

- **1.1 서버의 정의**

    서버는 클라이언트에게 네트워크를 통해 정보나 서비스를 제공하는 컴퓨터 시스템으로 컴퓨터 프로그램 또는 장치를 의미한다. 특히, 서버에서 동작하는 소프트웨어를 서버 소프트웨어라 한다. 주로 리눅스 등의 운영체제를 설치한 대형컴퓨터를 쓰지만, 그렇지 않은 경우도 있다.

- **1.2 서버의 조건**
    - 컴퓨터의 전원이 계속 ON되어 있어야 한다.
    - Server Software가 특정 포트에 동작하고 있어야 한다.
    - Request가 들어오면 Response를 해야 한다.

- **1.3 Cloud Platform**

    Cloud Platform이란 클라우드 컴퓨팅은 인터넷("클라우드")을 통해 서버, 스토리지, 데이터베이스, 네트워킹, 소프트웨어, 분석, 인텔리전스 등의 컴퓨팅 서비스를 제공하는 것입니다.

- **1.4 AWS**

    아마존 닷컴에서 개발한 클라우드 컴퓨팅 플랫폼 한 곳에서 IT 구축에 대한 모든 서비스 제공 받을 수 있음 
    - 저렴한 비용: 저렴한 종량과금제 방식
    - 즉각적 융통성: 설치가 빠르고 관리가 편함
    - 개방/유연성: 언어 및 운영 체제에 구애 받지 않는 플랫폼
    - 보안: 여러 개층의 운영 및 물리적 보안 갖주고 있음

- **1.5 EC2**

    안전한 크기 조정이 가능한 컴퓨팅 파워를 클라우드에서 제공하는 웹 서비스. 사용자가 정의한 조건에 따라 자동으로 Amazon EC2 용량을 급격하게 확장 또는 축소 기능

- **1.6 RDS**

    아마존 웹 서비스가 서비스하는 분산 관계형 데이터베이스. 애플리케이션 내에서 관계형 데이터 베이스의 설정, 운영, 스케일링을 단순하게 하도록 설계된 클라우드 내에서 동작하는 웹 서비스이다.

- **1.7 S3 (Simple Storage Service)**

    인터넷용 스토리지 서비스. 개발자가 더 쉽게 웹 규모의 컴퓨팅 작업을 수행할 수 있게 설계
\
\
[]()
### 🍀 2. CRUD 실습
- **2.1 프로젝트 구조**

    - CommonModule: 공통되는 코드 및 상수 관리 (statusCode, responseMessage...)
    - Routes: 라우팅 로직 관리 (index.js...)
    - Model: 추상화 된 개념별로 로직 관리 (User, Board...)
    - Module: 기능 단위의 로직 관리 (암호와, DB매니저, csv매니저...)

- **2.2 model**
    - **model/user.js**

        ```javascript
        const user = {
            signin: (id, pwd) => {
                return new Promise((resolve, reject) => {
                    //TODO : 존재하는 아이디인지 확인 (실패시 400 Error)
                    //TODO : 비밀번호 일치하는지 확인 (실패시 401 Error)
                    //TODO : 유저 정보 응답하기
                });
            signup: (id, pwd, name, phone) => {
                return new Promise((resolve, reject) => {
                    //TODO : 존재하는 ID인지 확인한다.
                    //TODO : 사용자 정보를 저장한다.
                    //TODO : 새로 추가된 유저 index 반환하기
                });
            }
            }
        }
        module.exports = user;
        ```

    - **model/user.js**

        ```javascript
        const board = {
            create : (title, content, writer, pwd) => {
                return new Promise((resolve, reject) => {
                    //TODO : 회원정보 입력
                });
            },
            readAll : () => {
                return new Promise((resolve, reject) => {
                    //TODO : 모든 회원정보 반환
                });
            },
            read: (idx) => {
                return new Promise((resolve, reject) => {
                    //TODO : 회원정보 반환
                });
            },
            update: (idx, title, content, writer, pwd) => {
                return new Promise((resolve, reject) =>{
                    //TODO : idx값 확인
                    //TODO : 비밀번호 확인
                });
            },
            delete: (idx,pwd) => {
                return new Promise((resolve, reject) => {
                    //TODO : idx값 확인
                    //TODO : password값 확인
                });
            },
        }

        module.exports = board
        ```

- **2.3 routes**
    - **routes/user.js**

        ```javascript
        ...
        const User = require('../model/user');
        ...

        router.post('signin',(req, res) => {
            const {
                id,
                pwd
            } = req.body;

            //TODO : 빈 파라미터인지 확인후 로직구현
        });

        router.post('/signup',(req, res) => {
            const{
                id,
                pwd,
                name,
                phone
            } = req.body;

            //TODO : 파라미터 값 체크후 로직구현
        });
        ```

    - **routes/board.js**

        ```javascript
        ...
        const Board = require('../model/board');
        ...

        router.get('/',(req,res) => {
            // TODO : 모든 회원정보 보여주는 로직 구현
        });

        router.get('/:id',(req,res) => {
            // TODO : 파라미터 값으로 id 값을 받아  특정 회원정보 보여주는 로직 구현
        });

        router.post('/',(req,res) => {
            //TODO : 파라미터가 null이 아닌지 확인 후 회원정보 저장하는 로직 구현
        });

        router.put('/',(req,res) => {
            //TODO : 파라미터가 null인지 확인 후 회원정보를 수정하는 로직 구현
        });

        router.delete('/',(req,res) => {
            //TODO : 파라미터가 null인지 확인 후 회원정보를 삭제하는 로직 구현
        });
        
        ```
\
\
\
[]()
## 🔥 4차 세미나
\
[]()
### 🍀 1. Database

- **1.1 정의** \
어러 사람에 의해 공유되어 사용될 목적으로 통합되어 관리되는 데이터의 집합

- **1.2 DBMS** \
데이터 베이스를 관리하는 시스템

- **1.3 Database의 특징** 
    - 데이터의 중복의 최소화
    - 계속적인 변화
    - 실시간 접근
    - 동시 공유
    - 내용에 의한 접근
    - 뛰어난 자료간 연계성

- **1.4 Transaction**

    여러 SQL문을 하나로 묶어서 하나라도 모든 쿼리가 성공한 경우에만 작업이 진행되도록 하는 것
\
\
[]()
### 🍀 2. EC2

안전한 크기 조정이 가능한 컴퓨팅 파워를 클라우드에서 제공하는 웹 서비스. 사용자가 정의한 조건에 따라 자동으로 Amazon EC2 용량을 급격하게 확장 또는 축소 기능.
\
\
\
[]()
## 🔥 5차 세미나
\
[]()
### 🍀 1. Multer

- **1.1 특징**
  - Json 타입은 파일 전송 불가
  - Multipart/form-data 방법으로 파일 전송 가능
  - Multer 모듈은 Multipart/form-data로 전송된 파일을 처리해줌

- **1.2 3가지 메소드**
  1. single(fieldname) : Fieldname으로 받은 파일을 받아서 req.file에 저장
   
   ```javascript
    router.post('/single',upload.single('image'),(req,res) =>{
        console.log(req.file);
        console.log(req.body);
        res.send({file: req.file, body: req.body});
    })
   ```
  2. array(fieldname[,maxCount]) : Fieldname으로 받은 여러 개의 파일을 받아서 req.files(배열)에 저장
   ```javascript
   router.post('/array',upload.array('photos',4),(req.res)=>{
       console.log(req.files);
       console.log(req.body);
       res.send({file:req.files, body: req.body});
   })
   ```
  3. fields(fields) : 여러 개의 키로 받은 여러 개의 파일을 req.files(객체)에 저장
    ```javascript
    var cpUpload = upload.fields([{name:'thumbnail', maxCount:1},{name:'image',maxCount:8}])
    router.post('/fields',cpUpload,(req,res)=>{
        console.log(req.files);
        console.log(req.body);
        res.send({file:req.files, body:req.body});
    })
    ```

 \
 \
[]()
### 🍀 2. S3
- **1.1 정의**

    Amazon Simple Storage Service는 인터넷용 스토리지 서비스입니다. 이 서비스는 개발자가 더 쉽게 웹 규모 컴퓨팅 작업을 수행할 수 있도록 설계되었습니다.

- **1.2 모듈**

    - Multer-s3 모듈
        이미지 업로드 시 로컬 서버가 아닌 S3에 업로드하도록 만들어주는 모듈
    - AWS-SDK 모듈
        AWS 서비스를 연결하기 위한 모듈

\
\
[]()
### 🍀 3. IAM

- **1.1 정의**
    AWS Identity and Access Management(IAM)는 AWS 리소스에 대한 액세스를 안전하게 제어할 수 있는 웹 서비스입니다. IAM을 사용하여 리소스를 사용하도록 인증(로그인) 및 권한 부여(권한 있음)된 대상을 제어합니다.

\
\
[]()
### 🍀 4. JWT

- **1.1 정의** \
    JSON Web Token의 약자로 클레임 토큰 기반의 방식. 클라이언트의 세션 상태를 저장하는 것이 아니라 필요한 정보를 토큰 body에 저장해서 클라이언트가 가지고 이를 증명서 처럼 사용

- **1.2 구성** \
    {Header}.{Payload}.{Verify Signature} \
    3가지 정보를 '.'로 연결하여 사용한다.

    **Header** : JWT 토큰의 유형이나 사용된 해시 알고리즘의 정보가 들어간다.

    **Payload** : 클라이언트에 대한 정보가 담겨있다. 또한 여기에는 iss, sub, aud, exp, nbf, iat, jti 와 같은 기본 정보가 들어간다.

    **Signature** : header에서 지정한 알고리즘과 secret key로 Header와 Payload를 담는다.

- **1.3 특징**
  
    - **1.3.1 Payload는 공개 데이터**

        JWT에 정보는 누구나 https://jwt.io/ 페이지에 접속해서 정보를 확인할 수 있습니다. 따라서 비밀번호와 같은 보안이 필요한 정보는 payload에 저장하면 안됩니다.

    - **1.3.2 JWT의 Secret Key**

        JWT에서는 정보는 공개가 되어있지만 해시 값을 통해서 정보가 유효한지 확인을 하게 됩니다. 따라서 시크릿 키가 유출이 된다면 JWT에서 보안상에 큰 위협이 됩니다.

- **1.4 과정**

    - **1.4.1 로그인**
      - 1. 클라이언트가 유저에 대한 정보(ID,Password)에 대한 정보를 서버에게 보낸다.
      - 2. 서버는 DB를 이용해서 정보의 유효성을 확인한다.
      - 3. User 정보 중 일부를 JWT body에 넣고 토큰을 발행
      - 4. 클라이언트에게 응답한다.

    - **1.4.2 토큰 검증**
      - 1. HTTP header에 토큰 값을 넣어서 보낸다.

            <img src="https://user-images.githubusercontent.com/35513039/69848343-34ab9380-12bd-11ea-8598-e9cbc5afc727.png" width="50%"/>

      - 2. 서버는 토큰값을 받아서 JWT 정보와 서버가 가지고 있는 secret key를 이용해서 서명을 만든다. 이때 JWT의 서명과 일치한다면 유효하고 일치하지 않는다면 유효하지 않는 요청으로 판단한다.

            <img src="https://user-images.githubusercontent.com/35513039/69848455-7f2d1000-12bd-11ea-826b-31e2887fd829.png" width="50%"/>

\
\
\
[]()
## 🔥 6차 세미나
\
[]()
### 🍀 1. REST API
[]()
- **1.1 URI** 
    - 통합 자원 식별자 Uniform Resource Identifier
    - 인터넷에 있는 자원을 나타내는 유일한 주소
    - 예시 
      - http://test.com/company/location
      - http://service.com/tv/turn/on

- **1.2 URL** 
    - 유일 자원 지시기 Uniform Resource Locator
    - 네트워크 상에서 자원이 어디있는지를 알려주기 위한 규약
    - 예시
      - http://test.com/work/sample.pdf

- **1.3 정의** 
    - Representational State Transfer API
    - 2000년도에 로이 필딩 (Roy Fielding)의 박사학위 논문에서 최초로 소개되었습니다. 로이 필딩은 HTTP의 주요 저자 중 한 사람으로 그 당시 웹(HTTP) 설계의 우수성에 비해 제대로 사용되어지지 못하는 모습에 안타까워하며 웹의 장점을 최대한 활용할 수 있는 아키텍쳐로써 REST를 발표

- 1.4 구성
  1. 자원(resource)- URI
  2. 행위(Verb) - HTTP METHOD
  3. 표현(Representations)

- 1.5 REST 제약 조건
  1. **Uniform (유니폼 인터페이스)**
        
        Uniform Interface URI로 지정한 리소스에 대한 조작을 통일되고 한정적인 인터페이스로 수행하는 아키텍쳐 스타일
  2. **Stateless (무상태성)**

        REST는 무상태성 성격을 갖습니다. 다시 말해 작업을 위한 상태정보를 따로 저장하고 관리하지 않습니다. 세션 정보나 쿠키 정보를 별도로 저장하고 관리하지 않기 때문데 API 서버는 들어오는 요청 만을 단순히 처리하면 됩니다. 때문에 서비스의 자유도가 높아지고 서버에서 불필요한 정보를 관리하지 않음으로써 구현이 단순해 집니다.

  3. **Cacheable (캐시 가능)**

        REST의 가장 큰 특징 중 하나는 HTTP라는 기존 웹표준을 그대로 사용하기 때문에, 웹에서 사용하는 기존 인프라를 그대로 활용이 가능합니다. 따라서 HTTP가 가진 캐시 기능이 적용 가능합니다. HTTP 프로토콜 표준에서 사용하는 Last-Modified태그나 E-Tag를 이용하면 캐시 구현이 가능합니다.

  4. **Self-descriptiveness (자체 표현 구조)**

        REST의 또 다른 큰 특징 중 하나는 REST API 메시지만 보고도 이를 쉽게 이해 할 수 있는 자체 표현 구조로 되어 있다는 것입니다.

  5. **Client - Server 구조**

        REST 서버는 API 제공, 클라이언트는 사용자 인증이나 컨텍스트(세션, 로그인 정보)등을 직접 관리하는 구조로 각각의 역할이 확실히 구분되기 때문 에 클라이언트와 서버에서 개발해야 할 내용이 명확해지고 서로간 의존성이 줄어들게 됩니다.

  6. **계층형 구조**

        REST 서버는 다중 계층으로 구성될 수 있으며 보안, 로드 밸런싱, 암호화 계층을 추가해 구조상의 유연성을 둘 수 있고 PROXY, 게이트웨이 같은 네트워크 기반의 중간 매체를 사용할 수 있게 합니다.


- 1.6 디자인 가이드

  1. URI는 정보의 자원을 표현해야 한다. (동사보다는 명사를 사용)
  2. HTTP METHOD
        - POST: 리소스 생성
        - GET: 리소스 조회
        - PUT: 리소스 수정
        - DELETE: 리소스 삭제
  3. REST 리소스 간의 관계
        - /리소스명/리소스ID/관계가 있는 다른 리소스명
        - GET: /users/{userid}/devices
        - GET: /users/{userid}/likes/devices

  4. Collection과 Document

        - Document는 단순히 문서 또는 한 객체 => 단수
        - Collection은 문서들의 집합, 객체들의 집합 => 복수
        - http://restapi.example.com/sports/soccer => sports 라는 컬렉션과 soccer라는 도큐먼트로 표현
        - http://restapi.example.com/sports/soccer/players/14 => sports,players 컬렉션과 soccer, 13(13번인 선수)를 의미하는 도큐먼트

  5. 상태코드
        - 200: 클라이언트의 요청을 정상적으로 수행함
        - 201: 클라이언트가 어떠한 리소스 생성을 요청, 해당 리소스가 성공적으로 생성됨(POST를 통한 리소스 생성 작업 시)
        - 301: 클라이언트가 요청한 리소스에 대한 URI가 변경되었을 때 사용하는 응답 코드
        - 400: 클라이언트 요청이 부적절 할 경우 사용하는 응답 코드
        - 401: 클라이언트 인증되지 않은 상태에서 보호된 리소스를 요청했을 때 사용하는 응답 코드
        - 402: 로그인 하지 않은 유저가 로그인 했을 때, 요청 불가능한 리소스를 요청했을 때
        - 403: 유저 인증상태와 관계 없이 응답하고 싶지 않은 리소스를 클라이언트가 요청했을 때 사용하는 응답 코드
        - 404: 403 보다는 400이나 404를 사용할 것을 권고. 403 자체가 리소스가 존재 한다는 뜻이기 때문
        - 405: 클라이언트가 요청한 리소스에서는 사용 불가능한 Method를 이용했을 경우 사용하는 응답 코드

\
\
[]()
### 🍀 2. API 문서

- 예시
  - https://docs.google.com/spreadsheets/d/1PSdxAJ0sWwX3dOwbtrdBDNMdJU0dFRfBtNo6GWl8dk/edit#gid=0
  - https://github.com/soptcomics/SOPT-COMICS-SERVER/wiki

\
\
\
[]()
## 🔥 7차 세미나
\
\
[]()
### 🍀 1. moment

- **1.1 정의**

    날짜/시간을 다루기 위한 다양한 기능 제공

- **1.2 구현**
    ```javascript
    let moment = require('moment');

    console.log(`moment => ${moment()}`) //현재시간
    console.log(`Date to moment => ${moment(new Date(2018,0,15))}`);
    console.log(yesterday.format()); // "2015-0615T00:00:00+09:00"
    console.log(yesterday.format('YYYY-MMDD')); // "2015-06-15"
    ```

    Timezone 설정하기
    ```javascript
    require('moment-timezone');
    moment.tz.setDefault("Asia/Seoul");
    ```

- **1.3 Moment module**

    Query
    ```javascript
    console.log(moment('2019-12-12').isSame('2020-10-21', 'year')); // false

    console.log(moment('2019-12-06').isSame('2019-12-06', 'month')); // true

    console.log(moment('2019-12-05').isSame('2019-10-21', 'date')); // false

    console.log(moment('2019-12-05').isAfter('2019-10-21')); // true

    console.log(moment('2019-12-05').isSameOrBefore('2019-10-21')); // false

    console.log(moment('2019-12-05').isBetween('2019-12-22','2020-01-04')); // false
    ```

    기간
    ```javascript
    var t1 = new Date(2019, 12, 22);
    var t2 = new Date(2020, 1, 4);
    var diff2 = {
    seconds: moment.duration(t2 - t1).asSeconds(), // 1123200
    minutes: moment.duration(t2 - t1).asMinutes(), // 18720
    hours: moment.duration(t2 - t1).asHours() //312
    };
    console.log(diff2);
    ```
    실행 결과
    ```javascript
    { seconds: 1123200, minutes: 18720, hours: 312 }
    ```

\
\
[]()
### 🍀 2. cron

- **1.1 정의**

    유닉스 계열 컴퓨터 운영 체제의 시간 기바 job 스케줄러 고정된 시간, 날짜, 간격에 주기적으로 실행할 수 있도록 스케줄링하기 위해 사용

- **1.2 node-cron 모듈**

    GNU crontab을 기반으로 하는 node.js용 순수 자바 스크립트의 가벼운 작업 스케줄러
    ![image](https://user-images.githubusercontent.com/35513039/70633445-ebbbed80-1c73-11ea-837a-344869312cec.png)

- **1.3 node-cron 실행 주기 예제**

    ```javascript
    const cron = require('node-cron');
    const moment = require('moment');
    cron.schedule('*/10 * * * * *', () => console.log('매 10초마다 실행', moment().format()));
    cron.schedule('0-30/7 * * * * *', () => console.log('0~30사이에 매 7초마다 실행', moment().format()));
    cron.schedule('25 * * * * *', () => console.log('25초에 실행', moment().format()));
    cron.schedule('26,27,28 * * * * *', () => console.log('26 또는 27 또는 28초에 실행', moment().format()));
    cron.schedule('0 12 * * *', () => console.log('매일 12시에 실행', moment().format()));
    cron.schedule('0 12 * * Jan', () => console.log('매주 일요일 12시에 실행', moment().format()));
    ```

\
\
[]()
### 🍀 3. Request 모듈

- **1.1 정의**

    서버 내부에서 다른 서버로 request를 보낼 때 사용하는 모듈 다른 서버에 request를 보내 데이터를 받아 옴

- **1.2 공공데이터 가져오기**

    ```java
    const request = require('request');

    const jsonData = {
    ServiceKey: '1QOQwNz1pQ9tHVUTtXXSvIUaELeSDfRLDAMJk722CSiM6LL7e68V8mmNUeqVnurFinZxM8%2FZf1cEkDeJyRPU%2Fg%3D%3D',
    numOfRows: 10,
    pageNo: 1,
    sidoName: '서울',
    searchCondition: 'HOUR'
    };

    var url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureSidoLIst';

    var queryParams = '?' + encodeURIComponent('ServiceKey') + `=${jsonData.ServiceKey}`; /* Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(jsonData.numOfRows); /* 한 페이지 결과 수 */
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(jsonData.pageNo); /* 페이지 번호 */
    queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent(jsonData.sidoName); /* 시도 이름 (서울, 부산, 대구, 인천, 광주, 대전, 울 산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종) */
    queryParams += '&' + encodeURIComponent('searchCondition') + '=' + encodeURIComponent(jsonData.searchCondition); /* 요청 데이터기간 (시간 : HOUR, 하 루 : DAILY) */

    request.get(url + queryParams, (error, response, body) => {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    const data = JSON.parse(body);
    const result = data.list.map(it => {
    const {cityName, coValue, no2Value, o3Value, pm10Value, pm25Value} = it;
    return {cityName, coValue, no2Value, o3Value, pm10Value, pm25Value};
    })
    console.log(result)
    ```

\
\
[]()
### 🍀 4. Error handling

- 기존의 status 코드와 json을 전달 하면서 처리

    ```javascript
    return {
        code: statusCode.OK,
        json: authUtil.successTrue('메시지',data)
    }
    ```
    ```javascript
    res.status(statusCode.BAD_REQUEST)
    .send(authUtil.successFalse('에러 메세지'))
    ```
- Error를 상속한 Class 정의

    ```javascript
    class DatabaseError extends Error {
        constructor(code = 'GENERIC', status = statusCode.DB_ERROR, ...params) {
            super(...params);
            if(Error.captureStackTrace){
                Error.captureStackTrace(this, DatabaseError);
            }
            this.code = code;
            this.status = status;
            this.message = 에러메시지;
        }
    }
    ```
- 다음과 같이 쓸 수 있다.

    ```javascript
    throw new DatabaseError();
    return data;
    ```