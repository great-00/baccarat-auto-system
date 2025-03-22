
import React, { useState } from "react";
const BaccaratAutoSystem = () => {
  const [results, setResults] = useState([]);
  const [bettingHistory, setBettingHistory] = useState([]);

  const addResult = (res) => {
    const updated = [...results, res];
    setResults(updated);
    autoBetting(updated);
  };

  const autoBetting = (updatedResults) => {
    const last = updatedResults[updatedResults.length - 1];
    const secondLast = updatedResults[updatedResults.length - 2];

    let prediction = "B";
    let reason = "기본값";

    if (last && secondLast) {
      if (last === secondLast) {
        prediction = last;
        reason = "줄 흐름 예측";
      } else {
        prediction = last === "B" ? "P" : "B";
        reason = "반복 흐름 예측";
      }
    }

    const record = {
      회차: updatedResults.length,
      결과: last,
      추천: prediction,
      이유: reason
    };
    setBettingHistory((prev) => [...prev, record]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>💸 자동 수익형 바카라 시스템</h1>
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <button onClick={() => addResult("B")}>뱅커</button>
        <button onClick={() => addResult("P")}>플레이어</button>
        <button onClick={() => addResult("T")}>타이</button>
      </div>
      <div>
        <h2>📈 결과 흐름</h2>
        <div>
          {results.map((r, i) => (
            <span key={i} style={{
              padding: "4px 8px", marginRight: 4, borderRadius: 4, color: "white",
              backgroundColor: r === "B" ? "red" : r === "P" ? "blue" : "green"
            }}>
              {r}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h2>🤖 추천 베팅 기록</h2>
        {bettingHistory.map((entry, idx) => (
          <div key={idx}>
            {entry.회차}회차 - 결과: {entry.결과} → 추천: {entry.추천} ({entry.이유})
          </div>
        ))}
      </div>
    </div>
  );
};
export default BaccaratAutoSystem;
