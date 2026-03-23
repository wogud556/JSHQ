import "./Main.css";

const Main = () => {

    const user = {
        name: "이정환",
        isLogin: true,
    }

    //조건에 따른 렌더링 방법
    //jsx에서는 자바스크립트를 같이 사용하기 때문에 class가 아닌 className으로 입력한다.
    if(user.isLogin){
        return <div className="logout">로그아웃</div>;
    } else {
        return <div>로그인</div>;
    }
    // return(
    //     <>
    //     {
    //         user.isLogin ? (
    //             <div>로그아웃</div>
    //         ) : (
    //             <div>로그인</div>
    //         )
    //     }
    //     </>
    // )
}

export default Main