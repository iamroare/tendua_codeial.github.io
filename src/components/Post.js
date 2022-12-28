import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { createComment, toggleLike } from '../api';
import { usePosts } from '../hooks';

import styles from "../styles/home.module.css";
import Comment from './Comment';

const Post = ({post}) => {

  // console.log(post);
    const [comment,setComment]= useState("");
    const [creatingComment,setCreatingComment] = useState(false);
    const posts=usePosts();

    const handlePostLikeClick = async () =>{
        const response= await toggleLike(post._id, "Post");

        if(response.success){
            if(response.data.deleted){
                toast.success("you Unliked the Post");
            }
            else{
                toast.success("You Liked The Post");
            }
        }

        else{
            toast.error(response.message);
        }
    }

    // hello world

    const handleAddComment = async (e) => {
        if (e.key === 'Enter') {
          setCreatingComment(true);
    
          const response = await createComment(comment, post._id);
    
          if (response.success) {
            setComment('');
            posts.addComment(response.data.comment, post._id);
            toast.success("You Commented on Post")
           
          } else {
            toast.error(response.message)
            // addToast(response.message, {
            //   appearance: 'error',
            // });
          }
    
          setCreatingComment(false);
        }
      };
    


      return (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                alt="user-pic"
              />
              <div>

                  {/* <Link to={`/user/${post.user._id}`} */}

                
                   <Link
                  to={{
                    pathname: `/user/${post.user._id}`,
                    state: {
                      user: `post.user`,
                    },
                  }}
 
                  className={styles.postAuthor}
                   >
                  {post.user.name}
                  </Link>
                {/* <span className={styles.postAuthor}>{post.user.name}</span> */}
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.content}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
               <button onClick={handlePostLikeClick}>
               <img
                  src="https://cdn-icons-png.flaticon.com/512/889/889221.png"
                  alt="likes-icon"
                />
               </button>
                <span>{post.likes.length}</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
                  alt="comments-icon"
                />
                <span>{post.comments.length}</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment"
              value={comment}
              onChange={(e)=> setComment(e.target.value)}
              onKeyDown={handleAddComment}
              />
            </div>

            <div className={styles.postCommentsList}>


            {post.comments.map((comment) => (
                <Comment comment={comment}
                key={`post-comment-${comment._id}`}
                 />
              ))}
              {/* <div className={styles.postCommentsItem}>
                <div className={styles.postCommentHeader}>
                  <span className={styles.postCommentAuthor}>Bill</span>
                  <span className={styles.postCommentTime}>a minute ago</span>
                  <span className={styles.postCommentLikes}>22</span>
                </div>

                <div className={styles.postCommentContent}>Random comment</div>
              </div> */}
            </div>
          </div>
        </div>
      )

};


Post.propTypes = {
    posts: PropTypes.object,
  };
  
  export default Post;
  