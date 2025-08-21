import React, { useCallback, useEffect, useState,useRef} from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [CharacterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null )

  const [hidden,setHidden]=useState("opacity-0")

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (CharacterAllowed) str += "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

    for(let iteration=0;iteration<=length;iteration++){
      let rand=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(rand)
    }
    setPassword(pass)

  }, [length, numberAllowed, setPassword,CharacterAllowed]);

  const CopyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,)
    window.navigator.clipboard.writeText(password)
   let intervalId= setInterval(() => {
    setHidden("opacity-100")
    }, 100);
    setTimeout(() => {
      clearInterval(intervalId)
      setHidden("opacity-0")
    }, 700);
  },[password])

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <div
      className="bg-gray-800 max-w-md px-4 py-3 rounded-lg m-auto mt-10 flex items-center
    flex-col gap-4 relative"
    >
      <p className={`bg-blue-500 rounded-full text-xs text-white px-2 absolute bottom-[88px] right-[20px] duration-500 ${hidden}`}>copied</p>
      <h1 className="text-white font-semibold text-2xl">Password Generator</h1>
      <div className="flex w-full">
        <input
          className="w-full rounded-l-lg px-3 py-1 outline-none text-orange-500"
          type="text"
          value={password}
          placeholder="password"
          readOnly
          ref={passwordRef}
        />

        <button 
        onClick={CopyPasswordToClipboard}
        className="bg-blue-700 text-white px-3 py-1 rounded-r-lg active:scale-125">
          copy
        </button>
      </div>

      <div className="flex text-orange-500">
        <input
          value={length}
          min={6}
          className="accent-blue-500 w-[100px] mr-1 cursor-pointer"
          type="range"
          onChange={(e) => setLength(e.target.value)}
        />

        <p className="w-[80px] mr-1">length {length}</p>

        <input
          className="accent-blue-500 cursor-pointer"
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numbers"
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
        />
        <label className="mr-3 cursor-pointer" htmlFor="numbers">
          numbers
        </label>

        <input
          className="accent-blue-500 cursor-pointer"
          type="checkbox"
          defaultChecked={CharacterAllowed}
          id="characters"
          onChange={() => {
            setCharacterAllowed((prev) => !prev);
          }}
        />
        <label className="cursor-pointer" htmlFor="characters" id="characters">
          special characters
        </label>
      </div>
    </div>
  );
};

export default App;
