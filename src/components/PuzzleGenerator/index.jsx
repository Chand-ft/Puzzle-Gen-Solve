import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';
import styles from './PuzzleGenerator.module.css';

const PuzzleGenerator = () => {
  const [wordCount, setWordCount] = useState(5);
  const [generatedString, setGeneratedString] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError(''); // Reset error before making the request
  
    // Use the Vite proxy path
    const apiUrl = `/api/PuzzleGenerator/words/${wordCount}`;
  
    console.log('Requesting URL:', apiUrl); // Log the URL being requested
  
    try {
      // Call the API through the Vite proxy
      const response = await axios.get(apiUrl);
  
      // Update the state with the actual wordSequence from the response
      setGeneratedString(response.data.wordSequence); // Extract the wordSequence field
    } catch (err) {
      setError('Failed to generate string. Try again.');
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };
  
  
  
  
  
  
  
  
  
  

  return (
    <div className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Generate Puzzle String
      </Typography>
      <TextField
        label="Word Count"
        type="number"
        value={wordCount}
        onChange={(e) => setWordCount(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleGenerate} variant="contained" color="primary" disabled={loading}>
        {loading ? 'Generating...' : 'Generate'}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {generatedString && <Typography>{`Generated String: ${generatedString}`}</Typography>}
    </div>
  );
};

export default PuzzleGenerator;
