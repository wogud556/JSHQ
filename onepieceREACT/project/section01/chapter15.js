// 객체
let obj1 = new Object() // 객체 생성자
let obj2 = {}; //객체 리터럴

// 객체 프로퍼티
let person = {
    name : "이정환",
    age : 27,
    hobby : "테니스",
    job: "FE Developer",
    extra: {},
    10 : 20,
    "like cat" : true,
};

//3. 객체 프로퍼티를 다루는 방법
//3.1 특정 프로퍼티에 접근(점 표기법, 괄호 표기법)
let name = person.name;
console.log(name);

let age = person["age2"];
console.log(age);

let property = "hobby";
let hobby = person[property];
// 존재하지 않는 프로퍼티를 반환하면 undefined이 반환됨


// 밸류에 들어오는 타입은 자유롭다.
person.job = "fe developer";
person["favoriteFood"] = "떡볶이";

// 3.3 프로퍼티를 수정하는 방법
person.job = "educator";
person['favoriteFood'] = "초콜렛";

//3.4 프로퍼티를 삭제하는 방법
delete person.job;
delete person["favoriteFood"];
console.log(person);


//3.5 프로퍼티의 존재 유무르르 확인하는 방법
let result1 = "name" in person;
let result2 = "cat" in person;
console.log(result2);