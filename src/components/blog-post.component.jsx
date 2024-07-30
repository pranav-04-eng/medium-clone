import axios from "axios";

const BlogPostCard = ({ content, author }) => {
  let { publishedAt, tags, title, des, banner, activity: { total_likes }, blog_id: id } = content;
  let { fullname, username, profile_img } = author;
  const fetchBlog=()=>{
      axios
        .get(import.meta.env.VITE_SERVER_DOMAIN + `/blog/${id}`)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => console.log(err.message));
    };
  
  return (
    <div onClick={fetchBlog} className="flex gap-8 items-center border-b border-grey pb-5 mb-4">
      <div className="flex flex-1">
        <div className="flex-grow">
          <div className="flex gap-2 items-center mb-2">
            <img src={profile_img} className="w-6 h-6 rounded-full" alt={`${fullname}'s profile`} />
            <p className="line-clamp-1">{fullname} @{username}</p>
            <p className="min-w-fit text-gray-500">{publishedAt}</p>
          </div>
          <h1 className="text-lg font-bold">{title}</h1>
          <p className="my-1 font-gelasio text-base leading-6 text-gray-600 line-clamp-2 hidden sm:block">{des}</p> 
          <div className="flex gap-4 mt-2">
            <span className="btn-light py-1 px-4 bg-gray-200 text-gray-700 rounded">{tags[0]}</span>
            <span className="ml-3 flex items-center gap-2 text-gray-500"><i className="fi fi-rr-heart text-xl"></i> {total_likes}</span>
          </div>
        </div>
        <div className="w-28 h-28 flex-shrink-0 ml-4">
          <img src={banner} className="w-full h-full object-cover rounded-md" alt={title} />
        </div>
      </div>
    </div>
  );
}

export default BlogPostCard;
