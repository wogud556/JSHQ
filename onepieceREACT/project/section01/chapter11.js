// 함수 선언 : 함수를 새롭게 불러낸다는 뜻

function greeting(){
    console.log("안녕하세요");
}

console.log("호출 전");
greeting();
console.log("호출 후");

// 예제 : 직사각형의 넓이를 구하는 함수
function getArea(){
    let width = 10;
    let height = 20;
    let area = width * height;

    console.log(area);

}

getArea();

// 예제 : 직사각형의 넓이를 구하는 함수
function getArea2(width, height){
    function another(){
        console.log("another");
    }

    another();

    let width = 10;
    let height = 20;
    let area = width * height;

    console.log(area);

    //반환값
    return area;

}

// 호이스팅
// 아래에 호출문을 두어도 내부적으로 알아서 호이스팅이 되서 선언을 먼저하고 함수선언을 하면 호이스팅으로 작동이됨

let area1 = getArea(10, 20);
console.log(area1);

let area2 = getArea(10, 20);
console.log(area2);

getArea2(10, 20);
getArea2(30, 20);
getArea2(120, 200);