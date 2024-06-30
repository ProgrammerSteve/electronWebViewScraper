import {BrowserWindow,app, ipcMain, IpcMainEvent} from "electron";

// import pie from "puppeteer-in-electron"
// import puppeteer from 'puppeteer-core';

// type Puppeteer= typeof import("c:/Users/Steven/Desktop/Practice/electronVite/electronVitePractice/node_modules/puppeteer-core/lib/types")

import { IPC_ACTIONS } from "./IPCActions.js";

const {
    SET_WINDOW_TITLE,
    // SCRAPE_URL
}=IPC_ACTIONS.Window;

const handleSetWindowTitle=(event:IpcMainEvent,title:string)=>{
    const webContents=event?.sender;
    const window=BrowserWindow.fromWebContents(webContents);
    window?.setTitle(title);
}

// const handleScrapeWebsite=async(event:IpcMainEvent,url:string)=>{
//     try {
//         await pie.initialize(app);
//         const browser = await pie.connect(app, ((puppeteer as unknown) as Puppeteer));
       
//         const window = new BrowserWindow();
//         //const url = "https://jobs.lever.co/firmex/abe41797-613b-4471-bc97-c61bef58b30e";
//         await window.loadURL(url);
       
//         const page = await pie.getPage(browser, window);

//         await page.goto(url);

//         const result = await page.evaluate(() => {
//             const jobDescriptionDiv = document.querySelector('[data-qa="job-description"]');
//             const closingDescriptionDiv = document.querySelector('[data-qa="closing-description"]');
//             if (jobDescriptionDiv && closingDescriptionDiv) {
//                 let currentNode = jobDescriptionDiv.nextElementSibling;
//                 let textContent = '';

//                 while (currentNode && currentNode !== closingDescriptionDiv) {
//                     textContent += currentNode.textContent || '';
//                     currentNode = currentNode.nextElementSibling;
//                 }

//                 return textContent;
//             }
//             return '';
//         });

//         window.destroy();
//         await browser.close();
//         event.sender.send(SCRAPE_URL, result);
//         //event.returnValue = result; // Send the result back to the renderer
//     } catch (error) {
//         console.error('Scraping error:', error);
//         //event.returnValue = 'Error occurred during scraping';
//         event.sender.send(SCRAPE_URL, 'Error occurred during scraping');
//     }
// }

const ipcHandlers=[
    {
        event:SET_WINDOW_TITLE,
        callback:handleSetWindowTitle
    },
    // {
    //     event:SCRAPE_URL,
    //     callback:()=>handleScrapeWebsite
    // }
]



export const registerIPCHandlers=()=>{
    ipcHandlers.forEach((handler:{event:string,callback:any})=>{
        ipcMain.on(handler.event,handler.callback)
    })
}