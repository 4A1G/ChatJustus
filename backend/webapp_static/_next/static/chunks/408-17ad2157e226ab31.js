"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[408],{80200:function(e,t,n){n.d(t,{R:function(){return s}});let s=(0,n(2265).createContext)({})},26071:function(e,t,n){n.d(t,{x:function(){return a},n:function(){return i.G}});var s=n(57437),l=n(2265),r=n(46720),i=n(87427);let a=(0,l.forwardRef)(function(e,t){var n;let{selectionMode:l="multiple",defaultExpandedKeys:i=[],variant:a="shadow",color:o,showDivider:c=!1,className:d="",itemClasses:u={},children:h,id:x,...m}=e,f=o?"text-".concat(o,"-foreground"):"text-primary/100";return(0,s.jsx)(r.d,{id:x,ref:t,selectionMode:l,defaultExpandedKeys:i,variant:a,showDivider:c,className:"p-2 flex flex-col gap-1 w-full ".concat(o?"bg-".concat(o):"bg-default-50"," ").concat(d),itemClasses:Object.keys(n={base:"py-0 w-full",title:"font-normal text-medium ".concat(f),trigger:"px-2 py-0 hover:bg-default-200 rounded-lg h-12 flex items-center",indicator:"text-medium ".concat(f),content:"text-small ".concat(o?"text-".concat(o,"-foreground"):"text-default-foreground"," px-2 py-2 flex flex-col gap-2")}).reduce((e,t)=>(e[t]="".concat(n[t]," ").concat(u[t]||"").trim(),e),{}),...m,children:h})})},26236:function(e,t,n){n.d(t,{q:function(){return i}});var s=n(57437);n(2265);var l=n(39508),r=n(19174);let i=e=>{let{selected:t,setSelected:n,valList:i,classNames:a,...o}=e,c={...a,trigger:"".concat((null==a?void 0:a.trigger)||"")};return(0,s.jsx)(l.g,{labelPlacement:"inside",selectionMode:"single",disallowEmptySelection:!!t,selectedKeys:t?[t]:void 0,onSelectionChange:e=>{n(e.values().next().value)},items:i.map(e=>({val:e})),classNames:c,...o,children:e=>(0,s.jsx)(r.R,{children:e.val},e.val)})}},88962:function(e,t,n){n.d(t,{en:function(){return G},j0:function(){return T}});var s=n(57437),l=n(2265),r=n(78172),i=n(40744),a=n(62510),o=n(74466),c=n(41077),d=n(84068),u=n(15397),h=n(51737),x=n(75680),m=n(26236);function f(e){let{children:t,className:n,hasMoveUp:l,hasMoveDown:r,hasRemove:i,readonly:o,...c}=e;return(0,s.jsxs)("div",{className:"flex flex-row gap-1 items-center justify-between",children:[(0,s.jsx)("div",{className:"grow [&_.control-label]:hidden",children:t}),!o&&(0,s.jsxs)(h.g,{children:[(0,s.jsx)(u.A,{isIconOnly:!0,size:"sm",isDisabled:!l||o,onClick:c.onReorderClick(c.index,c.index-1),children:(0,s.jsx)(a.$Pg,{})}),(0,s.jsx)(u.A,{isIconOnly:!0,size:"sm",isDisabled:!r||o,onClick:c.onReorderClick(c.index,c.index+1),children:(0,s.jsx)(a.iUH,{})}),(0,s.jsx)(u.A,{isIconOnly:!0,size:"sm",isDisabled:!i||o,onClick:c.onDropIndexClick(c.index),children:(0,s.jsx)(a.iFH,{})})]})]})}let v=(0,d.Zz)({widgets:{SelectWidget:e=>{var t;let{id:n,label:l,placeholder:r,required:i,value:a,readonly:o,onChange:c,options:d}=e;return(0,s.jsx)(m.q,{id:n,label:null,labelPlacement:"outside",placeholder:r,isRequired:i,isDisabled:o,selected:a,setSelected:c,valList:(null===(t=d.enumOptions)||void 0===t?void 0:t.map(e=>e.value))||[]})},TextWidget:e=>{var t;let{id:n,label:l,placeholder:r,required:i,value:a,readonly:o,onChange:c,rawErrors:d}=e;return(0,s.jsx)(x.Y,{id:n,isRequired:i,value:a,placeholder:r,isDisabled:o,onChange:e=>c(e.target.value),minRows:1,maxRows:10,isInvalid:(null!==(t=null==d?void 0:d.length)&&void 0!==t?t:0)>0,errorMessage:d})}},templates:{ArrayFieldTemplate:function(e){var t;let{items:n,canAdd:l,onAddClick:r,readonly:i,rawErrors:o,...c}=e;return(0,s.jsx)("div",{className:"",children:(0,s.jsxs)("div",{className:"flex flex-col gap-1 pl-2 border-l-1 border-primary/100",children:[n.map(e=>{let{key:t,...n}=e;return(0,s.jsx)(f,{...n},t)}),l&&!i&&(0,s.jsx)(u.A,{fullWidth:!0,size:"sm",onClick:r,children:(0,s.jsx)(a.wEH,{})}),(null!==(t=null==o?void 0:o.length)&&void 0!==t?t:0)>0&&(0,s.jsx)("div",{className:"text-red-500",children:JSON.stringify(o)})]})})},FieldTemplate:function(e){let{id:t,classNames:n,style:l,label:r,help:i,required:a,description:o,errors:c,children:d}=e;return(0,s.jsxs)("div",{className:"",style:l,children:[o,(0,s.jsx)("div",{className:"",children:d}),c,i]})},ObjectFieldTemplate:function(e){let t=e=>e.replace(/^[-_]*(.)/,(e,t)=>t.toUpperCase()).replace(/[-_]+(.)/g,(e,t)=>" "+t.toUpperCase());return(0,s.jsx)("div",{children:e.properties.map((e,n)=>(0,s.jsxs)("div",{className:"mb-4",children:[(0,s.jsx)("div",{className:"text-xs font-bold text-primary/100 mb-1",children:t(e.name)}),e.content]},n))})},DescriptionFieldTemplate:function(e){let{description:t,id:n}=e;return null},ButtonTemplates:{SubmitButton:function(e){let{uiSchema:t}=e,{norender:n}=(0,c.rF)(t);return n?null:(0,s.jsx)(u.A,{type:"submit",color:"primary",children:"Send Legal Inquiry"})}}}});var g=n(32695),p=n(64586),y=n(31835),j=n(21507),w=n(94042),b=n(12765),N=n(26071),C=n(46584),E=n(55357),k=n(35041),_=n(81415);n(68128);let R=e=>{let{className:t,children:n,...l}=e;return(0,s.jsx)("div",{className:"overflow-auto prose dark:prose-invert prose-neutral max-w-none prose-pre:max-w-full prose-code:before:hidden prose-code:after:hidden ".concat(null!=t?t:""),children:(0,s.jsx)(C.U,{remarkPlugins:[E.Z,_.Z],rehypePlugins:[k.Z],...l,children:n})})};var S=n(80200);let T={history:[],partial:null},I=e=>{let{tool_call:t,i:n}=e;return(0,s.jsxs)("div",{children:[(0,s.jsx)(R,{children:"```json\n".concat((0,i.js_beautify)(t.function.arguments,{indent_size:2}),"\n```")}),t.result?(0,s.jsx)(R,{children:"**Result:** `".concat(t.result,"`")}):null]})},A=e=>{let{tool_call:t,i:n}=e,{firstContactSummarySchema:r}=(0,l.useContext)(S.R),i=null;try{i=JSON.parse(t.function.arguments)}catch(e){i=null}return(0,s.jsx)("div",{children:i&&(0,s.jsx)(v,{schema:r,formData:i,validator:o.ZP,readonly:!1})})},H=e=>{switch(e){case"summarize_first_contact":return["Legal Inquiry to Lawyer",A];case"end_chat":return["Finished",I];default:return[e,I]}},D=e=>{let{message:t}=e;return(0,s.jsx)(N.x,{defaultExpandedKeys:t.tool_calls.reduce((e,t,n)=>(e.push(String(n)),e),[]),showDivider:!0,variant:"bordered",children:t.tool_calls.map((e,t)=>{let[n,l]=H(e.function.name);return(0,s.jsx)(N.n,{title:"".concat(n),startContent:(0,s.jsx)("div",{className:"flex justify-center w-5 h-5",children:e.result?(0,s.jsx)(a.ETl,{className:"text-primary/100 text-lg"}):(0,s.jsx)(g.c,{color:"primary",size:"sm"})}),children:(0,s.jsx)(l,{tool_call:e,i:t})},String(t))})})},O=e=>{let{role:t,className:n}=e;switch(t){case"user":return(0,s.jsx)(p.h,{className:"".concat(n," text-primary/100"),showFallback:!0});case"assistant":return(0,s.jsx)(p.h,{className:n,src:"/avatar_bg_none.png"});case"system":return(0,s.jsx)(p.h,{className:n,name:"S"});default:return(0,s.jsx)(p.h,{className:n,name:"?"})}},z={user:"bg-default/50",assistant:"bg-default/50",system:"bg-primary/50"},F={user:"",assistant:"backdrop-saturate-200",system:""},M=e=>{let{messageGroup:t,className:n}=e,l=z[t[0].role],i=F[t[0].role];return(0,s.jsx)(r.E.div,{className:"rounded-3xl ".concat(i),animate:{opacity:1,y:0},initial:{opacity:0,y:50},children:(0,s.jsx)(y.w,{className:"rounded-3xl ".concat(l," shadow-md ").concat(null!=n?n:""),children:(0,s.jsxs)(j.G,{className:"flex flex-row p-0",children:[(0,s.jsx)(O,{className:"flex-none m-3 ",role:t[0].role}),(0,s.jsx)("div",{className:"min-w-0 w-full flex flex-col gap-2 p-4 pl-0",children:t.map((e,t)=>{var n,l,r;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(R,{children:null===(n=e.content)||void 0===n?void 0:n.replaceAll("\n","  \n")}),(null!==(r=null===(l=e.tool_calls)||void 0===l?void 0:l.length)&&void 0!==r?r:0)>0?(0,s.jsx)(D,{message:e}):null]})})})]})})})},q=e=>{let{onSend:t,onCancel:n,isGenerating:r,className:i}=e,[o,c]=(0,l.useState)(""),[d,h]=(0,l.useState)(0),m=()=>{""===o.trim()||r||(t(o),c(""))};return(0,s.jsxs)("div",{className:"flex flex-row items-center justify-center border bg-default-50 rounded-3xl focus:outline-none resize-none shadow-lg backdrop-blur-sm overflow-y-visible ".concat(i),children:[(0,s.jsx)(x.Y,{value:o,onValueChange:c,onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),m())},variant:"underlined",className:"ml-5",placeholder:"Type your message...",minRows:1,maxRows:15,onHeightChange:h}),(0,s.jsx)(u.A,{isIconOnly:!0,onClick:r?n:m,color:r?"danger":"primary",className:"m-2 px-4 py-2 rounded-3xl shadow-lg hover:scale-[1.2] hover:bg-current/100",style:{height:d+10},children:r?(0,s.jsx)(a.JuG,{className:"text-2xl"}):(0,s.jsx)(a.KvO,{className:"text-2xl"})})]})},G=e=>{let{history:t,onSend:n,onCancel:r,isConnected:i,isGenerating:o,showSystem:c}=e,d=(0,l.useRef)(null),[u,h]=(0,l.useState)(!0),x=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"auto",t=d.current;t&&t.scrollIntoView({behavior:e,block:"end",inline:"nearest"})};(0,l.useEffect)(()=>{u&&x()},[t]),(0,l.useEffect)(()=>(window.addEventListener("resize",()=>x()),()=>window.removeEventListener("resize",()=>x())),[]);let m=(0,l.useMemo)(()=>{let{msgs:e,tools:n}=t.reduce((e,t,n)=>{let{msgs:s,tools:l}=e;return"tool"==t.role?l[t.tool_call_id]=t.content:s.push(t),{msgs:s,tools:l}},{msgs:[],tools:{}}),s=[];return e.forEach((t,l)=>{if("tool"!=t.role){if("assistant"==(t={...t}).role){var r;t.tool_calls=null===(r=t.tool_calls)||void 0===r?void 0:r.map(e=>({...e,result:n[e.id]}))}0==l||t.role!=e[l-1].role?s.push([t]):s[s.length-1].push(t)}}),s},[t]);return(0,s.jsxs)("div",{className:"w-full h-full px-2 flex flex-col overflow-y-scroll",onScroll:e=>{let t=e.target;h(50>=Math.abs(t.scrollHeight-(t.scrollTop+t.clientHeight)))},children:[(0,s.jsx)("div",{className:"flex-initial h-screen flex flex-col",children:(0,s.jsxs)(y.w,{className:"my-10 p-3 self-center max-w-lg bg-default/50 backdrop-saturate-200 shadow-md",children:[(0,s.jsxs)(w.u,{className:"justify-center",children:[(0,s.jsx)(O,{className:"mr-3",role:"assistant"}),(0,s.jsx)("h1",{className:"text-2xl text-primary/100",children:"Welcome to ChatJustus!"})]}),(0,s.jsx)(j.G,{children:(0,s.jsx)(R,{className:"leading-5",children:"\nDo you have any legal questions? I can help you with:\n- Answering your questions about the law\n- Your legal situation\n- Finding Lawyers at *Sterling Legal Associates*, specialized for your case\n- Forwarding your case to the lawyer\n\n*For your privacy, this conversation will **not be saved**, and only the final inquiry you send will be forwarded to the lawyer.*\n              "})}),(0,s.jsx)(b.i,{className:"justify-center",children:(0,s.jsxs)("p",{className:"text-xs text-primary/100",children:["Made with ",(0,s.jsx)(a.$0H,{className:"inline-block align-text-bottom"})," by Team 4A1G"]})})]})}),(0,s.jsx)("div",{className:"flex flex-col gap-2 px-2 my-8 self-center w-full max-w-3xl",children:m.map((e,t)=>"system"!==e[0].role||c?(0,s.jsx)(M,{messageGroup:e,className:""},t):null)}),(0,s.jsxs)("div",{className:"sticky bottom-0 self-center pb-5 px-2 w-full max-w-3xl",children:[!u&&(0,s.jsx)("div",{className:"relative",children:(0,s.jsx)("button",{className:"absolute bottom-3 left-1/2 -translate-x-1/2 w-12 h-8 rounded-full text-tiny text-default-600 border border-default-600 flex items-center justify-center backdrop-blur-sm bg-default-50/10 hover:bg-primary hover:scale-125 transition shadow-lg",onClick:()=>{x("smooth")},children:(0,s.jsx)(a.DcT,{})})}),i?(0,s.jsx)(q,{onSend:e=>{h(!0),n(e)},onCancel:r,isGenerating:o}):(0,s.jsx)(y.w,{className:"bg-danger rounded-3xl shadow-md backdrop-blur-sm",children:(0,s.jsxs)(j.G,{className:"flex flex-row gap-5 items-center",children:[(0,s.jsx)(g.c,{color:"default"}),(0,s.jsx)("p",{className:"text-danger-foreground",children:"Reconnecting to the server..."})]})})]}),(0,s.jsx)("div",{ref:d,className:"h-0 invisible"})]})}},79947:function(e,t,n){n.d(t,{U:function(){return a},hg:function(){return i}});var s=n(57437),l=n(2265),r=n(71424);let i=(0,l.createContext)(null),a=e=>{let{url:t,children:n}=e,r=(0,l.useMemo)(()=>new o(t),[t]);return(0,l.useEffect)(()=>()=>{r.disconnect()},[t,r]),(0,s.jsx)(i.Provider,{value:r,children:n})};class o{registerEvent(e,t){if(e in this.eventHandlers)throw Error("already subscribed to ".concat(e));this.eventHandlers[e]=t}deregisterEvent(e){if(!(e in this.eventHandlers))throw Error("not subscribed to ".concat(e));delete this.eventHandlers[e]}registerInit(e,t){if(e in this.initHandlers)throw Error("already registered");this.initHandlers[e]=t}deregisterInit(e){if(!(e in this.initHandlers))throw Error("not registered");delete this.initHandlers[e]}send(e,t){this.isConnected&&this.ws.send(JSON.stringify({type:e,data:t}))}connect(){return console.log("connecting to ",this.url),r.toast.info("Connecting to server..."),this.ws=new WebSocket(this.url),this.autoReconnect=!0,this.ws.onopen=()=>{console.log("connected"),r.toast.success("Connected to server!"),this.isConnected=!0,this.onConnectionChange&&this.onConnectionChange(this.isConnected),this.retryInterval=this.minRetryInterval},this.ws.onclose=()=>{console.log("disconnected"),this.isConnected=!1,this.onConnectionChange&&this.onConnectionChange(this.isConnected),this.autoReconnect?(r.toast.warning("Disconnected from server: Retrying in ".concat(this.retryInterval/1e3," seconds...")),this.retryTimeout=setTimeout(()=>{this!==null&&this.url&&!this.isConnected&&(console.log("reconnecting"),this.connect())},this.retryInterval),this.retryInterval=Math.min(2*this.retryInterval,this.maxRetryInterval)):r.toast.warning("Disconnected from server!")},this.ws.onerror=e=>{console.error("Socket encountered error: ",e,"Closing socket"),r.toast.error("Socket Error: ".concat(e)),this.ws.close()},this.ws.onmessage=e=>{this.handleReceiveEvent(e)},()=>{this.disconnect()}}disconnect(){var e;this.autoReconnect=!1,null===(e=this.ws)||void 0===e||e.close(),this.onConnectionChange&&this.onConnectionChange(!1),null!==this.ws&&(this.ws.onopen=null,this.ws.onclose=null,this.ws.onmessage=null,this.ws.onerror=null,this.ws=null),null!==this.retryTimeout&&(clearTimeout(this.retryTimeout),this.retryTimeout=null)}handleReceiveEvent(e){let t=JSON.parse(e.data);t.type in this.eventHandlers?this.eventHandlers[t.type](t.data):console.log("unhandled event: ".concat(t.type))}constructor(e,t=250,n=1e4){this.ws=null,this.isConnected=!1,this.onConnectionChange=void 0,this.eventHandlers={},this.initHandlers={},this.retryTimeout=null,this.autoReconnect=!0,this.url=e,this.minRetryInterval=t,this.maxRetryInterval=n,this.retryInterval=t}}},47854:function(e,t,n){n.d(t,{M:function(){return x}});var s=n(2265),l=n(85242),r=n(79947),i=n(27173);(0,i.vI)();let a=e=>"_SET:"+e,o=e=>"_GET:"+e,c=e=>"_PATCH:"+e,d=e=>"_ACTION:"+e,u=e=>"_TASK_START:"+e,h=e=>"_TASK_CANCEL:"+e;function x(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],[x,m]=function(e,t,n){let x=arguments.length>3&&void 0!==arguments[3]&&arguments[3],m=(0,s.useContext)(r.hg),f=t=>{null==m||m.send(a(e),t)},v=t=>{null==m||m.send(c(e),t)},g=t=>{null==m||m.send(d(e),t)},p=(0,s.useMemo)(()=>Object.keys(n).reduce((e,t)=>{let n=t.charAt(0).toUpperCase()+t.slice(1);return e["set".concat(n)]=e=>{N([{op:"replace",path:"/".concat(t),value:e}])},e["sync".concat(n)]=e=>{let n=[{op:"replace",path:"/".concat(t),value:e}];N(n),v(n)},e},{}),[n]),[[y,j],w]=(0,s.useReducer)((n,s)=>{let[r,o]=n;switch(s.type){case a(e):return[s.data,[]];case c(e):return[s.data.reduce(l.E5,(0,l.I8)(r)),[]];default:{if(!t)return[r,[]];let e=[],[n,l,a]=(0,i.aS)(t)((0,i.Sd)(r),s,()=>{e.push(e=>()=>{e.length>0&&(console.log("syncing",e),e.forEach(e=>{Array.isArray(e.path)&&(e.path=e.path.join("/")),e.path.startsWith("/")||(e.path="/"+e.path)}),v(e))})},t=>{e.push(e=>()=>{g(null!=t?t:s)})});return[n,e.map(e=>e(l))]}}},[n,[]]);(0,s.useEffect)(()=>{j.forEach(e=>e()),j.splice(0,j.length)});let b=t=>{w({type:a(e),data:t})},N=t=>{w({type:c(e),data:t})},C=e=>{w(e)};return(0,s.useEffect)(()=>(null==m||m.registerEvent(o(e),()=>f(y)),null==m||m.registerEvent(a(e),b),null==m||m.registerEvent(c(e),N),null==m||m.registerEvent(d(e),C),x&&(null==m||m.registerInit(e,()=>f(y))),()=>{null==m||m.deregisterEvent(o(e)),null==m||m.deregisterEvent(a(e)),null==m||m.deregisterEvent(c(e)),null==m||m.deregisterEvent(d(e)),x&&(null==m||m.deregisterInit(e))}),[m,e]),[{...y,...p,sendAction:g,startTask:t=>{null==m||m.send(u(e),t)},cancelTask:t=>{null==m||m.send(h(e),t)}},w]}(e,void 0,t,n);return x}}}]);