// 6가지의 요소 조작 메서드

// 1. push
// 배열의 맨 뒤에 새로운 요소를 추가하는 메서드
let arr1 = [1,2,3];
arr1.push(4);

console.log(arr1);
console.log(newLength);


// 2. pop
// 배열에 맨 뒤에 있는 요소를 제거하고, 반환
let arr2 = [1,2,3];
const popedItem = arr2.pop();

// 3. shift
// 베열에서 하나를 제외하는 메서드
let arr3 = [1,2,3]
arr3.shift();

const shiftedItem = arr3.shift();
console.log(shiftedItem, arr3);

// 4. unshift
// 배열에 새로운 요소를 추가하는 메서드
let arr4 = [1,2,3]
const newLength2 = arr4.unshift(0);
console.log(arr4);


// 5. slice
// 마치 가위처럼, 배열의 특정 범위를 잘라내서 새로운 배열로 반환

let arr5 = [1,2,3,4,5];
let sliced = arr5.slice(2,5);
let sliced2 = arr5.slice(2);
let sliced3 = arr5.slice(-3);

arr5.slice(2, 4 );