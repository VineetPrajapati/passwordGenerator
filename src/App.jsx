import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState("5");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxzy";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*?|+=";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPassword = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className=" w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-black">
      <h1 className="text-white text-center my-3 font-bold">
        Password Generator
      </h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 italic"
          placeholder="Password"
          readOnly
          ref={passRef}
        />
        <button
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-950"
          onClick={copyPassword}
        >
          Copy
        </button>
      </div>

      <div className="flex text-sm gap-x-3">
        <div className="flex items-center gap-x-1 text-white">
          <input
            type="range"
            min={0}
            max={100}
            value={length}
            className="cursor-pointe"
            onChange={(e) => setLength(e.target.value)}
          />
          <label> Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1 text-white">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label>Numbers</label>
        </div>

        <div className="flex items-center gap-x-1 text-white">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label>Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
