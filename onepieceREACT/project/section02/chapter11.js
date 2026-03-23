// 콜백
function add(a,b) {
    setTimeout(() => {
        const sum = a+ b;
        console.log(sum);
    }, 3000);
}

add(1,2, (value) => {
    console.log(value);
});

// 음식을 주문하는 상황
function orderFood(){
    setTimeout(() => {
        const food = "떡볶이";
        callback(food);
    }, 3000);
}

function cooldownFood(food){
    setTimeout(() => {
        const cooldownedFood = `식은 ${food}`;
        callback(cooldownedFood);
    }, 2000);
}

function freezeFood(food) {
    setTimeout(() => {
        const freezedFood = `냉동된 ${food}`;
        callback(freezedFood)
    }, 1500);
}

orderFood ((food) => {
    console.log(food);

    cooldownFood(food, (cooldownFood) => {
        console.log(cooldownFood);

        freezeFood(cooldownedFood, (freezedFood) => {
            console.log(freezedFood);
        });
    });
});