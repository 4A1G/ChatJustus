(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[514],{78136:function(e,n,t){Promise.resolve().then(t.bind(t,33142))},33142:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return m}});var s=t(57437),a=t(2265),i=t(9627),o=t(36826);t(20105);var l=t(6137),r=t(88962),c=t(80200),u=t(21416),d=t(2203),h=t(37931),y=t(62510),f=t(34574);function m(){let[e,n]=(0,a.useState)(!1),t=(0,a.useContext)(o.Fb),[m,p]=(0,a.useState)(!1);(0,h.$)(t);let x=(0,i.M)("GPT",{modelList:[],selectedModel:"",temperature:1,runningTasks:[]}),w=(0,i.M)("MESSAGES",r.j0),T=(0,i.M)("FIRST_CONTACT",{chatEnded:!1,summarySchema:{},summary:{}});return(0,a.useEffect)(()=>{t&&(t.onConnectionChange=p)},[]),(0,s.jsx)(c.p.Provider,{value:T,children:(0,s.jsx)(d.C,{leftSidebar:(0,s.jsxs)("div",{className:"flex flex-col content-between h-full",children:[(0,s.jsx)(u.B,{gpt:x,messages:w,showSystem:e,setShowSystem:n}),(0,s.jsxs)("div",{className:"flex flex-wrap justify-between p-2 items-center bg-default-100",children:[(0,s.jsx)(l.R,{}),(0,s.jsx)("div",{className:"flex gap-2"})]})]}),children:(0,s.jsx)(r.en,{introTitle:"Welcome to ChatJustus!",introContent:"\nDo you have any legal questions? I can help you with:\n- Answering your questions about the law\n- Your legal situation\n- Finding Lawyers at *Sterling Legal Associates*, specialized for your case\n- Forwarding your case to the lawyer\n\n*For your privacy, this conversation will **not be saved**, and only the final inquiry you send will be forwarded to the lawyer.*\n              ",history:w.partial?[...w.history,w.partial]:w.history,onSend:e=>{x.startTask({type:"PROMPT",prompt:e})},onCancel:()=>{x.cancelTask({type:"PROMPT"})},isConnected:m,isGenerating:x.runningTasks.includes("PROMPT"),isDisabled:!!T.chatEnded&&(0,s.jsxs)("div",{className:"flex justify-between items-center",children:[(0,s.jsxs)("p",{className:"font-bold",children:[(0,s.jsx)(y.ETl,{className:"text-xl inline m-1"})," Thank you, please check your email to proceed!"]}),(0,s.jsx)(f.p,{tooltip:"This will permanently reset your conversation!",onConfirm:()=>{w.sendAction({type:"RESET_CHAT"}),T.syncChatEnded(!1)},children:"No, start over"})]}),showSystem:e})})})}}},function(e){e.O(0,[306,954,409,1,565,397,457,835,898,971,938,744],function(){return e(e.s=78136)}),_N_E=e.O()}]);