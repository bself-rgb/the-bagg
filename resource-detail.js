const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
fetch('data/resources.json').then(r=>r.json()).then(all=>{
 const slug=new URLSearchParams(location.search).get('slug'), r=all.find(x=>x.slug===slug), el=document.getElementById('detail');
 if(!r){el.innerHTML='<h1>Resource not found</h1>';return}
 const verified=/yes|true/i.test(r.baggVerified)||/verified/i.test(r.status);
 document.title=r.name+' | The BAGG';
 el.innerHTML=`<div class="badges"><span>${esc(r.offerType)}</span>${verified?'<span class="verified">BAGG VERIFIED</span>':'<span class="review">NEEDS REVIEW</span>'}</div>
 <h1 class="page-title">${esc(r.name)}</h1><p class="provider big-provider">${esc(r.provider)}</p><p class="lede">${esc(r.description)}</p>
 <section class="info-panel"><h2>What you get</h2><p>${esc(r.benefit||'See the official source for current benefits and details.')}</p>
 <div class="facts"><div><b>Category</b>${esc(r.category)}</div><div><b>Eligibility</b>${esc(r.requires501c3||'Varies')}</div>
 <div><b>New nonprofits</b>${esc(r.newNonprofits||'Varies')}</div><div><b>Geography</b>${esc(r.geography||'Varies')}</div>
 <div><b>Application required?</b>${esc(r.applicationRequired||'Varies')}</div><div><b>Status</b>${esc(r.status||'Needs Review')}</div></div>
 <div class="actions">${r.officialUrl?`<a class="btn" target="_blank" rel="noopener" href="${esc(r.officialUrl)}">Visit official site ↗</a>`:''}
 ${r.applyUrl&&r.applyUrl!==r.officialUrl?`<a class="btn ghost" target="_blank" rel="noopener" href="${esc(r.applyUrl)}">Apply / Learn More ↗</a>`:''}</div></section>`;
});