import styles from '../styles/login.module.css';
import { useState } from 'react';
// import {login} from "../api";}

// import { Redirect } from "react-router-dom"; 
import { Navigate } from 'react-router-dom';

import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '../hooks';



const Login = () => {
    const [email, setEmail]= useState("");
    const [password, setPassword] = useState("");
    const [logginIn, setLogginIn]= useState("");

    const auth = useAuth();
    console.log(auth.user);

const handleSubmit = async (e)=>{
    e.preventDefault();
    setLogginIn(true);

    if(!email || !password){
        toast("Please enter both email and password");
        return ;
    }

    const response= await auth.login(email,password);

    if(response.success){
         
        toast.success("you have successfully logged")
        //  alert("you have successfully logged");

    }

    else{
        
            toast.error(response.message)
            // alert(response.message);
    }

    setLogginIn(false);
}

if(auth.user){
 return <Navigate to="/"/>;
}

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit} >
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input type="email" 
        placeholder="Email" 
        required 
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input type="password" 
        placeholder="Paasword" 
        required  
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={logginIn} >
            {logginIn ? "Loggin In" : "Log In"}
            </button>
      </div>
    </form>
  );
};

export default Login;
