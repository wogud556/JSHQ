// 함수 표현식

function funcA(){
    console.log("funcA");
}

let varA = funcA;
varA();

varB();

let varB = function (){ // 익명함수
    console.log("funcB");
};
// 함수만들었다고 보기 힘듬

let varC2 = () =>  1;

let varC = (value) =>  value * 2;

console.log(varC);