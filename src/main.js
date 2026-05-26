import { auth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from './firebase.js';

// ===================================================
//  FIREBASE AUTH & LOGIN FLOW
// ===================================================
const loginScreen = document.getElementById('login-screen');
const appContent = document.getElementById('app-content');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginScreen.style.display = 'none';
    appContent.style.display = 'block';
    initializeAppLogic(); // Arrancar la app
  } else {
    loginScreen.style.display = 'flex';
    appContent.style.display = 'none';
  }
});

if(loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        loginError.style.display = 'block';
        console.error("Error de login:", error);
      });
  });
}

function cerrarSesion() {
  signOut(auth);
}

// ===================================================
//  LOGICA ORIGINAL DE LA APP
// ===================================================
let brandData = {};
let currentTheme = 'theme-soft-rose';
let bvFormat = 'sq';

const PALETTES = [
  {name:'Soft Clínico Rosé', c1:'#c93b9e', c2:'#fdf2f9', c3:'#621e82', c4:'#ffffff'},
  {name:'Editorial Premium',  c1:'#2c3547', c2:'#edf0f5', c3:'#697489', c4:'#ffffff'},
  {name:'Executive Dorado',   c1:'#a98743', c2:'#f4ead4', c3:'#111827', c4:'#fffaf0'},
  {name:'Neuro Tech',         c1:'#6857f2', c2:'#e8e6ff', c3:'#11a7c4', c4:'#f8fbff'},
  {name:'Infantojuvenil',     c1:'#1aa6a6', c2:'#dcf7f4', c3:'#f2b84b', c4:'#fffef7'},
  {name:'Terapéutico Cálido', c1:'#bd6c4f', c2:'#f6e0d6', c3:'#7d3f2a', c4:'#fff8f3'},
  {name:'Institucional',      c1:'#184d86', c2:'#e8f2ff', c3:'#0f2d4f', c4:'#ffffff'},
  {name:'Soft Green',         c1:'#6f8d73', c2:'#e8f3e8', c3:'#36583b', c4:'#fbfdf9'},
  {name:'Luxury Minimal',     c1:'#141821', c2:'#efe6d8', c3:'#a9884b', c4:'#fffdfa'},
  {name:'Psicología Creativa',c1:'#e23a8b', c2:'#ffe1ef', c3:'#14a7c7', c4:'#fffafd'},
  {name:'Beige Terapéutico',  c1:'#9e7b5a', c2:'#f5efe8', c3:'#5a3e28', c4:'#fdfaf6'},
  {name:'Azul Moderno',       c1:'#1976d2', c2:'#e3f2fd', c3:'#0d47a1', c4:'#f8fbff'},
];

const TEMPLATES = [
  {id:'theme-soft-rose',  name:'Soft Clínico Rosé'},
  {id:'theme-editorial',  name:'Editorial Premium'},
  {id:'theme-executive',  name:'Executive Dorado'},
  {id:'theme-neuro',      name:'Neuro Tech'},
  {id:'theme-infanto',    name:'Infantojuvenil'},
  {id:'theme-terrap',     name:'Terapéutico Cálido'},
  {id:'theme-inst',       name:'Institucional'},
  {id:'theme-green',      name:'Soft Green'},
  {id:'theme-luxury',     name:'Luxury Minimal'},
  {id:'theme-creative',   name:'Psicología Creativa'},
];

const OBS_CHIPS = {
  'Apariencia': ['Aseado/a','Vestimenta acorde','Apariencia cansada','Postura adecuada'],
  'Actitud': ['Colaborador/a','Reservado/a','Tranquilo/a','Inquieto/a','Evasivo/a','Participativo/a'],
  'Orientación': ['Orientado/a en tiempo','Orientado/a en espacio','Orientado/a en persona','Orientación conservada','Orientación parcialmente alterada'],
  'Lenguaje': ['Coherente','Fluido','Lento','Acelerado','Bajo volumen','Dificultad para expresar ideas'],
  'Afectividad': ['Estable','Triste','Ansiosa','Irritable','Lábil','Congruente con el relato'],
  'Contacto visual': ['Adecuado','Disminuido','Evitativo','Intermitente'],
  'Atención': ['Conservada','Disminuida','Dispersa','Fluctuante'],
  'Pensamiento': ['Lógico','Rumiativo','Catastrófico','Coherente','Desorganizado'],
  'Conducta motora': ['Tranquila','Inquieta','Tensión corporal','Llanto durante la sesión','Gestos de angustia'],
};

const INSTRUMENTOS = [
  'Entrevista clínica','Entrevista semiestructurada','Observación conductual',
  'Anamnesis psicológica','Historia clínica','Registro emocional','Registro de pensamientos',
  'BDI-II Inventario de Depresión de Beck','BAI Inventario de Ansiedad de Beck',
  'STAI Ansiedad Estado-Rasgo','Escala de Autoestima de Rosenberg',
  'Escala de Estrés Percibido PSS','COPE Inventario de Afrontamiento',
  'APGAR familiar','Test de la familia','Test de la figura humana',
  'Persona bajo la lluvia','WISC-V','WAIS-IV','Raven','MMPI','MCMI','16PF','SCL-90',
  'Cuestionario de dependencia emocional','Cuestionario de habilidades sociales',
  'Evaluación de hábitos de sueño','Cuestionario de antecedentes personales','Otros',
];

const ANTECEDENTES_CATS = [
  'Personales','Familiares','Médicos','Psicológicos','Psiquiátricos',
  'Académicos','Laborales','Relacionales','Traumáticos',
  'Consumo de sustancias','Sueño','Alimentación','Red de apoyo','Otros',
];

const PLAN_DATA = {
  'Objetivo general': ['Regular ansiedad','Fortalecer autoestima','Mejorar comunicación asertiva','Trabajar límites personales','Identificar creencias limitantes','Mejorar gestión emocional','Fortalecer habilidades sociales','Reducir sintomatología depresiva','Acompañar proceso de duelo'],
  'Enfoque terapéutico': ['TCC','Terapia emocional','Terapia sistémica','ACT','DBT','Terapia breve','Psicoeducación','Integrativo'],
  'Frecuencia': ['Semanal','Quincenal','Mensual','Según evolución clínica'],
  'Técnicas iniciales': ['Psicoeducación','Registro emocional','Reestructuración cognitiva','Respiración diafragmática','Mindfulness','Exposición gradual','Habilidades sociales','Comunicación asertiva','Tareas terapéuticas','Plan de autocuidado'],
  'Duración estimada': ['4-6 semanas','8-12 sesiones','3-6 meses','6-12 meses','Según evolución'],
  'Observaciones adicionales': [],
};

const BV_FRASES = [
  'Gracias por confiar en este espacio.',
  'Este es un espacio seguro para escucharte y acompañarte.',
  'Tu proceso merece respeto, calma y compromiso.',
  'Aquí no necesitas tener todas las respuestas, iremos paso a paso.',
  'Tu bienestar también merece estructura, cuidado y constancia.',
  'Cada proceso es único. Gracias por permitirme acompañarte.',
  'Hoy das un paso importante hacia tu bienestar emocional.',
  'Este será un espacio de escucha, reflexión y crecimiento.',
  'Avanzaremos a tu ritmo, con claridad y cuidado.',
];
const BV_RECS = [
  'Procura llegar 5 minutos antes.',
  'Busca un lugar privado si la sesión es virtual.',
  'Silencia notificaciones durante la sesión.',
  'Ten a la mano agua, cuaderno o lapicero si lo deseas.',
  'Si necesitas reprogramar, avisa con anticipación.',
  'La confidencialidad es parte esencial del proceso.',
  'La constancia ayuda a obtener mejores resultados.',
  'Puedes traer dudas, emociones o temas importantes para trabajar.',
];
const BV_MATS = ['Cuaderno','Lapicero','Audífonos','Agua','Lugar privado','Internet estable','Pañuelos','Agenda','Disposición para trabajar'];

let selectedBVFrase = '';
let selectedBVRecs = [];
let selectedBVMats = [];
let selectedObsChips = {};
let selectedInstrumentos = [];
let customInstrumentos = [];
let planSelections = {};
let antData = {};

// Helpers
function v(id) { const el=document.getElementById(id); return el?el.value:''; }
function cv(id) { const el=document.getElementById(id); return el?el.checked:false; }
function setV(id,val) { const el=document.getElementById(id); if(el && val!==undefined && val!==null) el.value=val; }
function setCV(id,val) { const el=document.getElementById(id); if(el) el.checked=val; }

function goTo(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screen).classList.add('active');
  window.scrollTo(0, 0);
  if (screen === 'informe') updateInforme();
  if (screen === 'bienvenida') { initBV(); updateBV(); }
  if (screen === 'brand') loadBrandData();
}

function setColors(c1, c2, c3, c4) {
  document.documentElement.style.setProperty('--c1', c1);
  document.documentElement.style.setProperty('--c2', c2);
  document.documentElement.style.setProperty('--c3', c3);
  document.documentElement.style.setProperty('--c4', c4);
  const l1=document.getElementById('col_c1_hex'); if(l1) l1.textContent=c1;
  const l2=document.getElementById('col_c2_hex'); if(l2) l2.textContent=c2;
  const l3=document.getElementById('col_c3_hex'); if(l3) l3.textContent=c3;
  const l4=document.getElementById('col_c4_hex'); if(l4) l4.textContent=c4;
  updatePreviewDots();
}

function applyCustomColors() {
  const c1 = v('col_c1'), c2 = v('col_c2'), c3 = v('col_c3'), c4 = v('col_c4');
  setColors(c1, c2, c3, c4);
  document.querySelectorAll('.palette-item').forEach(p => p.classList.remove('active'));
  saveBrand(); updatePreviews();
}

function updatePreviewDots() {
  const cs = getComputedStyle(document.documentElement);
  ['pd1','pd2','pd3','pd4'].forEach((id,i)=>{
    const el=document.getElementById(id);
    if(el) el.style.background=cs.getPropertyValue(['--c1','--c2','--c3','--c4'][i]).trim();
  });
}

function saveBrand() {
  const data = {
    nombre: v('b_nombre'), especialidad: v('b_especialidad'), frase: v('b_frase'),
    tel: v('b_tel'), email: v('b_email'), ig: v('b_ig'), colegiatura: v('b_colegiatura'),
    colegiatura_show: cv('b_colegiatura_show'), logo_modo: v('b_logo_modo'),
    logo_size: v('b_logo_size'), logo_op: v('b_logo_op'), logo_fondo_blanco: cv('b_logo_fondo_blanco'),
    logo_data: brandData.logo_data || '', firma_data: brandData.firma_data || '', sello_data: brandData.sello_data || '',
    c1: v('col_c1') || '#c93b9e', c2: v('col_c2') || '#fdf2f9', c3: v('col_c3') || '#621e82', c4: v('col_c4') || '#ffffff',
    template: currentTheme, namedPalettes: getNamedPalettes(),
  };
  brandData = data;
  localStorage.setItem('svc_brand', JSON.stringify(data));
}

function loadBrandData() {
  const saved = localStorage.getItem('svc_brand');
  if (!saved) return;
  try {
    const d = JSON.parse(saved); brandData = d;
    setV('b_nombre', d.nombre); setV('b_especialidad', d.especialidad); setV('b_frase', d.frase);
    setV('b_tel', d.tel); setV('b_email', d.email); setV('b_ig', d.ig); setV('b_colegiatura', d.colegiatura);
    setCV('b_colegiatura_show', d.colegiatura_show); setV('b_logo_modo', d.logo_modo);
    setV('b_logo_size', d.logo_size); setV('b_logo_op', d.logo_op); setCV('b_logo_fondo_blanco', d.logo_fondo_blanco);
    if (d.logo_data) showSmallLogo(d.logo_data);
    if (d.firma_data) document.getElementById('firmaPreview').innerHTML = `<img src="${d.firma_data}" style="max-height:50px;object-fit:contain">`;
    if (d.sello_data) document.getElementById('selloPreview').innerHTML = `<img src="${d.sello_data}" style="max-height:50px;object-fit:contain">`;
    if (d.c1) { setV('col_c1', d.c1); setV('col_c2', d.c2); setV('col_c3', d.c3); setV('col_c4', d.c4); setColors(d.c1, d.c2, d.c3, d.c4); }
    if (d.template) {
      currentTheme = d.template;
      document.querySelectorAll('.tag-template').forEach(t => t.classList.toggle('active', t.dataset.id === currentTheme));
    }
    updatePreviews(); renderSavedPalettes();
  } catch(e) {}
}

function exportBrand() {
  const data = JSON.parse(localStorage.getItem('svc_brand') || '{}');
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'marca-profesional.json'; a.click();
}

function importBrand(event) {
  const file = event.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      localStorage.setItem('svc_brand', JSON.stringify(JSON.parse(e.target.result)));
      loadBrandData(); alert('Configuración importada correctamente.');
    } catch { alert('Archivo inválido.'); }
  };
  reader.readAsText(file);
}

function clearBrand() {
  if (!confirm('¿Borrar toda la configuración de marca?')) return;
  localStorage.removeItem('svc_brand'); brandData = {}; location.reload();
}

function updatePreviews() {
  const d = brandData;
  const prevName = document.getElementById('prevName');
  const prevEsp = document.getElementById('prevEsp');
  const prevFooter = document.getElementById('prevFooter');
  if (prevName) prevName.textContent = d.nombre || 'Tu nombre profesional';
  if (prevEsp) prevEsp.textContent = d.especialidad || 'Especialidad';
  if (prevFooter) prevFooter.innerHTML = [d.tel, d.email, d.ig].filter(Boolean).join(' · ') || 'Tus datos de contacto';
  const zone = document.getElementById('prevLogoZone');
  if (zone) zone.innerHTML = d.logo_data ? `<img src="${d.logo_data}" style="max-width:60px;max-height:60px;object-fit:contain">` : `<div style="font-size:30px;color:var(--c1)">Ψ</div>`;
  updatePreviewDots();
}

function applyPalette(idx) {
  const p = PALETTES[idx];
  setColors(p.c1, p.c2, p.c3, p.c4); setV('col_c1', p.c1); setV('col_c2', p.c2); setV('col_c3', p.c3); setV('col_c4', p.c4);
  document.querySelectorAll('.palette-item').forEach((el,i) => el.classList.toggle('active', i===idx));
  saveBrand(); updatePreviews();
}

function getNamedPalettes() { return JSON.parse(localStorage.getItem('svc_named_palettes') || '[]'); }
function saveNamedPalette() {
  const name = v('paletteSaveName').trim(); if (!name) { alert('Escribe un nombre para la paleta.'); return; }
  const list = getNamedPalettes();
  list.push({name, c1: v('col_c1'), c2: v('col_c2'), c3: v('col_c3'), c4: v('col_c4')});
  localStorage.setItem('svc_named_palettes', JSON.stringify(list)); setV('paletteSaveName','');
  renderSavedPalettes(); saveBrand();
}

function renderSavedPalettes() {
  const container = document.getElementById('savedPalettesList'); if (!container) return;
  const list = getNamedPalettes();
  if (!list.length) { container.innerHTML = ''; return; }
  container.innerHTML = list.map((p,i) => `
    <div class="saved-palette-row">
      <div class="saved-pal-swatches">
        <div class="sp-dot" style="background:${p.c1}"></div><div class="sp-dot" style="background:${p.c2}"></div>
        <div class="sp-dot" style="background:${p.c3}"></div><div class="sp-dot" style="background:${p.c4};border:1px solid rgba(0,0,0,.1)"></div>
      </div>
      <span class="saved-pal-name">${p.name}</span>
      <button class="btn btn-secondary btn-sm" onclick="loadNamedPalette(${i})">Usar</button>
      <button class="btn btn-danger btn-sm" onclick="deleteNamedPalette(${i})">✕</button>
    </div>
  `).join('');
}

function loadNamedPalette(i) {
  const p = getNamedPalettes()[i]; if (!p) return;
  setColors(p.c1, p.c2, p.c3, p.c4); setV('col_c1', p.c1); setV('col_c2', p.c2); setV('col_c3', p.c3); setV('col_c4', p.c4);
  saveBrand(); updatePreviews();
}

function deleteNamedPalette(i) {
  const list = getNamedPalettes(); list.splice(i, 1);
  localStorage.setItem('svc_named_palettes', JSON.stringify(list)); renderSavedPalettes();
}

function initTemplateGrid() {
  const grid = document.getElementById('templateGrid'); if (!grid) return;
  grid.innerHTML = TEMPLATES.map(t => `
    <div class="tag-template${t.id===currentTheme?' active':''}" data-id="${t.id}" onclick="selectTemplate('${t.id}')">
      <div class="tag-template-name">${t.name}</div>
      <div class="tag-template-preview" style="background:linear-gradient(135deg,var(--c1),var(--c3))"></div>
    </div>
  `).join('');
}

function selectTemplate(id) {
  currentTheme = id;
  document.querySelectorAll('.tag-template').forEach(t => t.classList.toggle('active', t.dataset.id===id));
  const inf = document.getElementById('inf_template'); if (inf) inf.value = id;
  saveBrand(); updateInforme();
}

function handleLogo(e) {
  const file = e.target.files[0]; if (!file) return; const reader = new FileReader();
  reader.onload = ev => { brandData.logo_data = ev.target.result; showSmallLogo(ev.target.result); saveBrand(); updatePreviews(); };
  reader.readAsDataURL(file);
}
function showSmallLogo(src) { const z = document.getElementById('logoPreviewSmall'); if (z) z.innerHTML = `<img src="${src}" style="max-width:80px;max-height:80px;object-fit:contain;border-radius:10px">`; }

function handleFirma(e) {
  const file = e.target.files[0]; if (!file) return; const reader = new FileReader();
  reader.onload = ev => { brandData.firma_data = ev.target.result; document.getElementById('firmaPreview').innerHTML = `<img src="${ev.target.result}" style="max-height:50px;object-fit:contain">`; saveBrand(); };
  reader.readAsDataURL(file);
}

function handleSello(e) {
  const file = e.target.files[0]; if (!file) return; const reader = new FileReader();
  reader.onload = ev => { brandData.sello_data = ev.target.result; document.getElementById('selloPreview').innerHTML = `<img src="${ev.target.result}" style="max-height:50px;object-fit:contain">`; saveBrand(); };
  reader.readAsDataURL(file);
}

// ==========================================
// RENDERIZADO DEL INFORME Y ELIMINACIÓN DEL BUG JS
// ==========================================
function updateInforme() {
  const container = document.getElementById('informePreview');
  if (!container) return;

  const d = brandData;
  const tmpl = v('inf_template') || currentTheme;
  const showWM = cv('inf_wm');
  const cs = getComputedStyle(document.documentElement);
  const c1 = cs.getPropertyValue('--c1').trim(); const c2 = cs.getPropertyValue('--c2').trim();
  const c3 = cs.getPropertyValue('--c3').trim(); const c4 = cs.getPropertyValue('--c4').trim();

  // Armado del HTML interno (Misma lógica original)
  let logoHtml = '';
  const logoModo = d.logo_modo || 'normal';
  const logoSize = parseInt(d.logo_size || 100);
  const logoOp = parseInt(d.logo_op || 100) / 100;
  const logoFondoB = d.logo_fondo_blanco;

  if (logoModo === 'oculto') { logoHtml = ''; } 
  else if (logoModo === 'icono' || !d.logo_data) { logoHtml = `<div class="a4-logo" style="opacity:${logoOp};transform:scale(${logoSize/100})">Ψ</div>`; } 
  else {
    let wrapper = '';
    if (logoModo === 'circulo') { wrapper = `border-radius:50%;overflow:hidden;background:${logoFondoB?'#fff':'transparent'}`; } 
    else if (logoModo === 'marca') { wrapper = `opacity:0.15;`; } 
    else if (logoFondoB) { wrapper = `background:#fff;border-radius:16px;padding:4px;box-shadow:0 4px 12px rgba(0,0,0,.1)`; }
    logoHtml = `<div class="a4-logo" style="opacity:${logoOp};transform:scale(${logoSize/100});${wrapper}"><img src="${d.logo_data}" alt="Logo"></div>`;
  }

  const obsChips = Object.keys(selectedObsChips);
  const obsOtros = v('obs_otros');
  const antContenido = Object.entries(antData).filter(([,val]) => val.trim());
  let firmaHtml = d.firma_data ? `<img class="a4-sig-img" src="${d.firma_data}">` : '';
  const sigLine = d.firma_data ? '' : '<div class="a4-sig-line"></div>';
  const sigName = d.nombre ? `<b>${d.nombre}</b>` : '<b>Nombre del especialista</b>';
  const sigEsp = d.especialidad ? `<br><span style="font-size:10px">${d.especialidad}</span>` : '';
  const sigCol = (d.colegiatura_show && d.colegiatura) ? `<br><span style="font-size:10px">${d.colegiatura}</span>` : '';
  let selloHtml = d.sello_data ? `<img class="a4-sello" src="${d.sello_data}">` : '';
  const contactLine = [d.tel, d.email, d.ig].filter(Boolean).join('  ·  ');
  const conclusiones = getBullets('conclusiones_list');
  const recomendaciones = getBullets('recomendaciones_list');
  
  const planItems = Object.entries(PLAN_DATA).map(([title]) => {
    const sel = planSelections[title] || [];
    const custom = planSelections[title+'_custom'] || '';
    const txt = [...sel, ...(custom ? [custom] : [])].join(', ');
    return txt ? {title, txt} : null;
  }).filter(Boolean);

  const fechaConsulta = v('fi_fecha') || new Date().toLocaleDateString('es-PE',{day:'2-digit',month:'long',year:'numeric'});
  const diagText = v('inf_diag');
  const diagNote = diagText ? `<p class="a4-p">${diagText}</p><p class="a4-diagnostic-note">* Impresión diagnóstica sujeta a evaluación continua.</p>` : '';

  const headerHtml = `
    <div class="a4-decor"></div>
    ${showWM ? `<div class="a4-wm">Ψ</div>` : ''}
    <header class="a4-header">
      <div class="a4-logo-wrap">
        ${logoHtml}
        <div><b style="font-size:12px">${d.nombre || 'Nombre del especialista'}</b><br><span style="font-size:10px;color:#6b7280">${d.frase || ''}</span></div>
      </div>
      <div class="a4-pro">
        <h3>${d.nombre || 'Especialista'}</h3>
        ${d.especialidad ? `<p>${d.especialidad}</p>` : ''}
        ${d.colegiatura_show && d.colegiatura ? `<p>${d.colegiatura}</p>` : ''}
        ${contactLine ? `<p style="font-size:9.5px">${contactLine}</p>` : ''}
      </div>
    </header>
    <div class="a4-divider"></div>`;

  const footerHtml = `
    <footer class="a4-footer">
      <div class="a4-footer-left">
        ${d.frase ? `<em style="display:block;margin-bottom:4px">"${d.frase}"</em>` : ''}
        <span>${fechaConsulta}</span>
      </div>
      <div class="a4-signature">${firmaHtml}${sigLine}${sigName}${sigEsp}${sigCol}</div>
      ${selloHtml}
    </footer>`;

  const pageTitleHtml = `<div class="a4-hero"><h1 class="a4-title">Informe de Consulta Inicial</h1><span class="a4-badge">${v('fi_hc') ? 'HC: ' + v('fi_hc') : fechaConsulta}</span></div>`;

  const secDatos = (v('fi_nombre') || v('fi_edad') || v('fi_hc')) ? `
    <section class="a4-section">
      <h2><span class="a4-icon">1</span> Datos de Filiación</h2>
      <div class="a4-grid">
        ${rf('Historia clínica',v('fi_hc'))}${rf('Nombre',v('fi_nombre'))}${rf('Sexo',v('fi_sexo'))}
        ${rf('Edad',v('fi_edad')?v('fi_edad')+' años':'')}${rf('F. nacimiento',v('fi_fn'))}
        ${rf('Lugar nacimiento',v('fi_lugar'))}${rf('Estado civil',v('fi_ecivil'))}
        ${rf('Grado instrucción',v('fi_grado'))}${rf('Ocupación',v('fi_ocup'))}
        ${rf('Domicilio',v('fi_dom'),'full')}${rf('Fecha consulta',fechaConsulta)}${rf('Especialista',v('fi_esp')||d.nombre)}
      </div>
    </section>` : '';
  const secMotivo = v('inf_motivo') ? `<section class="a4-section"><h2><span class="a4-icon">2</span> Motivo de Consulta</h2><p class="a4-p">${v('inf_motivo')}</p></section>` : '';
  const secObs = (obsChips.length || v('inf_obs') || obsOtros) ? `<section class="a4-section"><h2><span class="a4-icon">3</span> Observación Conductual y General</h2>${v('inf_obs') ? `<p class="a4-p" style="margin-bottom:10px">${v('inf_obs')}</p>` : ''}${obsChips.length ? `<div class="a4-chips">${obsChips.map(c=>`<span class="a4-chip">${c}</span>`).join('')}</div>` : ''}${obsOtros ? `<p class="a4-p" style="margin-top:8px"><em>Otros: ${obsOtros}</em></p>` : ''}</section>` : '';
  const secInstr = selectedInstrumentos.length ? `<section class="a4-section"><h2><span class="a4-icon">4</span> Instrumentos / Técnicas Aplicadas</h2><div class="a4-chips">${selectedInstrumentos.map(i=>`<span class="a4-chip">${i}</span>`).join('')}</div></section>` : '';
  const secAnt = antContenido.length ? `<section class="a4-section"><h2><span class="a4-icon">5</span> Antecedentes Relevantes</h2><div class="a4-cards">${antContenido.map(([cat,txt])=>`<div class="a4-card"><b>${cat}</b><span>${txt}</span></div>`).join('')}</div></section>` : '';
  const secAnalisis = v('inf_analisis') ? `<section class="a4-section"><h2><span class="a4-icon">6</span> Análisis Clínico Inicial</h2><p class="a4-p">${v('inf_analisis')}</p></section>` : '';
  const secDiag = diagNote ? `<section class="a4-section"><h2><span class="a4-icon">7</span> Impresión Diagnóstica Inicial</h2>${diagNote}</section>` : '';
  const secConclusiones = conclusiones.length ? `<section class="a4-section"><h2><span class="a4-icon">8</span> Conclusiones</h2><ul class="a4-ul">${conclusiones.map(c=>`<li>${c}</li>`).join('')}</ul></section>` : '';
  const secRecomendaciones = recomendaciones.length ? `<section class="a4-section"><h2><span class="a4-icon">9</span> Recomendaciones</h2><ul class="a4-ul">${recomendaciones.map(r=>`<li>${r}</li>`).join('')}</ul></section>` : '';
  const secPlan = planItems.length ? `<section class="a4-section"><h2><span class="a4-icon">10</span> Plan Terapéutico Inicial</h2><div class="a4-cards">${planItems.map(p=>`<div class="a4-card"><b>${p.title}</b><span>${p.txt}</span></div>`).join('')}</div></section>` : '';

  const allSections = [secDatos, secMotivo, secObs, secInstr, secAnt, secAnalisis, secDiag, secConclusiones, secRecomendaciones, secPlan].filter(Boolean);

  // NOTA: SE ELIMINÓ EL LLAMADO A autoPaginateInforme. Todo se renderiza de corrido, el CSS print hace el resto.
  container.innerHTML = `
    <div class="a4-sheet ${tmpl}" style="--c1:${c1};--c2:${c2};--c3:${c3};--c4:${c4}">
      ${headerHtml}
      ${pageTitleHtml}
      <div id="page1Content">
        ${allSections.join('')}
      </div>
      ${footerHtml}
    </div>
  `;
}

function rf(label, val, cls) {
  if (!val) return '';
  if (cls === 'full') return `<div style="grid-column:1/-1"><span>${label}:</span> <b>${val}</b></div>`;
  return `<div><span>${label}:</span> <b>${val}</b></div>`;
}

function getBullets(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  return Array.from(container.querySelectorAll('input[type=text]')).map(i=>i.value).filter(Boolean);
}

// (El resto de funciones originales de inicialización, botones y Bienvenida irían aquí exactamente igual: initObsChips, initInstrumentos, printInforme, etc...)

// ===================================================
// INICIALIZADOR DE LA APP (Llamado tras hacer login)
// ===================================================
function initializeAppLogic() {
  const today = new Date().toISOString().split('T')[0];
  const fi_fecha = document.getElementById('fi_fecha');
  if (fi_fecha) fi_fecha.value = today;

  const savedBrand = localStorage.getItem('svc_brand');
  if (savedBrand) {
    try {
      const d = JSON.parse(savedBrand); brandData = d;
      if (d.c1) setColors(d.c1, d.c2, d.c3, d.c4);
      if (d.template) currentTheme = d.template;
    } catch(e) {}
  }

  const cs = getComputedStyle(document.documentElement);
  setV('col_c1', cs.getPropertyValue('--c1').trim()); setV('col_c2', cs.getPropertyValue('--c2').trim());
  setV('col_c3', cs.getPropertyValue('--c3').trim()); setV('col_c4', cs.getPropertyValue('--c4').trim());

  initTemplateGrid(); 
  /* Asegurate de incluir tus funciones initObsChips, initInstrumentos, initAntecedentes, initPlanCards si las agregas al archivo final */
  renderSavedPalettes(); updatePreviewDots();

  if (brandData.nombre) {
    const fi_esp = document.getElementById('fi_esp');
    if (fi_esp && !fi_esp.value) fi_esp.value = brandData.nombre;
  }
  setTimeout(updateInforme, 100);
}

// ===================================================
// VINCULACIÓN AL WINDOW (Para VITE + MODULE)
// ===================================================
window.goTo = goTo;
window.exportBrand = exportBrand;
window.importBrand = importBrand;
window.clearBrand = clearBrand;
window.applyCustomColors = applyCustomColors;
window.saveNamedPalette = saveNamedPalette;
window.loadNamedPalette = loadNamedPalette;
window.deleteNamedPalette = deleteNamedPalette;
window.selectTemplate = selectTemplate;
window.handleLogo = handleLogo;
window.handleFirma = handleFirma;
window.handleSello = handleSello;
window.updateInforme = updateInforme;
window.cerrarSesion = cerrarSesion;
window.addBullet = addBullet;
window.addBulletWithText = addBulletWithText;
window.toggleAnt = toggleAnt;
window.togglePlan = togglePlan;
window.printInforme = printInforme;
window.printBienvenida = printBienvenida;
window.loadEjemplo = loadEjemplo;
window.insertarEj = insertarEj;
window.guardarBorrador = guardarBorrador;
window.cargarBorrador = cargarBorrador;
window.limpiarInforme = limpiarInforme;
window.setBVFormat = setBVFormat;
window.selectBVFrase = selectBVFrase;
window.toggleBVRec = toggleBVRec;
window.toggleBVMat = toggleBVMat;
window.downloadBVImage = downloadBVImage;
// Aquí debes añadir el resto de funciones como window.printInforme = printInforme; etc.
