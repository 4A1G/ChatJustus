(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[214],{58034:function(e,n,t){Promise.resolve().then(t.bind(t,2623))},2623:function(e,n,t){"use strict";t.r(n),t.d(n,{Providers:function(){return o}});var s=t(57437),i=t(36826),r=t(50439);function o(e){let{children:n}=e,t=(0,r.O_)();return(0,s.jsxs)(s.Fragment,{children:[t&&(0,s.jsx)(i.U,{url:"ws://".concat((()=>{if(t)return"4a1g.github.io"===window.location.hostname?"34.90.113.6":window.location.hostname})(),":42069/ws/follow_up"),context:i.Fb,autoconnect:!0,wsAuth:!0,children:n}),!t&&n]})}},36826:function(e,n,t){"use strict";t.d(n,{Fb:function(){return a},U:function(){return c}});var s=t(57437),i=t(50439),r=t(2265),o=t(71424),l=t(51872);let a=(0,r.createContext)(null),c=e=>{let{url:n,children:t,context:o,autoconnect:a,wsAuth:c}=e,d=(0,r.useMemo)(()=>new h(n),[n]);if(c){let[e,t]=(0,i._)("_USER_ID",null),[s,o]=(0,i.Xs)("_SESSION_ID",null);(0,r.useEffect)(()=>(null==d||d.registerEvent("_REQUEST_USER_SESSION",()=>{let n=e,i=s;null===e&&(t(n=(0,l.Z)()),console.log("generated new user id",n)),null===s&&(o(i=(0,l.Z)()),console.log("generated new session id",i)),d.send("_USER_SESSION",{user:n,session:i})}),()=>{null==d||d.deregisterEvent("_REQUEST_USER_SESSION")}),[n])}return a&&(0,r.useEffect)(()=>d.connect(),[n]),(0,s.jsx)(o.Provider,{value:d,children:t})};class h{registerEvent(e,n){if(e in this.eventHandlers)throw Error("already subscribed to ".concat(e));this.eventHandlers[e]=n}deregisterEvent(e){if(!(e in this.eventHandlers))throw Error("not subscribed to ".concat(e));delete this.eventHandlers[e]}registerInit(e,n){if(e in this.initHandlers)throw Error("already registered");this.initHandlers[e]=n}deregisterInit(e){if(!(e in this.initHandlers))throw Error("not registered");delete this.initHandlers[e]}registerBinary(e){if(null!==this.binaryHandler)throw Error("already registered");this.binaryHandler=e}deregisterBinary(){if(null===this.binaryHandler)throw Error("not registered");this.binaryHandler=null}send(e,n){var t,s;if((null===(t=this.ws)||void 0===t?void 0:t.readyState)!==WebSocket.OPEN){o.toast.error("Sending while not connected!");return}null===(s=this.ws)||void 0===s||s.send(JSON.stringify({type:e,data:n}))}connect(){return console.log("connecting to ",this.url),o.toast.info("Connecting to server..."),this.ws=new WebSocket(this.url),this.autoReconnect=!0,this.ws.onopen=()=>{console.log("connected"),o.toast.success("Connected to server!"),this.isConnected=!0,this.onConnectionChange&&this.onConnectionChange(this.isConnected),this.retryInterval=this.minRetryInterval},this.ws.onclose=()=>{console.log("disconnected"),this.isConnected=!1,this.onConnectionChange&&this.onConnectionChange(this.isConnected),this.autoReconnect?(o.toast.warning("Disconnected from server: Retrying in ".concat(this.retryInterval/1e3," seconds...")),this.retryTimeout=setTimeout(()=>{this!==null&&this.url&&!this.isConnected&&(console.log("reconnecting"),this.connect())},this.retryInterval),this.retryInterval=Math.min(2*this.retryInterval,this.maxRetryInterval)):o.toast.warning("Disconnected from server!")},this.ws.onerror=e=>{var n;console.error("Socket encountered error: ",e,"Closing socket"),o.toast.error("Socket Error: ".concat(e)),null===(n=this.ws)||void 0===n||n.close()},this.ws.onmessage=e=>{this.handleReceiveEvent(e)},()=>{this.disconnect()}}disconnect(){var e;this.autoReconnect=!1,null===(e=this.ws)||void 0===e||e.close(),this.onConnectionChange&&this.onConnectionChange(!1),null!==this.ws&&(this.ws.onopen=null,this.ws.onclose=null,this.ws.onmessage=null,this.ws.onerror=null,this.ws=null),null!==this.retryTimeout&&(clearTimeout(this.retryTimeout),this.retryTimeout=null)}handleReceiveEvent(e){if("string"==typeof e.data){let n=JSON.parse(e.data);if("_DISCONNECT"==n.type){this.disconnect(),o.toast.loading("Seems like you're logged in somewhere else. If this is a mistake, please refresh the page.");return}n.type in this.eventHandlers?this.eventHandlers[n.type](n.data):console.log("unhandled event: ".concat(n.type))}else null!==this.binaryHandler?this.binaryHandler(e.data):console.log("unhandled binary message")}constructor(e,n=250,t=1e4){this.ws=null,this.isConnected=!1,this.onConnectionChange=void 0,this.eventHandlers={},this.initHandlers={},this.binaryHandler=null,this.retryTimeout=null,this.autoReconnect=!0,this.url=e,this.minRetryInterval=n,this.maxRetryInterval=t,this.retryInterval=n}}}},function(e){e.O(0,[409,1,971,938,744],function(){return e(e.s=58034)}),_N_E=e.O()}]);