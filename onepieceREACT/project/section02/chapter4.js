// spread rest

let arr1 = [1,2,3];
let arr2 = [4,...arr1 ,5,6]; // arr1 배열에 모든 개별 내용을 펼쳐라
console.log(arr2);

let obj1 = {
    a : 1,
    b : 2,
};

let obj2 = {
    ...obj1,
    c: 3,
    d: 4,
};

function funcA(p1, p2, p3){}

funcA(...arr1);

//rest 매개변수
// -> Rest 나머지, 나머지 매개변수
// 값을 여러개를 받아야 할 때 사용하는 문법
function funcB(one, two, ...rest) {
    console.log(rest);
}
funcB(...arr1);