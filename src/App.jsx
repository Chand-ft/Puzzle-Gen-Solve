import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CssBaseline, Box, Button, Slide, Grow } from '@mui/material';
import PuzzleGenerator from './components/PuzzleGenerator';
import PuzzleSolver from './components/PuzzleSolver';

const App = () => {
  const [checked, setChecked] = useState(true);

  return (
    <>
      <CssBaseline />
      <Router>
        
        <Slide direction="down" in={checked} mountOnEnter unmountOnExit>
          <AppBar position="static" sx={{ width: '100%' }}>
            
            <Toolbar sx={{ justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ color: 'black', fontWeight: 'bold' }}>
                Puzzle App By Chand
              </Typography>
            </Toolbar>

            
            <Toolbar sx={{ justifyContent: 'center' }}>
              <Button color="inherit" component={Link} to="/" sx={{ mx: 2 }}>
                Puzzle Generator
              </Button>
              <Button color="inherit" component={Link} to="/solver" sx={{ mx: 2 }}>
                Puzzle Solver
              </Button>
            </Toolbar>
          </AppBar>
        </Slide>

        
        <Grow in={checked} timeout={1000}>
          <Container>
            <Box sx={{ mt: 4 }}>
              <Routes>
                <Route path="/" element={<PuzzleGenerator />} />
                <Route path="/solver" element={<PuzzleSolver />} />
              </Routes>
            </Box>
          </Container>
        </Grow>
      </Router>
    </>
  );
};

export default App;
