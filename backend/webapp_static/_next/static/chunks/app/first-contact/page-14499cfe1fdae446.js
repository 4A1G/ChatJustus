(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[514],{78136:function(e,n,t){Promise.resolve().then(t.bind(t,33142))},33142:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return y}});var s=t(57437),a=t(2265),i=t(9627),o=t(36826);t(20105);var r=t(6137),l=t(88962),u=t(80200),c=t(18644),d=t(2203),h=t(37931);function y(){let[e,n]=(0,a.useState)(!1),t=(0,a.useContext)(o.Fb),[y,f]=(0,a.useState)(!1);(0,h.$)(t);let m=(0,i.M)("GPT",{modelList:[],selectedModel:"",temperature:1,runningTasks:[]}),w=(0,i.M)("MESSAGES",l.j0),p=(0,i.M)("FIRST_CONTACT",{chatEnded:!1,summarySchema:{},summary:{}});return(0,a.useEffect)(()=>{t&&(t.onConnectionChange=f)},[]),(0,s.jsx)(u.R.Provider,{value:p,children:(0,s.jsx)(d.C,{leftSidebar:(0,s.jsxs)("div",{className:"flex flex-col content-between h-full",children:[(0,s.jsx)(c.B,{gpt:m,messages:w,showSystem:e,setShowSystem:n}),(0,s.jsxs)("div",{className:"flex flex-wrap justify-between p-2 items-center bg-default-100",children:[(0,s.jsx)(r.R,{}),(0,s.jsx)("div",{className:"flex gap-2"})]})]}),children:(0,s.jsx)(l.en,{introTitle:"Welcome to ChatJustus!",introContent:"\nDo you have any legal questions? I can help you with:\n- Answering your questions about the law\n- Your legal situation\n- Finding Lawyers at *Sterling Legal Associates*, specialized for your case\n- Forwarding your case to the lawyer\n\n*For your privacy, this conversation will **not be saved**, and only the final inquiry you send will be forwarded to the lawyer.*\n              ",history:w.partial?[...w.history,w.partial]:w.history,onSend:e=>{m.startTask({type:"PROMPT",prompt:e})},onCancel:()=>{m.cancelTask({type:"PROMPT"})},isConnected:y,isGenerating:m.runningTasks.includes("PROMPT"),isDisabled:p.chatEnded,showSystem:e})})})}}},function(e){e.O(0,[306,954,409,1,457,835,867,971,938,744],function(){return e(e.s=78136)}),_N_E=e.O()}]);