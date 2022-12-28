
import RotateLoader from "react-spinners/RotateLoader";

import React from 'react';

  
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  marginTop: "250px",
  color: "pink"
};

 const myLoader = () =>{




  return (
      
    <RotateLoader
    cssOverride={override}
    color="#96143f"
    size={25}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
       
  )
}

export default myLoader;

