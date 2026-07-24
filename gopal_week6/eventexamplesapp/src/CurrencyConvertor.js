import React from 'react';

// Approximate conversion rate: 1 INR = 0.011 EUR
const INR_TO_EUR_RATE = 0.011;

class CurrencyConvertor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rupees: '',
      euro: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ rupees: e.target.value });
  }

  // Handles the Click event of the Convert button
  handleSubmit(e) {
    e.preventDefault();
    const rupeeValue = parseFloat(this.state.rupees) || 0;
    const euroValue = (rupeeValue * INR_TO_EUR_RATE).toFixed(2);
    this.setState({ euro: euroValue });
  }

  render() {
    return (
      <div className="currency-section">
        <h2>Currency Convertor (INR to EUR)</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="rupees">Amount in Rupees (₹): </label>
          <input
            id="rupees"
            type="number"
            value={this.state.rupees}
            onChange={this.handleChange}
            placeholder="Enter amount in INR"
          />
          <button type="submit">Convert</button>
        </form>
        {this.state.euro !== null && (
          <p className="euro-result">
            ₹{this.state.rupees || 0} = €{this.state.euro}
          </p>
        )}
      </div>
    );
  }
}

export default CurrencyConvertor;
