import React from "react";
import "./style.css";
import { Chip } from "../chip/index";
import { useActions } from "../../hooks/actions";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const imagePlaceHolder =
  "https://m.media-amazon.com/images/G/01/imdb/images/nopicture/180x268/film-173410679._CB468515592_.png";

export const MovieCard = (props) => {
  const {
    imageurl: imageUrl,
    genre,
    imdbid: imdbId,
    title,
    imdbrating: imdbRating,
    released,
    type,
    isLiked,
  } = props;

  const {
    removeFromFilmList,
    removeFromLikedPublications,
    setLikedPublications,
  } = useActions();

  return (
    <Box className="card">
      <Box className="card__content">
        <img
          className="card__image"
          src={imageUrl.length ? imageUrl[0] : imagePlaceHolder}
          alt="poster"
        />
        <Box className="card__description">
          <Box className="card__description-block">
            <Typography className="card__text">
              Rating on IMBD: {imdbRating}/10
            </Typography>
            <Typography className="card__text">
              Release date: {released}
            </Typography>
            <Box>
              {genre.map((item) => (
                <Chip label={item} key={item} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="card__container">
        <Typography className="card__title">{title}</Typography>
        <Box className="card__btn-group">
          <Typography className="card__type">{type}</Typography>
          <Box>
            <IconButton onClick={() => removeFromFilmList(imdbId)}>
              <DeleteIcon />
            </IconButton>
            {isLiked && (
              <IconButton
                color="primary"
                onClick={() => removeFromLikedPublications(imdbId)}
              >
                <ThumbUpIcon />
              </IconButton>
            )}
            {!isLiked && (
              <IconButton onClick={() => setLikedPublications(imdbId)}>
                <ThumbUpIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
