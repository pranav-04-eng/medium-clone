import React, { useEffect, useState } from 'react'
import AnimationWrapper from '../common/page-animation'
import InpageNavigation from '../components/inpage-navigation.component'
import axios from 'axios'
import Loader from '../components/loader.component'
import BlogPostCard from '../components/blog-post.component'

export default function HomePage() {
  let[blog,setBlog]=useState(null)
  let[trendingBlog,setTrendingBlog]=useState(null)
const fetchTrendingBlog=()=>{
  axios.get(import.meta.env.VITE_SERVER_DOMAIN+"/trending-blogs")
  .then(({data})=>{
    setTrendingBlog(data.blogs)
  }) 
  .catch(err=> console.log(err.message))
}


  const fetchLatestBlogs=()=>{
    axios.get(import.meta.env.VITE_SERVER_DOMAIN+"/latest-blogs")
    .then(({data})=>{
      console.log(data.blogs);
      setBlog(data.blogs)
    }) 
    .catch(err=> console.log(err.message))
  }
  useEffect(()=>{fetchLatestBlogs()},[])
  return (
    <AnimationWrapper>
        <section className='h-cover flex justify-center gap-10'>
        {/* {lateset blogs} */}
        <div className='w-full'>
            <InpageNavigation routes={["Home","Trending Blogs"]} defaultHidden={["Trending Blogs"]}>
              {
                blog==null?<Loader/>:blog.map((blog,i)=>{return <AnimationWrapper  transition={{duration:1,delay:i*.1}} key={i}><BlogPostCard content={blog} author={blog.author.personal_info}/></AnimationWrapper>})
              }
              <h1>Trending blogs here</h1>
            </InpageNavigation>
        </div>

        <div>

        </div>
        </section>
    </AnimationWrapper>
  )
}
