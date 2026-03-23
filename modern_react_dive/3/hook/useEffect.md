### 2. useEffect
- 리액트 코드를 작성할 때 useState만큼이나 자주 쓰이는 훅이 useEffect임
- 대부분의 개발자에게 useEffect의 정의에 대해 물어본다면 아래와 같은 답변을 들을 수 있음
  - useEffect는 두 개의 인수를 받는데, 첫번째는 콜백, 두번째는 의존성 배열임. 이 두번째 의존성 배열의 값이 변경되면 첫 번째 인수인 콜백을 실행함
  - 클래스 컴포넌트의 생명주기 메서드와 비슷한 작동을 구현할 수 있음. 두번째 의존성 배열에 빈 배열을 넣으면 컴포넌트가 마운트 될때만 실행됨
  - useEffect는 클린업 함수를 반환할 수 있는데, 이 클린업 함수는 컴포넌트가 언마운트될 때 실행됨
- 이러한 useEffect에 대한 정의는 어느 정도 옳지만 완전히 정학하지는 않음
- 그리고 useEffect는 자주 쓰지만 생각보다 사용하기 쉬운 훅이 아님
- 그리고 알려진 것처럼 생명주기 메서드를 대체하기 위해 만들어진 훅도 아님
- useEffect의 정의를 정확하게 내리자면 useEffect는 애플리케이션 내 컴포넌트의 여러 값들을 활용해 동기적으로 부수 효과를 만드는 메커니즘임
- 그리고 이 부수 효과가 언제 일어나는지 보다 어떤 상태값과 함께 실행되는지 살펴보는 것이 중요함

#### useEffect란?
- 아래 소스는 일반적인 useEffect 형탱ㅁ

```
function Compoment() {
    useEffect(() => {

    }, [props, state])
}

```
- 첫 번째 인수로는 실행할 부수 효과가 포함된 함수를, 두 번째 인수로는 의존성 배열을 전달함
- 이 의존성 배열은 어느 정도 길이를 가진 배열일 수도, 아무런 값이 없는 빈 배열일수도 있고, 배열 자체를 넣지 않고 생략할 수 있음
- 의존성 배열이 변경될 때마다 useEffect의 첫 번째 인수인 콜백을 실행한다는 것은 널리 알려진 사실
- 하지만 useEffect는 어떻게 의존성 배열이 변경된 것을 알고 실행될까?
- 여기서 한가지 기억해야 할 사실은 바로 함수 컴포넌트는 매번 함수를 실행해 렌더링을 수행한다는 것
- 예제
```
function Component() {
    const [counter, setCounter] = useState()

    function handleClick() {
        setCounter((prev) => prev + 1)
    }

    return (
        <>
            <h1>{counter}</h1>
            <button onClick={handleClick}>+</button>
        </>
    )
}

```
- 버튼을 클릭하면 counter에 값을 1씩 올리는 평범한 컴포넌트임
- 버튼을 클릭하면 이 함수의 컴포넌트는 useState의 원리에 따라 다음과 같이 작동한다.
```
function Compoment() {
    const counter = 1

    return (
        <>
            <h1>{counter}</h1>
            <button onClick={handleClick}>+</button>
        </>
    )
}
```
- 즉 함수 컴포넌트는 렌더링 시마다 고유의 state와 props값을 가지고 있음
- 여기에 useEffect가 추가된다면 다음과 같은 형태가 됨

```
function Component() {
    const counter = 1

    useEffect(() => {
        console.log(counter)
    })

    return (
        <>
            <h1>{counter}</h1>
            <button onClick={handleClick}>+</button>
        </>
    )
}
```
- useEffect는 자바스크립트의 proxy나 데이터 바인딩, 옵저버 같은 특별한 기능을 통해 값의 변화를 관찰하는 것이 아니고 렌더링 할 때마다 의존성이 있는 값을 보면서 이 의존성의 값이 이전과 드린게하나도 있으면 부수 효과를 실행하는 평범한 함수라 볼 수 있음.
- 따라서 useEffect는 static와 props의 변화속에서 일어나는 렌더링 과정에서 실행되는 부수 효과 함수라고 볼 수 있음
  
#### 클린업 함수의 목적
- 그렇다면 이른 바 클린업 함수라 불리는 useEffect내에서 반환되는 함수는 정확히 무엇이고 어던 일을 할까?
- 일반적으로 이 클린업 함수는 이벤트를 등록하고 지울 때 사용해야 한다고 알려져 있음
- 다음 예제를 살펴본다
```
import { useState, useEffect } from 'react'

export default function App(){
    const [counter, setCounter] = useState(0)

    function handleClick() {
        setCounter((prev) => prev + 1)
    }

    useEffect (() => {
        function addMouseEvent() {
            console.log(counter)
        }

        window.addEventListener('click',addMouseEvent)

        return() => {
            console.log('클린업 함수 실행!',counter)
            window.removeEventListener('click',addMouseEvent)
        }
    }, [counter])

    return(
        <>
            <h1>{counter}</h1>
            <button onClick={handleClick}>+</button>
        </>
    )
}
```
- 위 useEffect가 포함된 컴포넌트를 실행해 보면 다음과 같은 결과를 얻게 됨
```
클린업 함수 실행! 0
1

클린업 함수 실행! 1
2

클린업 함수 실행! 2
3

클린업 함수 실행! 2
4

```
- 로그를 살펴보면 클린업 함수는 이전 counter값, 즉 이전 state를 참조해 실행된다는 것을 알 수 있음
- 클린업 함수는 새로운 값과 함께 렌더링된 뒤에 실행되기 때문에 위와 같은 메시지가 나타남
- 여기서 중요한 것은, 클린업 함수는 비록 새로운 값을 기반으로 렌더링 뒤에 실행되지만, 이 변경된 값을 읽는 것은 아니라, 함수가 정의됐을 당시에 선언했던 이전 값을 보고 실행한다는 것
- 이러한 사실은 코드로 직관적으로 표현하면 다음과 같음
- 다음 코드는 렌더링이 수행될 때마다 counter가 어떤 값으로 선언돼 있는지 분병하게 보여줌

```
useEffect(() => {
    function addMouseEvent() {
        console.log(1)
    }

    window.addEventListener('click',addMouseEvent)

    // 클린업 함수
    // 그리고 이 클린업 함수는 당므 렌더링이 끝난 뒤에 실행됨
    return() => {
        console.log('클린업 함수 실행!', 1)
        window.removeEventListener('clock', addMouseEvent)
    }
},[counter])

// 이후 실행
useEffect(() => {
    function addMouseEvent() {
        console.log(2)
    }

    window.addEventListner('click',addMouseEvent)

    //클린업 함수

    return () => {
        console.log('클린업 함수 실행!',2)
        window.removeEventListener('click',addMouseEvent)
    }
}, [counter])
```
- 이 사실을 종합해 보면 왜 useEffect에 이벤트를 추가했을 때 클린업 함수에서 지워야 하는지 알 수 있음
- 함수 컴포넌트의 useEffect는 그 콜백이 실행될 때마다 이전의 클린업 함수가 존재한다면 그 클린업 함수를 실행한 뒤에 콜백을 실행함
- 따라서 이벤트를 추가하기 전에 이전에 등록했던 이벤트 핸들러를 삭제하는 코드를 클린업 함수에 추가하는 것
- 이렇게 함으로써 특정 이벤트의 핸들러가 무한히 추가되는 것을 방지할 수 있음
- 이처럼 클린업 함수는 생명주기 메서드의 언마운트 개념과는 조금 차이가 있는 것을 볼 수 있음
- 언마운트는 특정 컴포넌트가 DOM에서 사라진다는 것을 의미하는 클래스 컴포넌트의 용어
- 클린업 함수는 언마운트라기보다 함수 컴포넌트가 리렌더링 됐을 때 의존성 변화가 있었을 당시 이전의 값을 기준으로 실행되는 말 그대로 이전 상태를 청소해주는 개념으로 보는게 좋음

#### 의존성 배열
- 의존성 배열은 보통 빈 배열을 두거나, 아예 아무런 값도 넘기지 않거나, 혹은 사용자가 직접 원하는 값을 넣어줄 수 잇음
- 만약 빈 배열을 둔다면 리액트가 이 useEffect는 비교할 의존성이 없다고 판단해 최초 렌더링 직후에 실행된 다음부터 더이상 실행되지 않음
- 아무런 값도 넘겨주지 않는다면 이때는 의존성을 비교할 필요 없이 렌더링할 떄마다 실행이 필요하다고 판단해 렌더링이 발생할 때마다 실행됨
- 이는 보통 컴포넌트가 렌더링 됐는지 확인하기 위한 방법으로 사용됨

```
useEffect(() => {
    console.log('컴포넌트 렌더링됨')
})
```
- 위 코드처럼 구현해 둔다면 컴포넌트가 렌더링 될 때마다 useEffect가 실행될 것
- 만약 컴포넌트가 렌더링되는지 확인하고 싶다면 위와 같이 useEffect를 선언해두면 됨
- 그렇다면 한가지 의문점이 있다
- 의존성 배열이 없는 useEffect가 매 렌더링마다 실행된다면 그냥 useEffect없이 써도 되는게 아닌가?

```
function Component() {
    console.log('렌더링됨')
}

function Component() {
    useEffect(() => {
        console.log('렌더링됨')
    })
}
```
- 두 코드는 명백히 리엑트에서 차이점을 지니고 있음
- 차이점은 아래와 같다
  1. 이후 소개할 서버 사이드 렌더링 관점에서 useEffect는 클라이언트 사이드에서 실행되는 것을 보장해줌. useEffect 내부에서는 window객체의 접근에 의존하는 코드를 사용해도 됨
  2. useEffect는 컴포넌트 렌더링의 부수 효과, 즉 컴포넌트의 렌더링이 완료된 이후에 실행됨
    - 반면 직접 실행은 컴포넌트가 렌더링되는 도중에 실행됨
    - 따라서 1번과 달리 서버사이드 렌더링의 경우에 서버에서 실행됨
    - 그리고 이 작업은 함수 컴포넌트의 반환을 지연시키는 행위임
    - 즉 무거운 작업일 경우 렌더링을 방해하므로 성능에 악영향을 미칠 수 있음
- useEffect의 effect는 컴포넌트 사이드 이펙트, 즉 부수효과를 의미하는 것을 명심
- useEffect는 컴포넌트가 렌더링된 후에 어떤 부수 효과를 일으키고 싶을 때 사용하는 훅임

#### useEffect의 구현
- 그렇다면 useEffect는 어떻게 구현돼 있을까
- useState와 마찬가지로 리액트 코드를 직접 구현할 수 는 없지만 대략적인 모습은 다음과 같이 상상해 볼 수 있음

```
const MyReact = (function(){
    const global = {}
    let index = 0

    function useEffect(callback, dependencies) {
        const hooks = global.hooks

        //이전 훅 정보가 있는지 확인한다.
        let previousDependencies = hooks[index]

        // 변경됐는지 확인
        // 이전 값이 있다면 이전 값을 얕은 비교로 비교해 변경이 일어났는지 확인함
        // 이전 값이 없다면 최초 실행이므로 변경이 일어난 것으로 간주해 실행을 유도함
        let isDependenciesChanged = previousDependencies
            ? dependencies.some(
                (value, idx) => !Object.is(value, previousDependencies[idx]),
            )
            : true
        
        // 변경이 일어났다면 첫 번째 인수인 콜백 함수를 실행함
        if(isDependenciesChanged) {
            callback()
        }

        hooks[index] = dependencies

        index++
    }
    
    return { useEffect }
})()
```
- 핵심은 의존성 배열의 이전 값과 현재 값의 얕은 비교임
- 1.1.4에서 언급한것처럼 리액트는 값을 비교할 때 Object.is를 기반으로 하는 얕은 비교를 수행함
- 이전 의존성 배열과 현재 의존성 배열의 값에 하나라도 변경사항이 있다면 Callback으로 선언한 부수 효과를 실행함
- 이것이 useEffect의 본질

#### useEffect 를 사용할 때 주의할점
- useEffect는 리액트 코드를 작성할 때 가장 많이 사용하는 훅임녀서 가장 주의해야할 훅이기도 함
- useEffect를 잘못 사용하면 예기치 못한 버그가 발생할 수 있으며, 심한 경우 무한 루프에 빠지기도 함
- useEffect를 사용할 때 주의할 점은 무엇이 있는지 살펴본다.

#### eslint-disable-line react-hooks/exhaustive-deps 주석은 최대한 자제하라
- 리액트 코드를 읽다 보면 제법 심심치 않게 eslint-disable-line, react-hooks/exhaustive-deps주석을 사용해 ESLint의 react-hooks/exhaustive-deps룰에서 발생하는 경고를 무시하는 것을 볼 수있음
- 이 ESLint룰은 useEffect인수 내부에서 사용하는 값 중 의존성 배열에 포함돼 있지 않은 값이 있을 때 경고를 발생시킴
```
useEffect(() => {
    console.log(props)
}, []) //eslint-disable-line react-hooks/exhaustive-deps
```

- 정말로 필요한 때에는 사용할 수도 있지만 대부분의 경우에는 의도치 못한 버그를 만들 가능성이 큰 코드임
- 이 코드를 사용하는 대부분의 예제가 빈 배열 []을 의존성으로 할 때, 즉 컴포넌트를 마운트하는 시점에만 무언가를 하고 싶다라는 의도로 작성하곤 함
- 그러나 이는 클래스 컴포넌트의 생명주기 메서드인 componentDidMount에 기반한 접근법으로, 가급적이면 사용해선 안됨
- useEffect는 반드시 의존성 배열로 전달한 값의 변경에 의해 실해돼야 하는 훅
- 그러나 의존성 배열을 넘기지 않은 채 콜백 함수 내부에서 특정 값을 사용한다는 것은, 이 부수 효과가 실제로 관찰해서 실행해야 하는 값과는 별개로 작동한다는 것
- 즉 컴포넌트의 state, prop와 같은 어떤 값의 변경과 useEffet의 부수 효과가 별개로 작동하게 된다는 것
- useEffect에서 사용한 콜백 함수의 실행과 내부에서 사용한 값의 실제 변경 사이에 연결고리가 끊어져 있는 것
- 따라서 정말로 의존성으로 []가 팔요하다면 최초에 함수 컴포넌트가 마운트됐을 시점에만 콜백 함수 실행이 필요한지를 다시 한번 되물어봐야 함
- 만약 정말 그렇다라고 하면 useEffect내 부수 효과가 실행될 위치가 잘못됐을 가능성이 큼
```
function Component({log}: {log:string}) {
    useEffect(()=> {
        logging(log)
    }, [])
}
```

- 위 코드는 log가 최초로 props로 넘어와 컴포넌트가 최초로 렌더링된 시점에만 실행됨
- 코드를 작성한 의도는 아마도 해당 컴포넌트가 최초로 렌더링 됐을 때만 logging을 실행하고 싶어서일듯
- 그러나 위 코드는 당장 문제가 없을 지라도 버그의 위험성을 안고 있음
- log가 아무리 변하더라도 useEffect의 부수 효과는 실행되지 않고 useEffect의 흐름과 컴포넌트의 props.log의 흐름이 맞지 않게 됨
- 따라서 앞에서 logging이라는 작업은 log를 props로 전달하는 부모 컴포넌트에서 실행되는 것이 옳을 지도 모름
- 부모 컴포넌트에서 Component가 렌더링되는 시점을 결정하고 이에 맞게 log값을 넘겨준다면 useEffect의 해당 주석을 제거해도 위 예제 코드와 동일한 결과를 만들 수 있고 Component의 부수 효과 흐름을 거스르지 않을 수 있음
- useEffect에 빈 배열을 넘기기 전에는 정말로 useEffect의 부수 효과가 컴포넌트의 상태와 별개로 작동해야만 하는지, 혹은 여기서 호출하는게 최선인지 한번 더 검토해봐야 함
- 빈 비열이 아닐 때도 마찬가지, 만약 특정 값을 사용하지만 해당 값의 변경 싲머을 피할 목적이라면 메모이제이션을 적절히 활용해 해당 값의 변화를 막거나 적당한 실행 위치를 한번 더 고민해보는 것이 좋음

#### useEffect의 첫 번째 인수에 함수명을 부여하라
- useEffect의 수가 적거나 복잡성이 낮다면 이러한 익명 함수를 사용해도 큰 문제가 없음
- 그러나 useEffect의 코드가 복잡하고 많아질수록 무슨 일을 하는 useEffect코드인지 파악하기 어려워짐
- 이때 이 useEffect의 인수를 익명 함수가 아닌 적절한 이름을 사용한 기명 함수로 바꾸는 것이 좋다.
- 우리가 변수에 적절한 이름을 붙이는 이유는 해당 변수가 왜 만들어 졌는지 파악하기 위함임
- useEffect도 마찬가지로 적절한 이름을 붙이면 해당 useEffect의 목적을 파악하기 쉬워짐

```
useEffect(
    function logActiveUser() {
        logging(user.id)
    },
    [user.id],
)
```
- 함수명을 부여하는 것이 어색해 보일 수 있지만 useEffect의 목적을 명확히 하고 그 책임을 최소한으로 좁힌다는 점에서 굉장히 유용함

#### 거대한 useEffect를 만들지 마라
- useEffect는 의존성 배열을 바탕으로 렌더링 시 의존성이 변경될 때마다 부수 효과를 실행함
- 이 부수 효과의 크기가 커질 수록 애플리케이션 성능에 악영향을 미침
- 비록 useEffect가 컴포넌트의 렌더링 이후에 실행되기 때문에 렌더링 작업에는 영향을 적게 미칠 수 있지만, 여전히 자바스크립트 실행 성능에 영향을 미친다는 것은 변항 없음
- 가능한 한 useEffect는 간결하고 가볍게 유지하는 것이 좋음
- 만약 부득이하게 큰 useEffect를 만들어야 한다면 적은 의존성 배열을 사용하는 여러개의 useEffect로 분리하는 것이 좋음
- 만약 의존성 배열이 너무 거대하고 관리하기 어려운 수준까지 이른다면 정확히 이 useEffect가 언제 발생하는지 알 수 없게됨
- 만약 의존성 배열에 불가피하게 여러 변수가 들어가야 하는 상황이라면 최대한 useCallback과 useMemo등으로 사전에 정제한 내용들만 useEffect에 담아두는 것이 좋음
- 이렇게 하면 언제 useEffect가 실행되는지 좀 더 명확하게 알 수 있음

#### 불필요한 외부 함수를 만들지 마라
- useEffect의 크기가 작은 것과 같은 맥락에서 useEffect가 실행하는 콜백 또한 불필요하게 존재해서는 안됨
- 아래 코드를 본다

```
function Component({id}: {id:String}) {
    const [info, setInfo] = useState<number| null>(null)
    const controllerRef = useRef<AbortController|null>(null)
    const fetchInfomation = useCallback(async (fetchId : String) => {
        controllerRef.current?.abort()
        controllerRef.current = new AbortController()

        const  result = await fetchInfo(fetchId, {signal: controllerRef.signal})
        setInfo(await result.json())
    }, [])

    useEffect(() => {
        fetchInfomation(id)
        return () => controllerRef.current?.abort()
    }, [id, fetchInformation])
    return <div>{/* 렌더링 */}</div>
}
```
- 이 컴포넌트는 props를 받아서 그 정보를 바탕으로 API 호출을 하는 useEffect를 가지고 있음
- 그러나 useEffect 밖에서 함수를 선언하다보니 불필요한 코드가 많아지고 가독성이 떨어짐

```
function Component ({id}: {id:String}) {
    const[info, setInfo] = useState<number| null>(null)

    useEffect(() => {
        const controller = newAbortController()

        ;(async () => {
            const result = await fetchInfo(id, { signal:controller.signal })
            setInfo(await result.json())
        })()

        return () => controller.abort()
    }, [id])
    return <div> {/* 렌더링 */} </div>
}
```
- useEffect외부에 있던 관련 함수를 내부로 가져왔더니 훨씬 간결한 모습임
- 불필요한 의존성 배욜도 줄일 수 있었고, 또 무한루프에 빠지기 위해 넣었던 코드인 useCallback도 삭제할 수 있었음
- useEffect내에서 사용할 부수효과라면 내부에서 만들어서 정의해서 사용하는 편이 훨씬 도움이 됨

#### 왜 useEffect의 콜백 인수로 비동기 함수를 바로 넣을 수 있을까?
- useEffect 내부에서 state를 결과에 따라 업데이트 하는 로직이 있다고 가정해본다.
- useEffect의 인수로 비동기 함수가 사용 가능하다면 비동기 함수의 응답 속도에 따라 결과가 이상하게 나타날 수 있음
- 극단적인 예제로 이전 state기반의 응답이 10초가 걸렸고, 이후 바뀐 state 기반의 응답이 1초 뒤에 왔다면 이전 state기반으로 결과가 나와버리는 불상사가 생길 수 있음
- 이러한 문제를 useEffect의 경쟁상태(race condition)라고 함
```
useEffect(async () => {
    //useEffect에 async 함수를 넘겨주면 다음과 같은 에러가 발생함
    // effect callbacks are synchronous to prevent race condition
    // put the async function inside:
    const response = await fetch('http://some.data.com')
    const result = await response.json()
    setData(result)
}, [])
```
- 이러한 제약은 기술적인 문제가 있어서가 아님. 그 이유는 useEffect에서 비동기로 함수를 호출할 경우 경쟁상태가 발생할 수 있기 때문
- 그렇다면 비동기 함수는 어떻게 실행할 수 있을까?
- 한가지 유념해야 할 사실은 useEffect의 인수로 비동기 함수를 지정할 수 있는 것이지 비동기 함수자체가 문제가 되는 것은 아니라는 사실임
- useEffect 내부에서 비동기 함수를 선언해 실행하거나, 즉시 실행 비동기 함수를 만들어서 사용하는 것은 가능
```
useEffect(()=> {
    let shouldIgnore = false

    async function fetchData() {
        const response = await fetch('http://some.data.com')
        const result = await.response.json()
        if(!shouldIgnore) {
            setData(result)
        }
    }

    fetchData()

    return () => {
        //shouldIgnore를 이용해 useState의 두 번째 인수를 실행을 막는 것 뿐만 아니라
        //AbortController를 활용해 직전 요청 자체를 취소하는 것도 좋은 방법이 될 수 있음
        shouldIgnore = true
    }
}, [])
```
- 다만 비동기 함수가 내부에 존재하게 되면 useEffect 내부에서 비동기 함수가 생성되고 실행되는 것을 반복하므로 클린업 함수에서 이전 비동기 함수에 대한 처리를 추가하는 것이 좋음
- fetch의 경우 abortController등으로 이전 요청을 취소하는 것이 좋음
- 즉 비동기 useEffect는 state의 경쟁상태를 야기할 수 있고 Cleanup 함수의 실행 순서도 보장할 수 없기 때문에 개발자의 편의를 위해 useEffect에서 비동기 함수를 인수로 받지 않는다고 볼 수 있음