import {BrowserWindow,app, ipcMain, IpcMainEvent,IpcMainInvokeEvent} from "electron";

import type { JobDetails } from "../../src/App.js";
import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});



import { IPC_ACTIONS } from "./IPCActions.js";

const {
    SET_WINDOW_TITLE,
    RUN_CHATGPT
    // SCRAPE_URL
}=IPC_ACTIONS.Window;

const handleSetWindowTitle=(event:IpcMainEvent,title:string)=>{
    const webContents=event?.sender;
    const window=BrowserWindow.fromWebContents(webContents);
    window?.setTitle(title);
}

const handleRunChatGPT = async (event: IpcMainEvent, ...args: any[]) => {
    const [paragraph] = args;
    try {
      const jobDetails = await extractJobDetails(paragraph);
      return jobDetails
    } catch (error) {
      console.log('Error handling ChatGPT request:', error);
      return {
        salary: 'not found',
        experience: 'not found',
        techStack: []
      }
    }
  };
  


const ipcOneWayHandlers=[
    {
        event:SET_WINDOW_TITLE,
        callback:handleSetWindowTitle
    },

]
const ipcTwoWayHandlers=[
  {
    event: RUN_CHATGPT,
    callback: handleRunChatGPT
  }
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







export async function extractJobDetails(paragraph: string): Promise<JobDetails> {
    // Define the prompt
    const prompt = `
      Extract the following information from the job description paragraph:
      1. Salary range
      2. Experience requirements
      3. Array of strings for the tech stack
  
      If the information is not found, use the following default values:
      {
        salary: "not found",
        experience: "not found",
        techStack: []
      }
  
      Return the information in the following JSON format:
      {
        salary: "salary range",
        experience: "experience requirements",
        techStack: ["tech1", "tech2", "tech3"]
      }

      Only return the JSON
  
      Job description paragraph:
      "${paragraph}"
    `;
  
    // Send the prompt to the OpenAI API
    const response = await openai.completions.create({
      model: 'gpt-4.0-turbo',
      prompt: prompt,
      max_tokens: 200,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
  
    // Parse the response
    const text = response.choices[0]?.text.trim();
    let result;
    try {
      result = JSON.parse(text);
    } catch (error) {
      result = {
        salary: "not found",
        experience: "not found",
        techStack: []
      };
    }
  
    return result;
  }