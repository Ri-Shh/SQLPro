import styles from './App.module.css';
import Task from './components/Task';
import Nav from './components/Nav';
import TextArea from './components/TextArea';
import Output from './components/Output';
import { useState } from "react";


function App() {
  const [query, setQuery] = useState('');
  let [run, setRun] = useState(0);
  let [flag, setFlag] = useState(true);
  const [csvData, setCsvData] = useState([]);

  const handleClick = (event) => {
    setFlag(!flag);
  }

  return (
    <div className={styles.App}>
      <header>
        <Task setRun={setRun} setQuery={setQuery} query={query} csvData={csvData} />
      </header>
      <main>
        <div className={styles.mainleft} style={flag ? {width: `250px`} : {width: `50px`}} >
          <Nav handleClick={handleClick} flag={flag}/>
        </div>
        <div className={styles.mainright} style={flag ? {width: `calc(100vw - 250px)`} : {width: `calc(100vw - 50px)`}}>
          <TextArea query={query} setQuery={setQuery} />
          <Output run={run} setRun={setRun} csvData={csvData} setCsvData={setCsvData} />
        </div>
      </main>
    </div>
  );
}

export default App;
