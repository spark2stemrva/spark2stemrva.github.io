const io=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&(x.target.classList.add('in'),io.unobserve(x.target))),{threshold:.12});
const watch=()=>document.querySelectorAll('.rv:not(.in)').forEach(el=>io.observe(el));watch();
const grid=document.getElementById('grid');
if(grid){
 const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const chips=document.getElementById('chips');let all=[];
 const draw=f=>{const l=all.filter(w=>f==='All'||(w.tags||[]).includes(f));
  grid.innerHTML=l.length?l.map(w=>`<article class="card rv"><div class="img" ${w.image?`style="background-image:url('${esc(w.image.replace(/^\//,''))}')"`:''}>${w.image?'':'🧪'}</div><div class="body"><div>${(w.tags||[]).map(t=>`<span class="pill">${esc(t)}</span>`).join('')}</div><h3>${esc(w.title)}</h3>${w.date?`<div class="when">${esc(w.date)}</div>`:''}<p>${esc(w.description)}</p>${w.link?`<a href="${esc(w.link)}" target="_blank" rel="noopener">Learn more →</a>`:''}</div></article>`).join(''):'<p class="empty">No workshops here yet. Check back soon!</p>';watch()};
 fetch('data/workshops.json').then(r=>r.json()).then(d=>{all=d.workshops||[];
  chips.innerHTML=['All','Science','Technology','Engineering','Math'].map((t,i)=>`<button class="${i?'':'on'}">${t}</button>`).join('');
  chips.onclick=e=>{if(e.target.tagName!=='BUTTON')return;chips.querySelectorAll('button').forEach(b=>b.classList.remove('on'));e.target.classList.add('on');draw(e.target.textContent)};draw('All')})
 .catch(()=>grid.innerHTML='<p class="empty">Workshops could not be loaded.</p>');
}
const gis=document.querySelectorAll('[data-link]');
if(gis.length)fetch('data/site.json').then(r=>r.json()).catch(()=>({})).then(s=>gis.forEach(a=>{const u=(s[a.dataset.link]||'').trim(),g=a.querySelector('.go');
 if(u){a.href=u;if(/^https?:/.test(u)){a.target='_blank';a.rel='noopener'}g.textContent='Sign up →'}else{a.classList.add('soon');g.textContent='Link coming soon'}}));
