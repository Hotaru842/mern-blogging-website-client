import React from "react";
import { Link } from "react-router-dom";
import { getDay } from "../common/date";

const ManagePublishedBlogCard = ({ blog }) => {
  let { blog_id, title, banner, publishedAt } = blog;

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
            <Link>Edit</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManagePublishedBlogCard;