if(!self.define){let e,t={};const a=(a,s)=>(a=new URL(a+".js",s).href,t[a]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=t,document.head.appendChild(e)}else e=a,importScripts(a),t()})).then((()=>{let e=t[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(s,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(t[c])return;let u={};const r=e=>a(e,c),n={module:{uri:c},exports:u,require:r};t[c]=Promise.all(s.map((e=>n[e]||r(e)))).then((e=>(i(...e),u)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/ChatJustus/_next/app-build-manifest.json",revision:"c2de58960a06e4519e091d0d41bb9b12"},{url:"/ChatJustus/_next/static/LcUoTreDcJ23774rhMsMk/_buildManifest.js",revision:"e50bd43c906648e2a1ccbe057d6ceadb"},{url:"/ChatJustus/_next/static/LcUoTreDcJ23774rhMsMk/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/ChatJustus/_next/static/chunks/1-bf133871cf49b6a8.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/163-01df035e88d6758c.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/176-6179e1f9918a34e8.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/305-9fa53e6de884bd50.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/39209d7c-4651709190488920.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/397-4b0cbc7abfabc939.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/409-b070ee8e15f8b67b.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/457-caf1a5f6c12e62ce.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/487-f5f98179b0847293.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/565-c98129ed5cc94ae3.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/898-f3473adcbb716c3b.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/925-e2a450b947c08746.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/938-fb054594c01f188e.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/app/_not-found-7bf8388037434514.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/app/cases/page-a46847e1f9ce0798.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/app/demo-first-contact/layout-10560ce78d03a116.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/app/demo-first-contact/page-9c1d6470469c9cab.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/app/demo-follow-up/layout-610ca68fcd634401.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/app/demo-follow-up/page-eca9546170e81f03.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/app/error-c95d38635a6360dc.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/app/first-contact/layout-2b69233cc6981fa5.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/app/first-contact/page-beaa5848901c7020.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/app/follow-up/layout-0e3580d2e0731fca.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/app/follow-up/page-e2a717118bc03295.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/app/layout-4549415f1d103f53.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/app/page-65eee471af54769b.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/d3ac728e-f3256fa472bdadd9.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/fd9d1056-b5f966bed3480f81.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/framework-43665103d101a22d.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/main-7bb30853365c88b5.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/main-app-ad40683d63248fa4.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/pages/_app-8e650e1c50ef0819.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/pages/_error-0ffac66cb3fae446.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/ChatJustus/_next/static/chunks/webpack-165fea13aa37ff5f.js",revision:"LcUoTreDcJ23774rhMsMk"},{url:"/ChatJustus/_next/static/css/34478baeda36b1d9.css",revision:"34478baeda36b1d9"},{url:"/ChatJustus/_next/static/css/85868f7132cc6a55.css",revision:"85868f7132cc6a55"},{url:"/ChatJustus/_next/static/media/122c360d7fe6d395-s.p.woff2",revision:"9b2795fb691d8f8a83312a4436f5a453"},{url:"/ChatJustus/_next/static/media/4de1fea1a954a5b6-s.p.woff2",revision:"b7d6b48d8d12946dc808ff39aed6c460"},{url:"/ChatJustus/_next/static/media/4e9c981b858f86ba-s.p.woff2",revision:"d11f980dd2c6b717cc38d4d61b822366"},{url:"/ChatJustus/_next/static/media/57767cbf2d1d304e-s.woff2",revision:"367c4f38a96dfaabf15e2f2333f4a570"},{url:"/ChatJustus/_next/static/media/6a026954c8391586-s.woff2",revision:"59f19a4d1b22515430ae1a5efbeb2c57"},{url:"/ChatJustus/_next/static/media/702e4e99e218cbf7-s.woff2",revision:"243c51a10e4446eb7c17776c03d2f962"},{url:"/ChatJustus/_next/static/media/84242cf39c521723-s.woff2",revision:"2c2e3ba9e53aef7decb3409d1bf3c77a"},{url:"/ChatJustus/_next/static/media/9bbb7f84f3601865-s.woff2",revision:"d8134b7ae9ca2232a397ef9afa6c8d30"},{url:"/ChatJustus/_next/static/media/9f05b6a2725a7318-s.woff2",revision:"afbfd524bdefea1003f0ee71b617e50e"},{url:"/ChatJustus/_next/static/media/KaTeX_AMS-Regular.1608a09b.woff",revision:"1608a09b"},{url:"/ChatJustus/_next/static/media/KaTeX_AMS-Regular.4aafdb68.ttf",revision:"4aafdb68"},{url:"/ChatJustus/_next/static/media/KaTeX_AMS-Regular.a79f1c31.woff2",revision:"a79f1c31"},{url:"/ChatJustus/_next/static/media/KaTeX_Caligraphic-Bold.b6770918.woff",revision:"b6770918"},{url:"/ChatJustus/_next/static/media/KaTeX_Caligraphic-Bold.cce5b8ec.ttf",revision:"cce5b8ec"},{url:"/ChatJustus/_next/static/media/KaTeX_Caligraphic-Bold.ec17d132.woff2",revision:"ec17d132"},{url:"/ChatJustus/_next/static/media/KaTeX_Caligraphic-Regular.07ef19e7.ttf",revision:"07ef19e7"},{url:"/ChatJustus/_next/static/media/KaTeX_Caligraphic-Regular.55fac258.woff2",revision:"55fac258"},{url:"/ChatJustus/_next/static/media/KaTeX_Caligraphic-Regular.dad44a7f.woff",revision:"dad44a7f"},{url:"/ChatJustus/_next/static/media/KaTeX_Fraktur-Bold.9f256b85.woff",revision:"9f256b85"},{url:"/ChatJustus/_next/static/media/KaTeX_Fraktur-Bold.b18f59e1.ttf",revision:"b18f59e1"},{url:"/ChatJustus/_next/static/media/KaTeX_Fraktur-Bold.d42a5579.woff2",revision:"d42a5579"},{url:"/ChatJustus/_next/static/media/KaTeX_Fraktur-Regular.7c187121.woff",revision:"7c187121"},{url:"/ChatJustus/_next/static/media/KaTeX_Fraktur-Regular.d3c882a6.woff2",revision:"d3c882a6"},{url:"/ChatJustus/_next/static/media/KaTeX_Fraktur-Regular.ed38e79f.ttf",revision:"ed38e79f"},{url:"/ChatJustus/_next/static/media/KaTeX_Main-Bold.b74a1a8b.ttf",revision:"b74a1a8b"},{url:"/ChatJustus/_next/static/media/KaTeX_Main-Bold.c3fb5ac2.woff2",revision:"c3fb5ac2"},{url:"/ChatJustus/_next/static/media/KaTeX_Main-Bold.d181c465.woff",revision:"d181c465"},{url:"/ChatJustus/_next/static/media/KaTeX_Main-BoldItalic.6f2bb1df.woff2",revision:"6f2bb1df"},{url:"/ChatJustus/_next/static/media/KaTeX_Main-BoldItalic.70d8b0a5.ttf",revision:"70d8b0a5"},{url:"/ChatJustus/_next/static/media/KaTeX_Main-BoldItalic.e3f82f9d.woff",revision:"e3f82f9d"},{url:"/ChatJustus/_next/static/media/KaTeX_Main-Italic.47373d1e.ttf",revision:"47373d1e"},{url:"/ChatJustus/_next/static/media/KaTeX_Main-Italic.8916142b.woff2",revision:"8916142b"},{url:"/ChatJustus/_next/static/media/KaTeX_Main-Italic.9024d815.woff",revision:"9024d815"},{url:"/ChatJustus/_next/static/media/KaTeX_Main-Regular.0462f03b.woff2",revision:"0462f03b"},{url:"/ChatJustus/_next/static/media/KaTeX_Main-Regular.7f51fe03.woff",revision:"7f51fe03"},{url:"/ChatJustus/_next/static/media/KaTeX_Main-Regular.b7f8fe9b.ttf",revision:"b7f8fe9b"},{url:"/ChatJustus/_next/static/media/KaTeX_Math-BoldItalic.572d331f.woff2",revision:"572d331f"},{url:"/ChatJustus/_next/static/media/KaTeX_Math-BoldItalic.a879cf83.ttf",revision:"a879cf83"},{url:"/ChatJustus/_next/static/media/KaTeX_Math-BoldItalic.f1035d8d.woff",revision:"f1035d8d"},{url:"/ChatJustus/_next/static/media/KaTeX_Math-Italic.5295ba48.woff",revision:"5295ba48"},{url:"/ChatJustus/_next/static/media/KaTeX_Math-Italic.939bc644.ttf",revision:"939bc644"},{url:"/ChatJustus/_next/static/media/KaTeX_Math-Italic.f28c23ac.woff2",revision:"f28c23ac"},{url:"/ChatJustus/_next/static/media/KaTeX_SansSerif-Bold.8c5b5494.woff2",revision:"8c5b5494"},{url:"/ChatJustus/_next/static/media/KaTeX_SansSerif-Bold.94e1e8dc.ttf",revision:"94e1e8dc"},{url:"/ChatJustus/_next/static/media/KaTeX_SansSerif-Bold.bf59d231.woff",revision:"bf59d231"},{url:"/ChatJustus/_next/static/media/KaTeX_SansSerif-Italic.3b1e59b3.woff2",revision:"3b1e59b3"},{url:"/ChatJustus/_next/static/media/KaTeX_SansSerif-Italic.7c9bc82b.woff",revision:"7c9bc82b"},{url:"/ChatJustus/_next/static/media/KaTeX_SansSerif-Italic.b4c20c84.ttf",revision:"b4c20c84"},{url:"/ChatJustus/_next/static/media/KaTeX_SansSerif-Regular.74048478.woff",revision:"74048478"},{url:"/ChatJustus/_next/static/media/KaTeX_SansSerif-Regular.ba21ed5f.woff2",revision:"ba21ed5f"},{url:"/ChatJustus/_next/static/media/KaTeX_SansSerif-Regular.d4d7ba48.ttf",revision:"d4d7ba48"},{url:"/ChatJustus/_next/static/media/KaTeX_Script-Regular.03e9641d.woff2",revision:"03e9641d"},{url:"/ChatJustus/_next/static/media/KaTeX_Script-Regular.07505710.woff",revision:"07505710"},{url:"/ChatJustus/_next/static/media/KaTeX_Script-Regular.fe9cbbe1.ttf",revision:"fe9cbbe1"},{url:"/ChatJustus/_next/static/media/KaTeX_Size1-Regular.e1e279cb.woff",revision:"e1e279cb"},{url:"/ChatJustus/_next/static/media/KaTeX_Size1-Regular.eae34984.woff2",revision:"eae34984"},{url:"/ChatJustus/_next/static/media/KaTeX_Size1-Regular.fabc004a.ttf",revision:"fabc004a"},{url:"/ChatJustus/_next/static/media/KaTeX_Size2-Regular.57727022.woff",revision:"57727022"},{url:"/ChatJustus/_next/static/media/KaTeX_Size2-Regular.5916a24f.woff2",revision:"5916a24f"},{url:"/ChatJustus/_next/static/media/KaTeX_Size2-Regular.d6b476ec.ttf",revision:"d6b476ec"},{url:"/ChatJustus/_next/static/media/KaTeX_Size3-Regular.9acaf01c.woff",revision:"9acaf01c"},{url:"/ChatJustus/_next/static/media/KaTeX_Size3-Regular.a144ef58.ttf",revision:"a144ef58"},{url:"/ChatJustus/_next/static/media/KaTeX_Size3-Regular.b4230e7e.woff2",revision:"b4230e7e"},{url:"/ChatJustus/_next/static/media/KaTeX_Size4-Regular.10d95fd3.woff2",revision:"10d95fd3"},{url:"/ChatJustus/_next/static/media/KaTeX_Size4-Regular.7a996c9d.woff",revision:"7a996c9d"},{url:"/ChatJustus/_next/static/media/KaTeX_Size4-Regular.fbccdabe.ttf",revision:"fbccdabe"},{url:"/ChatJustus/_next/static/media/KaTeX_Typewriter-Regular.6258592b.woff",revision:"6258592b"},{url:"/ChatJustus/_next/static/media/KaTeX_Typewriter-Regular.a8709e36.woff2",revision:"a8709e36"},{url:"/ChatJustus/_next/static/media/KaTeX_Typewriter-Regular.d97aaf4a.ttf",revision:"d97aaf4a"},{url:"/ChatJustus/_next/static/media/a8eac78432f0a60b-s.woff2",revision:"be605f007472cc947fe6b6bb493228a5"},{url:"/ChatJustus/_next/static/media/c740c1d45290834f-s.woff2",revision:"bff99a4bbc4740c49b75b52f290be90e"},{url:"/ChatJustus/_next/static/media/d0697bdd3fb49a78-s.woff2",revision:"50b29fea20cba8e522c34a1413592253"},{url:"/ChatJustus/_next/static/media/f1df658da56627d0-s.woff2",revision:"372d9cf6e4822b41d014fcc9de0a979a"},{url:"/ChatJustus/apple-touch-icon.png",revision:"303e72167e2c4aee6a7b03f792f8eba3"},{url:"/ChatJustus/avatar.png",revision:"77a99f579797093da7ec0683ee88496a"},{url:"/ChatJustus/avatar_bg_none.png",revision:"92ff2d02cd0f5010be547aafcb8f9bfe"},{url:"/ChatJustus/divorce.png",revision:"7e455844c1f6447a7068e75493236a59"},{url:"/ChatJustus/favicon.ico",revision:"9c6525d094e658aba11233b9895cb0fc"},{url:"/ChatJustus/icon-192x192.png",revision:"5b41f0b39832e3f57d71478f9434c0e5"},{url:"/ChatJustus/icon-256x256.png",revision:"0ff0d689f527b38ef7698781e27c6944"},{url:"/ChatJustus/icon-384x384.png",revision:"f825a84f045436650938baf66e8179a2"},{url:"/ChatJustus/icon-512x512.png",revision:"b8a6d11650074f43916b47776b60d939"},{url:"/ChatJustus/manifest.webmanifest",revision:"0bec6683ba867e8e5c2e9e50bebb77fd"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/ChatJustus",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:t,event:a,state:s})=>t&&"opaqueredirect"===t.type?new Response(t.body,{status:200,statusText:"OK",headers:t.headers}):t}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const t=e.pathname;return!t.startsWith("/api/auth/")&&!!t.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
