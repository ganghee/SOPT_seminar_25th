
module.exports = {
    NULL_VALUE: "필요한 값이 없습니다.",
    OUT_OF_VALUE: "파라미터 값이 잘못 되었습니다.",
    
    X_CREATE_SUCCESS: (x) => `${x} 작성 성공`,
    X_CREATE_FAIL: (x) => `${x} 작성 실패`,
    X_READ_ALL_SUCCESS: (x) => `${x} 전체 조회 성공`,
    X_READ_ALL_FAIL: (x) => `${x} 전체 조회 실패`,
    X_READ_SUCCESS: (x) => `${x} 조회 성공`,
    X_READ_FAIL: (x) => `${x} 조회 실패`,
    X_UPDATE_SUCCESS: (x) => `${x} 수정 성공`,
    X_UPDATE_FAIL: (x) => `${x} 수정 실패`,
    X_DELETE_SUCCESS: (x) => `${x} 삭제 성공`,
    X_DELETE_FAIL: (x) => `${x} 삭제 실패`,  
    NO_X: (x) => `존재하지 않는 ${x} 입니다.`,
    ALREADY_X: (x) => `존재하는 ${x} 입니다.`,
    NO_TOKEN: "토큰이 없습니다." ,
    EXPIRED_TOKEN:"토큰이 만료되었습니다",
    MISS_MATCH_PW: "비밀번호가 일치하지 않습니다",
    INVALID_TOKEN:"토큰을 사용할 수 없습니다.",
    LOGIN_SUCCESS:"로그인이 성공하였습니다.",

    INTERNAL_SERVER_ERROR: "서버 내부 오류"
}