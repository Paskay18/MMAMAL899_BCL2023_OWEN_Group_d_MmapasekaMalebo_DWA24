import React from "react";
import { Link } from "react-router-dom";
import {createClient} from "@supabase/supabase-js"
import {Auth} from "@supabase/auth-ui-react"
import { ThemeSupa} from "@supabase/auth-ui-shared"
import { useNavigate } from "react-router-dom"


const supabase = createClient(
   "https://fhsgqauroysucwjaativ.supabase.co",
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoc2dxYXVyb3lzdWN3amFhdGl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAzNzA1MzUsImV4cCI6MjAwNTk0NjUzNX0.NBbm5NmR6ykP8xXjPTSL3M7nflaC3_dBT-ofGK-RaGs"
)

export default function SignOut (){

    const [user, setUser] = React.useState({})
    const navigate = useNavigate()
   
   
    React.useEffect(()=> {
     async function getUserData() {
       await supabase.auth.getUser().then((value)=>{
         if (value.data?.user){
           console.log(value.data.user)
           setUser(value.data.user)
         }
       })
     }
     getUserData();
    }, [])
   
    async function signOutUser () {
     const { error }= await supabase.auth.signOut();
     navigate("/login")
    }
   
    
    return (
      
        <div className= "App">
                {/* Genres */}
           {Object.keys(user).length!==0 ?
               
               
               
               <>
            <button type="button" className="btn btn-outline-light"onClick={()=> signOutUser()}>SignOut</button>
                </>
              :
              <>
              
              <h1>User not logged in</h1>
              <button type="button" className="btn btn-outline-light" onClick={()=>{navigate("/login")}}>Go back Home</button>
              </>
           }
        </div>
        )


}