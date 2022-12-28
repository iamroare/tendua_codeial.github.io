import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { searchUsers } from "../api";
import { useAuth } from "../hooks";
import styles from "../styles/navbar.module.css";

const Navbar =()=> {
    const auth = useAuth();
    const [results, setResults]= useState([]);
    const [searchText, setSearchText]= useState("");

    useEffect(()=>{

        const fetchUsers= async () =>{
            const response= await searchUsers(searchText);

            if(response.success){
                setResults(response.data.users);
            }
        };

        if(searchText.length>2){
            fetchUsers();
        }
        else{
            setResults([]);
        }
    },[searchText])
    
    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <a href="/" className={styles.asdf} >
                    <img alt="" 
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvK0o-ZQn4I9BOwnVa2vKhlpuBoiTNiAhwrPHk_1c9pL0wTb_4JzuNEoC96_UxUkcTGdM&usqp=CAU" 
                    />
                    <span>iamROARe Beast Company</span>
                </a>
            </div>

       {/* for searchContainer */}
            <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
          alt=""
        />

        <input
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/user/${user._id}`}>
                    
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                      alt=""
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>


            <div className={styles.rightNav}>

               {(auth.user && <div className={styles.user}>
                   
                   {/* <a href="/">
                       <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" 
                       alt="" 
                       className={styles.userDp}/>
                   </a> */}

                   <Link to="/Settings">
                   <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" 
                       alt="" 
                       className={styles.userDp}/>
                   </Link>
                   <span>{auth.user.name} </span>
               </div>
               )}

                <div className={styles.navLinks}>
                    <ul>

                        
                            {auth.user ? (
                                <>
                                 <li>
                        <Link to="/">Home</Link>
                        </li>
                                <li onClick={auth.logout}>Log out</li>
                              </>
                            ) : (
                                <>
                                <li>
                                  <Link to="/login">Log in</Link>
                                </li>
                                <li>
                                    <Link to="/signup">Register</Link>
                                  {/* <a href="/">Register</a> */}
                                </li>
                              </>
                            )}
                        
                        {/* 
                        <li>
                        <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                        <a href="/">Log out</a>
                        </li>
                        <li>
                        <a href="/">Register</a>
                        </li> */}
                    </ul>

                </div>
            </div>
        </div>
    );
};


export default Navbar;