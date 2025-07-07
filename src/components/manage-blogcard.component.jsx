import { useState } from "react";
import { Link } from "react-router-dom";
import { getDay } from "../common/date";

const BlogStats = ({ stats }) => {
  return <p>here goes the blog stats</p>
}

const ManagePublishedBlogCard = ({ blog }) => {
  let { blog_id, title, banner, publishedAt, activity } = blog; 
  const [showStat, setShowStat] = useState(false);

  return (
    <>
      <div className="flex items-center gap-10 pb-6 mb-6 border-b max-md:px-4 border-grey">
        <img src={banner} alt={title} className="flex-none object-cover max-md:hidden lg:hidden xl:block w-28 h-28 bg-grey" />
        <div className="flex flex-col justify-between py-2 w-full min-w-[300px]">
          <div>
            <Link to={`/blog/${blog_id}`} className="mb-4 blog-title hover:underline">{title}</Link>
            <p className="line-clamp-1">Published on {getDay(publishedAt)}</p>
          </div>
          <div className="flex gap-6 mt-3">
            <Link to={`/editor/${blog_id}`} className="py-2 pr-4 underline">Edit</Link>
            <button className="py-2 pr-4 underline lg:hidden" onClick={() => setShowStat(prevVal => !prevVal)}>Stats</button>
            <button className="py-2 pr-4 underline text-red">Delete</button>
          </div>
        </div>

        <div className="max-lg:hidden">
          <BlogStats stats={activity} />
        </div>
      </div>
      {
        showStat ? 
        <div className="lg:hidden">
          <BlogStats stats={activity} />
        </div> : null
      }
    </>
  )
}

export default ManagePublishedBlogCard;