import React from 'react';
import Header from "../../common/header/Header";
import '../details/Details.css';
import { ImageList,ImageListItemBar,ImageListItem } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { makeStyles } from "@material-ui/styles";
import Typography from '@material-ui/core/Typography';
import Rating from 'react-rating';
import { useState } from 'react';
import {Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import {  ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@mui/material/styles';
import artists  from '../../common/artists';



const theme = createTheme({
    typography: {
      subtitle2: {
        fontSize: 30,
        fontWeight:'bolder',
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
    const [movieDetails, setmovieDetails] = useState(JSON.parse(localStorage.getItem('UserDetails')));
    const [title, setTitle] = useState(movieDetails.title);
    const [genres,setGenres]=useState(movieDetails.genres);
    const [duration,setDuration]=useState(movieDetails.duration);
    const [releaseDate,setReleaseDate]=useState(movieDetails.release_date);
    const [rating,setRating]=useState(movieDetails.critics_rating);
    const [plot,setPlot]=useState(movieDetails.storyline);
    const [trailerUrl,setTrailerUrl]=useState(movieDetails.trailer_url);
    const [artists,setArtists]=useState(movieDetails.artists);
    const [poster,setPoster]=useState(movieDetails.poster_url);
    
    const Star=()=> {
        const classes = useStyles();
        return (
          <div className={classes.root}>
            <Rating
              name="rating"
              value={rating}
             
              precision={0.5}
              onClick={(_,value)=>{setRating(value)}}
              icon={<StarBorderIcon fontSize="inherit"/>}
             
            />
          </div>
        );
      };






const PlayTrailerVideo=()=>{
    var getYouTubeID = require('get-youtube-id');
 
    var youtubeID = getYouTubeID(movieDetails.trailer_url);
    // console.log(id); 
return(<iframe  width="510" height="320"  className='video'
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
        <div className="column-left"><img src={poster} height="270" width="159"></img></div> 
      <div className="column-middle">
      <Typography variant="h2" component="h2">
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
   <ImageList sx={{width: 200, height: 150 }} >
   {artists.map(item => (
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








