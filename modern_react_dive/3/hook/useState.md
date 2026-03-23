#### 1.1 useState
- 리액트에서 훅을 언급할 때 가장 먼저 떠올리는 것이 useState임
- useState는 함수 컴포넌트 내부에서 상태를 정의하고, 이 상태를 관리할 수 있게 해주는 훅임

##### useState구현 살펴보기
```
useState훅의 기본 사용법
import { useState } from 'react'

const [state, setState] = useState(initialState)
```
- useState의 인수로는 사용할 state의 초기값을 넘겨줌
- 아무런 값을 넘겨주지 않으면 초기값은 undefined
- useState 훅의 반환 값은 배열이며, 배열의 첫번째 원소로 state값 자체를 사용할 수 있고, 두번째 원소인 setState 함수를 이용해 해당 state의 값을 변경할 수 있음
- useState를 사용하지 않고 함수 내부에서 자체적으로 변수를 사용해 상태값을 관리한다고 가정

```
function Component() {
    let state = 'hello'

    function handleButtonClick() {
        state = 'hi'
    }

    return (
        <>
            <h1>{state}</h1>
            <button onClick={handleButtonClick}>hi</button>
        </>
    )
}
```
- 위 코드가 동작하지 않는 이유는 무엇인가
- 앞서 리액트에서 렌더링이 어떻게 일어나는지 살펴본 내용을 다시 한번 떠올려보면 리액트에서 렌더링은 함수 컴포넌트의 return과 클래스 컴포넌트의 render 함수를 실행한 다음, 이 실행 결과를 이전의 리액트 트리와 비교해 리렌더링이 필요한 부분만 업데이트해 이뤄진다고 정리함
- 그리고 리렌더링을 일으키는 방법에 대해서도 살펴봤는데, 위 코드에서는 리렌더링을 발생시키기 위한 조건을 전혀 충족하지 못하고 있음
- 그럼 아래처럼 해본다

```
function Component(){
    const [, triggerRender] = useState()

    let state = 'hello'

    function handleButtonClick(){
        state = 'hi'
        triggerRender()
    }

    return (
        <>
            <h1>{state}</h1>
            <button onClick={handleButtonClick}>hi</button>
        <>
    )
}
```
- useState 반환값의 두 번째 원소를 실행해 리액트에서 렌더링이 일어나게끔 변경함
- 그럼에도 여전히 버튼 클릭 시 state의 변경된 값이 렌더링되고 있지 않음
- state가 업데이트되고 있는데 왜 렌더링이 되지 않을까?
  - 리액트의 렌더링은 함수 컴포넌트에서 반환한 결과물인 return의 값을 비교해 실행되기 때문임
- 즉 매번 렌더링이 발생될 때마다 함수는 다시 새롭게 실행되고, 새롭게 실행되는 함수에서 state는 매번 hello로 초기화 되므로 아무리 state를 변경해도 hello로 초기화 되는 것임
- 함수 컴포넌트는 매번 함수를 실행해 렌덜이이 일어나고, 함수 내부의 값은 함수가 실행될 때마다 다시 초기화 돰
- 그렇다면 useState 훅의 결괏값은 어떻게 함수가 실행되도 그 값을 유지하고 있을까?
- 리액트의 내부 구현을 하나도 모른다고 가정하고 useState가 어떤 구조를 가지고 있을지 상상해 본다.
```
function useState(initialValue){
    let internalState = initialValue

    function setState(newValue){
        internalState = newValue
    }

    return [internalState, setState]
}
```
- 그러나 이는 우리가 원하는 대로 작동하지 않음
```
const [value, setValue] = useState(0)
setValue(1)
console.log(value)
```

- 이러한 결과가 발생하는 이유는 setValue로 값을 변경했음에도 이미 구조 분해 할당으로 state값, 즉 value를 이미 할당해 놓은 상태이기 때문에 훅 내부의 setState를 호출하더라도 변경된 새로운 값을 반환하지는 못한 것
- 이를 해결하려면 먼저 state를 함수로 바꿔서 state의 값을 호출할 때마다 현재 state를 반환하게 하면 됨

```
function useState(initialValue){
    let internalState = initialValue

    function state(){
        return internalState
    }

    function setState(newValue) {
        internalState = newValue
    }

    return [state, setState]
}

const [value, setValue] = useState(0)
setValue(1)
console.log(value())
```
- 물론 이것은 우리가 사용하는 useState훅의 모습과는 많이 동떨어져 있음
- 우리는 state를 함수가 아닌 상수처럼 사용하고 있기 때문임
- 이를 해결하기 위해 리액트는 클로저를 이용함
- 여기서 클로저는 어떤 함수 내부에 선언된 함수가 함수의 실행이 종료된 이후에도 (useState가 호출된 이후에도) 지역변수인 state를 계속 참조할 수 있다는 것을 의미함
- 그렇다면 실제로 useState는 어떤 형태로 구현돼 있을까
- 다음 코드는 실제 리액트의 useState코드가 아니라 작동 방식을 대략적으로 흉내낸 코드임

```
//useState 내부의 모습을 구현한 모습

const MyReact = (function() {
    const global = {}
    let index = 0

    function useState(initialState) {
        if(!global.states){
            // 애플리케이션 전체의 states 배열을 초기화 함
            // 최초 접근이라면 빈 배열로 초기화함

            global.states = []
        }

        // states 정보를 조회해서 현재 상태값이 있는지 확인하고,
        // 없다면 초깃값으로 설정함.
        const currentState = global.states[index] || initialState

        // states의 값을 위해서 조회한 현재 값으로 업데이트함
        global.states[index] = currentState

        // 즉시 실행 함수로 setter를 만듬
        const setState = (function(){
            // 현재 index 클로저로 가둬놔서 이후에도 계속해서 동일한 index에 접근할 수 있도록 함
            let currentIndex = index
            return function (value) {
                global.states[currentIndex] = value
            }
        })()
        // useState를 쓸 때마다 index를 하나씩 추가함. 이 index는 setState에서 사용됨
        // 즉 하나의 state마다 Index가 할당돼 있어 그 index가 배열의 값(global.states)을
        // 가리키고 필요할 때마다 그 값을 가져오게 함
        index = index + 1

        return [currentState, setState]
    }

    function Component() {
        const [value, setValue] = useState(0)
    }
})();

```
- 작동 자체만 구현했을 뿐 실제 구현체와는 차이가 있음
- 실제 리액트 코드에서는 useReducer를 이요해 구현돼 있음
- useReducer와 useState는 크게 다르지 않은데, 이는 이후에 설명한다.
- 여기서 함수의 실행이 끝났음에도 함수가 선언된 환경을 기억할 수 있는 방법은 바로 1장에서 소개한 클로저임
- 매변 실행되는 함수 컴포넌트 환경에서 state의 값을 유지하고 사용하기 위해서 리액트는 클로저를 활용하고 있음
- 예제의 경우 MyReact라고 불리는 클로저 내부에 useState와 관련된 정보를 저장해두고, 이를 필요할 때마다 꺼내놓는 형식으로 구성돼 있음
- 이렇듯 useState는 자바스크립트의 특징 중 하나인 클로저에 의존해 구현돼 있을 것이라는 사실을 짐작해 볼 수 있음
- 클로저를 사용함으로써 외부에 해당 값을 노출시키지 않고 오직 리액트에서만 쓸 수 있고, 함수 컴포넌트가 매번 실행되더라도 useState에서 이전 값을 정확하게 꺼내 쓸 수 있게 됐음

### 게으른 초기화
- 일반적으로 useState 에서 기본 값을 선언하기 위해 useState()인수로 원시 값을 넣는 경우가 대부분일 것임
- 그러나 이 useState의 인수로 특정한 값을 넘기는 함수를 인수로 넣어둘 수 있음
- useState에 변수 대신 함수를 넘기는 것을 게으른 초기화라고 함
- 이 게으른 초기화가 무엇인지 살펴본다.
- 예제 코드

```
//일반적인 useState 사용
//바로 값을 넣음
const [count, setCount] = useState (
    Number.parseInt(window.localSotrage.getItem(cacheKey)),
)

// 게으른 초기화
// 위 코드와의 차이점은 함수를 실행해 값을 반환한다는 것
const [count, setCount] = useState(() => {
    Number.parseInt(window.localStorage.getItem(cacheKey)),
})
```
- 리액트 공식 문서에 이러한 게으른 초기화는 useState의 초기값이 복잡하거나 무거운 연산을 포함하고 있을 때 사용하라고 돼 있음
- 이 게으른 초기화함수는 오로지 state가 처음 만들어질 때만 사용됨
- 만약 이후에 리렌더링이 발생하면 이 함수의 실행은 무시됨
- 다음 예제를 본다.
```
import { useState } from 'react'

export default function App(){
    const[state, setState] = useState(() => {
        console.log('복잡한 연산...') // App 컴포넌트가 처음 구동될 떄만 실행되고, 이후 리렌더링 시에는 실행되지 않음

        return 0
    })

    function handleClick() {
        setState((prev) => prev+ 1)
    }
    
    return (
        <div>
            <h1>{state}</h1>
            <button onClick = {handleClick}>+</button>
        </div>
    )
}
```
- 리액트에서는 렌더링이 실행될 때마다 함수 컴포넌트의 함수가 다시 실행된다는 점을 명심함
- 함수 컴포넌트의 useState 값도 재실행됨
- 물론 우리는 앞서 구현 예제를 통해 내부에는 클로저가 존재하며, 클로저를 통해 값을 가져오며 초깃값은 최초에만 사용된다는 것을 알고 있음.
- 만약 useState인수로 자바스크립트에 많은 비용을 요구하는 작업이 들어가 있으면 이는 계속해서 실행될 위험이 존재함
- 그러나 우려와는 다르게 useState 내부에 함수를 넣으면 이는 최초 렌더링 이후에는 실행되지 않고 최초의 state값을 넣을 때만 실행됨
- 만약 Number.parseInt(window.localStorage.getItem(cacheKey))와 같이 한 번 실행되는 데 어느정도 비용이 드는 값이 있다고 가정해본다.
- useState의 인수로 이 값 자체를 사용한다면 초깃값이 필요한 최초 렌더링과, 초깃값이 있어 더 이상 필요없는 리렌더링 시에도 동일하게 계속 해당 값에 접근해서 낭비가 발생함
- 따라서 이런 경우에는 함수 형태로 인수에 넘겨주는 편이 훨씬 경제적일 것
- 초깃값이 없다면 함수를 실행해 무거운 연산을 시도할 것이고, 이미 초깃값이 존재한다면 함수 실행을 하지 않고 기존 값을 사용할 것임
- 그렇다면 게으른 최적화를 언제 쓰는것이 좋은가? 리액터에서는 무거운 연산이 요구될 때 사용하려고 함
- 즉 LocalStorage나 sessionStorage에 대한 접근, map, filter, find 같은 배열에 대한 접근, 혹은 초깃값 게산을 위해 함수 호출이 필요할 때와 같이 무거운 연산을 포함해 실행 비용이 많이 드는 경우에 게으른 초기화를 사용하는 것이 좋음

