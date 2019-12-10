module.exports = 
(rawUserData) => {
    userData = {
        "userIdx": rawUserData.userIdx,
        "userId": rawUserData.userId,
        "userPw": rawUserData.userPw,
        "token": rawUserData.token,
        "signupDate":rawUserData.signupDate
    }
    return userData;
}