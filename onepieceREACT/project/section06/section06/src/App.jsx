import { useState, useEffect } from 'react'
import Controller from '../components/Controller'
import Viewer from '../components/Viewer'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState("");

  const isMount = useRef(false);

  // 1. 마운트 : 탄생
  useEffect(() => {
  console.log("mount");
  }, [count, input]);

  //2. update
  useEffect(() => {
    if(!isMount.current){
      isMount.current = true;
      return
    }
  });

  // 3. unmount : 죽음

  // 의존성 배열로 deps라고 함
  const onClickButton = (value) => {
    setCount(count + value); // 상태변화가 비동기로 동작하기 때문에 실시간 상태를 알 수 없다.
  };

  return (
    <div className = "App">
    <h1>Simple Counter</h1>
    <section>
      <input 
      value={input} 
      onChange={(e) => {
        setInput(e.target.value);
      }}/>
    </section>
    <section>
      <Viewer count={count}/>
    </section>
    <section>
      <Controller onClickButton={onClickButton}/>
      </section>
    </div>
  )
}

export default App
