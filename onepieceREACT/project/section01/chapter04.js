// 1. 변수, 아래처럼 변수 선언한다, 혹은 초기화라고 함
let age;
console.log(age);
// undefined가 출력됨, 중복 선언은 안됨
age = 30;

console.log(age);

// 2. 상수, 한번 저장된 값은 변경할 수 없음
// 초기화 없이 선언하면 에러가 발생함
const birth = "1995.09.20";

console(birth);

// 3. 변수 명명규칙
// 3-1 $, _ 제외한 기호는 사용이 안됨
let $_name;

// 3-2. 숫자로 시작할 수 없음
let name1;
//let 2name;
let _2name; //이건 가능함

// 3-3 예약어를 사용할 수 없음(ex) let if 등등)

// 4. 변수 명명 가이드
let salesCount = 1;
let refundCount = 1;
let totalSalesCount = salesCount - refundCount;

