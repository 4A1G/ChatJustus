(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[514],{78136:function(e,t,n){Promise.resolve().then(n.bind(n,69406))},69406:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return et}});var s=n(57437),l=n(2265),r=n(85242),i=n(79947),a=n(27173);(0,a.vI)();let o=e=>"_SET:"+e,c=e=>"_GET:"+e,d=e=>"_PATCH:"+e,u=e=>"_ACTION:"+e,h=e=>"_TASK_START:"+e,m=e=>"_TASK_CANCEL:"+e;function x(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],[s,x]=function(e,t,n){let s=arguments.length>3&&void 0!==arguments[3]&&arguments[3],x=(0,l.useContext)(i.hg),f=t=>{null==x||x.send(o(e),t)},v=t=>{null==x||x.send(d(e),t)},g=t=>{null==x||x.send(u(e),t)},p=(0,l.useMemo)(()=>Object.keys(n).reduce((e,t)=>{let n=t.charAt(0).toUpperCase()+t.slice(1);return e["set".concat(n)]=e=>{C([{op:"replace",path:"/".concat(t),value:e}])},e["sync".concat(n)]=e=>{let n=[{op:"replace",path:"/".concat(t),value:e}];C(n),v(n)},e},{}),[n]),[[y,j],w]=(0,l.useReducer)((n,s)=>{let[l,i]=n;switch(s.type){case o(e):return[s.data,[]];case d(e):return[s.data.reduce(r.E5,(0,r.I8)(l)),[]];default:{if(!t)return[l,[]];let e=[],[n,r,i]=(0,a.aS)(t)((0,a.Sd)(l),s,()=>{e.push(e=>()=>{e.length>0&&(console.log("syncing",e),e.forEach(e=>{Array.isArray(e.path)&&(e.path=e.path.join("/")),e.path.startsWith("/")||(e.path="/"+e.path)}),v(e))})},t=>{e.push(e=>()=>{g(null!=t?t:s)})});return[n,e.map(e=>e(r))]}}},[n,[]]);(0,l.useEffect)(()=>{j.forEach(e=>e()),j.splice(0,j.length)});let b=t=>{w({type:o(e),data:t})},C=t=>{w({type:d(e),data:t})},N=e=>{w(e)};return(0,l.useEffect)(()=>(null==x||x.registerEvent(c(e),()=>f(y)),null==x||x.registerEvent(o(e),b),null==x||x.registerEvent(d(e),C),null==x||x.registerEvent(u(e),N),s&&(null==x||x.registerInit(e,()=>f(y))),()=>{null==x||x.deregisterEvent(c(e)),null==x||x.deregisterEvent(o(e)),null==x||x.deregisterEvent(d(e)),null==x||x.deregisterEvent(u(e)),s&&(null==x||x.deregisterInit(e))}),[x,e]),[{...y,...p,sendAction:g,startTask:t=>{null==x||x.send(h(e),t)},cancelTask:t=>{null==x||x.send(m(e),t)}},w]}(e,void 0,t,n);return s}n(20105);var f=n(78172),v=n(40744),g=n(62510),p=n(74466),y=n(41077),j=n(84068),w=n(15397),b=n(51737),C=n(93931),N=n(665),E=n(19174);let k=e=>{let{selected:t,setSelected:n,valList:l,classNames:r,...i}=e,a={...r,trigger:"".concat((null==r?void 0:r.trigger)||"")};return(0,s.jsx)(N.g,{labelPlacement:"inside",selectionMode:"single",disallowEmptySelection:!!t,selectedKeys:t?[t]:void 0,onSelectionChange:e=>{n(e.values().next().value)},items:l.map(e=>({val:e})),classNames:a,...i,children:e=>(0,s.jsx)(E.R,{children:e.val},e.val)})};function T(e){let{children:t,className:n,hasMoveUp:l,hasMoveDown:r,hasRemove:i,readonly:a,...o}=e;return(0,s.jsxs)("div",{className:"flex flex-row gap-1 items-center justify-between",children:[(0,s.jsx)("div",{className:"grow [&_.control-label]:hidden",children:t}),!a&&(0,s.jsxs)(b.g,{children:[(0,s.jsx)(w.A,{isIconOnly:!0,size:"sm",isDisabled:!l||a,onClick:o.onReorderClick(o.index,o.index-1),children:(0,s.jsx)(g.$Pg,{})}),(0,s.jsx)(w.A,{isIconOnly:!0,size:"sm",isDisabled:!r||a,onClick:o.onReorderClick(o.index,o.index+1),children:(0,s.jsx)(g.iUH,{})}),(0,s.jsx)(w.A,{isIconOnly:!0,size:"sm",isDisabled:!i||a,onClick:o.onDropIndexClick(o.index),children:(0,s.jsx)(g.iFH,{})})]})]})}let S=(0,j.Zz)({widgets:{SelectWidget:e=>{var t;let{id:n,label:l,placeholder:r,required:i,value:a,readonly:o,onChange:c,options:d}=e;return(0,s.jsx)(k,{id:n,label:null,labelPlacement:"outside",placeholder:r,isRequired:i,isDisabled:o,selected:a,setSelected:c,valList:(null===(t=d.enumOptions)||void 0===t?void 0:t.map(e=>e.value))||[]})},TextWidget:e=>{var t;let{id:n,label:l,placeholder:r,required:i,value:a,readonly:o,onChange:c,rawErrors:d}=e;return(0,s.jsx)(C.Y,{id:n,isRequired:i,value:a,placeholder:r,isDisabled:o,onChange:e=>c(e.target.value),minRows:1,maxRows:10,isInvalid:(null!==(t=null==d?void 0:d.length)&&void 0!==t?t:0)>0,errorMessage:d})}},templates:{ArrayFieldTemplate:function(e){var t;let{items:n,canAdd:l,onAddClick:r,readonly:i,rawErrors:a,...o}=e;return(0,s.jsx)("div",{className:"",children:(0,s.jsxs)("div",{className:"flex flex-col gap-1 pl-2 border-l-1 border-primary/100",children:[n.map(e=>{let{key:t,...n}=e;return(0,s.jsx)(T,{...n},t)}),l&&!i&&(0,s.jsx)(w.A,{fullWidth:!0,size:"sm",onClick:r,children:(0,s.jsx)(g.wEH,{})}),(null!==(t=null==a?void 0:a.length)&&void 0!==t?t:0)>0&&(0,s.jsx)("div",{className:"text-red-500",children:JSON.stringify(a)})]})})},FieldTemplate:function(e){let{id:t,classNames:n,style:l,label:r,help:i,required:a,description:o,errors:c,children:d}=e;return(0,s.jsxs)("div",{className:"",style:l,children:[o,(0,s.jsx)("div",{className:"",children:d}),c,i]})},ObjectFieldTemplate:function(e){let t=e=>e.replace(/^[-_]*(.)/,(e,t)=>t.toUpperCase()).replace(/[-_]+(.)/g,(e,t)=>" "+t.toUpperCase());return(0,s.jsx)("div",{children:e.properties.map((e,n)=>(0,s.jsxs)("div",{className:"mb-4",children:[(0,s.jsx)("div",{className:"text-xs font-bold text-primary/100 mb-1",children:t(e.name)}),e.content]},n))})},DescriptionFieldTemplate:function(e){let{description:t,id:n}=e;return null},ButtonTemplates:{SubmitButton:function(e){let{uiSchema:t}=e,{norender:n}=(0,y.rF)(t);return n?null:(0,s.jsx)(w.A,{type:"submit",color:"primary",children:"Send Legal Inquiry"})}}}});var _=n(32695),R=n(64586),I=n(31835),A=n(21507),O=n(94042),H=n(12765),D=n(9643),P=n(87427);let M=(0,l.forwardRef)(function(e,t){var n;let{selectionMode:l="multiple",defaultExpandedKeys:r=[],variant:i="shadow",color:a,showDivider:o=!1,className:c="",itemClasses:d={},children:u,id:h,...m}=e,x=a?"text-".concat(a,"-foreground"):"text-primary/100";return(0,s.jsx)(D.d,{id:h,ref:t,selectionMode:l,defaultExpandedKeys:r,variant:i,showDivider:o,className:"p-2 flex flex-col gap-1 w-full ".concat(a?"bg-".concat(a):"bg-default-50"," ").concat(c),itemClasses:Object.keys(n={base:"py-0 w-full",title:"font-normal text-medium ".concat(x),trigger:"px-2 py-0 hover:bg-default-200 rounded-lg h-12 flex items-center",indicator:"text-medium ".concat(x),content:"text-small ".concat(a?"text-".concat(a,"-foreground"):"text-default-foreground"," px-2 py-2 flex flex-col gap-2")}).reduce((e,t)=>(e[t]="".concat(n[t]," ").concat(d[t]||"").trim(),e),{}),...m,children:u})});var z=n(46584),G=n(55357),F=n(35041),L=n(81415);n(68128);let K=e=>{let{className:t,children:n,...l}=e;return(0,s.jsx)("div",{className:"overflow-auto prose dark:prose-invert prose-neutral max-w-none prose-pre:max-w-full prose-code:before:hidden prose-code:after:hidden ".concat(null!=t?t:""),children:(0,s.jsx)(z.U,{remarkPlugins:[G.Z,L.Z],rehypePlugins:[F.Z],...l,children:n})})},q=(0,l.createContext)({}),J={history:[],partial:null},U=e=>{let{tool_call:t,i:n}=e;return(0,s.jsxs)("div",{children:[(0,s.jsx)(K,{children:"```json\n".concat((0,v.js_beautify)(t.function.arguments,{indent_size:2}),"\n```")}),t.result?(0,s.jsx)(K,{children:"**Result:** `".concat(t.result,"`")}):null]})},W=e=>{let{tool_call:t,i:n}=e,{firstContactSummarySchema:r}=(0,l.useContext)(q),i=null;try{i=JSON.parse(t.function.arguments)}catch(e){i=null}return(0,s.jsx)("div",{children:i&&(0,s.jsx)(S,{schema:r,formData:i,validator:p.ZP,readonly:!1})})},Z=e=>{switch(e){case"summarize_first_contact":return["Legal Inquiry to Lawyer",W];case"end_chat":return["Finished",U];default:return[e,U]}},Y=e=>{let{message:t}=e;return(0,s.jsx)(M,{defaultExpandedKeys:t.tool_calls.reduce((e,t,n)=>(e.push(String(n)),e),[]),showDivider:!0,variant:"bordered",children:t.tool_calls.map((e,t)=>{let[n,l]=Z(e.function.name);return(0,s.jsx)(P.G,{title:"".concat(n),startContent:(0,s.jsx)("div",{className:"flex justify-center w-5 h-5",children:e.result?(0,s.jsx)(g.ETl,{className:"text-primary/100 text-lg"}):(0,s.jsx)(_.c,{color:"primary",size:"sm"})}),children:(0,s.jsx)(l,{tool_call:e,i:t})},String(t))})})},B=e=>{let{role:t,className:n}=e;switch(t){case"user":return(0,s.jsx)(R.h,{className:n,icon:(0,s.jsx)(g.Xws,{className:"text-2xl text-primary/100"})});case"assistant":return(0,s.jsx)(R.h,{className:n,src:"/avatar_bg_none.png"});case"system":return(0,s.jsx)(R.h,{className:n,name:"S"});default:return(0,s.jsx)(R.h,{className:n,name:"?"})}},V={user:"bg-default/50",assistant:"bg-default/50",system:"bg-primary/50"},$={user:"",assistant:"backdrop-saturate-200",system:""},X=e=>{let{messageGroup:t,className:n}=e,l=V[t[0].role],r=$[t[0].role];return(0,s.jsx)(f.E.div,{className:"rounded-3xl ".concat(r),animate:{opacity:1,y:0},initial:{opacity:0,y:50},children:(0,s.jsx)(I.w,{className:"rounded-3xl ".concat(l," shadow-md ").concat(null!=n?n:""),children:(0,s.jsxs)(A.G,{className:"flex flex-row p-0",children:[(0,s.jsx)(B,{className:"flex-none m-5 ",role:t[0].role}),(0,s.jsx)("div",{className:"min-w-0 w-full flex flex-col gap-2 p-5 pl-0",children:t.map((e,t)=>{var n,l,r;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(K,{children:null===(n=e.content)||void 0===n?void 0:n.replaceAll("\n","  \n")}),(null!==(r=null===(l=e.tool_calls)||void 0===l?void 0:l.length)&&void 0!==r?r:0)>0?(0,s.jsx)(Y,{message:e}):null]})})})]})})})},Q=e=>{let{onSend:t,onCancel:n,isGenerating:r,className:i}=e,[a,o]=(0,l.useState)(""),[c,d]=(0,l.useState)(0),u=()=>{""===a.trim()||r||(t(a),o(""))};return(0,s.jsxs)("div",{className:"flex flex-row items-center justify-center border bg-default-50 rounded-3xl focus:outline-none resize-none shadow-lg backdrop-blur overflow-y-visible ".concat(i),children:[(0,s.jsx)(C.Y,{value:a,onValueChange:o,onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),u())},variant:"underlined",className:"ml-5",placeholder:"Type your message...",minRows:1,maxRows:15,onHeightChange:d}),(0,s.jsx)(w.A,{isIconOnly:!0,onClick:r?n:u,color:r?"danger":"primary",className:"m-2 px-4 py-2 rounded-3xl shadow-lg hover:scale-[1.2] hover:bg-current/100",style:{height:c+10},children:r?(0,s.jsx)(g.JuG,{className:"text-2xl"}):(0,s.jsx)(g.KvO,{className:"text-2xl"})})]})},ee=e=>{let{history:t,onSend:n,onCancel:r,isConnected:i,isGenerating:a,showSystem:o}=e,c=(0,l.useRef)(null),[d,u]=(0,l.useState)(!0),h=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"auto",t=c.current;t&&t.scrollIntoView({behavior:e,block:"end",inline:"nearest"})};(0,l.useEffect)(()=>{d&&h()},[t]),(0,l.useEffect)(()=>(window.addEventListener("resize",()=>h()),()=>window.removeEventListener("resize",()=>h())),[]);let m=(0,l.useMemo)(()=>{let{msgs:e,tools:n}=t.reduce((e,t,n)=>{let{msgs:s,tools:l}=e;return"tool"==t.role?l[t.tool_call_id]=t.content:s.push(t),{msgs:s,tools:l}},{msgs:[],tools:{}}),s=[];return e.forEach((t,l)=>{if("tool"!=t.role){if("assistant"==(t={...t}).role){var r;t.tool_calls=null===(r=t.tool_calls)||void 0===r?void 0:r.map(e=>({...e,result:n[e.id]}))}0==l||t.role!=e[l-1].role?s.push([t]):s[s.length-1].push(t)}}),s},[t]);return(0,s.jsxs)("div",{className:"w-full h-full px-8 flex flex-col overflow-y-scroll",children:[(0,s.jsx)("div",{className:"flex-initial h-screen flex flex-col",children:(0,s.jsxs)(I.w,{className:"my-10 p-3 self-center max-w-lg bg-default/50 backdrop-saturate-200 shadow-md",children:[(0,s.jsxs)(O.u,{className:"justify-center",children:[(0,s.jsx)(B,{className:"mr-3",role:"assistant"}),(0,s.jsx)("h1",{className:"text-2xl text-primary/100",children:"Welcome to ChatJustus!"})]}),(0,s.jsx)(A.G,{children:(0,s.jsx)(K,{className:"leading-5",children:"\nDo you have any legal questions? I can help you with:\n- Answering your questions about the law\n- Your legal situation\n- Finding Lawyers at *Sterling Legal Associates*, specialized for your case\n- Forwarding your case to the lawyer\n\n*For your privacy, this conversation will **not be saved**, and only the final inquiry you send will be forwarded to the lawyer.*\n              "})}),(0,s.jsx)(H.i,{className:"justify-center",children:(0,s.jsxs)("p",{className:"text-xs text-primary/100",children:["Made with ",(0,s.jsx)(g.$0H,{className:"inline-block align-text-bottom"})," by Team 4A1G"]})})]})}),(0,s.jsx)("div",{className:"flex flex-col gap-2 px-2 my-8 self-center w-full max-w-3xl",children:m.map((e,t)=>"system"!==e[0].role||o?(0,s.jsx)(X,{messageGroup:e,className:""},t):null)}),(0,s.jsxs)("div",{className:"sticky bottom-0 self-center pb-5 px-2 w-full max-w-3xl",children:[!d&&(0,s.jsx)("div",{className:"relative",children:(0,s.jsx)("button",{className:"absolute bottom-3 left-1/2 w-12 h-8 rounded-full text-tiny text-default-600 border border-default-600 flex items-center justify-center backdrop-blur-sm bg-default-50/10 hover:bg-primary hover:scale-125 transition shadow-lg",onClick:()=>{h("smooth")},children:(0,s.jsx)(g.DcT,{})})}),i?(0,s.jsx)(Q,{onSend:e=>{u(!0),n(e)},onCancel:r,isGenerating:a}):(0,s.jsx)(I.w,{className:"bg-danger rounded-3xl shadow-md backdrop-blur",children:(0,s.jsxs)(A.G,{className:"flex flex-row gap-5 items-center",children:[(0,s.jsx)(_.c,{color:"default"}),(0,s.jsx)("p",{className:"text-danger-foreground",children:"Reconnecting to the server..."})]})})]}),(0,s.jsx)("div",{ref:c,className:"h-0 invisible"})]})};function et(){let e=(0,l.useContext)(i.hg),[t,n]=(0,l.useState)(!1),r=x("GPT",{modelList:[],selectedModel:"",temperature:1,runningTasks:[]}),a=x("MESSAGES",J),o=x("DATA",{firstContactSummarySchema:{}});return(0,l.useEffect)(()=>(e&&(e.onConnectionChange=n),null==e?void 0:e.connect()),[]),(0,s.jsx)(q.Provider,{value:o,children:(0,s.jsx)("div",{className:"w-full h-full",children:(0,s.jsx)(ee,{history:a.partial?[...a.history,a.partial]:a.history,onSend:e=>{r.startTask({type:"PROMPT",prompt:e})},onCancel:()=>{r.cancelTask({type:"PROMPT"})},isConnected:t,isGenerating:r.runningTasks.includes("PROMPT"),showSystem:!1})})})}},79947:function(e,t,n){"use strict";n.d(t,{U:function(){return a},hg:function(){return i}});var s=n(57437),l=n(2265),r=n(71424);let i=(0,l.createContext)(null),a=e=>{let{url:t,children:n}=e,r=(0,l.useMemo)(()=>new o(t),[t]);return(0,l.useEffect)(()=>()=>{r.disconnect()},[t,r]),(0,s.jsx)(i.Provider,{value:r,children:n})};class o{registerEvent(e,t){if(e in this.eventHandlers)throw Error("already subscribed to ".concat(e));this.eventHandlers[e]=t}deregisterEvent(e){if(!(e in this.eventHandlers))throw Error("not subscribed to ".concat(e));delete this.eventHandlers[e]}registerInit(e,t){if(e in this.initHandlers)throw Error("already registered");this.initHandlers[e]=t}deregisterInit(e){if(!(e in this.initHandlers))throw Error("not registered");delete this.initHandlers[e]}send(e,t){this.isConnected&&this.ws.send(JSON.stringify({type:e,data:t}))}connect(){return console.log("connecting to ",this.url),r.toast.info("Connecting to server..."),this.ws=new WebSocket(this.url),this.autoReconnect=!0,this.ws.onopen=()=>{console.log("connected"),r.toast.success("Connected to server!"),this.isConnected=!0,this.onConnectionChange&&this.onConnectionChange(this.isConnected),this.retryInterval=this.minRetryInterval},this.ws.onclose=()=>{console.log("disconnected"),this.isConnected=!1,this.onConnectionChange&&this.onConnectionChange(this.isConnected),this.autoReconnect?(r.toast.warning("Disconnected from server: Retrying in ".concat(this.retryInterval/1e3," seconds...")),this.retryTimeout=setTimeout(()=>{this!==null&&this.url&&!this.isConnected&&(console.log("reconnecting"),this.connect())},this.retryInterval),this.retryInterval=Math.min(2*this.retryInterval,this.maxRetryInterval)):r.toast.warning("Disconnected from server!")},this.ws.onerror=e=>{console.error("Socket encountered error: ",e,"Closing socket"),r.toast.error("Socket Error: ".concat(e)),this.ws.close()},this.ws.onmessage=e=>{this.handleReceiveEvent(e)},()=>{this.disconnect()}}disconnect(){var e;this.autoReconnect=!1,null===(e=this.ws)||void 0===e||e.close(),this.onConnectionChange&&this.onConnectionChange(!1),null!==this.ws&&(this.ws.onopen=null,this.ws.onclose=null,this.ws.onmessage=null,this.ws.onerror=null,this.ws=null),null!==this.retryTimeout&&(clearTimeout(this.retryTimeout),this.retryTimeout=null)}handleReceiveEvent(e){let t=JSON.parse(e.data);t.type in this.eventHandlers?this.eventHandlers[t.type](t.data):console.log("unhandled event: ".concat(t.type))}constructor(e,t=250,n=1e4){this.ws=null,this.isConnected=!1,this.onConnectionChange=void 0,this.eventHandlers={},this.initHandlers={},this.retryTimeout=null,this.autoReconnect=!0,this.url=e,this.minRetryInterval=t,this.maxRetryInterval=n,this.retryInterval=t}}}},function(e){e.O(0,[954,306,409,125,266,971,938,744],function(){return e(e.s=78136)}),_N_E=e.O()}]);