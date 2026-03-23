### 3. useMemo
- useMemo는 비용이 큰 연산에 대한 결과를 저증해 두고 이 저장된 값을 반환하는 훅임
- 흔히 리액트에서 최적화를 떠올릴떄 가장 먼저 언급되는 훅임
```
import {useMemo} from 'react'

const memorizedValue = useMemo(() => expensiveComputation(a,b),[a,b])
```
- 첫번째 인수로는 어떠한 값을 반환하는 생성 함수를, 두 번째 인수로는 해당 함수가 의존하는 값의 배열을 전달함
- useMemo는 렌더링 발생 시 의존성 배열의 값이 변경되지 않았으면 함수를 재실행하지 않고 이전에 기억된 값 그대로 반환하고, 의존성 배열의 값이 변경됐다면 첫 번째 인수의 함수를 실행한 후에 그 값을 반환하고 그 값을 다시 기억해 둘 것임
- 이러한 메모이제이션은 단순히 값 뿐만 아니라 컴포넌트도 가능

#### useMemo를 사용한 컴포넌트 메모이제이션
```
function ExpensiveComponent({value}) {
    useEffect(() => {
        console.log('rendering')
    })
    return <span>{value + 1000} </span>
}
function App() {
    const [value, setValue] = useState(10)
    const [, triggerRendering] = useState(false)

    // 컴포넌트의 props를 기준으로 컴포넌트 자체를 메모이제이션 헀음
    const MemorizedComponent = useMemo(
        () => <ExpensiveComponent value={value} />,
        [value],
    )

    function handleChange(e) {
        setValue(Number(e.target.value))
    }

    function handleClick() {
        triggerRendering((prev) => !prev)
    }

    return (
        <>
            <input value={value} onChange={handleChange}/>
            <button onClick={handleClick}>렌더링 발생<>
            {MemorizedComponent}
        </>
    )
}
``` 
- useMemo로 컴포넌트를 감쌀 수 있음. 물론 React.memo를 쓰는 것이 더 현명함
- triggerRendering으로 컴포넌트 렌더링을 강제로 발생시켰지만 MemoizedComponent는 리렌더링 되지 않는것을 확인할 수 있음
- MemoizedCompoment는 의존성으로 선언된 Value 가 변경되지 않는 한 다시 계산되는 일은 없을 것
- useMemo등 메모이제이션을 활용하면 무거운 연산을 다시 수행하는 것을 막을 수 있다는 장점이 있음
- useMemo는 어떠한 값을 계산할 때 해당 값을 연산하는데 비용이 많이 든다면 사용해 봄 직하다.
- 그러나 여기서 말하는 비용이 많이 드는 연산이란 정확히 무엇일까? 이 비용은 어떻게 측정할 수 있을까?
- 차라리 모든 값에 useMemo를 사용하면 어떨까? 이와 같은 내용은 2.5절 컴포넌트와 함수의 무거운 연산을 기억해두는 메모이 제이션에서 다룬 바 있음

