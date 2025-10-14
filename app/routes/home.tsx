import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { usePuterStore } from "~/lib/puter";




export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumio" },
    { name: "description", content: "The best ai reviewer in the market" },
  ];
}

export default function Home() {  
  const { auth } = usePuterStore();
  const navigate = useNavigate();
  
  useEffect(() => {
         if(!auth.isAuthenticated) {
           navigate("/auth?next=/");
         }
       }, [auth.isAuthenticated]);

  return (
    
    <main className="bg-[url('images/bg-main.svg')]" >
     <Navbar />
    <section className="main-section">
        <div className="page-heading py-18">
         <h1>Track your applications and resume ratings</h1>
         <h2>Resumio is the best ai reviewer in the market. 
            It helps you track your applications and resume ratings.</h2>
    
        </div>
  
        {resumes.length > 0 && (
          <div className="resumes-section">
            { resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
             ))}
         </div> 
         )}    
      </section>
    </main>
    
   
  );
}
