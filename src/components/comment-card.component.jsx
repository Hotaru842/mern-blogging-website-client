import { useContext, useState } from 'react';
import { UserContext } from '../App';
import { getDay } from '../common/date';
import { toast } from 'react-hot-toast';
import CommentField from './comment-field.component';

const CommentCard = ({ index, leftVal, commentData }) => {
  let { commented_by: { personal_info: { profile_img, fullname, username }},
  commentedAt, comment, _id } = commentData;

  let { userAuth: {access_token}} = useContext(UserContext);

  const [isReplying, setIsReplying] = useState(false);

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
          <p className="line-clamp-1">{fullname} @{username}</p>
          <p className="min-w-fit">{getDay(commentedAt)}</p>
        </div>
        
        <p className="font-gelasio !text-xl ml-3">{comment}</p>

        <div className="flex items-center gap-5 mt-5">
          <button 
            className="underline"
            onClick={handleReplyClick}
          >Reply</button>
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