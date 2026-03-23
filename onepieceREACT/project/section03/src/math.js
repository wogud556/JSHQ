function add(a, b){
    return a + b;
}

function sub(a, b){
    return a - b;
}

//Common JS 방식의 모듈화
//ES Module 과 공존 안됨
// module.exports = {
//     add : add,
//     sub : sub,
// }

//ES Module 방식
export {add, sub};