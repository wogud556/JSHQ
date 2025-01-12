// 1. 콜백함수
function main(value){
    console.log(1);
    console.log(2);
    value();
    console.log("end");
}

function sub(){
    console.log("i am sub");
}


main(() => {
    console.log("i am sum");
});

main(sub); // 콜백함수 호출

// 콜백함수의 활용
function repeat(count) {
    for(let idx = 1; idx <= count ; idx ++){
        console.log(idx);
    }
}

function repeatDouble(count) {
    for(let idx = 1; idx <= count; idx ++){
        console.log(idx * 2);
    }
}

function repeatTriple(count) {
    for(let idx = 1; idx <= count; idx ++){
        console.log(idx * 3);
    }
}

function repeatTriplecallback(count, callback) {
    for(let idx = 1; idx <= count; idx ++){
        callback(idx);
    }
}

repeat(s);

repeat2(5, function(idx) {
    console.log(idx);
});

repeat2(5, function(idx) {
    console.log(idx * 2);
});

repeat2(5, function(idx) {
    console.log(idx * 3);
});

repeatDouble(s);
