// date 객체를 생성하는 방법
let date1 = new Date(); //생성자
console.log(date1)

let date2 = new Date("1991-01-07");
console.log(date2);

// 2. timestamp
// 특정 시간이 "1970 01 01 00시 00분 00초 "로부터 몇 ms가 지났는지 의미하는 숫자값
let ts1 = date1.getTime();

let date4 = new Date(ts1);

//3. 시간 요소들을 추출하는 방법
let year = date1.getFullYear();
let month = date1. getMonth();
let date = date1.getDate();

let hour  = date1.getHours();
let minute = date1.getMimutes();
let seconds = date1.getSeconds();

date1.setFullYear(2023);
date1.setMonth(2);