if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let t={};const o=e=>s(e,d),l={module:{uri:d},exports:t,require:o};i[d]=Promise.all(n.map((e=>l[e]||o(e)))).then((e=>(r(...e),t)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-2db8e318.css",revision:null},{url:"assets/index-84a8704d.js",revision:null},{url:"index.html",revision:"ce95dc0dc486915e7dd756e8b6a4a2ae"},{url:"registerSW.js",revision:"38ebdd60b50d9645ed4dda56b6d0c3a0"},{url:"icons/512.png",revision:"6e7dc0dbf96c2ad8116ffa8a55b32c60"},{url:"manifest.webmanifest",revision:"ba9b8df56d53168748f340f0555e57f9"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
