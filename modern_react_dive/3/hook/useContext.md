### 6. useContext
- useContext에 대해 이해하려면 먼저 리액트의 Context에 대해 알아야 함

#### useContext란
- 리액트 애플리케이션에는 기본적으로 부모 컴포넌트와 자식 컴포넌트로 이루어진 트리 구조를 갖고 있기에 부모가 가지고 있는 데이터를 자식에서도 사용하고 싶다면 props로 데이터를 넘겨주는 것이 일반적
- 그러나 전달해야 하는 데이터가 있는 컴포넌트와 전달받아야 하는 컴포넌트의 거리가 멀어질수록 코드는 복잡해짐

```
<A props={something}>
    <B props={something}>
        <C props={something}>
            <D props={something}>       
        </C>
    </B>
</A>
```

- A컨포넌트에서 제공하는 데이터를 D 컴포넌트에서 사용하려면 props를 하위 컴포넌트로 필요한 위치까지 계속해서 넘겨야 함
- 이러한 기법을 Props 내려주기라고 함
- prop내려주기는 해당 데이터를 제공하는 쪽이나 사용하는 쪽 모두에게 불편함
- 해당 값을 사용하지 않는 컴포넌트에서도 단순히 값을 전달하기 위해 props가 열려 있어야 하고 사용하는 쪽도 이렇게 prop 내려주기가 적용돼 있는지 확인해야 하는 등 번거로운 작업임
- 이러한 prop 내려주기를 극복하기 위해 등장한 개념이 바로 콘텍스트
- 콘텍스트를 사용하면 이러한 명시적인 props전달 없이도 선언한 하위 컴포넌트 모두에서 자유롭게 원하는 값을 사용할 수 있음
- 콘텍스트의 용도를 살펴봤으니 콘텍스트를 실제로 선언하는 방법과 useContext에 대해 살펴봄

#### Context를 함수 컴포넌트에서 사용할 수 있게 해주는 useContext훅
- 콘텍스트와 해당 콘텍스트를 함수 컴포넌트에서 사용할 수 있게 해주는 useContext는 다음과 같이 작정할 수 있음

```
const Context = createContext<{hello: string} | undefined>(undefined)

function ParentComponent() {
    return (
        <>
            <Context.Provider value = {{hello: 'react' }}>
                 <Context.Provider value = {{hello: 'javascript' }}>
                    <ChildComponent/>
                </Context.Provider>
            </Context.Provider>
        </>
    )
}

function ChildComponent() {
    const value = useContext(Context)

    //React가 아닌 Javascript가 반환됨
    return <>{value? value.hello: ''}</>
}
```

- useContext는 상위 컴포넌트에서 만들어진 Context함수 컴포넌트에서 사용할 수 있도록 만들어진 훅임
- useContext를 사용하면 상위 컴포넌트어딘가에서 선언된 <Context.Provider /> 에서 제공한 값을 사용할 수 있게 됨
- 만약 여러 개의 Provider가 있다면 가장 가까운 Provider의 값을 가져오게 됨
- 예제에서는 가까운 콘텍스트의 값인 javascript가 반환됨
- 컴포넌트 트리거가 복잡해질수록 콘텍스트를 사용하는 것도 만만치 않을 것
- useContext로 원하는 값을 얻으려고 했지만, 정작 컴포넌트가 실행될 때 이 콘텍스트가 존재하지 않아 예상치 못하게 에러가 발생한 경험이 종종 있을 것.
- 이러한 에러를 방지하려면 useContext내부에서 해당 콘텍스트가 존재하는 환경인지, 즉 콘텍스트가 한 번이라도 초기화되어 값을 내려주고 있는지 확인해 보면 됨
- 아래 코드를 본다.
```
const MyContext = createContext<{hello:string} | undefined><undefined>

function ContextProvider({
    children,
    text,
}: PropsWithChildren<{text: string}>) {
    return (
        <MyContext.Provider value = {{hello:text}}>{children}</MyContext.Provider>
    )
}

function useMyContext() {
    const context = useContext(MyContext)
    if(context === undefined ) {
        throw new Error(
            'useMyContext는 ContextProvider 내부에서만 사용할 수 있습니다.',
        )
    }

    return context
}

function ChildComponent() {
    // 타입이 명확히 설정돼 있어서 굳이 undefined 체크를 하지 않아도 됨
    // 이 컴포넌트가 provider 하위에 없다면 에러가 발생할 것
    const { hello } = useMyContext()

    return <>{hello}</>

    function ParentComponent() {
        return (
            <>
                <ContextProvider text = "react">
                    <ChildComponent />
                </ContextProvider>
            </>
        )
    }
}
```

- 다수의 Provider와 useContext 를 사용할 때, 특히 타입스크립트를 사용하고 있다면 위와 같이 별도 함수로 감싸서 사용하는 것이 좋음
- 타입 추론에도 유용하고, 상위에 Provider가 없는 경우에도 사전에 쉽게 에러를 찾을 수 있음

### useContext 사용시 주의사항
- useContext를 함수 컴포넌트 내부에서 사용할 때 항상 컴포넌트 재활용이 어려워진다는 점을 염두에 두어야 함
- useContext가 선언돼 있으면 Provider에 의존성을 가지고 있는 셈이 되므로 아무데서나 재활용하기에는 어려운 컴포넌트가 됨
- 해당 함수 컴포넌트가 provider 하위에 있지 않은 상태로 useContext를 사용한다면 예기치 못한 작동 방식이 만들어지게 됨
- 즉 useContext가 있는 컴포넌트는 그 순간부터 눈으로는 직접 보지이도 않을 수 있는 Provider와의 의존성을 갖게 되는 셈
- 이러한 상황을 방지하려면 useContext를 사용하는 컴포넌트를 최대한 작게 하거나, 혹은 재사용되지 않을 만한 컴포넌트에서 사용해야 함
- 이러한 문제를 방지하기 위해 모든 콘텍스트를 최상위 루트 컴포넌트에 넣는 것은 어떨까?
- 앞서 언급한 에러는 줄어들 수 있지만 리액트 애플리케이션 관점에서는 그다지 현명한 접근법이 아님.
- 콘텍스트가 많아질수록 루트 컴포넌트는 더 많은 콘텍스트로 둘러싸일 것이고 해당 props를 다수의 컴포넌트에서 사용할 수 있게끔 해야 하므로 불필요하게 리소스가 낭비됨
- 따라서 컨택스트가 미치는 범위는 필요한 환경에서 최대한 좁게 만들어야 함
- 마지막으로 일부 리액트 개발자들이 콘텍스트와 useContext를 상태 관리를 위한 리액트의 API로 오해하고 있다는 것
- 엄밀히 따지자면 콘텍스트는 상태를 주입해 주는 API임
- 상태 관리 라이브러리가 되기 위해서는 최소한 다음 두가지 조건을 만족해야 함
  - 어떠한 상태를 기반으로 다른 상태를 만들어낼 수 있어야 함
  - 필요에 따라 이러한 상태 변화를 최적화할 수 있어야 함
- 그러나 콘텍스트는 둘 중 어느것도 하지 못함
- 단순히 props값을 하위로 전달해 줄뿐 useContext를 사용한다고 해서 렌더링이 최적화 되지 않음
```
const MyContext = createContext<{hello : string} | undefined>(undefined)

function ContextProvider({
    children,
    text,

}: PropsWithChildren<{text:string}>) {
    return (
        <MyContext.Provider value = {{hello : text}}>{children}</MyContext.Provider>
    )
}

function useMyContext(){
    const context = useContext(MyContext)
    if(context == undefined) {
        throw new Error (
            'useMyContext는 ContextProvider 내부에서만 사용할 수 있다.',
        )
    }
    return context
}

function GrandChildComponent() {
    const {hello} = useMyContext()

    useEffect(() => {
        console.log('렌더링 GrandChildComponent')
    })

    return <h3>{hello}</h3>
}

function ChildComponent(){
    useEffect(() => {
        console.log('렌더링 ChildComponent')
    })

    return <GrandChildComponent />
}

function ParentComponent() {
    const [text, setText] = useState('')

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setText(e.target.value)
    }

    useEffect (() => {
        console.log('렌더링 ParentComponent')
    })

    return (
        <>
            <ContextProvider text = "react">
                <input value = {text} onChange={handleChange} />
                <ChildComponent />
            </ContextProvider>
        </>
    )
}
```
- 코드를 살펴보면 ParentComponent 에서 Provider의 값을 내려주고, 이를 useContext로 GrandChildComponent에서 사용중임
- 언뜻 보기에는 text가 변경되는 ParentComponent와 이를 사용하는 GrandChildComponent만 렌더링될 것 같지만 그렇지 않음
- 사실은 컴포넌트 트리 자체가 리렌더링되는 중임

```
렌더링 GrandChildComponent
렌더링 ChildComponent
렌더링 ParentComponent
```
- 그 이유는 단순한데, 2.4절 렌더링은 어떻게 일어나는가에서 이야기한 부모 컴포넌트가 렌더링되면 하위 컴포넌트는 모두 리렌더링되는 상황이 바로 이 콘텍스트 사용 예제이기 때문
- useContext는 상태를 관리하는 마법이 아니라는 사실을 기억
- 거듭 이야기하자면 콘텍스트는 단순히 상태를 주입할 뿐 그 이상의 기능도 이하의 기능도 아님
- 아래 예제를 최적화 하려면 어떻게 해야할까 예제에서 ChildComponent가 렌더링되지 않게 막으려면 React.memo를 써야 함
- memo는 props변화가 없으면 리렌더링되지 않고 계속해서 같은 결과물을 반환할 것

```
const ChildComponent = memo(() => {
    useEffect(()=> {
        console.log('렌더링 ChildComponent')
    })

    retrurn <GrandChildComponent />
})
```
- useContext로 상태 주입을 최적화 했다면 반드시 Provider의 값이 변경될 때 어떤 식으로 렌더링되는지 눈여겨봐야 함
- useContext로는 주입된 상태를 사용할 수 없을 뿐 그 자체로는 렌더링 최적화에 아무런 도움이 되지 않음