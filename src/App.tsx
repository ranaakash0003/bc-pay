import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <p className="text-2xl">Hello Vite + React!</p>
    </div>
  );
}

export default App;
