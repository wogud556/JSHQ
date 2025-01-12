import { memo, useContext } from 'react';
import './TodoItem.css'
import { TodoDispatchContext } from '../App';

const TodoItem =  ({id, isDone, content, date}) => {
    const {onUpdate,onDelete} = useContext(TodoDispatchContext);
    const onChangeCheckbox = () => {
        onUpdate(id);
    };

    const onClickDeleteButton = () => {
        onDelete(id);
    }

    return (
        <div className ="TodoItem">
            <input 
                onChange={onChangeCheckbox}
                readOnly 
                checked={isDone} 
                type='checkbox' 
            />
            <div className="content">{content}</div>
            <div className="date">{new Date(date).toLocaleDateString()}</div>
            <button onClick={onClickDeleteButton}>삭제</button>
        </div>    
    );
};
// memo는 props가 바뀔때마다 리렌더링을 결정해야 함
// 앱 컴포넌트가 리렌더링이 되기때문에 하위 메모를 적용했더라도 리렌더링이 적용이됨
export default memo(TodoItem, (prevProps, nextProps) => {
    //반환값에 따라 Props가 바뀌었는지 안바뀌었는지 판단
    // T -> Props바뀌지 않음
    // F -> Props바뀜 리렌더링

    if(prevProps.id !== nextProps.id) return false;
    if(prevProps.isDone !== nextProps.isDone) return false;
    if(prevProps.content !== nextProps.content) return false;
    if(prevProps.date !== nextProps.date) return false;

    return true;
});