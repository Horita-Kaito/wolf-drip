import puppeteer from "puppeteer";
const OUT="/private/tmp/claude-501/-Users-kaitohorita-Projects-wolf-drip/3d4da661-dca9-4eca-af42-d68477b595c6/scratchpad";
const b=await puppeteer.launch({headless:"new"});
const p=await b.newPage();
await p.emulateMediaFeatures([{name:"prefers-reduced-motion",value:"reduce"}]);
await p.setViewport({width:1920,height:1000});
await p.goto("http://localhost:3000",{waitUntil:"networkidle0",timeout:60000});
await new Promise(r=>setTimeout(r,1500));
const info = await p.evaluate(()=>{
  const s=document.querySelector('#coffee');
  const arrows=s.querySelector('[data-reveal]:nth-of-type(2)');
  const btns=[...s.querySelectorAll('button')];
  return {buttons: btns.length, arrowsVisible: btns.length ? btns[0].getBoundingClientRect().width > 0 : false};
});
console.log(JSON.stringify(info));
await (await p.$('#coffee')).screenshot({path:`${OUT}/menu-noarrow.png`});
await b.close();
