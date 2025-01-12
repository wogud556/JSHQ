// 1. 상수 객체
// 말그대로 상수에 저장해놓은 객체
const animal = {
    type: "고양이",
    name: "나비",
    color:"black",
};

animal.age = 2;
animal.name = "까망이";
delete animal.color;

//저장되어있는 객체값을 수정할 수 없음
console.log(animal);

//2. method
// -> 객체 프로퍼티중 값이 함수인 프로퍼티임

const person = {
    name : "이정환",
    //메서드
    sayHi : function() {
        console.log("안녕");
    }
};

person.sayHi();//메소드 선언