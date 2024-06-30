interface IProps{
    url:string;
    selectedUrl:string;
    handler:(url:string)=>void
}

export default function UrlLink({url,selectedUrl,handler}:IProps){
    const handleClick=()=>{
        handler(url);
      }
    let isSelected=url==selectedUrl
    return(
        <div onClick={handleClick} className={`overflow-hidden overflow-ellipsis text-nowrap h-8 px-2 grid place-items-center w-full ${isSelected?"bg-slate-200":"bg-slate-400"}  cursor-pointer rounded-sm`}>{url}</div>
    )
}


