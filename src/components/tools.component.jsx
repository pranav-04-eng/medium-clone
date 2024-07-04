import Embed from "@editorjs/embed"
import Image from "@editorjs/image"
import List from "@editorjs/list"
import Header from "@editorjs/header"
import Quote from "@editorjs/quote"
import Marker from "@editorjs/marker"
import InlineCode from "@editorjs/inline-code"
import { UploadImg } from "../common/aws"

const uploadImageByFile=(e)=>{
    return UploadImg(e).then(url=>{
        if(url){
            return{
                success:1,
                file:{url}
            }
        }
    })
}


const uploadImageByUrl=(e)=>{
    let link=new Promise((resolve,reject)=>{
        try{
            resolve(e)
        }
        catch(err){
            reject(err)
        }
    })

    return link.then(url=>{return{ success:1,
        file:{url}
    }})
}
const tools={
    embed: Embed,
    image: {
        class: Image,
        config: {
            
        
        uploader:{
        uploadByUrl:uploadImageByUrl,
        uploadByFile:uploadImageByFile
        }}
    },
    list: {
        class:List,
        inlineToolbar:true
    },
    header:{
        class:Header,
        config:{
            placeholder:"type a heading....",
            levels:[2,3],
            defaultLevel:2
        }
    },
    quote:{
        class:Quote,
        inlineToolbar:true
    },
    marker: Marker,
    inlineCode: InlineCode
}
export default tools;
