import Home from './screens/home/Home';
import Details from './screens/details/Details';
// import BookShow from './screens/bookshow/BookShow';
// import Confirmation from './screens/confirmation/Confirmation';
import { Routes,Route } from 'react-router-dom';
import React from 'react';
import { useReducer } from 'react';
import React from 'react'
import { initialState,reducer } from './common/UseReducer';
import Logout from './common/logout/Logout';

export const UserContext=createContext();


const Routing=()=>{
    return(
        
        <Routes>
        <Route path="/" element={<Home />}></Route>
       
       
        <Route path="/details/:id" element={<Details />}></Route>

        </Routes>
        
        );
}
const App=()=>{
    
  const [state, dispatch] = useReducer(reducer, initialState)
    return(
      <Routing />
    );
}
export default App