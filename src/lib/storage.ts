import axios from 'axios';
import {create} from 'zustand'


interface BillsStore {
 
  allblogs: any[];
  fetchblogs: () => Promise<void>;
}

const useStore=create<BillsStore>((set,get)=>({
    // ---bills---
    allblogs:[],
    fetchblogs:async()=>{
        try{
            const apiurl = process.env.NEXT_PUBLIC_API_URL || "https://api.codingscholar.com";
            console.log('fetching..')
            const res=await axios.get(`${apiurl}/fetch_blogs/`)
            console.log('res...',res)
            const blogdata=await res.data
             // Remove duplicates using _id
        const uniqueblogs = Array.from(
            new Map(
                blogdata.map((blog: any) => [blog.id, blog])
            ).values()
        )

        const publishedblogs=uniqueblogs.filter((blog:any)=>blog.status==='published')
        console.log('published blogs',publishedblogs)

        // Sort newest first
        // const sortedbills = uniqueBills.sort(
        //     (a: any, b: any) =>
        //         new Date(b.created_at).getTime() -
        //         new Date(a.created_at).getTime()
        // )
            // const sortedbills=data.sort((a:any,b:any)=>new Date(b.created_at).getTime()-new Date(a.created_at).getTime())
            // console.log('sortedbills..',sortedbills)
            set({allblogs:publishedblogs})
        }finally{
            
        }

    },
    

}))     

export default useStore;