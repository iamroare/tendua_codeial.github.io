// import  Comment  from '../components/Comment';
import CreatePost from '../components/CreatePost';
// import { useEffect, useState } from 'react';
import propTypes from "prop-types";
import styles from '../styles/home.module.css';
// import { getPosts } from '../api';
import FriendsList from "../components/FriendsList";
import Post from '../components/Post';

// import {Comment, FriendsList} from "../components"



import RotateLoader from "react-spinners/RotateLoader";
// import { Link } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  marginTop: "250px",
  color: "pink"
};


const Loda = () =>{
  return  <RotateLoader
  
  cssOverride={override}
  color="#96143f"
  size={25}
  aria-label="Loading Spinner"
  data-testid="loader"
/>
}


const Home = () => {

 

// const [posts, setPosts]= useState([]);
// const [loading,setLoading]= useState([]);
const posts = usePosts();
const auth= useAuth();

  
  if(posts.loading){
      return <Loda/>
  }

  // console.log(posts);
  return (
    <div className={styles.home}>
      <div className={styles.postsList}>

        <CreatePost/>
      {posts.data.map((post) => (
        <Post post={post} key={`post-${post._id}`} />
      ))}
    </div>

    {auth.user && <FriendsList/>}
    </div>
  );
};



//for props validation

Home.propTypes={
    posts: propTypes.array
};

export default Home;
