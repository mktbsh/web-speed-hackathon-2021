if(!self.define){let e,i={};const n=(n,o)=>(n=new URL(n+".js",o).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(o,r)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let t={};const c=e=>n(e,s),f={module:{uri:s},exports:t,require:c};i[s]=Promise.all(o.map((e=>f[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-744b90b0"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"favicon.ico",revision:"c92b85a5b907c70211f4ec25e29a8c4a"},{url:"index.html",revision:"a96cb3fd1242ea36ca1935e761843018"},{url:"manifest.json",revision:"e41ebddd736ba7317cbbd8c535f28307"},{url:"robots.txt",revision:"fa1ded1ed7c11438a9b0385b1e112850"},{url:"terms.json",revision:"25d3c20c6ed5a369c99f827ffa3bc8d8"},{url:"webfont.css",revision:"3db1c5b99af7424a1f06bee871164284"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.registerRoute(/.+(\/|.woff)$/,new e.CacheFirst,"GET"),e.registerRoute(/.+(\/|.webp)$/,new e.CacheFirst,"GET"),e.registerRoute(/.+(\/|.mp3)$/,new e.CacheFirst,"GET"),e.registerRoute(/.+(\/|.gif)$/,new e.CacheFirst,"GET")}));
