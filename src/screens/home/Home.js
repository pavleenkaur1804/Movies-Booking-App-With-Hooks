import React from 'react';
import Header from '../../common/header/Header'
import { useState } from 'react';
import moviesData from '../../common/moviesData';
import genre from '../../common/genre';
import artists from '../../common/artists';

import { makeStyles } from '@material-ui/styles';
import '../home/Home.css';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';

import { Checkbox, ListItemText } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import { Input,InputLabel,Select } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import Details from '../details/Details';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { MenuItem,TextField } from '@material-ui/core';

import { useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { addMovies, getAllMovies } from '../../common/store/MovieSlice';



const useStyles = makeStyles((theme)=>({
    root1: {
      bgcolor: "white",

    
    
    },
    root: {
      
      bgcolor: "white",
      display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
      
    },
    imageList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
     
    },
    title: {
      color: "white",
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    
    imageList_Released: {
      width: 700,
      height: 350,
      overflow:'visible'
     },
      
   
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    formControl: {
      margin: '2px',
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: '2px',
    },
    root2: {
      minWidth: 300,
     
    },
    heading:{
      color:"white",
    },
  }));
 
const Home=(props)=>{
     
    const [NameOfMovie,setNameOfMovie]=useState("");
    const [AllGenres,setAllGenres]=useState(genre);
    const [AllArtists,setAllArtists]=useState(artists);
    const [Upcoming,setUpcoming]=useState(moviesData);
    const [Released,setReleased]=useState(moviesData);
    const [BeginningDate,setBeginningDate]=useState("");
    const [LastDate,setLastDate]=useState("");
    const [CurrentGenres,setCurrentGenres]=useState([]);
    const [CurrentArtists,setCurrentArtists]=useState([]);
    
   const classes=useStyles();
   const dispatch = useDispatch();
   console.log( useSelector(getAllMovies))
   const navigate = useNavigate();
  
  
    
    
    
   
  //This controls the functionality of searching for the movie as required by the user
   const applyingCurrentChanges = () => {
  
  
      var filterDataOfMovie = moviesData.filter(item => (item.title.includes(NameOfMovie) || item.artists.includes(CurrentArtists) || item.genres.includes(CurrentGenres)));
     
      setReleased(filterDataOfMovie);
  
     
  
  
    }
        
  
    
    
    
    
    const Heading=()=>{
        {/*Heading*/}
     return( <span> Upcoming Movies </span>);
     }




    const UpcomingMoviesListDisplay=()=>{
      dispatch(addMovies(moviesData))
        {/*Upcoming Movies List*/}
         const classes=useStyles();
         return(
        <div className={classes.root}>
        <ImageList cols={5}  rowHeight={250} className={classes.imageList}>
        {Upcoming.slice(0,6).map(item => (
          <ImageListItem key={"upcomingItem"+item.id}>
            <img src={item.poster_url} alt={item.title} style={{cursor:"pointer"}} />
            <ImageListItemBar title={item.title} />
          </ImageListItem>
        ))}
      </ImageList>
          </div>);
    }
    const ReleasedMoviesListDisplay=()=>{
        const classes=useStyles();
       
        {/*Released Movies List */}
        
        return( 
   
         
            <div className={classes.root1}>
              <ImageList rowHeight={350} cols={3} gap={30} className={classes.imageList_Released}>
              <ImageListItem key={moviesData.id} cols={3} gap={30} className='ImageListReleasedMovies' style={{ height: 'auto' }}>
             </ImageListItem>
              {Released.slice(0,4).map(item => (
                  <ImageListItem  style={{cursor:"pointer",pointerEvents:"all"}}  key={"releasedItem"+item.id}  >
                    
                  <img onClick={()=>{
                navigate(`/details/${item.id}`)}} src={item.poster_url} alt={item.title} />
                    <ImageListItemBar
                      title={item.title}
                      subtitle={<span>Release Date: {new Date(item.release_date).toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"})}</span>}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
              </div>
          );
        

    }
    const MovieFilterCardDisplay =()=>{
        const classes=useStyles();
         { /* Movie Filter Card */}

         return(<div className={classes.root2}>
  <Card>
    <CardContent>
      <FormControl className={classes.formControl}>
        <Typography className={classes.title} color="textPrimary">
          FIND MOVIES BY:
        </Typography>
      </FormControl>
      <br></br>
      <FormControl  className={classes.formControl}>
        <InputLabel htmlFor="movieName"> Movie Name </InputLabel>
        <Input id="movieName" value={NameOfMovie} onChange={e => setNameOfMovie(e.target.value)} />
      </FormControl>
      <br></br>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-checkbox">Genre</InputLabel>
        <Select multiple input={<Input id="select-multiple-checkbox" />} renderValue={selected => selected.join(',')} value={CurrentGenres}
          onChange={e => setCurrentGenres(e.target.value)}>
          {AllGenres.map(item => (
            <MenuItem key={item.id} value={item.name}>
              <Checkbox checked={CurrentGenres.indexOf(item.name) } />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br></br>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
        <Select multiple input={<Input id="select-multiple-checkbox" />} renderValue={selected => selected.join(',')} value={CurrentArtists}
          onChange={e => setCurrentArtists(e.target.value)}>
          {AllArtists.map(item => (
            <MenuItem key={item.id} value={item.first_name + " " + item.last_name}>
              <Checkbox checked={CurrentArtists.indexOf(item.first_name + " " + item.last_name) } />
              <ListItemText primary={item.first_name + " " + item.last_name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br></br>
      <FormControl className={classes.formControl}>
        <TextField id="begDate" label="Release Date Start" value={BeginningDate} type="date" InputLabelProps={{ shrink: true }}
          onChange={e => setBeginningDate(e.target.value)}
        />
      </FormControl>
      <br></br>
      <FormControl className={classes.formControl}>
        <TextField id="lastDate" label="Release Date End" value={LastDate} type="date" InputLabelProps={{ shrink: true }}
          onChange={e => setLastDate(e.target.value)}
        />
      </FormControl><br /><br />
      <FormControl className={classes.formControl}>
        <Button onClick={() => applyingCurrentChanges} variant="contained" color="primary">
          APPLY
          </Button>
      </FormControl>

    </CardContent>
  </Card>
           </div>);
    }

    return(
        <div>
      
        { /*  Header Component */}
         <Header />
   
        { /* Heading */ }
         <div className="heading">
          <Heading />
         </div>
           
        {/*Upcoming Movies List*/}
        <UpcomingMoviesListDisplay />
          
        
        { /* Container*/ }
        <div className="flex-container">
          <div className="left">
          {/*Release Movies List*/}
          <ReleasedMoviesListDisplay />
           </div>
          {/*Movie Filter Card*/}
           <div className='right'>
            <MovieFilterCardDisplay />
           </div>
        </div>
          
         </div>
         
        );
}
export default Home