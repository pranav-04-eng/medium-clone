import{Routes,Route} from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useState,useEffect} from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages";
import HomePage from "./pages/home.page";

export const UserContext=createContext({})
const App = () => {
    const[userAuth,setuserAuth]=useState({});
    useEffect(()=>{
        let userInSession=lookInSession("user")
        userInSession?setuserAuth(JSON.parse(userInSession)):setuserAuth({access_token:null})
    },[])

    return (
    //see the user in session and provide the user to be logged in use usecontext hook to send it without prop driling
    <UserContext.Provider value={{userAuth,setuserAuth}}>
    <Routes>
    <Route path="/editor" element={<Editor />}/>
    <Route path='/' element={<Navbar />}>
        <Route index element={<HomePage />}/>
        <Route path='signin' element={<UserAuthForm type={"sign-in"} />}/>
        <Route path='signup' element={<UserAuthForm type={"sign-up"}/>}/>
    </Route>

    </Routes>
    </UserContext.Provider>
    
    )
}

export default App;