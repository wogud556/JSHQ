// 1. if 조건문
let num = 10;

// if(num >= 10) {
//     console.log("num은 10 이상이다.");
//     console.log("조건은 참이다.");
// }else if(num >= 5){
//     console.log("num은 5 이상이다.")
// }else if(num >= 3){
//     console.log("num은 3 이상이다.")
// }else {
//     console.log("조건이 거짓이다!")
// }

// 2.Switch 문
// -> if문과 기능자체는 동일
// -> 다수의 조건을 처리할 때 if 보다 더 직관적임

let animal = "cat"

switch(animal){
    case "cat":{
        console.log("고양이");
        break;
    }
    case "dog":{
        console.log("강아지");
        break;
    }
    case "bear":{
        console.log("곰새끼");
        break;
    }
    case "snake":{
        console.log("뱀새끼");
        break;
    }
    case "tiger":{
        console.log("호랑이");
        break;
    }
}