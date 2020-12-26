import React, { useState } from "react";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import BookCard from '../components/BookCard';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const HomePage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [foundBook, setFoundBook] = useState(true);
  const [loading, setLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const getBooks = (idx) => {
    setLoading(true);
    axios({
        method: 'get',
        url: `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${idx}&maxResults=9&key=${API_KEY}`,
        onDownloadProgress(progressEvent) {
          let progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          console.log(progress, "progress")
          setPercentage(progress)
        }
      })
      .then((response) => {
        setPages(Math.ceil(response.data.totalItems/9));
        if(response.data.totalItems === 0) setFoundBook(false) ;
        setBooks(response.data.totalItems > 0 ? response.data.items : [])
        setPercentage(0)
        setLoading(false);
      })
  }

  const onCLickSearch = () => {
    if(query === "") {
      setFoundBook(false);
    } else {
      getBooks(0);
      setPage(1);
    }
  }

  const onChangePage = (event, page) => {
    let startIndex = 9 * (page-1);
    setPage(page);
    getBooks(startIndex);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <header className="App-header">
        <p>Book Finder</p>
        <TextField 
          id="standard-basic" 
          label="Standard" 
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') onCLickSearch()
        }}
        />
        <Button variant="contained" color="primary" onClick={onCLickSearch}>
          Search
        </Button>

      </header>
      
      <Container>
        <Grid container spacing={4}>
        {
          loading
          ?(<CircularProgress />)
          : books.length > 0 
          ? books.map((card) => <BookCard card={card}/>) 
          : !foundBook
          ? (<Typography>Buku yang anda cari tidak ditemukan</Typography>)
          : null
        }
        </Grid>
        {books.length > 0 && (<Pagination count={pages} page={page} onChange={onChangePage} />) }
        
      </Container>
    </React.Fragment>
  )
}

export default HomePage