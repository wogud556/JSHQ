function add10 (num){
// 프로미스절의 기본 구분
    const promise = new Promise((resolve, reject)=> {
        // 비동기 작업 실행하는 함수
        // executor
        // resolve를 이용해서 비동기 상태를 변경해줌
        setTimeout(() =>{
            if(typeof num === "number") {
                resolve(num + 10);
            }else {
                reject("num이 숫자가 아닙니다.")
            }
        }, 2000);
    });

    return promise;
}

const p = add10(0);
p.then((result) => {
    console.log(result);

    const newP = add10(result);
    result 
    newP.then((result) => {
        console.log(result);
    });
});

// then 메서드
// -> 그 후에

add10(0)
.then((result) => {
    console.log(value);
    return add10(result);
})
.then((result) => {
    console.log(value);
    return add10(undefined);
})
.then((result) => {
    console.log(result);
})
.catch((error) => {
    console.log(error);
});

setTimeout(()=> {
    console.log(promise);
}, 3000);
console.log(promise);