import { Link } from "react-router-dom";
import { getDay } from "../common/date";

const NotificationCard = ({ data, index, notificationState }) => {
  let { type, createdAt, comment, replied_on_comment, 
    user: { personal_info: { fullname, profile_img, username }},
  blog: { blog_id, title }} = data;

  return (
    <div className="p-6 border-b border-grey border-l-black">
      <div className="flex gap-5 mb-3">
        <img 
          src={profile_img} 
          alt={username}
          className="flex-none rounded-full w-14 h-14"
        />
        <div className="w-full">
          <h1 className="font-medium !text-xl text-dark-grey">
            <span className="hidden capitalize lg:inline-block">{fullname}</span>
            <Link to={`/user/${username}`} className="mx-1 text-black underline">@{username}</Link>
            <span className="font-normal">
              {
                type == "like" ? "liked your blog" :
                type == "comment" ? "commented on" : "replied on"
              }
            </span>
          </h1>
          {
            type == "reply" ?
            <div className="p-4 mt-4 rounded-md bg-grey">
              <p>{replied_on_comment.comment}</p>
            </div> :
            <Link to={`/blog/${blog_id}`} className="font-medium text-dark-grey hover:underline line-clamp-1">{`"${title}"`}</Link>
          }
        </div>
      </div>

      {
        type != "like" ?
        <p className="pl-5 ml-14 font-gelasio !text-xl my-5">{comment.comment}</p> : null
      }

      <div className="flex gap-8 pl-5 mt-3 ml-14 text-dark-grey">
        <p>{getDay(createdAt)}</p>
        {
          type != "like" ? 
          <>
            <button className="underline hover:text-black">Reply</button>
            <button className="underline hover:text-black">Delete</button>
          </> : null
        }
      </div>
    </div>
  )
}

export default NotificationCard;