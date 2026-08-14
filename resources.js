let all=[];
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function card(r){
 const verified=/yes|true/i.test(r.baggVerified)||/verified/i.test(r.status);
 return `<article class="resource-card">
 <div class="badges"><span>${esc(r.offerType||'Resource')}</span>${verified?'<span class="verified">BAGG VERIFIED</span>':''}</div>
 <h3>${esc(r.name)}</h3><div class="provider">${esc(r.provider)}</div>
 <p>${esc(r.description||r.benefit||'Open this resource to learn more.')}</p>
 <div class="card-foot"><span>${esc(r.category)}</span><a href="resource.html?slug=${encodeURIComponent(r.slug)}">View details →</a></div></article>`;
}
function unique(k){return [...new Set(all.map(x=>x[k]).filter(Boolean))].sort()}
function fillSelect(id, vals){const el=document.getElementById(id); if(!el)return; vals.forEach(v=>el.insertAdjacentHTML('beforeend',`<option value="${esc(v)}">${esc(v)}</option>`))}
function render(){
 let list=[...all], p=new URLSearchParams(location.search), q=(document.getElementById('search')?.value||p.get('q')||'').toLowerCase(),
 cat=window.CATEGORY_PAGE?p.get('category'):(document.getElementById('category')?.value||p.get('category')||''),
 offer=document.getElementById('offer')?.value||'', ver=document.getElementById('verified')?.checked;
 if(cat) list=list.filter(r=>r.category===cat);
 if(offer) list=list.filter(r=>r.offerType===offer);
 if(ver) list=list.filter(r=>/yes|true/i.test(r.baggVerified)||/verified/i.test(r.status));
 if(q) list=list.filter(r=>[r.name,r.provider,r.category,r.offerType,r.description,r.benefit,(r.tags||[]).join(' ')].join(' ').toLowerCase().includes(q));
 document.getElementById('cards').innerHTML=list.map(card).join('');
 document.getElementById('count').textContent=list.length;
}
fetch('data/resources.json').then(r=>r.json()).then(data=>{
 all=data; fillSelect('category',unique('category')); fillSelect('offer',unique('offerType'));
 const p=new URLSearchParams(location.search), cat=p.get('category'), q=p.get('q');
 if(window.CATEGORY_PAGE && cat) document.getElementById('categoryTitle').textContent=cat;
 if(document.getElementById('category')&&cat) document.getElementById('category').value=cat;
 if(document.getElementById('search')&&q) document.getElementById('search').value=q;
 document.querySelectorAll('.controls input,.controls select').forEach(x=>x.addEventListener('input',render));
 render();
});