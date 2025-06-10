import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InPageNavigation from "../components/inpage-navigation.component";
import Loader from "../components/loader.component";
import AnimationWrapper from "../common/page-animation";
import BlogPostCard from "../components/blog-post.component";
import NoDataMessage from "../components/nodata.component";
import LoadMoreDataButton from "../components/load-more.component";
import axios from "axios";
import { filterPaginationData } from "../common/filter-pagination-data";

const SearchPage = () => {
  let {query} = useParams();
  const [blogs, setBlogs] = useState(null);

  const searchBlogs = ({ page = 1, create_new_arr = false }) => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { query, page })
    .then(async ({data}) => {
      let formatedData = await filterPaginationData({
        state: blogs,
        data: data.blogs,
        page,
        countRoute: "/search-blogs-count",
        data_to_send: { query },
        create_new_arr
      })
    
      setBlogs(formatedData);
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    resetState();
    searchBlogs({ page: 1, create_new_arr: true });
  }, [query]);

  const resetState = () => {
    setBlogs(null);
  }

  return (
    <section className="flex justify-center gap-10 h-cover">
      <div className="w-full">
        <InPageNavigation routes={[`search results for "${query}"`, "Accounts Matched"]} defaultHidden={["Accounts Matched"]}>
          <>
          {
                blogs === null ? 
                <Loader /> : 
                blogs.results.length ?
                  blogs.results.map((blog, i) => {
                    return <AnimationWrapper transition={{ duration: 1, delay: i*.1 }} key={i}>
                      <BlogPostCard content={blog} author={blog.author.personal_info} />
                    </AnimationWrapper>
                  }) :
                <NoDataMessage message="No blogs published" />
              }
            <LoadMoreDataButton state={blogs} fetchDataFunc={searchBlogs} />
          </>
        </InPageNavigation>
      </div>
    </section>
  )
}

export default SearchPage