import { useContext } from "react";
import { BlogContext } from '../pages/blog.page';
import { UserContext } from "../App";
import { Link } from 'react-router-dom';

const BlogInteraction = () => {
  const {blog: {title, blog_id, activity, activity: {total_likes, total_comments}, 
  author: {personal_info: {username: author_username}}}, setBlog} = useContext(BlogContext)

  const { userAuth: { username } } = useContext(UserContext);

  return (
    <>
      <hr className="my-2 border-grey" />

      <div className="flex justify-between gap-6">
        <div className="flex items-center gap-3">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-grey/80"
            >
              <i className="fi fi-br-heart" />
            </button>
            <p className="!text-xl text-dark-grey">{total_likes}</p>

            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-grey/80"
            >
              <i className="fi fi-br-comment-dots" />
            </button>
            <p className="!text-xl text-dark-grey">{total_comments}</p>
        </div>

        <div className="flex items-center gap-6">
          {
            username === author_username ? <Link to={`/editor/${blog_id}`} className="underline hover:text-purple">Edit</Link> : null
          }
          <Link to={`https://twitter.com/intent/tweet?text=Read ${title}&url=${location.href}`}>
            <i className="fi fi-brands-twitter !text-xl hover:text-twitter" />
          </Link>
        </div>
      </div>

      <hr className="my-2 border-grey" />
    </>
  )
}

export default BlogInteraction;