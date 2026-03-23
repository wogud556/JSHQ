import { useState } from "react";


const Viewer = ({count}) =>  {

    return (
        <div>
            <div>현재 카운트 1</div>
            <h1>{count}</h1>
        </div>
    );
};

export default Viewer;