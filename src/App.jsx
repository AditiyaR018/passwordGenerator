//Kbh konsi chiz render is nnot in our hands<-->Ye sb react ke upar hain(Imp point)
import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [length,setLength] = useState(8);
  const [numAllowed,setNumAllowed] = useState(false);
  const [charAllowed,setcharAllowed] = useState(false);
  const [password,setPassword] = useState("");

  //useRef hook
  //Kisi bhi chiz ka jb reference lena hota hain tb useRef use hota haind
  const passwordRef = useRef(null)
  //---------------------------------------------------------------------------------------
  //usecallback->ye function ko cache mein rkhta hain,agr voh dobara run hota hain
  //jitna part dobara use hota hain usee uthalenga baaki ye sb react ki tension
  //that how its actually working
  const passwordGenerator = useCallback(()=>{
    let pass = "";//this is our password
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";//data jisse password bnayanga
    
    if(numAllowed) str+="0123456789";
    if(charAllowed) str+="!@#$%^&*()_+-=[]{}|;:"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length);//yha pe hame array ka random index value milla hain
      pass += str.charAt(char);//character
    }

    setPassword(pass);
  },
  [length,numAllowed,charAllowed,setPassword])//This dependency's is for more optimization(info will be stored in cache)
  //ye usecallback hamara optimization ka goal pura krta hain
  //yha setPassword eisliya rkha kiyuki agr password rkhenga toh infinite loop mein chle jayaga(as voh change hota jayaga)
  //----------------------------------------------------------------------------------------------------------
  //Password generator Method
  //usecallback hook --> ek function usee jitna ho ske cache mein rkh lo(In short memorize krta hian pura ya parts mein mein memorize krta hain)
  //agr voh dobara run hua, jitna part dobara run hota hain use re-use kro and baaki react ki sarr drdi
  // const cachedFn = useCallback(fn, dependencies)-->[numallowed,charAllowed]----<sb dependencies he hain>
  //fucntion fhirse se call hoga agr dependencies mein kuch change aayaga
  //----------------------------------------------------------------------------------------------------------
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()//PasswordRef se jo copy kr rhe hain voh actually highlight hoga
    //ham yha optionally select kr rhe hain as current value zero(NULL) hon ksta hain
    passwordRef.current?.setSelectionRange(0,length);//further optimization
    window.navigator.clipboard.writeText(password)//Ham clipboard mein abhi write he krna chahte hain
  }
  ,[password])
  //----------------------------------------------------------------------------------------------------------
  //One way to generate password is through by adding button and clicking it (To call the function)
  //2nd Method by Hook
  //-----------------------------------------------------------------------------------------------------------
  //for now useEffects needs two things 1)callback 2)Dependencies
  useEffect(()=>{//page load hone pr load hota hain(we only this for now)
    passwordGenerator()
  },[length,numAllowed,charAllowed])//it talks about if any changes occurs run it again
  //this completes our goal of running it again when anything changes
  // useCallBack and UseEffect waale dependencies ko compare mt krna ko compare mt
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
             className='outline-none bg-blue-700 text-white
            px-3 py-0.5 shrink-0 cursor-pointer'>copy</button>
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
