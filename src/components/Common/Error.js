import React from 'react';

const Error = function (props) {
    if (props.show) {
        return (
            <div className={props.class}><p>{props.msg}</p></div>
        )
    }
    else{
        return (<div></div>);
    }
};

export default Error;
