/*! For license information please see bonfire.js.LICENSE.txt */
(()=>{var e,t={526:(e,t,n)=>{"use strict";var r=n(865),o=n.n(r);function i(e,t){if(["link","go"].includes(e))if(t){const e=document.querySelector(t);e?e.scrollIntoView({behavior:"smooth",block:"start"}):window.scrollTo({top:0})}else window.scrollTo({top:0})}function s(e){const t=new URL(e||window.location.href).href;return t.endsWith("/")||t.includes(".")||t.includes("#")?t:`${t}/`}function a(e){var t;let n;if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)return{type:"disqualified"};for(let t=e.target;t.parentNode;t=t.parentNode)if("A"===t.nodeName){n=t;break}if(n&&n.host!==location.host)return n.target="_blank",{type:"external"};if(n&&"cold"in(null==n?void 0:n.dataset))return{type:"disqualified"};if(null!=n&&n.hasAttribute("href")){const r=n.getAttribute("href"),o=new URL(r,location.href);if(e.preventDefault(),null!=r&&r.startsWith("#"))return function(e){document.querySelector(e).scrollIntoView({behavior:"smooth",block:"start"})}(r),{type:"scrolled"};const i=null==(t=r.match(/#([\w'-]+)\b/g))?void 0:t[0];return{type:"link",next:s(o.href),prev:s(),scrollId:i}}return{type:"noop"}}function c(e){document.body.querySelectorAll("[flamethrower-preserve]").forEach((t=>{let n=e.body.querySelector('[flamethrower-preserve][id="'+t.id+'"]');if(n){const e=t.cloneNode(!0);n.replaceWith(e)}})),document.body.replaceWith(e.body)}function l(){document.head.querySelectorAll("[data-reload]").forEach(u),document.body.querySelectorAll("script").forEach(u)}function u(e){const t=document.createElement("script"),n=Array.from(e.attributes);for(const{name:e,value:r}of n)t[e]=r;t.append(e.textContent),e.replaceWith(t)}const d={log:!1,pageTransitions:!1};class f{constructor(e){this.opts=e,this.enabled=!0,this.prefetched=new Set,this.opts={...d,...null!=e?e:{}},null!=window&&window.history?(document.addEventListener("click",(e=>this.onClick(e))),window.addEventListener("popstate",(e=>this.onPop(e))),this.prefetch()):(console.warn("flamethrower router not supported in this browser or environment"),this.enabled=!1)}go(e){const t=window.location.href,n=new URL(e,location.origin).href;return this.reconstructDOM({type:"go",next:n,prev:t})}back(){window.history.back()}forward(){window.history.forward()}get allLinks(){return Array.from(document.links).filter((e=>e.href.includes(document.location.origin)&&!e.href.includes("#")&&e.href!==(document.location.href||document.location.href+"/")&&!this.prefetched.has(e.href)))}log(...e){this.opts.log&&console.log(...e)}prefetch(){if("visible"===this.opts.prefetch)this.prefetchVisible();else{if("hover"!==this.opts.prefetch)return;this.prefetchOnHover()}}prefetchOnHover(){this.allLinks.forEach((e=>{const t=e.getAttribute("href");e.addEventListener("pointerenter",(()=>this.createLink(t)),{once:!0})}))}prefetchVisible(){"IntersectionObserver"in window&&(this.observer||(this.observer=new IntersectionObserver(((e,t)=>{e.forEach((e=>{const n=e.target.getAttribute("href");this.prefetched.has(n)?t.unobserve(e.target):e.isIntersecting&&(this.createLink(n),t.unobserve(e.target))}))}),{root:null,rootMargin:"0px",threshold:1})),this.allLinks.forEach((e=>this.observer.observe(e))))}createLink(e){const t=document.createElement("link");t.rel="prefetch",t.href=e,t.as="document",t.onload=()=>this.log("🌩️ prefetched",e),t.onerror=t=>this.log("🤕 can't prefetch",e,t),document.head.appendChild(t),this.prefetched.add(e)}onClick(e){this.reconstructDOM(a(e))}onPop(e){this.reconstructDOM({type:"popstate",next:s()})}async reconstructDOM({type:e,next:t,prev:n,scrollId:r}){var o;if(this.enabled)try{if(this.log("⚡",e),["popstate","link","go"].includes(e)&&t!==n){this.opts.log&&console.time("⏱️"),window.dispatchEvent(new CustomEvent("flamethrower:router:fetch")),"popstate"!=e&&(o=t,(!window.history.state||window.history.state.url!==o)&&window.history.pushState({url:o},"internalLink",o));const n=function(e){return(new DOMParser).parseFromString(e,"text/html")}(await(await fetch(t,{headers:{"X-Flamethrower":"1"}}).then((e=>{const t=e.body.getReader(),n=parseInt(e.headers.get("Content-Length"));let r=0;return new ReadableStream({start(e){!function o(){t.read().then((({done:t,value:i})=>{t?e.close():(r+=i.length,window.dispatchEvent(new CustomEvent("flamethrower:router:fetch-progress",{detail:{progress:Number.isNaN(n)?0:r/n*100,received:r,length:n||0}})),e.enqueue(i),o())}))}()}})})).then((e=>new Response(e,{headers:{"Content-Type":"text/html"}})))).text());(function(e){const t=e=>Array.from(e.querySelectorAll('head>:not([rel="prefetch"]')),n=t(document),r=t(e),{staleNodes:o,freshNodes:i}=function(e,t){const n=[],r=[];let o=0,i=0;for(;o<e.length||i<t.length;){const s=e[o],a=t[i];if(null!=s&&s.isEqualNode(a)){o++,i++;continue}const c=s?r.findIndex((e=>e.isEqualNode(s))):-1;if(-1!==c){r.splice(c,1),o++;continue}const l=a?n.findIndex((e=>e.isEqualNode(a))):-1;-1===l?(s&&n.push(s),a&&r.push(a),o++,i++):(n.splice(l,1),i++)}return{staleNodes:n,freshNodes:r}}(n,r);o.forEach((e=>e.remove())),document.head.append(...i)})(n),this.opts.pageTransitions&&document.createDocumentTransition?document.createDocumentTransition().start((()=>{c(n),l(),i(e,r)})):(c(n),l(),i(e,r)),window.dispatchEvent(new CustomEvent("flamethrower:router:end")),setTimeout((()=>{this.prefetch()}),200),this.opts.log&&console.timeEnd("⏱️")}}catch(e){return window.dispatchEvent(new CustomEvent("flamethrower:router:error",e)),this.opts.log&&console.timeEnd("⏱️"),console.error("💥 router fetch failed",e),!1}else this.log("router disabled")}}document.addEventListener("DOMContentLoaded",(function(){var e=(e=>{const t=new f(e);e.log&&console.log("🔥 flamethrower engaged"),window&&(window.flamethrower=t);return t})({log:!1,pageTransitions:!1});window.flamethrower_router=e})),o().configure({showSpinner:!1}),window.addEventListener("flamethrower:router:fetch",(function(){o().start()})),window.addEventListener("flamethrower:router:end",(function(){o().done()}))},234:()=>{},865:function(e,t,n){var r,o;r=function(){var e,t,n={version:"0.2.0"},r=n.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};function o(e,t,n){return e<t?t:e>n?n:e}function i(e){return 100*(-1+e)}function s(e,t,n){var o;return(o="translate3d"===r.positionUsing?{transform:"translate3d("+i(e)+"%,0,0)"}:"translate"===r.positionUsing?{transform:"translate("+i(e)+"%,0)"}:{"margin-left":i(e)+"%"}).transition="all "+t+"ms "+n,o}n.configure=function(e){var t,n;for(t in e)void 0!==(n=e[t])&&e.hasOwnProperty(t)&&(r[t]=n);return this},n.status=null,n.set=function(e){var t=n.isStarted();e=o(e,r.minimum,1),n.status=1===e?null:e;var i=n.render(!t),l=i.querySelector(r.barSelector),u=r.speed,d=r.easing;return i.offsetWidth,a((function(t){""===r.positionUsing&&(r.positionUsing=n.getPositioningCSS()),c(l,s(e,u,d)),1===e?(c(i,{transition:"none",opacity:1}),i.offsetWidth,setTimeout((function(){c(i,{transition:"all "+u+"ms linear",opacity:0}),setTimeout((function(){n.remove(),t()}),u)}),u)):setTimeout(t,u)})),this},n.isStarted=function(){return"number"==typeof n.status},n.start=function(){n.status||n.set(0);var e=function(){setTimeout((function(){n.status&&(n.trickle(),e())}),r.trickleSpeed)};return r.trickle&&e(),this},n.done=function(e){return e||n.status?n.inc(.3+.5*Math.random()).set(1):this},n.inc=function(e){var t=n.status;return t?("number"!=typeof e&&(e=(1-t)*o(Math.random()*t,.1,.95)),t=o(t+e,0,.994),n.set(t)):n.start()},n.trickle=function(){return n.inc(Math.random()*r.trickleRate)},e=0,t=0,n.promise=function(r){return r&&"resolved"!==r.state()?(0===t&&n.start(),e++,t++,r.always((function(){0==--t?(e=0,n.done()):n.set((e-t)/e)})),this):this},n.render=function(e){if(n.isRendered())return document.getElementById("nprogress");u(document.documentElement,"nprogress-busy");var t=document.createElement("div");t.id="nprogress",t.innerHTML=r.template;var o,s=t.querySelector(r.barSelector),a=e?"-100":i(n.status||0),l=document.querySelector(r.parent);return c(s,{transition:"all 0 linear",transform:"translate3d("+a+"%,0,0)"}),r.showSpinner||(o=t.querySelector(r.spinnerSelector))&&h(o),l!=document.body&&u(l,"nprogress-custom-parent"),l.appendChild(t),t},n.remove=function(){d(document.documentElement,"nprogress-busy"),d(document.querySelector(r.parent),"nprogress-custom-parent");var e=document.getElementById("nprogress");e&&h(e)},n.isRendered=function(){return!!document.getElementById("nprogress")},n.getPositioningCSS=function(){var e=document.body.style,t="WebkitTransform"in e?"Webkit":"MozTransform"in e?"Moz":"msTransform"in e?"ms":"OTransform"in e?"O":"";return t+"Perspective"in e?"translate3d":t+"Transform"in e?"translate":"margin"};var a=function(){var e=[];function t(){var n=e.shift();n&&n(t)}return function(n){e.push(n),1==e.length&&t()}}(),c=function(){var e=["Webkit","O","Moz","ms"],t={};function n(e){return e.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,(function(e,t){return t.toUpperCase()}))}function r(t){var n=document.body.style;if(t in n)return t;for(var r,o=e.length,i=t.charAt(0).toUpperCase()+t.slice(1);o--;)if((r=e[o]+i)in n)return r;return t}function o(e){return e=n(e),t[e]||(t[e]=r(e))}function i(e,t,n){t=o(t),e.style[t]=n}return function(e,t){var n,r,o=arguments;if(2==o.length)for(n in t)void 0!==(r=t[n])&&t.hasOwnProperty(n)&&i(e,n,r);else i(e,o[1],o[2])}}();function l(e,t){return("string"==typeof e?e:f(e)).indexOf(" "+t+" ")>=0}function u(e,t){var n=f(e),r=n+t;l(n,t)||(e.className=r.substring(1))}function d(e,t){var n,r=f(e);l(e,t)&&(n=r.replace(" "+t+" "," "),e.className=n.substring(1,n.length-1))}function f(e){return(" "+(e.className||"")+" ").replace(/\s+/gi," ")}function h(e){e&&e.parentNode&&e.parentNode.removeChild(e)}return n},void 0===(o="function"==typeof r?r.call(t,n,t,e):r)||(e.exports=o)}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}};return t[e].call(i.exports,i,i.exports,r),i.exports}r.m=t,e=[],r.O=(t,n,o,i)=>{if(!n){var s=1/0;for(u=0;u<e.length;u++){for(var[n,o,i]=e[u],a=!0,c=0;c<n.length;c++)(!1&i||s>=i)&&Object.keys(r.O).every((e=>r.O[e](n[c])))?n.splice(c--,1):(a=!1,i<s&&(s=i));if(a){e.splice(u--,1);var l=o();void 0!==l&&(t=l)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[n,o,i]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={658:0,851:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var o,i,[s,a,c]=n,l=0;if(s.some((t=>0!==e[t]))){for(o in a)r.o(a,o)&&(r.m[o]=a[o]);if(c)var u=c(r)}for(t&&t(n);l<s.length;l++)i=s[l],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(u)},n=self.webpackChunkbonfire=self.webpackChunkbonfire||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),r.O(void 0,[851],(()=>r(526)));var o=r.O(void 0,[851],(()=>r(234)));o=r.O(o)})();