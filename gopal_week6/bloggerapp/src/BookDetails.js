function BookDetails() {
  const books = [
    { id: 1, title: 'Atomic Habits', author: 'James Clear' },
    { id: 2, title: 'The Pragmatic Programmer', author: 'David Thomas & Andrew Hunt' },
    { id: 3, title: 'Clean Code', author: 'Robert C. Martin' },
    { id: 4, title: 'Deep Work', author: 'Cal Newport' }
  ];

  return (
    <div className="details-card">
      <h2>Book Details</h2>
      <ul>
        {/* Each list item needs a unique "key" so React can track it efficiently */}
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> — {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookDetails;
