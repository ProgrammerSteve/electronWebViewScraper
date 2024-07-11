import {BrowserWindow, ipcMain, IpcMainEvent} from "electron";
import { IPC_ACTIONS } from "./IPCActions.js";
import { ac } from "../utility/wordSearch.js";

type AnyRest=any[]

type handlerObj={
  event:string,
  callback: (event: IpcMainEvent, ...rest: AnyRest)=>any
}

const {
    SET_WINDOW_TITLE,
    SEARCH_FOR_KEYWORDS
}=IPC_ACTIONS.Window;

const handleSetWindowTitle=(event:IpcMainEvent,title:string)=>{
    const webContents=event?.sender;
    const window=BrowserWindow.fromWebContents(webContents);
    window?.setTitle(title);
}

const handleSearchForKeywords=(event:IpcMainEvent,paragraph:string)=>{
  let lowercaseParagraph=paragraph.toLowerCase()
  const matches=ac.search(lowercaseParagraph)
  return matches
}

const ipcOneWayHandlers:handlerObj[]=[
    {
        event:SET_WINDOW_TITLE,
        callback:handleSetWindowTitle
    },
]
const ipcTwoWayHandlers:handlerObj[]=[
  {
    event:SEARCH_FOR_KEYWORDS,
    callback:handleSearchForKeywords
},
]

export const registerOneWayIPCHandlers=()=>{
  ipcOneWayHandlers.forEach((handler:{event:string,callback:any})=>{
        ipcMain.on(handler.event,handler.callback)
    })
}
export const registerTwoWayIPCHandlers=()=>{
  ipcTwoWayHandlers.forEach((handler:{event:string,callback:any})=>{
        ipcMain.handle(handler.event,handler.callback)
    })
}

