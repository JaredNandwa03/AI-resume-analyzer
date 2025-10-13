import { useCallback, useState } from "react";
import {useDropzone} from "react-dropzone";
import { formatSize } from "../lib/utils";

interface FileUploaderProps{
   onFileSelect? : (file:File | null) => void;
}
const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
     
    
    const onDrop = useCallback((acceptedFiles: File[]) => {
       const file = acceptedFiles[0] || null;
       onFileSelect?.(file);
     }, [onFileSelect])

     const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
          onDrop,
          multiple: false,
          accept: {
           'application/pdf': ['.pdf'],
          },
          maxSize: 20 * 1024 * 1024,
      });
      const file = acceptedFiles[0] || null;
      


  
    return (
    <div className="w-full gradient-border">
        <div {...getRootProps()}>
           <input {...getInputProps()} />
           <div className="space-y-4 cursor-pointer">
                
           </div>
           {file ? (
             <div className="p-4 text-center">
                <div className="uploader-selected-file flex 
                              items-center justify-center gap-2 mb-2" onClick={(e) => e.stopPropagation()}>
                  <img src="/images/pdf.png" alt="pdf" className="size-20" />
                  <img src="/icons/check.svg" alt="uploaded" className="w-5 h-5" />
                  <span className="font-semibold text-green-600">File uploaded successfully</span>
                </div>
                <p className="text-lg text-blue-800 font-medium truncate">
                  {file.name}
                </p>
                <p className="text-sm text-blue-600">
                  {formatSize(file.size)}
                </p>
                <button className="text-sm font-bold text-blue-600
                                   cursor-pointer" onClick={() => onFileSelect?.(null)}>
                    <img src="/icons/cross.svg" alt="remove" className="size-10" />
                </button>
             </div>
           ):(
             <div className="p-4 text-center">
               <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2 ">
                    <img src="/icons/info.svg" alt="upload" className="size-20"/>
                </div>
                <p className="text-lg text-blue-800">
                   <span className="font-semibold">
                      Click to upload.
                   </span> 
                </p>
                <p className="text-lg text-blue-800">
                    PDF (max size = 20 MB)
                </p>
             </div>
           )}
       
        
        </div>
    </div>
  )
}

export default FileUploader;