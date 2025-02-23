import React, { useState } from "react";
import "./Calculator.css";

function App() {
  const [expression, setExpression] = useState(""); // User input
  const [history, setHistory] = useState([]); // Calculation history

  // Adds numbers/operators to the expression
  function updateExpression(value) {
    setExpression(function (prev) {
      return prev.length < 15 ? prev + value : prev;
    });
  }

  // Evaluates the expression and updates history
  function calculate() {
    try {
      if (!expression.trim()) return;
      let result = new Function(`return ${expression}`)();
      setHistory([...history, `${expression} = ${result}`]);
      setExpression(result.toString());
    } catch {
      setExpression("Error");
    }
  }

  return (
    <div className="container">
      <div className="calculator">
        <div className="display">{expression || "0"}</div>

        <div className="buttons">
          {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "C", "0", "=", "+"].map(function (btn) {
            return (
              <button
                key={btn}
                onClick={function () {
                  if (btn === "=") {
                    calculate();
                  } else if (btn === "C") {
                    setExpression("");
                  } else {
                    updateExpression(btn);
                  }
                }}
              >
                {btn}
              </button>
            );
          })}
        </div>

        {history.length > 0 && (
          <div className="history">
            <h4>History</h4>
            <ul>
              {history.map(function (item, i) {
                return <li key={i}>{item}</li>;
              })}
            </ul>
            <button onClick={function () {
              setHistory([]);
            }}>
              Clear History
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
