#### 커스텀 Hooks 만들기
- 여러 컴포넌트에서 비슷한 기능을 공유할 경우 이를 여러분만의 Hook으로 작성하여 로직을 재사용할 수 있음
- 기존에 Info 컴포넌트에서 여러개의 인풋을 관리하기 위해 useReducer로 작성했던 로직을 useInputs라는 Hook으로 바로 분리해본다
- src 디렉터리에 useInput.js 파일을 만들고 다음 코드를 작성해본다

```
useInputs.js

import { useReducer } from 'react';

function reducer(state, action) {
    return (
        ...state,
        [action.name]: action.value
    );
}

export default function useInput(initialForm) {
    const [state, dispatch] = useReducer(reducer, initialForm);
    const onChange = e => {
        dispatch(e.target);
    };
    return [state, onChange];
}
```
- 이 훅을 Info 컴포넌트에서 사용해본다
```
import useInputs from './useInputs';

const info = () => {
    const [states, onChange] = useInputs({
        name: '',
        nickname: ''
    });
    const { name, nickname } = state;

    return (
        <div>
            <div>
                <input name="name" value={name} onChange={onChange}/>
                <input name="nickname" value={nickname} onChange={onChange}/>
            </div>
            <div>
                <div>
                    <b>이름:</b>{name}
                </div>
                <div>
                    <b>닉네임:</b>{nickname}
                </div>
             </div>
          </div>

    );
}

export default info
```