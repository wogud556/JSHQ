// 단락평가

function returnFalse() {
    return false;
}

function returnTrue() {
    return true;
}

console.log(returnTrue() && returnFalse());


// 단락평가 활용 사례
function printName(person) {
    if(!person) {
        console.log("person에 값이 없음");
        return;
    }
    console.log(person && person.name);

    printName();
    printName({name : "이정환"});
}