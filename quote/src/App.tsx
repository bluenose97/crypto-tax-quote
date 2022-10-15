import React, { ChangeEvent, useEffect, useState } from "react";
import "./App.css";

const url =
  "https://script.google.com/macros/s/AKfycbwHLLiV2BP-y1Rf9kIKKlXZEUz0MZ8FCjcDaqmAmxwSGFHyXWMt2IZgMMo_8UmRa6CNww/exec";

function App() {
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState("");
  const [cost, setCost] = useState("");
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loadingCost, setLoadingCost] = useState(false);

  useEffect(() => {
    setLoadingOptions(true);
    fetch(`${url}?query=options`)
      .then((response) => response.json())
      .then((data) => {
        setTimeout(function () {
          console.log(data);
          setOptions(data.options);
          setOption(data.options[0]);
          setLoadingOptions(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    setOption(event.target.value); //update your value here
  }

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoadingCost(true);
    setSubmitted(true);
    console.log(option);

    fetch(`${url}?query=cost&option=${option}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCost(data.cost);
        setLoadingCost(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return loadingOptions ? (
    <div className="App">
      <header className="App-header">Loading...</header>
    </div>
  ) : loadingCost ? (
    <div className="App">
      <header className="App-header">Calculating...</header>
    </div>
  ) : !submitted ? (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label>How many transactions have you had this year?</label>
          <br></br>
          <select value={option} onChange={onChange}>
            {options.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  ) : (
    <div className="App">
      <header className="App-header">Estimated cost: ${cost}</header>
    </div>
  );
}

export default App;
