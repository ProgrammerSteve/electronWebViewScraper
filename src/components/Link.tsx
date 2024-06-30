export default function UrlLink({url,handler}:{url:string;handler:(url:string)=>void}){
    const handleClick=()=>{
        handler(url);
      }
    return(
        <div onClick={handleClick} className='overflow-hidden overflow-ellipsis text-nowrap h-8 px-2 grid place-items-center w-full bg-slate-200 cursor-pointer rounded-xl'>{url}</div>
    )
}


