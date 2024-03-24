import React, { useState } from 'react';
import './index.css';
import { Users } from './user';
import Table from './table';

function App() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const search = (data) => {
    return data.filter(
      (item) =>
        item.firstName.toLowerCase().includes(query) ||
        item.lastName.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query)
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = search(Users).slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(search(Users).length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const setPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to convert data to CSV format
  const convertToCSV = (data) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map(header => {
        const escaped = (''+row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  };

  // Function to download CSV file
  const downloadCSV = () => {
    const csvContent = convertToCSV(currentItems);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'users.csv';
    link.click();
  };

  // Define columns
  const columns = [
    { key: 'firstName', header: 'First Name' },
    { key: 'lastName', header: 'Last Name' },
    { key: 'status', header: 'Status' },
    { key: 'email', header: 'Email' },
    { key: 'yearOfBirth', header: 'Year of Birth' }
  ];

  return (
    <div className='app'>
      <div className="heading">REACT TABLE</div>
      <div className='search-container'>
        <input
          type='text'
          placeholder='Search here...'
          className='search'
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Table data={currentItems} columns={columns} />
      <div className='export-buttons'>
        <button onClick={downloadCSV}>Export to CSV</button>
      </div>
      <div className='pagination'>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPage(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
