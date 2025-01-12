import { useState, useMemo } from 'react';
import './List.css'
import TodoItem from './TodoItem';


const List =  ({todos, onUpdate, onDelete}) => {
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const getFilteredDate = () => {
        if(search === ""){
            return todos;
        }
        return todos.filter((todo) => 
            todo.content.toLowerCase().includes(search.toLowerCase())
        );
    }

    const filteredTodos = getFilteredDate();
    const getAnalyzedData = () => {
        
    };

    const { totalCount, doneCount, notDoneCount } = 
        useMemo(() => {
            console.log("getAnalyzedData 호출");
            const totalCount = todos.length;
            const doneCount = todos.filter((todo) => todo.isDone).length;
            const notDoneCount = totalCount - doneCount;

            return {
                totalCount,
                doneCount,
                notDoneCount,
            };
            
        },[todos]);
    //의존성배열 : deps

    // const {totalCount, doneCount, notDoneCount} = getAnalyzedData()

    return (
     <div className = "List">
        <h4>Todo List</h4>
        <div>
            total : {totalCount}
        </div>
        <div>
            done : {doneCount}
        </div>
        <div>
            notDone : {notDoneCount}
        </div>
        <input 
        value = {search}
        placeholder="검색어를 입력하세요" 
        onChange={onChangeSearch}
        />
        <div className="todos_wrapper">
            {filteredTodos.map((todo)=>{
                return <TodoItem  
                key={todo.id} {...todo} 
                onUpdate = {onUpdate}
                onDelete = {onDelete}
                />;
            })}
        </div>
     </div>
    );
};

export default List;