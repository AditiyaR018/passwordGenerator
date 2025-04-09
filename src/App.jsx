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
      <div className="w-full max-w-md mx-auto shadow-lg px-6 py-6 my-10 text-orange-400 bg-gray-700 rounded-2xl">
  <h1 className="text-white text-2xl font-semibold text-center mb-6">🔐 Password Generator</h1>

  {/* Input and Copy Button */}
  <div className="flex shadow-inner rounded-xl overflow-hidden mb-6 bg-white">
    <input
      type="text"
      value={password}
      className="w-full px-4 py-2 outline-none text-black"
      placeholder="Your secure password"
      readOnly
      ref={passwordRef}
    />
    <button
      onClick={copyPasswordToClipboard}
      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 font-medium transition-all duration-200"
    >
      Copy
    </button>
  </div>

  {/* Settings */}
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
    
    {/* Password Length */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <label className="text-white font-medium">Length: {length}</label>
      <input
        type="range"
        min={6}
        max={100}
        value={length}
        className="cursor-pointer accent-orange-500"
        onChange={(e) => setLength(e.target.value)}
      />
    </div>

    {/* Include Numbers */}
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        defaultChecked={numAllowed}
        id="numberInput"
        className="accent-orange-500"
        onChange={() => setNumAllowed((prev) => !prev)}
      />
      <label htmlFor="numberInput" className="text-white">Numbers</label>
    </div>

    {/* Include Characters */}
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        defaultChecked={charAllowed}
        id="charInput"
        className="accent-orange-500"
        onChange={() => setcharAllowed((prev) => !prev)}
      />
      <label htmlFor="charInput" className="text-white">Special Characters</label>
    </div>

  </div>
</div>

    </>
  )
}

export default App
