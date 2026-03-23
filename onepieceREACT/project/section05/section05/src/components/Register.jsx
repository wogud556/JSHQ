import { useRef , useState} from "react";

//간단한 회원가입 폼 만들기
//1. 이름
//2. 생년월일
//3. 국적
//4. 자기소개
// 컴포넌트 외부에 변수를 선언하는 것을 권장하지 않음
// 만약 외부에 선언이 필요하다면 useRef 사용
const Register = () => {

    const [input, setInput] =useState({
        name:"",
        birth:"",
        country:"",
        bio:"",
    });

    const countRef = useRef(0);
    const inputRef = useRef();

    let count = 0;

    const onChange = (e) => {
        //countRef.current ++;
        count ++;
        console.log(count);
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    console.log(input)

    const onSubmit = () => {
        if(input.name === ""){
            // 이름을 입력하는 DOM 요소 포커스
            console.log(inputRef.current)
            inputRef.current.focus();
        }
    }

    return (
        <div>
        
            <div>
                <input 
                ref={inputRef}
                name = "name"
                value = {input.name} 
                onChange={onChange} 
                placeholder={"이름"} 
                />
            </div>
            <div>
                <input
                name = "birth"
                value={input.birth}
                onChange={onChange}
                type="date" 
                />
            </div>
            <div>
                <select 
                value = {input.country} 
                onChange={onChange} 
                name = "country">
                    <option value=""></option>
                    <option value="kr">한국</option>
                    <option value="us">미국</option>
                    <option value="uk">영국</option>
                </select>
            </div>
            <div>
                <textarea 
                value={input.bio} 
                onChange={onChange}
                name = "bio"
                ></textarea>
            </div>
            <button onClick={onSubmit}>
                제출
            </button>
        </div>
    )
}

export default Register;