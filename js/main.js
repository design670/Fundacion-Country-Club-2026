/* ---------- Íconos ---------- */
const ICONS = {
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5"/><circle cx="17" cy="7" r="2.5"/><path d="M16 12.6c2.9-.3 4.9 1.5 5.5 4.4"/></svg>',
  leaf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15"/><path d="M5 19c3-4 6-7 10-9"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10C19.5 15.6 12 20 12 20Z"/></svg>',
  target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".8" fill="currentColor"/></svg>',
  link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
  box:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>'
};
document.querySelectorAll("[data-icon]").forEach(el => el.innerHTML = ICONS[el.dataset.icon] || "");

/* ---------- Visuales generados con las formas del logo ---------- */
const PAL = {
  navy:  ["#1D4C65","#133A4E","#279A68","#F6A233","#FFFFFF"],
  green: ["#279A68","#1E7C54","#1D4C65","#F6A233","#FFFFFF"],
  orange:["#F6A233","#F9C979","#1D4C65","#279A68","#FFFFFF"],
  sand:  ["#FAF5F2","#EFE6E0","#279A68","#1D4C65","#F6A233"]
};
function rng(seed){ return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function genArt(seed, palName){
  const c = PAL[palName] || PAL.navy, r = rng(seed * 9973), W = 600, H = 700, id = "g" + seed + palName;
  const R = (a,b) => a + r() * (b - a);
  let blobs = "";
  for(let i=0;i<3;i++) blobs += `<circle cx="${R(0,W)}" cy="${R(0,H)}" r="${R(140,240)}" fill="${c[2+i]}" opacity="${R(.25,.45).toFixed(2)}"/>`;
  const x0 = R(60,200), y0 = R(380,520), x1 = R(380,540), y1 = R(160,320);
  const ribbon1 = `M ${x0} ${y0} C ${x0-120} ${y0-200}, ${x0+180} ${y0-260}, ${W/2} ${H/2} S ${x1+140} ${y1+300}, ${x1} ${y1+40}`;
  const ribbon2 = `M ${x0+40} ${y0+60} C ${x0+140} ${y0+200}, ${x1-40} ${y0+120}, ${x1+30} ${y1+80}`;
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient>
    <filter id="${id}b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="60"/></filter></defs>
    <rect width="${W}" height="${H}" fill="url(#${id})"/>
    <g filter="url(#${id}b)">${blobs}</g>
    <path d="${ribbon2}" fill="none" stroke="${c[3]}" stroke-width="62" stroke-linecap="round" opacity=".95"/>
    <path d="${ribbon1}" fill="none" stroke="${c[2]}" stroke-width="70" stroke-linecap="round"/>
    <circle cx="${x0+10}" cy="${y1-40}" r="44" fill="${c[3]}"/>
    <circle cx="${x1+20}" cy="${y1-120}" r="54" fill="${c[4]}" opacity=".95"/>
  </svg>`;
}
document.querySelectorAll(".gen[data-seed]").forEach(el => {
  if(el.dataset.img){ const im = new Image(); im.src = el.dataset.img; im.alt = el.dataset.alt || ""; im.decoding = "async"; el.prepend(im); }
  else el.insertAdjacentHTML("afterbegin", genArt(+el.dataset.seed, el.dataset.pal));
});


/* ---------- Máscara de pincel en fotos ---------- */
const BR=["var(--brush-a)","var(--brush-b)","var(--brush-c)"];
function brushPhotos(root){
  root.querySelectorAll(".gen[data-img]:not(.brushed)").forEach((g,i) => {
    g.classList.add("brushed"); g.style.setProperty("--brush", BR[i % 3]);
    if(g.closest(".pin-media, .mm-card")) return;
    const f = document.createElement("div");
    f.className = "brush-frame f-" + (g.dataset.pal || "orange");
    ["reveal"].forEach(c => { if(g.classList.contains(c)){ g.classList.remove(c); f.classList.add(c); } });
    const d = g.style.getPropertyValue("--d"); if(d) f.style.setProperty("--d", d);
    g.parentNode.insertBefore(f, g); f.appendChild(g);
  });
  root.querySelectorAll(".pin-media:not(.brushed)").forEach(m => { m.classList.add("brushed"); m.style.setProperty("--brush","var(--brush-c)"); });
}
brushPhotos(document);


/* ---------- Forma orgánica detrás de las fotos ---------- */
function blobSVG(seed, fill){
  const r = rng(seed), N = 9, pts = [];
  for(let i=0;i<N;i++){ const a = i/N*Math.PI*2, rad = 200 * (0.72 + 0.34*Math.sin(i*2.3+seed) * (i%2?1:.55) + r()*.12); pts.push([260+Math.cos(a)*rad, 260+Math.sin(a)*rad]); }
  let d = "M" + pts[0].map(v=>v.toFixed(1)).join(" ");
  for(let i=0;i<N;i++){ const p0=pts[(i-1+N)%N], p1=pts[i], p2=pts[(i+1)%N], p3=pts[(i+2)%N];
    const c1=[p1[0]+(p2[0]-p0[0])/6, p1[1]+(p2[1]-p0[1])/6], c2=[p2[0]-(p3[0]-p1[0])/6, p2[1]-(p3[1]-p1[1])/6];
    d += " C"+[c1,c2,p2].map(p=>p.map(v=>v.toFixed(1)).join(" ")).join(", "); }
  return '<svg viewBox="0 0 520 520" fill="none"><path d="'+d+'Z" fill="'+fill+'"/><path d="M70 430c18-14 40-22 62-24" stroke="#16313F" stroke-width="4" stroke-linecap="round"/><path d="M86 452c14-9 30-14 46-15" stroke="#16313F" stroke-width="4" stroke-linecap="round"/></svg>';
}
document.querySelectorAll(".mm-card-wrap").forEach(w => {
  w.style.setProperty("--blob", 'url("data:image/svg+xml,' + encodeURIComponent(shapeSVG("flower", "#279A68", 71)) + '")');
  w.style.setProperty("--blob2", 'url("data:image/svg+xml,' + encodeURIComponent(shapeSVG("strokes", "#F6A233", 72)) + '")');
});
document.querySelectorAll(".aporte-row").forEach(w => w.style.setProperty("--blob", 'url("data:image/svg+xml,' + encodeURIComponent(shapeSVG("flower", "#279A68", 95)) + '")'));
document.querySelectorAll(".band-final-wrap").forEach(w => {
  w.style.setProperty("--blob", 'url("data:image/svg+xml,' + encodeURIComponent(shapeSVG("flower", "#F6A233", 81)) + '")');
  w.style.setProperty("--blob2", 'url("data:image/svg+xml,' + encodeURIComponent(shapeSVG("strokes", "#1D4C65", 82)) + '")');
});
document.querySelectorAll(".ct-panel-wrap").forEach(w => {
  w.style.setProperty("--blob", 'url("data:image/svg+xml,' + encodeURIComponent(shapeSVG("flower", "#F6A233", 63)) + '")');
  w.style.setProperty("--blob2", 'url("data:image/svg+xml,' + encodeURIComponent(shapeSVG("strokes", "#279A68", 64)) + '")');
});
document.querySelectorAll(".stack-blob").forEach(b => b.innerHTML = blobSVG(7, "#8FD1B0"));

/* ---------- Subrayado a mano en palabras destacadas de los títulos ---------- */
const SCRIBBLE = '<svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M3 12 C 40 5, 90 3, 140 6 S 196 12 197 9 C 170 13, 120 16, 60 17"/></svg>';
document.querySelectorAll("main h2 em, main h1 em, footer h2 em").forEach(em => {
  em.classList.add("scribble"); em.insertAdjacentHTML("beforeend", SCRIBBLE);
});
const drawIO = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add("drawn"); drawIO.unobserve(e.target); } }), {rootMargin:"0px 0px -20% 0px"}) : null;
function armScribbles(scope){ scope.querySelectorAll(".scribble:not(.drawn)").forEach(el => drawIO ? drawIO.observe(el) : el.classList.add("drawn")); }

/* ---------- Tarjetas con inercia al pasar el mouse ---------- */
const BLOB_COLORS = {navy:"#A9C9DA", green:"#8FD1B0", orange:"#F8C77E", sand:"#EADFD8"};
const TILTS = [-4, 3.5, -3, 4, -3.5, 2.5];
document.querySelectorAll(".brush-frame").forEach((f,i) => {
  const g = f.querySelector(".gen"); if(!g) return;
  const col = BLOB_COLORS[(f.className.match(/f-(\w+)/)||[])[1]] || "#F8C77E";
  f.style.setProperty("--blob", 'url("data:image/svg+xml,' + encodeURIComponent(blobSVG(11 + i*5, col).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')) + '")');
  g.dataset.rot = TILTS[i % TILTS.length]; g.classList.add("tilt");
});
const bodies = [...document.querySelectorAll(".ptk, .bubble, .tilt")].map(el => ({el, rot:+el.dataset.rot||0, y:+el.dataset.y||0, x:0, vx:0, vy:0, oy:0, r:0, vr:0}));
function paint(b){ b.el.style.transform = "translate("+b.x.toFixed(2)+"px,"+(b.y+b.oy).toFixed(2)+"px) rotate("+(b.rot+b.r).toFixed(2)+"deg)"; }
bodies.forEach(paint);
if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
  let mx = 0, my = 0, pmx = 0, pmy = 0, running = false;
  addEventListener("pointermove", e => {
    const dx = e.clientX - pmx, dy = e.clientY - pmy; pmx = e.clientX; pmy = e.clientY;
    if(Math.abs(dx) > 60 || Math.abs(dy) > 60) return;
    bodies.forEach(b => {
      const r = b.el.getBoundingClientRect();
      if(e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom){
        b.vx += dx * .06; b.vy += dy * .06; b.vr += dx * .015;
      }
    });
    if(!running){ running = true; requestAnimationFrame(step); }
  }, {passive:true});
  function step(){
    let moving = false;
    bodies.forEach(b => {
      b.vx += -b.x * .035; b.vy += -b.oy * .035; b.vr += -b.r * .035;
      b.vx *= .82; b.vy *= .82; b.vr *= .82;
      b.x = Math.max(-12, Math.min(12, b.x + b.vx)); b.oy = Math.max(-12, Math.min(12, b.oy + b.vy)); b.r = Math.max(-1.5, Math.min(1.5, b.r + b.vr));
      if(Math.abs(b.x) + Math.abs(b.oy) + Math.abs(b.r) + Math.abs(b.vx) + Math.abs(b.vy) > .05) moving = true;
      paint(b);
    });
    if(moving) requestAnimationFrame(step); else running = false;
  }
}

/* ---------- Globo del cursor ---------- */
if(matchMedia("(pointer:fine)").matches){
  const tag = document.createElement("div"); tag.className = "cur-tag"; tag.innerHTML = "<span></span>"; document.body.appendChild(tag);
  let tx = -100, ty = -100, cx = -100, cy = -100, rot = 0, raf = null;
  const loop = () => { const px = cx; cx += (tx - cx) * .22; cy += (ty - cy) * .22; rot += (((cx - px) * .8) - rot) * .2; tag.style.transform = "translate("+cx+"px,"+cy+"px) rotate("+Math.max(-18,Math.min(18,rot)).toFixed(2)+"deg)"; raf = requestAnimationFrame(loop); };
  addEventListener("pointermove", e => { tx = e.clientX; ty = e.clientY; if(!raf) raf = requestAnimationFrame(loop);
    const t = e.target.closest("[data-cursor]");
    if(t){ tag.firstChild.textContent = t.dataset.cursor; tag.classList.add("on"); } else tag.classList.remove("on");
  }, {passive:true});
  document.addEventListener("pointerleave", () => tag.classList.remove("on"));
}



/* ---------- Título horizontal con letras que se acomodan al hacer scroll ---------- */
const HW = (function(){
  const sec = document.getElementById("hwords"); if(!sec) return null;
  const title = sec.querySelector(".hwords-title"), track = sec.querySelector(".hwords-track");
  const sticker = sec.querySelector(".hwords-sticker"), arc = sec.querySelector(".hwords-arc"), arcPath = arc.querySelector("path");
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const words = [["Comprometidos"],["con"],["el"],["bienestar"],["que"],["deja"],["huella.",1]];
  const r = rng(314);
  title.innerHTML = words.map(([w,em],wi) => {
    const letters = [...w].map(ch => '<span class="l" aria-hidden="true" data-y="'+(RM?0:(r()*460-230).toFixed(0))+'" data-r="'+(RM?0:(r()*60-30).toFixed(1))+'">'+ch+'</span>').join("");
    const inner = em ? '<em class="scribble">'+letters+SCRIBBLE+'</em>' : letters;
    return '<span class="w">'+inner+'</span>' + (wi < words.length-1 ? '<span class="sp"></span>' : '');
  }).join("");
  const L = [...title.querySelectorAll(".l")];
  const emWord = title.querySelector("em");
  const lastWord = title.querySelector(".w:last-child");
  let x0 = 0, x1 = 0, W = innerWidth;
  function layout(){
    W = innerWidth;
    track.style.transform = ""; L.forEach(l => l.style.transform = "");
    const tw = title.scrollWidth;
    x0 = W * .5; x1 = W * .62 - tw;
    const pinH = sec.querySelector(".hwords-pin").offsetHeight;
    if(!RM) sec.style.height = (pinH + (x0 - x1) * .95 + 160) + "px"; else sec.style.height = "";
    const tRect = title.getBoundingClientRect();
    L.forEach(l => { const rr = l.getBoundingClientRect(); l._x = rr.left - tRect.left; });
    const eR = emWord.getBoundingClientRect(), gR = lastWord.getBoundingClientRect();
    /* el logo va después del punto final, centrado con la altura del texto */
    const sLeft = gR.right - tRect.left + gR.height * .14;
    sticker.style.left = sLeft + "px"; sticker.style.top = (title.offsetTop + (title.offsetHeight - sticker.offsetHeight) / 2) + "px";
    arc.style.left = (gR.left - tRect.left + gR.width * .1) + "px"; arc.style.top = "-38%";
    sticker._x = sLeft + sticker.offsetWidth * .5; arc._x = gR.left - tRect.left + gR.width * .5;
  }
  const easeBack = t => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
  function update(){
    if(RM || sec.closest("[hidden]")) return;
    const rect = sec.getBoundingClientRect();
    const pinH = sec.querySelector(".hwords-pin").offsetHeight, stickTop = innerHeight * .22 - 90;
    const span = Math.max(1, rect.height - pinH - 160);
    const p = Math.min(1, Math.max(0, (stickTop - rect.top) / span));
    const tx = x0 + (x1 - x0) * p;
    track.style.transform = "translateX(" + tx.toFixed(1) + "px)";
    L.forEach(l => {
      const sx = tx + l._x;
      const t = Math.min(1, Math.max(0, (W * 1.02 - sx) / (W * .34)));
      const e = 1 - easeBack(t);
      l.style.transform = "translateY(" + (+l.dataset.y * e).toFixed(1) + "%) rotate(" + (+l.dataset.r * e).toFixed(2) + "deg)";
    });
    const ts = Math.min(1, Math.max(0, (W * 1.02 - (tx + sticker._x)) / (W * .13)));
    sticker.style.transform = "scale(" + easeBack(ts).toFixed(3) + ") rotate(" + (-30 + 30 * ts).toFixed(1) + "deg)";
    const ta = Math.min(1, Math.max(0, (W * .85 - (tx + arc._x)) / (W * .3)));
    arcPath.style.strokeDashoffset = (1 - ta).toFixed(3);
    if(ts > .6) emWord.classList.add("drawn");
  }
  addEventListener("resize", () => { layout(); update(); });
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(() => { layout(); update(); });
  layout(); update();
  return {layout, update};
})();
addEventListener("scroll", () => { if(HW) requestAnimationFrame(HW.update); }, {passive:true});

/* ---------- Formas vectoriales detrás de las fotos (flor, trazos de pincel, flor con garabatos) ---------- */
function shapeSVG(type, color, seed){
  const r = rng(seed * 131 + 7);
  const doodle = '<path d="M40 548c26-20 58-32 92-35" stroke="#16313F" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M62 580c20-13 44-21 68-22" stroke="#16313F" stroke-width="7" stroke-linecap="round" fill="none"/>';
  if(type === "strokes"){
    const w = [150, 92, 70];
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" fill="none">' +
      '<path d="M110 130 C 230 110, 320 230, 380 320 S 470 460, 500 490" stroke="'+color+'" stroke-width="'+w[0]+'" stroke-linecap="round"/>' +
      '<path d="M80 270 C 170 270, 250 350, 300 430 S 360 520, 390 540" stroke="'+color+'" stroke-width="'+w[1]+'" stroke-linecap="round"/>' +
      '<path d="M230 80 C 330 80, 430 160, 510 270" stroke="'+color+'" stroke-width="'+w[2]+'" stroke-linecap="round"/></svg>';
  }
  const K = 5 + Math.floor(r()*2), sc = type === "doodle" ? .86 : 1;
  let petals = '<circle cx="300" cy="300" r="'+(125*sc).toFixed(0)+'" fill="'+color+'"/>';
  for(let k=0;k<K;k++){
    const a = k/K*360 + (r()-.5)*28, L = (120 + r()*70)*sc, rx = (95 + r()*55)*sc, ry = (68 + r()*30)*sc;
    petals += '<ellipse cx="'+(300+L).toFixed(0)+'" cy="300" rx="'+rx.toFixed(0)+'" ry="'+ry.toFixed(0)+'" fill="'+color+'" transform="rotate('+a.toFixed(1)+' 300 300)"/>';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" fill="none">' + petals + (type === "doodle" ? doodle : "") + '</svg>';
}
const SHAPES = [["flower","#279A68"], ["strokes","#F6A233"], ["doodle","#1D4C65"], ["strokes","#279A68"], ["flower","#F6A233"], ["doodle","#279A68"]];
document.querySelectorAll(".brush-frame").forEach((f,i) => {
  const [type, col] = SHAPES[i % SHAPES.length];
  f.style.setProperty("--blob", 'url("data:image/svg+xml,' + encodeURIComponent(shapeSVG(type, col, 21 + i)) + '")');
  /* La forma sale hacia el lado contrario al texto: foto en la columna izquierda → hacia la izquierda; en la derecha → hacia la derecha */
  if(f.previousElementSibling) f.classList.add("flip");
});
document.querySelectorAll(".stack-blob").forEach(b => b.innerHTML = shapeSVG("doodle", "#279A68", 5));
document.querySelectorAll(".pin-media").forEach(m => {
  const w = document.createElement("div"); w.className = "pin-media-wrap";
  w.style.setProperty("--blob", 'url("data:image/svg+xml,' + encodeURIComponent(shapeSVG("flower", "#F6A233", 41)) + '")');
  m.parentNode.insertBefore(w, m); w.appendChild(m);
});



/* ---------- WhatsApp: el botón flotante es un enlace directo al chat (https://wa.me/573176453695) ---------- */


/* ---------- Logo gigante del footer: sube al entrar en pantalla ---------- */
(function(){ const m = document.querySelector(".fmega"); if(!m) return;
  if("IntersectionObserver" in window) new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting) m.classList.add("in"); }), {threshold:.3}).observe(m); else m.classList.add("in"); })();

/* ---------- Portada: dos videos y dos copys que se turnan al terminar cada video ---------- */
(function(){
  const hero = document.getElementById("heroSheet"); if(!hero) return;
  const vids = [...hero.querySelectorAll(".hv")], slides = [...hero.querySelectorAll(".hslide")], dots = [...hero.querySelectorAll(".hdot")];
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let cur = 0, timer = null, t0 = 0;
  const SLIDE = 8; /* segundos máximos por video */
  const dur = v => Math.min(SLIDE, isFinite(v.duration) && v.duration > 0 ? v.duration : SLIDE);
  vids.forEach(v => { v.muted = true; });
  const replay = el => { el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; };
  function show(n){
    const prev = cur; cur = (n + vids.length) % vids.length;
    vids.forEach((v,i) => v.classList.toggle("on", i === cur));
    /* un solo copy fijo (el del documento) mientras los videos rotan; si hubiera varios, rotan con los videos */
    const si = cur % slides.length;
    slides.forEach((sl,i) => { sl.classList.toggle("on", i === si); sl.setAttribute("aria-hidden", String(i !== si)); });
    dots.forEach((d,i) => { d.classList.toggle("on", i === cur); d.style.setProperty("--p", i < cur ? 1 : 0); });
    const sl = slides[si];
    if(prev !== cur && slides.length > 1){
      sl.querySelectorAll(".hw,.fade-up").forEach(replay);
      sl.querySelectorAll(".scribble").forEach(sc => { sc.classList.remove("drawn"); void sc.offsetWidth; requestAnimationFrame(() => sc.classList.add("drawn")); });
    }
    const v = vids[cur];
    if(RM){ v.pause(); return; }
    try { v.currentTime = 0; } catch(e){}
    const p = v.play(); if(p && p.catch) p.catch(() => {});
    vids.forEach((o,i) => { if(i !== cur) setTimeout(() => { if(!o.classList.contains("on")) o.pause(); }, 1200); });
    t0 = performance.now(); clearTimeout(timer); timer = setTimeout(() => show(cur + 1), dur(v) * 1000);
  }
  vids.forEach((v,i) => {
    v.addEventListener("ended", () => { if(i === cur) show(cur + 1); });
    v.addEventListener("loadedmetadata", () => { if(i === cur && !RM){ clearTimeout(timer); timer = setTimeout(() => show(cur + 1), Math.max(0, dur(v) * 1000 - (performance.now() - t0))); } });
  });
  (function tick(){ if(!RM) dots[cur].style.setProperty("--p", Math.min(1, (performance.now() - t0) / (dur(vids[cur]) * 1000))); requestAnimationFrame(tick); })();
  dots.forEach((d,i) => d.addEventListener("click", () => show(i)));
  if(RM){ vids.forEach(v => { v.removeAttribute("autoplay"); v.pause(); }); dots.forEach(d => d.style.setProperty("--p", 0)); }
  else show(0);
})();

/* ---------- Transición entre páginas ---------- */
(function(){
  const pt = document.getElementById("pageTransition"); if(!pt) return;
  const COLORS = ["#279A68", "#F6A233", "#1D4C65"];
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let busy = false, n = 0;
  const wait = ms => new Promise(r => setTimeout(r, ms));
  async function go(hash){
    if(busy) return; busy = true;
    pt.style.setProperty("--pt-color", COLORS[n++ % COLORS.length]);
    pt.classList.remove("reveal"); pt.classList.add("active");
    void pt.offsetWidth;
    pt.classList.add("cover");
    await wait(300); pt.classList.add("show-logo");
    await wait(260);
    if(location.hash === hash) route(); else location.hash = hash;
    await wait(160);
    pt.classList.remove("show-logo");
    await wait(60);
    pt.classList.remove("cover"); pt.classList.add("reveal");
    await wait(580);
    pt.classList.remove("active", "reveal");
    busy = false;
  }
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#"]');
    if(!a || RM || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const h = a.getAttribute("href"), page = h.slice(1);
    if(!PAGES.includes(page)) return;
    const current = (location.hash || "#inicio").slice(1);
    if(page === current && !a.dataset.filter) return;
    e.preventDefault();
    go(h);
  });
})();


/* ---------- Textos que se encienden con el scroll (Inicio después de "Más que una Fundación" y páginas internas sin su portada) ---------- */
(function(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const start = document.getElementById("hwords"); if(!start) return;
  const page = start.closest("[data-page]");
  const SKIP = ".card,.pin-item,.pending,.prog,.way,.icard,.formcard,.cta,.hwords";
  const inicio = [...page.querySelectorAll("h2, p.hwords-lead, p.muted, p.lead")]
    .filter(el => (start.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) && !el.closest(SKIP) && !start.contains(el));
  const internas = [...document.querySelectorAll("[data-page]:not([data-page='inicio'])")].flatMap(pg => [...pg.querySelectorAll("h2, p.muted, p.lead")])
    .filter(el => !el.closest(SKIP + ",.hero-sheet,.ct-hero"));
  const targets = inicio.concat(internas);
  const items = targets.map(el => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentNode.closest("svg") || !n.nodeValue.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    const nodes = []; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
      const frag = document.createDocumentFragment();
      n.nodeValue.split(/(\s+)/).forEach(part => {
        if(!part) return;
        if(/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
        else { const sp = document.createElement("span"); sp.className = "sw"; sp.textContent = part; frag.appendChild(sp); }
      });
      n.parentNode.replaceChild(frag, n);
    });
    return { el, words: [...el.querySelectorAll(".sw")], lit: -1 };
  });
  function update(){
    const vh = innerHeight;
    items.forEach(it => {
      const r = it.el.getBoundingClientRect(); if(!r.height) return;
      /* se completa cuando el texto ya está bien dentro de la pantalla, o cuando su sección llegó arriba (para que nunca quede a medias) */
      const sec = it.sec || (it.sec = it.el.closest("section") || it.el);
      const p = sec.getBoundingClientRect().top <= vh * .14 ? 1 : Math.min(1, Math.max(0, (vh * .92 - r.top) / (r.height + vh * .14)));
      const n = Math.round(p * it.words.length);
      if(n === it.lit) return; it.lit = n;
      it.words.forEach((w,i) => w.classList.toggle("on", i < n));
    });
  }
  let raf = 0;
  addEventListener("scroll", () => { if(!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); }, {passive:true});
  addEventListener("resize", update); addEventListener("hashchange", () => setTimeout(update, 60));
  update();
})();



/* ---------- Noticias: carrusel de la noticia destacada ---------- */
(function(){
  const hero = document.getElementById("newsHero"); if(!hero) return;
  const slides = [...hero.querySelectorAll(".nh-slide")], dots = [...hero.querySelectorAll(".nh-dots button")];
  const T = 6000; hero.style.setProperty("--nh-t", T + "ms");
  let idx = 0, timer = 0;
  function go(i){
    idx = (i + slides.length) % slides.length;
    slides.forEach((sl, k) => sl.classList.toggle("on", k === idx));
    dots.forEach((d, k) => d.setAttribute("aria-selected", String(k === idx)));
    clearTimeout(timer);
    if(!matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setTimeout(() => go(idx + 1), T);
  }
  dots.forEach(d => d.addEventListener("click", () => go(+d.dataset.i)));
  if("IntersectionObserver" in window) new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting) go(idx); else clearTimeout(timer); })).observe(hero);
  else go(0);
})();


/* ---------- Impacto: historias en video vertical ---------- */
(function(){
  const sec = document.getElementById("videoStories"); if(!sec) return;
  const track = sec.querySelector(".vst-track"), cards = [...sec.querySelectorAll(".vst-card")];
  const play = c => { cards.forEach(o => { if(o !== c) stop(o); }); const v = c.querySelector("video"); c.classList.add("playing"); const p = v.play(); p && p.catch(() => c.classList.remove("playing")); };
  const stop = c => { const v = c.querySelector("video"); c.classList.remove("playing"); v.pause(); };
  cards.forEach(c => {
    c.addEventListener("mouseenter", () => play(c));
    c.addEventListener("mouseleave", () => stop(c));
    c.addEventListener("click", () => c.classList.contains("playing") && !matchMedia("(hover:hover)").matches ? stop(c) : play(c));
    c.addEventListener("keydown", e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); c.classList.contains("playing") ? stop(c) : play(c); } });
  });
  sec.querySelectorAll(".vst-arrows button").forEach(b => b.addEventListener("click", () => {
    const step = cards[0].offsetWidth + parseFloat(getComputedStyle(track).columnGap || 16);
    track.scrollBy({left: +b.dataset.dir * step * 2});
  }));
  if("IntersectionObserver" in window) new IntersectionObserver(es => es.forEach(e => { if(!e.isIntersecting) cards.forEach(stop); })).observe(sec);
})();


/* ---------- Impacto por enfoque: selector de propuesta A/B (solo prototipo) ---------- */
document.querySelectorAll(".vswitch").forEach(sw => sw.addEventListener("click", e => {
  const b = e.target.closest("button"); if(!b) return;
  sw.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  sw.parentElement.querySelectorAll(":scope > [data-v]").forEach(el => {
    el.hidden = el.dataset.v !== b.dataset.v;
    if(!el.hidden){ el.classList.remove("pre"); el.querySelectorAll(".reveal").forEach(r => r.classList.remove("pre")); el.querySelectorAll("[data-count]").forEach(armCount); }
  });
}));


/* ---------- Nuestro impacto: carrusel de cifras (puntos y avance automático) ---------- */
(function(){
  const car = document.getElementById("statCar"); if(!car) return;
  const track = car.querySelector(".istat-track"), dotsBox = car.querySelector(".istat-dots");
  const items = [...track.querySelectorAll(".istat")];
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches, T = 4000;
  let pages = [], page = 0, timer = 0, visible = false, hover = false;
  const itemW = () => items[0].getBoundingClientRect().width;
  function build(){
    if(!itemW()) return;
    const per = Math.max(1, Math.round(track.clientWidth / itemW()));
    const max = Math.max(0, items.length - per);
    pages = []; for(let i = 0; i < items.length; i += per) pages.push(Math.min(i, max));
    pages = [...new Set(pages)];
    dotsBox.innerHTML = pages.map((_, i) => '<button type="button" role="tab" aria-label="Grupo ' + (i + 1) + ' de ' + pages.length + '" data-i="' + i + '"></button>').join("");
    dotsBox.hidden = pages.length < 2;
    mark(Math.min(page, pages.length - 1));
  }
  function mark(i){ page = i; [...dotsBox.children].forEach((d, k) => d.setAttribute("aria-selected", String(k === i))); }
  function go(i){ i = (i + pages.length) % pages.length; mark(i); track.scrollTo({left: pages[i] * itemW()}); }
  function play(){ clearInterval(timer); timer = 0; if(RM || !visible || hover || pages.length < 2) return; timer = setInterval(() => go(page + 1), T); }
  dotsBox.addEventListener("click", e => { const b = e.target.closest("button"); if(!b) return; go(+b.dataset.i); play(); });
  /* si la persona arrastra o usa el teclado, el punto activo sigue la posición */
  let raf = 0;
  track.addEventListener("scroll", () => { if(raf) return; raf = requestAnimationFrame(() => { raf = 0; const pos = track.scrollLeft / itemW(); let best = 0; pages.forEach((p, k) => { if(Math.abs(p - pos) < Math.abs(pages[best] - pos)) best = k; }); if(best !== page) mark(best); }); }, {passive:true});
  track.addEventListener("keydown", e => { if(e.key === "ArrowRight"){ e.preventDefault(); go(page + 1); play(); } if(e.key === "ArrowLeft"){ e.preventDefault(); go(page - 1); play(); } });
  car.addEventListener("mouseenter", () => { hover = true; play(); });
  car.addEventListener("mouseleave", () => { hover = false; play(); });
  if("IntersectionObserver" in window) new IntersectionObserver(es => es.forEach(e => { visible = e.isIntersecting; play(); }), {threshold:.4}).observe(car);
  else visible = true;
  addEventListener("resize", () => { build(); go(page); });
  addEventListener("hashchange", () => setTimeout(() => { build(); play(); }, 120));
  setTimeout(build, 60); build(); play();
})();


/* ---------- Contacto: si el visor no permite incrustar el mapa, queda el mapa ilustrado con el enlace ---------- */
document.addEventListener("securitypolicyviolation", e => { if(/frame/.test(e.violatedDirective || "") && /google/.test(e.blockedURI || "")) document.querySelectorAll(".ct-map").forEach(m => m.classList.add("no-frame")); });


/* ---------- Programas: ventana de inscripción ---------- */
(function(){
  const modal = document.getElementById("enrollModal"); if(!modal) return;
  const form = document.getElementById("enrollForm"), ok = document.getElementById("enrollOk"), place = document.getElementById("emPlace");
  const h = v => String(v).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  let last = null;
  const row = (t, v) => v ? '<div><h4>' + t + '</h4><ul><li>' + h(v) + '</li></ul></div>' : "";
  function setRole(v){
    form.querySelectorAll('input[name="role"]').forEach(r => r.checked = r.value === v);
    place.placeholder = v === "Miembro de la comunidad" ? "Barrio o sector donde vives" : "Área o cargo en el Club";
  }
  function open(name, from){
    const p = PROGRAMS.find(x => x.n === name); if(!p) return;
    last = from || document.activeElement;
    const label = enrollLabel(p.n);
    document.getElementById("emLine").textContent = p.l;
    document.getElementById("emTitle").textContent = p.n;
    document.getElementById("emDesc").textContent = p.d;
    document.getElementById("emCols").innerHTML = (p.who ? row("A quién beneficia", p.who) : "") + (p.where === false ? "" : row("Dónde", p.where || "Por confirmar")) + (p.freq ? row("Frecuencia", p.freq) : "") + (p.note ? row("Nota", p.note) : "");
    document.getElementById("emFormTitle").textContent = label;
    document.getElementById("emSubmit").textContent = /^Solicitar|^Postularme/.test(label) ? "Enviar solicitud" : "Enviar inscripción";
    form.reset(); ok.hidden = true;
    setRole(p.e === "comunidad" ? "Miembro de la comunidad" : "Colaborador");
    modal.hidden = false; document.body.classList.add("jm-lock");
    modal.querySelector(".jm-box").scrollTop = 0;
    void modal.offsetWidth; setTimeout(() => modal.classList.add("open"), 20);
    setTimeout(() => modal.querySelector(".jm-x").focus(), 60);
  }
  function close(){
    if(modal.hidden) return;
    modal.classList.remove("open"); document.body.classList.remove("jm-lock");
    setTimeout(() => { modal.hidden = true; }, 380);
    if(last && last.focus) last.focus();
  }
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-enroll]"); if(t){ e.preventDefault(); open(t.dataset.enroll, t); return; }
    if(e.target.closest("#enrollModal [data-close]")) close();
  });
  document.getElementById("emRole").addEventListener("change", e => setRole(e.target.value));
  document.addEventListener("keydown", e => {
    if(modal.hidden) return;
    if(e.key === "Escape") close();
    if(e.key === "Tab"){
      const f = [...modal.querySelectorAll("button, input, textarea, a[href]")].filter(x => x.offsetParent !== null);
      if(!f.length) return;
      if(e.shiftKey && document.activeElement === f[0]){ e.preventDefault(); f[f.length - 1].focus(); }
      else if(!e.shiftKey && document.activeElement === f[f.length - 1]){ e.preventDefault(); f[0].focus(); }
    }
  });
  form.addEventListener("submit", e => { e.preventDefault(); if(!form.checkValidity()){ form.reportValidity(); return; } ok.hidden = false; ok.scrollIntoView({block:"nearest"}); });
  addEventListener("hashchange", close);
})();


/* ---------- Boletines (contenido de ejemplo) ---------- */
/* PROGRAMADOR: cada boletín es un artículo. Campos: n (número), t (título), d (fecha), img (portada), prog, line, place,
   lead (entrada), body (bloques: p, h2, fig, quote, facts, duo) y tags. Hoy son de ejemplo: cambiarlos por los reales.
   Cada tarjeta abre su página interna en #boletin-N. */
(function(){
  const box = document.getElementById("bolList"); if(!box) return;
  /* 15 boletines de ejemplo (títulos, fechas y textos inventados), del más reciente al más antiguo */
  const BOLETINES = [
    {"n":15,"t":"Emprendiendo juntos: nuevas ideas de negocio en Salgar","d":"Octubre 2026","img":"assets/img/mujeres-velas.webp","prog":"Emprendiendo Juntos – Comunidad","line":"Gestión social","place":"Salgar, Puerto Colombia","lead":"Mujeres de Salgar presentaron los productos que crearon en bisutería, gastronomía, velas artesanales y tejido, y contaron cómo empezaron a generar ingresos desde sus casas.","body":[["p","La jornada de cierre de Emprendiendo Juntos reunió a las participantes, a sus familias y al equipo de la Fundación en una tarde de feria. Cada mesa mostraba el resultado de meses de formación: collares y pulseras, tejidos, velas aromáticas y preparaciones de cocina listas para la venta."],["p","El programa combina talleres prácticos con acompañamiento para emprender: cómo calcular costos, cómo poner precio a un producto y cómo darlo a conocer entre vecinos, en ferias y por redes sociales."],["facts",[["38","Mujeres en bisutería, crochet y macramé"],["25","Mujeres en gastronomía"],["21","Mujeres en velas artesanales"]]],["h2","Del taller a la ","venta"],["p","Varias participantes ya reciben pedidos de forma regular. Algunas venden en el barrio y otras se organizaron en grupos para comprar materiales juntas y bajar costos. El grupo de tejido, con 11 mujeres, prepara una colección para la temporada de fin de año."],["quote","«Antes lo hacía para mí. Ahora sé cuánto vale mi trabajo y tengo clientas que me escriben.»","Participante del taller de bisutería"],["fig","assets/img/vitrina.webp","Algunos productos estarán en la próxima edición de La Vitrina."],["h2","Lo que ","sigue"],["p","La Fundación seguirá acompañando a las emprendedoras con encuentros mensuales de seguimiento y con espacios de venta en los eventos del Club. La próxima convocatoria se abrirá a comienzos del año."]],"tags":["Emprendimiento","Comunidad","Salgar","Mujeres"]},
    {"n":14,"t":"Vivienda Digna: hogares que se transforman","d":"Septiembre 2026","img":"assets/img/vivienda.webp","prog":"Proyecto Vivienda Digna","line":"Vivienda","place":"Hogares de los trabajadores","lead":"Conoce a las familias de nuestros trabajadores que mejoraron su cocina, su baño o su sala gracias al Proyecto Vivienda Digna, aprobado para 2026, 2027 y 2028.","body":[["p","Una cocina con buena ventilación, un baño terminado o un piso nuevo en la sala pueden cambiar la forma en que una familia vive su casa. Ese es el propósito del Proyecto Vivienda Digna: atender las necesidades locativas básicas y prioritarias de los hogares de nuestros trabajadores directos."],["p","Cada año se abre una convocatoria. Las solicitudes se revisan con visitas a los hogares y se priorizan según la urgencia de las mejoras."],["facts",[["39","Viviendas adquiridas o mejoradas"],["3","Años de proyecto aprobado"],["1","Convocatoria al año"]]],["h2","Mejoras que se ","notan"],["p","Este año la mayoría de las solicitudes se concentraron en cocinas y baños. En varios casos, el subsidio se sumó al ahorro de la familia para terminar obras que llevaban tiempo detenidas."],["quote","«Por fin tenemos una cocina donde podemos cocinar todos juntos sin preocuparnos por la humedad.»","Familia beneficiaria del proyecto"],["duo","assets/img/vivienda.webp","assets/img/bienestar.webp"],["h2","Cómo ","postularse"],["p","Los trabajadores directos interesados pueden inscribirse en la próxima convocatoria desde la página de programas. El equipo de la Fundación acompaña el proceso desde la solicitud hasta la entrega de las mejoras."]],"tags":["Vivienda","Colaboradores","Familias"]},
    {"n":13,"t":"Descubriendo mis Habilidades cierra un nuevo ciclo","d":"Agosto 2026","img":"assets/img/gestion-social.webp","prog":"Descubriendo mis Habilidades","line":"Gestión social","place":"Colegio Eustorgio Salgar, Salgar","lead":"Los estudiantes del Colegio Eustorgio Salgar mostraron a sus familias los proyectos que construyeron durante el año, en una jornada de feria y reconocimientos.","body":[["p","La clausura reunió a estudiantes, docentes y padres de familia en el patio del colegio. Cada grupo presentó su proyecto: productos hechos a mano, ideas de servicio para el barrio y propuestas para cuidar el entorno escolar."],["p","El programa fortalece en los estudiantes competencias para la vida, el ser y el saber hacer, con un acompañamiento pedagógico que mezcla el trabajo en el aula con actividades prácticas."],["fig","assets/img/educacion.webp","Los talleres combinan aula y práctica a lo largo del año."],["h2","Inglés como ","requisito de grado"],["p","Este ciclo incluyó el auxilio educativo de inglés, pensado para que los estudiantes de último grado cumplan con este requisito y lleguen mejor preparados a la educación superior o al trabajo."],["quote","«Aprendí que mis ideas pueden convertirse en un proyecto y que no tengo que hacerlo sola.»","Estudiante de décimo grado"],["h2","La comunidad como ","invitada"],["p","Las familias recorrieron los puestos y votaron por los proyectos que más les gustaron. Algunos de los trabajos se exhibirán en La Vitrina durante los próximos meses."]],"tags":["Gestión social","Educación","Salgar"]},
    {"n":12,"t":"Un espacio para ti: bienestar y autocuidado","d":"Julio 2026","img":"assets/img/bienestar.webp","prog":"Un espacio para ti","line":"Bienestar","place":"Country Club de Barranquilla","lead":"Te contamos cómo funciona este espacio de escucha, orientación y acompañamiento para nuestros colaboradores, disponible durante todo el año.","body":[["p","Todos atravesamos momentos difíciles: una pérdida, una preocupación familiar o simplemente un periodo de mucho cansancio. Un espacio para ti nació para que nuestros colaboradores tengan a quién acudir en esos momentos."],["p","El espacio ofrece una primera orientación, herramientas de autocuidado y, cuando hace falta, el acompañamiento para buscar apoyo especializado."],["facts",[["207","Colaboradores en programas de bienestar"],["12","Meses al año disponible"],["1","Espacio confidencial"]]],["h2","Escuchar ","primero"],["p","Las conversaciones son confidenciales y se adaptan a lo que cada persona necesita. Algunas personas vienen una sola vez; otras regresan durante varias semanas."],["quote","«Hablar a tiempo me ayudó a ordenar lo que sentía y a pedir ayuda en casa.»","Colaborador del Club"],["fig","assets/img/colaboradores.webp","El bienestar también se construye en equipo."],["h2","Cómo ","acceder"],["p","Cualquier colaborador puede solicitar un espacio escribiendo a la Fundación o acercándose a su líder de área. No se necesita ningún trámite previo."]],"tags":["Bienestar","Colaboradores","Autocuidado"]},
    {"n":11,"t":"Auxilios educativos para el nuevo año escolar","d":"Junio 2026","img":"assets/img/educacion.webp","prog":"Auxilios educativo-escolares","line":"Educación","place":"Country Club de Barranquilla","lead":"Fechas, requisitos y testimonios de las familias que reciben los auxilios educativo-escolares para los hijos de nuestros trabajadores directos.","body":[["p","Con el inicio del calendario escolar, la Fundación abre la entrega de los auxilios educativo-escolares. Se trata de un apoyo económico para que los hijos de los trabajadores directos cuenten con lo necesario para comenzar y continuar sus estudios en primaria y secundaria."],["p","El auxilio se entrega dos veces al año, al inicio de los calendarios A y B, para acompañar a las familias en los momentos de mayor gasto escolar."],["h2","Requisitos y ","fechas"],["p","Para solicitarlo, el trabajador debe presentar el certificado de estudios vigente de su hijo o hija. Las fechas de recepción de documentos se publican en las carteleras del Club y en esta sección de boletines."],["quote","«Con el auxilio pudimos comprar los útiles y el uniforme sin endeudarnos.»","Madre y trabajadora del Club"],["fig","assets/img/gestion-social.webp","Útiles, uniformes y libros para empezar el año."],["h2","Más que un ","apoyo económico"],["p","Detrás de cada auxilio hay una meta compartida: que los niños y jóvenes permanezcan en el colegio y terminen sus estudios. Por eso el programa se acompaña con seguimiento a la permanencia escolar."]],"tags":["Educación","Familias","Colaboradores"]},
    {"n":10,"t":"La Vitrina: el talento de nuestras emprendedoras","d":"Mayo 2026","img":"assets/img/vitrina.webp","prog":"La Vitrina","line":"Gestión social","place":"Country Club de Barranquilla","lead":"Un recorrido por la nueva edición de La Vitrina y los productos hechos por quienes participan en los programas de la Fundación.","body":[["p","La Vitrina es el espacio donde la Fundación muestra y pone a la venta los productos de quienes participan en sus programas. En esta edición hubo velas decorativas, bisutería, tejidos y productos de cocina."],["p","Para muchas participantes fue la primera vez que vendían fuera de su barrio. La experiencia les permitió conocer qué productos llaman más la atención y cómo hablar de su trabajo con clientes nuevos."],["duo","assets/img/vitrina.webp","assets/img/mujeres-velas.webp"],["h2","Un espacio para ","crecer"],["p","Además de vender, las emprendedoras recibieron retroalimentación sobre empaques, precios y presentación. Varias ya preparan cambios para la próxima edición."],["quote","«Vendí todo lo que traje y me llevé ideas para mejorar mis empaques.»","Participante de Emprendiendo Juntos"],["h2","Visítala en la próxima ","edición"],["p","La Vitrina se instala en los eventos del Club varias veces al año. Las fechas se anunciarán en este boletín y en nuestras redes sociales."]],"tags":["Emprendimiento","La Vitrina","Comunidad"]},
    {"n":9,"t":"Actividades ambientales en el colegio","d":"Abril 2026","img":"assets/img/gestion-ambiental.webp","prog":"Actividades ambientales","line":"Gestión ambiental","place":"Colegio Eustorgio Salgar","lead":"Estudiantes del Colegio Eustorgio Salgar aprenden a manejar adecuadamente los residuos y a cuidar el entorno de su comunidad.","body":[["p","La línea de Gestión ambiental de la Fundación llegó al Colegio Eustorgio Salgar con talleres de manejo adecuado de residuos. Los estudiantes aprendieron a separar en la fuente y a reducir lo que se desecha en el colegio y en casa."],["p","Cada curso diseñó una estrategia para su salón, desde puntos ecológicos hasta campañas para reutilizar materiales en las clases de arte."],["fig","assets/img/gestion-ambiental.webp","La educación ambiental empieza en el salón de clase."],["h2","Pequeños cambios, ","grandes hábitos"],["p","Los docentes notaron que los estudiantes llevaron lo aprendido a sus casas. Varias familias empezaron a separar residuos y a compartir la práctica con sus vecinos."],["quote","«Ahora en mi casa separamos el plástico y lo llevamos al punto de reciclaje.»","Estudiante de séptimo grado"],["h2","Próximos ","pasos"],["p","El programa continuará con jornadas de limpieza y siembra en el entorno del colegio, en las que participarán estudiantes, familias y voluntarios."]],"tags":["Gestión ambiental","Educación","Salgar"]},
    {"n":8,"t":"Formación en liderazgo e inteligencia artificial","d":"Marzo 2026","img":"assets/img/colaboradores.webp","prog":"Programa de formación y desarrollo para colaboradores","line":"Educación","place":"Country Club de Barranquilla","lead":"Así avanzan el Club de Liderazgo y la formación en inteligencia artificial, las dos apuestas del programa de formación y desarrollo para nuestros colaboradores.","body":[["p","El programa de formación y desarrollo reúne dos espacios: el Club de Liderazgo, donde los colaboradores fortalecen la comunicación, la gestión de equipos y el manejo del estrés, y la formación en inteligencia artificial, pensada para usar estas herramientas en el trabajo diario."],["p","Las sesiones combinan teoría corta con ejercicios prácticos sobre situaciones reales de cada área del Club."],["h2","Liderar con ","cercanía"],["p","En el Club de Liderazgo, los participantes trabajaron en conversaciones difíciles, retroalimentación y organización del tiempo. Al final de cada encuentro, cada persona se lleva un compromiso concreto para aplicar con su equipo."],["quote","«Aprendí a escuchar antes de responder, y eso cambió el ambiente en mi equipo.»","Participante del Club de Liderazgo"],["fig","assets/img/trabaja-equipo.webp","Los ejercicios se basan en situaciones reales del trabajo."],["h2","Inteligencia artificial en el ","día a día"],["p","La formación en inteligencia artificial mostró cómo redactar mejor, resumir documentos y organizar información con estas herramientas, siempre con criterio y cuidando los datos del Club."]],"tags":["Educación","Liderazgo","Inteligencia artificial"]},
    {"n":7,"t":"Más cerca de las comunidades de nuestro entorno","d":"Febrero 2026","img":"assets/img/comunidad.webp","prog":"Transformación del entorno","line":"Gestión social","place":"Salgar, La Playa y Puerto Colombia","lead":"Nuestro trabajo con las comunidades de Salgar, La Playa y Puerto Colombia, cercanas a la sede campestre del Club.","body":[["p","La Fundación trabaja con las comunidades vecinas a la sede campestre del Country Club de Barranquilla. En Salgar, La Playa y Puerto Colombia desarrollamos iniciativas de gestión social y ambiental junto con líderes, colegios y familias."],["p","Cada iniciativa parte de conocer el entorno: escuchar a la comunidad, identificar sus necesidades y diseñar programas que puedan sostenerse en el tiempo."],["facts",[["1.242","Personas de comunidades de nuestro entorno"],["3","Territorios cercanos a la sede campestre"],["2","Líneas de trabajo con la comunidad"]]],["h2","Conocer antes de ","actuar"],["p","Antes de iniciar un programa, el equipo de la Fundación realiza visitas y encuentros con la comunidad. Así se definen prioridades como la formación para generar ingresos, la educación y el cuidado del ambiente."],["quote","«La Fundación no llegó a decirnos qué hacer, llegó a preguntarnos qué necesitábamos.»","Líder comunitaria de Salgar"],["duo","assets/img/comunidad.webp","assets/img/gestion-ambiental.webp"],["h2","Un trabajo de ","largo plazo"],["p","Nuestro compromiso con estas comunidades es permanente. Por eso medimos los resultados de cada programa y los compartimos en estos boletines."]],"tags":["Comunidad","Salgar","La Playa","Puerto Colombia"]},
    {"n":6,"t":"Repostería creativa: colaboradores que emprenden","d":"Enero 2026","img":"assets/img/trabaja-equipo.webp","prog":"Emprendiendo Juntos – Colaboradores","line":"Bienestar","place":"Country Club de Barranquilla","lead":"Colaboradores del Club cuentan lo que aprendieron en los cursos de repostería y decoración navideña de Emprendiendo Juntos.","body":[["p","Emprendiendo Juntos también llega a nuestros colaboradores. Este ciclo incluyó tres cursos: decoración navideña, repostería creativa y repostería salada y pasabocas gourmet."],["p","Los cursos se pensaron para aprender un oficio que pueda convertirse en una fuente de ingresos adicional para las familias."],["facts",[["18","Colaboradores en decoración navideña"],["19","Colaboradores en repostería creativa"],["15","Colaboradores en repostería salada"]]],["h2","De la cocina al ","negocio"],["p","Además de las recetas, los participantes aprendieron a calcular costos, empacar y presentar sus productos. Varios ya reciben pedidos para cumpleaños y celebraciones."],["quote","«Empecé haciendo postres para mi familia y ahora tengo pedidos todas las semanas.»","Colaboradora del Club"],["fig","assets/img/mujeres-velas.webp","La decoración navideña fue uno de los cursos más pedidos."],["h2","Nuevos ","cursos"],["p","La Fundación prepara nuevos cursos para este año. Las inscripciones se abrirán en la página de programas."]],"tags":["Emprendimiento","Colaboradores","Bienestar"]},
    {"n":5,"t":"Educación superior: un paso más para nuestros trabajadores","d":"Diciembre 2025","img":"assets/img/educacion.webp","prog":"Auxilio de educación superior","line":"Educación","place":"Country Club de Barranquilla","lead":"Trabajadores directos y sus hijos avanzan en sus estudios universitarios y técnicos con el apoyo del Auxilio de educación superior.","body":[["p","El Auxilio de educación superior apoya el acceso y la continuidad de estudios universitarios, técnicos, tecnológicos y de formación avanzada. Está dirigido a los trabajadores directos y a sus hijos."],["p","El auxilio se entrega dos veces al año, al inicio de cada semestre, para acompañar los momentos de matrícula."],["facts",[["589","Apoyos en educación superior"],["2","Entregas al año"],["1","Meta: terminar los estudios"]]],["h2","Estudiar sin ","detenerse"],["p","Para muchas familias, el costo de la matrícula es la razón para aplazar los estudios. El auxilio ayuda a que ese paso no se detenga y a que los estudiantes terminen su carrera."],["quote","«Soy la primera de mi familia en llegar a la universidad, y el auxilio hizo la diferencia.»","Hija de un trabajador del Club"],["fig","assets/img/colaboradores.webp","Trabajadores y sus hijos que avanzan en su formación."],["h2","Cómo ","solicitarlo"],["p","Los interesados pueden inscribirse desde la página de programas antes del inicio de cada semestre, con el certificado de matrícula vigente."]],"tags":["Educación","Educación superior","Colaboradores"]},
    {"n":4,"t":"Donaciones en especie: gracias a quienes se suman","d":"Noviembre 2025","img":"assets/img/manos-planta.webp","prog":"Donaciones en especie","line":"Sé parte","place":"Barranquilla","lead":"Ropa, alimentos, útiles escolares y otros artículos llegaron a las familias de nuestras comunidades gracias a las donaciones recibidas.","body":[["p","Cada aporte cuenta y puede convertirse en una gran ayuda para quienes más lo necesitan. En los últimos meses, socios, colaboradores y empresas aliadas donaron artículos de primera necesidad para las familias de nuestras comunidades."],["p","La Fundación recibe únicamente donaciones en especie: ropa y zapatos en buen estado, alimentos no perecederos, productos de aseo, herramientas tecnológicas y útiles escolares."],["fig","assets/img/comunidad.webp","Las donaciones se entregan directamente a las familias."],["h2","Del donante a la ","familia"],["p","El equipo de la Fundación clasifica los artículos y los entrega según las necesidades identificadas en cada comunidad. Así nos aseguramos de que cada donación llegue a quien la necesita."],["quote","«Los útiles llegaron justo cuando mis hijos empezaban el colegio.»","Madre de familia de La Playa"],["h2","Cómo ","donar"],["p","Si quieres donar, escríbenos a fundacionsocial@country.com.co o al 317 645 3695 para coordinar la entrega. Recuerda que no recibimos dinero ni transferencias."]],"tags":["Donaciones","Comunidad","Sé parte"]},
    {"n":3,"t":"Voluntariado: socios que comparten su talento","d":"Octubre 2025","img":"assets/img/colaboradores.webp","prog":"Sé voluntario","line":"Sé parte","place":"Comunidades del entorno","lead":"Socios del Club enseñan manualidades, cocina, música, deporte e idiomas en nuestras comunidades.","body":[["p","El voluntariado de la Fundación está abierto a los socios del Country Club de Barranquilla. Cada voluntario comparte lo que sabe hacer con niños, jóvenes y adultos de las comunidades de nuestro entorno."],["p","Los perfiles más buscados son manualidades, cocina, tejido, recreación, arte, música, deporte, idiomas y tecnología."],["fig","assets/img/gestion-social.webp","Cada voluntario aporta su experiencia y su tiempo."],["h2","Compartir lo que ","sabes"],["p","Los voluntarios dictan talleres cortos o acompañan los programas existentes. La Fundación organiza los horarios para que la experiencia sea constante y ordenada."],["quote","«Enseñar a tocar guitarra a estos chicos me recordó por qué empecé a tocar.»","Socio voluntario"],["h2","Cómo ","inscribirse"],["p","Los socios interesados pueden inscribirse en la página Sé parte con su número de acción. El equipo de la Fundación los contactará para definir el taller y el horario."]],"tags":["Voluntariado","Socios","Comunidad"]},
    {"n":2,"t":"Alianzas que multiplican el impacto","d":"Septiembre 2025","img":"assets/img/sede-club.webp","prog":"Haz una alianza","line":"Sé parte","place":"Barranquilla","lead":"Empresas y entidades que se suman a nuestros programas para crear mayores y mejores oportunidades.","body":[["p","Sumar capacidades multiplica el impacto social. Cuando una empresa o una entidad pública se une a un programa de la Fundación, se suman conocimientos y recursos, y se aplican con cercanía y seguimiento."],["p","Este año, instituciones educativas y empresas de la región se sumaron a programas de formación, emprendimiento y gestión ambiental."],["duo","assets/img/sede-club.webp","assets/img/colaboradores.webp"],["h2","Trabajar ","juntos"],["p","Cada alianza se construye a la medida: algunas aportan formación, otras materiales o espacios, y otras acompañan a las comunidades con su equipo."],["quote","«Encontramos en la Fundación un aliado que conoce de verdad a la comunidad.»","Empresa aliada"],["h2","Súmate como ","aliado"],["p","Si eres parte de una empresa privada o de una entidad pública y te identificas con nuestro propósito, escríbenos desde la página Sé parte para revisar la posibilidad de trabajar juntos."]],"tags":["Alianzas","Empresas","Sé parte"]},
    {"n":1,"t":"Un solo propósito, un mayor impacto","d":"Agosto 2025","img":"assets/img/impacto-hero.webp","prog":"Fundación Social Country Club","line":"Institucional","place":"Barranquilla","lead":"FundaCountry y la Fundación Social Country Club de Barranquilla unen sus caminos en una sola apuesta social.","body":[["p","Desde 1989, FundaCountry ha trabajado por el bienestar y el desarrollo integral de los colaboradores del Country Club de Barranquilla y sus familias, con acciones en educación, vivienda y bienestar."],["p","En 2021 nació la Fundación Social Country Club de Barranquilla para extender ese compromiso hacia las comunidades. Desde entonces, ambas fundaciones trabajaron de manera articulada."],["fig","assets/img/sede-club.webp","Una historia que comenzó en el Country Club de Barranquilla."],["h2","Dos enfoques, un ","propósito"],["p","Hoy las dos fundaciones se integran en una sola. El fortalecimiento interno de nuestros colaboradores y la transformación del entorno se convierten en dos frentes de un mismo propósito."],["quote","«Unir los dos caminos nos permite llegar más lejos y con más fuerza.»","Equipo de la Fundación"],["h2","Lo que ","viene"],["p","Con este primer boletín iniciamos un espacio para contar, mes a mes, las historias, actividades y resultados de nuestros programas."]],"tags":["Institucional","Historia","Fundación"]}
  ];
  const title = b => "Boletín N.º " + b.n;
  const h = v => String(v).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16"/><path d="m13 5 7 7-7 7"/></svg>';
  const card = b =>
    '<a class="bol" href="#boletin-' + b.n + '" aria-label="Ver ' + h(title(b)) + ': ' + h(b.t) + '">' +
      '<div class="bol-cover"><img src="' + h(b.img) + '" alt="" loading="lazy">' + (b === BOLETINES[0] ? '<span class="bol-new">Más reciente</span>' : '') + '</div>' +
      '<div class="bol-body"><h3>' + h(b.t) + '</h3><p>' + h(b.d) + '</p><span class="bol-go">Ver boletín <i>' + arrow + '</i></span></div>' +
    '</a>';
  box.innerHTML = BOLETINES.map(card).join("");
  /* cuerpo del artículo a partir de sus bloques */
  const block = (x, i) => {
    const [k, a, b] = x;
    if(k === "p") return '<p class="art-p' + (i === 0 ? ' art-drop' : '') + '">' + h(a) + '</p>';
    if(k === "h2") return '<h2>' + h(a + b) + '</h2>';
    if(k === "fig") return '<figure class="art-fig"><img src="' + h(a) + '" alt="" loading="lazy"><figcaption>' + h(b) + '</figcaption></figure>';
    if(k === "duo") return '<div class="art-duo"><figure><img src="' + h(a) + '" alt="" loading="lazy"></figure><figure><img src="' + h(b) + '" alt="" loading="lazy"></figure></div>';
    if(k === "quote") return '<blockquote class="art-quote"><p>' + h(a) + '</p><cite>' + h(b) + '</cite></blockquote>';
    if(k === "facts") return '<div class="art-facts" role="list">' + a.map(([n, l]) => '<div role="listitem"><b>' + h(n) + '</b><span>' + h(l) + '</span></div>').join("") + '</div>';
    return "";
  };
  /* página interna: la llama route() cuando la dirección es #boletin-N */
  window.renderBoletin = hash => {
    const n = +hash.replace("boletin-", ""), i = Math.max(0, BOLETINES.findIndex(b => b.n === n)), b = BOLETINES[i];
    const words = [b.lead].concat(b.body.filter(x => x[0] === "p").map(x => x[1])).join(" ").split(/\s+/).length;
    const img = document.getElementById("bolDImg"); img.src = b.img; img.alt = "Portada del " + title(b);
    document.getElementById("bolDCrumb").textContent = title(b);
    document.getElementById("bolDTitle").textContent = b.t;
    document.getElementById("bolDDate").textContent = b.d;
    document.getElementById("bolDRead").textContent = Math.max(2, Math.round(words / 200)) + " min de lectura";
    document.getElementById("bolDData").innerHTML = [["Boletín", "N.º " + b.n], ["Fecha", b.d], ["Programa", b.prog], ["Línea", b.line], ["Lugar", b.place]]
      .map(([k, v]) => '<div><dt>' + k + '</dt><dd>' + h(v) + '</dd></div>').join("");
    let pi = 0;
    document.getElementById("bolDBody").innerHTML = '<p class="art-lead">' + h(b.lead) + '</p>' +
      b.body.map(x => block(x, x[0] === "p" ? pi++ : -1)).join("") +
      '<ul class="art-tags" aria-label="Temas">' + b.tags.map(t => '<li>' + h(t) + '</li>').join("") + '</ul>';
    /* "Más boletines": los cinco siguientes, dando la vuelta al final de la lista */
    document.getElementById("bolMore").innerHTML = [1,2,3,4,5].map(k => card(BOLETINES[(i + k) % BOLETINES.length])).join("");
  };
})();

/* ---------- Gestión de informes: tarjetas de documentos con filtro por tipo (contenido de ejemplo) ---------- */
/* PROGRAMADOR: cada documento tiene "f" (ruta del archivo PDF). Hoy están vacíos: poner la ruta real de cada archivo. */
(function(){
  const box = document.getElementById("infList"), chips = document.getElementById("infChips"); if(!box || !chips) return;
  const GROUPS = [
    {t:"Informes de gestión", docs:[
      {t:"Informe de gestión", f:""}
    ]},
    {t:"Estados financieros", docs:[
      {t:"Estados financieros", f:""},
      {t:"Dictamen del revisor fiscal", f:""}
    ]},
    {t:"Régimen tributario especial", docs:[
      {t:"Certificación de requisitos y cargos directivos", f:""},
      {t:"Acta de la asamblea ordinaria", f:""}
    ]},
    {t:"Documentos institucionales", docs:[
      {t:"Estatutos de la Fundación", f:""},
      {t:"Certificado de existencia y representación legal", f:""},
      {t:"Registro Único Tributario (RUT)", f:""},
      {t:"Política de tratamiento de datos personales", f:""}
    ]}
  ];
  const DOCS = GROUPS.flatMap(g => g.docs.map(d => ({...d, c:g.t})));
  const h = v => String(v).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const pdf = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/></svg>';
  const dl = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/></svg>';
  let cur = "todos";
  chips.innerHTML = [{k:"todos", t:"Todos"}].concat(GROUPS.map(g => ({k:g.t, t:g.t}))).map(c =>
    '<button type="button" data-k="' + h(c.k) + '" aria-pressed="false">' + h(c.t) + '</button>').join("");
  function render(){
    box.innerHTML = DOCS.filter(d => cur === "todos" || d.c === cur).map(d =>
      '<a class="inf-card" href="' + (d.f ? h(d.f) : "#informes") + '"' + (d.f ? ' download target="_blank" rel="noopener"' : '') + ' aria-label="Descargar ' + h(d.t) + ' (PDF)">' +
        '<span class="inf-ic">' + pdf + '</span>' +
        '<span class="inf-cat">' + h(d.c) + '</span>' +
        '<h3>' + h(d.t) + '</h3>' +
        '<span class="inf-dl">Descargar PDF <i>' + dl + '</i></span>' +
      '</a>').join("");
    [...chips.children].forEach(b => b.setAttribute("aria-pressed", String(b.dataset.k === cur)));
  }
  chips.addEventListener("click", e => { const b = e.target.closest("button"); if(!b) return; cur = b.dataset.k; render(); });
  render();
})();


/* ---------- Inicio: fotos de historias como carrusel en celular ---------- */
(function(){
  const row = document.getElementById("stackRow"); if(!row) return;
  const items = [...row.querySelectorAll(".ptk")];
  const dots = document.createElement("div"); dots.className = "stack-dots"; dots.setAttribute("role", "tablist"); dots.setAttribute("aria-label", "Fotos de historias");
  dots.innerHTML = items.map((_, i) => '<button type="button" role="tab" aria-label="Foto ' + (i + 1) + '" aria-selected="' + (i === 0) + '"></button>').join("");
  row.after(dots);
  const btns = [...dots.children];
  const center = el => el.offsetLeft - row.offsetLeft - (row.clientWidth - el.offsetWidth) / 2;
  let tick = false;
  row.addEventListener("scroll", () => { if(tick) return; tick = true; requestAnimationFrame(() => { tick = false;
    const mid = row.scrollLeft + row.clientWidth / 2; let best = 0, d = Infinity;
    items.forEach((el, i) => { const c = el.offsetLeft - row.offsetLeft + el.offsetWidth / 2, x = Math.abs(c - mid); if(x < d){ d = x; best = i; } });
    btns.forEach((b, i) => b.setAttribute("aria-selected", String(i === best))); }); }, {passive:true});
  dots.addEventListener("click", e => { const i = btns.indexOf(e.target.closest("button")); if(i >= 0) row.scrollTo({left: center(items[i]), behavior:"smooth"}); });
})();


/* ---------- Quiénes somos: línea de tiempo como carrusel en celular ---------- */
(function(){
  const sec = document.getElementById("timeline"); if(!sec) return;
  const row = sec.querySelector(".tlx-track"), items = [...sec.querySelectorAll(".tlx-item, .tlx-end")];
  const dots = document.createElement("div"); dots.className = "stack-dots"; dots.setAttribute("role", "tablist"); dots.setAttribute("aria-label", "Momentos de la historia");
  dots.innerHTML = items.map((_, i) => '<button type="button" role="tab" aria-label="Momento ' + (i + 1) + '" aria-selected="' + (i === 0) + '"></button>').join("");
  sec.querySelector(".tlx-viewport").after(dots);
  const btns = [...dots.children];
  const off = el => el.getBoundingClientRect().left - row.getBoundingClientRect().left + row.scrollLeft;
  let tick = false;
  row.addEventListener("scroll", () => { if(tick) return; tick = true; requestAnimationFrame(() => { tick = false;
    const mid = row.scrollLeft + row.clientWidth / 2; let best = 0, d = Infinity;
    items.forEach((el, i) => { const x = Math.abs(off(el) + el.offsetWidth / 2 - mid); if(x < d){ d = x; best = i; } });
    btns.forEach((b, i) => b.setAttribute("aria-selected", String(i === best))); }); }, {passive:true});
  dots.addEventListener("click", e => { const i = btns.indexOf(e.target.closest("button")); if(i >= 0) row.scrollTo({left: off(items[i]) - (row.clientWidth - items[i].offsetWidth) / 2, behavior:"smooth"}); });
})();


/* ---------- Quiénes somos: valores como carrusel en celular ---------- */
(function(){
  const row = document.querySelector(".vfan"); if(!row) return;
  const items = [...row.querySelectorAll(".vcard")];
  const dots = document.createElement("div"); dots.className = "stack-dots"; dots.setAttribute("role", "tablist"); dots.setAttribute("aria-label", "Valores");
  dots.innerHTML = items.map((_, i) => '<button type="button" role="tab" aria-label="Valor ' + (i + 1) + '" aria-selected="' + (i === 0) + '"></button>').join("");
  row.after(dots);
  const btns = [...dots.children];
  const off = el => el.getBoundingClientRect().left - row.getBoundingClientRect().left + row.scrollLeft;
  let tick = false;
  row.addEventListener("scroll", () => { if(tick) return; tick = true; requestAnimationFrame(() => { tick = false;
    const mid = row.scrollLeft + row.clientWidth / 2; let best = 0, d = Infinity;
    items.forEach((el, i) => { const x = Math.abs(off(el) + el.offsetWidth / 2 - mid); if(x < d){ d = x; best = i; } });
    btns.forEach((b, i) => b.setAttribute("aria-selected", String(i === best))); }); }, {passive:true});
  dots.addEventListener("click", e => { const i = btns.indexOf(e.target.closest("button")); if(i >= 0) row.scrollTo({left: off(items[i]) - (row.clientWidth - items[i].offsetWidth) / 2, behavior:"smooth"}); });
})();


/* ---------- Programas: en celular solo se ven los dos bloques; las tarjetas aparecen dentro del bloque que se despliega ---------- */
(function(){
  const side = document.getElementById("pside"); if(!side) return;
  const shop = document.getElementById("pshop"), main = shop.querySelector(".pmain"), home = main.parentNode;
  const MQ = matchMedia("(max-width: 900px)"), groups = [...side.querySelectorAll(".ps-g")];
  let cur = "todos";
  function sync(f){
    cur = f; let openG = null;
    groups.forEach(g => { const on = f !== "todos" && [...g.querySelectorAll(".ps-b")].some(b => b.dataset.f === f);
      g.classList.toggle("open", on); g.querySelector(".ps-main").setAttribute("aria-expanded", String(on)); if(on) openG = g; });
    if(MQ.matches){ shop.classList.toggle("pm-closed", !openG); if(openG && main.parentNode !== openG) openG.appendChild(main); }
    else { shop.classList.remove("pm-closed"); if(main.parentNode !== home) home.appendChild(main); }
  }
  const base = setFilter;
  setFilter = function(f, jump){ base(f, jump); sync(f); };
  /* tocar un bloque ya abierto lo cierra */
  side.addEventListener("click", e => { const b = e.target.closest(".ps-g .ps-main");
    if(b && b.closest(".ps-g").classList.contains("open")){ e.stopPropagation(); setFilter("todos", false); } }, true);
  MQ.addEventListener("change", () => sync(cur));
  sync(cur);
})();

/* ---------- Video de Quiénes somos: se reproduce al estar visible ---------- */
(function(){
  if(!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(es => es.forEach(e => { const v = e.target; if(e.isIntersecting){ const p = v.play(); p && p.catch(() => {}); } else v.pause(); }));
  document.querySelectorAll(".nos-video video, video.solo").forEach(v => io.observe(v));
})();

/* ---------- Línea de tiempo: se desplaza en horizontal con el scroll y enciende cada hito ---------- */
(function(){
  const sec = document.getElementById("timeline"); if(!sec) return;
  const track = sec.querySelector(".tlx-track"), svg = sec.querySelector(".tlx-line");
  const base = svg.querySelector(".tlx-line-base"), fill = svg.querySelector(".tlx-line-fill");
  const stops = [...sec.querySelectorAll(".tlx-item, .tlx-end")];
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches, MQ = matchMedia("(max-width: 900px)");
  let travel = 0, W = 0, nodesX = [];
  function layout(){
    const flat = RM || MQ.matches;
    sec.classList.toggle("static", flat);
    if(flat){ sec.style.height = ""; track.style.transform = ""; return; }
    track.style.transform = "translateX(0)";
    W = track.scrollWidth;
    const lastNode = stops[stops.length-1].querySelector(".tlx-node");
    const tR = track.getBoundingClientRect();
    nodesX = stops.map(st => { const r = st.querySelector(".tlx-node").getBoundingClientRect(); return r.left - tR.left + r.width/2; });
    const endX = nodesX[nodesX.length-1];
    travel = Math.max(0, endX - innerWidth * .5);
    sec.style.height = (innerHeight + travel) + "px";
    /* línea recta */
    const len = endX + 40, d = "M0 20 H " + len;
    svg.setAttribute("viewBox", "0 0 " + W + " 40"); svg.style.width = W + "px";
    base.setAttribute("d", d); fill.setAttribute("d", d); fill._len = len;
    update();
  }
  function update(){
    if(sec.classList.contains("static")){
      stops.forEach(st => { if(st.getBoundingClientRect().top < innerHeight * .72) st.classList.add("on"); });
      return;
    }
    const r = sec.getBoundingClientRect(); if(!r.height) return;
    const p = travel ? Math.min(1, Math.max(0, -r.top / travel)) : 0;
    const x = p * travel;
    track.style.transform = "translateX(" + (-x).toFixed(1) + "px)";
    const head = x + innerWidth * .5;
    fill.style.strokeDashoffset = (1 - Math.min(1, head / (fill._len || 1))).toFixed(4);
    stops.forEach((st,i) => st.classList.toggle("on", nodesX[i] <= head + 4));
  }
  let raf = 0;
  addEventListener("scroll", () => { if(!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); }, {passive:true});
  addEventListener("resize", layout); MQ.addEventListener && MQ.addEventListener("change", layout);
  addEventListener("hashchange", () => setTimeout(layout, 80));
  addEventListener("load", layout);
  document.fonts && document.fonts.ready.then(layout);
  setTimeout(layout, 50);
})();


/* ---------- Así trabajamos: las cards se abren en abanico y la línea se dibuja al entrar ---------- */
(function(){ const f = document.querySelector(".vfan"); if(!f) return;
  [...f.querySelectorAll(".vcard,.vphoto")].forEach((el,i) => el.style.setProperty("--i", i));
  if("IntersectionObserver" in window) new IntersectionObserver((es,o) => es.forEach(e => { if(e.isIntersecting){ f.classList.add("in"); o.disconnect(); } }), {threshold:.25}).observe(f); else f.classList.add("in"); })();


/* ---------- Carrusel de las 5 líneas ---------- */
(function(){
  const car = document.getElementById("lineCarousel"); if(!car) return;
  const track = car.querySelector(".lcar-track"), slides = [...car.querySelectorAll(".lcar-slide")];
  const dots = [...car.querySelectorAll(".lcar-dots button")], btns = [...car.querySelectorAll(".lcar-btn")];
  const cur = car.querySelector(".lcar-count .cur"), bar = car.querySelector(".lcar-count .bar i");
  const COL = ["#F6A233", "#279A68", "#F6A233", "#279A68", "#F6A233"], TYPE = ["flower", "strokes", "doodle", "flower", "strokes"];
  slides.forEach((sl, i) => sl.querySelector(".lcar-photo").style.setProperty("--blob", 'url("data:image/svg+xml,' + encodeURIComponent(shapeSVG(TYPE[i], COL[i], 90 + i)) + '")'));
  let idx = 0;
  const go = i => { i = Math.max(0, Math.min(slides.length - 1, i)); track.scrollTo({left: i * track.clientWidth}); };
  function mark(i){
    if(i === idx && slides[i].classList.contains("on")) return;
    idx = i;
    slides.forEach((sl, k) => sl.classList.toggle("on", k === i));
    dots.forEach((d, k) => d.setAttribute("aria-selected", String(k === i)));
    cur.textContent = String(i + 1).padStart(2, "0");
    bar.style.width = ((i + 1) / slides.length * 100) + "%";
    btns[0].disabled = i === 0; btns[1].disabled = i === slides.length - 1;
  }
  let raf = 0;
  track.addEventListener("scroll", () => { if(!raf) raf = requestAnimationFrame(() => { raf = 0; mark(Math.round(track.scrollLeft / track.clientWidth)); }); }, {passive:true});
  btns.forEach(b => b.addEventListener("click", () => go(idx + +b.dataset.dir)));
  dots.forEach(d => d.addEventListener("click", () => go(+d.dataset.i)));
  track.addEventListener("keydown", e => { if(e.key === "ArrowRight"){ e.preventDefault(); go(idx + 1); } if(e.key === "ArrowLeft"){ e.preventDefault(); go(idx - 1); } });
  /* arrastrar con el mouse */
  let down = false, x0 = 0, s0 = 0;
  track.addEventListener("pointerdown", e => { if(e.pointerType !== "mouse") return; down = true; x0 = e.clientX; s0 = track.scrollLeft; track.style.scrollSnapType = "none"; track.style.scrollBehavior = "auto"; });
  addEventListener("pointermove", e => { if(down) track.scrollLeft = s0 - (e.clientX - x0); });
  addEventListener("pointerup", e => { if(!down) return; down = false; track.style.scrollSnapType = ""; track.style.scrollBehavior = ""; const dx = e.clientX - x0; go(Math.abs(dx) > 60 ? idx + (dx < 0 ? 1 : -1) : idx); });
  addEventListener("resize", () => track.scrollTo({left: idx * track.clientWidth, behavior:"auto"}));
  mark(0); btns[0].disabled = true;
})();

/* ---------- Programas ---------- */
const PROGRAMS = [
  {"n":"Auxilios educativo-escolares","e":"colaboradores","l":"Educación","d":"Auxilios económicos para cubrir gastos escolares y promover la permanencia educativa de los hijos de los colaboradores en primaria y secundaria.","who":"Hijos de trabajadores directos","where":false,"freq":"2 veces al año (inicio de calendario A y B)","res":"Contribuye a la permanencia escolar y al acceso a recursos necesarios para el desarrollo académico."},
  {"n":"Auxilio de educación superior","e":"colaboradores","l":"Educación","d":"Apoyo económico para el acceso y la continuidad de estudios de educación superior, incluidos programas universitarios y de formación avanzada.","who":"Trabajadores directos e hijos de trabajadores directos","where":false,"freq":"Dos veces al año (primer y segundo semestre)","res":"Favorece la continuidad de la formación académica y fortalece las oportunidades de desarrollo profesional y crecimiento personal."},
  {"n":"Programa de formación y desarrollo para colaboradores","e":"colaboradores","l":"Educación","d":"Espacios de formación que fortalecen las habilidades personales y profesionales de los colaboradores, a través del Club de Liderazgo y la formación en inteligencia artificial.","who":"Colaboradores","comp":["Club de Liderazgo: liderazgo, comunicación efectiva, gestión de equipos y manejo del estrés en entornos de alta presión","Formación en inteligencia artificial"],"where":"Country Club","freq":"Una vez al año","res":"Fortalece habilidades personales y profesionales aplicables al liderazgo, el trabajo en equipo, la gestión de situaciones laborales y el uso de la inteligencia artificial en el trabajo."},
  {"n":"Subsidio para adquisición de vivienda nueva","e":"colaboradores","l":"Vivienda","d":"Apoyo económico para adquirir una vivienda nueva, contribuyendo a una solución habitacional digna y a la estabilidad familiar.","who":"Trabajadores directos","where":false,"freq":"Convocatoria abierta todo el año · se otorga una única vez","res":"Facilita el acceso a vivienda propia y contribuye al bienestar y estabilidad de los hogares."},
  {"n":"Préstamo de vivienda","e":"colaboradores","l":"Vivienda","d":"Ayuda para solucionar emergencias y necesidades de mejoras y reparaciones locativas en las viviendas propias de los colaboradores.","who":"Trabajadores directos","where":false,"freq":"Convocatoria abierta todo el año","res":"Permite mejorar condiciones básicas de habitabilidad y brindar mayor bienestar y dignidad a las familias."},
  {"n":"Proyecto Vivienda Digna","e":"colaboradores","l":"Vivienda","d":"Subsidios para atender necesidades locativas básicas y prioritarias de los hogares, especialmente en cocina, baño y sala.","who":"Trabajadores directos","where":false,"freq":"Una convocatoria al año","note":"Proyecto aprobado por 3 años: 2026, 2027 y 2028.","res":"Permite mejorar condiciones básicas de habitabilidad y brindar mayor bienestar y dignidad a las familias."},
  {"n":"Bienestar Integral – Gimnasio","e":"colaboradores","l":"Bienestar","d":"Iniciativa para promover la actividad física, el ejercicio y la adopción de hábitos de vida saludable.","who":"Colaboradores","where":"Sede principal del Country Club de Barranquilla","freq":"Permanente durante todo el año","res":"Fomenta la actividad física y el cuidado integral de la salud y el bienestar de los colaboradores."},
  {"n":"Curso de natación","e":"colaboradores","l":"Bienestar","d":"Espacio de formación y actividad física que promueve el aprendizaje de nuevas habilidades, hábitos saludables y bienestar integral.","who":"Colaboradores","where":"Proveedor externo","freq":"Una vez al año","res":"Fortalece la actividad física, el aprendizaje de nuevas habilidades y el bienestar integral de los participantes."},
  {"n":"Emprendiendo Juntos – Colaboradores","e":"colaboradores","l":"Bienestar","d":"Modelo de acompañamiento con herramientas y orientación para fortalecer capacidades y explorar opciones para generar ingresos.","who":"Colaboradores","where":false,"res":"Ha despertado el interés de los participantes por adquirir nuevos conocimientos y explorar alternativas para generar ingresos."},
  {"n":"Un espacio para ti","e":"colaboradores","l":"Bienestar","d":"Creamos un espacio de escucha, orientación y acompañamiento para los colaboradores.","who":"Colaboradores","where":false,"freq":"Permanente durante todo el año","res":"Facilita una primera orientación para promover el bienestar y el autocuidado, y brinda herramientas para afrontar situaciones particulares."},
  {"n":"Póliza de beneficio exequial","e":"colaboradores","l":"Bienestar","d":"Apoyo económico y acompañamiento logístico ante el fallecimiento de un familiar.","who":"Trabajadores directos","where":false,"freq":"Durante todo el año","res":"Brinda respaldo económico y acompañamiento oportuno a las familias durante situaciones de pérdida."},
  {"n":"Descubriendo mis Habilidades","e":"comunidad","l":"Gestión social","d":"Fortalecimiento pedagógico que desarrolla en los estudiantes competencias para la vida, el ser y el saber hacer.","who":"Estudiantes del Colegio Eustorgio Salgar","comp":["Fortalecimiento pedagógico en competencias para la vida, el ser y el saber hacer","Auxilio educativo de inglés como requisito de grado"],"where":"Colegio Eustorgio Salgar, Salgar","freq":"Anual","res":"Fortalece habilidades personales y para la vida, promueve el aprendizaje práctico y genera espacios de participación y emprendimiento."},
  {"n":"Emprendiendo Juntos – Comunidad","e":"comunidad","l":"Gestión social","d":"Programa de formación, asesoría y acompañamiento para fortalecer habilidades emprendedoras y competencias personales en mujeres de la comunidad.","who":"20 mujeres del corregimiento de Salgar","where":"Institución Educativa Eustorgio Salgar, Salgar","freq":"Todos los jueves y algunos viernes","comp":["Emprendimiento","Competencias para la vida","Elaboración de velas decorativas"],"res":["20 mujeres fortalecidas en conocimientos y habilidades de emprendimiento y competencias para la vida.","20 mujeres capacitadas en la elaboración de diferentes tipos de velas decorativas.","Fortalecimiento de la confianza y el empoderamiento de las participantes.","Desarrollo de nuevas habilidades prácticas para generar ingresos."]},
  {"n":"Actividades ambientales","e":"comunidad","l":"Gestión ambiental","d":"Capacitación en el manejo adecuado de residuos.","where":"Colegio Eustorgio Salgar"}
];
const LINE_IMG = {"Educación":"assets/img/educacion.webp","Vivienda":"assets/img/vivienda.webp","Bienestar":"assets/img/bienestar.webp","Gestión social":"assets/img/gestion-social.webp","Gestión ambiental":"assets/img/gestion-ambiental.webp"};
const LINE_PAL = {"Educación":"navy","Vivienda":"orange","Bienestar":"green","Gestión social":"sand","Gestión ambiental":"green"};
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = s => s.replace(/[&<>"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
const LINES = {colaboradores:["Educación","Vivienda","Bienestar"], comunidad:["Gestión social","Gestión ambiental"]};
const listHTML = v => Array.isArray(v) ? '<ul class="pdl-list">' + v.map(x => '<li>' + esc(x) + '</li>').join("") + '</ul>' : esc(v);
function enrollLabel(n){
  if(/^Auxilio/i.test(n)) return "Inscribirme al auxilio";
  if(/^Subsidio/i.test(n)) return "Solicitar el subsidio";
  if(/^Préstamo/i.test(n)) return "Solicitar el préstamo";
  if(/^Póliza/i.test(n)) return "Solicitar la póliza";
  if(/^Proyecto/i.test(n)) return "Postularme al proyecto";
  if(/^Curso/i.test(n)) return "Inscribirme al curso";
  if(/^Club/i.test(n)) return "Inscribirme al club";
  return "Inscribirme al programa";
}
function progCard(p, i){
  return `
    <article class="prog" tabindex="0" role="button" aria-expanded="false" data-l="${esc(p.l)}" data-cursor="Más información" style="--i:${i}" aria-label="${esc(p.n)}: ver ficha">
      <div class="media">
        <span class="pill ${p.e==="comunidad"?"m":""}">${esc(p.l)}</span>
        <div class="ph"><img src="${LINE_IMG[p.l]}" alt="" loading="lazy"></div>
      </div>
      <div class="body">
        <div><h3>${esc(p.n)}</h3><p class="pdesc">${esc(p.d)}</p>
          <dl class="pdl"><div class="pdl-in">
            <div><dt>Qué hacemos</dt><dd>${esc(p.d)}</dd></div>
            ${p.who ? '<div><dt>A quién beneficia</dt><dd>' + esc(p.who) + '</dd></div>' : ''}
            ${p.comp ? '<div><dt>Componentes</dt><dd>' + listHTML(p.comp) + '</dd></div>' : ''}
            ${p.where === false ? '' : '<div><dt>Dónde</dt><dd>' + (p.where ? esc(p.where) : 'Por confirmar') + '</dd></div>'}
            ${p.freq ? '<div><dt>Frecuencia</dt><dd>' + esc(p.freq) + '</dd></div>' : ''}
            ${p.note ? '<div><dt>Nota</dt><dd>' + esc(p.note) + '</dd></div>' : ''}
            ${p.res ? '<div><dt>Resultados</dt><dd>' + listHTML(p.res) + '</dd></div>' : ''}
            <div class="pdl-cta"><button type="button" class="cta" data-enroll="${esc(p.n)}">${esc(enrollLabel(p.n))} <span class="arr" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16"/><path d="m13 5 7 7-7 7"/></svg></span></button></div>
          </div></dl>
        </div>
        <div class="foot"><small>${p.freq ? esc(p.freq) : ''}</small><span class="more"><span class="more-t">Más información</span> <i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg></i></span></div>
      </div>
    </article>`;
}
const FHEAD = {
  "todos": ["", "Todos los programas", "", "Programas para colaboradores y sus familias, y para las comunidades de nuestro entorno."],
  "colaboradores": ["Fortalecimiento interno", "Colaboradores y sus ", "familias", "Orientado a fortalecer las capacidades, oportunidades y condiciones de vida de nuestros colaboradores y sus familias, a través de tres líneas."],
  "comunidad": ["Transformación del entorno", "Comunidades de nuestro ", "entorno", "Dirigido a comunidades de nuestro entorno, especialmente Salgar, mediante dos líneas."]
};
const LINE_E = {"Educación":"colaboradores","Vivienda":"colaboradores","Bienestar":"colaboradores","Gestión social":"comunidad","Gestión ambiental":"comunidad"};
let filter = "todos";
const progMatch = f => p => f === "todos" || p.e === f || p.l === f;
function renderPrograms(){
  const list = PROGRAMS.filter(progMatch(filter)), n = list.length;
  const h = FHEAD[filter] || [FHEAD[LINE_E[filter]][0], "", filter, ""];
  const head = document.getElementById("pfhead");
  head.innerHTML = `${filter === "todos" ? "" : `<p class="lead">${h[3]}</p>`}`;
  head.hidden = filter === "todos" || !h[3];
  document.getElementById("plist").innerHTML = n ? list.map(progCard).join("")
    : `<div class="empty">Esta línea estratégica aún no tiene programas concretos. La Fundación debe confirmar qué iniciativas ambientales publicar.</div>`;
  document.querySelectorAll("#pside .ps-b").forEach(b => {
    b.setAttribute("aria-pressed", String(b.dataset.f === filter));
    b.classList.toggle("in", LINE_E[filter] === b.dataset.f);
    b.querySelector(".ps-n").textContent = PROGRAMS.filter(progMatch(b.dataset.f)).length;
  });
}
function setFilter(f, jump){
  filter = f; renderPrograms();
  const page = document.querySelector('[data-page="programas"]'), t = document.getElementById("pshop");
  if(jump !== false) setTimeout(() => window.scrollTo({top: t.getBoundingClientRect().top + scrollY - 20, behavior:"auto"}), page && !page.hidden ? 0 : 900);
}
/* abrir y cerrar la ficha de cada programa */
(function(){ const el = document.getElementById("plist");
  const toggle = card => { const open = !card.classList.contains("open"); card.classList.toggle("open", open); card.setAttribute("aria-expanded", String(open)); const t = card.querySelector(".more-t"); if(t) t.textContent = open ? "Cerrar" : "Más información"; };
  el.addEventListener("click", e => { if(e.target.closest("[data-enroll]")) return; const c = e.target.closest(".prog"); if(c) toggle(c); });
  el.addEventListener("keydown", e => { if((e.key === "Enter" || e.key === " ") && e.target.classList.contains("prog")){ e.preventDefault(); toggle(e.target); } });
})();
document.getElementById("pside").addEventListener("click", e => { const b = e.target.closest(".ps-b"); if(!b) return; const t = document.getElementById("pshop").getBoundingClientRect().top; setFilter(b.dataset.f, t < -40); });
document.addEventListener("click", e => { const a = e.target.closest("[data-filter]"); if(a) setFilter(a.dataset.filter); });

/* ---------- Carrusel de fotos de impacto (Home) ---------- */
(function(){ const sl = document.getElementById("impactSlider"); if(!sl) return;
  const imgs = [...sl.querySelectorAll(":scope > img")], dots = [...sl.querySelectorAll(".islider-dots button")]; let i = 0, t = null;
  const show = n => { i = (n + imgs.length) % imgs.length; imgs.forEach((im,k) => im.classList.toggle("on", k === i)); dots.forEach((d,k) => d.setAttribute("aria-selected", String(k === i))); };
  const play = () => { clearInterval(t); if(!matchMedia("(prefers-reduced-motion: reduce)").matches) t = setInterval(() => show(i + 1), 4500); };
  dots.forEach(d => d.addEventListener("click", () => { show(+d.dataset.i); play(); }));
  sl.addEventListener("pointerenter", () => clearInterval(t)); sl.addEventListener("pointerleave", play);
  play(); })();

/* ---------- Contadores ---------- */
/* el conteo arranca cuando la cifra ya está bien visible, y se repite al volver a entrar a la página */
const countIO = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ countIO.unobserve(e.target); countUp(e.target); } }), {threshold:.6}) : null;
function armCount(el){
  if(reduced || !countIO){ return; }
  delete el.dataset.done; el.textContent = (el.dataset.prefix || "") + "0";
  countIO.observe(el);
}
function countUp(el){
  if(el.dataset.done) return; el.dataset.done = "1";
  const to = +el.dataset.count, dur = 1900, t0 = performance.now();
  if(reduced) return;
  const step = t => { const k = Math.min(1,(t-t0)/dur), e = 1-Math.pow(1-k,3); el.textContent = (el.dataset.prefix || "") + Math.round(to*e).toLocaleString("de-DE"); if(k<1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

/* ---------- Aparición al hacer scroll (solo lo que está debajo del primer pantallazo) ---------- */
const io = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
  entries.forEach(en => {
    if(!en.isIntersecting) return;
    en.target.classList.remove("pre");
    en.target.querySelectorAll("[data-count]").forEach(armCount);
    io.unobserve(en.target);
  });
},{threshold:.12, rootMargin:"0px 0px -40px 0px"}) : null;
function armReveals(scope){
  scope.querySelectorAll(".reveal").forEach(el => {
    const below = el.getBoundingClientRect().top > innerHeight * .9;
    if(io && below && !reduced){ el.classList.add("pre"); io.observe(el); }
    else { el.classList.remove("pre"); el.querySelectorAll("[data-count]").forEach(armCount); }
  });
}

/* ---------- Cambio de color de fondo por sección ---------- */
let toneSections = [];
function updateTone(){
  const mid = innerHeight * .5;
  let tone = "light";
  for(const s of toneSections){ if(s.tagName === "FOOTER" || !s.dataset.tone || !s.offsetParent) continue; const r = s.getBoundingClientRect(); if(r.top <= mid){ tone = s.dataset.tone; if(r.bottom > mid) break; } }
  /* El cambio al color del footer ocurre cuando ya ocupa más de la mitad de la pantalla, no mientras se lee la sección anterior */
  const foot = document.querySelector("footer.site");
  if(foot && foot.getBoundingClientRect().top <= innerHeight * .4) tone = foot.dataset.tone;
  if(document.body.dataset.tone !== tone) document.body.dataset.tone = tone;
}

/* ---------- Secciones fijas (barrido de imágenes y cifras) ---------- */
let pins = [];
function setupPins(scope){
  pins = [...scope.querySelectorAll("[data-pin]")].map(sec => ({
    sec, type: sec.dataset.pin, n: +getComputedStyle(sec).getPropertyValue("--n"),
    items: [...sec.querySelectorAll(sec.dataset.pin==="lines" ? ".pin-item" : ".big")],
    media: [...sec.querySelectorAll(".pin-media .gen")],
    dots: [...sec.querySelectorAll(".dots-v i")],
    bar: sec.querySelector(".pin-prog .bar i"), cur: sec.querySelector(".pin-prog .cur")
  }));
}
function updatePins(){
  const mobile = innerWidth <= 860;
  for(const p of pins){
    const r = p.sec.getBoundingClientRect();
    const span = Math.max(1, r.height - innerHeight);
    const prog = Math.min(1, Math.max(0, -r.top / span));
    let active;
    if(p.type === "lines"){
      if(mobile){ p.items.forEach(i => i.classList.add("on")); continue; }
      const x = prog * p.n;
      p.media.forEach((m,i) => {
        const t = i === p.n - 1 ? 0 : Math.min(1, Math.max(0, x - i - .45));
        m.style.zIndex = p.n - i;
        m.style.setProperty("--wipe", (t*100).toFixed(2) + "%");
        const g = m.querySelector("svg, img"); if(g && !reduced) g.style.transform = `translateY(${(-t*6).toFixed(2)}%) scale(${1 + .06*(1-t)})`;
      });
      active = Math.min(p.n - 1, Math.floor(x + .05));
      if(p.bar) p.bar.style.setProperty("--p", ((active + 1) / p.n).toFixed(3));
      if(p.cur) p.cur.textContent = active + 1;
    } else {
      active = Math.min(p.n - 1, Math.floor(prog * p.n));
      p.dots.forEach((d,i) => d.classList.toggle("on", i === active));
    }
    p.items.forEach((it,i) => { it.classList.toggle("on", i === active); it.classList.toggle("past", i < active); });
  }
}

/* ---------- Parallax suave en visuales ---------- */
let parallaxEls = [];
function updateParallax(){
  if(reduced) return;
  for(const el of parallaxEls){
    const r = el.getBoundingClientRect();
    if(r.bottom < 0 || r.top > innerHeight) continue;
    const k = ((r.top + r.height/2) - innerHeight/2) / innerHeight;
    const svg = el.querySelector("svg, img, video"); if(svg) svg.style.transform = `translateY(${(k * +el.dataset.parallax * 100).toFixed(2)}px)`;
  }
}

/* ---------- Header fijo ---------- */
const header = document.getElementById("siteHeader");
let lastY = scrollY;
function updateHeader(){
  const y = scrollY;
  header.classList.toggle("scrolled", y > 20);
  lastY = y;
  /* Texto blanco solo mientras el header transparente está sobre la portada oscura */
  const sheet = document.querySelector("[data-page]:not([hidden]) .hero-sheet, [data-page]:not([hidden]) .ct-hero, [data-page]:not([hidden]) .nhero, [data-page]:not([hidden]) .art-hero");
  const onDark = !!sheet && y <= 20 && sheet.getBoundingClientRect().bottom > 90;
  header.classList.toggle("on-dark", onDark || document.body.classList.contains("menu-open"));
}

let ticking = false;
function onScroll(){ if(ticking) return; ticking = true; requestAnimationFrame(() => { ticking = false; updateHeader(); updateTone(); updatePins(); updateParallax(); }); }
addEventListener("scroll", onScroll, {passive:true});
addEventListener("resize", onScroll);

/* ---------- Menú de pantalla completa ---------- */
const mm = document.getElementById("megaMenu"), burger = document.getElementById("burger");
function openMenu(){
  const r = burger.getBoundingClientRect();
  mm.style.setProperty("--mx", (r.left + r.width/2) + "px");
  mm.style.setProperty("--my", (r.top + r.height/2) + "px");
  mm.classList.remove("closing"); mm.classList.add("open"); mm.setAttribute("aria-hidden","false");
  document.body.classList.add("menu-open"); header.classList.remove("hide");
  burger.setAttribute("aria-expanded","true"); burger.setAttribute("aria-label","Cerrar menú"); updateHeader();
  setTimeout(() => mm.querySelector(".mm-group a")?.focus({preventScroll:true}), reduced ? 0 : 600);
}
function closeMenu(focusBack){
  if(!mm.classList.contains("open")) return;
  mm.classList.remove("open"); mm.classList.add("closing"); mm.setAttribute("aria-hidden","true");
  document.body.classList.remove("menu-open");
  burger.setAttribute("aria-expanded","false"); burger.setAttribute("aria-label","Abrir menú"); updateHeader();
  setTimeout(() => mm.classList.remove("closing"), reduced ? 0 : 900);
  if(focusBack) burger.focus();
}
burger.addEventListener("click", () => mm.classList.contains("open") ? closeMenu(true) : openMenu());
mm.addEventListener("click", e => { if(e.target.closest("a")) closeMenu(false); });
addEventListener("keydown", e => { if(e.key === "Escape") closeMenu(true); });
/* el logo (header, menú y footer) siempre lleva al inicio, también si ya se está en él */
document.addEventListener("click", e => { const a = e.target.closest('a[href="#inicio"]'); if(!a) return;
  closeMenu(false);
  if((location.hash || "#inicio") === "#inicio"){ e.preventDefault(); window.scrollTo({top:0, behavior: reduced ? "auto" : "smooth"}); } });

/* ---------- Navegación entre páginas ---------- */
const PAGES = ["inicio","nosotros","programas","impacto","apoya","boletines","boletin","informes","contacto"];
function route(){
  const h = (location.hash || "#inicio").slice(1);
  const page = PAGES.includes(h) ? h : /^boletin-\d+$/.test(h) ? "boletin" : (h === "formContacto" ? "contacto" : h === "donar" ? "contacto" : "inicio");
  let current;
  document.querySelectorAll("[data-page]").forEach(s => { s.hidden = s.dataset.page !== page; if(!s.hidden) current = s; });
  document.querySelectorAll(".hnav .link-u").forEach(a => a.getAttribute("href")==="#"+page ? a.setAttribute("aria-current","page") : a.removeAttribute("aria-current"));
  if(h === "formContacto") document.getElementById("formContacto").scrollIntoView();
  else if(h === "donar"){ /* el botón Donar del header lleva directo al formulario, con "Donar" ya marcado */
    const f = document.getElementById("contactForm"), r = f.querySelector('input[type="radio"][value="Donar"]');
    if(r){ r.checked = true; r.dispatchEvent(new Event("change", {bubbles:true})); }
    window.scrollTo(0, Math.max(0, f.getBoundingClientRect().top + scrollY - 110));
  }
  else window.scrollTo(0,0);
  if(page === "programas") renderPrograms();
  if(page === "boletin" && window.renderBoletin) window.renderBoletin(h);
  toneSections = [...current.querySelectorAll("[data-tone]"), document.querySelector("footer.site")];
  parallaxEls = [...current.querySelectorAll("[data-parallax]")];
  setupPins(current);
  lastY = scrollY; header.classList.remove("hide");
  requestAnimationFrame(() => { if(HW && page === "inicio"){ HW.layout(); HW.update(); } armScribbles(current); armScribbles(document.querySelector("footer.site")); armReveals(current); armReveals(document.querySelector("footer.site")); updateHeader(); updateTone(); updatePins(); updateParallax(); });
}
addEventListener("hashchange", route);
document.addEventListener("click", e => { if(e.target.closest('a[href="#donar"]') && location.hash === "#donar"){ e.preventDefault(); route(); } });
document.addEventListener("click", e => { const g = e.target.closest("[data-go]"); if(g) location.hash = g.dataset.go; });
document.addEventListener("keydown", e => { if(e.key === "Enter" && e.target.matches && e.target.matches("[data-go]")) location.hash = e.target.dataset.go; });


/* ---------- Desplegable propio (mantiene el <select> original para el envío y la accesibilidad) ---------- */
function enhanceSelect(sel){
  if(!sel || sel.closest(".cs")) return null;
  const box = document.createElement("div"); box.className = "cs";
  sel.parentNode.insertBefore(box, sel); box.appendChild(sel); sel.tabIndex = -1; sel.setAttribute("aria-hidden", "true");
  const btn = document.createElement("button"); btn.type = "button"; btn.className = "cs-btn"; btn.setAttribute("aria-haspopup", "listbox"); btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = '<span></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const list = document.createElement("div"); list.className = "cs-list"; list.setAttribute("role", "listbox");
  const add = o => { const b = document.createElement("button"); b.type = "button"; b.className = "cs-opt"; b.setAttribute("role", "option"); b.dataset.v = o.value; b.textContent = o.textContent; list.appendChild(b); };
  [...sel.children].forEach(ch => {
    if(ch.tagName === "OPTGROUP"){ const g = document.createElement("div"); g.className = "cs-group"; g.textContent = ch.label; list.appendChild(g); [...ch.children].forEach(add); }
    else add(ch);
  });
  box.appendChild(btn); box.appendChild(list);
  const opts = [...list.querySelectorAll(".cs-opt")];
  const sync = () => { btn.firstElementChild.textContent = sel.options[sel.selectedIndex] ? sel.options[sel.selectedIndex].textContent : ""; opts.forEach(o => o.setAttribute("aria-selected", String(o.dataset.v === sel.value))); };
  const close = focus => { box.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); if(focus) btn.focus(); };
  const open = () => {
    sync();
    const r = btn.getBoundingClientRect(), need = Math.min(320, innerHeight * .46) + 16;
    box.classList.toggle("up", innerHeight - r.bottom < need && r.top > innerHeight - r.bottom);
    box.classList.add("open"); btn.setAttribute("aria-expanded", "true");
    const cur = opts.find(o => o.getAttribute("aria-selected") === "true") || opts[0];
    if(cur){ list.scrollTop = cur.offsetTop - list.clientHeight / 2 + cur.offsetHeight / 2; cur.focus({preventScroll:true}); }
  };
  btn.addEventListener("click", () => box.classList.contains("open") ? close() : open());
  list.addEventListener("click", e => { const o = e.target.closest(".cs-opt"); if(!o) return; sel.value = o.dataset.v; sel.dispatchEvent(new Event("change", {bubbles:true})); sync(); close(true); });
  box.addEventListener("keydown", e => {
    const k = opts.indexOf(document.activeElement);
    if(e.key === "Escape" && box.classList.contains("open")){ e.preventDefault(); close(true); }
    else if(e.key === "ArrowDown"){ e.preventDefault(); if(!box.classList.contains("open")) open(); else (opts[Math.min(opts.length - 1, k + 1)] || opts[0]).focus(); }
    else if(e.key === "ArrowUp"){ e.preventDefault(); if(box.classList.contains("open")) (opts[Math.max(0, k - 1)] || opts[0]).focus(); }
    else if(e.key === "Tab") close();
  });
  document.addEventListener("pointerdown", e => { if(!box.contains(e.target)) close(); });
  sel.addEventListener("change", sync);
  sync();
  return sync;
}

/* ---------- Formas de apoyo y formularios ---------- */
const WAY_ID = {"Dona":"dona","Sé voluntario":"voluntario","Haz una alianza":"alianza"};
const goTo = el => window.scrollTo({top: el.getBoundingClientRect().top + scrollY - 90, behavior: reduced ? "auto" : "smooth"});
const WAY_CHIP = {"Dona":"Donar","Sé voluntario":"Ser voluntario","Haz una alianza":"Crear una alianza"};
function setWay(w){
  document.querySelectorAll("#ways .way").forEach(x => x.setAttribute("aria-pressed", String(x.dataset.w === w)));
  document.getElementById("s-way").value = w;
  document.querySelectorAll("#s-way-chips input").forEach(r => r.checked = r.value === WAY_CHIP[w]);
  volField(w === "Sé voluntario");
}
/* El voluntariado es solo para socios: se pide el número de acción */
function volField(on){ document.getElementById("s-acc-wrap").hidden = !on; document.getElementById("s-acc").required = on; }

document.querySelectorAll("[data-way]").forEach(btn => btn.addEventListener("click", () => {
  setWay(btn.dataset.way);
  goTo(document.getElementById("sp-form"));
}));
document.getElementById("s-way").addEventListener("change", e => setWay(e.target.value));
document.getElementById("s-way-chips").addEventListener("change", e => { const w = Object.keys(WAY_CHIP).find(k => WAY_CHIP[k] === e.target.value); if(w) setWay(w); else volField(false); });
function wireForm(id, okId){
  document.getElementById(id).addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target;
    if(!f.checkValidity()){ f.reportValidity(); return; }
    document.getElementById(okId).hidden = false;
  });
}
wireForm("supportForm","supportOk");
wireForm("contactForm","contactOk");

/* ---------- Mostrar u ocultar datos pendientes ---------- */
const notes = document.getElementById("notesToggle");
try { if(localStorage.getItem("fcc-notes")==="off"){ notes.checked=false; document.body.classList.add("hide-notes"); } } catch(e){}
notes.addEventListener("change", () => {
  document.body.classList.toggle("hide-notes", !notes.checked);
  try { localStorage.setItem("fcc-notes", notes.checked ? "on" : "off"); } catch(e){}
});

renderPrograms();
route();
