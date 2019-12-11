## 5차 세미나 과제

1. Article Table에 Image Field를 추가합니다. \
   Article을 작성할 때 이미지 파일도 업로드 할 수 있습니다.


   ![image](https://user-images.githubusercontent.com/35513039/70599621-e7baac00-1c30-11ea-9aef-7dd4fffdf3b9.png)

\
\
\
![]()

2. 로그인 회원가입을 추가합니다. 이때 로그인이 성공한 경우 token값을 반환합니다.

    |회원가입|로그인|
    |:--:|:--:|
    |![image](https://user-images.githubusercontent.com/35513039/70600326-c78bec80-1c32-11ea-940f-16bd86a29c17.png)|![image](https://user-images.githubusercontent.com/35513039/70600334-cbb80a00-1c32-11ea-8d20-62fc01c375de.png)
|

\
\
\
![]()

3. 모든 객체(블로그, 게시글, 댓글)의 작성, 수정, 삭제는 token을 이용해서 검증단계를 거칩니다.

    authUtil의 모듈을 가져와 LoggedIn의 함수로 토큰 유효성 검증 


    **blog.js**
    
    ```javascript
    const express = require('express');
    const router = express.Router({mergeParams: true});
    const blogsControllers = require('../../controllers/blogsController');
    const {LoggedIn} = require('../../modules/utils/authUtil');

    router.get('/',blogsControllers.readAll);
    router.get('/:blogIdx',blogsControllers.read);
    router.use('/',LoggedIn);
    router.post('/',blogsControllers.create);
    router.put('/',blogsControllers.update);
    router.delete('/',blogsControllers.remove);

    module.exports = router;
    ```

    **authUtil.js**

    ```javascript
    LoggedIn: async(req, res, next) => {
        console.log("미들 웨어");
        var token = req.headers.token;
        if(!token){
            return res.status(statusCode.BAD_REQUEST).send(util.successFalse(resMessage.NO_TOKEN))
        }
        const result = jwt.verify(token); 
        console.log(result);
        if(result == -1) {
            res.status(statusCode.UNAUTHORIZED)
            .send(util.successFalse(resMessage.EXPIRED_TOKEN)); 
            return;
        }
        if(result == -2) {
            return res.status(statusCode.UNAUTHORIZED)
            .send(util.successFalse(resMessage.INVALID_TOKEN)); 
        }
        const userIdx = result.idx;
        req.decoded = userIdx;
        next();
    }
    ```