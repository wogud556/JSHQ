import { useState, useRef, useReducer, useMemo, useCallback, createContext } from 'react';
import './App.css'
import Editor from './components/Editor';
import Header from './components/Header';
import List from './components/List';
import Exam from './components/Exam';

const mockData = [
  {
    id:0,
    isDone: false,
    content:"React 공부하기",
    date: new Date().getTime(),
  },
  {
    id:1,
    isDone: false,
    content:"빨래하기",
    date: new Date().getTime(),
  },
  {
    id:2,
    isDone: false,
    content:"노래 연습하기",
    date: new Date().getTime(),
  },
];
function reducer(state, action){
  switch(action.type){
    case 'CREATE': 
      return [action.data, ...state];
    case 'UPDATE': 
      return state.map((item) => 
        item.id === action.targetId
        ? {...item, isDone: !item.isDone}
        : item
        );
    case 'DELETE':
      return state.filter((item) => item.id!== action.targetId)
    default:
      return state;
  }
}

//app 안에다 만들면 리렌더링될때마다 호출하게됨

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();
console.log(TodoContext);



function App() {
  const [todos, dispatch] = useReducer(reducer,mockData);
  //const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3);

  // const onCreate = (content) => {
  //   dispatch({
  //     type: "CREATE",
  //     data : {
  //       id: idRef.current ++,
  //       isDone : false,
  //       content: content,
  //       date: new Date().getTime(),
  //     },
  //   })
  // };

  // const onUpdate = (targetId) => {
  //   // todos State 값들 중에
  //   // targetId와 일치하는 id를 갖는 투두 아이템의 isDone 변경

  //   // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열
  //   dispatch({
  //     type: "CRERTE",
  //     targetId :targetId,
  //   });
  // };

  // const onDelete = (targetId) => {
  //   //인수 : todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
  //   dispatch({
  //     type: "DELETE",
  //     targetId : targetId
  //   })
  // };

  const onCreate = useCallback((content)=> {
    dispatch({
      type: "CREATE",
      data : {
        id: idRef.current ++,
        isDone : false,
        content: content,
        date: new Date().getTime(),
      }
    });
  },[]);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId :targetId,
    })
  }, []);

  const onDelete = useCallback((targetId) => {
    //인수 : todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    dispatch({
      type: "DELETE",
      targetId : targetId
    })
  },[]);



  const a = {a : 1};
  const b = {b : 1};

  // 최초로 한번 렌더링 될때 마운트 될때에만 함수를 생성
  const func = useCallback(() => {},[])

  const memoizedDispatch = useMemo(() => {
    return {onCreate, onDelete, onUpdate};
  }, []);
  return (
  <div className = "App">
    <Header />
    <TodoStateContext.Provider value={todos}/>

    <TodoDispatchContext.Provider
      value={memoizedDispatch}
    >
    <Editor />
    <List 
    />

    </TodoDispatchContext.Provider>


  </div>
  );

  // return (
  //   <div className='App'>
  //     <Exam />
  //   </div>
  //)
}

export default memo(App)
