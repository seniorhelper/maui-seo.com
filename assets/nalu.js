/* Nalu — Maui-SEO guide bot. Self-contained: injects its own styles and markup. */
(function(){
"use strict";
if(window.__nalu)return;window.__nalu=1;
const st=document.createElement('style');st.textContent='#n-root{--ocean:#0B2A4A;--ocean2:#123a60;--teal:#14b8a6;--teal2:#2dd4bf;--sun:#C2410C;--coral:#BE185D;--gold:#fbbf24;--cream:#fff8ec;--ink:#0b2233;--muted:#557085;--line:rgba(11,34,51,.12);font-family:var(--body,Inter),system-ui,sans-serif}\n#n-root .chat-head h2{color:#fff;margin:0;font-size:1.15rem;letter-spacing:0;line-height:1.1}#n-root .chat-head small{color:rgba(255,255,255,.85)}\n/* ---------- volcano ---------- */\n#n-volcano{position:fixed;left:-10px;bottom:-6px;width:min(340px,58vw);z-index:9000;pointer-events:none;\n  transition:transform 1.4s cubic-bezier(.6,.05,.3,1),opacity 1.4s ease}\n#n-volcano.rumble{animation:rumble .18s linear 7}\n@keyframes rumble{0%{transform:translate(0,0)}25%{transform:translate(-2px,1px)}50%{transform:translate(2px,-1px)}75%{transform:translate(-1px,-1px)}100%{transform:translate(0,0)}}\n#n-volcano.gone{transform:translateY(110%);opacity:0}\n.plume{transform-origin:50% 100%;animation:plume 2.6s ease-in-out infinite}\n@keyframes plume{0%,100%{opacity:.55;transform:scaleY(.9)}50%{opacity:.85;transform:scaleY(1.05)}}\n.smoke{animation:smoke 6s ease-in-out infinite}\n.smoke:nth-of-type(2){animation-delay:2s}.smoke:nth-of-type(3){animation-delay:4s}\n@keyframes smoke{0%{transform:translate(0,0) scale(.6);opacity:0}25%{opacity:.5}100%{transform:translate(-30px,-120px) scale(1.6);opacity:0}}\n\n/* ---------- flying / landed surfer ---------- */\n#n-nalu{position:fixed;left:0;top:0;width:140px;height:230px;z-index:9002;will-change:transform;\n  transform:translate(-400px,-400px)}\n#n-naluBtn{display:block;width:100%;height:100%;background:none;border:0;cursor:pointer;padding:0;border-radius:40px}\n#n-naluBtn svg{width:100%;height:100%;display:block}\n.chute-svg{position:absolute;left:0;top:-41.3%;width:100%;height:auto;overflow:visible;pointer-events:none}\n#n-chute{transform-box:view-box;transform-origin:70px 60px;transition:transform .5s cubic-bezier(.3,1.6,.5,1),opacity .6s ease}\n#n-nalu:not(.chute-open) #n-chute{transform:scale(.05);opacity:0}\n#n-nalu.landed #n-chute{transform:translateY(-30px) scale(.4);opacity:0}\n.arms-hold{display:none}.arms-land{display:inline}\n#n-nalu.flying .arms-hold{display:inline}#n-nalu.flying .arms-land{display:none}\n#n-nalu.landed .shaka{transform-origin:40px 96px;animation:shaka 2.4s ease-in-out infinite}\n@keyframes shaka{0%,100%{transform:rotate(0)}50%{transform:rotate(-12deg)}}\n#n-nalu.landed .bob{animation:bob 3.4s ease-in-out infinite}\n@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}\n.blink{animation:blink 5s infinite}\n@keyframes blink{0%,94%,100%{transform:scaleY(1)}96%{transform:scaleY(.1)}}\n\n.nalu-x{position:fixed;z-index:9004;width:28px;height:28px;border-radius:50%;border:2px solid #fff;\n  background:var(--ocean);color:#fff;font-size:14px;font-weight:700;cursor:pointer;display:none;\n  align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.25)}\n.nalu-x.show{display:flex}\n.bubble{position:fixed;z-index:9003;max-width:220px;background:#fff;color:var(--ink);border-radius:18px 18px 4px 18px;\n  padding:12px 14px;font-size:.92rem;line-height:1.4;box-shadow:0 12px 30px rgba(6,42,64,.25);\n  opacity:0;transform:translateY(8px) scale(.96);transition:all .35s ease;pointer-events:none}\n.bubble.show{opacity:1;transform:none;pointer-events:auto;cursor:pointer}\n.bubble b{font-family:var(--display,Fredoka),sans-serif;color:var(--ocean)}\n.tab{position:fixed;right:0;bottom:120px;z-index:9003;display:none;align-items:center;gap:6px;\n  background:var(--ocean);color:#fff;border:0;border-radius:14px 0 0 14px;padding:12px 14px;font-weight:700;\n  font-family:var(--display,Fredoka),sans-serif;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.25)}\n.tab.show{display:flex}\n\n/* ---------- chat panel ---------- */\n.chat{position:fixed;z-index:9010;right:24px;bottom:24px;width:min(390px,calc(100vw - 32px));height:min(620px,calc(100vh - 48px));\n  background:#fff;border-radius:22px;box-shadow:0 30px 80px rgba(6,42,64,.4);display:flex;flex-direction:column;overflow:hidden;\n  transform:translateY(20px) scale(.97);opacity:0;pointer-events:none;transition:all .3s ease}\n.chat.open{transform:none;opacity:1;pointer-events:auto}\n.chat-head{background:linear-gradient(120deg,var(--ocean) 0%,#0e5a7a 60%,var(--teal) 130%);color:#fff;\n  padding:14px 14px 14px 16px;display:flex;align-items:center;gap:12px;position:relative;overflow:hidden}\n.chat-head::after{content:"";position:absolute;right:-40px;top:-40px;width:140px;height:140px;border-radius:50%;\n  background:radial-gradient(circle,rgba(251,191,36,.45),transparent 70%)}\n.ava{width:44px;height:44px;border-radius:50%;background:#ffd9a8;flex-shrink:0;overflow:hidden;border:2px solid rgba(255,255,255,.7)}\n.chat-head h2{font-family:var(--display,Fredoka),sans-serif;font-size:1.15rem;line-height:1.1}\n.chat-head small{display:block;font-size:.78rem;color:rgba(255,255,255,.82);margin-top:2px}\n.chat-head .close{margin-left:auto;width:34px;height:34px;border-radius:50%;border:0;background:rgba(255,255,255,.16);\n  color:#fff;font-size:18px;cursor:pointer;position:relative;z-index:1}\n.log{flex:1;overflow-y:auto;padding:16px;background:linear-gradient(180deg,#fffaf2,#f3fbfb);display:flex;flex-direction:column;gap:10px}\n.msg{max-width:86%;padding:10px 13px;border-radius:16px;font-size:.93rem;line-height:1.5;white-space:pre-line;animation:pop .25s ease}\n@keyframes pop{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}\n.msg.bot{background:#fff;border:1px solid var(--line);border-bottom-left-radius:4px;align-self:flex-start}\n.msg.me{background:var(--ocean);color:#fff;border-bottom-right-radius:4px;align-self:flex-end}\n.msg a{color:#0e7490;font-weight:600}\n.msg.me a{color:var(--gold)}\n.typing{align-self:flex-start;display:flex;gap:4px;padding:12px 14px;background:#fff;border:1px solid var(--line);border-radius:16px}\n.typing i{width:7px;height:7px;border-radius:50%;background:var(--teal);animation:dots 1.1s infinite}\n.typing i:nth-child(2){animation-delay:.15s}.typing i:nth-child(3){animation-delay:.3s}\n@keyframes dots{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-4px);opacity:1}}\n.chips{display:flex;flex-wrap:wrap;gap:6px;padding:10px 14px 4px;background:#fff;border-top:1px solid var(--line)}\n.chip{border:1px solid rgba(14,116,144,.3);background:#f0fbfa;color:#0e5a6e;border-radius:999px;padding:7px 11px;\n  font-size:.82rem;font-weight:600;cursor:pointer}\n.chip:hover{background:#dff6f3}\n.inrow{display:flex;gap:8px;padding:10px 12px 12px;background:#fff}\n.inrow input{flex:1;border:1px solid var(--line);border-radius:999px;padding:12px 16px;font:inherit;font-size:16px;background:#fbfbfb}\n.inrow input:focus{outline:none;border-color:var(--teal);background:#fff}\n.inrow button{border:0;border-radius:50%;width:46px;height:46px;background:linear-gradient(135deg,var(--sun),var(--coral));\n  color:#fff;cursor:pointer;font-size:18px;flex-shrink:0}\n.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}\n@media (max-width:640px){\n  .chat{right:0;left:0;bottom:0;width:100%;height:88vh;border-radius:22px 22px 0 0}\n  #n-nalu{width:88px;height:145px}\n}\n@media (prefers-reduced-motion:reduce){\n  *,*::before,*::after{animation:none!important;transition:none!important}\n}\n';document.head.appendChild(st);
const root=document.createElement('div');root.id='n-root';root.innerHTML='<!-- ============ VOLCANO ============ -->\n<svg id="n-volcano" viewBox="0 0 340 260" aria-hidden="true">\n  <defs>\n    <linearGradient id="n-vcone" x1="0" y1="0" x2="0" y2="1">\n      <stop offset="0" stop-color="#5b3a2e"/><stop offset=".55" stop-color="#3a2a26"/><stop offset="1" stop-color="#1c1a1f"/>\n    </linearGradient>\n    <linearGradient id="n-vgreen" x1="0" y1="0" x2="0" y2="1">\n      <stop offset="0" stop-color="#2f8f5b"/><stop offset="1" stop-color="#14532d"/>\n    </linearGradient>\n    <radialGradient id="n-glow" cx=".5" cy="1" r=".9">\n      <stop offset="0" stop-color="#ffe08a"/><stop offset=".35" stop-color="#fb923c"/><stop offset=".7" stop-color="#ef4444" stop-opacity=".6"/><stop offset="1" stop-color="#ef4444" stop-opacity="0"/>\n    </radialGradient>\n  </defs>\n  <circle class="smoke" cx="170" cy="60" r="22" fill="rgba(255,255,255,.55)"/>\n  <circle class="smoke" cx="180" cy="55" r="18" fill="rgba(255,255,255,.5)"/>\n  <circle class="smoke" cx="160" cy="62" r="20" fill="rgba(255,255,255,.45)"/>\n  <ellipse class="plume" cx="170" cy="70" rx="70" ry="60" fill="url(#n-glow)"/>\n  <path d="M10,260 C60,200 110,120 140,78 L200,78 C230,120 280,200 330,260Z" fill="url(#n-vcone)"/>\n  <path d="M10,260 C50,215 80,190 110,170 C130,190 120,230 150,260Z" fill="url(#n-vgreen)" opacity=".9"/>\n  <path d="M330,260 C290,212 260,188 235,172 C220,200 240,236 215,260Z" fill="url(#n-vgreen)" opacity=".85"/>\n  <ellipse cx="170" cy="80" rx="31" ry="8" fill="#ffb347"/>\n  <ellipse cx="170" cy="80" rx="22" ry="5" fill="#fff1b8"/>\n  <path d="M150,82 C146,110 158,128 150,160" stroke="#fb923c" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9"/>\n  <path d="M186,83 C194,112 180,130 192,168" stroke="#f97316" stroke-width="4" fill="none" stroke-linecap="round" opacity=".85"/>\n  <path d="M170,84 C172,100 166,112 170,128" stroke="#fde68a" stroke-width="3" fill="none" stroke-linecap="round" opacity=".9"/>\n</svg>\n\n<!-- ============ NALU (full body) ============ -->\n<div id="n-nalu">\n  <svg class="chute-svg" viewBox="0 -95 140 165" aria-hidden="true">\n    <!-- coconut parachute -->\n    <g id="n-chute">\n      <line x1="14" y1="-10" x2="44" y2="64" stroke="#8b5e34" stroke-width="1.4"/>\n      <line x1="126" y1="-10" x2="96" y2="64" stroke="#8b5e34" stroke-width="1.4"/>\n      <line x1="46" y1="-22" x2="47" y2="64" stroke="#8b5e34" stroke-width="1"/>\n      <line x1="94" y1="-22" x2="93" y2="64" stroke="#8b5e34" stroke-width="1"/>\n      <path d="M6,-8 C6,-60 134,-60 134,-8 C112,-16 92,-10 70,-14 C48,-10 28,-16 6,-8Z" fill="url(#n-shellG)"/>\n      <path d="M6,-8 C28,-16 48,-10 70,-14 C92,-10 112,-16 134,-8" stroke="#fff4dc" stroke-width="4" fill="none"/>\n      <path d="M30,-38 C40,-44 52,-46 62,-44 M82,-46 C94,-46 104,-42 112,-36" stroke="#5a3417" stroke-width="2" fill="none" opacity=".6"/>\n      <circle cx="56" cy="-30" r="2.4" fill="#3a2010"/><circle cx="70" cy="-34" r="2.4" fill="#3a2010"/><circle cx="84" cy="-30" r="2.4" fill="#3a2010"/>\n      <path d="M70,-50 C62,-70 44,-74 34,-70 C48,-66 58,-60 66,-52Z" fill="#22a05a"/>\n      <path d="M70,-50 C80,-72 98,-76 108,-70 C94,-66 82,-60 74,-52Z" fill="#16a34a"/>\n      <path d="M70,-50 C70,-72 76,-84 84,-88 C80,-76 76,-64 72,-52Z" fill="#15803d"/>\n    </g>\n\n  </svg>\n  <button id="n-naluBtn" type="button" aria-label="Open chat with Nalu, the Maui-SEO guide">\n  <svg viewBox="0 0 140 230" aria-hidden="true">\n    <defs>\n      <linearGradient id="n-board" x1="0" y1="0" x2="1" y2="0">\n        <stop offset="0" stop-color="#fef3c7"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#fde68a"/>\n      </linearGradient>\n      <radialGradient id="n-shellG" cx=".5" cy=".2" r=".9">\n        <stop offset="0" stop-color="#a86b37"/><stop offset=".6" stop-color="#7c4a22"/><stop offset="1" stop-color="#4a2a12"/>\n      </radialGradient>\n      <pattern id="n-hib" width="18" height="18" patternUnits="userSpaceOnUse">\n        <rect width="18" height="18" fill="#0e9f8f"/>\n        <g transform="translate(9 9)"><circle r="2" fill="#fde68a"/>\n          <ellipse rx="2.6" ry="4.6" fill="#fb7185" transform="rotate(0) translate(0 -4)"/>\n          <ellipse rx="2.6" ry="4.6" fill="#fb7185" transform="rotate(72) translate(0 -4)"/>\n          <ellipse rx="2.6" ry="4.6" fill="#fb7185" transform="rotate(144) translate(0 -4)"/>\n          <ellipse rx="2.6" ry="4.6" fill="#fb7185" transform="rotate(216) translate(0 -4)"/>\n          <ellipse rx="2.6" ry="4.6" fill="#fb7185" transform="rotate(288) translate(0 -4)"/>\n          <circle r="1.6" fill="#fde68a"/></g>\n      </pattern>\n    </defs>\n\n    <g class="bob">\n      <!-- surfboard (landed: planted beside him) -->\n      <g class="arms-land">\n        <g transform="rotate(9 112 118)">\n          <path d="M112,18 C126,18 130,62 130,116 C130,176 121,208 112,212 C103,208 94,176 94,116 C94,62 98,18 112,18Z" fill="url(#n-board)" stroke="#e5b64a" stroke-width="1.5"/>\n          <path d="M112,22 L112,208" stroke="#fb7185" stroke-width="3"/>\n          <path d="M104,40 L120,40" stroke="#14b8a6" stroke-width="3" stroke-linecap="round"/>\n        </g>\n      </g>\n\n      <!-- board on his back while flying (drawn behind the body) -->\n      <g class="arms-hold"><g transform="rotate(-28 70 110)">\n        <path d="M70,36 C83,36 87,74 87,112 C87,156 79,186 70,188 C61,186 53,156 53,112 C53,74 57,36 70,36Z" fill="url(#n-board)" stroke="#e5b64a" stroke-width="1.5"/>\n        <path d="M70,40 L70,184" stroke="#fb7185" stroke-width="3"/></g></g>\n      <!-- legs -->\n      <path d="M56,150 C54,172 52,194 50,214" stroke="#c98a5b" stroke-width="12" stroke-linecap="round" fill="none"/>\n      <path d="M78,150 C80,172 82,194 84,214" stroke="#c98a5b" stroke-width="12" stroke-linecap="round" fill="none"/>\n      <ellipse cx="47" cy="218" rx="10" ry="5" fill="#b77a4c"/>\n      <ellipse cx="88" cy="218" rx="10" ry="5" fill="#b77a4c"/>\n      <!-- board shorts -->\n      <path d="M46,122 L90,122 L94,162 L72,162 L68,146 L64,162 L42,162Z" fill="url(#n-hib)" stroke="#0b6f64" stroke-width="1.5"/>\n      <rect x="45" y="120" width="46" height="6" rx="2" fill="#0b6f64"/>\n      <!-- torso -->\n      <path d="M48,84 C46,100 46,112 48,124 L88,124 C90,112 90,100 88,84 C80,78 56,78 48,84Z" fill="#d49a6a"/>\n      <path d="M58,96 C62,100 74,100 78,96" stroke="#b97d4f" stroke-width="1.6" fill="none" opacity=".6"/>\n      <!-- lei -->\n      <path d="M50,86 C58,98 78,98 86,86" stroke="#fbbf24" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="1 6"/>\n\n      <!-- arms: holding parachute lines (flying) -->\n      <g class="arms-hold">\n        <path d="M50,88 C40,78 40,70 44,62" stroke="#d49a6a" stroke-width="10" stroke-linecap="round" fill="none"/>\n        <path d="M86,88 C96,78 96,70 96,62" stroke="#d49a6a" stroke-width="10" stroke-linecap="round" fill="none"/>\n        <circle cx="44" cy="62" r="6" fill="#c98a5b"/><circle cx="96" cy="62" r="6" fill="#c98a5b"/>\n      </g>\n\n      <!-- arms: landed (shaka + resting on board) -->\n      <g class="arms-land">\n        <path d="M86,90 C96,100 100,110 102,120" stroke="#d49a6a" stroke-width="10" stroke-linecap="round" fill="none"/>\n        <circle cx="103" cy="122" r="6" fill="#c98a5b"/>\n        <g class="shaka">\n          <path d="M50,90 C40,84 34,76 30,66" stroke="#d49a6a" stroke-width="10" stroke-linecap="round" fill="none"/>\n          <circle cx="29" cy="62" r="7" fill="#c98a5b"/>\n          <path d="M24,58 L18,52" stroke="#c98a5b" stroke-width="5" stroke-linecap="round"/>\n          <path d="M33,57 L36,48" stroke="#c98a5b" stroke-width="5" stroke-linecap="round"/>\n        </g>\n      </g>\n\n      <!-- neck + head -->\n      <rect x="62" y="70" width="12" height="14" rx="5" fill="#c98a5b"/>\n      <circle cx="68" cy="52" r="22" fill="#d49a6a"/>\n      <!-- hair -->\n      <path d="M46,50 C44,30 58,22 70,24 C84,24 94,34 90,50 C86,40 80,36 74,38 C70,32 62,32 58,38 C52,38 48,44 46,50Z" fill="#2b1a10"/>\n      <path d="M56,30 C60,22 70,20 76,24" stroke="#4a2e1a" stroke-width="3" fill="none" stroke-linecap="round"/>\n      <!-- hibiscus behind ear -->\n      <g transform="translate(47 44)">\n        <ellipse rx="3.2" ry="5.5" fill="#fb7185" transform="rotate(0) translate(0 -4)"/>\n        <ellipse rx="3.2" ry="5.5" fill="#fb7185" transform="rotate(72) translate(0 -4)"/>\n        <ellipse rx="3.2" ry="5.5" fill="#fb7185" transform="rotate(144) translate(0 -4)"/>\n        <ellipse rx="3.2" ry="5.5" fill="#fb7185" transform="rotate(216) translate(0 -4)"/>\n        <ellipse rx="3.2" ry="5.5" fill="#fb7185" transform="rotate(288) translate(0 -4)"/>\n        <circle r="2.2" fill="#fde68a"/>\n      </g>\n      <!-- face -->\n      <g class="blink" style="transform-origin:68px 52px">\n        <ellipse cx="61" cy="52" rx="2.6" ry="3.2" fill="#1c1410"/>\n        <ellipse cx="76" cy="52" rx="2.6" ry="3.2" fill="#1c1410"/>\n      </g>\n      <circle cx="62" cy="51" r=".9" fill="#fff"/><circle cx="77" cy="51" r=".9" fill="#fff"/>\n      <path d="M58,46 C60,44 63,44 65,45 M72,45 C74,44 77,44 79,46" stroke="#2b1a10" stroke-width="1.6" fill="none" stroke-linecap="round"/>\n      <path d="M60,60 C64,66 73,66 77,60" stroke="#7a3b22" stroke-width="2.2" fill="#fff" stroke-linecap="round"/>\n      <ellipse cx="56" cy="58" rx="3.4" ry="2" fill="#f28c7a" opacity=".45"/>\n      <ellipse cx="81" cy="58" rx="3.4" ry="2" fill="#f28c7a" opacity=".45"/>\n    </g>\n  </svg>\n  </button>\n</div>\n\n<button class="nalu-x" id="n-naluX" type="button" aria-label="Hide Nalu">✕</button>\n<div class="bubble" id="n-bubble" role="button" tabindex="-1"><b>Aloha! I\'m Nalu</b> 🤙<br>Tap me to talk story — marketing, AI search, or island stuff.</div>\n<button class="tab" id="n-tab" type="button" aria-label="Bring Nalu back">🤙 Nalu</button>\n\n<!-- ============ CHAT PANEL ============ -->\n<section class="chat" id="n-chat" role="dialog" aria-modal="false" aria-labelledby="n-chatTitle">\n  <header class="chat-head">\n    <div class="ava" aria-hidden="true">\n      <svg viewBox="40 22 56 56"><circle cx="68" cy="52" r="22" fill="#d49a6a"/>\n        <path d="M46,50 C44,30 58,22 70,24 C84,24 94,34 90,50 C86,40 80,36 74,38 C70,32 62,32 58,38 C52,38 48,44 46,50Z" fill="#2b1a10"/>\n        <ellipse cx="61" cy="52" rx="2.6" ry="3.2" fill="#1c1410"/><ellipse cx="76" cy="52" rx="2.6" ry="3.2" fill="#1c1410"/>\n        <path d="M60,60 C64,66 73,66 77,60" stroke="#7a3b22" stroke-width="2.2" fill="#fff"/></svg>\n    </div>\n    <div><h2 id="n-chatTitle">Nalu</h2><small>Maui-SEO guide · talk story with me</small></div>\n    <button class="close" id="n-chatClose" type="button" aria-label="Close chat">✕</button>\n  </header>\n  <div class="log" id="n-log" aria-live="polite"></div>\n  <div class="chips" id="n-chips"></div>\n  <form class="inrow" id="n-form" autocomplete="off">\n    <label for="inp" class="sr">Message Nalu</label>\n    <input id="n-inp" type="text" placeholder="Say howzit…" maxlength="300">\n    <button type="submit" aria-label="Send">➤</button>\n  </form>\n</section>\n\n';document.body.appendChild(root);

const PHONE='1-800-481-8638';
const TEL='tel:18004818638';
const $=id=>document.getElementById(id);
const nalu=$('n-nalu'),volcano=$('n-volcano'),X=$('n-naluX'),bubble=$('n-bubble'),tab=$('n-tab'),chat=$('n-chat'),log=$('n-log'),chips=$('n-chips'),form=$('n-form'),inp=$('n-inp');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ================= FLIGHT ================= */
const size=()=>({w:nalu.offsetWidth,h:nalu.offsetHeight});
function barH(){const cb=document.querySelector('.callbar');return cb&&getComputedStyle(cb).display!=='none'?cb.offsetHeight:0;}
function landSpot(){const {w,h}=size();return{x:innerWidth-w-16,y:innerHeight-h-12-barH()};}
const SS={get:k=>{try{return sessionStorage.getItem(k);}catch(e){return null;}},set:(k,v)=>{try{sessionStorage.setItem(k,v);}catch(e){}}};
function place(x,y,r){nalu.style.transform=`translate(${x}px,${y}px) rotate(${r||0}deg)`;}
const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
let raf=null;
function tween(dur,fn){return new Promise(res=>{const t0=performance.now();
  (function step(now){const t=Math.min(1,(now-t0)/dur);fn(t);if(t<1)raf=requestAnimationFrame(step);else res();})(t0);});}

async function launch(){
  cancelAnimationFrame(raf);
  if(SS.get('nalu-seen')){hideAll();nalu.classList.remove('flying','chute-open');nalu.style.display='block';volcano.classList.add('gone');land(landSpot());return;}
  SS.set('nalu-seen','1');
  hideAll();
  nalu.classList.remove('landed','chute-open');nalu.classList.add('flying');
  nalu.style.display='block';volcano.classList.remove('gone');
  const {w,h}=size();const L=landSpot();
  if(reduce){volcano.classList.add('gone');land(L);return;}
  const vr=volcano.getBoundingClientRect();
  const sx=vr.left+vr.width*.5-w/2, sy=vr.top+vr.height*.28-h*.4;
  place(sx,sy+60);
  volcano.classList.add('rumble');
  await new Promise(r=>setTimeout(r,1300));
  volcano.classList.remove('rumble');
  // blast up in an arc
  const apex={x:Math.min(innerWidth*.34,sx+innerWidth*.2),y:Math.max(24,innerHeight*.06)};
  await tween(1100,t=>{const e=1-Math.pow(1-t,3);place(sx+(apex.x-sx)*e, (sy+60)+(apex.y-(sy+60))*e, -540*e);});
  // parachute pops
  nalu.classList.add('chute-open');place(apex.x,apex.y,0);
  setTimeout(()=>volcano.classList.add('gone'),600);
  await new Promise(r=>setTimeout(r,350));
  // drift down with a gentle sway
  await tween(5200,t=>{const e=ease(t);const x=apex.x+(L.x-apex.x)*e+Math.sin(t*Math.PI*3)*38*(1-t);
    const y=apex.y+(L.y-apex.y)*e;place(x,y,Math.sin(t*Math.PI*3)*9*(1-t));});
  land(L);
}
function land(L){
  place(L.x,L.y,0);nalu.classList.remove('flying','chute-open');nalu.classList.add('landed');
  const {w}=size();
  X.style.left=Math.min(L.x+w-30,innerWidth-34)+'px';X.style.top=(L.y+2)+'px';X.classList.add('show');
  bubble.style.left=Math.max(10,L.x-196)+'px';bubble.style.top=Math.max(10,L.y-10)+'px';
  setTimeout(()=>bubble.classList.add('show'),300);clearTimeout(window.__nbub);window.__nbub=setTimeout(()=>bubble.classList.remove('show'),7300);
}
function hideAll(){X.classList.remove('show');bubble.classList.remove('show');tab.classList.remove('show');}
addEventListener('resize',()=>{if(nalu.classList.contains('landed'))land(landSpot());});

X.addEventListener('click',()=>{nalu.style.display='none';hideAll();tab.classList.add('show');closeChat();SS.set('nalu-hidden','1');});
tab.addEventListener('click',()=>{tab.classList.remove('show');nalu.style.display='block';SS.set('nalu-hidden','');land(landSpot());});
nalu.addEventListener('click',()=>{if(nalu.classList.contains('landed'))openChat();});
bubble.addEventListener('click',openChat);

/* ================= CHAT UI ================= */
let started=false;
function openChat(){chat.classList.add('open');bubble.classList.remove('show');
  if(!started){started=true;greetFirst();}setTimeout(()=>inp.focus(),250);}
function closeChat(){chat.classList.remove('open');}
$('n-chatClose').addEventListener('click',closeChat);
addEventListener('keydown',e=>{if(e.key==='Escape')closeChat();});

function add(text,who){const d=document.createElement('div');d.className='msg '+who;
  if(who==='bot')d.innerHTML=text;else d.textContent=text;log.appendChild(d);log.scrollTop=log.scrollHeight;}
function setChips(list){chips.innerHTML='';(list||DEFAULT_CHIPS).forEach(c=>{const b=document.createElement('button');
  b.type='button';b.className='chip';b.textContent=c;b.onclick=()=>send(c);chips.appendChild(b);});}
function botSay(html,chipList){const t=document.createElement('div');t.className='typing';t.innerHTML='<i></i><i></i><i></i>';
  log.appendChild(t);log.scrollTop=log.scrollHeight;
  const delay=Math.min(1400,380+String(html).replace(/<[^>]+>/g,'').length*9);
  return new Promise(res=>setTimeout(()=>{t.remove();add(html,'bot');setChips(chipList);res();},reduce?60:delay));}

form.addEventListener('submit',e=>{e.preventDefault();const v=inp.value.trim();if(!v)return;inp.value='';send(v);});

/* ================= BRAIN ================= */
const DEFAULT_CHIPS=['How much is SEO?','AI search?','Weather on Maui','Tell me a joke','Free audit'];
const mem={name:null,industry:null,town:null,last:{}};
const pick=(key,arr)=>{let i;do{i=Math.floor(Math.random()*arr.length);}while(arr.length>1&&i===mem.last[key]);mem.last[key]=i;return arr[i];};
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[ʻ'‘’`]/g,'').replace(/\s+/g,' ').trim();
const nm=()=>mem.name?(' '+mem.name):'';
function hstNow(){return new Intl.DateTimeFormat('en-US',{timeZone:'Pacific/Honolulu',hour:'numeric',minute:'2-digit',weekday:'long'}).format(new Date());}
function hstHour(){return +new Intl.DateTimeFormat('en-US',{timeZone:'Pacific/Honolulu',hour:'numeric',hour12:false}).format(new Date());}

const PAGE=(window.NALU_PAGE||'home');
const PAGEHI={
  home:`I help Maui businesses get found on Google and inside AI answers.`,
  webdesign:`You're on our web design page — ask me how the $99-a-month custom site lease works, or what a Maui website should cost.`,
  kihei:`Kīhei business? Ask me what makes a South Maui website actually bring in calls.`,
  lahaina:`West Maui business reopening or relocated? Ask me the first things to fix so customers can find you again.`,
  marketing:`Looking at the full marketing picture? Ask me where to start with a small budget.`,
  advertising:`Thinking about ads? Ask me how to stop Google Ads from running on mainland time.`,
  social:`Social media question? I can talk Facebook groups, ads and posting.`,
  logo:`Need a logo? Ask me what makes one work on a sign, a truck and a phone screen.`,
  about:`Want to know who's behind Maui-SEO? Ask me about Zach.`,
  contact:`Ready to talk? I can get you to a real person fast.`,
  blog:`Reading up? Ask me anything from the blog — AI search, seasons, costs.`
};
function greetFirst(){const h=hstHour();
  const tod=h<11?'Good morning':h<17?'Aloha':'Evening';
  botSay(`${tod}! 🤙 I'm <b>Nalu</b> — "wave" in ʻōlelo Hawaiʻi.\n${PAGEHI[PAGE]||PAGEHI.home} I also know the island pretty good, and my jokes are… a work in progress.\nWhat's on your mind?`);}

const INDUSTRY={
  restaurant:{re:/restaurant|cafe|food truck|bar|brewery|poke|plate lunch|bakery|diner|eatery/,tip:`Restaurants on Maui live on two searches: visitors typing "best poke in Kīhei" from the condo, and locals asking "open now near me." Winners usually have a complete Google Business Profile with the menu linked, fresh photos every couple weeks, hours that are actually right on holidays, and reviews that mention dishes by name.`},
  tour:{re:/tour|snorkel|charter|boat|zipline|helicopter|whale watch|activity|excursion|dive/,tip:`Tour operators get booked months ahead, by people still on the mainland. So you need to rank for the research searches — "best snorkel tour Maui Molokini" — not just your brand name. Direct-booking pages that beat the OTA listings on detail and trust is where the margin comes back.`},
  lodging:{re:/hotel|vacation rental|condo|airbnb|vrbo|resort|b&b|bed and breakfast|inn|str/,tip:`Lodging is the toughest fight on Maui because you're up against the OTAs. The play is owning the neighborhood-level searches — "Nāpili condo with kitchen," "quiet Kīhei rental near the beach" — and making the direct-book path easier than Expedia's. Heads up: short-term-rental rules on Maui are in flux, so every page should stay accurate about what's allowed.`},
  trades:{re:/contractor|plumb|electric|roof|hvac|solar|landscap|pool|pest|handyman|construction|remodel|painter/,tip:`Trades on Maui are almost all map-pack. The businesses getting the calls have the right primary category, a real service-area setup, photos of actual jobs, and steady reviews that mention the town — "fixed our water heater in Pukalani." Most competitors haven't touched any of that.`},
  realestate:{re:/real estate|realtor|broker|property|mortgage|home sale/,tip:`Real estate on Maui splits between mainland buyers researching for months and locals who want someone who knows the neighborhood cold. Deep neighborhood pages — Wailea vs. Kīhei vs. Upcountry, real details, honest trade-offs — are what earn the trust and the rankings.`},
  health:{re:/dentist|doctor|clinic|chiropract|massage|spa|salon|yoga|wellness|physical therapy|med spa|vet/,tip:`Health and wellness on Maui is resident-heavy and review-driven. "Dentist Kahului" type searches are won in the map pack, and the listing with more recent, detailed reviews usually takes it. Clear pages per service and per town help too.`},
  wedding:{re:/wedding|photograph|event|planner|florist|officiant/,tip:`Wedding vendors get searched 6–18 months out, mostly from the mainland, and couples compare a lot. Real galleries by venue, honest pricing ranges, and answers to the questions they're scared to ask — that's what converts a browser into a booked date.`},
  retail:{re:/shop|store|boutique|retail|gallery|surf shop|clothing|jewel/,tip:`Retail on Maui wins on "near me" plus visitor discovery. Keep your Google listing products and photos fresh, get into the local gift guides, and if you ship to the mainland, a small online store turns vacation fans into year-round customers.`}
};
const TOWNS=/(kihei|wailea|makena|kahului|wailuku|paia|haiku|makawao|pukalani|kula|upcountry|lahaina|kaanapali|kapalua|napili|kahana|hana|maalaea|waikapu|waihee)/;

const I=[
 {k:'word',re:/what does ([a-z ]{2,20}?) mean|meaning of ([a-z ]{2,20})|define ([a-z ]{2,20})|what is ([a-z ]{2,20}?) in hawaiian/,r:(t,m)=>defineWord(m[1]||m[2]||m[3]||m[4])},
 {k:'hawaiianword',re:/\b(mahalo|ohana|pau|kokua|mauka|makai|da kine|dakine|pono|keiki|kuleana|ono|shaka|howzit|pupu|kama aina|kamaaina|haole|lanai|nalu)\b.*\?|^(ohana|pau|kokua|mauka|makai|pono|keiki|kuleana|ono|shaka|pupu)$/,r:(t)=>{const w=(t.match(/mahalo|ohana|pau|kokua|mauka|makai|da kine|dakine|pono|keiki|kuleana|ono|shaka|howzit|pupu|kama aina|kamaaina|haole|lanai|nalu/)||[''])[0];return defineWord(w);}},
 {k:'doing',re:/what are you doing|whatcha doing|what you up to|bored/,r:()=>pick('doing',[`Just waxing my board and watching the whales. 🐋 You?`,`Hanging out on the sand waiting for someone to ask me about SEO. So… 😄`])},
 {k:'fav',re:/favorite (spot|place|beach)|best place|where should i go/,r:()=>`Toughest question you could ask. 😅 Sunrise at Haleakalā (reservation!), a slow morning in Pāʻia, and an Upcountry drive through Kula with the whole island below you. Can't go wrong.`},
 {k:'webcost',re:/(website|web site|web design|a site) (cost|costs|price|pricing)|cost (of|for) a (website|site)|how much (is|does|for|would) (a|it cost to build a|it cost for a) ?(web ?site|website|site)|how much to build/,r:()=>`Two ways to do it. Buy a custom-coded site outright, or lease one starting at $99 a month with the option to buy it after 24 to 36 months. Price depends on size, complexity and how much optimization you want built in. The breakdown's on our <a href="/maui-web-design/">Maui web design</a> page.`},
 {k:'rude',re:/\b(stupid|dumb|idiot|suck|useless|shut up|hate you)\b/,r:()=>pick('rude',[
   `Ho, rough day? No worries — I'm a simple scripted bot, so I'll miss sometimes. Tell me what you're trying to get done and I'll do my best. Or call a human at <a href="${TEL}">${PHONE}</a>.`,
   `Fair enough — I'm still learning. What can I help with? Worst case, <a href="${TEL}">${PHONE}</a> gets you a real person.`])},
 {k:'real',re:/are you (a )?(real|human|person|bot|robot|ai|alive)|am i (talking|chatting) (to|with) (a )?(bot|human|person)|real person|talk to (a )?(human|person|real)|speak (to|with) (a )?(human|person)/,r:()=>`I'm a bot 🤖 — a scripted helper, not a person, and I won't pretend otherwise. I can answer a lot about Maui SEO and the island. For a real human, call <a href="${TEL}">${PHONE}</a> — they'll pick up.`},
 {k:'name',re:/my name is ([a-z][a-z\- ]{1,20})|call me ([a-z][a-z\-]{1,20})/,r:(t,m)=>{const n=(m[1]||m[2]).trim().split(' ')[0];mem.name=n.charAt(0).toUpperCase()+n.slice(1);return `Nice to meet you, ${mem.name}! 🤙 What kind of business you running?`;}},
 {k:'howareyou',re:/how (are|r) (you|u)|how(s| is) it going|how you doing|hows your day|how are things|you good\??$|wassup|whats up|what up|sup\b|whats good|hows life/,r:()=>pick('hay',[
   `Living the dream${nm()}! Waves looking good, sun's out, and nobody's asked me about page two of Google yet. 😄 How about you?`,
   `Chillin', brah. Just waxed my board and fixed somebody's Google listing — solid morning. What's up with you?`,
   `Can't complain — I live on Maui and I don't pay rent. 🌺 How's your day going?`])},
 {k:'greet',re:/^(hi|hey|hello|aloha|howzit|yo|hiya|good (morning|afternoon|evening)|heya|hola|greetings|ahoy)\b/,r:()=>pick('greet',[
   `Howzit${nm()}! 🤙 What can I help you with — Maui SEO, AI search, or just talk story?`,
   `Aloha${nm()}! 🌺 Ask me anything — marketing, the island, even the weather.`,
   `Hey hey${nm()}! Good to see you. What brings you by?`])},
 {k:'fine',re:/^(good|great|fine|not bad|ok|okay|awesome|pretty good|doing good|im good|im great|all good)\b/,r:()=>`Love to hear it! 🙌 So what's on your mind — getting found on Google, showing up in AI answers, or something else?`},
 {k:'thanks',re:/\b(mahalo|thanks|thank you|thx|appreciate|much love)\b/,r:()=>pick('thx',[
   `Mahalo nui loa to you${nm()}! 🌺 Anything else?`,`No worries, happy to help! Shoots — what else?`,`Anytime! That's the aloha spirit. 🤙`])},
 {k:'bye',re:/\b(bye|goodbye|see ya|later|a hui hou|gotta go|take care|cya)\b/,r:()=>`A hui hou — until we meet again${nm()}! 🤙 If you want a free look at how your business shows up, call <a href="${TEL}">${PHONE}</a> anytime.`},
 {k:'who',re:/who are you|your name|what are you|what do you do|introduce yourself/,r:()=>`I'm <b>Nalu</b> 🌊 — the Maui-SEO guide. I help Maui business owners figure out how to get found on Google, in Google Maps, and inside AI answers like ChatGPT and Google's AI Overviews. And I talk story about the island, 'cause why not.`},
 {k:'help',re:/^(help|menu|options|what can you (do|help)|what do you know)/,r:()=>`Here's what I'm good for:\n• Maui SEO, Google Maps & reviews\n• Websites (buy or lease from $99/mo), logos, social, ads\n• Showing up in AI answers\n• Pricing & how long SEO takes\n• Tips for your kind of business\n• Maui weather, Hawaiian words, island stuff\n• Jokes (use at your own risk 😅)`},
 {k:'weather',re:/weather|forecast|rain|raining|sunny|temperature|how hot|how cold|windy|is it nice/,r:()=>'__WEATHER__'},
 {k:'time',re:/what time|time is it|time there|time in (maui|hawaii)/,r:()=>`It's ${hstNow()} on Maui (Hawaiʻi time — no daylight saving here, so we stay put all year). ⏰`},
 {k:'joke',re:/joke|funny|make me laugh|another one|lol one|pun/,r:()=>pick('joke',[
   `Where's the best place on Maui to hide a secret?\n…Page two of Google. Nobody paddles out that far. 🏄`,
   `Why did the website drive up Haleakalā at sunrise?\nTo get above the fold. ☀️`,
   `What's a surfer's favorite part of SEO?\nCatching the long tail. 🌊`,
   `SEO is like the Road to Hāna — a ton of turns, one-lane bridges, and people honking at you… but the view at the end is worth it.`,
   `What do you call a Maui business with zero Google reviews?\nA really well-kept secret. We can fix that. 😉`,
   `How does a nēnē find the best plate lunch?\nIt checks Google Maps. So you better be on it. 🦆`,
   `I told my Google listing it needed more photos.\nIt said, "Da kine, brah — I'm just shy." 📸`])},
 {k:'lahainabiz',re:/lahaina (marketing|seo|web|business)|west maui (marketing|seo|business)|reopen|relocat|moved my business|says (we're|we are|i'm) closed|permanently closed/,r:()=>`Mahalo for asking. For West Maui businesses, the first fix is usually Google: make sure your profile says open, shows your current address and has the right hours. Then get Yelp, TripAdvisor and Facebook to match. We laid out the whole playbook here: <a href="/lahaina-west-maui-marketing/">Lahaina &amp; West Maui marketing</a>.`},
 {k:'lahaina',re:/lahaina|front street|wildfire|west maui fire|the fire|banyan/,r:()=>`Lahaina's close to everyone's heart here. 💛 Front Street reopened to traffic on August 1, 2026 — a big milestone — and rebuilding keeps going around it.\nIf you visit, spend at the businesses that are open and stay out of fenced and private areas.\nIf you're a West Maui business getting back on your feet, it'd be an honor to help folks find you again.`},
 {k:'volcano',re:/haleakala|volcano|erupt|lava|crater|house of the sun/,r:()=>pick('vol',[
   `Haleakalā — "house of the sun." 10,023 feet up. Legend says the demigod Māui lassoed the sun from the summit to slow it down so people had more daylight.\nDon't worry about my dramatic entrance — she's dormant and has been sleeping for centuries. I'm just extra. 😄`,
   `Sunrise at Haleakalā is unreal — above the clouds. Pro tip: you need a reservation for sunrise (roughly 3–7 a.m.), booked on recreation.gov. And bring a jacket — the summit can drop close to freezing even when the beach is 85°.`])},
 {k:'hana',re:/\bhana\b|road to hana|hana highway/,r:()=>`The Road to Hāna — around 64 miles of curves, waterfalls, and one-lane bridges from Kahului out to Hāna. Start early, pull all the way off to let locals pass, and don't stop on the bridges. Banana bread stands are mandatory. 🍌`},
 {k:'whale',re:/whale|humpback|kohola/,r:()=>`Koholā (humpback) season runs roughly December through April, and January to March is peak. The channel off Lahaina, Mā'alaea and Kīhei is one of the best places on Earth to see them. 🐋 For tour businesses, that window is when trip-planning searches spike — worth planning content early.`},
 {k:'surf',re:/\bsurf|jaws|peahi|hookipa|big wave|waves|honolua/,r:()=>`Oh, you speak my language. 🏄 Peʻahi — "Jaws" — on the North Shore gets giant winter swells for the pros. Hoʻokipa's the windsurf and turtle spot. Beginners do better on the gentler breaks near Lahaina and Kīhei with a lesson. Always respect the locals and the ocean.`},
 {k:'beach',re:/beach|snorkel|molokini|swim|turtle|honu|reef/,r:()=>`Molokini crater for snorkeling (go early, by boat), Kāʻanapali for classic beach days, and the South Maui coast for calm mornings. Seeing honu? Give 'em space — look, don't touch. 🐢 And please use reef-safe sunscreen.`},
 {k:'food',re:/plate lunch|poke|shave ice|loco moco|malasada|spam musubi|food|eat|hungry|lunch|dinner|restaurant rec/,r:()=>`Now you're talking. 🍤 Plate lunch (two scoop rice, mac salad — non-negotiable), fresh poke, shave ice with ice cream on the bottom, loco moco for when you need a nap after. I won't name favorites — too many good local spots, and I don't want the aunties mad at me. 😅`},
 {k:'nene',re:/nene|state bird|goose/,r:()=>`The nēnē is Hawaiʻi's state bird — a native goose that almost went extinct and came back. You'll see them around Haleakalā. Drive slow in the park; they wander onto the road. 🦆`},
 {k:'silver',re:/silversword|ahinahina/,r:()=>`The ʻāhinahina — Haleakalā silversword — grows basically nowhere else on Earth. Silvery spiky ball, blooms once, then it's done. Look but don't touch. 🌵`},
 {k:'history',re:/history|kamehameha|kingdom|iao|kepaniwai|capital/,r:()=>`Quick history: Kamehameha I fought the Battle of Kepaniwai in ʻĪao Valley in 1790 on his way to uniting the islands. Later, Lahaina served as the royal capital of the Hawaiian Kingdom before it moved to Honolulu. Maui is called "the Valley Isle" for that big isthmus between Haleakalā and the West Maui Mountains.`},
 {k:'pidgin',re:/pidgin|speak hawaiian|local slang|talk local/,r:()=>`Hawaiʻi has two local languages: ʻōlelo Hawaiʻi (Hawaiian) and Pidgin — Hawaiʻi Creole English. I sprinkle a little in, but I keep it light. Locals do it best. 🤙 Ask me what a word means — "mahalo," "da kine," "kuleana"…`},
 {k:'where',re:/where are you|are you (on|in) maui|do you have an office|where is your office|are you local|based where/,r:()=>`We work with Maui businesses island-wide — Central, South, West, Upcountry, the North Shore and East Maui — and our founder is in the islands regularly. Most of the real work happens where your customers find you: your Google profile, your website, and AI answers. Want a free look at yours?`},
 {k:'love',re:/love maui|maui is (beautiful|amazing|the best)|best island/,r:()=>`Right?! 🌺 From Haleakalā sunrise to Hoʻokipa turtles to a Kula sunset… no ka ʻoi — Maui is the best. (Don't tell the other islands I said that.)`},
 {k:'compliment',re:/you('re| are) (cool|awesome|funny|great|smart|cute|the best)|love you|good bot|nice bot/,r:()=>`Aww, mahalo! 🥹 You just made my whole day. Now let's make your business look this good on Google. 😎`},
 {k:'price',re:/cost|price|pricing|how much|budget|afford|expensive|cheap|rates|fee/,r:()=>`Honest answer: it depends on your competition and how much ground you need to make up. SEO in Hawaiʻi typically runs from a few hundred to several thousand a month. A Wailuku accountant serving locals needs a very different plan than a Wailea tour company chasing high-value bookings.\nThat's why we start with a <b>free audit</b> — so the scope fits your goals instead of a one-size package. Want one? <a href="${TEL}">${PHONE}</a>`},
 {k:'time2',re:/how long|how fast|when will i see|timeline|results|take to work|how soon/,r:()=>`Most Hawaiʻi businesses see real movement in three to six months, and it compounds from there. Google Maps improvements often show up sooner. AI-answer visibility can move faster too, since it rewards clear, well-structured info.\nOn an island market, rankings you earn tend to stick — that's the good news. 🌊`},
 {k:'guarantee',re:/guarantee|number one|#1|first page|promise|top spot/,r:()=>`Straight talk: nobody can honestly guarantee a #1 ranking — Google and AI engines don't sell spots, and anyone who promises one is a red flag. 🚩\nWhat we <i>do</i> promise: put your business first, work on it like it's our own company, and give it every bit of skill we've built since 2012.`},
 {k:'ai',re:/\bai\b|chatgpt|chat gpt|aeo|geo|ai overview|perplexity|gemini|claude|ai search|ai mode|llm/,r:()=>`Big one right now. Travelers ask ChatGPT and Google's AI to "plan 5 days on Maui" and get recommendations without clicking ten links.\nGood news: Google says its AI features run on the same systems as regular search. So the basics still win — a solid website, clear answers to real questions, accurate info everywhere, and content nobody else has. That's exactly what we build. 🤖🌺`},
 {k:'local',re:/local seo|map pack|google maps|near me|maps listing|three pack|3 pack/,r:()=>`Local SEO is how you land in the map pack — those three businesses under the map. On Maui it comes down to: the right Google categories, accurate hours and info, real photos, steady reviews that mention your town, and a website that backs it all up. Small island, word of mouth — reviews matter even more here.`},
 {k:'gbp',re:/google business|gbp|google my business|business profile|my listing|google listing/,r:()=>`Your Google Business Profile is the highest-leverage thing most Maui businesses can fix. Quick checklist:\n• Primary category exactly right\n• Hours correct (holidays too!)\n• Photos added every couple weeks\n• Reply to every review\n• Services & products filled in\nMost competitors haven't done half of that. 😉`},
 {k:'reviews',re:/review|stars|reputation|yelp|tripadvisor|bad review/,r:()=>`Reviews are gold on Maui — small island, everybody talks. Ask every happy customer (a simple text link works), reply to every review within a day or two, and handle the bad ones calmly and kindly. A thoughtful reply to a 2-star often wins more trust than ten 5-stars. And never buy fake ones — Google catches it.`},
 {k:'tourism',re:/tourist|visitor|tourism|travel|booking|ota|expedia|viator|mainland/,r:()=>`Maui businesses serve two people at once:\n🧳 <b>The Planner</b> — on the mainland, researching weeks or months out, comparing everything.\n📍 <b>The Visitor Here Now</b> — on the island, phone in hand, "open now near me."\nYou need content for both. Most competitors only speak to one.`},
 {k:'lease',re:/lease|99|buyout|rent a (site|website)|monthly website|website payment/,r:()=>`Here's how the lease works: custom-coded websites start at $99 a month. After 24 to 36 months you have the option to buy the site outright, priced on what it's worth at that point. Bigger or more complex sites cost more per month. No page-builder template — real code, built to rank. Details on our <a href="/maui-web-design/">Maui web design</a> page.`},
 {k:'kihei',re:/kihei web|website in kihei|kihei website|south maui web/,r:()=>`Kīhei's one of the busiest little markets on Maui — condos, cafés, activity shops, all fighting for the same visitors. We wrote a whole page on it: <a href="/kihei-web-design/">Kīhei web design</a>.`},
 {k:'choose',re:/choose (an |a )?seo|pick (an |a )?seo|hire (an |a )?seo|which seo (company|agency)|seo (company|agency) (questions|red flags)|compare (seo|agencies)|guarantee.*rank/,r:()=>`Big one. Quick version: never trust a ranking guarantee, make sure you own your website and Google profile, and ask how they measure calls, not just rankings. Google even updated its own hiring advice in June 2026. Full guide with 15 questions and a scorecard: <a href="/blog/how-to-choose-maui-seo-company/">How to choose a Maui SEO company</a>.`},
 {k:'web',re:/website|web design|web designer|new site|redesign|build a site|my site is (slow|old|ugly)/,r:()=>`We build custom-coded sites made to rank and convert — fast, mobile-first, with the SEO and AI-search structure built in from day one. You can buy one outright, or lease one starting at $99 a month.\nSee how it works on our <a href="/maui-web-design/">Maui web design</a> page.`},
 {k:'logo',re:/logo|graphic design|branding|brand identity|business card/,r:()=>`We design logos and brand graphics that hold up on a sign, a truck door and a tiny phone screen. Real designer work, not a template. Peek at <a href="/maui-logo-design/">Maui logo design</a>.`},
 {k:'social',re:/social media|facebook|instagram|tiktok|pixel|facebook group|posting/,r:()=>`Social on Maui runs on community — local Facebook groups carry a ton of weight here. We set up your Facebook pixel, run group and social ads, post on your behalf, and can manage your business page. More on the <a href="/maui-social-media-marketing/">Maui social media marketing</a> page.`},
 {k:'blog',re:/blog|article|read more|guides?/,r:()=>`Our <a href="/blog/">Maui-SEO blog</a> has deep dives on AI search, what websites cost here, Maui's busy seasons, and social media for small businesses.`},
 {k:'ppc',re:/\bads\b|ppc|google ads|paid search|advertis|display ads|remarketing|retargeting/,r:()=>`Need calls this week, not next quarter? Paid search, display and remarketing can bridge the gap while SEO builds. The trick in Hawaiʻi: set your ad schedule to Hawaiʻi time (not mainland), and measure calls and bookings — not clicks. More on our <a href="/maui-advertising-agency/">Maui advertising</a> page.`},
 {k:'islands',re:/big island|oahu|honolulu|kauai|molokai|lanai|other islands|statewide|whole state/,r:()=>`For the rest of the islands, our sister site covers it — the full <a href="https://bigislandseo.com/">Hawaii SEO</a> program, from Hilo to Līhuʻe. Maui's my home break, though. 🤙`},
 {k:'about',re:/who (runs|owns|is behind)|owner|founder|zach|eye to ad|your company|how long (have you|in business)|experience|since when/,r:()=>`Maui-SEO is run by Eye To Ad Media, founded in 2012 by Zachary Tye Wennstedt. Zach came up running sales teams for big plumbing and remodeling companies, so he's obsessed with one thing: calls and customers, not vanity rankings. 60 Google reviews at 5.0 and an A+ with the BBB.`},
 {k:'audit',re:/audit|get started|sign up|contact|call you|talk to someone|phone|email|quote|hire|work with you|consult/,r:()=>`Let's do it! 🙌 The free audit covers your Google profile, your website, how you show up in AI answers, and who's beating you — plus a plain-English plan.\n📞 <a href="${TEL}">${PHONE}</a>\nOr use the <a href="/contact/">contact page</a>. No contract, no pressure. If we're not the right fit, we'll say so.`}
];

function defineWord(w){
  const D={mahalo:'thank you 🙏',ohana:'family — including the family you choose',pau:'finished, done ("I\'m pau for the day")',kokua:'help, cooperation',
   mauka:'toward the mountains (the opposite of makai)',makai:'toward the ocean — locals give directions this way!',
   'da kine':'Pidgin for "the thing" — it fills in for basically any word you can\'t think of 😂',dakine:'Pidgin for "the thing" — the ultimate placeholder word 😂',
   pono:'righteous, balanced, doing the right thing',keiki:'kids, children',kuleana:'responsibility — and privilege — something that\'s yours to care for',
   ono:'delicious! ("dis poke is ono")',shaka:'the hang-loose hand sign 🤙 — means aloha, thanks, all good',howzit:'Pidgin for "how is it" — basically "hey, what\'s up?"',
   pupu:'appetizers, snacks',kamaaina:'a longtime resident of Hawaiʻi (literally "child of the land")','kama aina':'a longtime resident (literally "child of the land")',
   haole:'a foreigner or non-Native person — context and tone matter a lot with this one',lanai:'a porch or balcony (and Lānaʻi is also an island!)',
   nalu:'wave, surf — and my name! 🌊',aloha:'love, compassion, hello and goodbye — way deeper than a greeting'};
  const key=norm(w||'');
  if(D[key])return `<b>${w}</b> — ${D[key]}`;
  return `Hmm, "${w}" isn't in my little dictionary yet. Try: mahalo, ʻohana, pau, kōkua, mauka, makai, da kine, pono, kuleana, ʻono…`;
}

async function weather(){
  const url='https://api.open-meteo.com/v1/forecast?latitude=20.8893&longitude=-156.4729&current=temperature_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=Pacific%2FHonolulu';
  const W={0:'clear skies ☀️',1:'mostly sunny 🌤️',2:'partly cloudy ⛅',3:'cloudy ☁️',45:'foggy 🌫️',48:'foggy 🌫️',51:'light drizzle 🌦️',53:'drizzly 🌦️',55:'drizzly 🌦️',61:'light rain 🌧️',63:'rainy 🌧️',65:'pouring 🌧️',80:'passing showers 🌦️',81:'showers 🌧️',82:'heavy showers ⛈️',95:'stormy ⛈️'};
  try{
    const ctl=new AbortController();setTimeout(()=>ctl.abort(),4500);
    const r=await fetch(url,{signal:ctl.signal});if(!r.ok)throw 0;const d=await r.json();const c=d.current;
    const t=Math.round(c.temperature_2m),w=Math.round(c.wind_speed_10m),desc=W[c.weather_code]||'pretty nice';
    const extra=w>=18?` Trades are cranking at ${w} mph — good day for Hoʻokipa windsurfers.`:` Winds around ${w} mph.`;
    return `Right now in Kahului it's <b>${t}°F</b> and ${desc}.${extra}\nUpcountry and the Haleakalā summit run a lot cooler, and the windward side catches more showers. Classic Maui — five climates before lunch. 🌈`;
  }catch(e){
    return `Couldn't grab live conditions just now, but here's the usual: the lowlands run in the 80s most of the year, trade winds keep it comfy, the windward side catches more showers, and the Haleakalā summit can get near freezing at sunrise. 🌈`;
  }
}

function detectContext(t){
  let hit=null;
  for(const [k,v] of Object.entries(INDUSTRY)){if(v.re.test(t)){hit=k;break;}}
  const town=(t.match(TOWNS)||[null])[0];
  mem.town=town;
  return hit;
}
const TOWNNAME={kihei:'Kīhei',wailea:'Wailea',makena:'Mākena',kahului:'Kahului',wailuku:'Wailuku',paia:'Pāʻia',haiku:'Haʻikū',makawao:'Makawao',pukalani:'Pukalani',kula:'Kula',upcountry:'Upcountry',lahaina:'Lahaina',kaanapali:'Kāʻanapali',kapalua:'Kapalua',napili:'Nāpili',kahana:'Kahana',hana:'Hāna',maalaea:'Māʻalaea',waikapu:'Waikapū',waihee:'Waiheʻe'};

async function respond(raw){
  const t=norm(raw);
  // business context first (e.g. "I own a restaurant in Kihei")
  const ind=detectContext(t);
  const ownsBiz=/i (own|run|have|manage|operate)|my (business|company|shop|restaurant|store)|we (are|run|own)|im a |i am a /.test(t);
  if(ind&&(ownsBiz||!I.some(x=>x.re.test(t)))){
    mem.industry=ind;
    const where=mem.town?` in ${TOWNNAME[mem.town]||mem.town}`:'';
    return {html:`Nice${nm()} — love that${where}! 🙌\n${INDUSTRY[ind].tip}\nWant me to set you up with a free audit so you can see exactly where you stand?`,chips:['Free audit','How much is SEO?','How long does it take?','Tell me a joke']};
  }
  for(const intent of I){
    const m=t.match(intent.re);
    if(m){let out=intent.r(t,m);
      if(out==='__WEATHER__')out=await weather();
      const chipMap={price:['Free audit','How long does it take?','AI search?'],ai:['How much is SEO?','Google Maps tips','Free audit'],
        joke:['Another one!','How much is SEO?','Weather on Maui'],lahaina:['Free audit','Tell me about Haleakalā','Mahalo!'],
        weather:['Tell me a joke','Road to Hāna?','How much is SEO?'],audit:['How much is SEO?','How long does it take?','Mahalo!']};
      return {html:out,chips:chipMap[intent.k]};}
  }
  if(mem.town&&!ind) return {html:`Ah, ${TOWNNAME[mem.town]||mem.town}! 🌺 Great spot. Do you run a business out there? Tell me what kind and I'll share what usually works for it on Maui.`};
  return {html:pick('fb',[
    `Ho, dat one stumped me! 😅 I'm a scripted bot, so I'm best at Maui SEO, AI search, and island talk story. Try one of these — or call a human at <a href="${TEL}">${PHONE}</a>.`,
    `Hmm, not sure I caught that. I can talk SEO, Google Maps, AI answers, pricing, the weather, Hawaiian words, or jokes. What sounds good?`])};
}

async function send(text){
  add(text,'me');chips.innerHTML='';
  const {html,chips:c}=await respond(text);
  await botSay(html,c);
}

setChips();
if(SS.get('nalu-hidden')){nalu.style.display='none';volcano.classList.add('gone');tab.classList.add('show');}
else if(document.readyState==='complete')launch();
else addEventListener('load',()=>setTimeout(launch,reduce?0:600));

})();
