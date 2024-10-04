import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Container,
} from '@mui/material';

const PuzzleGenerator = () => {
  const [wordCount, setWordCount] = useState(5);
  const [generatedString, setGeneratedString] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openFirstDialog, setOpenFirstDialog] = useState(false);
  const [openSecondDialog, setOpenSecondDialog] = useState(false);

  const handleGenerate = async () => {
    if (!wordCount || wordCount <= 0) {
      setError("This puzzle can't solve for an empty input");
      return;
    }

    setLoading(true);
    setError('');

  
    setTimeout(async () => {
      const apiUrl = `https://numberwordgenerator20240927020628.azurewebsites.net/api/PuzzleGenerator/words/${wordCount}`;

      try {
        const response = await axios.get(apiUrl);
        setGeneratedString(response.data.wordSequence);
        setOpenFirstDialog(true);
      } catch (err) {
        setError("Looks like we're having some network troubles");
      } finally {
        setLoading(false);
      }
    }, 2500);
  };

  const handleYes = () => {
    setOpenFirstDialog(false);
    window.location.href = `/solver?generatedString=${generatedString}`;
  };

  const handleNo = () => {
    setOpenFirstDialog(false);
    setOpenSecondDialog(true);
  };

  const handleNewString = () => {
    setOpenSecondDialog(false);
  };

  const handleTestOwnString = () => {
    window.location.href = '/solver';
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Card elevation={3} sx={{ width: '100%', maxWidth: 500, textAlign: 'center' }}>
          <CardContent>
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
            <Button
              onClick={handleGenerate}
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
              sx={{ mt: 2, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Generate'}
            </Button>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            {generatedString && (
              <Typography variant="h6" sx={{ mt: 2 }}>
                Generated String: {generatedString}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>

      
      <Dialog open={openFirstDialog} onClose={() => setOpenFirstDialog(false)}>
        <DialogTitle>Use Puzzle Solver?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to solve the generated puzzle string in the Puzzle Solver?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleYes} color="primary">
            Yes, please
          </Button>
          <Button onClick={handleNo} sx={{ color: 'red' }}>
            No, thank you
          </Button>
        </DialogActions>
      </Dialog>

      
      <Dialog open={openSecondDialog} onClose={() => setOpenSecondDialog(false)}>
        <DialogTitle>Next Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to generate a new string or test your own string in the Puzzle Solver?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewString} color="primary">
            Generate a new string
          </Button>
          <Button onClick={handleTestOwnString} sx={{ color: 'green' }}>
            Test my own string
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PuzzleGenerator;
