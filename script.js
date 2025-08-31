/***** ====== SAFE INIT WRAPPER ====== *****/

// ⛑️ Utility: aman ambil elemen + log kalau hilang
const $$ = (id) => {
  const el = document.getElementById(id);
  if (!el) console.error(`❌ Missing element #${id} in HTML`);
  return el;
};

// ⛑️ Kumpulkan semua elemen di sini (baru diisi setelah DOM siap)
const els = {};
function hydrateElements(){
  // daftar ID yang wajib ada
  const ids = [
    'setSelect','sentSelect','showTarget','guideToggle','fullToggle','timerToggle',
    'startBtn','resetBtn','openCustomBtn','timeCount','progressBar',
    'setTitle','partTitle','targetLine','recLine','listenBtn','listenFullBtn',
    'recBtn','recFullBtn','stopBtn','acc','words','used','wpm','prevBtn','nextBtn',
    'againBtn','guidePanel','customPanel','cTitle','cS1','cS2','cS3','cS4','cS5',
    'saveCustomBtn','clearCustomBtn','customList','progressText',
    // opsional (MediaRecorder)
    'recFileBtn','stopFileBtn','downloadBtn','playback','fileInfo'
  ];
  ids.forEach(id => els[id] = $$(id));
}

// ✅ Pastikan init dipanggil SETELAH DOM siap
window.addEventListener('DOMContentLoaded', () => {
  try {
    hydrateElements();
    safeInit();
  } catch (e) {
    console.error('❌ Fatal during init:', e);
  }
});

/***** ====== DATA BANK (pastikan tidak kosong) ====== *****/

// ⚠️ Pastikan bank berisi 10 set (isi milikmu sendiri). Contoh minimal di bawah.
// Jika kamu sudah punya "bank" yang lengkap, BIARKAN punyamu. Yang penting: array-nya tidak kosong.
const defaultBank = [
  { id:1, title:"🏖️ Beach vendor (man + cart)", sentences:[
    "This picture shows a man walking on the beach while pushing a large cart full of clothes.",
    "He is wearing a casual shirt and dark trousers, and he looks focused on his work.",
    "Behind him, the ocean waves look calm and the sky is bright, creating a peaceful atmosphere.",
    "It seems that he might be selling clothes to tourists who visit the beach; this is common in tourist areas.",
    "This picture reminds me of people’s hard work and makes me appreciate simple jobs with dignity."
  ]},
  // … (lengkapi sampai 10 set milikmu)
];

// Jika kamu mendefinisikan "bank" di file ini, cukup pakai const bank = [ ... ];
// Kalau bank-mu didefinisikan di file lain, pastikan file itu di-load SEBELUM script.js (atau gabungkan).
// Di bawah ini, kita siapkan getter aman:
let bank = (typeof window.bank !== 'undefined' && Array.isArray(window.bank) && window.bank.length)
  ? window.bank
  : (typeof bank !== 'undefined' && Array.isArray(bank) && bank.length ? bank : defaultBank);

// LocalStorage key
const CUSTOM_KEY = 'det_speak_custom_v1';
let customBank = [];

/***** ====== STATE & KONST ====== *****/
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

/***** ====== SAFE INIT (ganti init lama kamu dengan ini) ====== *****/
function safeInit(){
  // 1) pulihkan custom bank
  loadCustom();

  // 2) kalau bank kosong total → pakai default
  if (!Array.isArray(bank) || bank.length === 0) {
    console.warn('⚠️ bank empty. Using defaultBank fallback.');
    bank = defaultBank.slice();
  }

  // 3) bangun select + bind event + sync UI
  buildSetSelect();
  bindEvents();
  syncUI();

  // opsional: efek klik
  wirePressEffect();
}

/***** ====== SISA FUNGSI ANDALAN KAMU TETAP, tapi panggil "els.xxx" (sudah dihydrate) ====== *****/


/* ======= DATA (tetap 10 set) – (potongan sama seperti sebelumnya) ======= */
const bank = [ /* ... (isi 10 template sama seperti versi terakhir kamu) ... */ ];

const CUSTOM_KEY = 'det_speak_custom_v1';
let customBank = [];

/* ======= ELEMENTS ======= */
const els = {
  setSelect: document.getElementById('setSelect'),
  sentSelect: document.getElementById('sentSelect'),
  showTarget: document.getElementById('showTarget'),
  guideToggle: document.getElementById('guideToggle'),
  fullToggle: document.getElementById('fullToggle'),
  timerToggle: document.getElementById('timerToggle'),
  startBtn: document.getElementById('startBtn'),
  resetBtn: document.getElementById('resetBtn'),
  openCustomBtn: document.getElementById('openCustomBtn'),
  timeCount: document.getElementById('timeCount'),
  progressBar: document.getElementById('progressBar'),
  setTitle: document.getElementById('setTitle'),
  partTitle: document.getElementById('partTitle'),
  targetLine: document.getElementById('targetLine'),
  recLine: document.getElementById('recLine'),
  listenBtn: document.getElementById('listenBtn'),
  listenFullBtn: document.getElementById('listenFullBtn'),
  recBtn: document.getElementById('recBtn'),
  recFullBtn: document.getElementById('recFullBtn'),
  stopBtn: document.getElementById('stopBtn'),
  acc: document.getElementById('acc'),
  words: document.getElementById('words'),
  used: document.getElementById('used'),
  wpm: document.getElementById('wpm'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  againBtn: document.getElementById('againBtn'),
  guidePanel: document.getElementById('guidePanel'),
  customPanel: document.getElementById('customPanel'),
  cTitle: document.getElementById('cTitle'),
  cS1: document.getElementById('cS1'),
  cS2: document.getElementById('cS2'),
  cS3: document.getElementById('cS3'),
  cS4: document.getElementById('cS4'),
  cS5: document.getElementById('cS5'),
  saveCustomBtn: document.getElementById('saveCustomBtn'),
  clearCustomBtn: document.getElementById('clearCustomBtn'),
  customList: document.getElementById('customList'),
  progressText: document.getElementById('progressText'),

  /* NEW: recorder section (HTML tambahan di bawah) */
  recFileBtn: document.getElementById('recFileBtn'),
  stopFileBtn: document.getElementById('stopFileBtn'),
  dlBtn: document.getElementById('downloadBtn'),
  playback: document.getElementById('playback'),
  fileInfo: document.getElementById('fileInfo'),
};

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
  /* recorder */
  mediaStream: null,
  mediaRecorder: null,
  chunks: [],
  blob: null,
  blobUrl: ''
};

/* ======= INIT ======= */
init();
function init(){
  loadCustom();
  buildSetSelect();
  bindEvents();
  syncUI();
  wirePressEffect(); // kecil-kecilan biar klik terasa
}
function allBank(){ return bank.concat(customBank); }
function buildSetSelect(){
  els.setSelect.innerHTML='';
  allBank().forEach((s,i)=>{
    const o=document.createElement('option');
    o.value=i;
    o.textContent = `${String(i+1).padStart(2,'0')} — ${s.title}`;
    els.setSelect.appendChild(o);
  });
}

/* ======= EVENTS ======= */
function bindEvents(){
  els.setSelect.addEventListener('change', e=>{ state.setIndex=+e.target.value; resetAll(false); });
  els.sentSelect.addEventListener('change', e=>{ state.sentIndex=+e.target.value; renderTarget(); renderTitles(); resetStats(); });
  els.showTarget.addEventListener('change', updateTargetVisibility);
  els.guideToggle.addEventListener('change', ()=> els.guidePanel.style.display = els.guideToggle.checked?'block':'none');
  els.fullToggle.addEventListener('change', ()=>{ state.fullMode=els.fullToggle.checked; renderTarget(); renderTitles(); resetStats(); });
  els.timerToggle.addEventListener('change', ()=>{ els.timeCount.textContent = els.timerToggle.checked? String(DUR) : '—'; if(!els.timerToggle.checked){ els.progressBar.style.width='0%'; }});

  els.startBtn.addEventListener('click', startSession);
  els.resetBtn.addEventListener('click', ()=> resetAll(true));
  els.prevBtn.addEventListener('click', ()=>{ state.sentIndex=(state.sentIndex+4)%5; els.sentSelect.value=state.sentIndex; renderTarget(); renderTitles(); resetStats(); });
  els.nextBtn.addEventListener('click', ()=>{ state.sentIndex=(state.sentIndex+1)%5; els.sentSelect.value=state.sentIndex; renderTarget(); renderTitles(); resetStats(); });
  els.againBtn.addEventListener('click', ()=> resetStats());

  els.openCustomBtn.addEventListener('click', ()=>{
    els.customPanel.style.display = (els.customPanel.style.display==='none'?'block':'none');
    if(els.customPanel.style.display==='block') els.cTitle.focus();
  });
  els.saveCustomBtn.addEventListener('click', saveCustom);
  els.clearCustomBtn.addEventListener('click', ()=>{ ['cTitle','cS1','cS2','cS3','cS4','cS5'].forEach(id=>els[id].value=''); els.cTitle.focus(); });

  // TTS
  els.listenBtn.addEventListener('click', ()=> speakText(currentTarget(false)));
  els.listenFullBtn.addEventListener('click', ()=> speakText(currentTarget(true)));

  // STT
  els.recBtn.addEventListener('click', ()=> startRec(false));
  els.recFullBtn.addEventListener('click', ()=> startRec(true));
  els.stopBtn.addEventListener('click', ()=> stopRec());

  // MediaRecorder (File)
  if(els.recFileBtn){
    els.recFileBtn.addEventListener('click', startFileRecording);
    els.stopFileBtn.addEventListener('click', stopFileRecording);
    els.dlBtn.addEventListener('click', downloadRecording);
  }
}

/* ======= UI HELPERS ======= */
function renderTitles(){
  const set = allBank()[state.setIndex];
  els.setTitle.textContent = set.title;
  els.partTitle.textContent = state.fullMode? 'Full Set (1–5)' : PART5[state.sentIndex];
}
function renderTarget(){
  const text = currentTarget(state.fullMode);
  els.targetLine.innerHTML = escapeHtml(text);
  updateTargetVisibility();
}
function updateTargetVisibility(){
  els.targetLine.style.display = els.showTarget.checked ? 'block' : 'none';
}
function resetStats(){
  els.recLine.innerHTML='';
  els.acc.textContent='0%';
  els.words.textContent='0/0';
  els.used.textContent='0s';
  els.wpm.textContent='0';
  els.againBtn.disabled=false;
  state.recog.lastTranscript='';
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

/* ======= TIMER ======= */
function startSession(){
  if(state.running) return;
  state.running=true; state.startedAt=Date.now(); state.usedSec=0;
  if(els.timerToggle.checked){
    tickTimer();
    state.timerId = setInterval(tickTimer,1000);
  } else {
    els.timeCount.textContent='—';
  }
}
function tickTimer(){
  state.usedSec = Math.max(0, ((Date.now()-state.startedAt)/1000)|0);
  const remain = Math.max(0, DUR - state.usedSec);
  els.timeCount.textContent = String(remain);
  els.used.textContent = `${state.usedSec}s`;
  els.progressBar.style.width = `${(state.usedSec/DUR)*100}%`; // ✨ CSS handles transition
  if(remain<=0){ stopTimer(); stopRec(); }
}
function stopTimer(){ if(state.timerId){ clearInterval(state.timerId); state.timerId=null; } }

/* ======= TTS ======= */
function speakText(text){
  if(!('speechSynthesis' in window)){ alert('Speech Synthesis is not supported in this browser.'); return; }
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US'; u.rate = 1; u.pitch = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

/* ======= STT (SpeechRecognition) ======= */
let SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
let rec = null;

function startRec(full){
  if(!SR){ alert('Speech Recognition is not supported in this browser (try Chrome/Edge).'); return; }
  if(state.recog.active) return;
  rec = new SR();
  rec.lang = 'en-US';
  rec.interimResults = true;
  rec.maxAlternatives = 1;
  rec.continuous = false;

  state.fullMode = full || state.fullMode;
  if(full) els.fullToggle.checked = true;

  // UI lock
  els.stopBtn.disabled=false;
  els.recBtn.disabled=true; els.recFullBtn.disabled=true;

  els.recLine.innerHTML='<span class="muted">Listening… speak clearly.</span>';

  rec.onstart = ()=>{
    state.recog.active=true; state.recog.startAt=Date.now();
  };
  rec.onresult = (e)=>{
    let t=''; for(let i=0;i<e.results.length;i++){
      t += e.results[i][0].transcript + (e.results[i].isFinal?'':' ');
    }
    state.recog.lastTranscript = t.trim();
    renderDiff();
  };
  rec.onerror = (e)=>{ console.warn('rec error', e.error); };
  rec.onend = ()=>{
    state.recog.active=false;
    els.recBtn.disabled=false; els.recFullBtn.disabled=false; els.stopBtn.disabled=true; // ✨ fix toggle state
    computeStats();
  };
  try{ rec.start(); }catch(err){ console.warn(err); }
}
function stopRec(silent){
  if(!rec) return;
  try{ rec.stop(); }catch(_){}
  if(!silent) computeStats();
}

/* ======= DIFF + STATS ======= */
function currentTarget(full){
  const set = allBank()[state.setIndex];
  return full ? set.sentences.join(' ') : set.sentences[state.sentIndex];
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
  bt[0][0]=null;
  for(let i=1;i<=n;i++){
    for(let j=1;j<=m;j++){
      const same = expArr[i-1]===actArr[j-1];
      const costSub = dp[i-1][j-1] + (same?0:1);
      const costDel = dp[i-1][j] + 1;
      const costIns = dp[i][j-1] + 1;
      const min = Math.min(costSub, costDel, costIns);
      dp[i][j]=min;
      bt[i][j] = (min===costSub) ? (same?'match':'sub') : (min===costDel?'del':'ins');
    }
  }
  let i=n,j=m; const ops=[];
  while(i>0 || j>0){
    const op=bt[i][j];
    if(op==='match' || op==='sub'){ ops.push({type:op, exp:expArr[i-1], act:actArr[j-1]}); i--; j--; }
    else if(op==='del'){ ops.push({type:'del', exp:expArr[i-1]}); i--; }
    else if(op==='ins'){ ops.push({type:'ins', act:actArr[j-1]}); j--; }
  }
  return ops.reverse();
}
function renderDiff(){
  const exp = normalizeWords(currentTarget(state.fullMode));
  const act = normalizeWords(state.recog.lastTranscript || '');
  const ops = alignWords(exp, act);

  const expSpans = [];
  ops.forEach(op=>{
    if(op.type==='match'){ expSpans.push(spanWord(op.exp,'ok')); }
    else if(op.type==='sub' || op.type==='del'){ expSpans.push(spanWord(op.exp,'miss')); }
  });
  const actSpans = [];
  ops.forEach(op=>{
    if(op.type==='match'){ actSpans.push(spanWord(op.act,'ok')); }
    else if(op.type==='sub'){ actSpans.push(spanWord(op.act,'bad')); }
    else if(op.type==='ins'){ actSpans.push(spanWord(op.act,'extra')); }
  });

  els.targetLine.innerHTML = els.showTarget.checked ? expSpans.join(' ') : '';
  els.recLine.innerHTML = actSpans.join(' ') || '<span class="muted">…waiting</span>';
}
function computeStats(){
  const exp = normalizeWords(currentTarget(state.fullMode));
  const act = normalizeWords(state.recog.lastTranscript || '');
  const ops = alignWords(exp, act);
  const ok = ops.filter(o=>o.type==='match').length;
  const total = exp.length || 1;
  const acc = Math.round((ok/total)*100);
  const seconds = Math.max(1, state.usedSec || ((Date.now()- (state.recog.startAt||Date.now()))/1000)|0);
  const wpm = Math.max(0, Math.round((act.length/seconds)*60));

  els.acc.textContent = acc+'%';
  els.words.textContent = `${ok}/${total}`;
  els.wpm.textContent = String(wpm);

  state.progress.completed += 1;
  state.progress.best = Math.max(state.progress.best, acc);
  updateProgress();
}
function updateProgress(){
  els.progressText.textContent = `${state.progress.completed} sentences • best accuracy ${state.progress.best}%`;
}
function spanWord(w,cls){ return `<span class="word ${cls}">${escapeHtml(w)}</span>`; }
function escapeHtml(s){ return (s||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

/* ======= CUSTOM (localStorage) ======= */
function loadCustom(){ try{ const raw=localStorage.getItem(CUSTOM_KEY); customBank = raw? JSON.parse(raw): []; }catch(e){ customBank=[]; } renderCustomList(); }
function persistCustom(){ localStorage.setItem(CUSTOM_KEY, JSON.stringify(customBank)); }
function saveCustom(){
  const t = (els.cTitle.value||'').trim();
  const s = [els.cS1,els.cS2,els.cS3,els.cS4,els.cS5].map(x=>(x.value||'').trim());
  if(!t || s.some(x=>!x)){ alert('Please fill title and all 5 sentences.'); return; }
  const item = { id: Date.now(), title:`★ ${t}`, sentences:s };
  customBank.push(item); persistCustom(); buildSetSelect();
  state.setIndex = allBank().length - 1; els.setSelect.value = state.setIndex;
  ['cTitle','cS1','cS2','cS3','cS4','cS5'].forEach(id=>els[id].value='');
  renderCustomList(); resetAll(false);
}
function renderCustomList(){
  els.customList.innerHTML='';
  if(customBank.length===0){ els.customList.innerHTML='<div class="muted">No custom templates yet.</div>'; return; }
  customBank.forEach((t,idx)=>{
    const row=document.createElement('div'); row.className='custom-item';
    row.innerHTML = `<strong>${String(idx+1).padStart(2,'0')}</strong> <span style="flex:1">${escapeHtml(t.title)}</span>
      <button data-id="${t.id}" class="ghost">Delete</button>`;
    row.querySelector('button').addEventListener('click', e=>{
      const id = +e.target.getAttribute('data-id');
      customBank = customBank.filter(x=>x.id!==id); persistCustom(); buildSetSelect();
      if(state.setIndex>=allBank().length) state.setIndex=allBank().length-1;
      renderCustomList(); resetAll(false);
    });
    els.customList.appendChild(row);
  });
}

/* ======= SMALL PRESS EFFECT ======= */
function wirePressEffect(){
  document.addEventListener('mousedown', (e)=>{
    const el = e.target.closest('button, .toggle, select');
    if(!el || el.disabled) return;
    el.style.transform += ' translateY(1px) scale(.995)';
    setTimeout(()=>{ el.style.transform=''; }, 120);
  });
}

/* ======= MEDIARECORDER (record → file) ======= */
async function ensureStream(){
  if(state.mediaStream) return state.mediaStream;
  try{
    state.mediaStream = await navigator.mediaDevices.getUserMedia({ audio:true });
    return state.mediaStream;
  }catch(e){
    alert('Microphone permission denied.'); throw e;
  }
}
async function startFileRecording(){
  const stream = await ensureStream();
  state.chunks = [];
  const mr = new MediaRecorder(stream);
  state.mediaRecorder = mr;

  els.recFileBtn.disabled = true;
  els.stopFileBtn.disabled = false;
  els.dlBtn.disabled = true;
  els.fileInfo.textContent = 'Recording…';

  mr.ondataavailable = (e)=>{ if(e.data && e.data.size){ state.chunks.push(e.data); } };
  mr.onstop = ()=>{
    state.blob = new Blob(state.chunks, { type: mr.mimeType || 'audio/webm' });
    state.blobUrl = URL.createObjectURL(state.blob);
    els.playback.src = state.blobUrl;
    els.dlBtn.disabled = false;
    els.fileInfo.textContent = `Saved ${Math.round(state.blob.size/1024)} KB (${mr.mimeType||'audio/webm'})`;
  };
  mr.start(); // start recording
}
function stopFileRecording(){
  if(state.mediaRecorder && state.mediaRecorder.state!=='inactive'){
    state.mediaRecorder.stop();
  }
  els.recFileBtn.disabled = false;
  els.stopFileBtn.disabled = true;
}
function downloadRecording(){
  if(!state.blob) return;
  const a = document.createElement('a');
  a.href = state.blobUrl;
  a.download = `det-speak-${Date.now()}.webm`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
