import React from 'react'
import { useState, useEffect } from 'react'
const Counter = () => {
    const [count1, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const Increment1 = () => {
        setCount(count1 + 1);
    }
    const Increment2 = () => {
        setCount2(count2 + 1);
    }
    useEffect(() => {
        console.log('Count1 changed:', count1);
    }, [count1]);
    useEffect(() => {
        console.log('Count2 changed:', count2);
    }, [count2]);
  return (
    <div className='counter'>
        <h2>Counterrrrrrrrrrrr</h2>
        <h3>Count1: {count1}</h3>
        <h3>Count2: {count2}</h3>
        <button onClick={Increment1}>Increment 1</button>
        <button onClick={Increment2}>Increment 2</button>
    </div>
  )
}


export default Counter

