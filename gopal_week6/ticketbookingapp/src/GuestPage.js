import flights from './flights';

function GuestPage() {
  return (
    <div className="guest-page">
      <h2>Available Flights</h2>
      <p className="info-message">Please login to book tickets.</p>
      <table className="flight-table">
        <thead>
          <tr>
            <th>Flight</th>
            <th>From</th>
            <th>To</th>
            <th>Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.name}</td>
              <td>{flight.from}</td>
              <td>{flight.to}</td>
              <td>{flight.time}</td>
              <td>&#8377;{flight.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GuestPage;
