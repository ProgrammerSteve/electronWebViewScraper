interface IProps{
    items:{name:string;value:string;anchor:boolean}[];
}

export default function JobInfoContainer({items}:IProps){
    return(
        <div className='flex flex-wrap'>
            {items.map((obj,int)=><InfoContainer header={obj.name} text={obj.value} anchor={obj.anchor} key={`item-${int}`}/>)}
            {/* <InfoContainer header="Salary" text={salary}/>
            <InfoContainer header="Title" text={title}/>
            <InfoContainer header="Company" text={company}/> */}
        </div>
    )
}


const InfoContainer=({header,text,anchor}:{header:string,text:string,anchor:boolean})=>{
    return(
    <div className="w-1/2 min-w-[250px] px-4 mb-4">
        <div className='flex justify-start items-center'>
          <h2 className='bg-slate-950 w-full text-white px-2 py-1 rounded-t-lg'>{header}</h2>
        </div>
        <div className='scrollbar-hide w-full h-[40px] text-xs overflow-y-scroll border-black border-2 rounded-b-lg grid place-items-center'>
            {anchor?<a className="text-blue-500 font-bold" href={text} target="_blank">{text || "Not listed"}</a>:<p>{text || "Not listed"}</p>}
        </div>
    </div>
    )
} 