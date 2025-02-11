(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))s(c);new MutationObserver(c=>{for(const a of c)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(c){const a={};return c.integrity&&(a.integrity=c.integrity),c.referrerPolicy&&(a.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?a.credentials="include":c.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(c){if(c.ep)return;c.ep=!0;const a=n(c);fetch(c.href,a)}})();const $=o=>[...Array(1<<o).keys()].map(r=>r^r>>1),j=$(2),k=$(3);function z(o){let[r,n]=[1/0,1/0],[s,c]=[-1/0,-1/0];for(const[u,f]of o)[r,n]=[Math.min(u,r),Math.min(f,n)],[s,c]=[Math.max(u,s),Math.max(f,c)];const a=s-r,l=c-n,t=Math.max(a,l),e=t===0||a===0?1:t/a,i=t===0||l===0?1:t/l,m=o.map(([u,f])=>[e*(u-r),i*(f-n)]);return P(m,t).map(([u,f])=>[u/e+r,f/i+n])}function F(o){let[r,n,s]=[1/0,1/0,1/0],[c,a,l]=[-1/0,-1/0,-1/0];for(const[p,h,y]of o)[r,n,s]=[Math.min(p,r),Math.min(h,n),Math.min(y,s)],[c,a,l]=[Math.max(p,c),Math.max(h,a),Math.max(y,l)];const t=c-r,e=a-n,i=l-s,m=Math.max(t,e,i),u=m===0||t===0?1:m/t,f=m===0||e===0?1:m/e,X=m===0||i===0?1:m/i,W=o.map(([p,h,y])=>[u*(p-r),f*(h-n),X*(y-s)]);return E(W,m).map(([p,h,y])=>[p/u+r,h/f+n,y/X+s])}function P(o,r){if(o.length<2||new Set(o.map(String)).size===1)return o;const n=r/2,s={0:([t,e])=>[e,t],1:([t,e])=>[t,e-n],3:([t,e])=>[t-n,e-n],2:([t,e])=>[n-e,r-t]},c={0:([t,e])=>[e,t],1:([t,e])=>[t,e+n],3:([t,e])=>[t+n,e+n],2:([t,e])=>[r-e,n-t]},a=[[],[],[],[]];for(const t of o){const e=+(t[0]>n),i=+(t[1]>n),m=(e<<1)+i;a[m].push(t)}const l=a.map((t,e)=>P(t.map(s[e]),n));return j.flatMap(t=>l[t].map(c[t]))}function E(o,r){if(o.length<2||new Set(o.map(String)).size===1)return o;const n=r/2,s={0:([t,e,i])=>[i,t,e],1:([t,e,i])=>[e,i-n,t],3:([t,e,i])=>[e-n,i-n,t],2:([t,e,i])=>[t,r-e,n-i],6:([t,e,i])=>[t-n,r-e,n-i],7:([t,e,i])=>[r-e,i-n,r-t],5:([t,e,i])=>[n-e,i-n,r-t],4:([t,e,i])=>[n-i,r-t,e]},c={0:([t,e,i])=>[e,i,t],1:([t,e,i])=>[i,t,e+n],3:([t,e,i])=>[i,t+n,e+n],2:([t,e,i])=>[t,r-e,n-i],6:([t,e,i])=>[t+n,r-e,n-i],7:([t,e,i])=>[r-i,r-t,e+n],5:([t,e,i])=>[r-i,n-t,e+n],4:([t,e,i])=>[r-e,i,n-t]},a=[[],[],[],[],[],[],[],[]];for(const t of o){const e=+(t[0]>n),i=+(t[1]>n),m=+(t[2]>n),u=(e<<2)+(i<<1)+m;a[u].push(t)}const l=a.map((t,e)=>E(t.map(s[e]),n));return k.flatMap(t=>l[t].map(c[t]))}const S=(o,r)=>Math.random()*(r-o)+o,D=window.innerWidth,G=window.innerHeight,Y=document.querySelector("#pts2d-demo canvas"),v=document.querySelector("#pts2d-actions textarea"),T=document.querySelector("#pts2d-set"),_=document.querySelector("#pts2d-actions input"),V=document.querySelector("#pts2d-random"),b=Y.getContext("2d"),d=D*.45;Y.setAttribute("width",String(d));Y.setAttribute("height",String(d));function H(o){b.clearRect(0,0,d,d);const r=z(o);b.beginPath();for(let[n,s]of r)s=d-s,r.length<=500&&b.fillRect(n-4,s-4,8,8),b.lineTo(n,s);b.stroke()}function I(o){const r=(o??v.value).trim().split(`
`).map(e=>e.split(" ").map(Number)).filter(e=>e.length===2&&e.every(Number.isFinite));if(r.length<2){I(v.getAttribute("placeholder"));return}let[n,s]=[1/0,1/0],[c,a]=[-1/0,-1/0];for(const[e,i]of r)[n,s]=[Math.min(e,n),Math.min(i,s)],[c,a]=[Math.max(e,c),Math.max(i,a)];const l=d===40||c===n?1:(d-40)/(c-n),t=d===40||a===s?1:(d-40)/(a-s);H(r.map(([e,i])=>[l*(e-n)+20,t*(i-s)+20]))}T.addEventListener("click",()=>I());V.addEventListener("click",()=>{let o=Number(_.value);o||(o=100);const r=[...Array(o)].map(()=>[S(0,d),S(0,d)]);H(r)});const B=3,L=[...Array(1<<B).keys()];v.setAttribute("placeholder",L.flatMap(o=>L.map(r=>`${o} ${r}`)).join(`
`));I();const w=document.querySelector("#colors-original"),q=document.querySelector("#colors-sorted"),N=document.querySelector("#colors-actions textarea"),K=document.querySelector("#colors-set"),U=document.querySelector("#colors-actions input"),J=document.querySelector("#colors-random"),M=w.getContext("2d"),A=q.getContext("2d"),x=D*.9,g=G*.1;w.setAttribute("width",String(x));w.setAttribute("height",String(g));q.setAttribute("width",String(x));q.setAttribute("height",String(g));function Z(o){M.clearRect(0,0,x,g),A.clearRect(0,0,x,g);const r=x/o.length;for(let s=0;s<o.length;s++){const[c,a,l]=o[s];M.fillStyle=`rgb(${c} ${a} ${l})`,M.fillRect(s*r,0,r+1,g)}const n=F(o);for(let s=0;s<n.length;s++){const[c,a,l]=n[s];A.fillStyle=`rgb(${c} ${a} ${l})`,A.fillRect(s*r,0,r+1,g)}}function R(o){const r=(o??N.value).trim().split(`
`).map(n=>n.split(" ").map(Number)).filter(n=>n.length===3&&n.every(Number.isFinite));if(r.length<2){R(N.getAttribute("placeholder"));return}Z(r)}K.addEventListener("click",()=>R());function Q(o){return[...Array(o)].map(()=>[S(0,255),S(0,255),S(0,255)])}J.addEventListener("click",()=>{let o=Number(U.value);o||(o=100),Z(Q(o))});const O=50,C=[...Array(Math.trunc(255/O)+1).keys()].map(o=>O*o),tt=C.flatMap(o=>C.flatMap(r=>C.map(n=>[o,r,n])));N.setAttribute("placeholder",tt.map(o=>o.join(" ")).join(`
`));R();
