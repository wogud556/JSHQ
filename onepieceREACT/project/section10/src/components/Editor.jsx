import { useState, useRef, useContext } from 'react';
import './Editor.css'
import { TodoContext } from '../App';


const Editor =  () => {
    const {onCreate} = useContext(TodoContext);

    const [content, setContent] = useState("");
    const contentRef = useRef();

    const onChangeContent = (e) => {
        setContent(e.target.value);
    };

    const onKeydown = (e) => {
        if(e.keyCode === 13) {
            onSumit();
        }
    }

    const onSumit = () => {
        if(content === "") {
            contentRef.current.focus();
            return;
        }
        onCreate(content)
        setContent("")
    }

    return (
        <div className ="Editor">
            <input 
                ref={contentRef}
                value={content}
                onChange={onChangeContent}
                onKeyDown={onKeydown}
                placeholder="새로운 Todo" 
            />
            <button onClick={onSumit}>추가</button>
        </div>    
    );
};

export default Editor;