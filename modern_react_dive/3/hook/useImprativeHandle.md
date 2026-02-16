### useImperativeHandle
- useImprativeHandle은 실제 개발 과정에서는 자주 볼 수 없는 훅으로 널리 사용되지 않음
- 그럼에도 useImperativeHandle은 일부 사용 사례에서 유용하게 활용될 수 있음
- useImperativeHandle을 이해하기 위해서는 먼저 React.forwardRef에 대해 알아야 함

#### forwardRef살펴보기
- refsms useRef에서 반환한 객체로, 리액트 컴포넌트의 props인 ref에 넣어 HTMLElement에 접근하는 용도로 흔히 사용됨
- key와 마찬가지로 ref도 리액트에서 컴포넌트의 props로 사용할 수 있는 예약어로서 별도로 선언돼 있지 않아도 사용할 수 있음을 useRef예제에서 확인
- 만약 이러한 ref를 상위 컴포넌트에서 하위 컴포넌트로 전달하고 싶다면?, 즉 상위 컴포넌트에서는 접근하고 싶은 ref가 있지만 이를 직접 props로 넣어 사용할 수 없을때는 어떻게 해야할까
- 우리가 알고있는 단순한 ref와 props에 대한 상식으로 이 문제를 해결한다면 다음 코드와 같은 결과물이 나올 것
```
function ChildComponent({ref}) {
    useEffect(() => {
        //undefined
        console.log(ref)
    }, [ref])

    return <div>안녕</div>
}

function ParentComponent() {
    const inputRef = useRef()

    return (
        <>
            <input/>
            {/* 'ref' is not a prop. Trying to access it will result in 'undefined being returned. If you
need to access the same value within the child component, you should pass it as a different prop */}
            <ChildComponent ref = {inputRef} />
        </>
    )
}
```
- 리액트에서 ref는 props로 쓸 수 없다는 경고문과 함께 접근을 시도할 경우 undefined를 반환한다고 돼 있음
- 그렇다면 예약어로 지저된 ref대신 다른 props로 받으면 어떨까?

```
function ChildComponent({ parentRef }) {
    useEffect(() => {
        // {current : undefined}
        // {current : HTMLInputElement}
        console.log(parentRef)
    }, [parentRef])

    return <div>안녕!</div>
}

function ParentComponent() {
    const inputRef = useRef()

    return (
        <>
            <input ref={inputRef}/>
            <ChildComponent parentRef={inputRef} />
        </>
    )
}
```
- 이러한 방식은 앞선 예제와 다르게 잘 작동하는 것처럼 보임
- 이는 클래스 컴포넌트나 함수 컴포넌트에서도 동일하게 작동함
- forwardRef는 방금 작성한 코드와 동일한 작업을 하는 리액트 API
- 그런데 단순히 이렇게 Props로 구현할 수 있는 것을 왜 만든걸까
- forwardRef가 탄생한 배경은 ref를 전달하는데 있어서 일관성을 제공하기 위해서임
- 어떤 props명으로 전달할지 모르고, 이에 대한 완전한 네이밍의 자유가 주어진 props보다는 forwardRef를 사용하면 좀 더 확실하게 ref를 전달할 것임을 예측할 수 있고, 또 사용하는 쪽에서도 확실히 안정적으로 받아서 사용할 수 있음
- forwardRef를 사용하는 다음 예제를 본다.
```
const ChildComponent = forwardRef((props, ref) => {
    useEffect(() => {
        // {current: undefined}
        // {current HTMLInputElement}
        console.log(ref)
    }. [ref])

    return <div>안녕!</div>
})

funtion ParentComponent() {
    const inputRef = useRef()

    return (
        <>
            <input ref={inputRef} />
            <ChildComponent ref = {inputRef} />
        </>
    )
}
```
- 먼저 ref를 받고자 하는 컴포넌트를 forwardRef로 감싸고, 두 번째 인수로 ref를 전달받음
- 그리고 부모 컴포넌트에서는 동일하게 props.Ref를 통해 ref를 넘겨주면 됨
- 이렇게 forwardRef를 사용하는 코드로 수정하면 Ref를 props로 전달할 수 있고, 전달받은 컴포넌트에서도 ref라는 이름을 그대로 사용할 수 있음

#### useImperativeHandle
- useImperativeHandle은 부모에게서 넘겨받은 ref를 원하는 대로 수정할 수 있는 훅
- 아래 코드를 본다

```
const Input = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            alert: () => alert(props.value),

        }),
        [props.value],

    )
    return <input ref={ref}{...props}>
})

function App(){
    // input에 사용할 ref
    const inputRef = useRef()

    //input의 value
    const []

    const inputRef = useRef()

    const [text, setText] = useState('')

    function handleClick() {
        // inputRef에 추가한 alert라는 동작을 사용할 수 있음
        inputRef.current.alert()
    }

    function handleChange(e) {
        setTest(e.target.value)
    }

    return (
        <>
            <Input ref={inputRef} value ={text} onChange ={handleChange}/>
            <button onClick={handleClick}>
        </>
    )
}
```