// 구조분해할당
let arr = [1,2,3];

let [one, two, three, four] = arr; // 이런식으로 할당한다
// 값이 없으면 undefined를 리턴함

let person = {
    name : "이정환",
    age : 27,
    hobby: "테니스",
};

//객체를 할때는 중괄호를 사용함
//let {name, age, hobby} = person;
//console.log(name, age, hobby);

let {
    age : myAge,
    hobby,
    name,
    extre = "hello",

} = person;

// 적용
const func = ({name, age, hobby, extra}) => {
    console.log(name, age, hobby, extra);
}

func(person);