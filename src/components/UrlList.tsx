import UrlLink from "./Link"

interface IProps{
    urls:string[];
    handleSetUrl:(url:string)=>void;
    handleScrape:()=>void;
    handleView:()=>void;
}

export default function UrlList({ urls, handleSetUrl,handleScrape,handleView }: IProps){

    return(
        <div className='w-[200px] flex flex-col rounded-lg'>
        <div className='flex justify-evenly py-4 bg-slate-950 rounded-t-lg'>
            <HandlerButton text="Scrape" handler={handleScrape}/>
            <HandlerButton text="View Website" handler={handleView}/>
        </div>
        <div className='bg-slate-600/85 flex-1 flex flex-col gap-2 pt-2 px-1 overflow-y-scroll scrollbar-hide rounded-b-lg'>
          {urls.map((url)=><UrlLink url={url} handler={handleSetUrl}/>)}
        </div>

      </div>
    )
}


const HandlerButton=({handler,text}:{handler:()=>void;text:string})=>{
    return(
        <div onClick={handler} className="grid place-items-center p-1 rounded-md bg-zinc-100 text-slate-950 font-bold cursor-pointer">{text}</div>
    )
}