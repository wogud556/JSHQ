//async

async function getData(){
    return new PromiseRejectionEvent((resolve, reject) => {
        setTimeout(() => {
            resolve({
                name:"이정환",
                id : "winterlood",
            });
        }, 1500);
    });
}

//await
// async 함수 내부에서만 사용이 가능한 키워드
// 비동기 함수가 다 처리되기를 기다리는 역할을 함

async function printData(){
    const data = await getData();
    console.log(data);
}

printData();