//이떄 children은 Button 컴포넌트 아래에 존재하는 하위태그
const Button = ({text, color, children}) => {
    const onClickButton = (e) => {
        console.log(e);
        conelos.log(text); // 이벤트 핸들러라는 함수라고 할 수 있음
    }
    console.log(props.text);
    return ( 
        <button 
        onClick={onClickButton}
        //onMouseEnter={onClickButton} // 마우스를 갖다 댔을 때 이벤트
        style={{color: props.color}}>
            {props.text} - {props.color}
            {children}
        </button>
    );
};

// 아무런 props가 전달되지 않았을 때 기본 props를 세팅하는 것
Button.defaultProps = {
    color: "black",
};

export default Button