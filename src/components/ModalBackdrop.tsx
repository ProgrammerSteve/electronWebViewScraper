interface IProps{
    handleShowWebView:()=>void;
}

export default function ModalBackdrop({handleShowWebView}:IProps){

    return(
        <>
        <div onClick={handleShowWebView} className='h-screen w-screen absolute bg-slate-600/50 z-10 top-0 left-0'/>
        <div onClick={handleShowWebView} className="h-[50px] z-20 aspect-square absolute top-2 right-2 cursor-pointer hover:scale-105">
            <div className="w-[80%] h-[9px] bg-gray-200   absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] origin-center rotate-45 "/>
            <div className="w-[80%] h-[9px] bg-gray-200  absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] origin-center -rotate-45 "/>  
           
        </div>
        </>
    )
}