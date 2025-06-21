import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    if (!query) return;
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await response.json();
    setBooks(data.items || []);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>📘 BookFinder</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
        style={{ padding: '10px', width: '300px' }}
      />
      <button onClick={searchBooks} style={{ padding: '10px 20px', marginLeft: '10px' }}>
        Search
      </button>
      <div>
        {books.map((book) => {
          const info = book.volumeInfo;
          return (
            <div key={book.id} style={{ background: '#fff', padding: '15px', marginTop: '20px', borderRadius: '5px' }}>
              <h3>{info.title}</h3>
              <p><strong>Author:</strong> {info.authors?.join(', ') || 'Unknown'}</p>
              {info.imageLinks?.thumbnail && <img src={info.imageLinks.thumbnail} alt="Cover" style={{ maxWidth: '100px' }} />}
              <p>{info.description?.substring(0, 150) || 'No description'}...</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
