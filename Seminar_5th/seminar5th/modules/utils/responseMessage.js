module.exports = {
    //auth
    SIGNUP_SUCCESS:"회원가입에 성공하였습니다.",
    EXIST_ID:"아이디가 이미 있습니다.",
    MISS_MATCH_PW: "비밀번호가 일치하지 않습니다",
    NOT_FOUND_ID:"아이디를 찾을 수 없습니다.",
    LOGIN_SUCCESS:"로그인이 성공하였습니다.",
    EXIST_USER_ERROR:"사용자가 이미 있습니다.",

    //token
    NO_TOKEN: "토큰이 없습니다." ,
    EXPIRED_TOKEN:"토큰이 만료되었습니다",
    INVALID_TOKEN:"토큰을 사용할 수 없습니다.",
    
    //DB
    DB_ERROR: '디비 내부 오류',
    DB_REFERENCE_ERROR: '잘못된 외래키입니다.',
    DB_NOT_MATCHED_ERROR: '해당 조건에 일치하는 데이터가 없습니다.',
    DB_DUPLICATE_ENTRY_ERROR: '중복되는 값이 이미 존재합니다',

    //util
    NOT_CREATE_INFO:(x) => `${x} 생성 실패하였습니다.`,
    NOT_UPDATE_INFO:(x) => `${x} 수정 실패하였습니다.`,
    NOT_DELETE_INFO:(x) => `${x} 삭제 실패하였습니다.`,
    NOT_FOUND:(x) => `${x}(을)를 찾을 수 없습니다.`,
    OUT_OF_VALUE: "파라미터 값이 잘못 되었습니다.",
    NULL_VALUE: "필요한 값이 없습니다.",
    INTERNAL_SERVER_ERROR: '서버 내부 오류',
    UNAUTHORIZED: (x) => `${x}의 권한이 없습니다.`,
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
}