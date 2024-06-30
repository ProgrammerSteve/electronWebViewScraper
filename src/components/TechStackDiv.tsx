import React from "react";

interface IProps{
    text:string;
}

export default function TechStackDiv({text}:IProps){
    return(
    <div className="px-4 min-w-[300px]">
        <div className='flex justify-start items-center'>
          <h2 className='bg-slate-950 w-full text-white px-2 py-1 rounded-t-lg'>TechStack</h2>
        </div>
        <div className='scrollbar-hide w-full h-[40px] text-xs overflow-y-scroll border-black border-2 rounded-b-lg '>
            {text||"Not Found"}
        </div>
    </div>
    )
}