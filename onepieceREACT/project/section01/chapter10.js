// for 
for(초기식;조건식;증감식) {
    console.log("반복")
}

for(let idx=0;idx<5;idx++){
    if(idx % 2 === 0){
        continue;
    }
    console.log("반복")
    //강제로 종료하게하는 방법
    if(idx >=5) {
        break;
    }
}