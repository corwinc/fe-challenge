import Transactions from '../Transactions';
import './style.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://www.taktile.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://uploads-ssl.webflow.com/5f646572718b789f1aab07ad/5f647cf4a925335e9d58f2e9_taktile-logo-monochrome.svg" alt="Taktile Logo" width="170" />
        </a>
      </header>
      <Transactions />
    </div>
  );
}

export default App;
