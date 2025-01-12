// 1. Number Type
let num1= 27;
let num2 = 1.5;
let num3 = -20;

console.log(num1 + num2);
console.log(num1 - num2);
console.log(num1 * num2);
console.log(num1 / num2);
//모듈러 연산
console.log(num1 % num2);

let inf = Infinity;
let mInf = -Infinity;

//수치연산이 실패했을때 사용하는 값
let nan = NaN;

// 2. String Type
let myName = "이정환";
let myLocation = "목동";
let introduce = myName + myLocation;

console.log(introduce);

//백틱 : ${name} 이런식으로 문자열안에 임의로 값을 넣을 수 있음
//템플릿 리터럴
let introduceText = `${myName}은 ${myLocation}에 거주한다`;
console.log(introduceText);

// 3. Boolean
let isSwitchOn = true;
let isEmpty = false;

// 4. Null type(아무것도 없음)
let empty = null;

// 5. Undefined Type 아무값도 할당하지 않았을떄 생김 
let none;
console.log(none);