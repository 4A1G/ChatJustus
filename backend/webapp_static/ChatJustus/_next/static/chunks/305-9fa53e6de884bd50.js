(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[305],{62601:function(e,t,i){"use strict";var l,n;e.exports=(null==(l=i.g.process)?void 0:l.env)&&"object"==typeof(null==(n=i.g.process)?void 0:n.env)?i.g.process:i(58960)},58960:function(e){!function(){var t={229:function(e){var t,i,l,n=e.exports={};function r(){throw Error("setTimeout has not been defined")}function o(){throw Error("clearTimeout has not been defined")}function s(e){if(t===setTimeout)return setTimeout(e,0);if((t===r||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(i){try{return t.call(null,e,0)}catch(i){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:r}catch(e){t=r}try{i="function"==typeof clearTimeout?clearTimeout:o}catch(e){i=o}}();var a=[],c=!1,u=-1;function d(){c&&l&&(c=!1,l.length?a=l.concat(a):u=-1,a.length&&f())}function f(){if(!c){var e=s(d);c=!0;for(var t=a.length;t;){for(l=a,a=[];++u<t;)l&&l[u].run();u=-1,t=a.length}l=null,c=!1,function(e){if(i===clearTimeout)return clearTimeout(e);if((i===o||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(e);try{i(e)}catch(t){try{return i.call(null,e)}catch(t){return i.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function y(){}n.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)t[i-1]=arguments[i];a.push(new h(e,t)),1!==a.length||c||s(f)},h.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.browser=!0,n.env={},n.argv=[],n.version="",n.versions={},n.on=y,n.addListener=y,n.once=y,n.off=y,n.removeListener=y,n.removeAllListeners=y,n.emit=y,n.prependListener=y,n.prependOnceListener=y,n.listeners=function(e){return[]},n.binding=function(e){throw Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(e){throw Error("process.chdir is not supported")},n.umask=function(){return 0}}},i={};function l(e){var n=i[e];if(void 0!==n)return n.exports;var r=i[e]={exports:{}},o=!0;try{t[e](r,r.exports,l),o=!1}finally{o&&delete i[e]}return r.exports}l.ab="//";var n=l(229);e.exports=n}()},91172:function(e,t,i){"use strict";i.d(t,{w_:function(){return a}});var l=i(2265),n={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},r=l.createContext&&l.createContext(n),o=function(){return(o=Object.assign||function(e){for(var t,i=1,l=arguments.length;i<l;i++)for(var n in t=arguments[i])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},s=function(e,t){var i={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&0>t.indexOf(l)&&(i[l]=e[l]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var n=0,l=Object.getOwnPropertySymbols(e);n<l.length;n++)0>t.indexOf(l[n])&&Object.prototype.propertyIsEnumerable.call(e,l[n])&&(i[l[n]]=e[l[n]]);return i};function a(e){return function(t){return l.createElement(c,o({attr:o({},e.attr)},t),function e(t){return t&&t.map(function(t,i){return l.createElement(t.tag,o({key:i},t.attr),e(t.child))})}(e.child))}}function c(e){var t=function(t){var i,n=e.attr,r=e.size,a=e.title,c=s(e,["attr","size","title"]),u=r||t.size||"1em";return t.className&&(i=t.className),e.className&&(i=(i?i+" ":"")+e.className),l.createElement("svg",o({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,n,c,{className:i,style:o(o({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),a&&l.createElement("title",null,a),e.children)};return void 0!==r?l.createElement(r.Consumer,null,function(e){return t(e)}):t(n)}},96720:function(e,t,i){"use strict";i.d(t,{v:function(){return n}});var l=i(57437),n=({strokeWidth:e=1.5,...t})=>(0,l.jsx)("svg",{"aria-hidden":"true",fill:"none",focusable:"false",height:"1em",role:"presentation",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:e,viewBox:"0 0 24 24",width:"1em",...t,children:(0,l.jsx)("path",{d:"m6 9 6 6 6-6"})})},27901:function(e,t,i){"use strict";i.d(t,{e:function(){return l},x:function(){return n}});var l=e=>(null==e?void 0:e.length)<=4?e:null==e?void 0:e.slice(0,3),n=(...e)=>{let t=" ";for(let i of e)if("string"==typeof i&&i.length>0){t=i;break}return t}},90302:function(e,t,i){"use strict";i.d(t,{Z:function(){return r}});var l=i(62601),n={};function r(e,t,...i){var o;let s=t?` [${t}]`:" ",a=`[Next UI]${s}: ${e}`;if("undefined"!=typeof console&&!n[a]&&(n[a]=!0,(null==(o=null==l?void 0:l.env)?void 0:o.NODE_ENV)!=="production"))return console.warn(a,i)}},50732:function(e,t,i){"use strict";i.d(t,{Q:function(){return o}});var l=i(2265),n=i(21619),r=i(94625);function o(e,t,i){let{validationBehavior:o,focus:s}=e;(0,r.bt)(()=>{if("native"===o&&(null==i?void 0:i.current)){var e;let l,n=t.realtimeValidation.isInvalid?t.realtimeValidation.validationErrors.join(" ")||"Invalid value.":"";i.current.setCustomValidity(n),i.current.hasAttribute("title")||(i.current.title=""),t.realtimeValidation.isInvalid||t.updateValidation({isInvalid:!(e=i.current).validity.valid,validationDetails:{badInput:(l=e.validity).badInput,customError:l.customError,patternMismatch:l.patternMismatch,rangeOverflow:l.rangeOverflow,rangeUnderflow:l.rangeUnderflow,stepMismatch:l.stepMismatch,tooLong:l.tooLong,tooShort:l.tooShort,typeMismatch:l.typeMismatch,valueMissing:l.valueMissing,valid:l.valid},validationErrors:e.validationMessage?[e.validationMessage]:[]})}});let a=(0,r.iW)(()=>{t.resetValidation()}),c=(0,r.iW)(e=>{var l,r;t.displayValidation.isInvalid||t.commitValidation();let o=null==i?void 0:null===(l=i.current)||void 0===l?void 0:l.form;!e.defaultPrevented&&i&&o&&function(e){for(let t=0;t<e.elements.length;t++){let i=e.elements[t];if(!i.validity.valid)return i}return null}(o)===i.current&&(s?s():null===(r=i.current)||void 0===r||r.focus(),(0,n._w)("keyboard")),e.preventDefault()}),u=(0,r.iW)(()=>{t.commitValidation()});(0,l.useEffect)(()=>{let e=null==i?void 0:i.current;if(!e)return;let t=e.form;return e.addEventListener("invalid",c),e.addEventListener("change",u),null==t||t.addEventListener("reset",a),()=>{e.removeEventListener("invalid",c),e.removeEventListener("change",u),null==t||t.removeEventListener("reset",a)}},[i,c,u,a,o])}},13839:function(e,t,i){"use strict";i.d(t,{Cs:function(){return h},_t:function(){return v},dp:function(){return p},gq:function(){return f},ip:function(){return d}});var l=i(54887),n=i(2265),r=i(26565),o=i(94625),s=i(21619),a=i(93967);function c(e){return(0,o.ad)()?e.altKey:e.ctrlKey}function u(e){return(0,o.V5)()?e.metaKey:e.ctrlKey}function d(e){let{keyboardDelegate:t,selectionManager:i,onTypeSelect:l}=e,r=(0,n.useRef)({search:"",timeout:null}).current;return{typeSelectProps:{onKeyDownCapture:t.getKeyForSearch?e=>{var n;let o=1!==(n=e.key).length&&/^[A-Z]/i.test(n)?"":n;if(!o||e.ctrlKey||e.metaKey||!e.currentTarget.contains(e.target))return;" "!==o||!(r.search.trim().length>0)||(e.preventDefault(),"continuePropagation"in e||e.stopPropagation()),r.search+=o;let s=t.getKeyForSearch(r.search,i.focusedKey);null==s&&(s=t.getKeyForSearch(r.search)),null!=s&&(i.setFocusedKey(s),l&&l(s)),clearTimeout(r.timeout),r.timeout=setTimeout(()=>{r.search=""},1e3)}:null}}}function f(e){let t,{selectionManager:i,keyboardDelegate:f,ref:h,autoFocus:y=!1,shouldFocusWrap:g=!1,disallowEmptySelection:p=!1,disallowSelectAll:v=!1,selectOnFocus:K="replace"===i.selectionBehavior,disallowTypeAhead:m=!1,shouldUseVirtualFocus:S,allowsTabNavigation:b=!1,isVirtualized:w,scrollRef:k=h,linkBehavior:x="action"}=e,{direction:I}=(0,a.bU)(),E=(0,o.tv)(),C=(0,n.useRef)({top:0,left:0});(0,o.zX)(k,"scroll",w?null:()=>{C.current={top:k.current.scrollTop,left:k.current.scrollLeft}});let F=(0,n.useRef)(y);(0,n.useEffect)(()=>{if(F.current){let e=null;"first"===y&&(e=f.getFirstKey()),"last"===y&&(e=f.getLastKey());let t=i.selectedKeys;t.size&&(e=t.values().next().value),i.setFocused(!0),i.setFocusedKey(e),null!=e||S||(0,r.ex)(h.current)}F.current=!1},[]);let M=(0,n.useRef)(i.focusedKey);(0,n.useEffect)(()=>{let e=(0,s.Jz)();if(i.isFocused&&null!=i.focusedKey&&(null==k?void 0:k.current)){let t=k.current.querySelector(`[data-key="${i.focusedKey}"]`);t&&"keyboard"===e&&(w||(0,o.zT)(k.current,t),(0,o.Gt)(t,{containingElement:h.current}))}i.isFocused&&null==i.focusedKey&&null!=M.current&&(0,r.ex)(h.current),M.current=i.focusedKey},[w,k,i.focusedKey,i.isFocused,h]);let T={onKeyDown:e=>{var t,n,s,a,d,y,m,S;if(e.altKey&&"Tab"===e.key&&e.preventDefault(),!h.current.contains(e.target))return;let w=(t,n)=>{if(null!=t){if(i.isLink(t)&&"selection"===x&&K&&!c(e)){(0,l.flushSync)(()=>{i.setFocusedKey(t,n)});let r=k.current.querySelector(`[data-key="${t}"]`);E.open(r,e);return}i.setFocusedKey(t,n),i.isLink(t)&&"override"===x||(e.shiftKey&&"multiple"===i.selectionMode?i.extendSelection(t):K&&!c(e)&&i.replaceSelection(t))}};switch(e.key){case"ArrowDown":if(f.getKeyBelow){e.preventDefault();let l=null!=i.focusedKey?f.getKeyBelow(i.focusedKey):null===(t=f.getFirstKey)||void 0===t?void 0:t.call(f);null==l&&g&&(l=null===(n=f.getFirstKey)||void 0===n?void 0:n.call(f,i.focusedKey)),w(l)}break;case"ArrowUp":if(f.getKeyAbove){e.preventDefault();let t=null!=i.focusedKey?f.getKeyAbove(i.focusedKey):null===(s=f.getLastKey)||void 0===s?void 0:s.call(f);null==t&&g&&(t=null===(a=f.getLastKey)||void 0===a?void 0:a.call(f,i.focusedKey)),w(t)}break;case"ArrowLeft":if(f.getKeyLeftOf){e.preventDefault();let t=f.getKeyLeftOf(i.focusedKey);null==t&&g&&(t="rtl"===I?null===(d=f.getFirstKey)||void 0===d?void 0:d.call(f,i.focusedKey):null===(y=f.getLastKey)||void 0===y?void 0:y.call(f,i.focusedKey)),w(t,"rtl"===I?"first":"last")}break;case"ArrowRight":if(f.getKeyRightOf){e.preventDefault();let t=f.getKeyRightOf(i.focusedKey);null==t&&g&&(t="rtl"===I?null===(m=f.getLastKey)||void 0===m?void 0:m.call(f,i.focusedKey):null===(S=f.getFirstKey)||void 0===S?void 0:S.call(f,i.focusedKey)),w(t,"rtl"===I?"last":"first")}break;case"Home":if(f.getFirstKey){e.preventDefault();let t=f.getFirstKey(i.focusedKey,u(e));i.setFocusedKey(t),u(e)&&e.shiftKey&&"multiple"===i.selectionMode?i.extendSelection(t):K&&i.replaceSelection(t)}break;case"End":if(f.getLastKey){e.preventDefault();let t=f.getLastKey(i.focusedKey,u(e));i.setFocusedKey(t),u(e)&&e.shiftKey&&"multiple"===i.selectionMode?i.extendSelection(t):K&&i.replaceSelection(t)}break;case"PageDown":f.getKeyPageBelow&&(e.preventDefault(),w(f.getKeyPageBelow(i.focusedKey)));break;case"PageUp":f.getKeyPageAbove&&(e.preventDefault(),w(f.getKeyPageAbove(i.focusedKey)));break;case"a":u(e)&&"multiple"===i.selectionMode&&!0!==v&&(e.preventDefault(),i.selectAll());break;case"Escape":e.preventDefault(),p||i.clearSelection();break;case"Tab":if(!b){if(e.shiftKey)h.current.focus();else{let e,t,i=(0,r.QL)(h.current,{tabbable:!0});do(t=i.lastChild())&&(e=t);while(t);e&&!e.contains(document.activeElement)&&(0,o.Ao)(e)}}}},onFocus:e=>{if(i.isFocused){e.currentTarget.contains(e.target)||i.setFocused(!1);return}if(e.currentTarget.contains(e.target)){if(i.setFocused(!0),null==i.focusedKey){var t,l,n;let r=e.relatedTarget;null!=(n=r&&e.currentTarget.compareDocumentPosition(r)&Node.DOCUMENT_POSITION_FOLLOWING?null!==(t=i.lastSelectedKey)&&void 0!==t?t:f.getLastKey():null!==(l=i.firstSelectedKey)&&void 0!==l?l:f.getFirstKey())&&(i.setFocusedKey(n),K&&i.replaceSelection(n))}else w||(k.current.scrollTop=C.current.top,k.current.scrollLeft=C.current.left);if(!w&&null!=i.focusedKey){let e=k.current.querySelector(`[data-key="${i.focusedKey}"]`);e&&(e.contains(document.activeElement)||(0,o.Ao)(e),"keyboard"===(0,s.Jz)()&&(0,o.Gt)(e,{containingElement:h.current}))}}},onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||i.setFocused(!1)},onMouseDown(e){k.current===e.target&&e.preventDefault()}},{typeSelectProps:P}=d({keyboardDelegate:f,selectionManager:i});return m||(T=(0,o.dG)(P,T)),S||(t=null==i.focusedKey?0:-1),{collectionProps:{...T,tabIndex:t}}}function h(e){let{selectionManager:t,key:i,ref:l,shouldSelectOnPressUp:a,shouldUseVirtualFocus:d,focus:f,isDisabled:h,onAction:p,allowsDifferentPressOrigin:v,linkBehavior:K="action"}=e,m=(0,o.tv)(),S=e=>{if("keyboard"===e.pointerType&&c(e))t.toggleSelection(i);else{if("none"===t.selectionMode)return;if(t.isLink(i)){if("selection"===K){m.open(l.current,e),t.setSelectedKeys(t.selectedKeys);return}if("override"===K||"none"===K)return}"single"===t.selectionMode?t.isSelected(i)&&!t.disallowEmptySelection?t.toggleSelection(i):t.replaceSelection(i):e&&e.shiftKey?t.extendSelection(i):"toggle"===t.selectionBehavior||e&&(u(e)||"touch"===e.pointerType||"virtual"===e.pointerType)?t.toggleSelection(i):t.replaceSelection(i)}};(0,n.useEffect)(()=>{i===t.focusedKey&&t.isFocused&&!d&&(f?f():document.activeElement!==l.current&&(0,r.ex)(l.current))},[l,i,t.focusedKey,t.childFocusStrategy,t.isFocused,d]),h=h||t.isDisabled(i);let b={};d||h?h&&(b.onMouseDown=e=>{e.preventDefault()}):b={tabIndex:i===t.focusedKey?0:-1,onFocus(e){e.target===l.current&&t.setFocusedKey(i)}};let w=t.isLink(i)&&"override"===K,k=t.isLink(i)&&"selection"!==K&&"none"!==K,x=!h&&t.canSelectItem(i)&&!w,I=(p||k)&&!h,E=I&&("replace"===t.selectionBehavior?!x:!x||t.isEmpty),C=I&&x&&"replace"===t.selectionBehavior,F=E||C,M=(0,n.useRef)(null),T=F&&x,P=(0,n.useRef)(!1),D=(0,n.useRef)(!1),L=e=>{p&&p(),k&&m.open(l.current,e)},A={};a?(A.onPressStart=e=>{M.current=e.pointerType,P.current=T,"keyboard"===e.pointerType&&(!F||g())&&S(e)},v?(A.onPressUp=E?null:e=>{"keyboard"!==e.pointerType&&x&&S(e)},A.onPress=E?L:null):A.onPress=e=>{E||C&&"mouse"!==e.pointerType?("keyboard"!==e.pointerType||y())&&L(e):"keyboard"!==e.pointerType&&x&&S(e)}):(A.onPressStart=e=>{M.current=e.pointerType,P.current=T,D.current=E,x&&("mouse"===e.pointerType&&!E||"keyboard"===e.pointerType&&(!I||g()))&&S(e)},A.onPress=e=>{("touch"===e.pointerType||"pen"===e.pointerType||"virtual"===e.pointerType||"keyboard"===e.pointerType&&F&&y()||"mouse"===e.pointerType&&D.current)&&(F?L(e):x&&S(e))}),b["data-key"]=i,A.preventFocusOnPress=d;let{pressProps:B,isPressed:N}=(0,s.r7)(A),O=C?e=>{"mouse"===M.current&&(e.stopPropagation(),e.preventDefault(),L(e))}:void 0,{longPressProps:R}=(0,s.TA)({isDisabled:!T,onLongPress(e){"touch"===e.pointerType&&(S(e),t.setSelectionBehavior("toggle"))}}),V=t.isLink(i)?e=>{o.nG.isOpening||e.preventDefault()}:void 0;return{itemProps:(0,o.dG)(b,x||E?B:{},T?R:{},{onDoubleClick:O,onDragStartCapture:e=>{"touch"===M.current&&P.current&&e.preventDefault()},onClick:V}),isPressed:N,isSelected:t.isSelected(i),isFocused:t.isFocused&&t.focusedKey===i,isDisabled:h,allowsSelection:x,hasAction:F}}function y(){let e=window.event;return(null==e?void 0:e.key)==="Enter"}function g(){let e=window.event;return(null==e?void 0:e.key)===" "||(null==e?void 0:e.code)==="Space"}class p{getNextKey(e){for(e=this.collection.getKeyAfter(e);null!=e;){if("item"===this.collection.getItem(e).type&&!this.disabledKeys.has(e))return e;e=this.collection.getKeyAfter(e)}return null}getPreviousKey(e){for(e=this.collection.getKeyBefore(e);null!=e;){if("item"===this.collection.getItem(e).type&&!this.disabledKeys.has(e))return e;e=this.collection.getKeyBefore(e)}return null}findKey(e,t,i){let l=this.getItem(e);if(!l)return null;let n=l.getBoundingClientRect();do e=t(e),l=this.getItem(e);while(l&&i(n,l.getBoundingClientRect()));return e}isSameRow(e,t){return e.top===t.top||e.left!==t.left}isSameColumn(e,t){return e.left===t.left||e.top!==t.top}getKeyBelow(e){return"grid"===this.layout&&"vertical"===this.orientation?this.findKey(e,e=>this.getNextKey(e),this.isSameRow):this.getNextKey(e)}getKeyAbove(e){return"grid"===this.layout&&"vertical"===this.orientation?this.findKey(e,e=>this.getPreviousKey(e),this.isSameRow):this.getPreviousKey(e)}getNextColumn(e,t){return t?this.getPreviousKey(e):this.getNextKey(e)}getKeyRightOf(e){return"grid"===this.layout?"vertical"===this.orientation?this.getNextColumn(e,"rtl"===this.direction):this.findKey(e,e=>this.getNextColumn(e,"rtl"===this.direction),this.isSameColumn):"horizontal"===this.orientation?this.getNextColumn(e,"rtl"===this.direction):null}getKeyLeftOf(e){return"grid"===this.layout?"vertical"===this.orientation?this.getNextColumn(e,"ltr"===this.direction):this.findKey(e,e=>this.getNextColumn(e,"ltr"===this.direction),this.isSameColumn):"horizontal"===this.orientation?this.getNextColumn(e,"ltr"===this.direction):null}getFirstKey(){let e=this.collection.getFirstKey();for(;null!=e;){if("item"===this.collection.getItem(e).type&&!this.disabledKeys.has(e))return e;e=this.collection.getKeyAfter(e)}return null}getLastKey(){let e=this.collection.getLastKey();for(;null!=e;){if("item"===this.collection.getItem(e).type&&!this.disabledKeys.has(e))return e;e=this.collection.getKeyBefore(e)}return null}getItem(e){return this.ref.current.querySelector(`[data-key="${e}"]`)}getKeyPageAbove(e){let t=this.ref.current,i=this.getItem(e);if(!i)return null;if(!(0,o.a9)(t))return this.getFirstKey();let l=t.getBoundingClientRect(),n=i.getBoundingClientRect();if("horizontal"===this.orientation){let r=l.x-t.scrollLeft,o=Math.max(0,n.x-r+n.width-l.width);for(;i&&n.x-r>o;)n=null==(i=null==(e=this.getKeyAbove(e))?null:this.getItem(e))?void 0:i.getBoundingClientRect()}else{let r=l.y-t.scrollTop,o=Math.max(0,n.y-r+n.height-l.height);for(;i&&n.y-r>o;)n=null==(i=null==(e=this.getKeyAbove(e))?null:this.getItem(e))?void 0:i.getBoundingClientRect()}return null!=e?e:this.getFirstKey()}getKeyPageBelow(e){let t=this.ref.current,i=this.getItem(e);if(!i)return null;if(!(0,o.a9)(t))return this.getLastKey();let l=t.getBoundingClientRect(),n=i.getBoundingClientRect();if("horizontal"===this.orientation){let r=l.x-t.scrollLeft,o=Math.min(t.scrollWidth,n.x-r-n.width+l.width);for(;i&&n.x-r<o;)n=null==(i=null==(e=this.getKeyBelow(e))?null:this.getItem(e))?void 0:i.getBoundingClientRect()}else{let r=l.y-t.scrollTop,o=Math.min(t.scrollHeight,n.y-r-n.height+l.height);for(;i&&n.y-r<o;)n=null==(i=null==(e=this.getKeyBelow(e))?null:this.getItem(e))?void 0:i.getBoundingClientRect()}return null!=e?e:this.getLastKey()}getKeyForSearch(e,t){if(!this.collator)return null;let i=this.collection,l=t||this.getFirstKey();for(;null!=l;){let t=i.getItem(l),n=t.textValue.slice(0,e.length);if(t.textValue&&0===this.collator.compare(n,e))return l;l=this.getKeyBelow(l)}return null}constructor(...e){if(1===e.length){let t=e[0];this.collection=t.collection,this.ref=t.ref,this.collator=t.collator,this.disabledKeys=t.disabledKeys||new Set,this.orientation=t.orientation,this.direction=t.direction,this.layout=t.layout||"stack"}else this.collection=e[0],this.disabledKeys=e[1],this.ref=e[2],this.collator=e[3],this.layout="stack",this.orientation="vertical";"stack"===this.layout&&"vertical"===this.orientation&&(this.getKeyLeftOf=void 0,this.getKeyRightOf=void 0)}}function v(e){let{selectionManager:t,collection:i,disabledKeys:l,ref:r,keyboardDelegate:o}=e,s=(0,a.Xe)({usage:"search",sensitivity:"base"}),c=t.disabledBehavior,u=(0,n.useMemo)(()=>o||new p(i,"selection"===c?new Set:l,r,s),[o,i,l,r,s,c]),{collectionProps:d}=f({...e,ref:r,selectionManager:t,keyboardDelegate:u});return{listProps:d}}},92746:function(e,t,i){"use strict";i.d(t,{O:function(){return o}});var l=i(94625),n=i(26565),r=i(21619);function o(e,t,i){let{isDisabled:o=!1,isReadOnly:s=!1,value:a,name:c,children:u,"aria-label":d,"aria-labelledby":f,validationState:h="valid",isInvalid:y}=e;null!=u||null!=d||null!=f||console.warn("If you do not provide children, you must specify an aria-label for accessibility");let{pressProps:g,isPressed:p}=(0,r.r7)({isDisabled:o}),{focusableProps:v}=(0,n.kc)(e,i),K=(0,l.dG)(g,v),m=(0,l.zL)(e,{labelable:!0});return(0,l.y$)(i,t.isSelected,t.setSelected),{inputProps:(0,l.dG)(m,{"aria-invalid":y||"invalid"===h||void 0,"aria-errormessage":e["aria-errormessage"],"aria-controls":e["aria-controls"],"aria-readonly":s||void 0,onChange:e=>{e.stopPropagation(),t.setSelected(e.target.checked)},disabled:o,...null==a?{}:{value:a},name:c,type:"checkbox",...K}),isSelected:t.isSelected,isPressed:p,isDisabled:o,isReadOnly:s,isInvalid:y||"invalid"===h}}},464:function(e,t,i){"use strict";i.d(t,{Em:function(){return f},Kx:function(){return c},_P:function(){return u},ck:function(){return r},eg:function(){return y},is:function(){return v},l8:function(){return d},s:function(){return h}});var l=i(2265);function n(e){return null}n.getCollectionNode=function*(e,t){let{childItems:i,title:n,children:r}=e,o=e.title||e.children,s=e.textValue||("string"==typeof o?o:"")||e["aria-label"]||"";s||(null==t?void 0:t.suppressTextValueWarning)||console.warn("<Item> with non-plain text contents is unsupported by type to select for accessibility. Please add a `textValue` prop."),yield{type:"item",props:e,rendered:o,textValue:s,"aria-label":e["aria-label"],hasChildNodes:null!=e.hasChildItems?e.hasChildItems:!!(e.childItems||e.title&&l.Children.count(e.children)>0),*childNodes(){if(i)for(let e of i)yield{type:"item",value:e};else if(n){let e=[];l.Children.forEach(r,t=>{e.push({type:"item",element:t})}),yield*e}}}};let r=n;class o{build(e,t){return this.context=t,s(()=>this.iterateCollection(e))}*iterateCollection(e){let{children:t,items:i}=e;if("function"==typeof t){if(!i)throw Error("props.children was a function but props.items is missing");for(let i of e.items)yield*this.getFullNode({value:i},{renderer:t})}else{let e=[];l.Children.forEach(t,t=>{e.push(t)});let i=0;for(let t of e)for(let e of this.getFullNode({element:t,index:i},{}))i++,yield e}}getKey(e,t,i,l){if(null!=e.key)return e.key;if("cell"===t.type&&null!=t.key)return`${l}${t.key}`;let n=t.value;if(null!=n){var r;let e=null!==(r=n.key)&&void 0!==r?r:n.id;if(null==e)throw Error("No key found for item");return e}return l?`${l}.${t.index}`:`$.${t.index}`}getChildState(e,t){return{renderer:t.renderer||e.renderer}}*getFullNode(e,t,i,n){let r=e.element;if(!r&&e.value&&t&&t.renderer){let i=this.cache.get(e.value);if(i&&(!i.shouldInvalidate||!i.shouldInvalidate(this.context))){i.index=e.index,i.parentKey=n?n.key:null,yield i;return}r=t.renderer(e.value)}if(l.isValidElement(r)){let l=r.type;if("function"!=typeof l&&"function"!=typeof l.getCollectionNode){let e="function"==typeof r.type?r.type.name:r.type;throw Error(`Unknown element <${e}> in collection.`)}let o=l.getCollectionNode(r.props,this.context),s=e.index,c=o.next();for(;!c.done&&c.value;){let l=c.value;e.index=s;let u=l.key;u||(u=l.element?null:this.getKey(r,e,t,i));let d=[...this.getFullNode({...l,key:u,index:s,wrapper:function(e,t){return e&&t?i=>e(t(i)):e||t||void 0}(e.wrapper,l.wrapper)},this.getChildState(t,l),i?`${i}${r.key}`:r.key,n)];for(let t of d){if(t.value=l.value||e.value,t.value&&this.cache.set(t.value,t),e.type&&t.type!==e.type)throw Error(`Unsupported type <${a(t.type)}> in <${a(n.type)}>. Only <${a(e.type)}> is supported.`);s++,yield t}c=o.next(d)}return}if(null==e.key)return;let o=this,c={type:e.type,props:e.props,key:e.key,parentKey:n?n.key:null,value:e.value,level:n?n.level+1:0,index:e.index,rendered:e.rendered,textValue:e.textValue,"aria-label":e["aria-label"],wrapper:e.wrapper,shouldInvalidate:e.shouldInvalidate,hasChildNodes:e.hasChildNodes,childNodes:s(function*(){if(!e.hasChildNodes)return;let i=0;for(let l of e.childNodes())for(let e of(null!=l.key&&(l.key=`${c.key}${l.key}`),l.index=i,o.getFullNode(l,o.getChildState(t,l),c.key,c)))i++,yield e})};yield c}constructor(){this.cache=new WeakMap}}function s(e){let t=[],i=null;return{*[Symbol.iterator](){for(let e of t)yield e;for(let l of(i||(i=e()),i))t.push(l),yield l}}}function a(e){return e[0].toUpperCase()+e.slice(1)}function c(e,t,i){let n=(0,l.useMemo)(()=>new o,[]),{children:r,items:s,collection:a}=e;return(0,l.useMemo)(()=>a||t(n.build({children:r,items:s},i)),[n,r,s,a,i,t])}function u(e,t){return"function"==typeof t.getChildren?t.getChildren(e.key):e.childNodes}function d(e){return f(e,0)}function f(e,t){if(t<0)return;let i=0;for(let l of e){if(i===t)return l;i++}}function h(e){let t;for(let i of e)t=i;return t}function y(e,t,i){if(t.parentKey===i.parentKey)return t.index-i.index;let l=[...g(e,t),t],n=[...g(e,i),i],r=l.slice(0,n.length).findIndex((e,t)=>e!==n[t]);return -1!==r?(t=l[r],i=n[r],t.index-i.index):l.findIndex(e=>e===i)>=0?1:(n.findIndex(e=>e===t),-1)}function g(e,t){let i=[];for(;(null==t?void 0:t.parentKey)!=null;)i.unshift(t=e.getItem(t.parentKey));return i}let p=new WeakMap;function v(e){let t=p.get(e);if(null!=t)return t;t=0;let i=l=>{for(let n of l)"section"===n.type?i(u(n,e)):t++};return i(e),p.set(e,t),t}},34789:function(e,t,i){"use strict";i.d(t,{PS:function(){return o},Q3:function(){return c},tL:function(){return a}});var l=i(2265);let n={badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valueMissing:!1,valid:!0},r={...n,customError:!0,valid:!1},o={isInvalid:!1,validationDetails:n,validationErrors:[]},s=(0,l.createContext)({}),a="__formValidationState"+Date.now();function c(e){if(e[a]){let{realtimeValidation:t,displayValidation:i,updateValidation:l,resetValidation:n,commitValidation:r}=e[a];return{realtimeValidation:t,displayValidation:i,updateValidation:l,resetValidation:n,commitValidation:r}}return function(e){let{isInvalid:t,validationState:i,name:n,value:a,builtinValidation:c,validate:h,validationBehavior:y="aria"}=e;i&&(t||(t="invalid"===i));let g=t?{isInvalid:!0,validationErrors:[],validationDetails:r}:null,p=(0,l.useMemo)(()=>d(function(e,t){if("function"==typeof e){let i=e(t);if(i&&"boolean"!=typeof i)return u(i)}return[]}(h,a)),[h,a]);(null==c?void 0:c.validationDetails.valid)&&(c=null);let v=(0,l.useContext)(s),K=(0,l.useMemo)(()=>n?Array.isArray(n)?n.flatMap(e=>u(v[e])):u(v[n]):[],[v,n]),[m,S]=(0,l.useState)(v),[b,w]=(0,l.useState)(!1);v!==m&&(S(v),w(!1));let k=(0,l.useMemo)(()=>d(b?[]:K),[b,K]),x=(0,l.useRef)(o),[I,E]=(0,l.useState)(o),C=(0,l.useRef)(o),[F,M]=(0,l.useState)(!1);return(0,l.useEffect)(()=>{if(!F)return;M(!1);let e=p||c||x.current;f(e,C.current)||(C.current=e,E(e))}),{realtimeValidation:g||k||p||c||o,displayValidation:"native"===y?g||k||I:g||k||p||c||I,updateValidation(e){"aria"!==y||f(I,e)?x.current=e:E(e)},resetValidation(){f(o,C.current)||(C.current=o,E(o)),"native"===y&&M(!1),w(!0)},commitValidation(){"native"===y&&M(!0),w(!0)}}}(e)}function u(e){return e?Array.isArray(e)?e:[e]:[]}function d(e){return e.length?{isInvalid:!0,validationErrors:e,validationDetails:r}:null}function f(e,t){return e===t||e&&t&&e.isInvalid===t.isInvalid&&e.validationErrors.length===t.validationErrors.length&&e.validationErrors.every((e,i)=>e===t.validationErrors[i])&&Object.entries(e.validationDetails).every(([e,i])=>t.validationDetails[e]===i)}},41932:function(e,t,i){"use strict";i.d(t,{Z:function(){return c},q:function(){return s}});var l=i(14114),n=i(2265),r=i(464);class o extends Set{constructor(e,t,i){super(e),e instanceof o?(this.anchorKey=t||e.anchorKey,this.currentKey=i||e.currentKey):(this.anchorKey=t,this.currentKey=i)}}function s(e){let{selectionMode:t="none",disallowEmptySelection:i,allowDuplicateSelectionEvents:r,selectionBehavior:s="toggle",disabledBehavior:c="all"}=e,u=(0,n.useRef)(!1),[,d]=(0,n.useState)(!1),f=(0,n.useRef)(null),h=(0,n.useRef)(null),[,y]=(0,n.useState)(null),g=(0,n.useMemo)(()=>a(e.selectedKeys),[e.selectedKeys]),p=(0,n.useMemo)(()=>a(e.defaultSelectedKeys,new o),[e.defaultSelectedKeys]),[v,K]=(0,l.zk)(g,p,e.onSelectionChange),m=(0,n.useMemo)(()=>e.disabledKeys?new Set(e.disabledKeys):new Set,[e.disabledKeys]),[S,b]=(0,n.useState)(s);"replace"===s&&"toggle"===S&&"object"==typeof v&&0===v.size&&b("replace");let w=(0,n.useRef)(s);return(0,n.useEffect)(()=>{s!==w.current&&(b(s),w.current=s)},[s]),{selectionMode:t,disallowEmptySelection:i,selectionBehavior:S,setSelectionBehavior:b,get isFocused(){return u.current},setFocused(e){u.current=e,d(e)},get focusedKey(){return f.current},get childFocusStrategy(){return h.current},setFocusedKey(e,t="first"){f.current=e,h.current=t,y(e)},selectedKeys:v,setSelectedKeys(e){(r||!function(e,t){if(e.size!==t.size)return!1;for(let i of e)if(!t.has(i))return!1;return!0}(e,v))&&K(e)},disabledKeys:m,disabledBehavior:c}}function a(e,t){return e?"all"===e?"all":new o(e):t}class c{get selectionMode(){return this.state.selectionMode}get disallowEmptySelection(){return this.state.disallowEmptySelection}get selectionBehavior(){return this.state.selectionBehavior}setSelectionBehavior(e){this.state.setSelectionBehavior(e)}get isFocused(){return this.state.isFocused}setFocused(e){this.state.setFocused(e)}get focusedKey(){return this.state.focusedKey}get childFocusStrategy(){return this.state.childFocusStrategy}setFocusedKey(e,t){(null==e||this.collection.getItem(e))&&this.state.setFocusedKey(e,t)}get selectedKeys(){return"all"===this.state.selectedKeys?new Set(this.getSelectAllKeys()):this.state.selectedKeys}get rawSelection(){return this.state.selectedKeys}isSelected(e){return"none"!==this.state.selectionMode&&(e=this.getKey(e),"all"===this.state.selectedKeys?this.canSelectItem(e):this.state.selectedKeys.has(e))}get isEmpty(){return"all"!==this.state.selectedKeys&&0===this.state.selectedKeys.size}get isSelectAll(){if(this.isEmpty)return!1;if("all"===this.state.selectedKeys)return!0;if(null!=this._isSelectAll)return this._isSelectAll;let e=this.getSelectAllKeys(),t=this.state.selectedKeys;return this._isSelectAll=e.every(e=>t.has(e)),this._isSelectAll}get firstSelectedKey(){let e=null;for(let t of this.state.selectedKeys){let i=this.collection.getItem(t);(!e||i&&0>(0,r.eg)(this.collection,i,e))&&(e=i)}return null==e?void 0:e.key}get lastSelectedKey(){let e=null;for(let t of this.state.selectedKeys){let i=this.collection.getItem(t);(!e||i&&(0,r.eg)(this.collection,i,e)>0)&&(e=i)}return null==e?void 0:e.key}get disabledKeys(){return this.state.disabledKeys}get disabledBehavior(){return this.state.disabledBehavior}extendSelection(e){let t;if("none"!==this.selectionMode){if("single"===this.selectionMode){this.replaceSelection(e);return}if(e=this.getKey(e),"all"===this.state.selectedKeys)t=new o([e],e,e);else{let i=this.state.selectedKeys,l=i.anchorKey||e;for(let n of(t=new o(i,l,e),this.getKeyRange(l,i.currentKey||e)))t.delete(n);for(let i of this.getKeyRange(e,l))this.canSelectItem(i)&&t.add(i)}this.state.setSelectedKeys(t)}}getKeyRange(e,t){let i=this.collection.getItem(e),l=this.collection.getItem(t);return i&&l?0>=(0,r.eg)(this.collection,i,l)?this.getKeyRangeInternal(e,t):this.getKeyRangeInternal(t,e):[]}getKeyRangeInternal(e,t){let i=[],l=e;for(;l;){let e=this.collection.getItem(l);if((e&&"item"===e.type||"cell"===e.type&&this.allowsCellSelection)&&i.push(l),l===t)return i;l=this.collection.getKeyAfter(l)}return[]}getKey(e){let t=this.collection.getItem(e);if(!t||"cell"===t.type&&this.allowsCellSelection)return e;for(;"item"!==t.type&&null!=t.parentKey;)t=this.collection.getItem(t.parentKey);return t&&"item"===t.type?t.key:null}toggleSelection(e){if("none"===this.selectionMode)return;if("single"===this.selectionMode&&!this.isSelected(e)){this.replaceSelection(e);return}if(null==(e=this.getKey(e)))return;let t=new o("all"===this.state.selectedKeys?this.getSelectAllKeys():this.state.selectedKeys);t.has(e)?t.delete(e):this.canSelectItem(e)&&(t.add(e),t.anchorKey=e,t.currentKey=e),this.disallowEmptySelection&&0===t.size||this.state.setSelectedKeys(t)}replaceSelection(e){if("none"===this.selectionMode||null==(e=this.getKey(e)))return;let t=this.canSelectItem(e)?new o([e],e,e):new o;this.state.setSelectedKeys(t)}setSelectedKeys(e){if("none"===this.selectionMode)return;let t=new o;for(let i of e)if(null!=(i=this.getKey(i))&&(t.add(i),"single"===this.selectionMode))break;this.state.setSelectedKeys(t)}getSelectAllKeys(){let e=[],t=i=>{for(;i;){if(this.canSelectItem(i)){let l=this.collection.getItem(i);"item"===l.type&&e.push(i),l.hasChildNodes&&(this.allowsCellSelection||"item"!==l.type)&&t((0,r.l8)((0,r._P)(l,this.collection)).key)}i=this.collection.getKeyAfter(i)}};return t(this.collection.getFirstKey()),e}selectAll(){this.isSelectAll||"multiple"!==this.selectionMode||this.state.setSelectedKeys("all")}clearSelection(){!this.disallowEmptySelection&&("all"===this.state.selectedKeys||this.state.selectedKeys.size>0)&&this.state.setSelectedKeys(new o)}toggleSelectAll(){this.isSelectAll?this.clearSelection():this.selectAll()}select(e,t){"none"!==this.selectionMode&&("single"===this.selectionMode?this.isSelected(e)&&!this.disallowEmptySelection?this.toggleSelection(e):this.replaceSelection(e):"toggle"===this.selectionBehavior||t&&("touch"===t.pointerType||"virtual"===t.pointerType)?this.toggleSelection(e):this.replaceSelection(e))}isSelectionEqual(e){if(e===this.state.selectedKeys)return!0;let t=this.selectedKeys;if(e.size!==t.size)return!1;for(let i of e)if(!t.has(i))return!1;for(let i of t)if(!e.has(i))return!1;return!0}canSelectItem(e){if("none"===this.state.selectionMode||this.state.disabledKeys.has(e))return!1;let t=this.collection.getItem(e);return!!t&&("cell"!==t.type||!!this.allowsCellSelection)}isDisabled(e){return this.state.disabledKeys.has(e)&&"all"===this.state.disabledBehavior}isLink(e){var t,i;return!!(null===(i=this.collection.getItem(e))||void 0===i?void 0:null===(t=i.props)||void 0===t?void 0:t.href)}constructor(e,t,i){var l;this.collection=e,this.state=t,this.allowsCellSelection=null!==(l=null==i?void 0:i.allowsCellSelection)&&void 0!==l&&l,this._isSelectAll=null}}},47291:function(e,t,i){"use strict";i.d(t,{l:function(){return n}});var l=i(14114);function n(e={}){let{isReadOnly:t}=e,[i,n]=(0,l.zk)(e.isSelected,e.defaultSelected||!1,e.onChange);return{isSelected:i,setSelected:function(e){t||n(e)},toggle:function(){t||n(!i)}}}}}]);