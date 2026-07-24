import { useState } from 'react';
import flights from './flights';
import Notification from './Notification';

function UserPage() {
  const [bookedFlight, setBookedFlight] = useState(null);

  const handleBook = (flight) => {
    setBookedFlight(flight.name);
  };

  return (
    <div className="user-page">
      <h2>Book Your Flight</h2>

      {/* Notification returns null (renders nothing) until a flight is booked */}
      <Notification
        message={bookedFlight ? `Ticket booked successfully for ${bookedFlight}!` : null}
      />

      <table className="flight-table">
        <thead>
          <tr>
            <th>Flight</th>
            <th>From</th>
            <th>To</th>
            <th>Time</th>
            <th>Price</th>
            <th></th>
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
              <td>
                <button onClick={() => handleBook(flight)}>Book</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserPage;
