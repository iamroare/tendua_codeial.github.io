import { useState } from "react";
// import {useHistory} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// import { toast } from "react-toastify";
import { toast } from 'react-toastify';
import { Navigate } from "react-router-dom";
// import { Toast } from "react-toastify/dist/components";

import { useAuth } from "../hooks";
import styles from "../styles/login.module.css";

const Signup = () =>{
    const [name, setName]= useState("");
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState('');
   const auth= useAuth();
const navigate= useNavigate();
//    const history = useHistory();

   const handleFormSubmit = async (e)=>{
    e.preventDefault();
    setSigningUp(true);

    let error=false;
    if(!name || !email || !password || !confirmPassword){
        toast("please fill all the fields");
        error= true;
    }

    if(password !== confirmPassword){
        toast("please Enter Same password and Confirm Password");
        error= true;
    }

    if(error){
        return setSigningUp(false);
    }

    const response = await auth.signup(name,email,password,confirmPassword);

    if(response.success){
        // navigate.push("/login");
        navigate('/login');
        // history.push("/login");
        setSigningUp(false);
        return toast("User registered Successfully, Please Login");
    }
    else{
        toast(response.message);
    }

    setSigningUp(false);

   };

   
if(auth.user){
  return <Navigate to="/"/>;
 }

   return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}> Signup</span>
      <div className={styles.field}>
        <input
          placeholder="Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Confirm password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? 'Signing up...' : 'Signup'}
        </button>
      </div>
    </form>

   )
};


export default Signup;