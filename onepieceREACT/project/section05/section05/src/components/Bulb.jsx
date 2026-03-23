import { useState } from "react";

//자식 컴포넌트들은 props를 계속 받게되면 리렌더링이 계속 발생함
// state, props, 부모 컴포넌트가 변경되면 리렌더링이 된다.
const Bulb = () => {
    const [light, setLight] = useState("OFF");
    console.log(light);
    return (
      <div>
        {light === "ON" ? (
        <h1 style={{backgroundColor:"orange"}}>ON</h1> 
      ) : ( 
        <h1 style={{backgroundColor: "grey"}}>OFF</h1> 
      )}
  
    <button onClick={() => {
        setLight(light === "ON" ? "OFF" : "ON");
        //light = light === "ON" ? "OFF" : "ON";
      }}
      >
        {light === "ON" ? "끄기" : "켜기"}
      </button> 
      </div> 
    );
  };

  export default Bulb;