import Home from './screens/home/Home';
import Details from './screens/details/Details';
// import BookShow from './screens/bookshow/BookShow';
// import Confirmation from './screens/confirmation/Confirmation';
import { Routes,Route } from 'react-router-dom';
import React from 'react';






const Routing=()=>{
    return(
        
        <Routes>
        <Route path="/" element={<Home />}></Route>
       
       
        <Route path="/details/" element={<Details />}></Route>

        </Routes>
        
        );
}
const App=()=>{
    

    return(

      
      <Routing />
      
    );
}
export default App