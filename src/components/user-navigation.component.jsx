import React, { useContext } from 'react';
import AnimationWrapper from '../common/page-animation';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { removeFromSession } from '../common/session';

export default function UsernavigationPanel(){
    const {userAuth:{username},setuserAuth}=useContext(UserContext)

    const SignOutUser=()=>{
        removeFromSession("user");
        setuserAuth({access_token:null})
    }
    return(
    <AnimationWrapper transition={{duration:0.2,}}>
    <div className='bg-white absolute right-0 border-grey w-60  duration-200'>

    <Link to='/editor'className='flex gap-2 link md:hidden pl-8 py-4'>
         <i className="fi fi-sr-file-edit"></i>
         <p>Write</p>
    </Link>

    <Link to={`/user/${username}`} className="link pl-8 py-4">
        Profile
    </Link>

    <Link to={'/settings/blogs'} className="link pl-8 py-4">
        Dashboard
    </Link>

    <Link to={'/settings/edit-profile'} className="link pl-8 py-4">
        Settings
    </Link>
    
    <span className='absolute border-t border-grey w-[100%]'></span>

    <button className='text-left p-4 hover-grey w-full pl-8 py-4' onClick={SignOutUser}>
        <h1 className='font-bold text-xl mg-1'>Sign Out</h1>
        <p className='text-dark-grey'>@{username}</p>
    </button>

    </div>


    </AnimationWrapper>
    )
}
