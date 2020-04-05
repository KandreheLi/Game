import React,{useState} from 'react';
export function Level(){
    const[count, setCount] = useState(0)
    setInterval(()=>{setCount(count+5)},5000)
    return(
        <div style={{padding:'10px', fontWeight:'bold'}}>
            Survived for: {count} seconds
        </div>
    )
}