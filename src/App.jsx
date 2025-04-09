import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [length,setLength] = useState(8);
  const [numAllowed,setNumAllowed] = useState(false);
  const [charAllowed,setcharAllowed] = useState(false);
  const [password,setPassword] = useState("");
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(()=>{
    let pass = "";//this is our password
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if(numAllowed) str+="0123456789";
    if(charAllowed) str+="!@#$%^&*()_+-=[]{}|;:"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length);
      pass += str.charAt(char);//character
    }

    setPassword(pass);
  },
  [length,numAllowed,charAllowed,setPassword])//This dependency's is for more optimization(info will be stored in cache)
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,length);//further optimization
    window.navigator.clipboard.writeText(password)
  }
  ,[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numAllowed,charAllowed])//it talks about if any changes occurs run it again
  return (
    <>
      {/* Level-1 (Div)-->The grey background that we see*/}
      <div className='w-full max-w-md mx-auto
      shadow-md px-4 my-8 text-orange-400 bg-gray-500 rounded-lg'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        {/* Level-2 (Div)
          It contains input and copy button*/}
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
           type="text"
           value={password}
           className='outline-none w-full py-1 px-3 bg-white my-3 rounded-lg'
           placeholder='password'
           readOnly
           ref={passwordRef}
            />
            <button
             onClick={copyPasswordToClipboard}
             >copy</button>
        </div>
        {/* Level-2 (Div)
        its the div which will contain innner divs which contain
        different types of inputs like range and checkbox*/}
        <div className='flex text-sm gap-x-2'>
          {/* Level-3 (Div) */}
          <div className='flex items-center gap-x-1 my-2'>
            <input
             type="range"
             min={6}
             max={100}
             value={length}
             className='cursor-pointer'
             onChange={(e)=>{setLength(e.target.value)}}
             />
             <label>Length: {length}</label>
          </div>
          {/* Level-3 (Div) */}
          <div className='flex items-center gap-x-1 my-2'>
            <input type="checkbox"
              defaultChecked = {numAllowed}
              id='numberInput'
              onChange={()=>{
                //in this callback inside setNum we get access of previous value
                setNumAllowed((prev) => !prev) //prev--> represents the current/previous value before updating
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          {/* Level-3 (Div) */}
          <div className='flex items-center gap-x-1 my-2'>
            <input type="checkbox"
              defaultChecked = {charAllowed}
              id='charInput'
              onChange={()=>{
                setcharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div> 
      </div>
    </>
  )
}

export default App
