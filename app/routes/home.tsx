import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";




export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumio" },
    { name: "description", content: "The best ai reviewer in the market" },
  ];
}

export default function Home() {  
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  
  useEffect(() => {
         if(!auth.isAuthenticated) {
           navigate("/auth?next=/");
         }
       }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadingResumes = async () => {
        setLoadingResumes(true);
        const resumes = (await kv.list("resume:*", true)) as KVItem[]; 
        const parsedResumes = resumes?.map((resume) => (
               JSON.parse(resume.value) as Resume));
    
        console.log("parsedResumes", parsedResumes);
    
        setResumes(parsedResumes || []);
        setLoadingResumes(false);         
  }
  loadingResumes();
}
  
  , []);     

  

  return (
    
    <main className="bg-[url('images/bg-main.svg')]" >
     <Navbar />
    <section className="main-section">
        <div className="page-heading py-18">
         <h1>Track your applications and resume ratings</h1>
         {!loadingResumes && resumes.length === 0 ? (
            <button className="primary-button" onClick={() => navigate("/upload")}>Upload Resume</button>
         ):(
            <h2 className="text-blue-800 text-lg">Review your uploaded {resumes.length} resume(s) and go over the feedback gotten again</h2>
          )};
         { loadingResumes && ( 
            <div className="flex flex-col items-center justify-center">
              <img src="/images/resume-scan-2.gif"className="w-[200px]" />
            </div> 
         )};  

         
    
        </div>
  
        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            { resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
             ))}
         </div> 
         )}  
         {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10">
            
          </div>
         )}

      </section>
    </main>
    
   
  );
}
