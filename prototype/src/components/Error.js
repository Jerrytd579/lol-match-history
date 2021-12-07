import React from 'react';

let Error = ({status, message}) => 
    <div className="error">
        <p> Error {status}</p>
        <p> {JSON.stringify(message)} </p>
    </div>;

export default Error;
