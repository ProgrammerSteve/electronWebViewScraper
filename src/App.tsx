import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/electron-vite.animate.svg'
import './App.scss'
import { ipcMain } from 'electron';
import { setWindowTitle } from './IPC/IPCMessages';
import { BrowserWindow,app } from 'electron';
import UrlList from './components/UrlList';
import JobInfoContainer from './components/JobInfoContainer';
import TechStackDiv from './components/TechStackDiv';
import ContentDiv from './components/ContentDiv';

const headerDiv=`<div class="posting-headline">`
const startingDiAttr=`[data-qa="job-description"]`
const salaryDivAttr=`[data-qa="closing-description"]`
const closingDivAttr=`[data-qa="closing-description"]`
const applyBtnDivAttr=`[data-qa="btn-apply-bottom"]`

const urls=[
  "https://jobs.lever.co/firmex/abe41797-613b-4471-bc97-c61bef58b30e",
  "https://jobs.lever.co/fullstacklabs/7c581e44-d053-4601-982a-4c65a7505855",
  "https://jobs.lever.co/pelmorex/49c9fa75-f39b-4f39-8b96-88560988ac5e",
  "https://jobs.lever.co/tokenmetrics/24e473dc-1594-46d2-b3f8-03e03b004e3d",
  "https://jobs.lever.co/90seconds/fb1d48fa-f1c7-4a0e-a35b-471ba62dbf85",
  "https://jobs.eu.lever.co/quadcode/4b3a9532-8f64-47c7-9d4b-bfca2dcc9de1",
]

function App() {
  const [url, setUrl] = useState<string>(urls[0]);
  const [salary, setSalary] = useState<string>('Yet to be scraped');
  const [title, setTitle] = useState<string>('Yet to be scraped');
  const [experience, setExperience] = useState<string>('Yet to be scraped');
  const [showWebView,setShowWebView]=useState(false)
  const [techStackText, setTechStackText] = useState<string>('Yet to be scraped');
  const [contentText, setContentText] = useState<string>('Yet to be scraped');

  const webviewRef = useRef<Electron.WebviewTag>(null);

  const handleSetUrl=(url:string)=>{
    setUrl(url);
  }
  const handleShowWebView=()=>{
    setShowWebView(!showWebView)
  }
  const getCompanyFromUrl=(url:string)=>{
    return url.replace("https://","").split("/")[1]
  }
  useEffect(()=>{
    setContentText('Yet to be scraped')
  },[url])

  const infoContainerInfo=[
    {
      name:'Salary',
      value:salary,
      anchor:false
    },
    {
      name:'Company',
      value:getCompanyFromUrl(url),
      anchor:false
    },
    {
      name:'Title',
      value:title,
      anchor:false
    },
    {
      name:'Url',
      value:url,
      anchor:true
    },
    {
      name:'Years of Experience',
      value:experience,
      anchor:false
    },
  ]

  const scrapeInfo = () => {
    if (webviewRef.current) {
        webviewRef.current.executeJavaScript(`
            (function() {
                const jobDescriptionDiv = document.querySelector('[data-qa="job-description"]');
                const closingDescriptionDiv = document.querySelector('[data-qa="closing-description"]');
                if (jobDescriptionDiv && closingDescriptionDiv) {
                    let currentNode = jobDescriptionDiv.nextElementSibling;
                    let textContent = '';

                    while (currentNode && currentNode !== closingDescriptionDiv) {
                        textContent += currentNode.textContent || '';
                        currentNode = currentNode.nextElementSibling;
                    }

                    return textContent;
                }
                return 'No content found';
            })();
        `).then(result => {
            setContentText(result)
        });
    }
};

  return (
    <>
    <div className='flex w-screen'>
      <UrlList handleSetUrl={handleSetUrl} selectedUrl={url} urls={urls} handleScrape={scrapeInfo} handleView={handleShowWebView}/>
      <div className='min-w-0 flex-1 flex flex-col gap-3 px-2'>
        <JobInfoContainer items={infoContainerInfo}  />
        <TechStackDiv text={techStackText}/>
        <ContentDiv text={contentText}/>
      </div>
    </div>
    {showWebView && 
    <div onClick={handleShowWebView} className='h-screen w-screen absolute bg-slate-600/50 z-10 top-0 left-0'/>
    }
    <webview ref={webviewRef} id="foo" src={url} className={`${showWebView?"visible":"invisible"} z-20 webview-class fixed top-[60px] left-[50%] -translate-x-[50%] border-black border-2`}></webview>
    </>
  )
}

export default App
