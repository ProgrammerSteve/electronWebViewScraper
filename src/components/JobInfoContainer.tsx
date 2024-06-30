interface IProps{
    salary:string;
    title:string;
    company:string;
}

export default function JobInfoContainer({salary,title,company}:IProps){
    return(
        <div className='flex flex-wrap'>
            <InfoContainer header="Salary" text={salary}/>
            <InfoContainer header="Title" text={title}/>
            <InfoContainer header="Company" text={company}/>
        </div>
    )
}


const InfoContainer=({header,text}:{header:string,text:string})=>{
    return(
    <div className="w-1/2 min-w-[300px] px-4 mb-4">
        <div className='flex justify-start items-center'>
          <h2 className='bg-slate-950 w-full text-white px-2 py-1 rounded-t-lg'>{header}</h2>
        </div>
        <div className='scrollbar-hide w-full h-[40px] text-xs overflow-y-scroll border-black border-2 rounded-b-lg'>
        {text || "Not listed"}
        </div>
    </div>
    )
} 