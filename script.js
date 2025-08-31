/***** ===== DOM SAFE INIT ===== *****/
const $$ = id => {
  const el = document.getElementById(id);
  if (!el) console.error(`❌ Missing #${id}`);
  return el;
};
const els = {};
function hydrateElements(){
  [
    'setSelect','sentSelect','showTarget','guideToggle','fullToggle','timerToggle',
    'startBtn','resetBtn','openCustomBtn','openCustomBtn2','timeCount','progressBar',
    'setTitle','partTitle','targetLine','recLine','listenBtn','listenFullBtn',
    'recBtn','recFullBtn','stopBtn','acc','words','used','wpm','prevBtn','nextBtn',
    'againBtn','guidePanel','customPanel','cTitle','cS1','cS2','cS3','cS4','cS5',
    'saveCustomBtn','clearCustomBtn','customList','progressText',
    'recFileBtn','stopFileBtn','downloadBtn','playback','fileInfo'
  ].forEach(id=>els[id]=$$(id));
}
window.addEventListener('DOMContentLoaded', () => {
  hydrateElements();
  safeInit();
});

/***** ===== DATA: 10 SETS x 5 SENTENCES ===== *****/
const bank = [
  { id:1, title:"🏖️ Beach vendor (man + cart)", sentences:[
    "This picture shows a man walking on the beach while pushing a large cart full of clothes.",
    "He is wearing a casual shirt and dark trousers, and he looks focused on his work.",
    "Behind him, the ocean waves look calm and the sky is bright, creating a peaceful atmosphere.",
    "It seems that he might be selling clothes to tourists who visit the beach; this is common in tourist areas.",
    "This picture reminds me of people’s hard work and makes me appreciate simple jobs with dignity."
  ]},
  { id:2, title:"🏖️ Friends at the beach", sentences:[
    "In this photo, I can see a group of young people spending their time together on the beach.",
    "Most of them are wearing colorful T-shirts and shorts, and they are smiling while posing for the camera.",
    "In the background, there are umbrellas and calm ocean waves, making the scene cheerful and relaxing.",
    "Perhaps they are enjoying their holiday to celebrate a special occasion, which often happens in summer.",
    "Looking at this photo, I feel happy; it reminds me to share good moments with close friends."
  ]},
  { id:3, title:"🛒 Street market", sentences:[
    "This image portrays several people moving through a lively street market.",
    "They are browsing fresh produce and carrying woven bags while chatting politely with the sellers.",
    "Hanging lights and handwritten signs appear in the background, creating a warm neighborhood feeling.",
    "It looks like they are shopping for a family meal, which suggests a community tradition.",
    "Personally, I find this photo heartwarming; it highlights the importance of local small businesses."
  ]},
  { id:4, title:"🎓 Graduation day", sentences:[
    "This picture shows a group of students wearing black gowns and mortarboards outside a decorated hall.",
    "They are holding diplomas, exchanging hugs, and smiling brightly for the camera.",
    "Banners and flowers in the background make the setting look festive and proud.",
    "The scene suggests a formal graduation ceremony where families celebrate academic success.",
    "To me, this image represents dedication and reminds us that hard work eventually pays off."
  ]},
  { id:5, title:"🛫 Airport travel", sentences:[
    "In this photograph, two travelers are standing near large windows that face the runway.",
    "They are checking their boarding passes, rolling suitcases, and waving toward someone off-camera.",
    "Departure screens and distant aircraft appear in the background, creating an international atmosphere.",
    "It seems likely that they are about to board a flight for a holiday or study abroad.",
    "This picture makes me feel excited; it shows how travel opens minds and creates new opportunities."
  ]},
  { id:6, title:"🏫 Classroom project", sentences:[
    "This picture shows several students gathered around desks covered with books and colored papers.",
    "They are discussing ideas, taking quick notes, and arranging materials for a group presentation.",
    "A whiteboard and posters in the background make the classroom look active and creative.",
    "The scene suggests they are preparing for a project, which requires teamwork and clear communication.",
    "To me, this image highlights collaboration and the value of learning from one another."
  ]},
  { id:7, title:"⛰️ Hiking adventure", sentences:[
    "This photo shows three hikers standing on a rocky trail overlooking distant mountains.",
    "They are pointing at the view, tightening their backpack straps, and catching their breath.",
    "Clear skies and winding paths in the background create a fresh and inspiring atmosphere.",
    "It seems that they are on a challenging day hike, testing their stamina and patience.",
    "This picture reminds me to stay active and appreciate nature whenever I can."
  ]},
  { id:8, title:"🎂 Birthday celebration", sentences:[
    "This image shows a family gathered around a table with a large decorated cake.",
    "They are clapping, smiling at the child in front, and getting ready to sing loudly.",
    "Colorful balloons and streamers in the background make the room look cheerful and bright.",
    "It looks like they are celebrating a birthday at home, creating warm memories together.",
    "Personally, I find this scene touching because it shows love and gratitude in a simple way."
  ]},
  { id:9, title:"🏢 Team meeting", sentences:[
    "This picture shows colleagues gathered around a laptop in a bright modern office.",
    "They are reviewing slides, nodding thoughtfully, and jotting down ideas in small notebooks.",
    "Glass walls and sticky notes in the background create a focused and innovative atmosphere.",
    "The scene suggests that they are planning a project sprint or preparing for a client presentation.",
    "To me, this photo represents problem-solving and the power of working as a team."
  ]},
  { id:10, title:"🍽️ Family dinner", sentences:[
    "In this photo, several relatives are sitting together at a dining table set with homemade dishes.",
    "They are passing bowls, sharing stories, and laughing softly between bites of food.",
    "Warm lighting and framed photos in the background make the place feel cozy and personal.",
    "It seems that they are enjoying a weekend dinner, strengthening their family bonds.",
    "This image reminds me that simple meals can create meaningful connections and lasting memories."
  ]},
];
const CUSTOM_KEY = 'det_speak_custom_v1';
let customBank = [];

/***** ===== STATE & CONST ===== *****/
const PART5 = [
  'Opening – General Overview',
  'Description – Clothes & Actions',
  'Background – Setting',
  'Inference – Context',
  'Reflection – Closing'
];
const DUR = 90;
let state = {
  setIndex: 0,
  sentIndex: 0,
  running: false,
  timerId: null,
  startedAt: null,
  usedSec: 0,
  progress: {completed:0, best:0},
  recog: {active:false, startAt:0, lastTranscript:""},
  fullMode: false,
  mediaStream: null,
  mediaRecorder: null,
  chunks: [],
  blob: null,
  blobUrl: ''
};

/***** ===== INIT ===== *****/
function safeInit(){
  loadCustom();
  buildSetSelect();
  bindEvents();
  syncUI();
}

/***** ===== CORE HELPERS ===== *****/
function allBank(){ return bank.concat(customBank||[]); }
function buildSetSelect(){
  const sel = els.setSelect; sel.innerHTML='';
  const full = allBank();
  if(!full.length){
    const o=document.createElement('option'); o.value=0; o.textContent='— No templates —'; sel.appendChild(o);
    return;
  }
  full.forEach((s,i)=>{ const o=document.createElement('option'); o.value=i; o.textContent=`${String(i+1).padStart(2,'0')} — ${s.title}`; sel.appendChild(o); });
  state.setIndex = Math.min(state.setIndex, full.length-1);
  sel.value = state.setIndex;
}
function bindEvents(){
  els.setSelect.addEventListener('change', e=>{ state.setIndex=+e.target.value; resetAll(false); });
  els.sentSelect.addEventListener('change', e=>{ state.sentIndex=+e.target.value; renderTarget(); renderTitles(); resetStats(); });
  els.showTarget.addEventListener('change', updateTargetVisibility);
  els.guideToggle.addEventListener('change', ()=> els.guidePanel.style.display = els.guideToggle.checked?'block':'none');
  els.fullToggle.addEventListener('change', ()=>{ state.fullMode=els.fullToggle.checked; renderTarget(); renderTitles(); resetStats(); });
  els.timerToggle.addEventListener('change', ()=>{ els.timeCount.textContent = els.timerToggle.checked? String(DUR) : '—'; if(!els.timerToggle.checked){ els.progressBar.style.width='0%'; }});

  els.startBtn.addEventListener('click', startSession);
  els.resetBtn.addEventListener('click', ()=> resetAll(true));

  // open/close custom panel
  els.openCustomBtn.addEventListener('click', ()=>{ toggleCustomPanel(); });
  els.openCustomBtn2.addEventListener('click', ()=>{ toggleCustomPanel(); });

  // nav
  els.prevBtn?.addEventListener('click', ()=>{ state.sentIndex=(state.sentIndex+4)%5; els.sentSelect.value=state.sentIndex; renderTarget(); renderTitles(); resetStats(); });
  els.nextBtn?.addEventListener('click', ()=>{ state.sentIndex=(state.sentIndex+1)%5; els.sentSelect.value=state.sentIndex; renderTarget(); renderTitles(); resetStats(); });
  els.againBtn?.addEventListener('click', ()=> resetStats());

  // custom CRUD
  els.saveCustomBtn.addEventListener('click', saveCustom);
  els.clearCustomBtn.addEventListener('click', ()=>{ ['cTitle','cS1','cS2','cS3','cS4','cS5'].forEach(id=>els[id].value=''); els.cTitle.focus(); });

  // TTS
  els.listenBtn.addEventListener('click', ()=> speakText(currentTarget(false)));
  els.listenFullBtn.addEventListener('click', ()=> speakText(currentTarget(true)));

  // STT
  els.recBtn.addEventListener('click', ()=> startRec(false));
  els.recFullBtn.addEventListener('click', ()=> startRec(true));
  els.stopBtn.addEventListener('click', ()=> stopRec());

  // MediaRecorder
  els.recFileBtn.addEventListener('click', startFileRecording);
  els.stopFileBtn.addEventListener('click', stopFileRecording);
  els.downloadBtn.addEventListener('click', downloadRecording);
}
function toggleCustomPanel(){
  const show = els.customPanel.style.display!=='block';
  els.customPanel.style.display = show?'block':'none';
  if(show) els.cTitle.focus();
}

function syncUI(){ renderTitles(); renderTarget(); resetStats(); updateProgress(); }
function renderTitles(){
  const set = allBank()[state.setIndex];
  els.setTitle.textContent = set? set.title : '—';
  els.partTitle.textContent = state.fullMode? 'Full Set (1–5)' : (PART5[state.sentIndex]||'—');
}
function renderTarget(){
  const set = allBank()[state.setIndex];
  if(!set){ els.targetLine.innerHTML='<i class="muted">No template</i>'; return; }
  const text = state.fullMode? set.sentences.join(' ') : set.sentences[state.sentIndex];
  els.targetLine.innerHTML = escapeHtml(text);
  updateTargetVisibility();
}
function updateTargetVisibility(){
  els.targetLine.style.display = els.showTarget.checked ? 'block':'none';
}
function resetAll(hard){
  stopTimer(); stopRec(true);
  state.running=false; state.usedSec=0;
  els.timeCount.textContent = els.timerToggle.checked? String(DUR) : '—';
  els.progressBar.style.width='0%';
  if(hard){
    state.setIndex = Math.floor(Math.random()*allBank().length);
    els.setSelect.value = state.setIndex;
  }
  state.sentIndex=0; els.sentSelect.value=0;
  renderTitles(); renderTarget(); resetStats(); updateProgress();
}
function resetStats(){
  els.recLine.innerHTML='';
  els.acc.textContent='0%'; els.words.textContent='0/0'; els.used.textContent='0s'; els.wpm.textContent='0';
  els.againBtn.disabled=false; state.recog.lastTranscript='';
}

/***** ===== TIMER ===== *****/
function startSession(){
  if(state.running) return;
  state.running=true; state.startedAt=Date.now(); state.usedSec=0;
  if(els.timerToggle.checked){ tickTimer(); state.timerId=setInterval(tickTimer,1000); }
  else { els.timeCount.textContent='—'; }
}
function tickTimer(){
  state.usedSec = Math.max(0, ((Date.now()-state.startedAt)/1000)|0);
  const remain = Math.max(0, DUR - state.usedSec);
  els.timeCount.textContent = String(remain);
  els.used.textContent = `${state.usedSec}s`;
  els.progressBar.style.width = `${(state.usedSec/DUR)*100}%`;
  if(remain<=0){ stopTimer(); stopRec(); }
}
function stopTimer(){ if(state.timerId){ clearInterval(state.timerId); state.timerId=null; } }

/***** ===== TTS ===== *****/
function speakText(text){
  if(!('speechSynthesis' in window)){ alert('Speech Synthesis not supported.'); return; }
  const u = new SpeechSynthesisUtterance(text);
  u.lang='en-US'; u.rate=1; u.pitch=1;
  window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
}

/***** ===== STT ===== *****/
let SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
let rec = null;
function startRec(full){
  if(!SR){ alert('Speech Recognition not supported (try Chrome/Edge).'); return; }
  if(state.recog.active) return;
  rec = new SR();
  rec.lang='en-US'; rec.interimResults=true; rec.maxAlternatives=1; rec.continuous=false;

  state.fullMode = full || state.fullMode; if(full) els.fullToggle.checked=true;
  els.stopBtn.disabled=false; els.recBtn.disabled=true; els.recFullBtn.disabled=true;
  els.recLine.innerHTML='<span class="muted">Listening… speak clearly.</span>';

  rec.onstart = ()=>{ state.recog.active=true; state.recog.startAt=Date.now(); };
  rec.onresult = (e)=>{
    let t=''; for(let i=0;i<e.results.length;i++){ t += e.results[i][0].transcript + (e.results[i].isFinal?'':' '); }
    state.recog.lastTranscript = t.trim(); renderDiff();
  };
  rec.onerror = (e)=>{ console.warn('rec error', e.error); };
  rec.onend = ()=>{
    state.recog.active=false;
    els.recBtn.disabled=false; els.recFullBtn.disabled=false; els.stopBtn.disabled=true;
    computeStats();
  };
  try{ rec.start(); }catch(err){ console.warn(err); }
}
function stopRec(silent){
  if(!rec) return;
  try{ rec.stop(); }catch(_){}
  if(!silent) computeStats();
}

/***** ===== DIFF & STATS ===== *****/
function currentTarget(full){
  const set = allBank()[state.setIndex];
  return full? set.sentences.join(' ') : set.sentences[state.sentIndex];
}
function normalizeWords(s){
  return (s||'').toLowerCase().replace(/[^\w\s’'-]/g,'').trim().split(/\s+/).filter(Boolean);
}
function alignWords(expArr, actArr){
  const n=expArr.length,m=actArr.length;
  const dp=Array.from({length:n+1},()=>Array(m+1).fill(0));
  const bt=Array.from({length:n+1},()=>Array(m+1).fill(null));
  for(let i=0;i<=n;i++){ dp[i][0]=i; bt[i][0]='del'; }
  for(let j=0;j<=m;j++){ dp[0][j]=j; bt[0][j]='ins'; }
  for(let i=1;i<=n;i++){
    for(let j=1;j<=m;j++){
      const same=expArr[i-1]===actArr[j-1];
      const a=dp[i-1][j-1]+(same?0:1), b=dp[i-1][j]+1, c=dp[i][j-1]+1;
      const min=Math.min(a,b,c);
      dp[i][j]=min; bt[i][j]=(min===a)?(same?'match':'sub'):(min===b?'del':'ins');
    }
  }
  let i=n,j=m,ops=[];
  while(i>0||j>0){
    const op=bt[i][j];
    if(op==='match'||op==='sub'){ ops.push({type:op,exp:expArr[i-1],act:actArr[j-1]}); i--; j--; }
    else if(op==='del'){ ops.push({type:'del',exp:expArr[i-1]}); i--; }
    else if(op==='ins'){ ops.push({type:'ins',act:actArr[j-1]}); j--; }
  }
  return ops.reverse();
}
function renderDiff(){
  const exp = normalizeWords(currentTarget(state.fullMode));
  const act = normalizeWords(state.recog.lastTranscript||'');
  const ops = alignWords(exp, act);
  const expSpans=[], actSpans=[];
  ops.forEach(op=>{
    if(op.type==='match') expSpans.push(spanWord(op.exp,'ok')); 
    else if(op.type==='sub'||op.type==='del') expSpans.push(spanWord(op.exp,'miss'));
  });
  ops.forEach(op=>{
    if(op.type==='match') actSpans.push(spanWord(op.act,'ok'));
    else if(op.type==='sub') actSpans.push(spanWord(op.act,'bad'));
    else if(op.type==='ins') actSpans.push(spanWord(op.act,'extra'));
  });
  els.targetLine.innerHTML = els.showTarget.checked ? expSpans.join(' ') : '';
  els.recLine.innerHTML = actSpans.join(' ') || '<span class="muted">…waiting</span>';
}
function computeStats(){
  const exp = normalizeWords(currentTarget(state.fullMode));
  const act = normalizeWords(state.recog.lastTranscript||'');
  const ops = alignWords(exp,act);
  const ok = ops.filter(o=>o.type==='match').length;
  const total = exp.length||1;
  const acc = Math.round((ok/total)*100);
  const seconds = Math.max(1, state.usedSec || ((Date.now()- (state.recog.startAt||Date.now()))/1000)|0);
  const wpm = Math.max(0, Math.round((act.length/seconds)*60));
  els.acc.textContent = acc+'%'; els.words.textContent = `${ok}/${total}`; els.wpm.textContent = String(wpm);
  state.progress.completed += 1; state.progress.best = Math.max(state.progress.best, acc); updateProgress();
}
function updateProgress(){ els.progressText.textContent = `${state.progress.completed} sentences • best accuracy ${state.progress.best}%`; }
function spanWord(w,cls){ return `<span class="word ${cls}">${escapeHtml(w)}</span>`; }
function escapeHtml(s){ return (s||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

/***** ===== CUSTOM (localStorage) ===== *****/
function loadCustom(){
  try{
    const raw=localStorage.getItem(CUSTOM_KEY);
    customBank = raw? JSON.parse(raw): [];
    if(!Array.isArray(customBank)) customBank=[];
  }catch(e){
    console.warn('custom corrupted, clearing', e); customBank=[]; localStorage.removeItem(CUSTOM_KEY);
  }
  renderCustomList();
}
function persistCustom(){ localStorage.setItem(CUSTOM_KEY, JSON.stringify(customBank)); }
function saveCustom(){
  const t=(els.cTitle.value||'').trim();
  const s=[els.cS1,els.cS2,els.cS3,els.cS4,els.cS5].map(x=>(x.value||'').trim());
  if(!t || s.some(x=>!x)){ alert('Please fill title and all 5 sentences.'); return; }
  const item={id:Date.now(), title:`★ ${t}`, sentences:s};
  customBank.push(item); persistCustom(); buildSetSelect();
  state.setIndex = allBank().length-1; els.setSelect.value = state.setIndex;
  ['cTitle','cS1','cS2','cS3','cS4','cS5'].forEach(id=>els[id].value=''); renderCustomList(); resetAll(false);
}
function renderCustomList(){
  els.customList.innerHTML='';
  if(customBank.length===0){ els.customList.innerHTML='<div class="muted">No custom templates yet.</div>'; return; }
  customBank.forEach((t,idx)=>{
    const row=document.createElement('div'); row.className='custom-item';
    row.innerHTML = `<strong>${String(idx+1).padStart(2,'0')}</strong> <span style="flex:1">${escapeHtml(t.title)}</span>
      <button data-id="${t.id}" class="ghost">Delete</button>`;
    row.querySelector('button').addEventListener('click', e=>{
      const id=+e.target.getAttribute('data-id');
      customBank = customBank.filter(x=>x.id!==id); persistCustom(); buildSetSelect();
      if(state.setIndex>=allBank().length) state.setIndex=allBank().length-1;
      renderCustomList(); resetAll(false);
    });
    els.customList.appendChild(row);
  });
}

/***** ===== MEDIARECORDER (record → file) ===== */
async function ensureStream(){
  if(state.mediaStream) return state.mediaStream;
  try{ state.mediaStream = await navigator.mediaDevices.getUserMedia({audio:true}); return state.mediaStream; }
  catch(e){ alert('Microphone permission denied.'); throw e; }
}
async function startFileRecording(){
  const stream = await ensureStream();
  state.chunks=[]; const mr = new MediaRecorder(stream); state.mediaRecorder=mr;
  els.recFileBtn.disabled=true; els.stopFileBtn.disabled=false; els.downloadBtn.disabled=true; els.fileInfo.textContent='Recording…';
  mr.ondataavailable = e=>{ if(e.data && e.data.size) state.chunks.push(e.data); };
  mr.onstop = ()=>{
    state.blob = new Blob(state.chunks, { type: mr.mimeType || 'audio/webm' });
    state.blobUrl = URL.createObjectURL(state.blob);
    els.playback.src = state.blobUrl;
    els.downloadBtn.disabled=false;
    els.fileInfo.textContent = `Saved ${Math.round(state.blob.size/1024)} KB (${mr.mimeType||'audio/webm'})`;
  };
  mr.start();
}
function stopFileRecording(){
  if(state.mediaRecorder && state.mediaRecorder.state!=='inactive'){ state.mediaRecorder.stop(); }
  els.recFileBtn.disabled=false; els.stopFileBtn.disabled=true;
}
function downloadRecording(){
  if(!state.blob) return;
  const a=document.createElement('a'); a.href=state.blobUrl; a.download=`det-speak-${Date.now()}.webm`;
  document.body.appendChild(a); a.click(); a.remove();
}
