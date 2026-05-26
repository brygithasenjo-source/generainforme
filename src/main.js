// ===================================================
//  CONTROLADOR DE LOGIN (Lógica nueva)
// ===================================================
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if(loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar recarga
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
        
            // Lógica de inicio de sesión (ajusta las credenciales si lo necesitas)
            if (email.includes("@") && password.length >= 6) { 
                document.getElementById('login-screen').style.display = 'none';
                document.getElementById('app-content').style.display = 'block';
                // Refrescar vistas base de la app al ingresar
                setTimeout(updateInforme, 100);
            } else {
                document.getElementById('login-error').style.display = 'flex';
            }
        });
    }
});


// ===================================================
//  DATA & STATE ORIGINAL
// ===================================================
let brandData = {};
let currentTheme = 'theme-soft-rose';
let bvFormat = 'sq';
let bulletCounters = {conclusiones_list: 0, recomendaciones_list: 0};

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

// ===================================================
//  NAVIGATION
// ===================================================
function goTo(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screen).classList.add('active');
  window.scrollTo(0, 0);
  if (screen === 'informe') updateInforme();
  if (screen === 'bienvenida') { initBV(); updateBV(); }
  if (screen === 'brand') loadBrandData();
}

// ===================================================
//  COLORS
// ===================================================
function setColors(c1, c2, c3, c4) {
  document.documentElement.style.setProperty('--c1', c1);
  document.documentElement.style.setProperty('--c2', c2);
  document.documentElement.style.setProperty('--c3', c3);
  document.documentElement.style.setProperty('--c4', c4);
  updateColorHexLabels(c1, c2, c3, c4);
  updatePreviewDots();
}

function applyCustomColors() {
  const c1 = document.getElementById('col_c1').value;
  const c2 = document.getElementById('col_c2').value;
  const c3 = document.getElementById('col_c3').value;
  const c4 = document.getElementById('col_c4').value;
  setColors(c1, c2, c3, c4);
  document.querySelectorAll('.palette-item').forEach(p => p.classList.remove('active'));
  saveBrand();
  updatePreviews();
}

function updateColorHexLabels(c1,c2,c3,c4) {
  const l1=document.getElementById('col_c1_hex'); if(l1) l1.textContent=c1;
  const l2=document.getElementById('col_c2_hex'); if(l2) l2.textContent=c2;
  const l3=document.getElementById('col_c3_hex'); if(l3) l3.textContent=c3;
  const l4=document.getElementById('col_c4_hex'); if(l4) l4.textContent=c4;
}

function updatePreviewDots() {
  const cs = getComputedStyle(document.documentElement);
  ['pd1','pd2','pd3','pd4'].forEach((id,i)=>{
    const el=document.getElementById(id);
    if(el) el.style.background=cs.getPropertyValue(['--c1','--c2','--c3','--c4'][i]).trim();
  });
}

// ===================================================
//  BRAND SAVE/LOAD
// ===================================================
function saveBrand() {
  const data = {
    nombre: v('b_nombre'), especialidad: v('b_especialidad'),
    frase: v('b_frase'), tel: v('b_tel'), email: v('b_email'),
    ig: v('b_ig'), colegiatura: v('b_colegiatura'),
    colegiatura_show: cv('b_colegiatura_show'),
    logo_modo: v('b_logo_modo'), logo_size: v('b_logo_size'),
    logo_op: v('b_logo_op'), logo_fondo_blanco: cv('b_logo_fondo_blanco'),
    logo_data: brandData.logo_data || '',
    firma_data: brandData.firma_data || '',
    sello_data: brandData.sello_data || '',
    c1: document.getElementById('col_c1')?.value || '#c93b9e',
    c2: document.getElementById('col_c2')?.value || '#fdf2f9',
    c3: document.getElementById('col_c3')?.value || '#621e82',
    c4: document.getElementById('col_c4')?.value || '#ffffff',
    template: currentTheme,
    namedPalettes: getNamedPalettes(),
  };
  brandData = data;
  localStorage.setItem('svc_brand', JSON.stringify(data));
}

function loadBrandData() {
  const saved = localStorage.getItem('svc_brand');
  if (!saved) return;
  try {
    const d = JSON.parse(saved);
    brandData = d;
    setV('b_nombre', d.nombre); setV('b_especialidad', d.especialidad);
    setV('b_frase', d.frase); setV('b_tel', d.tel); setV('b_email', d.email);
    setV('b_ig', d.ig); setV('b_colegiatura', d.colegiatura);
    setCV('b_colegiatura_show', d.colegiatura_show);
    setV('b_logo_modo', d.logo_modo); setV('b_logo_size', d.logo_size);
    setV('b_logo_op', d.logo_op); setCV('b_logo_fondo_blanco', d.logo_fondo_blanco);
    if (d.logo_data) showSmallLogo(d.logo_data);
    if (d.firma_data) showFirmaPreview(d.firma_data);
    if (d.sello_data) showSelloPreview(d.sello_data);
    if (d.c1) {
      setV('col_c1', d.c1); setV('col_c2', d.c2);
      setV('col_c3', d.c3); setV('col_c4', d.c4);
      setColors(d.c1, d.c2, d.c3, d.c4);
    }
    if (d.template) {
      currentTheme = d.template;
      document.querySelectorAll('.tag-template').forEach(t => {
        t.classList.toggle('active', t.dataset.id === currentTheme);
      });
    }
    updatePreviews();
    renderSavedPalettes();
  } catch(e) {}
}

function exportBrand() {
  const data = JSON.parse(localStorage.getItem('svc_brand') || '{}');
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'marca-profesional.json';
  a.click();
}

function importBrand(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const d = JSON.parse(e.target.result);
      localStorage.setItem('svc_brand', JSON.stringify(d));
      loadBrandData();
      alert('Configuración importada correctamente.');
    } catch { alert('Archivo inválido.'); }
  };
  reader.readAsText(file);
}

function clearBrand() {
  if (!confirm('¿Borrar toda la configuración de marca?')) return;
  localStorage.removeItem('svc_brand');
  brandData = {};
  location.reload();
}

function updatePreviews() {
  const d = brandData;
  const prevName = document.getElementById('prevName');
  const prevEsp = document.getElementById('prevEsp');
  const prevFooter = document.getElementById('prevFooter');
  if (prevName) prevName.textContent = d.nombre || 'Tu nombre profesional';
  if (prevEsp) prevEsp.textContent = d.especialidad || 'Especialidad';
  if (prevFooter) prevFooter.innerHTML = [d.tel, d.email, d.ig].filter(Boolean).join('  ·  ') || 'Tus datos de contacto';
  const zone = document.getElementById('prevLogoZone');
  if (zone) {
    if (d.logo_data) {
      zone.innerHTML = `<img src="${d.logo_data}" style="max-width:60px;max-height:60px;object-fit:contain">`;
    } else {
      zone.innerHTML = `<div style="font-size:30px;color:var(--c1)">Ψ</div>`;
    }
  }
  updatePreviewDots();
}

// ===================================================
//  PALETTES
// ===================================================
function initPaletteGrid() {
  const grid = document.getElementById('paletteGrid');
  if (!grid) return;
  grid.innerHTML = PALETTES.map((p,i) => `
    <div class="palette-item" onclick="applyPalette(${i})" title="${p.name}">
      <div class="palette-swatch">
        <div style="background:${p.c1}"></div>
        <div style="background:${p.c2}"></div>
        <div style="background:${p.c3}"></div>
        <div style="background:${p.c4}"></div>
      </div>
      <div class="palette-name">${p.name}</div>
    </div>
  `).join('');
}

function applyPalette(idx) {
  const p = PALETTES[idx];
  setColors(p.c1, p.c2, p.c3, p.c4);
  setV('col_c1', p.c1); setV('col_c2', p.c2);
  setV('col_c3', p.c3); setV('col_c4', p.c4);
  document.querySelectorAll('.palette-item').forEach((el,i) => el.classList.toggle('active', i===idx));
  saveBrand();
  updatePreviews();
}

function getNamedPalettes() {
  return JSON.parse(localStorage.getItem('svc_named_palettes') || '[]');
}

function saveNamedPalette() {
  const name = v('paletteSaveName').trim();
  if (!name) { alert('Escribe un nombre para la paleta.'); return; }
  const c1 = v('col_c1'), c2 = v('col_c2'), c3 = v('col_c3'), c4 = v('col_c4');
  const list = getNamedPalettes();
  list.push({name, c1, c2, c3, c4});
  localStorage.setItem('svc_named_palettes', JSON.stringify(list));
  setV('paletteSaveName','');
  renderSavedPalettes();
  saveBrand();
}

function renderSavedPalettes() {
  const container = document.getElementById('savedPalettesList');
  if (!container) return;
  const list = getNamedPalettes();
  if (!list.length) { container.innerHTML = ''; return; }
  container.innerHTML = list.map((p,i) => `
    <div class="saved-palette-row">
      <div class="saved-pal-swatches">
        <div class="sp-dot" style="background:${p.c1}"></div>
        <div class="sp-dot" style="background:${p.c2}"></div>
        <div class="sp-dot" style="background:${p.c3}"></div>
        <div class="sp-dot" style="background:${p.c4};border:1px solid rgba(0,0,0,.1)"></div>
      </div>
      <span class="saved-pal-name">${p.name}</span>
      <button class="btn btn-secondary btn-sm" onclick="loadNamedPalette(${i})">Usar</button>
      <button class="btn btn-danger btn-sm" onclick="deleteNamedPalette(${i})">✕</button>
    </div>
  `).join('');
}

function loadNamedPalette(i) {
  const p = getNamedPalettes()[i];
  if (!p) return;
  setColors(p.c1, p.c2, p.c3, p.c4);
  setV('col_c1', p.c1); setV('col_c2', p.c2);
  setV('col_c3', p.c3); setV('col_c4', p.c4);
  saveBrand();
  updatePreviews();
}

function deleteNamedPalette(i) {
  const list = getNamedPalettes();
  list.splice(i, 1);
  localStorage.setItem('svc_named_palettes', JSON.stringify(list));
  renderSavedPalettes();
}

// ===================================================
//  TEMPLATE GRID
// ===================================================
function initTemplateGrid() {
  const grid = document.getElementById('templateGrid');
  if (!grid) return;
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
  const inf = document.getElementById('inf_template');
  if (inf) inf.value = id;
  saveBrand();
  updateInforme();
}

// ===================================================
//  LOGO / FIRMA / SELLO UPLOAD
// ===================================================
function handleLogo(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    brandData.logo_data = ev.target.result;
    showSmallLogo(ev.target.result);
    saveBrand(); updatePreviews();
  };
  reader.readAsDataURL(file);
}
function showSmallLogo(src) {
  const z = document.getElementById('logoPreviewSmall');
  if (z) z.innerHTML = `<img src="${src}" style="max-width:80px;max-height:80px;object-fit:contain;border-radius:10px">`;
}
function handleFirma(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    brandData.firma_data = ev.target.result;
    showFirmaPreview(ev.target.result);
    saveBrand();
  };
  reader.readAsDataURL(file);
}
function showFirmaPreview(src) {
  const z = document.getElementById('firmaPreview');
  if (z) z.innerHTML = `<img src="${src}" style="max-height:50px;object-fit:contain">`;
}
function handleSello(e) {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    brandData.sello_data = ev.target.result;
    showSelloPreview(ev.target.result);
    saveBrand();
  };
  reader.readAsDataURL(file);
}
function showSelloPreview(src) {
  const z = document.getElementById('selloPreview');
  if (z) z.innerHTML = `<img src="${src}" style="max-height:50px;object-fit:contain">`;
}

// ===================================================
//  OBS CHIPS BUILDER
// ===================================================
function initObsChips() {
  const container = document.getElementById('obs_chips');
  if (!container) return;
  let html = '';
  Object.entries(OBS_CHIPS).forEach(([cat, items]) => {
    html += `<p style="font-size:11px;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin:10px 0 6px">${cat}</p>`;
    html += `<div class="chip-group">`;
    items.forEach(item => {
      html += `<div class="chip-select${(selectedObsChips[item]?' active':'')}" onclick="toggleObsChip(this,'${item.replace(/'/g,"\\'")}')"> ${item}</div>`;
    });
    html += `</div>`;
  });
  html += `<div class="form-group" style="margin-top:14px"><label>Otros aspectos observados</label><input type="text" id="obs_otros" oninput="updateInforme()" placeholder="Notas adicionales..."></div>`;
  container.innerHTML = html;
}

function toggleObsChip(el, val) {
  if (selectedObsChips[val]) {
    delete selectedObsChips[val];
    el.classList.remove('active');
  } else {
    selectedObsChips[val] = true;
    el.classList.add('active');
  }
  updateInforme();
}

// ===================================================
//  INSTRUMENTOS
// ===================================================
function initInstrumentos() { renderInstrumentos(''); }

function renderInstrumentos(filter) {
  const list = document.getElementById('instr_list');
  if (!list) return;
  const all = [...INSTRUMENTOS, ...customInstrumentos];
  list.innerHTML = all.filter(i => i.toLowerCase().includes(filter.toLowerCase())).map(i => `
    <div class="instr-item">
      <input type="checkbox" ${selectedInstrumentos.includes(i)?'checked':''} onchange="toggleInstrumento('${i.replace(/'/g,"\\'")}',this)">
      <span>${i}</span>
    </div>
  `).join('');
}

function toggleInstrumento(name, cb) {
  if (cb.checked) { if (!selectedInstrumentos.includes(name)) selectedInstrumentos.push(name); }
  else { selectedInstrumentos = selectedInstrumentos.filter(i => i!==name); }
  updateInforme();
}

function filterInstrumentos() { renderInstrumentos(v('instr_search')); }

function addCustomInstrumento() {
  const val = v('instr_custom').trim();
  if (!val) return;
  customInstrumentos.push(val);
  selectedInstrumentos.push(val);
  setV('instr_custom','');
  renderInstrumentos(v('instr_search'));
  updateInforme();
}

// ===================================================
//  ANTECEDENTES
// ===================================================
function initAntecedentes() {
  const list = document.getElementById('antecedentes_list');
  if (!list) return;
  list.innerHTML = ANTECEDENTES_CATS.map(cat => `
    <div class="ant-card" id="ant_${cat}">
      <div class="ant-header" onclick="toggleAnt('${cat}')">
        <span>${cat}</span><span>▾</span>
      </div>
      <div class="ant-body">
        <textarea rows="3" id="ant_txt_${cat}" oninput="antData['${cat}']=this.value;updateInforme()" placeholder="Descripción de antecedentes ${cat.toLowerCase()}...">${antData[cat]||''}</textarea>
      </div>
    </div>
  `).join('');
}

function toggleAnt(cat) {
  const el = document.getElementById('ant_'+cat);
  if (el) el.classList.toggle('open');
}

// ===================================================
//  PLAN TERAPÉUTICO
// ===================================================
function initPlanCards() {
  const container = document.getElementById('plan_cards');
  if (!container) return;
  container.innerHTML = Object.entries(PLAN_DATA).map(([title, opts]) => {
    const sel = planSelections[title] || [];
    const hasOpts = opts.length > 0;
    return `
      <div class="plan-card">
        <h4>📌 ${title}</h4>
        ${hasOpts ? `
          <div class="option-tags">${opts.map(o=>`<div class="opt-tag${sel.includes(o)?' sel':''}" onclick="togglePlan('${title}','${o.replace(/'/g,"\\'")}',this)">${o}</div>`).join('')}</div>
        ` : ''}
        <textarea rows="2" id="plan_txt_${title.replace(/\s/g,'_')}" oninput="planSelections['${title}_custom']=this.value;updateInforme()" placeholder="${title}...">${planSelections[title+'_custom']||''}</textarea>
      </div>
    `;
  }).join('');
}

function togglePlan(title, opt, el) {
  if (!planSelections[title]) planSelections[title] = [];
  const idx = planSelections[title].indexOf(opt);
  if (idx > -1) { planSelections[title].splice(idx,1); el.classList.remove('sel'); }
  else { planSelections[title].push(opt); el.classList.add('sel'); }
  updateInforme();
}

// ===================================================
//  BULLET LISTS
// ===================================================
function addBullet(containerId, prefix, onchangeFn) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const id = prefix + Date.now();
  const div = document.createElement('div');
  div.className = 'bullet-list-item';
  div.innerHTML = `<span style="color:var(--c1);font-size:16px;margin-top:10px">•</span><input type="text" id="${id}" oninput="${onchangeFn}()" placeholder="Escribe aquí..."><button class="btn btn-danger btn-sm" onclick="this.parentElement.remove();${onchangeFn}()">✕</button>`;
  container.appendChild(div);
}

function addBulletWithText(containerId, prefix, text) {
  addBullet(containerId, prefix, 'updateInforme');
  const container = document.getElementById(containerId);
  if (container) {
    const last = container.lastElementChild?.querySelector('input');
    if (last) { last.value = text; updateInforme(); }
  }
}

function getBullets(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  return Array.from(container.querySelectorAll('input[type=text]')).map(i=>i.value).filter(Boolean);
}

// ===================================================
//  EJEMPLOS DE PACIENTE
// ===================================================
function loadEjemplo(n) {
  const ejemplos = [
    {
      fi_nombre:'Ana García López', fi_sexo:'Femenino', fi_edad:28, fi_fn:'1997-04-12',
      fi_lugar:'Lima', fi_ecivil:'Soltera', fi_grado:'Superior universitaria',
      fi_ocup:'Comunicadora social', fi_dom:'San Isidro, Lima',
      fi_fecha: new Date().toISOString().split('T')[0],
      inf_motivo:'Refiere dificultades para concentrarse y mantener la atención en sus actividades diarias. Menciona sentirse ansioso/a, con preocupación constante y dificultad para relajarse. El malestar se ha intensificado en las últimas semanas.',
      obs_chips:['Aseado/a','Colaborador/a','Orientación conservada','Lenguaje coherente','Ansiosa','Contacto visual intermitente'],
      instrumentos:['Entrevista clínica','Observación conductual','BAI Inventario de Ansiedad de Beck','Escala de Estrés Percibido PSS'],
      inf_analisis:'La información recogida sugiere presencia de sintomatología compatible con ansiedad generalizada de nivel moderado, con impacto en el funcionamiento académico y laboral.',
      inf_diag:'Posible Trastorno de Ansiedad Generalizada (a confirmar con evaluación continua).',
      conclusiones:['Se evidencian indicadores de ansiedad moderada que interfieren en el funcionamiento diario.','La paciente muestra motivación para el proceso terapéutico.'],
      recomendaciones:['Iniciar proceso psicoterapéutico.','Trabajar regulación emocional y estrategias de afrontamiento.','Mantener hábitos de sueño y autocuidado.'],
      plan:{objetivo:['Regular ansiedad'], enfoque:['TCC'], frecuencia:['Semanal'], tecnicas:['Registro emocional','Respiración diafragmática','Psicoeducación']},
    },
    {
      fi_nombre:'Lucía Mendoza Torres', fi_sexo:'Femenino', fi_edad:33, fi_fn:'1991-09-21',
      fi_lugar:'Miraflores, Lima', fi_ecivil:'Conviviente', fi_grado:'Superior universitaria',
      fi_ocup:'Diseñadora gráfica', fi_dom:'Miraflores, Lima',
      fi_fecha: new Date().toISOString().split('T')[0],
      inf_motivo:'Acude a consulta por dificultades para establecer límites en su relación de pareja. Refiere sentirse confundida, emocionalmente agotada y con dificultad para expresar lo que piensa sin sentirse culpable.',
      obs_chips:['Aseado/a','Colaborador/a','Orientación conservada','Lenguaje coherente','Triste','Contacto visual intermitente','Llanto durante la sesión'],
      instrumentos:['Entrevista clínica','Anamnesis psicológica','Registro emocional','Cuestionario de dependencia emocional'],
      inf_analisis:'Se identifican patrones relacionales de dependencia emocional y dificultad para la asertividad. La consultante muestra insight parcial sobre la dinámica de su relación.',
      inf_diag:'Indicadores de dependencia emocional con posible disfuncionalidad relacional.',
      conclusiones:['Se identifican dificultades para expresar necesidades y establecer límites personales.','Se observa patrón de dependencia emocional con impacto en la autoestima.'],
      recomendaciones:['Iniciar proceso psicoterapéutico enfocado en comunicación asertiva.','Trabajar límites personales y autonomía emocional.','Fortalecer habilidades de comunicación asertiva.'],
      plan:{objetivo:['Trabajar límites personales','Mejorar comunicación asertiva'], enfoque:['TCC'], frecuencia:['Semanal'], tecnicas:['Comunicación asertiva','Registro emocional','Reestructuración cognitiva']},
    },
    {
      fi_nombre:'Camila Rojas Vega', fi_sexo:'Femenino', fi_edad:21, fi_fn:'2004-02-14',
      fi_lugar:'Surco, Lima', fi_ecivil:'Soltera', fi_grado:'Superior universitaria',
      fi_ocup:'Estudiante universitaria', fi_dom:'Surco, Lima',
      fi_fecha: new Date().toISOString().split('T')[0],
      inf_motivo:'Refiere inseguridad, baja autoestima y temor constante a equivocarse. Señala que desde la adolescencia ha tenido dificultades para creer en sus capacidades y se compara constantemente con sus pares.',
      obs_chips:['Aseado/a','Reservado/a','Orientación conservada','Lenguaje coherente','Triste','Contacto visual disminuido'],
      instrumentos:['Entrevista clínica','Escala de Autoestima de Rosenberg','BDI-II Inventario de Depresión de Beck','Registro de pensamientos'],
      inf_analisis:'Se identifican patrones emocionales asociados a creencias limitantes sobre el propio valor y la autoeficacia. Indicadores compatibles con autoestima baja y posible componente depresivo leve.',
      inf_diag:'Baja autoestima con posibles indicadores depresivos leves (a evaluar en próximas sesiones).',
      conclusiones:['Se evidencian creencias limitantes de larga data que impactan la autoestima.','La paciente muestra apertura al proceso terapéutico y capacidad reflexiva.'],
      recomendaciones:['Iniciar proceso psicoterapéutico.','Identificar y trabajar creencias limitantes.','Fortalecer la autoestima y la confianza en las propias capacidades.'],
      plan:{objetivo:['Fortalecer autoestima','Identificar creencias limitantes'], enfoque:['TCC','Psicoeducación'], frecuencia:['Semanal'], tecnicas:['Reestructuración cognitiva','Registro emocional','Tareas terapéuticas']},
    },
  ];

  const ej = ejemplos[n-1];
  Object.entries(ej).forEach(([key,val]) => {
    if (typeof val === 'string' || typeof val === 'number') {
      const el = document.getElementById(key);
      if (el) el.value = val;
    }
  });

  selectedObsChips = {};
  ej.obs_chips.forEach(c => selectedObsChips[c] = true);
  initObsChips();

  selectedInstrumentos = ej.instrumentos;
  renderInstrumentos('');

  planSelections = {};
  if (ej.plan.objetivo) planSelections['Objetivo general'] = ej.plan.objetivo;
  if (ej.plan.enfoque) planSelections['Enfoque terapéutico'] = ej.plan.enfoque;
  if (ej.plan.frecuencia) planSelections['Frecuencia'] = ej.plan.frecuencia;
  if (ej.plan.tecnicas) planSelections['Técnicas iniciales'] = ej.plan.tecnicas;
  initPlanCards();

  ['conclusiones_list','recomendaciones_list'].forEach(id => {
    const c = document.getElementById(id);
    if (c) c.innerHTML = '';
  });
  ej.conclusiones.forEach(t => addBulletWithText('conclusiones_list','inf_concl_',t));
  ej.recomendaciones.forEach(t => addBulletWithText('recomendaciones_list','inf_rec_',t));

  updateInforme();
}

function insertarEj(fieldId, text) {
  const el = document.getElementById(fieldId);
  if (el) { el.value = text; updateInforme(); }
}

// ===================================================
//  INFORME RENDER
// ===================================================
function updateInforme() {
  const container = document.getElementById('informePreview');
  if (!container) return;

  const d = brandData;
  const tmpl = document.getElementById('inf_template')?.value || currentTheme;
  const showWM = document.getElementById('inf_wm')?.checked;
  const cs = getComputedStyle(document.documentElement);
  const c1 = cs.getPropertyValue('--c1').trim();
  const c2 = cs.getPropertyValue('--c2').trim();
  const c3 = cs.getPropertyValue('--c3').trim();
  const c4 = cs.getPropertyValue('--c4').trim();

  let logoHtml = '';
  const logoModo = d.logo_modo || 'normal';
  const logoSize = parseInt(d.logo_size || 100);
  const logoOp = parseInt(d.logo_op || 100) / 100;
  const logoFondoB = d.logo_fondo_blanco;

  if (logoModo === 'oculto') {
    logoHtml = '';
  } else if (logoModo === 'icono' || !d.logo_data) {
    logoHtml = `<div class="a4-logo" style="opacity:${logoOp};transform:scale(${logoSize/100})">Ψ</div>`;
  } else {
    let wrapper = '';
    if (logoModo === 'circulo') {
      wrapper = `border-radius:50%;overflow:hidden;background:${logoFondoB?'#fff':'transparent'}`;
    } else if (logoModo === 'marca') {
      wrapper = `opacity:0.15;`;
    } else if (logoFondoB) {
      wrapper = `background:#fff;border-radius:16px;padding:4px;box-shadow:0 4px 12px rgba(0,0,0,.1)`;
    }
    logoHtml = `<div class="a4-logo" style="opacity:${logoOp};transform:scale(${logoSize/100});${wrapper}"><img src="${d.logo_data}" alt="Logo"></div>`;
  }

  const obsChips = Object.keys(selectedObsChips);
  const obsOtros = v('obs_otros');
  const antContenido = Object.entries(antData).filter(([,v]) => v.trim());

  let firmaHtml = '';
  if (d.firma_data) {
    firmaHtml = `<img class="a4-sig-img" src="${d.firma_data}">`;
  }
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
      <div>
        <b style="font-size:12px">${d.nombre || 'Nombre del especialista'}</b><br>
        <span style="font-size:10px;color:#6b7280">${d.frase || ''}</span>
      </div>
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
    <div class="a4-signature">
      ${firmaHtml}
      ${sigLine}
      ${sigName}${sigEsp}${sigCol}
    </div>
    ${selloHtml}
  </footer>`;

const pageTitleHtml = `
  <div class="a4-hero">
    <h1 class="a4-title">Informe de Consulta Inicial</h1>
    <span class="a4-badge">${v('fi_hc') ? 'HC: ' + v('fi_hc') : fechaConsulta}</span>
  </div>`;

const secDatos = (v('fi_nombre') || v('fi_edad') || v('fi_hc')) ? `
  <section class="a4-section">
    <h2><span class="a4-icon">1</span> Datos de Filiación</h2>
    <div class="a4-grid">
      ${rf('Historia clínica',v('fi_hc'))}
      ${rf('Nombre',v('fi_nombre'))}${rf('Sexo',v('fi_sexo'))}
      ${rf('Edad',v('fi_edad')?v('fi_edad')+' años':'')}${rf('F. nacimiento',v('fi_fn'))}
      ${rf('Lugar nacimiento',v('fi_lugar'))}${rf('Estado civil',v('fi_ecivil'))}
      ${rf('Grado instrucción',v('fi_grado'))}${rf('Ocupación',v('fi_ocup'))}
      ${rf('Domicilio',v('fi_dom'),'full')}
      ${rf('Fecha consulta',fechaConsulta)}${rf('Especialista',v('fi_esp')||d.nombre)}
    </div>
  </section>` : '';

const secMotivo = v('inf_motivo') ? `
  <section class="a4-section">
    <h2><span class="a4-icon">2</span> Motivo de Consulta</h2>
    <p class="a4-p">${v('inf_motivo')}</p>
  </section>` : '';

const secObs = (obsChips.length || v('inf_obs') || obsOtros) ? `
  <section class="a4-section">
    <h2><span class="a4-icon">3</span> Observación Conductual y General</h2>
    ${v('inf_obs') ? `<p class="a4-p" style="margin-bottom:10px">${v('inf_obs')}</p>` : ''}
    ${obsChips.length ? `<div class="a4-chips">${obsChips.map(c=>`<span class="a4-chip">${c}</span>`).join('')}</div>` : ''}
    ${obsOtros ? `<p class="a4-p" style="margin-top:8px"><em>Otros: ${obsOtros}</em></p>` : ''}
  </section>` : '';

const secInstr = selectedInstrumentos.length ? `
  <section class="a4-section">
    <h2><span class="a4-icon">4</span> Instrumentos / Técnicas Aplicadas</h2>
    <div class="a4-chips">${selectedInstrumentos.map(i=>`<span class="a4-chip">${i}</span>`).join('')}</div>
  </section>` : '';

const secAnt = antContenido.length ? `
  <section class="a4-section">
    <h2><span class="a4-icon">5</span> Antecedentes Relevantes</h2>
    <div class="a4-cards">${antContenido.map(([cat,txt])=>`<div class="a4-card"><b>${cat}</b><span>${txt}</span></div>`).join('')}</div>
  </section>` : '';

const secAnalisis = v('inf_analisis') ? `
  <section class="a4-section">
    <h2><span class="a4-icon">6</span> Análisis Clínico Inicial</h2>
    <p class="a4-p">${v('inf_analisis')}</p>
  </section>` : '';

const secDiag = diagNote ? `
  <section class="a4-section">
    <h2><span class="a4-icon">7</span> Impresión Diagnóstica Inicial</h2>
    ${diagNote}
  </section>` : '';

const secConclusiones = conclusiones.length ? `
  <section class="a4-section">
    <h2><span class="a4-icon">8</span> Conclusiones</h2>
    <ul class="a4-ul">${conclusiones.map(c=>`<li>${c}</li>`).join('')}</ul>
  </section>` : '';

const secRecomendaciones = recomendaciones.length ? `
  <section class="a4-section">
    <h2><span class="a4-icon">9</span> Recomendaciones</h2>
    <ul class="a4-ul">${recomendaciones.map(r=>`<li>${r}</li>`).join('')}</ul>
  </section>` : '';

const secPlan = planItems.length ? `
  <section class="a4-section">
    <h2><span class="a4-icon">10</span> Plan Terapéutico Inicial</h2>
    <div class="a4-cards">${planItems.map(p=>`<div class="a4-card"><b>${p.title}</b><span>${p.txt}</span></div>`).join('')}</div>
  </section>` : '';

const allSections = [secDatos, secMotivo, secObs, secInstr, secAnt, secAnalisis, secDiag, secConclusiones, secRecomendaciones, secPlan].filter(Boolean);

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
autoPaginateInforme(container, tmpl, c1, c2, c3, c4, footerHtml);
}

function rf(label, val, cls) {
  if (!val) return '';
  if (cls === 'full') return `<div style="grid-column:1/-1"><span>${label}:</span> <b>${val}</b></div>`;
  return `<div><span>${label}:</span> <b>${val}</b></div>`;
}

// ===================================================
//  BORRADOR
// ===================================================
function guardarBorrador() {
  const data = {
    fi: ['fi_nombre','fi_sexo','fi_edad','fi_fn','fi_lugar','fi_ecivil','fi_grado','fi_ocup','fi_dom','fi_fecha','fi_esp'].reduce((a,k)=>({...a,[k]:v(k)}),{}),
    inf_motivo: v('inf_motivo'), inf_obs: v('inf_obs'), obs_otros: v('obs_otros'),
    inf_analisis: v('inf_analisis'), inf_diag: v('inf_diag'),
    selectedObsChips, selectedInstrumentos, customInstrumentos, antData, planSelections,
    conclusiones: getBullets('conclusiones_list'),
    recomendaciones: getBullets('recomendaciones_list'),
    template: v('inf_template'), showWM: document.getElementById('inf_wm')?.checked,
  };
  localStorage.setItem('svc_borrador', JSON.stringify(data));
  alert('✅ Borrador guardado correctamente.');
}

function cargarBorrador() {
  const saved = localStorage.getItem('svc_borrador');
  if (!saved) { alert('No hay borrador guardado.'); return; }
  try {
    const d = JSON.parse(saved);
    Object.entries(d.fi||{}).forEach(([k,val]) => setV(k,val));
    setV('inf_motivo', d.inf_motivo); setV('inf_obs', d.inf_obs); setV('obs_otros', d.obs_otros);
    setV('inf_analisis', d.inf_analisis); setV('inf_diag', d.inf_diag);
    selectedObsChips = d.selectedObsChips||{};
    selectedInstrumentos = d.selectedInstrumentos||[];
    customInstrumentos = d.customInstrumentos||[];
    antData = d.antData||{};
    planSelections = d.planSelections||{};
    initObsChips(); renderInstrumentos(''); initAntecedentes(); initPlanCards();
    Object.entries(antData).forEach(([cat,txt])=>{const el=document.getElementById('ant_txt_'+cat);if(el)el.value=txt;});
    ['conclusiones_list','recomendaciones_list'].forEach(id=>{const c=document.getElementById(id);if(c)c.innerHTML='';});
    (d.conclusiones||[]).forEach(t => addBulletWithText('conclusiones_list','inf_concl_',t));
    (d.recomendaciones||[]).forEach(t => addBulletWithText('recomendaciones_list','inf_rec_',t));
    if (d.template) { setV('inf_template', d.template); }
    if (d.showWM !== undefined) { const el=document.getElementById('inf_wm'); if(el) el.checked=d.showWM; }
    updateInforme();
    alert('✅ Borrador cargado.');
  } catch(e) { alert('Error al cargar el borrador.'); }
}

function limpiarInforme() {
  if (!confirm('¿Limpiar todos los campos del informe?')) return;
  ['fi_nombre','fi_edad','fi_fn','fi_lugar','fi_ocup','fi_dom','fi_esp','fi_fecha','inf_motivo','inf_obs','obs_otros','inf_analisis','inf_diag'].forEach(k=>setV(k,''));
  selectedObsChips = {}; selectedInstrumentos = []; antData = {}; planSelections = {};
  initObsChips(); renderInstrumentos(''); initAntecedentes(); initPlanCards();
  ['conclusiones_list','recomendaciones_list'].forEach(id=>{const c=document.getElementById(id);if(c)c.innerHTML='';});
  updateInforme();
}

// ===================================================
//  BIENVENIDA MODULE
// ===================================================
function initBV() {
  const fb = document.getElementById('bv_frases_bank');
  if (fb && !fb.children.length) {
    fb.innerHTML = BV_FRASES.map((f,i)=>`
      <div class="chip-select${selectedBVFrase===f?' active':''}" onclick="selectBVFrase('${f.replace(/'/g,"\\'")}')">${f}</div>
    `).join('');
  }
  const rb = document.getElementById('bv_recs_bank');
  if (rb && !rb.children.length) {
    rb.innerHTML = `<div class="chip-group">${BV_RECS.map(r=>`
      <div class="chip-select${selectedBVRecs.includes(r)?' active':''}" onclick="toggleBVRec('${r.replace(/'/g,"\\'")}')">${r}</div>
    `).join('')}</div>`;
  }
  const mb = document.getElementById('bv_mats_bank');
  if (mb && !mb.children.length) {
    mb.innerHTML = `<div class="chip-group">${BV_MATS.map(m=>`
      <div class="chip-select${selectedBVMats.includes(m)?' active':''}" onclick="toggleBVMat('${m.replace(/'/g,"\\'")}')">${m}</div>
    `).join('')}</div>`;
  }
  const bd = brandData;
  const bvCont = document.getElementById('bv_contacto');
  if (bvCont && !bvCont.value && bd.tel) {
    bvCont.value = [bd.tel, bd.ig].filter(Boolean).join('  ·  ');
  }
}

function selectBVFrase(f) {
  selectedBVFrase = f;
  document.querySelectorAll('#bv_frases_bank .chip-select').forEach(el => {
    el.classList.toggle('active', el.textContent.trim() === f);
  });
  updateBV();
}

function toggleBVRec(r) {
  const idx = selectedBVRecs.indexOf(r);
  if (idx > -1) selectedBVRecs.splice(idx,1);
  else selectedBVRecs.push(r);
  document.querySelectorAll('#bv_recs_bank .chip-select').forEach(el => {
    el.classList.toggle('active', selectedBVRecs.includes(el.textContent.trim()));
  });
  updateBV();
}

function toggleBVMat(m) {
  const idx = selectedBVMats.indexOf(m);
  if (idx > -1) selectedBVMats.splice(idx,1);
  else selectedBVMats.push(m);
  document.querySelectorAll('#bv_mats_bank .chip-select').forEach(el => {
    el.classList.toggle('active', selectedBVMats.includes(el.textContent.trim()));
  });
  updateBV();
}

function setBVFormat(fmt, btn) {
  bvFormat = fmt;
  document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const canvas = document.getElementById('bvCanvas');
  canvas.className = `bv-canvas ${fmt}`;
  updateBV();
}

function updateBV() {
  const canvas = document.getElementById('bvCanvas');
  if (!canvas) return;
  const content = document.getElementById('bvContent');

  const cs = getComputedStyle(document.documentElement);
  const c1 = cs.getPropertyValue('--c1').trim();
  const c2 = cs.getPropertyValue('--c2').trim();
  const c3 = cs.getPropertyValue('--c3').trim();
  const c4 = cs.getPropertyValue('--c4').trim();

  canvas.style.background = c4;
  const recsCount = selectedBVRecs.length + selectedBVMats.length;
  const alertEl = document.getElementById('bv_alert');
  const tooMany = recsCount > 10;
  if (alertEl) alertEl.style.display = tooMany ? 'block' : 'none';

  canvas.innerHTML = `
    <div class="bv-blob" style="width:160%;height:140%;top:-40%;left:-30%;background:radial-gradient(ellipse at 30% 30%,${c2},transparent 70%);opacity:.8"></div>
    <div class="bv-blob" style="width:120%;height:120%;bottom:-30%;right:-20%;background:radial-gradient(ellipse at 70% 70%,color-mix(in srgb,${c1} 20%,${c4}),transparent 70%);opacity:.6"></div>
    <div class="bv-blob" style="width:60%;height:60%;top:10%;right:5%;border-radius:46% 54% 42% 58%;background:${c2};opacity:.4"></div>
  `;

  const bd = brandData;
  let logoHTML = bd.logo_data ? `<div class="bv-logo-zone"><img src="${bd.logo_data}" alt="Logo"></div>` : `<div class="bv-logo-zone" style="background:${c2};color:${c1}">Ψ</div>`;

  const titulo = v('bv_titulo') || '¡Bienvenido/a!';
  const msg = v('bv_msg') || '';
  const frase = v('bv_frase_custom') || selectedBVFrase;
  const contacto = v('bv_contacto') || '';

  let recsHTML = selectedBVRecs.length > 0 ? `<div class="bv-recs" style="background:rgba(255,255,255,.75)"><h4 style="color:${c3}">📌 Recomendaciones</h4><ul>${selectedBVRecs.map(r=>`<li>${r}</li>`).join('')}</ul></div>` : '';
  let matsHTML = selectedBVMats.length > 0 ? `<div class="bv-recs" style="background:rgba(255,255,255,.75)"><h4 style="color:${c3}">🎒 Materiales sugeridos</h4><ul>${selectedBVMats.map(m=>`<li>${m}</li>`).join('')}</ul></div>` : '';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'bv-content';
  contentDiv.innerHTML = `
    ${logoHTML}
    <div class="bv-title" style="color:${c1}">${titulo}</div>
    ${msg ? `<p class="bv-msg">${msg}</p>` : ''}
    ${recsHTML}
    ${matsHTML}
    ${frase ? `<p class="bv-frase" style="color:${c3}">"${frase}"</p>` : ''}
    ${contacto ? `<div class="bv-contacto" style="color:${c3};background:${c2};padding:8px 16px;border-radius:999px;font-size:11px;margin-top:8px">${contacto}</div>` : ''}
    ${bd.nombre ? `<div style="font-size:10.5px;color:${c3};margin-top:10px;font-weight:700">${bd.nombre}${bd.especialidad?' · '+bd.especialidad:''}</div>` : ''}
  `;
  canvas.appendChild(contentDiv);
}

function downloadBVImage() {
  const canvasEl = document.getElementById('bvCanvas');
  if (!canvasEl) return;
  const rect = canvasEl.getBoundingClientRect();
  const w = Math.round(rect.width), h = Math.round(rect.height);
  const scale = 2;
  const canvas = document.createElement('canvas');
  canvas.width = w * scale; canvas.height = h * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  const css = getComputedStyle(document.documentElement);
  const c1 = css.getPropertyValue('--c1').trim() || '#16aaa6';
  const c2 = css.getPropertyValue('--c2').trim() || '#def8f5';
  const c3 = css.getPropertyValue('--c3').trim() || '#f5b73f';
  const c4 = css.getPropertyValue('--c4').trim() || '#fffdf6';

  ctx.fillStyle = c4; ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 0.85; ctx.fillStyle = c2; ctx.beginPath(); ctx.arc(w * 0.25, h * 0.12, w * 0.35, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = 0.5; ctx.fillStyle = c1; ctx.beginPath(); ctx.arc(w * 0.82, h * 0.55, w * 0.30, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = 0.35; ctx.fillStyle = c3; ctx.beginPath(); ctx.arc(w * 0.35, h * 0.95, w * 0.25, 0, Math.PI * 2); ctx.fill();

  ctx.globalAlpha = 1; ctx.textAlign = 'center'; ctx.fillStyle = c1; ctx.font = '800 34px Arial';
  wrapCanvasText(ctx, v('bv_titulo') || '¡Bienvenido/a!', w / 2, 72, w - 60, 38);
  ctx.fillStyle = '#1c1c2e'; ctx.font = '15px Arial';
  wrapCanvasText(ctx, v('bv_msg') || '', w / 2, 130, w - 90, 22);

  let y = 190;
  if (selectedBVRecs.length) y = drawCanvasBox(ctx, 'RECOMENDACIONES', selectedBVRecs, w, y, c3);
  if (selectedBVMats.length) y = drawCanvasBox(ctx, 'MATERIALES SUGERIDOS', selectedBVMats, w, y + 14, c3);

  const frase = v('bv_frase_custom') || selectedBVFrase;
  if (frase) { ctx.fillStyle = c3; ctx.font = 'italic 13px Arial'; wrapCanvasText(ctx, `"${frase}"`, w / 2, y + 32, w - 80, 20); }
  const contacto = v('bv_contacto') || '';
  if (contacto) { ctx.fillStyle = c1; ctx.font = 'bold 12px Arial'; wrapCanvasText(ctx, contacto, w / 2, h - 42, w - 80, 18); }

  const a = document.createElement('a');
  a.download = 'bienvenida-visual.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text).split(' ');
  let line = '';
  for (let i = 0; i < words.length; i++) {
    const test = line + words[i] + ' ';
    if (ctx.measureText(test).width > maxWidth && i > 0) { ctx.fillText(line, x, y); line = words[i] + ' '; y += lineHeight; } 
    else { line = test; }
  }
  ctx.fillText(line, x, y);
  return y + lineHeight;
}

function drawCanvasBox(ctx, title, items, w, y, color) {
  const boxW = Math.min(330, w - 70);
  const x = (w - boxW) / 2;
  const boxH = 42 + items.length * 22;
  ctx.fillStyle = 'rgba(255,255,255,0.82)';
  roundRect(ctx, x, y, boxW, boxH, 14); ctx.fill();
  ctx.textAlign = 'left'; ctx.fillStyle = color; ctx.font = 'bold 12px Arial'; ctx.fillText(title, x + 18, y + 25);
  ctx.fillStyle = '#1c1c2e'; ctx.font = '12px Arial';
  items.forEach((item, i) => { ctx.fillText('• ' + item, x + 22, y + 52 + i * 22); });
  ctx.textAlign = 'center';
  return y + boxH;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath(); ctx.moveTo(x + radius, y); ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius); ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height); ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius); ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y); ctx.closePath();
}

// ===================================================
//  HELPERS
// ===================================================
function v(id) { const el=document.getElementById(id); return el?el.value:''; }
function cv(id) { const el=document.getElementById(id); return el?el.checked:false; }
function setV(id,val) { const el=document.getElementById(id); if(el && val!==undefined && val!==null) el.value=val; }
function setCV(id,val) { const el=document.getElementById(id); if(el) el.checked=val; }

// ===================================================
//  INIT
// ===================================================
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  const fi_fecha = document.getElementById('fi_fecha');
  if (fi_fecha) fi_fecha.value = today;

  const savedBrand = localStorage.getItem('svc_brand');
  if (savedBrand) {
    try {
      const d = JSON.parse(savedBrand);
      brandData = d;
      if (d.c1) setColors(d.c1, d.c2, d.c3, d.c4);
      if (d.template) currentTheme = d.template;
    } catch(e) {}
  }

  const cs = getComputedStyle(document.documentElement);
  setV('col_c1', cs.getPropertyValue('--c1').trim());
  setV('col_c2', cs.getPropertyValue('--c2').trim());
  setV('col_c3', cs.getPropertyValue('--c3').trim());
  setV('col_c4', cs.getPropertyValue('--c4').trim());

  initPaletteGrid(); initTemplateGrid(); initObsChips(); initInstrumentos();
  initAntecedentes(); initPlanCards(); renderSavedPalettes(); updatePreviewDots();

  const inf_tmpl = document.getElementById('inf_template');
  if (inf_tmpl) inf_tmpl.value = currentTheme;

  if (brandData.nombre) {
    const fi_esp = document.getElementById('fi_esp');
    if (fi_esp && !fi_esp.value) fi_esp.value = brandData.nombre;
  }

  setTimeout(updateInforme, 100);

  ANTECEDENTES_CATS.forEach(cat => {
    const el = document.getElementById('ant_txt_' + cat);
    if (el) el.addEventListener('input', () => { antData[cat] = el.value; updateInforme(); });
  });
});

function printInforme() {
  document.body.classList.remove('print-bienvenida');
  document.body.classList.add('print-informe');
  goTo('informe');
  updateInforme();
  setTimeout(() => {
    window.print();
    setTimeout(() => { document.body.classList.remove('print-informe'); }, 500);
  }, 150);
}

function printBienvenida() {
  document.body.classList.remove('print-informe');
  document.body.classList.add('print-bienvenida');
  goTo('bienvenida');
  updateBV();
  setTimeout(() => {
    window.print();
    setTimeout(() => { document.body.classList.remove('print-bienvenida'); }, 500);
  }, 150);
}

function autoPaginateInforme(container, tmpl, c1, c2, c3, c4, footerHtml) {
  const firstSheet = container.querySelector('.a4-sheet');
  const content = firstSheet.querySelector('#page1Content');
  if (!firstSheet || !content) return;

  const sections = Array.from(content.querySelectorAll('.a4-section'));
  
  // Remover footer temporalmente para calcular espacios
  const footer = firstSheet.querySelector('.a4-footer');
  if (footer) footer.remove();

  // Altura segura de contenido por hoja (aprox 820px para tamaño A4)
  const safeHeight = 820;
  let currentHeight = 0;
  let overflowStartIndex = -1;

  // Evaluar qué entra en la primera hoja
  sections.forEach((section, index) => {
    const h = section.offsetHeight + 18; // altura real de la sección + margen
    if (overflowStartIndex === -1 && (currentHeight + h > safeHeight) && currentHeight > 0) {
      overflowStartIndex = index;
    } else {
      currentHeight += h;
    }
  });

  // Si todo entra en la hoja 1, regresamos el footer y terminamos
  if (overflowStartIndex === -1) {
    firstSheet.insertAdjacentHTML('beforeend', footerHtml);
    return;
  }

  // Separar las secciones que no entran
  let remainingSections = sections.slice(overflowStartIndex);
  remainingSections.forEach(sec => sec.remove());

  let currentSheet = firstSheet;

  // Crear hojas 2, 3, 4... automáticamente mientras haya contenido
  while (remainingSections.length > 0) {
    const newSheet = document.createElement('div');
    newSheet.className = `a4-sheet ${tmpl} a4-continuation`;
    newSheet.setAttribute('style', `--c1:${c1};--c2:${c2};--c3:${c3};--c4:${c4}`);
    
    // Copiamos la decoración de fondo y marca de agua (para que todas las hojas mantengan el diseño)
    const decor = firstSheet.querySelector('.a4-decor')?.outerHTML || '';
    const wm = firstSheet.querySelector('.a4-wm')?.outerHTML || '';
    
    const newContent = document.createElement('div');
    newContent.className = 'page-content';
    newContent.style.paddingTop = '10px'; // Un poco de aire arriba
    
    newSheet.innerHTML = decor + wm;
    newSheet.appendChild(newContent);
    container.appendChild(newSheet);
    currentSheet = newSheet;

    let pageHeight = 0;
    
    // Llenar la hoja actual
    while (remainingSections.length > 0) {
      const sec = remainingSections[0];
      newContent.appendChild(sec);
      const secHeight = sec.offsetHeight + 18;
      
      if (pageHeight + secHeight > safeHeight && pageHeight > 0) {
        // Si ya no entra en esta hoja, lo quitamos y el bucle creará una hoja nueva
        sec.remove();
        break;
      }
      
      pageHeight += secHeight;
      remainingSections.shift();
    }
  }

  // Añadir la firma y pie de página SOLO a la última hoja creada
  currentSheet.insertAdjacentHTML('beforeend', footerHtml);
}

// ===================================================
// FIX PARA VITE (type="module") 
// Asegura que todos los onclicks del HTML funcionen
// ===================================================
window.goTo = goTo;
window.exportBrand = exportBrand;
window.importBrand = importBrand;
window.clearBrand = clearBrand;
window.saveBrand = saveBrand;
window.updatePreviews = updatePreviews;
window.handleLogo = handleLogo;
window.handleFirma = handleFirma;
window.handleSello = handleSello;
window.applyCustomColors = applyCustomColors;
window.saveNamedPalette = saveNamedPalette;
window.loadNamedPalette = loadNamedPalette;
window.deleteNamedPalette = deleteNamedPalette;
window.selectTemplate = selectTemplate;
window.toggleObsChip = toggleObsChip;
window.filterInstrumentos = filterInstrumentos;
window.toggleInstrumento = toggleInstrumento;
window.addCustomInstrumento = addCustomInstrumento;
window.toggleAnt = toggleAnt;
window.togglePlan = togglePlan;
window.addBullet = addBullet;
window.addBulletWithText = addBulletWithText;
window.insertarEj = insertarEj;
window.updateInforme = updateInforme;
window.setBVFormat = setBVFormat;
window.updateBV = updateBV;
window.downloadBVImage = downloadBVImage;
window.printBienvenida = printBienvenida;
window.printInforme = printInforme;
window.loadEjemplo = loadEjemplo;
window.guardarBorrador = guardarBorrador;
window.cargarBorrador = cargarBorrador;
window.limpiarInforme = limpiarInforme;
window.selectBVFrase = selectBVFrase;
window.toggleBVRec = toggleBVRec;
window.toggleBVMat = toggleBVMat;
window.applyPalette = applyPalette;
