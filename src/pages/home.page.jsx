import React, { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import InpageNavigation from "../components/inpage-navigation.component";
import axios from "axios";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
import { activeTabRef } from "../components/inpage-navigation.component";
import NoDataMessage from "../components/nodata.component";

export default function HomePage() {
  const [blog, setBlog] = useState(null);
  const [trendingBlog, setTrendingBlog] = useState(null);
  const [pageState, setPageState] = useState("home");
  const categories = [
    "python",
    "data",
    "iot",
    "windows",
    "mac"
  ];

  const fetchTrendingBlog = () => {
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
      .then(({ data }) => {
        setTrendingBlog(data.blogs);
      })
      .catch((err) => console.log(err.message));
  };

  const fetchLatestBlogs = () => {
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
      .then(({ data }) => {
        console.log(data.blogs);
        setBlog(data.blogs);
      })
      .catch((err) => console.log(err.message));
  };

  const fetchBlogsByCategory = () => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs",{tag:pageState.toLowerCase()})
    .then(({ data }) => {
      setBlog(data.blogs);
    })
    .catch((err) => console.log(err.message));}
  const loadBlogByCategory = (e) => {
    const category = e.target.innerText.toLowerCase();
    console.log(category);
    setBlog(null);

    if (pageState === category) {
      setPageState("home");
     
    }
    else{
      setPageState(category);}
    
  };

  useEffect(() => {
    activeTabRef.current.click();

    if (pageState === "home") {
      fetchLatestBlogs();
    }
    else{
      fetchBlogsByCategory();
    }
    if (!trendingBlog){
    fetchTrendingBlog();}
  }, [pageState]);

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">
          <InpageNavigation
            routes={[pageState, "Trending Blogs"]}
            defaultHidden={["Trending Blogs"]}
          >
            <>
              {blog == null ? (
                <Loader />
              ) : (
                blog.length?
                blog.map((blog, i) => {
                  return (
                    <AnimationWrapper
                      transition={{ duration: 1, delay: i * 0.1 }}
                      key={i}
                    >
                      <BlogPostCard
                        content={blog}
                        author={blog.author.personal_info}
                      />
                    </AnimationWrapper>
                  );
                })
                :<NoDataMessage message={"No Data found"} />
              )}
            </>
            {trendingBlog == null ? (
              <Loader />
            ) : (
              trendingBlog.map((blog, i) => {
                return (
                  <AnimationWrapper
                    transition={{ duration: 1, delay: i * 0.1 }}
                    key={i}
                  >
                    <MinimalBlogPost blog={blog} index={i} />
                  </AnimationWrapper>
                );
              })
            )}
          </InpageNavigation>
        </div>

        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-medium text-xl mb-8">
                Stories from all interests
              </h1>
              <div className="flex gap-3 flex-wrap">
                {categories.map((category, i) => {
                  return (
                    <button
                      onClick={loadBlogByCategory}
                      key={i}
                      className={"tag " + (pageState === category ? "bg-black text-white" : " ")}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-medium text-xl mb-8">
              Trending <i className="fi fi-sr-arrow-trend-up"></i>
            </h1>
            {trendingBlog == null ? (
              <Loader />
            ) : (
              trendingBlog.map((blog, i) => {
                return (
                  <AnimationWrapper
                    transition={{ duration: 1, delay: i * 0.1 }}
                    key={i}
                  >
                    <MinimalBlogPost blog={blog} index={i} />
                  </AnimationWrapper>
                );
              })
              
            )}
          </div>
      
        </div>
      </section>
    </AnimationWrapper>
  );
}
