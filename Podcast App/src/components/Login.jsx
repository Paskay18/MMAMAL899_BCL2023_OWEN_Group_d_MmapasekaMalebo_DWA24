import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  "https://fhsgqauroysucwjaativ.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoc2dxYXVyb3lzdWN3amFhdGl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAzNzA1MzUsImV4cCI6MjAwNTk0NjUzNX0.NBbm5NmR6ykP8xXjPTSL3M7nflaC3_dBT-ofGK-RaGs"
);

export default function Login() {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN") {
      navigate("/");
    }
    // No need for an "else" condition as we don't want to navigate when signed out.
  });

  return (
    <div className="App">
      <header className="App-Header">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["google"]}
        />
      </header>
    </div>
  );
}
