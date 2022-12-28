
// import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import { getPosts } from '../api';
import { Home,Login,Signup,Settings, UserProfile } from '../pages';
import Navbar from './Navbar.js';

import RotateLoader from "react-spinners/RotateLoader";
import { useAuth } from '../hooks';
import { useEffect } from 'react';
// import { Navigate } from 'react-router-dom';


function PrivateRoute({children}){
  const auth= useAuth();

  const navigate=useNavigate();
  useEffect(()=>{
      if(!auth.user){
    
    navigate('/login');
      }

      

  })

  return children;
}
const About = ()=>{
  return <h1>About</h1>
}

const UserInfo =()=>{
  return <h1>UserInfo</h1>
}

// const override: CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
//   marginTop: "250px",
//   color: "pink"
// };


const Loda = () =>{
  return  <RotateLoader
  
  // cssOverride={override}
  color="#96143f"
  size={25}
  aria-label="Loading Spinner"
  data-testid="loader"
/>
}

function App() {
  const auth= useAuth();

  if (auth.loading) {
    return <Loda/>
    
    ;
  }

  return (
    <div className="App">
      
      
     
       
       <Router>
       <Navbar/>
        <Routes>
        

        <Route exact path="/" element={  <Home posts={[]} />} />
        <Route exact path="/about" element={<About/> } />
        <Route exact path="/userinfo" element={<UserInfo/> } />
        <Route exact path="/login" element={<Login/> } />
        <Route exact path="/Signup" element={<Signup/>}/>
        <Route exact path="/Settings" element={<PrivateRoute children={<Settings/>} />}/>
        {/* <PrivateRoute path="/Settings" element={<Settings/>}/> */}

        {/* <Route exact path="/user/:userId" element={<UserProfile/>} /> */}
        <Route exact path="/user/:userId" element={<PrivateRoute children={<UserProfile/>} />} />
        </Routes>
       </Router>
     
    </div>
  );
}

export default App;

