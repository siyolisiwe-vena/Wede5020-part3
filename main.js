/* WEDE5020 Part 3 - interactivity + form validation */
document.addEventListener('DOMContentLoaded', () => {
  initAccordion(); initLightbox(); initEvents(); initMap();
  initEnquiry(); initContact();
});

/* ---------- Accordion ---------- */
function initAccordion(){
  document.querySelectorAll('.accordion-btn').forEach(btn=>{
    btn.setAttribute('aria-expanded','false');
    btn.addEventListener('click',()=>{
      const p=btn.nextElementSibling, open=p.classList.toggle('open');
      p.style.maxHeight=open?p.scrollHeight+40+'px':null;
      btn.setAttribute('aria-expanded',open);
    });
  });
}

/* ---------- Gallery lightbox ---------- */
function initLightbox(){
  const imgs=[...document.querySelectorAll('.gallery img')], lb=document.getElementById('lightbox');
  if(!imgs.length||!lb) return;
  const big=lb.querySelector('img'); let i=0;
  const show=n=>{i=(n+imgs.length)%imgs.length;big.src=imgs[i].dataset.large||imgs[i].src;big.alt=imgs[i].alt;lb.classList.add('show');};
  const hide=()=>lb.classList.remove('show');
  imgs.forEach((im,n)=>im.addEventListener('click',()=>show(n)));
  document.getElementById('lb-close').onclick=hide;
  document.getElementById('lb-prev').onclick=()=>show(i-1);
  document.getElementById('lb-next').onclick=()=>show(i+1);
  lb.addEventListener('click',e=>{if(e.target===lb)hide();});
  document.addEventListener('keydown',e=>{if(!lb.classList.contains('show'))return;
    if(e.key==='Escape')hide();if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1);});
}

/* ---------- Dynamic content: load, search, filter, sort ---------- */
const EVENTS=[ /* EDIT: replace with your own services/products/events */
 {title:'Youth Skills Workshop',cat:'Youth',date:'2026-11-05',price:0},
 {title:'Community Food Drive',cat:'Food',date:'2026-11-12',price:0},
 {title:'Volunteer Orientation',cat:'Volunteering',date:'2026-11-20',price:0},
 {title:'Charity Fun Run',cat:'Fundraising',date:'2026-12-01',price:150},
 {title:'Youth Sports Day',cat:'Youth',date:'2026-12-08',price:50},
 {title:'Winter Clothing Collection',cat:'Food',date:'2026-12-15',price:0}];
function initEvents(){
  const box=document.getElementById('eventCards'); if(!box) return;
  const q=document.getElementById('search'),f=document.getElementById('filter'),s=document.getElementById('sort');
  [...new Set(EVENTS.map(e=>e.cat))].forEach(c=>f.add(new Option(c,c)));
  const render=()=>{
    let list=EVENTS.filter(e=>e.title.toLowerCase().includes(q.value.toLowerCase())||e.cat.toLowerCase().includes(q.value.toLowerCase()))
      .filter(e=>!f.value||e.cat===f.value);
    list.sort((a,b)=>s.value==='az'?a.title.localeCompare(b.title):s.value==='price'?a.price-b.price:a.date.localeCompare(b.date));
    box.innerHTML=list.length?list.map(e=>`<article class="card"><h3>${e.title}</h3><p>${e.cat} &middot; ${e.date}</p><p>${e.price?'R'+e.price:'Free'}</p></article>`).join(''):'<p>No matching results.</p>';
  };
  [q,f,s].forEach(el=>el.addEventListener('input',render)); render();
}

/* ---------- Leaflet map ---------- */
function initMap(){
  const el=document.getElementById('map'); if(!el||typeof L==='undefined') return;
  const pos=[-26.2041,28.0473]; /* EDIT: your organisation's coordinates */
  const map=L.map('map').setView(pos,13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
  L.marker(pos).addTo(map).bindPopup('<strong>Our Office</strong><br>Visit us Mon-Fri 8am-4pm').openPopup();
}

/* ---------- Validation helpers ---------- */
const RULES={
  name:v=>/^[A-Za-z][A-Za-z\s'-]{1,49}$/.test(v.trim())||'Enter a valid name (2-50 letters).',
  email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())||'Enter a valid email, e.g. name@example.com.',
  phone:v=>/^(\+27|0)[0-9]{9}$/.test(v.replace(/\s/g,''))||'Enter a valid SA number, e.g. 0821234567.',
  select:v=>v!==''||'Please choose an option.',
  message:v=>(v.trim().length>=20&&v.trim().length<=500)||'Message must be 20-500 characters.',
  date:v=>(v!==''&&new Date(v)>=new Date(new Date().toDateString()))||'Choose today or a future date.'
};
function validate(form){
  let ok=true;
  form.querySelectorAll('[data-rule]').forEach(inp=>{
    const r=RULES[inp.dataset.rule](inp.value), err=inp.parentElement.querySelector('.error');
    if(r!==true){ok=false;err.textContent=r;inp.classList.add('invalid');}
    else{err.textContent='';inp.classList.remove('invalid');}
  });
  return ok;
}
function liveClear(form){form.querySelectorAll('[data-rule]').forEach(i=>i.addEventListener('input',()=>{
  if(RULES[i.dataset.rule](i.value)===true){i.classList.remove('invalid');i.parentElement.querySelector('.error').textContent='';}}));}

/* ---------- enquiry.html ---------- */
function initEnquiry(){
  const form=document.getElementById('enquiryForm'); if(!form) return;
  liveClear(form);
  form.addEventListener('submit',async e=>{
    e.preventDefault(); const out=document.getElementById('response');
    if(!validate(form)){out.hidden=true;return;}
    const d=Object.fromEntries(new FormData(form));
    const people=Math.max(1,parseInt(d.people)||1);
    const info={ /* EDIT: your own costs/availability */
      service:{cost:'R100 per person',avail:'Available Mon-Sat'},
      product:{cost:'R250 per item',avail:'In stock - ships in 3 days'},
      volunteer:{cost:'Free to join',avail:'Next orientation: 20 Nov 2026'},
      sponsor:{cost:'Packages from R1 000',avail:'Slots open for 2027'}}[d.type];
    const total=d.type==='service'?100*people:d.type==='product'?250*people:null;
    out.innerHTML=`<h3>Thank you, ${d.name}!</h3><p><strong>Cost:</strong> ${info.cost}${total?` (estimated total R${total} for ${people})`:''}</p><p><strong>Availability:</strong> ${info.avail} for ${d.date}.</p><p>We will also reply to ${d.email}.</p>`;
    out.hidden=false; out.scrollIntoView({behavior:'smooth'});
    if(!form.action.includes('YOUR_FORM_ID')){ /* AJAX submit, no page reload */
      try{await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});}catch(_){}
    }
    form.reset();
  });
}

/* ---------- contact.html ---------- */
function initContact(){
  const form=document.getElementById('contactForm'); if(!form) return;
  liveClear(form);
  const RECIPIENT='info@yourorganisation.org'; /* EDIT: recipient email */
  form.addEventListener('submit',e=>{
    e.preventDefault(); const out=document.getElementById('response');
    if(!validate(form)){out.hidden=true;return;}
    const d=Object.fromEntries(new FormData(form));
    const subject=encodeURIComponent(`[${d.type}] Message from ${d.name}`);
    const body=encodeURIComponent(`Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone}\nMessage type: ${d.type}\n\n${d.message}`);
    out.innerHTML=`<h3>Your email is ready</h3><p>Click below to open it in your email app and send it to ${RECIPIENT}.</p><a class="btn" href="mailto:${RECIPIENT}?subject=${subject}&body=${body}">Send Email</a>`;
    out.hidden=false; out.scrollIntoView({behavior:'smooth'});
  });
}