// 배열
let arrA = new Array(); //배열 생성자를 이용하는 방법
let arrB = [] // 배열 리터럴을 이용하는 방법

let arrC = [1,2,3,
true, "hello", null, () => {}, {}];
console.log(arrC);

// 2. 배열 요소 접근 방법
let item1 = arrC[0];
let item2 = arrC[1];

console.log(item1, item2);

arrC[0] = "hello";
console.log(arrC);