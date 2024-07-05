import { useEffect, useState, useRef } from 'react'
 
import { setWindowTitle,runChatGPT } from './IPC/IPCMessages';

import './App.scss'
import UrlList from './components/UrlList';
import JobInfoContainer from './components/JobInfoContainer';
import TechStackDiv from './components/TechStackDiv';
import ContentDiv from './components/ContentDiv';
import ModalBackdrop from './components/ModalBackdrop';


export type JobDetails={
  salary: string,
  experience: string,
  techStack: string[]
}




    
function scrapeLeverContent(){
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
}

function scrapeGreenhouseContent(){
  const contentDiv = document.getElementById('content');
    if (contentDiv) {
      return contentDiv.innerText || 'No content found';
    }
    return 'No content found';
}

function scrapeLeverJobTitle(){
  const postingHeadlineDiv = document.querySelector('div.posting-headline');
  if (postingHeadlineDiv) {
      const h2Element = postingHeadlineDiv.querySelector('h2');
      if (h2Element && h2Element.textContent) {
          const jobTitle = h2Element.textContent.trim();
          return jobTitle
      } else {
          return('Title not found');
      }
  } else {
    return('Title not found');
  }
}

function scrapeGreenhouseJobTitle(){
  const headerDiv = document.getElementById('header');
  if (headerDiv) {
      const titleElement = headerDiv.querySelector('h1.app-title');
      if (titleElement && titleElement.textContent) {
          const titleText = titleElement.textContent.trim();
          return titleText
      } else {
          return('Title not found');
      }
  } else {
      return('Title not found');
  }
}

function scrapeLeverSalary(){
  const salaryDiv = document.querySelector('[data-qa="salary-range"]');
  if (salaryDiv) {
      const salaryRangeDiv = salaryDiv.querySelector('div:first-child');
      if (salaryRangeDiv && salaryRangeDiv.textContent) {
          const salaryRange = salaryRangeDiv.textContent.trim();
          return(salaryRange);
      } else {
          return('Salary range not found');
      }
  } else {
      return('Salary range not found');
  }
}
async function testGPTScrape(paragraph:string){
  const res=await runChatGPT(paragraph)
  console.log("response for runChatGPT:\n",res)
}

const leverUrls=[
  //"https://jobs.lever.co/scratchfinancial/1e4d2c34-1a0c-4731-b336-17bdafe30b09",
  "https://jobs.lever.co/firmex/abe41797-613b-4471-bc97-c61bef58b30e",
  "https://jobs.lever.co/fullstacklabs/7c581e44-d053-4601-982a-4c65a7505855",
  "https://jobs.lever.co/pelmorex/49c9fa75-f39b-4f39-8b96-88560988ac5e",
  "https://jobs.lever.co/tokenmetrics/24e473dc-1594-46d2-b3f8-03e03b004e3d",
  "https://jobs.lever.co/90seconds/fb1d48fa-f1c7-4a0e-a35b-471ba62dbf85",
  "https://jobs.eu.lever.co/quadcode/4b3a9532-8f64-47c7-9d4b-bfca2dcc9de1",
]

const greenhouseUrls=[
  "https://boards.greenhouse.io/visitingmedia/jobs/4373495006",
]

function App() {
  const [url, setUrl] = useState<string>(leverUrls[0]);
  const [salary, setSalary] = useState<string>('Yet to be scraped');
  const [title, setTitle] = useState<string>('Yet to be scraped');
  const [jobDetails,setJobDetails]=useState<JobDetails>({salary:"",experience:"",techStack:[]})
  const [experience, setExperience] = useState<string>('Yet to be scraped');
  const [showWebView,setShowWebView]=useState(false)
  const [techStackText, setTechStackText] = useState<string>('Yet to be scraped');
  const [contentText, setContentText] = useState<string>('Yet to be scraped');
  const webviewRef = useRef<Electron.WebviewTag>(null);
  const handleSetUrl=(url:string)=>setUrl(url)
  const handleShowWebView=()=>setShowWebView(!showWebView)
  const getCompanyFromUrl=(url:string)=>url.replace("https://","").split("/")[1]
  
  useEffect(()=>setContentText('Yet to be scraped'),[url])

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

  const webviewScrapeContent = () => {
    if (webviewRef.current) {
      let scrapeFunctionString = `(${scrapeGreenhouseContent.toString()})();`;
      let scrapeFunctionJobTitleString=`(${scrapeGreenhouseJobTitle.toString()})()`
      let scrapeFunctionSalary=`(${scrapeLeverSalary.toString()})()`
      if(url.replace("https://","").split("/")[0].split(".").includes("lever")){
        scrapeFunctionString = `(${scrapeLeverContent.toString()})();`;
        scrapeFunctionJobTitleString=`(${scrapeLeverJobTitle.toString()})()`
      }
      webviewRef.current.executeJavaScript(scrapeFunctionString)
        .then(result => {
          setContentText(result)
          
          return result
        })
        .then(content=>{
          console.log("content:",content)
          try{
            console.log("running testGPTScrape...")
            testGPTScrape(content)
            
          }catch(e){
            console.log("failed...\n",e)
          }
          return
        }).then(()=>console.log("success"))
        .catch(err => setContentText(err));

      webviewRef.current.executeJavaScript(scrapeFunctionJobTitleString)
        .then(result => setTitle(result))
        .catch(err => setTitle(err));
      webviewRef.current.executeJavaScript(scrapeFunctionSalary)
        .then(result => setSalary(result))
        .catch(err => setSalary(err));
    }
  };

  return (
    <>
    <div className='flex w-screen'>
      <UrlList handleSetUrl={handleSetUrl} selectedUrl={url} urls={[...leverUrls,...greenhouseUrls]} handleScrape={webviewScrapeContent} handleView={handleShowWebView}/>
      <div className='min-w-0 flex-1 flex flex-col gap-3 px-2'>
        <JobInfoContainer items={infoContainerInfo}  />
        <TechStackDiv text={techStackText}/>
        <ContentDiv text={contentText}/>
      </div>
    </div>
    {showWebView && <ModalBackdrop handleShowWebView={handleShowWebView}/>}
    <webview ref={webviewRef} id="foo" src={url} className={`${showWebView?"visible":"invisible"} z-20 webview-class fixed top-[60px] left-[50%] -translate-x-[50%] border-black border-2`}></webview>
    </>
  )
}

export default App
