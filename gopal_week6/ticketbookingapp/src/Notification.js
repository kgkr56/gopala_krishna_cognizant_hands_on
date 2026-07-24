function Notification({ message }) {
  // Returning null prevents the component from rendering anything at all
  if (!message) {
    return null;
  }

  return <div className="notification">{message}</div>;
}

export default Notification;
