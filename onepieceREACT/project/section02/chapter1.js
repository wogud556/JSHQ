// truthy falsy

let f1 = undefined;
let f2 = null;
let f3 = 0;
let f4 = -0;
let f5 = NaN;
let f6 = "";
let f7 = 0n;

if(!f1) {
    console.log("falsy");
}

// 2. Try=uthy
// -> 7가지 Falsy한 값을 제외한 나머지 모든 값
let t1 = "hello";
let t2 = 123;
let t3 = [];
let t4 = {};
let t5 = () => {};

if(t5) {
    console.log("Truthy")
}

// 3. 어떤 상황에서 쓰는지
function printName(person){
    if(!person) { // null undefind로 들어온다
        console.log("person의 값이 없음");
        return;
    }
    console.log(person.name);
}

let person = { name : "이정환"};
printName(person);