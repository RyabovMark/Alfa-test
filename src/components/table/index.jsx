import React, { useEffect, useState } from "react";
import { MovieCard } from "../movieCard/index";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilmByCategory } from "../../features/filmSlice";
import {
  Badge,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";

const genreList = [
  "Action",
  "Adult",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Game-Show",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Reality-TV",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Talk-Show",
  "Thriller",
  "War",
  "Western",
];
const filmsPerPage = 12;

export const Table = () => {
  const dispatch = useDispatch();
  const [displayLikedList, setDisplayLikedList] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [genre, setGenre] = useState(genreList[0]);

  const { filmsList } = useSelector((state) => state.filmCollection);
  const filterByLike = filmsList.filter((item) => item.isLiked === true);
  const count = Math.ceil(filmsList.length / filmsPerPage);
  const indexOfLastFilms = currentPage * filmsPerPage;
  const indexOfFirstFilms = indexOfLastFilms - filmsPerPage;
  const displayFilms = filmsList.slice(indexOfFirstFilms, indexOfLastFilms);

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  const handleChange = (event) => {
    setGenre(event.target.value);
    setCurrentPage(1);
  };
  const handleButton = () => {
    setDisplayLikedList(!displayLikedList);
  };

  useEffect(() => {
    dispatch(fetchFilmByCategory({ genre }));
  }, [genre, dispatch]);

  return (
    <Box className="table">
      <Box className="table-title">
        <Badge badgeContent={filterByLike.length} color="primary">
          <Button
            variant="outlined"
            onClick={handleButton}
            className="table-btn"
          >
            follow list
          </Button>
        </Badge>
        {!displayLikedList && (
          <FormControl>
            <InputLabel id="select-label">Genre</InputLabel>
            <Select
              id="select"
              value={genre}
              label="Genre"
              labelId="select-label"
              className="table-genre-list"
              onChange={handleChange}
            >
              {genreList?.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>
      <Grid container columnSpacing={4} rowSpacing={4} className="table-grid">
        {(displayLikedList ? filterByLike : displayFilms).map((item) => {
          return (
            <Grid key={item.imdbid} item xs={6} md={3}>
              <MovieCard {...item} />
            </Grid>
          );
        })}
      </Grid>
      {!displayLikedList || filterByLike.length > filmsPerPage ? (
        <Pagination
          count={count}
          color="primary"
          page={currentPage}
          onChange={paginate}
          className="table-pagination"
        />
      ) : null}
    </Box>
  );
};
