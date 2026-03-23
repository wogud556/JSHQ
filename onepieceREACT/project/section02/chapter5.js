// 배열 객체 순회
let arr = [1,2,3];

// 1. 배열 인덱스
for(let i = 0; i < arr.length; i++){
    console.log(arr[i]);
}

let arr2 = [4,5,6,7,8];
for(let i = 0; i<arr2.length; i++){

}

for(let item of arr) {
    console.log(item);
}

// 객체 순회법
let person = {
    name:"이정환",
    age:27,
    hobby:"테니스",
};

//2.1 Object.keys 사용
// => 객체에서 key 값들만 뽑아서 새로운 배열로 반환
for(let i = 0; i< keys.length; i++){
    console.log(keys[i]);
}

for(let key of keys){
    console.log(key);
}

let value = Object.values(person);
console.log(values);

for(let value of values){
    console.log(value);
}

for(let key in person) {
    const value = person[key];
    console.log(key, value);
}