import { ipcRenderer, contextBridge } from 'electron'
import { IPC_ACTIONS } from './IPC/IPCActions'

const {
  SET_WINDOW_TITLE,
  SEARCH_FOR_KEYWORDS
}=IPC_ACTIONS.Window


// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})

contextBridge.exposeInMainWorld("ipcAPI",{
  setWindowTitle:(title:string)=>ipcRenderer.send(SET_WINDOW_TITLE,title),
  searchForKeywords: (paragraph: string) => ipcRenderer.invoke(SEARCH_FOR_KEYWORDS,paragraph),
  // runChatGPT: (paragraph:string) => ipcRenderer.invoke(RUN_CHATGPT,paragraph),
  // scrapeUrls: ()=>ipcRenderer.invoke(SCRAPE_URL)
})