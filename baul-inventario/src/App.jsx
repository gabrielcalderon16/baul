import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./scss/styles.scss";
import * as bootstrap from "bootstrap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container py-4 px-3 mx-auto">
        <h1>Hello, Bootstrap and Vite!</h1>
        <button
          className="btn btn-primary"
          onClick={() => setCount((count) => count + 1)}
        >
          Primary button
        </button>
        <p>Count: {count}</p>
      </div>
    </>
  );
}

export default App;
