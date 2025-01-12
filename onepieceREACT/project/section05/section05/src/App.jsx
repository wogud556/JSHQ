import './App.css'
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from './components/Footer'
import Button from './components/Button'
import { useState } from 'react'
import Bulb from './components/Bulb'
import Counter from './components/Counter'
import Register from './components/Register'
import HookExam from './components/Hook'

// function App() {
//   const buttonProps = {
//     text: "메일",
//     color: "red",
//     a: 1,
//     b: 2,
//     c: 3,
//   }
//   return ( // 부모 컴포넌트
//     <>
//       <Button {...buttonProps}/>
//       <Button text={"카페"}/>
//       <Button text={"블로그"}>
//         <div>자식요소</div>
//       </Button>
//     </>
//   )
// }
// function App(){
//   //구조분해 할당, state의 기본 구문
  

//   return (<>
//   <Bulb/>
//   <Counter/>
//   </>)
// }


// function App(){
//   return (
//     <>
//       <Register/>
//     </>
//   )
// }

function App() {
  return (
    <>
      <HookExam/>
    </>
  );
}

export default App
