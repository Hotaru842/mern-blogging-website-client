import { useState } from 'react'

const CommentField = ({ action }) => {
  const [comment, setComment] = useState("");

  return (
    <>
      <textarea  
        value={comment} 
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment..."
        className="pl-5 resize-none input-box placeholder:text-dark-grey h-[150px] overflow-auto" 
      ></textarea>
      <button className="px-10 mt-5 btn-dark">{action}</button>
    </>
  )
}

export default CommentField;