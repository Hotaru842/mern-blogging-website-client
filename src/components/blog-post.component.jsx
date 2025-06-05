import React from 'react'
import { getDay } from '../common/date';

const BlogPostCard = ({ content, author }) => {
  let { publishedAt, tags, title, desc, banner, activity: { total_likes }, blog_id: id } = content;
  let { fullname, username, profile_img } = author;
 
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-7">
        <img 
          src={profile_img}
          alt={username}
          className="w-6 h-6 rounded-full"
        />
        <p className="line-clamp-1">{fullname} @{username}</p>
        <p className="min-w-fit">{getDay(publishedAt)}</p>
      </div>
    </div>
  )
}

export default BlogPostCard;