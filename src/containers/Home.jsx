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
import '../App.css';
import logo from '../BookFinder.png'; 

const API_KEY = process.env.REACT_APP_API_KEY;
const HomePage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [pages, setPages] = useState(1);
  const [maxResult, setMaxResult] = useState(9);
  const [page, setPage] = useState(1);
  const [foundBook, setFoundBook] = useState(true);
  const [loading, setLoading] = useState(false);

  const getBooks = (idx) => {
    setLoading(true);
    axios({
        method: 'get',
        url: `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${idx}&maxResults=${maxResult}&key=${API_KEY}`,
      })
      .then((response) => {
        setPages(Math.ceil((response.data.totalItems)/9));
        if (!response.data.items) {
          setFoundBook(false)
        } else {
          setBooks(response.data.items);
          setFoundBook(true)
        };
        setLoading(false);
      })
      .catch(e => {
        setFoundBook(false)
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
        <img src={logo} alt='logo' className="App-logo"/>
        <TextField 
          id="standard-basic" 
          label="Search Book (title, author, etc)" 
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') onCLickSearch()
          }}
          style={{
            width:'40vw',
          }}
        />
        <TextField 
          id="maxresult" 
          label="Max. Book Result (default: 9)" 
          onChange={(e) => setMaxResult(e.target.value)}
          type="number"
          onKeyPress={(e) => {
            if (e.key === 'Enter') onCLickSearch()
          }}
          style={{
            width:'40vw',
          }}
        />
        <Button variant="contained" style={{marginTop: 10}} color="primary" onClick={onCLickSearch}>
          Search
        </Button>
      </header>
      
      <Container>

        {
          loading
          ?(<section className="Pagination-area"><CircularProgress /></section>)
          : !foundBook
          ? (<section className="Pagination-area">
              <Typography>The book you were looking for was not found</Typography>
            </section>)
          : books.length > 0 
          ? (
            <Grid container spacing={4}>
              { books.map((card) => (<BookCard card={card}/>)) }
           </Grid>
          )
          : null
        }

        <section className="Pagination-area">
          {books.length > 0 && foundBook && (<Pagination count={pages} page={page} onChange={onChangePage} variant="outlined" color="primary" />) }
        </section>
        
      </Container>
    </React.Fragment>
  )
}

export default HomePage