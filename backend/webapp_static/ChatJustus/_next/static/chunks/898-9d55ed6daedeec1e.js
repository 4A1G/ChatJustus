"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[898],{80200:function(e,t,n){n.d(t,{R:function(){return s}});let s=(0,n(2265).createContext)({})},34574:function(e,t,n){n.d(t,{_:function(){return d},p:function(){return u}});var s=n(57437),l=n(94494),r=n(60074),i=n(28414),a=n(28193),o=n(15397),c=n(2265);let d=e=>{let{trigger:t,tooltip:n,isOpen:o,setIsOpen:c,children:d,popoverProps:u,tooltipProps:h,className:x}=e;return(0,s.jsxs)(l.j,{isOpen:o,onOpenChange:c,...u,children:[n?(0,s.jsx)(r.e,{content:n,...h,children:(0,s.jsxs)("div",{className:"max-w-full ".concat(x),children:[" ",(0,s.jsx)(i.b,{children:t})]})}):(0,s.jsx)(i.b,{children:t}),(0,s.jsx)(a.g,{children:d})]})},u=e=>{let{onConfirm:t,tooltip:n,warning:l,confirm:r="Confirm",buttonProps:i,confirmProps:a,children:u}=e,[h,x]=(0,c.useState)(!1);return(0,s.jsx)(d,{isOpen:h,setIsOpen:x,tooltip:n,trigger:(0,s.jsx)(o.A,{...i,children:u}),popoverProps:{backdrop:"blur"},children:(0,s.jsxs)("div",{className:"px-1 py-2 flex flex-col gap-2",children:[l||n&&(0,s.jsx)("div",{className:"mb-3 max-w-xs font-bold",children:n}),(0,s.jsx)(o.A,{color:"primary",onPress:()=>{x(!1),t()},...a,children:r})]})})}},26071:function(e,t,n){n.d(t,{x:function(){return a},n:function(){return i.G}});var s=n(57437),l=n(2265),r=n(46720),i=n(87427);let a=(0,l.forwardRef)(function(e,t){var n;let{selectionMode:l="multiple",defaultExpandedKeys:i=[],variant:a="shadow",color:o,showDivider:c=!1,className:d="",itemClasses:u={},children:h,id:x,...m}=e,f=o?"text-".concat(o,"-foreground"):"text-primary/100";return(0,s.jsx)(r.d,{id:x,ref:t,selectionMode:l,defaultExpandedKeys:i,variant:a,showDivider:c,className:"p-2 flex flex-col gap-1 w-full ".concat(o?"bg-".concat(o):"bg-default-50"," ").concat(d),itemClasses:Object.keys(n={base:"py-0 w-full",title:"font-normal text-medium ".concat(f),trigger:"px-2 py-0 hover:bg-default-200 rounded-lg h-12 flex items-center",indicator:"text-medium ".concat(f),content:"text-small ".concat(o?"text-".concat(o,"-foreground"):"text-default-foreground"," px-2 py-2 flex flex-col gap-2")}).reduce((e,t)=>(e[t]="".concat(n[t]," ").concat(u[t]||"").trim(),e),{}),...m,children:h})})},26236:function(e,t,n){n.d(t,{q:function(){return i}});var s=n(57437);n(2265);var l=n(39508),r=n(19174);let i=e=>{let{selected:t,setSelected:n,valList:i,classNames:a,...o}=e,c={...a,trigger:"".concat((null==a?void 0:a.trigger)||"")};return(0,s.jsx)(l.g,{labelPlacement:"inside",selectionMode:"single",disallowEmptySelection:!!t,selectedKeys:t?[t]:void 0,onSelectionChange:e=>{n(e.values().next().value)},items:i.map(e=>({val:e})),classNames:c,...o,children:e=>(0,s.jsx)(r.R,{children:e.val},e.val)})}},88962:function(e,t,n){n.d(t,{en:function(){return K},j0:function(){return O}});var s=n(57437),l=n(2265),r=n(78172),i=n(40744),a=n(62510),o=n(74466),c=n(41077),d=n(84068),u=n(15397),h=n(51737),x=n(93931),m=n(26236);function f(e){let{children:t,className:n,hasMoveUp:l,hasMoveDown:r,hasRemove:i,readonly:o,...c}=e;return(0,s.jsxs)("div",{className:"flex flex-row gap-1 items-center justify-between",children:[(0,s.jsx)("div",{className:"grow [&_.control-label]:hidden",children:t}),!o&&(0,s.jsxs)(h.g,{children:[(0,s.jsx)(u.A,{isIconOnly:!0,size:"sm",isDisabled:!l||o,onClick:c.onReorderClick(c.index,c.index-1),children:(0,s.jsx)(a.$Pg,{})}),(0,s.jsx)(u.A,{isIconOnly:!0,size:"sm",isDisabled:!r||o,onClick:c.onReorderClick(c.index,c.index+1),children:(0,s.jsx)(a.iUH,{})}),(0,s.jsx)(u.A,{isIconOnly:!0,size:"sm",isDisabled:!i||o,onClick:c.onDropIndexClick(c.index),children:(0,s.jsx)(a.iFH,{})})]})]})}let g=(0,d.Zz)({widgets:{SelectWidget:e=>{var t;let{id:n,label:l,placeholder:r,required:i,value:a,readonly:o,onChange:c,options:d}=e;return(0,s.jsx)(m.q,{id:n,label:null,labelPlacement:"outside",placeholder:r,isRequired:i,isDisabled:o,selected:a,setSelected:c,valList:(null===(t=d.enumOptions)||void 0===t?void 0:t.map(e=>e.value))||[]})},TextWidget:e=>{var t;let{id:n,label:l,placeholder:r,required:i,value:a,readonly:o,onChange:c,rawErrors:d}=e;return(0,s.jsx)(x.Y,{id:n,isRequired:i,value:a,placeholder:r,isDisabled:o,onChange:e=>c(e.target.value),minRows:1,maxRows:10,isInvalid:(null!==(t=null==d?void 0:d.length)&&void 0!==t?t:0)>0,errorMessage:d})}},templates:{ArrayFieldTemplate:function(e){var t;let{items:n,canAdd:l,onAddClick:r,readonly:i,rawErrors:o,...c}=e;return(0,s.jsx)("div",{className:"",children:(0,s.jsxs)("div",{className:"flex flex-col gap-1 pl-2 border-l-1 border-primary/100",children:[n.map(e=>{let{key:t,...n}=e;return(0,s.jsx)(f,{...n},t)}),l&&!i&&(0,s.jsx)(u.A,{fullWidth:!0,size:"sm",onClick:r,children:(0,s.jsx)(a.wEH,{})}),(null!==(t=null==o?void 0:o.length)&&void 0!==t?t:0)>0&&(0,s.jsx)("div",{className:"text-red-500",children:JSON.stringify(o)})]})})},FieldTemplate:function(e){let{id:t,classNames:n,style:l,label:r,help:i,required:a,description:o,errors:c,children:d}=e;return(0,s.jsxs)("div",{className:"",style:l,children:[o,(0,s.jsx)("div",{className:"",children:d}),c,i]})},ObjectFieldTemplate:function(e){let t=e=>e.replace(/^[-_]*(.)/,(e,t)=>t.toUpperCase()).replace(/[-_]+(.)/g,(e,t)=>" "+t.toUpperCase());return(0,s.jsx)("div",{children:e.properties.map((e,n)=>(0,s.jsxs)("div",{className:"mb-4",children:[(0,s.jsx)("div",{className:"text-xs font-bold text-primary/100 mb-1",children:t(e.name)}),e.content]},n))})},DescriptionFieldTemplate:function(e){let{description:t,id:n}=e;return null},ButtonTemplates:{SubmitButton:function(e){let{uiSchema:t}=e,{norender:n}=(0,c.rF)(t);return n?null:(0,s.jsx)(u.A,{type:"submit",color:"primary",children:"Submit"})}}}});var p=n(32695),v=n(64586),j=n(31835),y=n(21507),b=n(94042),w=n(12765),N=n(26071),S=n(49722),C=n(55357),E=n(97462),_=n(81415),k=n(47792);n(68128);let R=e=>{let{className:t,children:n,...l}=e;return(0,s.jsx)("div",{className:"overflow-auto prose dark:prose-invert prose-neutral max-w-none prose-pre:max-w-full prose-code:before:hidden prose-code:after:hidden prose-hr:m-1 prose-hr:border-primary/100 prose-a:text-primary/100 ".concat(null!=t?t:""),children:(0,s.jsx)(S.U,{remarkPlugins:[C.Z,_.Z],rehypePlugins:[E.Z,k.Z],...l,children:n})})};var T=n(80200),I=n(71424),A=n(38249);n(11296);let O={history:[],partial:null},H=e=>{let{tool_call:t}=e;return(0,s.jsxs)("div",{children:[(0,s.jsx)(R,{children:"```json\n".concat((0,i.js_beautify)(t.function.arguments,{indent_size:2}),"\n```")}),t.result?(0,s.jsx)(R,{children:"**Result:** `".concat(t.result,"`")}):null]})},D=e=>{let{tool_call:t}=e,{summarySchema:n,summary:r,setSummary:i,chatEnded:c,sendAction:d}=(0,l.useContext)(T.R),h=null;try{h=JSON.parse(t.function.arguments)}catch(e){h=null}return(0,s.jsx)("div",{children:h&&(0,s.jsx)(g,{schema:n,formData:{...h,...r},validator:o.ZP,readonly:c,onChange:e=>i(e.formData),onSubmit:e=>{d({type:"SUMMARY_SUBMITTED",...e.formData}),I.toast.info("Sending legal inquiry...")},children:c?(0,s.jsxs)(u.A,{type:"button",color:"success",className:"font-sans",onClick:()=>I.toast.success("Your inquiry has already been sent. ".concat(r.lawyer||"Your lawyer"," will contact you soon!")),children:[(0,s.jsx)(a.l_A,{})," Legal Inquiry Sent"]}):(0,s.jsxs)(u.A,{type:"submit",color:"primary",className:"font-sans",children:[(0,s.jsx)(a.Y2X,{})," Send Legal Inquiry"]})})})},L=e=>{let{tool_call:t}=e;return(0,s.jsx)("div",{})},M=e=>{let t,{tool_call:n}=e;try{let{year:e,month:s,day:l,hour:r,minute:i}=t=JSON.parse(n.function.arguments);t=new Date(e,s,l,r,i)}catch(e){t=void 0}let[r,i]=(0,l.useState)(void 0),a=r||t;return(0,s.jsx)("div",{children:t&&(0,s.jsx)(A._W,{className:"bg-default/50 rounded-xl min-w-min max-w-min p-3",style:{margin:"0px"},mode:"single",selected:a,onSelect:i,footer:a&&(0,s.jsxs)("div",{className:"flex flex-col justify-center",children:[(0,s.jsxs)("p",{className:"text-primary/100 font-bold text-center my-3",children:["Your meeting will be on ",a.toLocaleDateString(),"."]}),(0,s.jsx)(u.A,{color:"primary",onClick:()=>{I.toast.info("Scheduling meeting..."),setTimeout(()=>{I.toast.success("Meeting scheduled on ".concat(a.toLocaleDateString(),"!"))},2e3)},children:"Schedule Meeting"})]})})})},z=e=>{switch(e){case"summarize_first_contact":return{title:"Legal Inquiry to Lawyer",Renderer:D,open:!0};case"end_chat":return{title:"Chat Finished",Renderer:L,open:!1};case"query_dialog":return{title:"Searching Meeting Dialog",Renderer:H,open:!1};case"query_law_articles":return{title:"Searching Law Books",Renderer:H,open:!1};case"message_lawyer":return{title:"Message Lawyer",Renderer:H,open:!1};case"schedule_meeting":return{title:"Schedule a Meeting",Renderer:M,open:!0};default:return{title:e,Renderer:H,open:!0}}},F=e=>{switch(e.function.name){case"query_law_articles":case"query_dialog":return[e.result];default:return[]}},q=e=>{let{message:t}=e,n=t.tool_calls;return(0,s.jsx)(N.x,{defaultExpandedKeys:n.filter(e=>z(e.function.name).open).map(e=>e.id),showDivider:!0,variant:"bordered",className:"font-serif",children:n.map(e=>{let{title:t,Renderer:n,open:l}=z(e.function.name);return(0,s.jsx)(N.n,{title:"".concat(t),startContent:(0,s.jsx)("div",{className:"flex justify-center w-5 h-5",children:e.result?(0,s.jsx)(a.ETl,{className:"text-primary/100 text-lg"}):(0,s.jsx)(p.c,{color:"primary",size:"sm"})}),children:(0,s.jsx)(n,{tool_call:e})},e.id)})})},P=e=>{let{role:t,className:n}=e;switch(t){case"user":return(0,s.jsx)(v.h,{className:"".concat(n," text-primary/100"),showFallback:!0});case"assistant":return(0,s.jsx)(v.h,{className:n,src:"/ChatJustus/avatar_bg_none.png"});case"system":return(0,s.jsx)(v.h,{className:n,name:"S"});default:return(0,s.jsx)(v.h,{className:n,name:"?"})}},U={user:"bg-default/50",assistant:"bg-default/50",system:"bg-primary/50"},W={user:"",assistant:"backdrop-saturate-200",system:""},G=e=>{let{messageGroup:t,className:n}=e,l=U[t[0].role],i=W[t[0].role],a=[];for(let e of t)if(e.tool_calls)for(let t of e.tool_calls)a.push(...F(t));return(0,s.jsx)(r.E.div,{className:"rounded-3xl ".concat(i),animate:{opacity:1,y:0},initial:{opacity:0,y:50},children:(0,s.jsx)(j.w,{className:"rounded-3xl ".concat(l," shadow-md ").concat(null!=n?n:""),children:(0,s.jsxs)(y.G,{className:"flex flex-row p-0",children:[(0,s.jsx)(P,{className:"flex-none m-3 ",role:t[0].role}),(0,s.jsx)("div",{className:"min-w-0 w-full flex flex-col gap-2 p-4 pl-0",children:t.map((e,t)=>{var n,l;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(R,{children:e.content&&e.content.replaceAll("\n","  \n")+(a.length>0?"\n\n---\n**Sources**\n\n"+a.join("\n\n"):"")}),(null!==(l=null===(n=e.tool_calls)||void 0===n?void 0:n.length)&&void 0!==l?l:0)>0?(0,s.jsx)(q,{message:e}):null]})})})]})})})},J=e=>{let{onSend:t,onCancel:n,isGenerating:r,className:i}=e,[o,c]=(0,l.useState)(""),[d,h]=(0,l.useState)(0),m=()=>{""===o.trim()||r||(t(o),c(""))};return(0,s.jsxs)("div",{className:"flex flex-row items-center justify-center border bg-default-50 rounded-3xl focus:outline-none resize-none shadow-lg backdrop-blur-sm overflow-y-visible ".concat(i),children:[(0,s.jsx)(x.Y,{value:o,onValueChange:c,onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),m())},variant:"underlined",className:"ml-5",placeholder:"Type your message...",minRows:1,maxRows:15,onHeightChange:h}),(0,s.jsx)(u.A,{isIconOnly:!0,onClick:r?n:m,color:r?"danger":"primary",className:"m-2 px-4 py-2 rounded-3xl shadow-lg hover:scale-[1.2] hover:bg-current/100",style:{height:d+10},children:r?(0,s.jsx)(a.JuG,{className:"text-2xl"}):(0,s.jsx)(a.KvO,{className:"text-2xl"})})]})},K=e=>{let{introTitle:t,introContent:n,history:r,onSend:i,onCancel:o,isConnected:c,isGenerating:d,isDisabled:u,showSystem:h}=e,x=(0,l.useRef)(null),m=(0,l.useRef)(null),[f,g]=(0,l.useState)(!0),v=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"auto",t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=m.current;n&&(t||f)&&(console.log("scrolling to bottom"),n.scrollIntoView({behavior:e,block:"end",inline:"nearest"}))};(0,l.useEffect)(()=>{if(!x.current){console.log("chatRef.current is null");return}let e=x.current;g(50>=Math.abs(e.scrollHeight-(e.scrollTop+e.clientHeight)))}),(0,l.useEffect)(()=>v(),[r]),(0,l.useEffect)(()=>(window.addEventListener("resize",()=>{v()}),()=>window.removeEventListener("resize",()=>{})),[]);let N=(0,l.useMemo)(()=>{let{msgs:e,tools:t}=r.reduce((e,t,n)=>{let{msgs:s,tools:l}=e;return"tool"==t.role?l[t.tool_call_id]=t.content:s.push(t),{msgs:s,tools:l}},{msgs:[],tools:{}}),n=[];return e.forEach((s,l)=>{if("tool"!=s.role){if("assistant"==(s={...s}).role){var r;s.tool_calls=null===(r=s.tool_calls)||void 0===r?void 0:r.map(e=>({...e,result:t[e.id]}))}0==l||s.role!=e[l-1].role?n.push([s]):n[n.length-1].push(s)}}),n},[r]);return(0,s.jsxs)("div",{className:"w-full h-full px-2 flex flex-col overflow-y-scroll",ref:x,onScroll:e=>{let t=e.target;g(50>=Math.abs(t.scrollHeight-(t.scrollTop+t.clientHeight)))},children:[(0,s.jsx)("div",{className:"flex-initial h-screen flex flex-col",children:(0,s.jsxs)(j.w,{className:"my-10 p-3 self-center max-w-lg bg-default/50 backdrop-saturate-200 shadow-md",children:[(0,s.jsxs)(b.u,{className:"justify-center",children:[(0,s.jsx)(P,{className:"mr-3",role:"assistant"}),(0,s.jsx)("h1",{className:"text-2xl text-primary/100 font-serif font-bold",children:t})]}),(0,s.jsx)(y.G,{children:(0,s.jsx)(R,{className:"leading-5",children:n})}),(0,s.jsx)(w.i,{className:"justify-center",children:(0,s.jsxs)("p",{className:"text-xs text-primary/100 font-sans",children:["Made with ",(0,s.jsx)(a.$0H,{className:"inline-block"})," by Team 4A1G"]})})]})}),(0,s.jsx)("div",{className:"flex flex-col gap-2 px-2 my-8 self-center w-full max-w-3xl",children:N.map((e,t)=>"system"!==e[0].role||h?(0,s.jsx)(G,{messageGroup:e,className:""},t):null)}),(0,s.jsxs)("div",{className:"sticky bottom-0 self-center pb-5 px-2 w-full max-w-3xl",children:[!f&&(0,s.jsx)("div",{className:"relative",children:(0,s.jsx)("button",{className:"absolute bottom-3 left-1/2 -translate-x-1/2 w-12 h-8 rounded-full text-tiny text-default-600 border border-default-600 flex items-center justify-center backdrop-blur-sm bg-default-50/10 hover:bg-primary hover:scale-125 transition shadow-lg",onClick:()=>{v("smooth",!0)},children:(0,s.jsx)(a.DcT,{})})}),u?(0,s.jsx)(j.w,{className:"bg-default rounded-3xl shadow-md backdrop-blur-sm",children:(0,s.jsx)(y.G,{className:"",children:"boolean"==typeof u?(0,s.jsx)("p",{className:"text-center text-default-600",children:"Chat Finished"}):u})}):c?(0,s.jsx)(J,{onSend:e=>{g(!0),i(e)},onCancel:o,isGenerating:d}):(0,s.jsx)(j.w,{className:"bg-danger rounded-3xl shadow-md backdrop-blur-sm",children:(0,s.jsxs)(y.G,{className:"flex flex-row gap-5 items-center",children:[(0,s.jsx)(p.c,{color:"default"}),(0,s.jsx)("p",{className:"text-danger-foreground",children:"Connecting to the server..."})]})})]}),(0,s.jsx)("div",{ref:m,className:"h-0 invisible"})]})}},21416:function(e,t,n){n.d(t,{B:function(){return p}});var s=n(57437),l=n(59948),r=n.n(l),i=n(15397),a=n(88078),o=n(55481),c=n(46716),d=n(26071),u=n(26236),h=n(62510),x=n(34574),m=n(71424),f=n(2265);let g=e=>{let{messages:t}=e,[n,l]=(0,f.useState)(!1);return(0,s.jsx)(x._,{className:"grow",tooltip:"Load Chat from .json File",isOpen:n,setIsOpen:l,popoverProps:{backdrop:"blur"},trigger:(0,s.jsxs)(i.A,{fullWidth:!0,children:[(0,s.jsx)(h.n0A,{className:"flex-none"})," Load Chat"]}),children:(0,s.jsxs)("div",{className:"px-1 py-2",children:[(0,s.jsx)("div",{className:"text-small font-bold pb-3",children:"Load Chat from .json File"}),(0,s.jsx)("div",{className:"text-danger font-bold pb-3",children:"Warning: Your current chat history will be overwritten!"}),(0,s.jsx)("input",{type:"file",onChange:e=>{var n;let s=null===(n=e.target.files)||void 0===n?void 0:n[0];if(s){let e=new FileReader;e.onload=e=>{var n;let s=null===(n=e.target)||void 0===n?void 0:n.result;if(s)try{t.syncHistory(JSON.parse(s)),m.toast.success("Chat loaded!")}catch(e){m.toast.error("Error loading chat: ".concat(e))}finally{l(!1)}},e.readAsText(s)}}})]})})},p=e=>{let{listTitle:t="ChatJustus",listContent:n,gpt:l,messages:f,showSystem:p,setShowSystem:v,className:j}=e;return(0,s.jsxs)("div",{className:"flex flex-col min-h-0 h-full".concat(j||""),children:[(0,s.jsx)("div",{className:"p-4 text-xl text-primary/100 font-bold font-serif",children:t}),(0,s.jsx)("div",{className:"w-full h-full flex flex-col overflow-auto",children:(0,s.jsx)(a.o,{children:(0,s.jsx)("div",{className:"flex flex-col gap-3 m-3 mt-0",children:n})})}),(0,s.jsxs)(d.x,{variant:"light",children:[(0,s.jsxs)(d.n,{title:"Model Options",children:[(0,s.jsx)(u.q,{label:"model",selected:l.selectedModel,setSelected:l.syncSelectedModel,valList:l.modelList}),(0,s.jsx)(o.L,{size:"sm",minValue:0,maxValue:2,step:.1,value:l.temperature,onChange:l.setTemperature,onChangeEnd:l.syncTemperature,label:"Temperature"})]},"1"),(0,s.jsxs)(d.n,{title:"Chat Options",children:[(0,s.jsx)(c.i,{size:"md",color:"primary",isSelected:p,onValueChange:v,children:"Show System Messages"}),(0,s.jsxs)("div",{className:"flex flex-row flex-wrap gap-2",children:[(0,s.jsxs)(i.A,{className:"grow",onClick:()=>{r()(JSON.stringify(f.history),"chat.json"),m.toast.success("Chat downloaded!")},children:[(0,s.jsx)(h.wZo,{className:"flex-none"})," Save Chat"]}),(0,s.jsx)(g,{messages:f})]}),(0,s.jsxs)(x.p,{tooltip:"Reset chat history permanently",buttonProps:{fullWidth:!0},onConfirm:()=>f.sendAction({type:"RESET_CHAT"}),children:[(0,s.jsx)(h.D_Y,{})," Reset Chat"]})]},"2")]})]})}},2203:function(e,t,n){n.d(t,{C:function(){return u}});var s=n(57437),l=n(9566),r=n(2265),i=n(62510),a=n(91609),o=n(89605),c=n(69571),d=n(88078);let u=e=>{let{leftSidebar:t,sidebarDefaultVisible:n=!1,children:u}=e,[h,x]=(0,r.useState)(n),[m,f]=(0,r.useState)(!0);function g(){f(window.innerWidth<640)}return(0,r.useEffect)(()=>(g(),window.addEventListener("resize",g),()=>{window.removeEventListener("resize",g)}),[]),(0,r.useEffect)(()=>{g()},[m]),(0,s.jsx)("div",{className:"w-full h-full",children:m?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("button",{className:"absolute z-50 rounded-xl w-10 h-10 top-4 left-4 text-default-600 flex items-center justify-center border border-default-600 bg-default-50/10 hover:bg-default-50 hover:scale-125 transition backdrop-blur-sm shadow-lg",onClick:()=>x(!h),children:(0,s.jsx)(i.Fm7,{})}),(0,s.jsx)(a.R,{className:"overflow-hidden bg-default-100",isOpen:h,onOpenChange:x,scrollBehavior:"inside",backdrop:"blur",children:(0,s.jsx)(o.A,{children:(0,s.jsx)(c.I,{className:"p-0",children:(0,s.jsx)(d.o,{children:t})})})}),u]}):(0,s.jsxs)(l.oL,{proportionalLayout:!1,onChange:e=>{e.length>0&&x(e[0]>0)},children:[(0,s.jsx)(l.oL.Pane,{minSize:200,preferredSize:300,snap:!0,priority:l.g1.Low,visible:h,className:"bg-default-100",children:t}),(0,s.jsxs)(l.oL.Pane,{minSize:400,priority:l.g1.High,children:[(0,s.jsx)("button",{className:"absolute left-2 top-1/2 -translate-y-1/2 z-50 w-4 h-8 rounded-full text-tiny text-default-600 flex items-center justify-center bg-default-50/10 hover:bg-default-50 hover:scale-125 transition shadow-lg",onClick:()=>x(!h),children:h?(0,s.jsx)(i.bUI,{}):(0,s.jsx)(i.Dli,{})}),u]})]})})}},6137:function(e,t,n){n.d(t,{R:function(){return m}});var s=n(57437),l=n(94494),r=n(60074),i=n(28414),a=n(15397),o=n(28193),c=n(9973),d=n(46802),u=n(6435),h=n(94256),x=n(62510);let m=()=>{let{theme:e,setTheme:t}=(0,u.F)();return(0,h.Av)(),(0,s.jsxs)(l.j,{backdrop:"opaque",children:[(0,s.jsx)(r.e,{content:"Set Theme",children:(0,s.jsxs)("div",{className:"max-w-fit",children:[" ",(0,s.jsx)(i.b,{children:(0,s.jsx)(a.A,{isIconOnly:!0,children:(0,s.jsx)(x.SK9,{})})})]})}),(0,s.jsx)(o.g,{children:(0,s.jsxs)("div",{className:"px-1 py-2",children:[(0,s.jsx)("div",{className:"text-small font-bold pb-3",children:"Set Theme"}),(0,s.jsx)(r.e,{content:"Light | System | Dark",showArrow:!0,children:(0,s.jsxs)(c.n,{"aria-label":"Options",fullWidth:!0,variant:"solid",selectedKey:e,onSelectionChange:e=>t(e),children:[(0,s.jsx)(d.r,{title:(0,s.jsx)(x.Mei,{className:"text-yellow-600"})},"light"),(0,s.jsx)(d.r,{title:(0,s.jsx)(x.kvo,{})},"system"),(0,s.jsx)(d.r,{title:(0,s.jsx)(x.TLr,{className:"text-blue-500"})},"dark")]})})]})})]})}},36826:function(e,t,n){n.d(t,{Fb:function(){return o},U:function(){return c}});var s=n(57437),l=n(50439),r=n(2265),i=n(71424),a=n(51872);let o=(0,r.createContext)(null),c=e=>{let{url:t,children:n,context:i,autoconnect:o,wsAuth:c}=e,u=(0,r.useMemo)(()=>new d(t),[t]);if(c){let[e,n]=(0,l._)("_USER_ID",null),[s,i]=(0,l.Xs)("_SESSION_ID",null);(0,r.useEffect)(()=>(null==u||u.registerEvent("_REQUEST_USER_SESSION",()=>{let t=e,l=s;null===e&&(n(t=(0,a.Z)()),console.log("generated new user id",t)),null===s&&(i(l=(0,a.Z)()),console.log("generated new session id",l)),u.send("_USER_SESSION",{user:t,session:l})}),()=>{null==u||u.deregisterEvent("_REQUEST_USER_SESSION")}),[t])}return o&&(0,r.useEffect)(()=>u.connect(),[t]),(0,s.jsx)(i.Provider,{value:u,children:n})};class d{registerEvent(e,t){if(e in this.eventHandlers)throw Error("already subscribed to ".concat(e));this.eventHandlers[e]=t}deregisterEvent(e){if(!(e in this.eventHandlers))throw Error("not subscribed to ".concat(e));delete this.eventHandlers[e]}registerInit(e,t){if(e in this.initHandlers)throw Error("already registered");this.initHandlers[e]=t}deregisterInit(e){if(!(e in this.initHandlers))throw Error("not registered");delete this.initHandlers[e]}registerBinary(e){if(null!==this.binaryHandler)throw Error("already registered");this.binaryHandler=e}deregisterBinary(){if(null===this.binaryHandler)throw Error("not registered");this.binaryHandler=null}send(e,t){var n,s;if((null===(n=this.ws)||void 0===n?void 0:n.readyState)!==WebSocket.OPEN){i.toast.error("Sending while not connected!");return}null===(s=this.ws)||void 0===s||s.send(JSON.stringify({type:e,data:t}))}connect(){return console.log("connecting to ",this.url),i.toast.info("Connecting to server..."),this.ws=new WebSocket(this.url),this.autoReconnect=!0,this.ws.onopen=()=>{console.log("connected"),i.toast.success("Connected to server!"),this.isConnected=!0,this.onConnectionChange&&this.onConnectionChange(this.isConnected),this.retryInterval=this.minRetryInterval},this.ws.onclose=()=>{console.log("disconnected"),this.isConnected=!1,this.onConnectionChange&&this.onConnectionChange(this.isConnected),this.autoReconnect?(i.toast.warning("Disconnected from server: Retrying in ".concat(this.retryInterval/1e3," seconds...")),this.retryTimeout=setTimeout(()=>{this!==null&&this.url&&!this.isConnected&&(console.log("reconnecting"),this.connect())},this.retryInterval),this.retryInterval=Math.min(2*this.retryInterval,this.maxRetryInterval)):i.toast.warning("Disconnected from server!")},this.ws.onerror=e=>{var t;console.error("Socket encountered error: ",e,"Closing socket"),i.toast.error("Socket Error: ".concat(e)),null===(t=this.ws)||void 0===t||t.close()},this.ws.onmessage=e=>{this.handleReceiveEvent(e)},()=>{this.disconnect()}}disconnect(){var e;this.autoReconnect=!1,null===(e=this.ws)||void 0===e||e.close(),this.onConnectionChange&&this.onConnectionChange(!1),null!==this.ws&&(this.ws.onopen=null,this.ws.onclose=null,this.ws.onmessage=null,this.ws.onerror=null,this.ws=null),null!==this.retryTimeout&&(clearTimeout(this.retryTimeout),this.retryTimeout=null)}handleReceiveEvent(e){if("string"==typeof e.data){let t=JSON.parse(e.data);if("_DISCONNECT"==t.type){this.disconnect(),i.toast.loading("Seems like you're logged in somewhere else. If this is a mistake, please refresh the page.");return}t.type in this.eventHandlers?this.eventHandlers[t.type](t.data):console.log("unhandled event: ".concat(t.type))}else null!==this.binaryHandler?this.binaryHandler(e.data):console.log("unhandled binary message")}constructor(e,t=250,n=1e4){this.ws=null,this.isConnected=!1,this.onConnectionChange=void 0,this.eventHandlers={},this.initHandlers={},this.binaryHandler=null,this.retryTimeout=null,this.autoReconnect=!0,this.url=e,this.minRetryInterval=t,this.maxRetryInterval=n,this.retryInterval=t}}},37931:function(e,t,n){n.d(t,{$:function(){return r}});var s=n(2265),l=n(71424);let r=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";(0,s.useEffect)(()=>(null==e||e.registerEvent("_TOAST",e=>{let{message:n,type:s}=e;switch(s){case"default":default:(0,l.toast)(t+n);break;case"message":l.toast.message(t+n);break;case"success":l.toast.success(t+n);break;case"info":l.toast.info(t+n);break;case"warning":l.toast.warning(t+n);break;case"error":l.toast.error(t+n)}}),()=>null==e?void 0:e.deregisterEvent("_TOAST")),[])}},9627:function(e,t,n){n.d(t,{M:function(){return x}});var s=n(2265),l=n(85242),r=n(36826),i=n(27173);(0,i.vI)();let a=e=>"_SET:"+e,o=e=>"_GET:"+e,c=e=>"_PATCH:"+e,d=e=>"_ACTION:"+e,u=e=>"_TASK_START:"+e,h=e=>"_TASK_CANCEL:"+e;function x(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,x=arguments.length>3&&void 0!==arguments[3]&&arguments[3],[m,f]=function(e,t,n){let x=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,m=arguments.length>4&&void 0!==arguments[4]&&arguments[4],f=null!=x?x:(0,s.useContext)(r.Fb),g=t=>{null==f||f.send(a(e),t)},p=t=>{null==f||f.send(c(e),t)},v=t=>{null==f||f.send(d(e),t)},j=(0,s.useMemo)(()=>Object.keys(n).reduce((e,t)=>{let n=t.charAt(0).toUpperCase()+t.slice(1);return e["set".concat(n)]=e=>{S([{op:"replace",path:"/".concat(t),value:e}])},e["sync".concat(n)]=e=>{let n=[{op:"replace",path:"/".concat(t),value:e}];S(n),p(n)},e},{}),[n]),[[y,b],w]=(0,s.useReducer)((n,s)=>{let[r,o]=n;switch(s.type){case a(e):return[s.data,[]];case c(e):return[s.data.reduce(l.E5,(0,l.I8)(r)),[]];default:{if(!t)return[r,[]];let e=[],[n,l,a]=(0,i.aS)(t)((0,i.Sd)(r),s,()=>{e.push(e=>()=>{e.length>0&&(console.log("syncing",e),e.forEach(e=>{Array.isArray(e.path)&&(e.path=e.path.join("/")),e.path.startsWith("/")||(e.path="/"+e.path)}),p(e))})},t=>{e.push(e=>()=>{v(null!=t?t:s)})});return[n,e.map(e=>e(l))]}}},[n,[]]);(0,s.useEffect)(()=>{b.forEach(e=>e()),b.splice(0,b.length)});let N=t=>{w({type:a(e),data:t})},S=t=>{w({type:c(e),data:t})},C=e=>{w(e)};return(0,s.useEffect)(()=>(null==f||f.registerEvent(o(e),()=>g(y)),null==f||f.registerEvent(a(e),N),null==f||f.registerEvent(c(e),S),null==f||f.registerEvent(d(e),C),m&&(null==f||f.registerInit(e,()=>g(y))),()=>{null==f||f.deregisterEvent(o(e)),null==f||f.deregisterEvent(a(e)),null==f||f.deregisterEvent(c(e)),null==f||f.deregisterEvent(d(e)),m&&(null==f||f.deregisterInit(e))}),[f,e]),[{...y,...j,sendAction:v,startTask:t=>{null==f||f.send(u(e),t)},cancelTask:t=>{null==f||f.send(h(e),t)}},w]}(e,void 0,t,n,x);return m}}}]);