import React, { ChangeEvent, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbyhSewNhd8OEL6Qkzno5bkUaLstwmxuyjiCpIT43THikZ4ScdMFhyvgZFwtKHei_EL5kw/exec?query=options"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOptions(data.options);
        setLoading(false);
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
    alert("A name was submitted: " + option);
  }

  return loading ? null : (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label>How many transactions have you had this year</label>
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
  );
}

export default App;
