import React from 'react';
import Header from "../../common/header/Header";
import '../details/Details.css';
import { ImageList,ImageListItemBar,ImageListItem } from "@material-ui/core";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from "@material-ui/styles";
import Typography from '@material-ui/core/Typography';
import Rating from 'react-rating';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import {  ThemeProvider } from '@material-ui/styles';
import { createTheme } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { addMovies, getAllMovies } from '../../common/store/MovieSlice';
import moviesData from '../../common/moviesData';
import { useEffect } from 'react';




const theme = createTheme({
    typography: {
      subtitle2: {
        fontSize: 22,
        fontWeight:'bold',
      },
    
      
      
    },
  });
  






const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      
    },
    
    emptyStar: {
      color: "white"
    },
    title: {
        color: "white",
        fontSize:"4",
      },
      titleBar: {
        background:
          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      },
  }));


  
  

const Details=()=>{
  const [movieDetails, setmovieDetails] = useState({});
  const [title, setTitle] = useState('');
  const [genres,setGenres]=useState('');
  const [duration,setDuration]=useState('');
  const [releaseDate,setReleaseDate]=useState('');
  const [rating,setRating]=useState('');
  const [plot,setPlot]=useState('');
  const [trailerUrl,setTrailerUrl]=useState('');
  const [artists,setArtists]=useState('');
  const [poster,setPoster]=useState('');
  
  const dispatch = useDispatch();
  const params =useParams();
  
  
  
  
  useEffect(() => {
       
    let clickedMovie=moviesData.filter(item => (item.id.includes(params)))
    
    
    setmovieDetails(clickedMovie)
    setTitle(clickedMovie.title)
    setTrailerUrl(clickedMovie.trailer_url)
    setPlot(clickedMovie.storyline)
    setPoster(clickedMovie.poster_url)
    setArtists(clickedMovie.artists)
    setDuration(clickedMovie.duration)
    setRating(clickedMovie.rating)
    setReleaseDate(clickedMovie.release_date)
    setGenres(clickedMovie.genres)


   
  
 
}, [])







   
    const Star=()=> {
        
        return (
          
          <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend"></Typography>
          <Rating
            name="customized-empty"
            defaultValue={2}
            precision={0.5}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
          />
        </Box>
        
        );
      };






const PlayTrailerVideo=()=>{
    var getYouTubeID = require('get-youtube-id');
 
    var youtubeID = getYouTubeID(movieDetails.trailer_url);
    // console.log(id); 
return(<iframe  width="600" height="320"  className='video'
title='Youtube player'
sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
src={`https://youtube.com/embed/${youtubeID}?autoplay=0`}>
</iframe>);
}
const classes = useStyles();

     return(<div>
        <Header />
         <Link to={"/"} className='back-home-link'>&#60; Back to Home</Link>
        <div className="flex-container">
        <div className="column-left"><img src={poster} height="350" width="200"></img></div> 
      <div className="column-middle">
      <Typography variant="headline" component="h2">
      {title}
      </Typography>
   
    <ThemeProvider theme={theme}>
      <Typography variant="subtitle2">Genre:<span style={{fontWeight:'normal',fontSize:'3'}}>{genres}</span></Typography>
      <Typography  variant="subtitle2">Duration:<span style={{fontWeight:'normal',fontSize:'3'}}>{duration}</span></Typography>
      <Typography  variant="subtitle2">Release Date:<span style={{fontWeight:'normal',fontSize:'3'}}>{new Date(releaseDate).toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"})}</span></Typography>
      <Typography variant="subtitle2">Rating:<span style={{fontWeight:'normal',fontSize:'3'}}>{rating}</span></Typography>
      <br></br><Typography  variant="subtitle2">Plot:<span style={{fontWeight:'normal',fontSize:'3'}}>(
      {plot}<a href={movieDetails.wiki_url}></a>)</span></Typography>

     <Typography variant="subtitle2"><br></br>
      Trailer:
    </Typography></ThemeProvider>
<PlayTrailerVideo/>
<Button>
play
</Button>
</div>
     <div className="column-right">
     <ThemeProvider theme={theme}>
      <Typography variant="subtitle2">
      Rate this movie:
    </Typography>
   <Star />
    <Typography variant="subtitle2">
      Artists:
    </Typography>
   <div className="artists_image">
   <ImageList sx={{width: 150, height: 150 }} >
   {moviesData.artists.map(item => (
    <ImageListItem rowheight={200} key={item.profile_url}>
    <img
    src={`${item.profile_url}?w=248&fit=crop&auto=format`}
    srcSet={`${item.profile_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
    alt={item.first_name + " " + item.last_name}
      />
      <ImageListItemBar 
      title={item.first_name + " " + item.last_name}
      classes={{
        root: classes.titleBar,
        title: classes.title,
      }}
      
    />
      </ImageListItem>))}
      </ImageList>
   </div>
   </ThemeProvider>
    </div>

    </div></div>
);
}
export default Details








