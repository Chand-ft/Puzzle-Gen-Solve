import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import styles from './PuzzleSolver.module.css';

const PuzzleSolver = () => {
  const [inputSequence, setInputSequence] = useState('');
  const [wordCounts, setWordCounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to call PuzzleSolver API
  const handleSolve = async () => {
    setLoading(true);
    setError(''); // Reset error before making the request
    const apiUrl = `/api/PuzzleSolver`; // Use the /api proxy path
    
    console.log('Requesting URL:', apiUrl); // Log the URL being requested
    
    try {
      // Call the API through the Vite proxy
      const response = await axios.post(apiUrl, {
        WordSequence: inputSequence, // Use "WordSequence" instead of "input"
      });
      setWordCounts(response.data); // Save the response data
    } catch (err) {
      setError('Failed to solve the puzzle.');
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };
  
  
  

  const wordData = {
    labels: wordCounts.map(item => item.word),
    datasets: [
      {
        label: 'Word Count',
        data: wordCounts.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Solve Puzzle
      </Typography>
      <TextField
        label="Input Sequence"
        multiline
        rows={4}
        value={inputSequence}
        onChange={(e) => setInputSequence(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleSolve} variant="contained" color="primary" disabled={loading}>
        {loading ? 'Solving...' : 'Solve'}
      </Button>
      {error && <Typography color="error">{error}</Typography>}

      {wordCounts.length > 0 && (
        <>
          {/* Display the word counts in a table */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Word</TableCell>
                <TableCell>Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wordCounts.map((wordCount, index) => (
                <TableRow key={index}>
                  <TableCell>{wordCount.word}</TableCell>
                  <TableCell>{wordCount.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Display the word counts as a bar chart */}
          <Bar data={wordData} />
        </>
      )}
    </div>
  );
};

export default PuzzleSolver;
