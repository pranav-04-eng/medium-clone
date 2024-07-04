import { Link, useNavigate } from "react-router-dom"
import logo from '../imgs/logo.png'
import AnimationWrapper from "../common/page-animation"
import { useContext } from "react"
import { EditorContext } from "../pages/editor.pages"
import toast, { Toaster } from "react-hot-toast"
import Tag from "./tags.component"
import axios from "axios"
import { UserContext } from "../App"

export default function PublishForm() {
    let characterLimit=200;
    let tagLimit=10;
    let{blog,setEditorState,blog:{banner,title,des,tags,content},setBlog}=useContext(EditorContext);
    let{userAuth:{access_token}}=useContext(UserContext)
    let navigate=useNavigate();
    const handleCloseEvent=()=>{
        setEditorState("editor")
    }
    const handleBlogTitleChange=(e)=>{
        setBlog({...blog,title:e.target.value})
    }
    const handleBlogDescriptionChange=(e)=>{
        setBlog({...blog,des:e.target.value})
    }
    const handleTitlekeyDown = (e) => {
        if (e.keyCode===13){
            e.preventDefault();
        }
      };
    const handleKeyDown=(e)=>{
        if(e.keyCode===13 || e.keyCode===188){
            e.preventDefault();
            let tag=e.target.value;
            if(tags.length<tagLimit){
                if(!tags.includes(tag) && tag.length){
                    setBlog({...blog,tags:[...tags,tag]})
                }}else{
                    toast.error(`You can add max ${tagLimit} tags only`)
                }
            
            e.target.value='';
        }
    }
    const handlePublish=(e)=>{
        if(e.target.className.includes('disable')){
            return;
        }
        if(!title.length){
            toast.error("Please Enter Title to Publish")
    }
    if(!des.length || des.length>characterLimit){
        toast.error("Please Enter proper Description to Publish")
    }
    if(!tags.length){
        toast.error("Please Enter altelast 1 tags to rank your blog")
    }
    let LoadingToast=toast.loading("Publishing...");
    e.target.classList.add('disable')
    let blogobj={title,banner,des,content,tags,draft:false}
    axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/create-blog",blogobj,{
        headers:{'Authorization':`Bearer ${access_token}`}})
        .then(()=>{
            e.target.classList.remove('disable')
            toast.dismiss(LoadingToast)
            toast.success("Blog Published successfully")
            setTimeout(()=>{navigate('/')},500)
        })
        .catch(({response})=>{
            e.target.classList.remove('disable')
            toast.dismiss(LoadingToast)
            toast.error(response.data.error)
        })
    }

  return(
    <AnimationWrapper>
        <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
            <Toaster/>
            <button className='w-12 h-12 absolute right-[5vw] top-[5%] z-10 lg:top0[10%]' onClick={handleCloseEvent}><i className="fi fi-br-cross"></i></button>
            <div className="max-w-[550px] center">
                <p className="text-dark-grey mb-1">Preview</p>
                <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
                    <img src={banner} />
                </div>
                <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">{title}</h1>
                <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">{des}</p>
            </div>
            <div className="border-grey lg:border-1 lg:pl-8">
            <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
            <input type="text" placeholder="Blog Title" defaultValue={title} className="input-box pl-4" onClick={handleBlogTitleChange}/>
            <p className="text-dark-grey mb-2 mt-9" onKeyDown={handleTitlekeyDown}>Short Description about your blog</p>
            <textarea maxLength={characterLimit} defaultValue={des} className="h-40 resize-none leading-7 input-box pl-4" onChange={handleBlogDescriptionChange}></textarea>
            <p>{characterLimit-des.length} characters left</p>
            <p className="text-dark-grey mb-2 mt-9">Topics - (Helps us searching and rank your blog posts) </p>
             <div className="relative input-box pl-2 py-2 pb-4" onKeyDown={handleKeyDown}>
             <input type="text" placeholder="Topics" className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"/>
            {tags.map((tag,i)=>{return (<Tag tag={tag} tagIndex={i} key={i}/>)})}
            <p className='mt-1 mb-4 text-dark-grey text-right'>{tagLimit-tags.length} Tags Left</p>
            <button className="btn-dark px-8" onClick={handlePublish}>Publish</button>
             </div>
            </div>
        </section>
    </AnimationWrapper>)
  
}
