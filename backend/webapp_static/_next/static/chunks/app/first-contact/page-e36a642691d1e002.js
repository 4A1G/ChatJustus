(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[514],{78136:function(e,n,t){Promise.resolve().then(t.bind(t,33142))},33142:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return c}});var s=t(57437),r=t(2265),i=t(47854),a=t(79947);t(20105);var o=t(757),u=t(80200);function c(){let e=(0,r.useContext)(a.hg),[n,t]=(0,r.useState)(!1),c=(0,i.M)("GPT",{modelList:[],selectedModel:"",temperature:1,runningTasks:[]}),l=(0,i.M)("MESSAGES",o.j0),d=(0,i.M)("DATA",{firstContactSummarySchema:{}});return(0,r.useEffect)(()=>(e&&(e.onConnectionChange=t),null==e?void 0:e.connect()),[]),(0,s.jsx)(u.R.Provider,{value:d,children:(0,s.jsx)("div",{className:"w-full h-full",children:(0,s.jsx)(o.en,{history:l.partial?[...l.history,l.partial]:l.history,onSend:e=>{c.startTask({type:"PROMPT",prompt:e})},onCancel:()=>{c.cancelTask({type:"PROMPT"})},isConnected:n,isGenerating:c.runningTasks.includes("PROMPT"),showSystem:!0})})})}}},function(e){e.O(0,[306,954,409,125,266,472,971,938,744],function(){return e(e.s=78136)}),_N_E=e.O()}]);