import { useContext, useState } from 'react';
import { UserContext } from '../App';
import { BlogContext } from '../pages/blog.page';
import { getDay } from '../common/date';
import { toast } from 'react-hot-toast';
import CommentField from './comment-field.component';
import axios from 'axios';

const CommentCard = ({ index, leftVal, commentData }) => {
  let { commented_by: { personal_info: { profile_img, fullname, 
  username: commented_by_username }},
  commentedAt, comment, _id, children } = commentData;

  let { blog, blog: { comments, comments: { results: commentsArr },
  author: { personal_info: { username: blog_author }}}, setBlog} = useContext(BlogContext);

  let { userAuth: { access_token, username }} = useContext(UserContext);

  const [isReplying, setIsReplying] = useState(false);

  const removeCommentsCards = (startingPoint) => {
    if(commentsArr[startingPoint]) {
      while(commentsArr[startingPoint].childrenLevel > commentData.childrenLevel) {
        commentsArr.splice(startingPoint, 1);

        if(!commentsArr[startingPoint]) {
          break;
        }
      }
    }

    setBlog({ ...blog, comments: { results: commentsArr }});
  }

  const deleteComment = (e) => {
    e.target.setAttribute("disabled", true);
    console.log("clicked");
  }

  const hideReplies = () => {
    commentData.isReplyLoaded = false;

    removeCommentsCards(index + 1);
  }

  const loadReplies = ({ skip = 0}) => {
    if(children.length) {
      hideReplies();

      axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-replies", {
        _id, skip
      })
      .then(({ data: { replies } }) => {
        commentData.isReplyLoaded = true;

        for(let i = 0; i < replies.length; i++) {
          replies[i].childrenLevel = commentData.childrenLevel + 1;

          commentsArr.splice(index + 1 + i + skip, 0, replies[i]);
        }

        setBlog({ ...blog, comments: { ...comments, results: commentsArr }})
      })
      .catch(err => {
        console.log(err); 
      })
    }
  }

  const handleReplyClick = () => {
    if(!access_token) {
      return toast.error("You must login first to leave a reply")
    }

    setIsReplying(prevVal => !prevVal);
  }

  return (
    <div className="w-full" style={{ paddingLeft: `${leftVal * 10}px`}}>
      <div className="p-6 my-5 border rounded-md border-grey">
        <div className="flex items-center gap-3 mb-8">
          <img 
            src={profile_img}
            alt={username}
            className="w-6 h-6 rounded-full"
          />
          <p className="line-clamp-1">{fullname} @{commented_by_username}</p>
          <p className="min-w-fit">{getDay(commentedAt)}</p>
        </div>
        
        <p className="font-gelasio !text-xl ml-3">{comment}</p>

        <div className="flex items-center gap-5 mt-5">
          {
            commentData?.isReplyLoaded ? 
            <button className="flex items-center gap-2 p-2 px-3 rounded-md text-dark-grey hover:bg-grey/30" onClick={hideReplies}>
              <i className="fi fi-rs-comment-dots" /> Hide Reply
            </button> :
            <button className="flex items-center gap-2 p-2 px-3 rounded-md text-dark-grey hover:bg-grey/30" onClick={loadReplies}>
               <i className="fi fi-rs-comment-dots" /> {children.length} Reply
            </button> 
          }
          <button 
            className="underline"
            onClick={handleReplyClick}
          >
            Reply
          </button>
          {
            username === commented_by_username || username === blog_author ?
            <button className="flex items-center justify-center w-8 h-8 ml-auto border rounded-full border-grey hover:bg-red/30 hover:text-red" onClick={deleteComment}>
              <i className="pointer-events-none fi fi-br-trash" />
            </button> 
            : null
          }
        </div>
        {
          isReplying ? 
          <div className="mt-8">
            <CommentField 
              action="reply" 
              index={index} 
              replyingTo={_id} 
              setIsReplying={setIsReplying}
            />
          </div> 
          : null
        }
      </div>
    </div>
  )
}

export default CommentCard;