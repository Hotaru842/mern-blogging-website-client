import { useState } from "react";
import { Toaster } from "react-hot-toast";

const NotificationCommentField = () => {
  let [comment, setComment] = useState("");

  const handleComment = () => {
    console.log("clicked");
  }

  return (
    <>
      <Toaster />
      <textarea  
        value={comment} 
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a reply..."
        className="pl-5 resize-none input-box placeholder:text-dark-grey h-[150px] overflow-auto" 
      ></textarea>
      <button
        onClick={handleComment} 
        className="px-10 mt-5 btn-dark"
      >Reply</button>
    </>
  )
}

export default NotificationCommentField;