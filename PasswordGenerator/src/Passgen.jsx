import React, { useCallback, useEffect, useRef, useState } from 'react'
import './Passgen.css';

function Passgen() {

    let [Length ,setLength] = useState(8);
    let [numberallowed ,setNumberallowed] = useState(false);
    let [charallowed,setCharallowed] = useState(false);

    let [password,setPassword] = useState('');

    let passwordRef = useRef(null);

    const passgen = useCallback(()=>{
      let pass = ""
      let str  = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numberallowed) str += "0123456789"
      if(charallowed) str += "!@#$%&()*{}+="
      for(let i = 1 ; i <= Length; i++)
      {
        let char = Math.floor(Math.random() * str.length + 1);
        pass  += str.charAt(char)
      }
      setPassword(pass);
      
    },[Length,numberallowed,charallowed,setPassword])

    const copypass = useCallback(()=>{
        
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password)
    },[password])

    useEffect(()=>{
      passgen();
    },[Length,numberallowed,charallowed,setPassword,passgen])

  return (
    <>
       <div className='container mt-5 py-5 d-flex passgen-main '>
    <h2 className='text-warning d-flex justify-content-center mb-5'>Password Generator</h2>
    <div className='row text-warning justify-content-center mt-3'>
      <div className='col-4 '>
        <input className='passgen-input p-1 bg-dark text-warning rounded-3' type='text' value={password}  ref={passwordRef}  readOnly />
      </div>
      <div onClick={copypass}  className='col-1 btn  text-dark py-1 fs-6 rounded-3 bg-info'>Copy</div>
    </div>

    <div className='row text-warning mt-5 justify-content-center'>
      <div className='col-2'>
        <input type='range'
        min={8}
        max={50}
         value={Length}
         onChange={(e)=>setLength(e.target.value)}
       />
      </div>

      <div className='col-2'>Length : ({Length}) </div>

      <div className='col-2'>
        <input type='checkbox'
        defaultChecked={numberallowed}
        value={numberallowed}
       onChange={()=>setNumberallowed((prev)=>!prev)}
        /><span>Number</span>
      </div>
      <div className='col-2'>
        <input type='checkbox'
        defaultChecked={charallowed}
        value={charallowed}
        onChange={()=>setCharallowed((prev)=>!prev)}
        />
        <span>Charecter</span>
      </div>
    </div>
   </div>
    </>
  )
}

export default Passgen
