import { useState } from "react";
import {toast} from "react-toastify";
// import { useLocation } from "react-router-dom";
import RotateLoader from "react-spinners/RotateLoader";


import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";


import styles from "../styles/settings.module.css";
import { useEffect } from "react";
import { addFriend, fetchUserProfile, removeFriend } from "../api";

const override= {
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
  



const UserProfile = () => {

    const [user, setUser]= useState({});
    const [loading, setLoading]= useState(true);
    const [requestInProgress, setRequestInProgress]= useState(false);
    const navigate= useNavigate();
  
    const {userId} = useParams();

    console.log("userId", userId);

    const auth = useAuth();

    useEffect(()=> {

        const getUser = async () =>{
            const response= await fetchUserProfile(userId);
            
            if(response.success){
                setUser(response.data.user);
            }
            else{
                toast(response.message);

                return navigate('/');
            }

            setLoading(false);
        }

        getUser();

    },[userId,navigate])

    if(loading){
        return <Loda/>
    }


    const handleRemoveFriendClick = async () =>{
      setRequestInProgress(true);

      const response= await removeFriend(userId);

      if(response.success){
        const friendship= auth.user.friends.filter(
          (friend)=> friend.to_user._id === userId
        );

        auth.updateUserFriends(false,friendship[0]);
        toast("Friend Removed Succesffully");
      }
      else{
        toast(response.message);
      }


      setRequestInProgress(false);
    };

    const handleAddFriendClick = async () => {
      setRequestInProgress(true);

      const response = await addFriend(userId);

      if(response.success){
        const {friendship} = response.data;

        // auth.updateUserFriend(true, friendship);
        auth.updateUserFriends(true,friendship);

        toast("Friend has beed added Successfully");
      }

      else{
        toast(response.message);
      }

      setRequestInProgress(false);
    }

    // console.log("location", location);

    // const {user = {}}= location.state;
    // const user ={};


    
  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friends;

    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };


    return(
        <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/236/236831.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button className={`button ${styles.saveBtn}`}
          onClick={handleRemoveFriendClick}
          >
            {requestInProgress ? "Removing Friend..." : "Remove friend"}
          </button>
        ) : (
          <button className={`button ${styles.saveBtn}`}
          onClick={handleAddFriendClick}
          disabled={requestInProgress}
          >
            {requestInProgress ? "Adding Friend..." : "Add friend"}
          </button>
        )}
      </div>
    </div>
    );
};



export default UserProfile;