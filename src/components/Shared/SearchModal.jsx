import React, { useState, useEffect } from 'react'; // Added useEffect
import { Modal, Box, TextField, IconButton, List, ListItem, ListItemText, Typography, Paper, CircularProgress } from '@mui/material'; // Added CircularProgress
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { searchArticles } from '../../services/articlesService'; // Import searchArticles

const style = {
  position: 'absolute',
  top: '20%', // Position it a bit lower from the top
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 600, // Max width for larger screens
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3, // Padding
  borderRadius: 2, // Rounded corners
  outline: 'none',
  direction: 'rtl', // For Urdu content
};

const SearchModal = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);


  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearchTerm.trim()) {
        setResults([]);
        setError(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await searchArticles(debouncedSearchTerm);
        setResults(data);
      } catch (err) {
        console.error("Search failed:", err);
        setError('تلاش ناکام ہوگئی۔ براہ کرم دوبارہ کوشش کریں.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [debouncedSearchTerm]);


  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Trigger search immediately if form is submitted (e.g. pressing Enter)
    // The useEffect for debouncedSearchTerm will also run, but this ensures immediate action.
    if (searchTerm !== debouncedSearchTerm) {
        setDebouncedSearchTerm(searchTerm);
    } else {
        // If searchTerm is already same as debounced, manually trigger search if needed
        // This case is mostly handled by useEffect, but as a fallback:
        const performSearch = async () => {
            if (!searchTerm.trim()) {
              setResults([]);
              setError(null);
              return;
            }
            setLoading(true);
            setError(null);
            try {
              const data = await searchArticles(searchTerm);
              setResults(data);
            } catch (err) {
              console.error("Search failed:", err);
              setError('تلاش ناکام ہوگئی۔ براہ کرم دوبارہ کوشش کریں.');
              setResults([]);
            } finally {
              setLoading(false);
            }
          };
          performSearch();
    }
  };


  const handleCloseModal = () => {
    setSearchTerm(''); // Clear search term on close
    setDebouncedSearchTerm(''); // Clear debounced term
    setResults([]);
    setError(null);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="search-modal-title"
      aria-describedby="search-modal-description"
      closeAfterTransition
    >
      <Paper sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography id="search-modal-title" variant="h6" component="h2">
            خبریں تلاش کریں
          </Typography>
          <IconButton onClick={handleCloseModal} aria-label="بند کریں">
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleFormSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            autoFocus
            placeholder="یہاں تلاش کریں..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <IconButton type="submit" aria-label="تلاش کریں">
                  <SearchIcon />
                </IconButton>
              ),
              sx: { borderRadius: '8px' }
            }}
            sx={{ mb: 2, direction: 'rtl' }}
          />
        </form>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {error && <Typography color="error" sx={{ textAlign: 'center', my: 2 }}>{error}</Typography>}
        {!loading && !error && results.length === 0 && debouncedSearchTerm && (
          <Typography sx={{ textAlign: 'center', my: 2 }}>کوئی نتیجہ نہیں ملا۔</Typography>
        )}
        {!loading && !error && results.length > 0 && (
          <List sx={{ maxHeight: 300, overflow: 'auto' }}> {/* Scrollable list */}
            {results.map((article) => (
              <ListItem
                button
                component={Link}
                to={`/article/${article.id}`} // Use article.id for navigation
                key={article.id}
                onClick={handleCloseModal}
                sx={{
                  borderBottom: '1px solid #eee',
                  '&:last-child': { borderBottom: 'none' },
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              >
                <ListItemText primary={article.title} sx={{ textAlign: 'right' }} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Modal>
  );
};

export default SearchModal;
