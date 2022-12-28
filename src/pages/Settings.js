import styles from "../styles/settings.module.css";
import {useAuth} from "../hooks";
import { useState } from "react";
import {toast} from "react-toastify";

const Settings = () => {
    
    const auth = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [name, setName]= useState(auth.user?.name ? auth.user.name: "");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const [savingForm, setSavingForm]= useState(false);

    console.log(auth.user);
    
  const clearForm = () => {
    setPassword('');
    setConfirmPassword('');
  };

    const updateProfile = async () =>{

        setSavingForm(true);

        let error = false;

        if(!name || !password || !confirmPassword){
            toast("please enter the fields");
            error= true;
        }

        if(password !== confirmPassword){
            toast("please enter Same Password and confirmPasssword");
            error= true;
        }
        
        if(error){
            return setSavingForm(false);

        }

        // const response = await auth.updateUser(
        //     auth.user._id,
        //     name,
        //     password,
        //     confirmPassword
        // )
           
        
    const response = await auth.updateUser(
        auth.user._id,
        name,
        password,
        confirmPassword
      );

      console.log('settings response', response);
        if(response.success){
            setEditMode(false);
            setSavingForm(false);
            clearForm();

            return toast("User Has Been Updated Successfully")
        }
        else{
            toast(response.message);
        }



    };


    return (
        <div className={styles.settings}>
        <div className={styles.imgContainer}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/236/236831.png"
            alt=""
          />
        </div>
  
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Email</div>
          <div className={styles.fieldValue}>{auth.user?.email}</div>
        </div>
  
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Name</div>
        {
            editMode ? (
                <input
                type="text"
                value={name}
                onChange= {(e)=> setName(e.target.value)}
                
                />
            ):(
                <div className={styles.fieldValue}>{auth.user?.name}</div>
            )
        }
        </div>
  
      {
        editMode && (
            <>
              <div className={styles.field}>
          <div className={styles.fieldLabel}>Password</div>
          <input 
          type="password"
          value={password}
          onChange= {(e) => setPassword(e.target.value)}
          />
        </div>
  
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Confirm Password</div>
          <input 
          type="password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
           />
        </div>
            </>
        )
      }
  
        <div className={styles.btnGrp}>
        {
            editMode ? (
                <>
                <button
                className={`button ${styles.saveBtn}`}
                onClick={updateProfile}
                disabled={savingForm}
                >
                   {savingForm ? 'Saving  profile...' : 'Save profile'} 
                </button>
                <button
                className={`button ${styles.editBtn}`}
                onClick={()=>setEditMode(false)}
                >
                    Go back
                </button>

                </>
            ):(
                <button
                className={`button ${styles.editBtn}`}
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            )
        }
        </div>
      </div>
  
    );
};

export default Settings;