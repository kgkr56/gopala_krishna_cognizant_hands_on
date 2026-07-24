import './App.css';
import Counter from './Counter';
import WelcomeButton from './WelcomeButton';
import SyntheticEventButton from './SyntheticEventButton';
import CurrencyConvertor from './CurrencyConvertor';

function App() {
  return (
    <div className="App">
      <h1>React Event Handling Examples</h1>
      <Counter />
      <WelcomeButton />
      <SyntheticEventButton />
      <CurrencyConvertor />
    </div>
  );
}

export default App;
