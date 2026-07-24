import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      message: ''
    };

    // Binding methods so "this" refers to the component instance when called from JSX
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.sayHello = this.sayHello.bind(this);
    this.handleIncrementClick = this.handleIncrementClick.bind(this);
  }

  increment() {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }

  decrement() {
    this.setState((prevState) => ({ count: prevState.count - 1 }));
  }

  sayHello() {
    this.setState({ message: 'Hello! The counter was just incremented.' });
  }

  // The Increment button's onClick invokes this single handler,
  // which in turn calls two separate methods using "this"
  handleIncrementClick() {
    this.increment();
    this.sayHello();
  }

  render() {
    return (
      <div className="counter-section">
        <h2>Counter</h2>
        <p className="count-value">Count: {this.state.count}</p>
        <button onClick={this.handleIncrementClick}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
        {this.state.message && <p className="hello-message">{this.state.message}</p>}
      </div>
    );
  }
}

export default Counter;
