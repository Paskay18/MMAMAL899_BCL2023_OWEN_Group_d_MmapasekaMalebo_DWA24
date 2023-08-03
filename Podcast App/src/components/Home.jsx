 import React from "react";
 import HomeData from "./FetchData";
 import Carousel from "./Carousel";
 import { Link } from "react-router-dom";
 import {createClient} from "@supabase/supabase-js"
import {Auth} from "@supabase/auth-ui-react"
import { ThemeSupa} from "@supabase/auth-ui-shared"
import { useNavigate } from "react-router-dom"

const supabase = createClient(
    "https://fhsgqauroysucwjaativ.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoc2dxYXVyb3lzdWN3amFhdGl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAzNzA1MzUsImV4cCI6MjAwNTk0NjUzNX0.NBbm5NmR6ykP8xXjPTSL3M7nflaC3_dBT-ofGK-RaGs"
)

 export default function Home () {
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
  const { error}= await supabase.auth.signOut();
  navigate("/login")
 }



    
    return (
      
    <div className= "App">
            {/* Genres */}
       {Object.keys(user)!==0 ?
           
           
           
           <>
            <button > Genres
              <ul>
        <Link to="?genres=1">Personal Growth</Link>
          <Link to="?genres=2">Crime & Journalism</Link>
          <Link to="?genres=3">History</Link>
          <Link to="?genres=4">Comedy</Link>
          <Link to="?genres=5">Entertainment</Link>
          <Link to="?genres=6">Business</Link>
          <Link to="?genres=7">Fiction</Link>
          <Link to="?genres=8">News</Link>
          <Link to="?genres=9">Kids and Family</Link>
          <Link to=".">Clear</Link>
          </ul>
        </button>
        <button onClick={() => signOutUser()}>Sign Out</button>
        <Carousel />
          <HomeData />

          </>

          :
          <>
          
          <h1>User not logged in</h1>
          <button onClick={()=>{navigate("/login")}}>Go back Home</button>
          </>
 }
    </div>
    )
}