var O=Object.defineProperty;var T=(e,t,n)=>t in e?O(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var w=(e,t,n)=>T(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();const F=()=>{const e=new Set;return{subscribe:r=>e.add(r),notify:()=>e.forEach(r=>r())}},B=(e,t)=>{const{subscribe:n,notify:r}=F();let o={...e};const a=u=>{o={...o,...u},r()},l=()=>({...o}),i=Object.fromEntries(Object.entries(t).map(([u,x])=>[u,(...M)=>a(x(l(),...M))]));return{getState:l,setState:a,subscribe:n,actions:i}},H=(e,t=window.localStorage)=>({get:()=>JSON.parse(t.getItem(e)),set:a=>t.setItem(e,JSON.stringify(a)),reset:()=>t.removeItem(e)});function s(e,t,...n){return{type:e,props:t,children:n.flat(1/0).filter(r=>r===0||!!r)}}const f=new WeakMap,L=new Set;function $(e){L.forEach(t=>{e.addEventListener(t,q)})}function q(e){let t=e.target;for(;t;){const n=f.get(t);if(n&&n.has(e.type)){n.get(e.type).call(t,e);break}t=t.parentElement}}function P(e,t,n){f.has(e)||f.set(e,new Map),f.get(e).set(t,n),L.add(t)}function v(e,t){if(!f.has(e))return;const n=f.get(e);n.delete(t),n.size===0&&f.delete(e)}function p(e){if(e===null||typeof e>"u"||typeof e=="boolean")return"";if(typeof e=="string"||typeof e=="number")return String(e);if(Array.isArray(e))return e.flat().map(p).filter(t=>t!=null&&t!=="");if(typeof e.type=="function"){const t=e.type({...e.props,children:e.children});return p(t)}return{type:e.type,props:e.props||null,children:Array.isArray(e.children)?e.children.map(p).filter(t=>t!==""):e.children}}function m(e){if(typeof e=="boolean"||typeof e>"u"||e===null)return document.createTextNode("");if(typeof e=="string"||typeof e=="number")return document.createTextNode(e);if(Array.isArray(e)){const o=document.createDocumentFragment();return o.append(...e.map(m)),o}if(typeof e.type=="function")throw new Error("createElement()에 컴포넌트를 직접 전달할 수 없습니다.");const t=p(e),n=document.createElement(t.type);return W(n,t.props),t.children.map(m).forEach(o=>n.appendChild(o)),n}function W(e,t){t&&Object.entries(t).forEach(([n,r])=>{if(!(r==null||r===!1))if(n.toLowerCase()==="classname")e.setAttribute("class",r);else if(n.startsWith("on")){if(typeof r=="function"){const o=n.slice(2).toLowerCase();P(e,o,r)}}else e.setAttribute(n,r)})}function G(e,t,n){for(const[r,o]of Object.entries(t))if(n[r]!==o)if(r.startsWith("on")){const a=r.slice(2).toLowerCase();v(e,a,n[r]),P(e,a,o)}else e.setAttribute(r.toLowerCase()==="classname"?"class":r,o);for(const r of Object.keys(n))if(!(r in t))if(r.startsWith("on")){const o=r.slice(2).toLowerCase();v(e,o,n[r])}else e.removeAttribute(r.toLowerCase()==="classname"?"class":r)}function I(e,t,n,r=0){var a,l;if(!t&&n)return e.removeChild(e.childNodes[r]);if(t&&!n)return e.appendChild(m(t));if(typeof t=="string"&&typeof n=="string"){t!==n&&e.replaceChild(m(t),e.childNodes[r]);return}if(t.type!==n.type)return e.replaceChild(m(t),e.childNodes[r]);if(!e.childNodes[r])return;G(e.childNodes[r],t.props||{},n.props||{});const o=Math.max(t.children.length,n.children.length);for(let i=0;i<o;i++)I(e.childNodes[r],(a=t.children)==null?void 0:a[i],(l=n.children)==null?void 0:l[i],i)}function V(e,t){if(!e){t.innerHTML="";return}e=p(e);const n=t.vNode;n?I(t,e,n):t.appendChild(m(e)),t.vNode=e,$(t)}const z=1e3,E=z*60,A=E*60,J=A*24,K=e=>{const t=Date.now()-e;return t<E?"방금 전":t<A?`${Math.floor(t/E)}분 전`:t<J?`${Math.floor(t/A)}시간 전`:new Date(e).toLocaleString()},g=H("user"),Y=1e3,d=Y*60,Q=d*60,c=B({currentUser:g.get(),loggedIn:!!g.get(),posts:[{id:1,author:"홍길동",time:Date.now()-5*d,content:"오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",likeUsers:[]},{id:2,author:"김철수",time:Date.now()-15*d,content:"새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",likeUsers:[]},{id:3,author:"이영희",time:Date.now()-30*d,content:"오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",likeUsers:[]},{id:4,author:"박민수",time:Date.now()-30*d,content:"주말에 등산 가실 분 계신가요? 함께 가요!",likeUsers:[]},{id:5,author:"정수연",time:Date.now()-2*Q,content:"새로 나온 영화 재미있대요. 같이 보러 갈 사람?",likeUsers:[]}],error:null},{logout(e){return g.reset(),{...e,currentUser:null,loggedIn:!1}},addPost(e,t){var r;const n={id:e.posts.length+1,author:(r=e.currentUser)==null?void 0:r.username,time:Date.now(),content:t,likeUsers:[]};return{...e,posts:[...e.posts,n]}},likeUser(e,t){var l;const n=e.posts.findIndex(i=>i.id===t);if(n===-1)return e;const r=[...e.posts],o={...r[n]},a=(l=e.currentUser)==null?void 0:l.username;return a?(o.likeUsers.includes(a)?o.likeUsers=o.likeUsers.filter(i=>i!==a):o.likeUsers=[...o.likeUsers,a],r[n]=o,{...e,posts:r}):e}}),R=({id:e,author:t,time:n,content:r,likeUsers:o,activationLike:a=!1})=>{const{loggedIn:l}=c.getState(),{likeUser:i}=c.actions,u=x=>{x.preventDefault(),l?i(e):alert("로그인 후 이용해주세요")};return s("div",{className:"bg-white rounded-lg shadow p-4 mb-4"},s("div",{className:"flex items-center mb-2"},s("div",null,s("div",{className:"font-bold"},t),s("div",{className:"text-gray-500 text-sm"},K(n)))),s("p",null,r),s("div",{className:"mt-2 flex justify-between text-gray-500"},s("span",{className:`like-button cursor-pointer${a?" text-blue-500":""}`,onClick:u},"좋아요 ",o.length),s("span",null,"댓글"),s("span",null,"공유")))},X=()=>{const{loggedIn:e}=c.getState(),{addPost:t}=c.actions;return s("div",{className:"mb-4 bg-white rounded-lg shadow p-4"},s("textarea",{id:"post-content",placeholder:"무슨 생각을 하고 계신가요?",className:"w-full p-2 border rounded"}),s("button",{id:"post-submit",className:"mt-2 bg-blue-600 text-white px-4 py-2 rounded",onClick:()=>{const r=document.getElementById("post-content").value;e?t(r):alert("로그인 후 이용해주세요")}},"게시"))},D=()=>s("header",{className:"bg-blue-600 text-white p-4 sticky top-0"},s("h1",{className:"text-2xl font-bold"},"항해플러스")),C=()=>s("footer",{className:"bg-gray-200 p-4 text-center"},s("p",null,"© $",new Date().getFullYear()," 항해플러스. All rights reserved.")),b={value:null,get(){return this.value},set(e){this.value=e}},S=e=>{const t=window.location.hash?window.location.hash.slice(1)||"/":window.location.pathname;return BASE_PATH!=="/"&&t.startsWith(BASE_PATH)&&(t=t.slice(BASE_PATH.length-1)||"/"),t===e?"text-blue-600 font-bold":"text-gray-600"};function N({onClick:e,children:t,...n}){return s("a",{onClick:o=>{o.preventDefault(),e==null||e(),b.get().push(o.target.href.replace(window.location.origin,""))},...n},t)}const j=()=>{const{loggedIn:e}=c.getState(),{logout:t}=c.actions;return s("nav",{className:"bg-white shadow-md p-2 sticky top-14"},s("ul",{className:"flex justify-around"},s("li",null,s(N,{href:"/",className:S("/")},"홈")),!e&&s("li",null,s(N,{href:"/login",className:S("/login")},"로그인")),e&&s("li",null,s(N,{href:"/profile",className:S("/profile")},"프로필")),e&&s("li",null,s("a",{href:"#",id:"logout",className:"text-gray-600",onClick:n=>{n.preventDefault(),t()}},"로그아웃"))))},se=()=>{const{posts:e,loggedIn:t,currentUser:n}=c.getState();return s("div",{className:"bg-gray-100 min-h-screen flex justify-center"},s("div",{className:"max-w-md w-full"},s(D,null),s(j,null),s("main",{className:"p-4"},t&&s(X,null),s("div",{id:"posts-container",className:"space-y-4"},[...e].sort((r,o)=>o.time-r.time).map(r=>{const o=n&&r.likeUsers.includes(n==null?void 0:n.username);return s(R,{...r,activationLike:o})}))),s(C,null)))};function Z(e){const t={username:e,email:"",bio:""};c.setState({currentUser:t,loggedIn:!0}),g.set(t)}const ne=()=>s("div",{className:"bg-gray-100 flex items-center justify-center min-h-screen"},s("div",{className:"bg-white p-8 rounded-lg shadow-md w-full max-w-md"},s("h1",{className:"text-2xl font-bold text-center text-blue-600 mb-8"},"항해플러스"),s("form",{id:"login-form",onSubmit:t=>{t.preventDefault();const n=document.getElementById("username").value;Z(n)}},s("input",{type:"text",id:"username",placeholder:"사용자 이름",className:"w-full p-2 mb-4 border rounded",required:!0}),s("input",{type:"password",placeholder:"비밀번호",className:"w-full p-2 mb-6 border rounded",required:!0}),s("button",{type:"submit",className:"w-full bg-blue-600 text-white p-2 rounded"},"로그인")),s("div",{className:"mt-4 text-center"},s("a",{href:"#",className:"text-blue-600 text-sm"},"비밀번호를 잊으셨나요?")),s("hr",{className:"my-6"}),s("div",{className:"text-center"},s("button",{className:"bg-green-500 text-white px-4 py-2 rounded"},"새 계정 만들기")))),_=()=>s("main",{className:"bg-gray-100 flex items-center justify-center min-h-screen"},s("div",{className:"bg-white p-8 rounded-lg shadow-md w-full text-center",style:"max-width: 480px"},s("h1",{className:"text-2xl font-bold text-blue-600 mb-4"},"항해플러스"),s("p",{className:"text-4xl font-bold text-gray-800 mb-4"},"404"),s("p",{className:"text-xl text-gray-600 mb-8"},"페이지를 찾을 수 없습니다"),s("p",{className:"text-gray-600 mb-8"},"요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다."),s("a",{href:"/","data-link":"",className:"bg-blue-600 text-white px-4 py-2 rounded font-bold"},"홈으로 돌아가기")));function ee(e){const t={...c.getState().currentUser,...e};c.setState({currentUser:t}),g.set(t),alert("프로필이 업데이트되었습니다.")}const re=()=>{const{loggedIn:e,currentUser:t}=c.getState(),{username:n="",email:r="",bio:o=""}=t??{};return s("div",{className:"bg-gray-100 min-h-screen flex justify-center"},s("div",{className:"max-w-md w-full"},s(D,null),s(j,{loggedIn:e}),s("main",{className:"p-4"},s("div",{className:"bg-white p-8 rounded-lg shadow-md"},s("h2",{className:"text-2xl font-bold text-center text-blue-600 mb-8"},"내 프로필"),s("form",{id:"profile-form",onSubmit:l=>{l.preventDefault();const i=new FormData(l.target),u=Object.fromEntries(i);ee(u)}},s("div",{className:"mb-4"},s("label",{for:"username",className:"block text-gray-700 text-sm font-bold mb-2"},"사용자 이름"),s("input",{type:"text",id:"username",name:"username",className:"w-full p-2 border rounded",value:n,required:!0})),s("div",{className:"mb-4"},s("label",{for:"email",className:"block text-gray-700 text-sm font-bold mb-2"},"이메일"),s("input",{type:"email",id:"email",name:"email",className:"w-full p-2 border rounded",value:r,required:!0})),s("div",{className:"mb-6"},s("label",{for:"bio",className:"block text-gray-700 text-sm font-bold mb-2"},"자기소개"),s("textarea",{id:"bio",name:"bio",rows:"4",className:"w-full p-2 border rounded"},o)),s("button",{type:"submit",className:"w-full bg-blue-600 text-white p-2 rounded font-bold"},"프로필 업데이트")))),s(C,null)))},h=class h extends Error{constructor(){super(h.MESSAGE)}};w(h,"MESSAGE","ForbiddenError");let U=h;const y=class y extends Error{constructor(){super(y.MESSAGE)}};w(y,"MESSAGE","UnauthorizedError");let k=y;function oe(){const e=b.get().getTarget()??_,t=document.querySelector("#root");try{V(s(e,null),t)}catch(n){if(n instanceof U){b.get().push("/");return}if(n instanceof k){b.get().push("/login");return}console.error(n)}}export{U as F,se as H,ne as L,re as P,k as U,oe as a,s as b,F as c,c as g,b as r};
