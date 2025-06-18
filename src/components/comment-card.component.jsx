import { getDay } from '../common/date';

const CommentCard = ({ index, leftVal, commentData }) => {
  let { commented_by: { personal_info: { profile_img, fullname, username }},
  commentedAt, comment } = commentData;

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
      </div>
    </div>
  )
}

export default CommentCard;