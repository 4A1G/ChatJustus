(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[214],{58034:function(e,t,n){Promise.resolve().then(n.bind(n,2623))},2623:function(e,t,n){"use strict";n.r(t),n.d(t,{Providers:function(){return r}});var s=n(57437),i=n(2265),o=n(36826);function r(e){let{children:t}=e,[n,r]=i.useState(!1);return i.useEffect(()=>{r(!0)},[]),(0,s.jsxs)(s.Fragment,{children:[n&&(0,s.jsx)(o.U,{url:"ws://".concat(window.location.hostname,":42069/ws/follow_up/default_session"),children:t}),!n&&t]})}},36826:function(e,t,n){"use strict";n.d(t,{U:function(){return c},hg:function(){return r}});var s=n(57437),i=n(2265),o=n(71424);let r=(0,i.createContext)(null),c=e=>{let{url:t,children:n}=e,o=(0,i.useMemo)(()=>new l(t),[t]);return(0,i.useEffect)(()=>()=>{o.disconnect()},[t,o]),(0,s.jsx)(r.Provider,{value:o,children:n})};class l{registerEvent(e,t){if(e in this.eventHandlers)throw Error("already subscribed to ".concat(e));this.eventHandlers[e]=t}deregisterEvent(e){if(!(e in this.eventHandlers))throw Error("not subscribed to ".concat(e));delete this.eventHandlers[e]}registerInit(e,t){if(e in this.initHandlers)throw Error("already registered");this.initHandlers[e]=t}deregisterInit(e){if(!(e in this.initHandlers))throw Error("not registered");delete this.initHandlers[e]}send(e,t){this.isConnected&&this.ws.send(JSON.stringify({type:e,data:t}))}connect(){return console.log("connecting to ",this.url),o.toast.info("Connecting to server..."),this.ws=new WebSocket(this.url),this.autoReconnect=!0,this.ws.onopen=()=>{console.log("connected"),o.toast.success("Connected to server!"),this.isConnected=!0,this.onConnectionChange&&this.onConnectionChange(this.isConnected),this.retryInterval=this.minRetryInterval},this.ws.onclose=()=>{console.log("disconnected"),this.isConnected=!1,this.onConnectionChange&&this.onConnectionChange(this.isConnected),this.autoReconnect?(o.toast.warning("Disconnected from server: Retrying in ".concat(this.retryInterval/1e3," seconds...")),this.retryTimeout=setTimeout(()=>{this!==null&&this.url&&!this.isConnected&&(console.log("reconnecting"),this.connect())},this.retryInterval),this.retryInterval=Math.min(2*this.retryInterval,this.maxRetryInterval)):o.toast.warning("Disconnected from server!")},this.ws.onerror=e=>{console.error("Socket encountered error: ",e,"Closing socket"),o.toast.error("Socket Error: ".concat(e)),this.ws.close()},this.ws.onmessage=e=>{this.handleReceiveEvent(e)},()=>{this.disconnect()}}disconnect(){var e;this.autoReconnect=!1,null===(e=this.ws)||void 0===e||e.close(),this.onConnectionChange&&this.onConnectionChange(!1),null!==this.ws&&(this.ws.onopen=null,this.ws.onclose=null,this.ws.onmessage=null,this.ws.onerror=null,this.ws=null),null!==this.retryTimeout&&(clearTimeout(this.retryTimeout),this.retryTimeout=null)}handleReceiveEvent(e){let t=JSON.parse(e.data);t.type in this.eventHandlers?this.eventHandlers[t.type](t.data):console.log("unhandled event: ".concat(t.type))}constructor(e,t=250,n=1e4){this.ws=null,this.isConnected=!1,this.onConnectionChange=void 0,this.eventHandlers={},this.initHandlers={},this.retryTimeout=null,this.autoReconnect=!0,this.url=e,this.minRetryInterval=t,this.maxRetryInterval=n,this.retryInterval=t}}}},function(e){e.O(0,[409,971,938,744],function(){return e(e.s=58034)}),_N_E=e.O()}]);