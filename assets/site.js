(function(){
"use strict";
var d=document;

/* ---------- mobile nav ---------- */
var btn=d.getElementById('menuBtn'),nav=d.getElementById('nav');
if(btn&&nav){
  btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o?'true':'false');});
  d.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.focus();}});
}
d.querySelectorAll('.nav details').forEach(function(dt){
  d.addEventListener('click',function(e){if(!dt.contains(e.target))dt.removeAttribute('open');});
});

/* ---------- address assembly ---------- */
function addr(el){try{return atob(el.getAttribute('data-a'))+String.fromCharCode(64)+atob(el.getAttribute('data-b'))+atob(el.getAttribute('data-c'));}catch(e){return '';}}
d.querySelectorAll('.js-eml').forEach(function(el){
  var a=addr(el);if(!a)return;
  var t=el.querySelector('.eml-t');if(t&&el.hasAttribute('data-show'))t.textContent=a;
  el.setAttribute('href','mai'+'lto:'+a);
});

/* ---------- lead forms ---------- */
var loadedAt=Date.now();
d.querySelectorAll('form.js-lead').forEach(function(f){
  var touched=false;
  ['keydown','pointerdown','touchstart'].forEach(function(ev){f.addEventListener(ev,function(){touched=true;},{passive:true});});
  var st=f.querySelector('.fstatus'),sb=f.querySelector('[type=submit]');
  function show(cls,msg){if(!st)return;st.className='fstatus '+cls;st.textContent=msg;st.setAttribute('role','status');}
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var hp=f.querySelector('[name=_honey]');
    if(!f.checkValidity()){f.reportValidity();return;}
    var quiet=(hp&&hp.value)||!touched||(Date.now()-loadedAt<4000);
    if(quiet){show('ok','Mahalo! Your request is in. We\u2019ll reply within one business day.');f.reset();return;}
    var to=addr(f);if(!to){show('err','Something went wrong on our end. Please call 1-800-481-8638.');return;}
    var data={};new FormData(f).forEach(function(v,k){if(k!=='_honey')data[k]=v;});
    data._subject=f.getAttribute('data-subject')||'Maui-SEO inquiry';data._template='table';data._captcha='false';
    data.page=location.pathname;
    if(sb){sb.disabled=true;sb.dataset.t=sb.textContent;sb.textContent='Sending\u2026';}
    fetch('https://formsubmit.co/ajax/'+to,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
      .then(function(r){return r.json().catch(function(){return {};});})
      .then(function(j){
        if(j&&String(j.success)==='true'){show('ok','Mahalo! Your request is in. We\u2019ll reply within one business day.');f.reset();}
        else{show('warn','Your request reached our server, but we couldn\u2019t confirm delivery. If you don\u2019t hear back within one business day, please call 1-800-481-8638.');}
      })
      .catch(function(){show('err','Your message didn\u2019t send \u2014 your connection may have dropped. Please try again, or call 1-800-481-8638.');})
      .finally(function(){if(sb){sb.disabled=false;sb.textContent=sb.dataset.t;}});
  });
});

/* ---------- scorecard ---------- */
var sc=d.getElementById('scorecard');
if(sc){
  var arc=sc.querySelector('.arc'),num=sc.querySelector('.num b'),list=sc.querySelector('.fixes'),msg=sc.querySelector('.verdict');
  var L=arc?arc.getTotalLength?arc.getTotalLength():283:283;
  if(arc){arc.style.strokeDasharray=L;arc.style.strokeDashoffset=L;}
  function calc(){
    var qs=sc.querySelectorAll('.sq'),yes=0,ans=0,fixes=[];
    qs.forEach(function(q){var c=q.querySelector('input:checked');if(!c)return;ans++;
      if(c.value==='y')yes+=+q.getAttribute('data-w');else fixes.push({w:+q.getAttribute('data-w'),t:q.getAttribute('data-fix'),h:q.getAttribute('data-href')});});
    var total=0;qs.forEach(function(q){total+=+q.getAttribute('data-w');});
    var pct=Math.round(yes/total*100);
    if(num)num.textContent=ans?pct:'0';
    if(arc)arc.style.strokeDashoffset=L-(L*(ans?pct:0)/100);
    if(msg){msg.textContent=!ans?'Answer the questions to see your score.':pct>=80?'Strong foundation. The wins now come from content depth and AI visibility.':pct>=50?'Solid start, with real gaps competitors can use against you.':'Big opportunity. The fixes below are usually fast and inexpensive.';}
    if(list){list.innerHTML='';fixes.sort(function(a,b){return b.w-a.w;}).slice(0,3).forEach(function(x){
      var li=d.createElement('li');if(x.h){var a=d.createElement('a');a.href=x.h;a.textContent=x.t;li.appendChild(a);}else li.textContent=x.t;list.appendChild(li);});}
  }
  sc.addEventListener('change',calc);calc();
}

/* ---------- AI answer demo (advances only when tapped) ---------- */
var demo=d.getElementById('aidemo');
if(demo){
  var items=JSON.parse(demo.getAttribute('data-items')||'[]'),i=0;
  var qEl=demo.querySelector('.qtext'),aEl=demo.querySelector('.ans'),cEl=demo.querySelector('.count');
  function paint(){var it=items[i];if(!it)return;qEl.textContent=it.q;aEl.innerHTML=it.a;if(cEl)cEl.textContent=(i+1)+' of '+items.length;}
  demo.querySelector('button').addEventListener('click',function(){i=(i+1)%items.length;paint();});
  paint();
}
})();

/* reading progress on articles */
(function(){var a=document.querySelector('.article article');if(!a)return;var b=document.createElement('div');b.className='read-bar';b.setAttribute('aria-hidden','true');document.body.appendChild(b);
function u(){var r=a.getBoundingClientRect(),h=a.offsetHeight-window.innerHeight,p=h>0?Math.min(1,Math.max(0,-r.top/h)):0;b.style.width=(p*100)+'%';}
window.addEventListener('scroll',u,{passive:true});u();})();
