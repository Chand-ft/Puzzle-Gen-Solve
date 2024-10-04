import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Card, CardContent, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Grow, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale, 
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PuzzleSolver = () => {
  const location = useLocation();
  const [inputSequence, setInputSequence] = useState('');
  const [wordCounts, setWordCounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const generatedString = params.get('generatedString');
    if (generatedString) {
      setInputSequence(generatedString);
    }
  }, [location.search]);

  const handleSolve = async () => {
    if (!inputSequence) {
      setError("This puzzle can't solve for an empty input.");
      return;
    }

    setLoading(true);
    setError('');

    const apiUrl = `https://numberwordgenerator20240927020628.azurewebsites.net/api/PuzzleSolver`;

    try {
      const response = await axios.post(apiUrl, {
        WordSequence: inputSequence,
      });

      setWordCounts(response.data);
    } catch (err) {
      setError("Looks like we're having some network troubles.");
    } finally {
      setLoading(false);
    }
  };

  const totalWords = wordCounts.reduce((acc, cur) => acc + cur.count, 0);

  const wordData = {
    labels: wordCounts.map((item) => item.word),
    datasets: [
      {
        label: `Word Count (${totalWords})`,
        data: wordCounts.map((item) => item.count),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Word Count Distribution',
        font: {
          size: 18,
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Words',
          font: {
            size: 16,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
        title: {
          display: true,
          text: 'Count',
          font: {
            size: 16,
          },
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
      <Card sx={{ maxWidth: 600, width: '100%', mb: 4 }}>
        <CardContent>
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
          <Button
            onClick={handleSolve}
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Solve'}
          </Button>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </CardContent>
      </Card>

      {wordCounts.length > 0 && (
        <Grow in={wordCounts.length > 0}>
          <Box sx={{ width: '100%', maxWidth: 800, height: 400 }}>
            <Bar data={wordData} options={chartOptions} />
          </Box>
        </Grow>
      )}
    </Box>
  );
};

export default PuzzleSolver;
