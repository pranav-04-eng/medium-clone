import { Children, useEffect, useRef, useState } from "react";
export let activeTabLineref;
export let activeTabRef;
const InpageNavigation=({children,routes,defaultHidden=[ ],defaultActiveIndex=0})=>{
     activeTabLineref=useRef();
     activeTabRef=useRef();
    let [inPageNavIndex,setInpageNavIndex]=useState({defaultActiveIndex});
    //hr linr for selected component 
    const changePageState=(btn,i)=>{
        let{offsetWidth,offsetLeft}=btn;
        activeTabLineref.current.style.width=offsetWidth +"px";
        activeTabLineref.current.style.left=offsetLeft +"px";
        setInpageNavIndex(i)
    }
    //since home does not get the default line when rendered we use this useeffect to get the header ruler line  to home 
    useEffect(()=>{
        changePageState(activeTabRef.current,defaultActiveIndex)
    },[]) 
    //new return statement
    return(
        <>
            <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
                {routes.map((route,i)=> {
                    return(
                    <button  ref={i===defaultActiveIndex?activeTabRef:null} key={i} className={"p-4 px-5 capitalize "+ (inPageNavIndex===i ? "text-black " : "text-dark-grey ")+(defaultHidden.includes(route)?"md:hidden":"")} onClick={(e)=>changePageState(e.target,i)}>
                        {route}
                    </button>)
                })}
                <hr ref={activeTabLineref} className="absolute bottom-0 duration-300"/>

            </div>
            {Array.isArray(children)?children[inPageNavIndex]:children}
        </>
    )
}
export default InpageNavigation;