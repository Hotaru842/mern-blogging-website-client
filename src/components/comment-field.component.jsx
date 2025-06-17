import { useContext, useState } from 'react'
import { UserContext } from '../App';
import { BlogContext } from '../pages/blog.page';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';

const CommentField = ({ action }) => {
  let { blog, setBlog, setTotalParentCommentsLoaded, blog: { _id, author: { _id: blog_author }, 
  comments, activity, activity: { total_comments, total_parent_comments } }} = useContext(BlogContext);
  let { userAuth: { access_token, username, fullname, profile_img }} = useContext(UserContext);
  const [comment, setComment] = useState("");

  const handleComment = () => {
    if(!access_token) {
      return toast.error("You must login first to leave a comment");
    }

    if(!comment?.length) {
      return toast.error("You must write something to leave a comment");
    }

    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/add-comment", {
      _id, blog_author, comment
    }, {
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    })
    .then(({data}) => {
      setComment("");

      data.commented_by = { personal_info: { username, profile_img, fullname }}
      let newCommentArr;

      data.childrenLevel = 0;

      newCommentArr = [ data ]

      let parentCommentIncrementVal = 1;

      setBlog({ ...blog, comments: { ...comments, results: newCommentArr },
      activity: { ...activity, total_comments: total_comments + 1,
      total_parent_comments: total_parent_comments + parentCommentIncrementVal
      }})

      setTotalParentCommentsLoaded(prevVal => prevVal + parentCommentIncrementVal);
    })
    .catch(err => {
      console.log(err);
    })
  } 

  return (
    <>
      <Toaster />
      <textarea  
        value={comment} 
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment..."
        className="pl-5 resize-none input-box placeholder:text-dark-grey h-[150px] overflow-auto" 
      ></textarea>
      <button
        onClick={handleComment} 
        className="px-10 mt-5 btn-dark"
      >{action}</button>
    </>
  )
}

export default CommentField;