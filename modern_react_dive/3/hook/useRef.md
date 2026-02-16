
### 5. useRef(여기서부터 리액트를 다루는 기술)
- useRef는 useState와 동일하게 컴포넌트 내부에서 렌더링이 일어나도 변경 가능한 상태값을 저장한다는 공통점이 있음
- 그러나 useState와 구별되는 큰 차이점 두가지를 가지고 있음
  - useRef는 반환값이 객체 내부에 있는 current로 값에 접근 또는 변경할 수 있음
  - useRef는 그 값이 변하더라도 렌더링을 발생시키지 않음
- useRef로 useState를 흉내 내도 렌더링되지 않는다는 것을 알 수 있음
- 다음 코드를 통해 렌더링이 되지 않는지 살펴본다
- useRef를 사용한 간단한 코드
```
function RefComponent() {
    const count = useRef(0)

    function handleClick() {
        count.current +=1
    }

    // 버튼을 아무리 눌러도 변경된 count 값이 렌더링되지 않음
    return <button onClick={handleClick}>{count.current}</button>
}

```
- useRef에 대해 본격적으로 알아보기 위해 useRef가 왜 필요한지 고민해봐야함
- 렌더링에 영향을 미치지 않는 고정된 값을 관리하기 위해 useRef를 사용한다면 useRef를 사용하지 않고 그냥 함수 외부에서 값을 선언해서 관리하는 것도 동일한 기능을 수행할 수 있지 않을까?
```
let value = 0
function Component
```

#### 로컬 변수 사용하기
- 추가로 컴포넌트 로컬 변수를 사용해야 할 때도 useRef를 활용할 수 있음
- 여기서 로컬 변수란 렌더링과 상환없이 바뀔 수 있는 값을 의미함
- 클래스 형태로 작성된 컴포넌트의 경우에는 로컬 변수를 사용해야 할 때 다음과 같이 작성할 수 있다

```
import React, { Component } from 'react';

class MyComponent extends Component {
    id = 1
    setId = (n) => {
        this.id = n;
    }
    printId = () => {
        console.log(this.id);
    }
    render(){
        return(
            <div>
                MyComponent
            </div>
        );
    }
}

export default MyComponent;
```
- 이러한 코드를 함수 컴포넌트로 작성한다면? 다음과 같이 할 수 있다.

```
import React, {useRef} from 'react';

const RefSample = () => {
    const id = useRef(1);
    const setId = (n) => {
        id.current = n;
    }
    const printld = () => {
        console.log(id.current);
    }
    return (
        <div>
            refsample
        </div>
    );
};

export default RefSample;
```
- 이렇게 ref 안의 값이 바뀌어도 컴포넌트가 렌더링되지 않는다는 점에서 주의해야 함
- 렌더링과 관련되지 않은 값을 관리할 때만 이러한 방식으로 코드를 작성해라

