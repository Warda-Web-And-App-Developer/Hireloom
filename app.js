'use strict';
/* =====================================================
   Hireloom – app logic, templates, export
   ===================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const KEY = 'resumecraft_v2';

/* ---------- Data ---------- */
const BLANK = {
  name: '', title: '', tagline: '', photo: '',
  email: '', phone: '', location: '', website: '', linkedin: '', github: '', instagram: '', facebook: '', twitter: '',
  dob: '', nationality: '', summary: '',
  experience: [], education: [], skills: [], languages: [], certs: [], projects: [], awards: [], refs: [],
  tools: '', strengths: '', interests: '', hide: {}
};

const SAMPLE = {
  ...BLANK,
  name: 'Alex Morgan', title: 'Marketing Manager', tagline: 'Turning ideas into results',
  email: 'alex.morgan@email.com', phone: '+1 555 123 4567', location: 'Austin, Texas',
  website: 'www.alexmorgan.com', linkedin: 'linkedin.com/in/alexmorgan', instagram: '@alexmorgan',
  summary: 'Results-driven marketing manager with 7+ years of experience building brands and growing digital audiences. Skilled in campaign strategy, content marketing and analytics, with a track record of turning ideas into measurable growth.',
  experience: [
    { role: 'Senior Marketing Manager', company: 'Brightwave Co.', location: 'Austin, TX', start: 'Jun 2021', end: 'Present',
      desc: 'Led a team of 6 across paid, social and email campaigns\nGrew organic traffic by 85% in 12 months through SEO and content\nManaged a $400K annual budget with a 3.2x return on ad spend' },
    { role: 'Marketing Specialist', company: 'Northfield Studio', location: 'Dallas, TX', start: 'Mar 2018', end: 'May 2021',
      desc: 'Launched 20+ integrated campaigns for B2B and B2C clients\nBuilt reporting dashboards that cut analysis time by 40%' }
  ],
  education: [
    { degree: 'BBA in Marketing', school: 'University of Texas', location: '', grade: '', start: '2014', end: '2018', details: '' }
  ],
  skills: [
    { name: 'Digital Marketing', level: 95 }, { name: 'SEO & Analytics', level: 90 }, { name: 'Content Strategy', level: 88 },
    { name: 'Brand Management', level: 85 }, { name: 'Team Leadership', level: 92 }, { name: 'Copywriting', level: 80 }
  ],
  languages: [{ name: 'English', level: 100 }, { name: 'Spanish', level: 80 }, { name: 'French', level: 60 }],
  certs: [{ name: 'Google Analytics Certification', issuer: 'Google', year: '2020' }, { name: 'Inbound Marketing', issuer: 'HubSpot', year: '2019' }],
  awards: [{ title: 'Marketer of the Year', org: 'Brightwave Co.', year: '2023' }],
  tools: 'Google Analytics, HubSpot, Canva, Excel, Notion',
  strengths: 'Brand Strategy, Content Marketing, Social Media, SEO & SEM, Email Campaigns',
  interests: 'Photography, Travel, Reading, Music'
};

const THEMES = [
  { n: 'Blush Denim', dark: '#4a6785', acc: '#a94767' },
  { n: 'Ocean', dark: '#0f2a43', acc: '#2a9d8f' },
  { n: 'Royal', dark: '#25286b', acc: '#6c63ff' },
  { n: 'Forest', dark: '#0e3b2e', acc: '#5aa17f' },
  { n: 'Rose', dark: '#4a1d33', acc: '#d6577f' },
  { n: 'Amber', dark: '#2b2118', acc: '#d08a2e' },
  { n: 'Slate', dark: '#1f2937', acc: '#ef6a4c' },
  { n: 'Plum', dark: '#3a1c4a', acc: '#a855c7' }
];

const TEMPLATES = [
  ['t1', 'Duo Panel', 'Photo overlaps a summary card. Best with a 3–4 line summary.'],
  ['t2', 'Elegant', 'Dark sidebar with timelines and skill bars. The tagline appears as a script accent.'],
  ['t3', 'Column', 'Centered profile column with hexagon photo and dot ratings.'],
  ['t4', 'Ribbon', 'Ribbon headers, segment bars and a gradient banner.'],
  ['t5', 'Arch', 'Soft rounded panels with circular skill gauges (up to 6 skills).'],
  ['t6', 'Curve', 'Big curve layout. Keep the summary under ~250 characters; shows 4 skill gauges.'],
  ['t7', 'Organic', 'Organic photo shape with a compact left column. Keep descriptions short.'],
  ['t8', 'Brush', 'Brush-stroke headings with a big job-title banner and software tiles.'],
  ['t9', 'Bento', 'Modern card grid with a bold title, timelines and achievement cards.'],
  ['t10', 'Services', 'Skills & services cards with navy headers and a contact footer.'],
  ['t11', 'Leaf', 'Warm cream page with an arch photo, leaf line-art and skill bars.'],
  ['t12', 'Soft Grid', 'Pill headings with connector lines and a soft rounded card.'],
  ['t13', 'Sand', 'Circle photo, elegant thin name, personal info and skill gauges.'],
  ['t14', 'Teal Arch', 'Colour band, arch photo in a tinted column and skill bars.'],
  ['t15', 'Tan Block', 'Big colour block with an overlapping photo and two-column body.'],
  ['t16', 'Forest', 'Split two-tone page with a wide pill photo and centred name.'],
  ['t17', 'Terracotta', 'Square photo on colour blocks, pill headings and a dark side panel.'],
  ['t18', 'Mint Navy', 'Header band, timeline circles and a navy side panel.'],
  ['t19', 'Navy Orange', 'Navy side panel, big stacked name and orange banner.'],
  ['t20', 'Grey Amber', 'Grey sidebar with amber accents and ruled sections.'],
  ['t21', 'Elegant Grey', 'Soft grey sidebar and dotted timeline.'],
  ['t22', 'Black Tab', 'Bold name, black icon tab and two columns.'],
  ['t23', 'Spaced Line', 'Wide-spaced name with a vertical line.'],
  ['t24', 'Blue Icons', 'Centred header with round icon headings.'],
  ['t25', 'Monogram', 'Round photo and a giant monogram letter.'],
  ['t26', 'Cocoa Blocks', 'Colour blocks with square photo and donut skills.'],
  ['t27', 'Cocoa Split', 'Photo and name split header with skill bars.']
];

/* Fields of each repeatable section: [key, label, placeholder, span(1|2), kind] */
const LISTS = {
  experience: { one: 'Position', fields: [
    ['role', 'Job title', 'Marketing Manager'], ['company', 'Company / employer', 'Brightwave Co.'],
    ['location', 'Location', 'Austin, TX'], ['start', 'Start date', 'Jan 2021'], ['end', 'End date', 'Present'],
    ['desc', 'Responsibilities & achievements (one per line)', 'Led a team of 6\nGrew traffic by 85%', 2, 'area']] },
  education: { one: 'Education', fields: [
    ['degree', 'Degree / qualification', 'BBA in Marketing', 2], ['school', 'School / university', 'University of Texas', 2],
    ['location', 'Location', 'Austin, TX'], ['grade', 'Grade / GPA', '3.8 / 4.0'],
    ['start', 'Start year', '2014'], ['end', 'End year', '2018'],
    ['details', 'Notes (optional)', 'Honours, thesis, relevant courses…', 2, 'area']] },
  certs: { one: 'Certification', fields: [
    ['name', 'Certification / course name', 'Google Analytics Certification', 2], ['issuer', 'Issued by', 'Google'], ['year', 'Year', '2020']] },
  projects: { one: 'Project', fields: [
    ['name', 'Project name', 'Rebrand campaign'], ['link', 'Link (optional)', 'www.project.com'],
    ['desc', 'Short description', 'What it was and the result', 2, 'area']] },
  awards: { one: 'Award', fields: [
    ['title', 'Award / achievement', 'Marketer of the Year', 2], ['org', 'Awarded by', 'Brightwave Co.'], ['year', 'Year', '2023']] },
  refs: { one: 'Reference', fields: [
    ['name', 'Full name', 'Jordan Lee'], ['role', 'Job title & company', 'Director, Northfield Studio'],
    ['contact', 'Email / phone', 'jordan@email.com · +1 555 000 1111', 2]] }
};
const NEW = {
  experience: () => ({ role: '', company: '', location: '', start: '', end: '', desc: '' }),
  education: () => ({ degree: '', school: '', location: '', grade: '', start: '', end: '', details: '' }),
  certs: () => ({ name: '', issuer: '', year: '' }),
  projects: () => ({ name: '', link: '', desc: '' }),
  awards: () => ({ title: '', org: '', year: '' }),
  refs: () => ({ name: '', role: '', contact: '' }),
  skills: () => ({ name: '', level: 80 }),
  languages: () => ({ name: '', level: 80 })
};
const HIDE_OPTS = [['contact', 'Contact details'], ['summary', 'Summary'], ['experience', 'Experience'], ['education', 'Education'],
  ['skills', 'Skills'], ['languages', 'Languages'], ['certs', 'Certifications'], ['projects', 'Projects'],
  ['awards', 'Awards'], ['refs', 'References'], ['tools', 'Tools'], ['strengths', 'Strengths'], ['interests', 'Interests'], ['tagline', 'Tagline']];

function sanitizeFmt(fmt) {
  const out = {};
  if (!fmt || typeof fmt !== 'object') return out;
  ['name', 'title', 'photo'].forEach(k => {
    if (fmt[k] && typeof fmt[k] === 'object') {
      const entry = {};
      if (typeof fmt[k].s === 'number' && fmt[k].s !== 100) entry.s = fmt[k].s;
      if (k !== 'photo' && typeof fmt[k].a === 'string' && fmt[k].a) entry.a = fmt[k].a;
      if (entry.s || entry.a) out[k] = entry;
    }
  });
  return out;
}

function load() {
  try {
    const j = JSON.parse(localStorage.getItem(KEY));
    if (j && j.data) return { tpl: j.tpl || 't1', theme: j.theme || { dark: THEMES[0].dark, acc: THEMES[0].acc }, fs: j.fs || 1, fmt: sanitizeFmt(j.fmt), data: { ...BLANK, ...j.data, hide: { ...(j.data.hide || {}) } } };
  } catch (e) { /* ignore */ }
  return { tpl: 't1', theme: { dark: THEMES[0].dark, acc: THEMES[0].acc }, fs: 1, fmt: {}, data: structuredClone(SAMPLE) };
}
let S = load();

/* Copy of the data with hidden sections removed (what the templates see) */
function view(d) {
  const v = { ...d }, h = d.hide || {};
  ['summary', 'tools', 'strengths', 'interests', 'tagline'].forEach(k => { if (h[k]) v[k] = ''; });
  ['experience', 'education', 'skills', 'languages', 'certs', 'projects', 'awards', 'refs'].forEach(k => { if (h[k]) v[k] = []; });
  if (h.contact) ['email', 'phone', 'location', 'website', 'linkedin', 'github', 'instagram', 'facebook', 'twitter', 'dob', 'nationality'].forEach(k => { v[k] = ''; });
  return v;
}

/* ---------- Helpers ---------- */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const split = s => String(s || '').split(/[,\n]/).map(x => x.trim()).filter(Boolean);
const lines = s => String(s || '').split('\n').map(x => x.replace(/^[\s•\-–*]+/, '').trim()).filter(Boolean);
const range = e => [e.start, e.end].filter(Boolean).join(' – ');
const initials = d => (d.name || '').trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase() || 'YN';
const nameParts = d => { const p = (d.name || '').trim().split(/\s+/).filter(Boolean); return { first: p[0] || 'Your', last: p.slice(1).join(' ') || 'Name' }; };
const nameSize = (s, base) => +(base * (s.length <= 6 ? 1 : s.length <= 8 ? .84 : s.length <= 10 ? .7 : .58)).toFixed(2);
const levelLabel = p => p >= 95 ? 'Native' : p >= 85 ? 'Fluent' : p >= 70 ? 'Advanced' : p >= 50 ? 'Intermediate' : 'Basic';
const photo = d => d.photo ? `<img src="${d.photo}" alt="Profile photo">` : `<div class="ph">${esc(initials(d))}</div>`;
const subH = v => v ? `<div class="sub">${esc(v)}</div>` : '';
const smH = v => v ? `<small>${esc(v)}</small>` : '';
const pH = v => v ? `<p>${esc(v)}</p>` : '';
const tgH = d => d.tagline ? `<div class="tg">${esc(d.tagline)}</div>` : '';

const ICONS = {
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c3 2.5 9 2.5 12 0v-4.5"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  heart: '<path d="M12 20s-8-5-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15 12 20 12 20z"/>',
  tool: '<path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.5 2.5-2.2-.5-.5-2.2z"/>'
};
const ic = n => `<svg class="ic" viewBox="0 0 24 24">${ICONS[n] || ICONS.star}</svg>`;

const SOCIAL = ['website', 'linkedin', 'github', 'instagram', 'facebook', 'twitter'];
const contacts = d => [
  ['email', 'mail', 'Email:'], ['phone', 'phone', 'Phone:'], ['location', 'pin', 'Location:'], ['website', 'globe', 'Website:'],
  ['linkedin', 'link', 'LinkedIn:'], ['github', 'link', 'GitHub:'], ['instagram', 'link', 'Instagram:'],
  ['facebook', 'link', 'Facebook:'], ['twitter', 'link', 'X / Twitter:'], ['dob', 'user', 'Born:'], ['nationality', 'user', 'Nationality:']
].filter(([k]) => d[k]).map(([k, i, l]) => ({ k, i, l, r: d[k], v: (k === 'dob' || k === 'nationality') ? `${l} ${d[k]}` : d[k] }));
const contactList = d => contacts(d).map(c => [c.i, c.v]);
const ctItems = (d, cls) => { const c = contactList(d); return c.length ? `<ul class="${cls}">${c.map(([i, v]) => `<li><span class="bubble">${ic(i)}</span><span>${esc(v)}</span></li>`).join('')}</ul>` : ''; };

const bul = (e, max = 99) => { const l = lines(e.desc).slice(0, max); return l.length ? `<ul>${l.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''; };
const eduHtml = (d, cls = 'item') => d.education.map(e => `<div class="${cls}"><b>${esc(e.degree)}</b>${subH([e.school, e.location].filter(Boolean).join(' · '))}${smH(range(e))}${e.grade ? `<p>Grade: ${esc(e.grade)}</p>` : ''}${pH(e.details)}</div>`).join('');
const expHtml = (d, cls = 'item', max = 99) => d.experience.map(e => `<div class="${cls}"><b>${esc(e.role)}</b>${subH([e.company, e.location].filter(Boolean).join(' · '))}${smH(range(e))}${bul(e, max)}</div>`).join('');
const dotsHtml = (p, n = 5) => { const f = Math.round(p / 100 * n); return `<span class="dots">${Array.from({ length: n }, (_, i) => `<i class="${i < f ? 'on' : ''}"></i>`).join('')}</span>`; };
const donut = (p, txt) => `<div class="donut" style="--p:${p}"><span>${txt ?? p + '%'}</span></div>`;
const sec = (cls, title, body, icon) => body ? `<section class="${cls}"><h3>${icon ? ic(icon) : ''}<span>${title}</span></h3>${body}</section>` : '';
const chips = arr => arr.length ? `<div class="chips">${arr.map(x => `<span>${esc(x)}</span>`).join('')}</div>` : '';
const bl = arr => arr.length ? `<ul class="blist">${arr.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
const rateList = (arr, cls) => arr.length ? `<ul class="${cls}">${arr.map(s => `<li><span>${esc(s.name)}</span>${dotsHtml(s.level)}</li>`).join('')}</ul>` : '';

/* Certifications, projects, awards, references */
const X = { certs: ['Certifications', 'cap'], projects: ['Projects', 'briefcase'], awards: ['Awards', 'star'], refs: ['References', 'user'] };
const XI = {
  certs: c => `<div class="item"><b>${esc(c.name)}</b>${subH(c.issuer)}${smH(c.year)}</div>`,
  projects: p => `<div class="item"><b>${esc(p.name)}</b>${subH(p.link)}${pH(p.desc)}</div>`,
  awards: a => `<div class="item"><b>${esc(a.title)}</b>${subH(a.org)}${smH(a.year)}</div>`,
  refs: r => `<div class="item"><b>${esc(r.name)}</b>${subH(r.role)}${smH(r.contact)}</div>`
};
const xs = (d, key, cls = '') => d[key].length ? sec(cls, X[key][0], d[key].map(XI[key]).join(''), X[key][1]) : '';
const xsAll = (d, cls = '') => ['projects', 'certs', 'awards', 'refs'].map(k => xs(d, k, cls)).join('');

/* ---------- Template 3 decorative fan ---------- */
function fan() {
  const cx = 397, cy = 215, radii = [95, 175, 255, 340], n = 15;
  const pts = radii.map((r, ri) => Array.from({ length: n }, (_, i) => {
    const a = Math.PI * (1 + i / (n - 1));
    const j = (((i * 7 + ri * 13) % 5) - 2) * (r * .05);
    return [cx + (r + j) * Math.cos(a), cy + (r + j) * Math.sin(a) * .78];
  }));
  let d = '';
  const ln = (a, b) => { d += `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`; };
  pts.forEach((ring, ri) => ring.forEach((p, i) => {
    if (i < n - 1) ln(p, ring[i + 1]);
    if (ri < radii.length - 1) { ln(p, pts[ri + 1][i]); if (i < n - 1) ln(p, pts[ri + 1][i + 1]); }
  }));
  return `<svg class="t3-fan" viewBox="0 0 794 215" preserveAspectRatio="xMidYMin slice"><path d="${d}" fill="none" stroke="var(--dark)" stroke-width="1.2" stroke-linejoin="round"/></svg>`;
}

/* =====================================================
   Templates
   ===================================================== */
const T = {};

T.t1 = d => {
  const n = nameParts(d);
  return `<div class="t t1">
  <div class="t1-head"><div class="fn" style="font-size:${nameSize(n.first, 5)}em">${esc(n.first)}</div><div class="ln">${esc(n.last)}</div><div class="ttl">${esc(d.title)}</div>${tgH(d)}</div>
  <div class="t1-photo">${photo(d)}</div>
  <div class="t1-about"><span class="pill">About Me</span>${d.summary ? `<p>${esc(d.summary)}</p>` : ''}</div>
  <div class="t1-cols">
    <div class="l">
      ${sec('', 'Skills', d.skills.length ? `<ul class="t1-sk">${d.skills.map(s => `<li><span>${esc(s.name)}</span><b>${s.level}%</b></li>`).join('')}</ul>` : '')}
      ${sec('', 'Education', eduHtml(d))}
      ${sec('', 'Language', d.languages.length ? `<div class="t1-lang">${d.languages.slice(0, 3).map(l => `<div><span>${esc(l.name)}</span>${donut(l.level)}</div>`).join('')}</div>` : '')}
      ${ctItems(d, 't1-ct')}
    </div>
    <div class="r">
      ${sec('', 'Professional Experience', expHtml(d))}
      ${sec('', 'Core Strengths', bl(split(d.strengths).slice(0, 6)))}
      ${xsAll(d, 'xs')}
    </div>
  </div></div>`;
};

T.t2 = d => {
  const n = nameParts(d);
  const sz = nameSize(n.first.length > n.last.length ? n.first : n.last, 3.6);
  const tools = split(d.tools).slice(0, 5);
  const langs = d.languages.map(l => `${esc(l.name)} – ${levelLabel(l.level)}`).join('<br>');
  const ct = contactList(d).length ? `<ul class="t2-ct">${contactList(d).map(([i, v]) => `<li>${ic(i)}<span>${esc(v)}</span></li>`).join('')}</ul>` : '';
  return `<div class="t t2">
  <aside>
    <div class="t2-photo"><div class="pic">${photo(d)}</div><em class="mono">${esc(initials(d))}</em></div>
    ${sec('', 'Contact', ct, 'user')}
    ${sec('', 'Education', d.education.length ? `<div class="tl">${eduHtml(d, 'item tli')}</div>` : '', 'cap')}
    ${sec('', 'Skills', d.skills.length ? `<ul class="t2-sk">${d.skills.map(s => `<li><span>${esc(s.name)}</span><i><u style="width:${s.level}%"></u></i><em>${s.level}%</em></li>`).join('')}</ul>` : '', 'star')}
    ${xs(d, 'certs', 'xs')}
  </aside>
  <main>
    <div class="blobtop"></div>
    ${d.tagline ? `<div class="t2-tag">${esc(d.tagline)}</div>` : ''}
    <h1 style="font-size:${sz}em"><span>${esc(n.first)}</span><span class="a">${esc(n.last)}</span></h1>
    <div class="ttl">${esc(d.title)}</div>
    ${sec('t2-about', 'About Me', d.summary ? `<p>${esc(d.summary)}</p>` : '', 'user')}
    <div class="t2-two">
      ${sec('', 'Experience', d.experience.length ? `<div class="tl">${expHtml(d, 'item tli', 3)}</div>` : '', 'briefcase')}
      ${sec('', 'Strengths', split(d.strengths).length ? `<ul class="t2-svc">${split(d.strengths).slice(0, 6).map(s => `<li><span class="bubble">${ic('star')}</span>${esc(s)}</li>`).join('')}</ul>` : '', 'star')}
    </div>
    ${xs(d, 'projects', 'xs')}${xs(d, 'awards', 'xs')}${xs(d, 'refs', 'xs')}
    ${tools.length ? sec('t2-tools', 'Tools & Expertise', `<div class="t2-tl">${tools.map(t => `<div><b>${esc(t.slice(0, 2))}</b><small>${esc(t)}</small></div>`).join('')}</div>`, 'tool') : ''}
    <div class="t2-foot">
      ${langs ? `<div><h4>Languages</h4><p>${langs}</p></div>` : ''}
      ${d.interests ? `<div><h4>Interests</h4><p>${split(d.interests).map(esc).join('<br>')}</p></div>` : ''}
      <svg viewBox="0 0 100 100" fill="none" stroke="var(--acc)" stroke-width="1"><path d="M10 95C30 60 55 30 90 8M30 72c-8-6-12-14-12-24 10 2 17 9 20 18M45 54c-6-7-8-15-6-25 9 4 14 12 14 22M62 38c-4-8-4-16 0-24 8 5 11 13 9 22"/></svg>
    </div>
  </main></div>`;
};

T.t3 = d => `<div class="t t3">
  ${fan()}
  <div class="t3-side l">
    ${sec('', 'Education', eduHtml(d))}
    ${xs(d, 'certs', 'xs')}${xs(d, 'awards', 'xs')}
    ${sec('', 'Languages', rateList(d.languages, 't3-rate'))}
  </div>
  <div class="t3-col">
    <div class="t3-hex"><div>${photo(d)}</div></div>
    <h1>${esc(d.name || 'Your Name')}</h1>
    <div class="ttl">${esc(d.title)}</div>
    ${tgH(d)}
    ${d.summary ? `<p>${esc(d.summary)}</p>` : ''}
    <div class="dotline"></div>
    <div class="t3-ct">${contacts(d).map(c => `<h4>${c.l}</h4><span>${esc(c.r)}</span>`).join('')}</div>
    ${d.interests ? `<div class="t3-int"><div class="dotline"></div><h4>Interests</h4>${split(d.interests).map(esc).join(' · ')}</div>` : ''}
  </div>
  <div class="t3-side r">
    ${sec('', 'Experience', expHtml(d, 'item', 2))}
    ${xs(d, 'projects', 'xs')}${xs(d, 'refs', 'xs')}
    ${sec('', 'Skills', rateList(d.skills.slice(0, 6), 't3-rate'))}
  </div></div>`;

T.t4 = d => {
  const hob = split(d.interests).slice(0, 4);
  return `<div class="t t4">
  <aside class="t4-side">
    <div class="t4-photo">${photo(d)}</div>
    ${sec('', 'Contact', ctItems(d, 't4-ct'))}
    ${sec('', 'Language', rateList(d.languages, 't4-rt'))}
    ${sec('', 'Skills', rateList(d.skills.slice(0, 7), 't4-rt'))}
    ${hob.length ? sec('', 'Hobbies', `<div class="t4-hob">${hob.map(h => `<div><span class="bubble">${ic('heart')}</span>${esc(h)}</div>`).join('')}</div>`) : ''}
  </aside>
  <div class="t4-main">
    <div class="t4-banner"><h1>${esc(d.name || 'Your Name')}</h1><div class="ttl">${esc(d.title)}</div>${tgH(d)}</div>
    <div class="t4-body">
      ${sec('', 'Profile', d.summary ? `<p>${esc(d.summary)}</p>` : '', 'user')}
      ${sec('', 'Education', eduHtml(d), 'cap')}
      ${sec('', 'Experience', expHtml(d), 'briefcase')}
      ${xsAll(d, 'xs')}
      ${sec('', 'Strengths', chips(split(d.strengths).slice(0, 6)), 'star')}
    </div>
  </div></div>`;
};

T.t5 = d => `<div class="t t5">
  <div class="t5-d1"></div><div class="t5-d2"></div>
  <div class="t5-left">
    <div class="t5-photo">${photo(d)}</div>
    <h1>${esc(d.name || 'Your Name')}</h1>
    <div class="ttl">${esc(d.title)}</div>${tgH(d)}
    ${d.skills.length ? `<h3>Skills</h3><div class="t5-dg">${d.skills.slice(0, 6).map(s => `<div>${donut(s.level)}<small>${esc(s.name)}</small></div>`).join('')}</div>` : ''}
  </div>
  <div class="t5-ct">${contactList(d).length ? `<h3>Contact</h3><ul>${contactList(d).map(([i, v]) => `<li>${ic(i)}<span>${esc(v)}</span></li>`).join('')}</ul>` : ''}</div>
  <div class="t5-right">
    ${sec('', 'Profile', pH(d.summary))}
    ${sec('', 'Education', eduHtml(d))}
    ${sec('', 'Experience', expHtml(d, 'item', 2))}
    ${xsAll(d, 'xs')}
    ${sec('', 'Languages', d.languages.length ? `<p>${d.languages.map(l => `${esc(l.name)} (${levelLabel(l.level)})`).join(' · ')}</p>` : '')}
  </div></div>`;

T.t6 = d => {
  const n = nameParts(d);
  const sz = nameSize(n.first.length > n.last.length ? n.first : n.last, 3.4);
  const soc = contacts(d).filter(c => SOCIAL.includes(c.k)).slice(0, 1);
  const ints = split(d.interests).slice(0, 3);
  const sk = d.skills.slice(0, 4), rest = d.skills.slice(4).map(s => s.name);
  const ct = contacts(d).filter(c => !soc.includes(c)).map(c => c.v);
  return `<div class="t t6">
  <div class="t6-circle"></div><div class="t6-corner"></div><div class="t6-moon"></div>
  <div class="t6-soc">${soc.map(c => `<div><span class="bubble">${ic(c.i)}</span>${esc(c.r)}</div>`).join('')}</div>
  <div class="t6-photo">${photo(d)}</div>
  <div class="t6-name"><h1 style="font-size:${sz}em"><span>${esc(n.first)}</span><span>${esc(n.last)}</span></h1><div class="ttl">${esc(d.title)}</div>${tgH(d)}</div>
  <div class="t6-left">
    ${d.languages.length ? `<h3>Language</h3><ul>${d.languages.slice(0, 5).map(l => `<li><span>${esc(l.name)}</span><span class="bar"><u style="width:${l.level}%"></u></span></li>`).join('')}</ul>` : ''}
    ${ints.length ? `<h3 style="margin-top:.7em">Interests</h3><div class="t6-int">${ints.map(i => `<div><div class="donut" style="--p:75"><span>${ic('heart')}</span></div>${esc(i)}</div>`).join('')}</div>` : ''}
  </div>
  ${d.summary ? `<div class="t6-prof"><h3>Profile</h3><p>${esc(d.summary)}</p></div>` : ''}
  <div class="t6-right">
    ${sk.length ? `<section class="t6-sk"><h3>Skills</h3><div class="row">${sk.map(s => `<div>${donut(s.level)}${esc(s.name)}</div>`).join('')}</div>${rest.length ? `<p>${rest.map(esc).join(' · ')}</p>` : ''}</section>` : ''}
    ${sec('', 'Experience', expHtml(d, 'item', 2))}
    ${xsAll(d, 'xs')}
    ${ct.length ? `<div class="contact"><h3>Contact</h3><ul>${ct.map(c => `<li>${esc(c)}</li>`).join('')}</ul></div>` : ''}
  </div></div>`;
};

T.t7 = d => {
  const n = nameParts(d);
  const sz = nameSize(n.first.length > n.last.length ? n.first : n.last, 3.8);
  return `<div class="t t7">
  <svg class="t7-blob" viewBox="0 0 794 1123" preserveAspectRatio="none"><path d="M0,90 C140,70 330,150 340,330 C350,520 440,640 420,820 C405,960 330,1060 280,1123 L0,1123 Z" fill="var(--dark)"/></svg>
  <svg class="t7-flora" viewBox="0 0 80 220" fill="none"><path d="M40 215C36 150 52 90 44 20" stroke="var(--dark)" stroke-width="1.5" opacity=".6"/><g fill="var(--acc)" opacity=".85"><ellipse cx="22" cy="150" rx="18" ry="7" transform="rotate(-35 22 150)"/><ellipse cx="60" cy="120" rx="18" ry="7" transform="rotate(35 60 120)"/><ellipse cx="24" cy="90" rx="16" ry="6" transform="rotate(-30 24 90)"/><ellipse cx="58" cy="62" rx="16" ry="6" transform="rotate(30 58 62)"/></g><g fill="var(--soft)" stroke="var(--acc)"><circle cx="44" cy="26" r="14"/><circle cx="30" cy="46" r="11"/><circle cx="58" cy="44" r="10"/></g></svg>
  <div class="t7-name"><h1 style="font-size:${sz}em"><span>${esc(n.first)}</span><span>${esc(n.last)}</span></h1><div class="ttl">${esc(d.title)}</div>${tgH(d)}</div>
  <div class="t7-photo">${photo(d)}</div>
  <div class="t7-left">
    ${sec('', 'Education', eduHtml(d), 'star')}
    ${sec('', 'Work Experience', expHtml(d, 'item', 1), 'star')}
    ${sec('', 'Skills', bl(d.skills.slice(0, 6).map(s => s.name)), 'star')}
    ${sec('', 'Languages', d.languages.length ? `<ul class="t7-lg">${d.languages.map(l => `<li><span>${esc(l.name)}</span>${dotsHtml(l.level)}</li>`).join('')}</ul>` : '', 'star')}
    ${xs(d, 'certs')}${xs(d, 'awards')}
  </div>
  <div class="t7-right">
    ${sec('', 'About Me', pH(d.summary))}
    ${sec('', 'Contact', contactList(d).length ? `<ul>${contactList(d).map(([i, v]) => `<li>${ic(i)}<span>${esc(v)}</span></li>`).join('')}</ul>` : '')}
    ${xs(d, 'projects')}${xs(d, 'refs')}
  </div></div>`;
};

/* =====================================================
   More styles (8–17)
   ===================================================== */
const words = s => String(s || '').trim().split(/\s+/).filter(Boolean);
const nm = d => d.name || 'Your Name';
const longest = (a, b) => a.length > b.length ? a : b;
const ctPlain = (d, cls, skipUser) => { const c = contactList(d).filter(x => !(skipUser && x[0] === 'user')); return c.length ? `<ul class="${cls}">${c.map(([i, v]) => `<li>${ic(i)}<span>${esc(v)}</span></li>`).join('')}</ul>` : ''; };
const bars = (arr, cls = '', pct = false) => arr.length ? `<ul class="bars ${cls}${pct ? ' pct' : ''}">${arr.map(s => `<li><span>${esc(s.name)}</span><i><u style="width:${s.level}%"></u></i>${pct ? `<em>${s.level}%</em>` : ''}</li>`).join('')}</ul>` : '';
const tiles = (d, max) => { const t = split(d.tools).slice(0, max); return t.length ? `<div class="tiles">${t.map(x => `<div><b>${esc(x.slice(0, 2))}</b><small>${esc(x)}</small></div>`).join('')}</div>` : ''; };
const leaf = cls => `<svg class="${cls}" viewBox="0 0 120 260" fill="none" stroke="var(--acc)" stroke-width="1.6" stroke-linecap="round"><path d="M60 258C56 190 68 110 58 8"/><g fill="var(--soft)"><path d="M58 70c-30-8-42-30-40-52 28 6 40 26 40 52z"/><path d="M58 130c-30-8-42-30-40-52 28 6 40 26 40 52z"/><path d="M58 190c-30-8-42-30-40-52 28 6 40 26 40 52z"/><path d="M60 100c30-8 42-30 40-52-28 6-40 26-40 52z"/><path d="M60 160c30-8 42-30 40-52-28 6-40 26-40 52z"/><path d="M60 220c30-8 42-30 40-52-28 6-40 26-40 52z"/></g></svg>`;
const socialLinks = d => contacts(d).filter(c => SOCIAL.includes(c.k)).map(c => esc(c.r));
const tl9 = (arr, f) => arr.length ? `<ul class="tl9">${arr.map(f).join('')}</ul>` : '';
const place = e => [e.school || e.company, e.location].filter(Boolean).join(' · ');

/* ---------- 8 · Brush Green ---------- */
T.t8 = d => {
  const w = words(d.title), l1 = w[0] || 'Your', l2 = w.slice(1).join(' ');
  const sz = nameSize(longest(l1, l2), 5.2);
  const exp = d.experience.map(e => `<div class="item"><span class="dt">${esc(range(e))}</span><b>${esc(e.role)}</b>${subH([e.company, e.location].filter(Boolean).join(' · '))}${bul(e, 2)}</div>`).join('') + xsAll(d, 'xs');
  const sk = tiles(d, 7) + chips(d.skills.map(s => s.name));
  return `<div class="t t8">
  <i class="dots d1"></i><i class="dots d2"></i><i class="dots d3"></i>
  <div class="b8-c1"></div><div class="b8-c2"></div><i class="b8-dot x1"></i><i class="b8-dot x2"></i>
  <div class="b8-photo">${photo(d)}</div>
  <div class="b8-title" style="font-size:${sz}em"><span>${esc(l1)}</span><span class="a">${esc(l2)}</span></div>
  <div class="b8-about"><h3>About Me</h3><p>Hi, I'm <b>${esc(nm(d))}</b>.${d.summary ? ' ' + esc(d.summary) : ''}</p>${tgH(d)}</div>
  <div class="b8-body">
    <div class="b8-row two"><div>${sec('', 'Education', eduHtml(d))}</div><div class="b8-side">${ctPlain(d, 'b8-ct')}</div></div>
    ${sk ? `<div class="b8-row">${sec('', 'Software &amp; Skills', sk)}</div>` : ''}
    ${exp ? `<div class="b8-row">${sec('', 'Experience', `<div class="b8-exp">${exp}</div>`)}</div>` : ''}
  </div>
  <svg class="b8-wave" viewBox="0 0 794 34" preserveAspectRatio="none"><path d="M0 18C160-8 300 36 460 16S700-6 794 10V34H0Z" fill="var(--acc)"/><path d="M0 28C200 6 380 38 560 24S740 14 794 22V34H0Z" fill="var(--dark)"/></svg>
  </div>`;
};

/* ---------- 9 · Bento ---------- */
T.t9 = d => {
  const w = words(d.title).slice(0, 3), mx = Math.max(...w.map(x => x.length), 6);
  const px = Math.max(34, Math.min(74, 600 / mx));
  const tags = split(d.strengths).slice(0, 5).map(esc).join(' <i>●</i> ');
  const ring = d.skills.slice(0, 3).map(s => `<div>${donut(s.level)}<small>${esc(s.name)}</small></div>`).join('');
  const card = (t, i, body, cls = '') => body ? `<div class="b9-card ${cls}"><h3>${ic(i)}<span>${t}</span></h3>${body}</div>` : '';
  const ach = [...d.awards.map(a => [a.title, [a.org, a.year].filter(Boolean).join(' · ')]), ...d.certs.map(c => [c.name, [c.issuer, c.year].filter(Boolean).join(' · ')]), ...d.projects.map(p => [p.name, p.desc])].slice(0, 4);
  const lk = socialLinks(d);
  return `<div class="t t9">
  <div class="b9-title" style="font-size:${(px / 13).toFixed(2)}em">${w.map(x => `<span>${esc(x)}</span>`).join('')}${d.tagline ? `<em>${esc(d.tagline)}</em>` : ''}</div>
  ${tags ? `<div class="b9-tags">${tags}</div>` : ''}
  <div class="b9-brush"></div><div class="b9-photo">${photo(d)}</div>
  ${contactList(d).length ? `<div class="b9-card b9-ct">${ctPlain(d, 'b9-cl')}</div>` : ''}
  ${d.languages.length ? `<div class="b9-card b9-lang"><span class="bubble">${ic('globe')}</span><div><b>Languages</b><small>${d.languages.map(l => esc(l.name)).join(' · ')}</small></div></div>` : ''}
  <div class="b9-flow">
    <div class="b9-card b9-about"><div class="b9-mini">${photo(d)}</div><div class="b9-ab"><small>About me</small><h2>${esc(nm(d))}</h2><div class="b9-t">${esc(d.title)}</div>${pH(d.summary)}</div>${ring ? `<div class="b9-ring">${ring}</div>` : ''}</div>
    <div class="b9-grid">
      ${card('Education', 'cap', tl9(d.education, e => `<li><b>${esc(e.degree)}</b><span>${esc(place(e))}</span><small>${esc(range(e))}</small></li>`))}
      ${card('Experience', 'briefcase', tl9(d.experience, e => `<li><b>${esc(e.role)}</b><span>${esc(place(e))}</span><small>${esc(range(e))}</small></li>`))}
      ${card('Tools', 'tool', tiles(d, 4))}
    </div>
    <div class="b9-grid g2">
      ${card('Skills', 'star', bars(d.skills.slice(0, 6), 'b9bars', true))}
      ${card('Achievements', 'star', ach.length ? `<div class="b9-ach">${ach.map(([a, b]) => `<div><b>${esc(a)}</b><small>${esc(b)}</small></div>`).join('')}</div>` : '')}
      ${card('References', 'user', d.refs.map(XI.refs).join(''))}
    </div>
    ${lk.length ? `<div class="b9-card b9-foot">${lk.join(' <i>●</i> ')}</div>` : ''}
  </div></div>`;
};

/* ---------- 10 · Services ---------- */
T.t10 = d => {
  const n = nameParts(d), sz = nameSize(n.first, 4.4);
  const pillTxt = [d.title, ...split(d.strengths).slice(0, 2)].filter(Boolean).map(esc).join(' &nbsp;|&nbsp; ');
  const col = (t, i, arr) => arr.length ? `<div class="b10-card"><span class="b10-badge">${ic(i)}</span><h4>${t}</h4><ul class="b10-l">${arr.slice(0, 10).map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>` : '';
  const box = (t, items) => items.length ? `<div class="b10-box"><h4>${t}</h4><ul class="b10-ck">${items.slice(0, 5).map(x => `<li>${x}</li>`).join('')}</ul></div>` : '';
  const ct = contacts(d).filter(c => ['email', 'phone', 'location', 'website'].includes(c.k)).map(c => esc(c.r));
  return `<div class="t t10">
  <div class="b10-photo">${photo(d)}</div>
  <div class="b10-head"><div class="hi">Hi, I'm</div><div class="fn" style="font-size:${sz}em">${esc(n.first)}</div><div class="ln">${esc(n.last)}</div>
    ${pillTxt ? `<div class="pill">${pillTxt}</div>` : ''}${d.summary ? `<p>${esc(d.summary)}</p>` : ''}</div>
  <svg class="b10-wave" viewBox="0 0 794 90" preserveAspectRatio="none"><path d="M0 24C200 78 420 -14 794 70" fill="none" stroke="var(--dark)" stroke-width="12"/></svg>
  <div class="b10-main">
    <h2>MY SKILLS &amp; SERVICES</h2>
    <div class="b10-cols">${col('Skills', 'star', d.skills.map(s => s.name))}${col('Strengths', 'briefcase', split(d.strengths))}${col('Tools &amp; Software', 'tool', split(d.tools))}</div>
    <div class="b10-cols bot">
      ${box('Experience', d.experience.map(e => `<b>${esc(e.role)}</b><small>${esc([e.company, range(e)].filter(Boolean).join(' · '))}</small>`))}
      ${box('Education', d.education.map(e => `<b>${esc(e.degree)}</b><small>${esc([e.school, range(e)].filter(Boolean).join(' · '))}</small>`))}
      ${box('Awards &amp; Certificates', [...d.awards.map(a => `<b>${esc(a.title)}</b><small>${esc([a.org, a.year].filter(Boolean).join(' · '))}</small>`), ...d.certs.map(c => `<b>${esc(c.name)}</b><small>${esc([c.issuer, c.year].filter(Boolean).join(' · '))}</small>`)])}
    </div>
  </div>
  <div class="b10-foot"><div><h4>LET'S WORK TOGETHER! <span>♥</span></h4>${d.tagline ? `<p>${esc(d.tagline)}</p>` : ''}</div><i></i><div class="c"><span class="bubble">${ic('mail')}</span><div><h4>CONTACT ME</h4>${ct.map(x => `<p>${x}</p>`).join('')}</div></div></div>
  </div>`;
};

/* ---------- 11 · Leaf ---------- */
T.t11 = d => {
  const n = nameParts(d), sz = nameSize(longest(n.first, n.last), 2.9);
  return `<div class="t t11">
  <i class="b11-blob1"></i><i class="b11-blob2"></i>${leaf('b11-leafL')}${leaf('b11-leafR')}
  <div class="b11-frame"></div><div class="b11-photo">${photo(d)}</div>
  <div class="b11-head"><h1 style="font-size:${sz}em"><span>${esc(n.first)}</span><span>${esc(n.last)}</span></h1><div class="ttl">${esc(d.title)}</div>${tgH(d)}<hr>${pH(d.summary)}</div>
  <div class="b11-l">${sec('', 'Skills', bars(d.skills.slice(0, 6), 'b11bars'))}${sec('', 'Contact', ctItems(d, 'b11-ct'))}</div>
  <div class="b11-r">${sec('', 'Education', eduHtml(d))}${sec('', 'Experience Work', expHtml(d, 'item', 3))}${xs(d, 'certs', 'xs')}${xs(d, 'awards', 'xs')}${xs(d, 'projects', 'xs')}${xs(d, 'refs', 'xs')}</div>
  </div>`;
};

/* ---------- 12 · Soft Grid ---------- */
T.t12 = d => {
  const ph = (t, i) => `<div class="pill12"><b>${t}</b><i></i><span>${ic(i)}</span></div>`;
  const exp = d.experience.map(e => `<div class="e12"><small>${esc(range(e))}</small><b>${esc(e.role)}</b>${e.company ? `<div>${esc([e.company, e.location].filter(Boolean).join(' · '))}</div>` : ''}${bul(e, 2)}</div>`).join('');
  const edu = d.education.slice(0, 3);
  return `<div class="t t12">
  <div class="b12-grid"></div><div class="b12-band"></div><div class="b12-ring"></div><div class="b12-photo">${photo(d)}</div>
  <div class="b12-left"><h1>${esc(nm(d))}</h1><div class="b12-t">${esc(d.title)}</div>${tgH(d)}
    ${d.summary ? ph('MY PROFILE', 'user') + `<p class="b12-p">${esc(d.summary)}</p>` : ''}
    ${d.skills.length ? ph('SKILL', 'tool') + bars(d.skills.slice(0, 5), 'b12bars') : ''}</div>
  <div class="b12-card">${exp ? ph('EXPERIENCE', 'briefcase') + exp : ''}${contactList(d).length ? ph('CONTACT', 'phone') + ctPlain(d, 'b12-ct') : ''}${xsAll(d, 'xs')}</div>
  ${edu.length ? `<div class="b12-edu">${ph('EDUCATION', 'cap')}<div class="b12-ec" style="grid-template-columns:repeat(${edu.length},1fr)">${edu.map(e => `<div><small>${esc(range(e))}</small><b>${esc(e.degree)}</b><span>${esc(e.school)}</span></div>`).join('')}</div></div>` : ''}
  </div>`;
};

/* ---------- 13 · Sand Circle ---------- */
T.t13 = d => {
  const n = nameParts(d), sz = nameSize(longest(n.first, n.last), 4.2);
  const pi = [['Name', d.name], ['Date of Birth', d.dob], ['Nationality', d.nationality], ['Location', d.location]].filter(x => x[1]);
  const row = e => `<li><span>${esc(range(e))}</span><div><b>${esc(e.role || e.degree)}</b><br>${esc(place(e))}</div></li>`;
  return `<div class="t t13">
  <i class="b13-q1"></i><i class="b13-q2"></i><i class="b13-dots"></i><b class="b13-x x1">✕</b><b class="b13-x x2">✕</b>
  <div class="b13-photo">${photo(d)}</div>
  <div class="b13-name" style="font-size:${sz}em"><span>${esc(n.first)}</span><span>${esc(n.last)}</span></div>
  ${pi.length ? `<div class="b13-pers"><h4>Personal information</h4>${pi.map(([a, b]) => `<p>${a}: ${esc(b)}</p>`).join('')}</div>` : ''}
  <div class="b13-ct">${ctPlain(d, 'b13-cl', true)}</div>
  <div class="b13-card">
    ${d.summary ? `<span class="p13">Resume Summary</span><p class="s13">${esc(d.summary)}</p>` : ''}
    ${d.experience.length ? `<span class="p13">Work Experience</span><ul class="tl13">${d.experience.map(row).join('')}</ul>` : ''}
    ${d.education.length ? `<span class="p13">Education</span><ul class="tl13">${d.education.map(row).join('')}</ul>` : ''}
    ${xsAll(d, 'xs')}
  </div>
  <div class="b13-r">
    ${d.skills.length ? `<div class="h13"><span class="p13">Software Skills</span><i></i></div>${d.skills.slice(0, 3).map(s => `<div class="g13">${donut(s.level, esc(s.name.slice(0, 2)))}<span>${esc(s.name)}</span></div>`).join('')}` : ''}
    ${d.languages.length ? `<div class="h13"><span class="p13">Language</span><i></i></div>${bars(d.languages, 'b13bars')}` : ''}
  </div></div>`;
};

/* ---------- 14 · Teal Arch ---------- */
T.t14 = d => {
  const n = nameParts(d), sz = nameSize(longest(n.first, n.last), 3.9);
  return `<div class="t t14">
  <div class="b14-top"></div>${leaf('b14-leaf')}
  <div class="b14-col"><div class="b14-photo">${photo(d)}</div>${sec('', 'About Me', pH(d.summary))}${sec('', 'Experience', expHtml(d, 'item', 2))}${xs(d, 'certs', 'xs')}</div>
  <div class="b14-name" style="font-size:${sz}em"><span>${esc(n.first)}</span><span>${esc(n.last)}</span></div>
  <div class="b14-ttl">${esc(d.title)}</div>
  <div class="b14-r">${ctItems(d, 'b14-ct')}${sec('', 'Education', eduHtml(d))}${sec('', 'Skills', bars(d.skills.slice(0, 6), 'b14bars'))}${xs(d, 'awards', 'xs')}${xs(d, 'projects', 'xs')}${xs(d, 'refs', 'xs')}</div>
  </div>`;
};

/* ---------- 15 · Tan Block ---------- */
T.t15 = d => {
  const n = nameParts(d), sz = nameSize(longest(n.first, n.last), 3.8);
  return `<div class="t t15">
  ${leaf('b15-leaf')}${leaf('b15-leaf2')}<div class="b15-block"></div><div class="b15-photo">${photo(d)}</div>
  <div class="b15-name" style="font-size:${sz}em"><span>${esc(n.first)}</span><span>${esc(n.last)}</span></div>
  <div class="b15-ttl">${esc(d.title)}</div><i class="b15-vl"></i>
  <div class="b15-l">${sec('', 'About Me', pH(d.summary))}${sec('', 'Education', eduHtml(d))}${sec('', 'Contact', ctItems(d, 'b15-ct'))}${xs(d, 'certs', 'xs')}</div>
  <div class="b15-r">${sec('', 'Work Experience', expHtml(d, 'item', 2))}${sec('', 'Skills', bars(d.skills.slice(0, 5), 'b15bars'))}${xs(d, 'awards', 'xs')}${xs(d, 'projects', 'xs')}${xs(d, 'refs', 'xs')}</div>
  </div>`;
};

/* ---------- 16 · Forest Split ---------- */
T.t16 = d => {
  const n = nameParts(d), sz = nameSize(longest(n.first, n.last), 3.4);
  const w = words(d.title), t1 = w[0] || '', t2 = w.slice(1).join(' ');
  return `<div class="t t16">
  <i class="sp s1">✦</i><i class="sp s2">✦</i>
  <div class="b16-photo">${photo(d)}</div>
  <div class="b16-name" style="font-size:${sz}em"><span class="l">${esc(n.first)}</span><span class="r">${esc(n.last)}</span></div>
  <div class="b16-ttl"><span class="l">${esc(t1)}</span><span class="r">${esc(t2)}</span></div>
  <div class="b16-l">${ctPlain(d, 'b16-ct')}${d.summary ? `<p class="b16-p">${esc(d.summary)}</p>` : ''}${sec('', 'Skills', bl(d.skills.map(s => s.name).slice(0, 6)))}</div>
  <div class="b16-r">${sec('', 'Work Experience', expHtml(d, 'item', 2))}${sec('', 'Education', eduHtml(d))}${xsAll(d, 'xs')}</div>
  </div>`;
};

/* ---------- 17 · Terracotta ---------- */
T.t17 = d => {
  const n = nameParts(d), sz = nameSize(longest(n.first, n.last), 2.9);
  return `<div class="t t17">
  <div class="b17-blk1"></div><div class="b17-blk2"></div><div class="b17-photo">${photo(d)}</div><i class="b17-vl"></i>
  <div class="b17-head"><h1 style="font-size:${sz}em"><span>${esc(n.first)}</span><span>${esc(n.last)}</span></h1><div class="ttl">${esc(d.title)}</div>${tgH(d)}${pH(d.summary)}</div>
  <div class="b17-l">${sec('', 'Education', eduHtml(d))}${sec('', 'Skill', bars(d.skills.slice(0, 6), 'b17bars', true))}${xs(d, 'certs', 'xs')}</div>
  <div class="b17-r">${sec('', 'Experience', expHtml(d, 'item', 2))}${sec('', 'Contact', ctPlain(d, 'b17-ct'))}${xs(d, 'awards', 'xs')}</div>
  </div>`;
};

/* =====================================================
   More styles (18–27)
   ===================================================== */
const profRows = d => [['Name', d.name], ['Birthday', d.dob], ['National', d.nationality], ['Language', d.languages.map(l => l.name).join(', ')], ['Location', d.location]].filter(r => r[1]);
const dl = (d, cls) => { const r = profRows(d); return r.length ? `<dl class="${cls}">${r.map(([a, b]) => `<dt>${a}</dt><dd>${esc(b)}</dd>`).join('')}</dl>` : ''; };
const ctSq = (d, cls, max = 9) => { const c = contactList(d).slice(0, max); return c.length ? `<ul class="${cls}">${c.map(([i, v]) => `<li><span class="sq">${ic(i)}</span><span>${esc(v)}</span></li>`).join('')}</ul>` : ''; };
const socBar = d => contacts(d).filter(c => SOCIAL.includes(c.k)).map(c => `<span>${ic(c.i)}${esc(c.r)}</span>`).join('');
const yr = s => (String(s || '').match(/\d{4}/g) || []).pop() || '';
const yy = e => esc(yr(e.start)) + '<br>' + esc(yr(e.end) || String(e.end || '').slice(0, 4));
const awc = d => [...d.awards.map(a => ({ t: a.title, o: a.org, y: a.year })), ...d.certs.map(c => ({ t: c.name, o: c.issuer, y: c.year }))];
const awH = d => awc(d).map(a => `<div class="aw"><b>${esc(a.t)}</b><i>${esc(a.o)}</i><span>${esc(a.y)}</span></div>`).join('');
const refsH = (d, cls = 'refs') => d.refs.length ? `<div class="${cls}">${d.refs.map(r => `<div><b>${esc(r.name)}</b><i>${esc(r.role)}</i><span>${esc(r.contact)}</span></div>`).join('')}</div>` : '';
const hr2 = arr => arr.filter(Boolean).join('<hr>');

/* ---------- 18 · Mint Navy ---------- */
T.t18 = d => {
  const n = nm(d), sz = Math.max(1.3, Math.min(2.3, 34 / n.length)).toFixed(2);
  const hob = split(d.interests).slice(0, 5);
  const emp = d.experience.map(e => `<div class="e18"><span class="dot">${yy(e)}</span><div><b>${esc(e.role)}</b>${e.location ? `<em>${esc(e.location)}</em>` : ''}<div class="sub">${esc([e.company, range(e)].filter(Boolean).join(' | '))}</div>${bul(e, 3)}</div></div>`).join('');
  const edu = d.education.map(e => `<div class="ed18"><span class="tag">${esc(yr(e.end) || yr(e.start))}</span><b>${esc(e.degree)}</b><small>${esc(place(e))}</small></div>`).join('');
  const refs = d.refs.map(r => `<div class="rf"><b>${esc(r.name)}</b><small>${esc(r.role)}</small><small>${esc(r.contact)}</small></div>`).join('');
  return `<div class="t t18">
  <div class="b18-head"><h1 style="font-size:${sz}em">${esc(n)}</h1><div class="ttl">${esc(d.title)}</div>${tgH(d)}</div>
  <div class="b18-ct"><h4>CONTACTS</h4>${ctSq(d, 'b18cl', 4)}</div>
  <div class="b18-soc">${socBar(d)}</div>
  <div class="b18-main">
    ${sec('', 'About Me', pH(d.summary))}
    ${sec('', 'Employment History', emp ? `<div class="tl18">${emp}</div>` : '')}
    ${xs(d, 'projects', 'xs')}
    ${hob.length ? `<div class="b18-hob"><h3><span>Hobbies</span></h3><div>${hob.map(h => `<div><span class="bubble">${ic('heart')}</span>${esc(h)}</div>`).join('')}</div></div>` : ''}
  </div>
  <div class="b18-side">
    ${sec('', 'Education', edu)}
    ${sec('', 'Skills', bars(d.skills.slice(0, 6), 'b18bars'))}
    ${sec('', 'References', refs)}
    ${xs(d, 'certs', 'xs')}${xs(d, 'awards', 'xs')}
  </div><div class="b18-bar"></div></div>`;
};

/* ---------- 19 · Navy Orange ---------- */
T.t19 = d => {
  const n = nameParts(d), sz = nameSize(longest(n.first, n.last), 3.3);
  const exp = d.experience.map(e => `<div class="x19"><div class="h"><b>${esc(e.role)}</b><span>${esc(range(e))}</span></div><i>${esc([e.company, e.location].filter(Boolean).join(' / '))}</i>${bul(e, 3)}</div>`).join('');
  const edu = d.education.slice(0, 3);
  const aw = awH(d);
  return `<div class="t t19">
  <div class="b19-side">
    ${sec('', 'Profile', dl(d, 'b19dl'))}
    ${sec('', 'Expertise', bars(d.skills.slice(0, 7), 'b19bars'))}
    ${aw ? sec('', 'Awards', aw) : ''}
    ${sec('', 'Reference', refsH(d))}
    ${contactList(d).length ? `<div class="b19-ct"><h3>Contact</h3>${ctPlain(d, 'b19cl')}</div>` : ''}
  </div>
  <div class="b19-main">
    <h1 style="font-size:${sz}em"><span>${esc(n.first)}</span><b>${esc(n.last)}</b></h1><div class="ttl">${esc(d.title)}</div>
    <div class="soc">${socBar(d)}</div>
    ${d.tagline ? `<div class="banner">${esc(d.tagline)}</div>` : ''}
    ${d.summary ? `<p class="sum">${esc(d.summary)}</p>` : ''}
    ${sec('', 'Work Experience', exp ? `<div class="tl19">${exp}</div>` : '')}
    ${xs(d, 'projects', 'xs')}
    ${edu.length ? `<div class="b19-edu"><h3>Education</h3><div style="grid-template-columns:repeat(${edu.length},1fr)">${edu.map(e => `<div><b>${esc(e.degree)}</b><i>${esc(e.school)}</i><span>${esc(range(e))}</span></div>`).join('')}</div></div>` : ''}
  </div></div>`;
};

/* ---------- 20 · Grey Amber ---------- */
T.t20 = d => {
  const n = nameParts(d), sz = nameSize(longest(n.first, n.last), 2.6);
  const exp = d.experience.map(e => `<div class="x20"><div class="h"><b>${esc(e.role)}</b><span>${esc(range(e))}</span></div><i>${esc([e.company, e.location].filter(Boolean).join(' / '))}</i>${bul(e, 3)}</div>`).join('');
  const edu = d.education.slice(0, 3);
  const aw = awH(d);
  const refs = d.refs.slice(0, 3);
  return `<div class="t t20">
  <div class="b20-l">
    <div class="b20-name"><span>${esc(n.first)}</span><b style="font-size:${sz}em">${esc(n.last)}</b><small>${esc(d.title)}</small></div>
    ${sec('', 'Profile', dl(d, 'b20dl'))}
    ${sec('', 'Contact', ctSq(d, 'b20ct'))}
    ${sec('', 'Skills', bl(d.skills.map(s => s.name).slice(0, 9)))}
    ${aw ? `<div class="b20-aw">${sec('', 'Awards', aw)}</div>` : ''}
  </div>
  <div class="b20-r">${hr2([
    sec('', 'About Me', pH(d.summary)),
    sec('', 'Work Experience', exp ? `<div class="tl20">${exp}</div>` : ''),
    edu.length ? `<section><h3>Education</h3><div class="b20-edu" style="grid-template-columns:repeat(${edu.length},1fr)">${edu.map(e => `<div><b>${esc(e.degree)}</b><i>${esc(e.school)}</i><span>${esc(range(e))}</span></div>`).join('')}</div></section>` : '',
    refs.length ? `<section><h3>Reference</h3><div class="b20-ref" style="grid-template-columns:repeat(${refs.length},1fr)">${refs.map(r => `<div><b>${esc(r.name)}</b><i>${esc(r.role)}</i><span>${esc(r.contact)}</span></div>`).join('')}</div></section>` : ''
  ])}</div></div>`;
};

/* ---------- 21 · Elegant Grey ---------- */
T.t21 = d => {
  const n = nameParts(d), sz = nameSize(longest(n.first, n.last), 2.2);
  const tli = (e, a, b, c) => `<div class="i21"><span class="yr">${esc(a)}</span><div><b>${esc(b)}</b><div>${esc(c)}</div>${e}</div></div>`;
  const exp = d.experience.map(e => tli(bul(e, 2), range(e), e.role, [e.company, e.location].filter(Boolean).join(' · '))).join('');
  const edu = d.education.map(e => tli(e.details ? pH(e.details) : '', range(e), e.degree, place(e))).join('');
  const fol = contacts(d).filter(c => SOCIAL.includes(c.k) && c.k !== 'website');
  return `<div class="t t21">
  <div class="b21-l">
    <h1 style="font-size:${sz}em"><span>${esc(n.first)}</span><span>${esc(n.last)}</span></h1><div class="ttl">${esc(d.title)}</div>
    ${sec('', 'Contact', ctPlain(d, 'b21ct'))}
    ${sec('', 'Expertise', bl(d.skills.map(s => s.name).slice(0, 10)))}
    ${awc(d).length ? sec('', 'Award', awH(d)) : ''}
    ${fol.length ? sec('', 'Follow Me', fol.map(c => `<div class="fm"><b>${esc(c.l.replace(':', ''))}</b><span>${esc(c.r)}</span></div>`).join('')) : ''}
  </div>
  <div class="b21-r">
    ${d.summary ? `<section><h3>Statement</h3><p class="q">${esc(d.summary)}</p></section>` : ''}
    ${sec('', 'Work Experience', exp ? `<div class="tl21">${exp}</div>` : '')}
    ${sec('', 'Education', edu ? `<div class="tl21">${edu}</div>` : '')}
    ${xs(d, 'projects', 'xs')}${xs(d, 'refs', 'xs')}
  </div></div>`;
};

/* ---------- 22 · Black Tab ---------- */
T.t22 = d => {
  const n = nameParts(d), sz = nameSize(longest(n.first, n.last), 4.4);
  const exp = d.experience.map(e => `<div class="x22"><div class="r1"><b>${esc(e.role)}</b><span><em>${esc(range(e))}</em><i>${esc([e.company, e.location].filter(Boolean).join(' / '))}</i></span></div>${bul(e, 3)}</div>`).join('');
  const edu = d.education.map(e => `<div class="ed"><b>${esc(e.degree)}</b><i>${esc(place(e))}</i><span>${esc(range(e))}</span></div>`).join('');
  const get = k => (contacts(d).find(c => c.k === k) || {}).r || '';
  const lk = socialLinks(d);
  return `<div class="t t22">
  <div class="b22-name"><div style="font-size:${sz}em"><span>${esc(n.first)}</span><span>${esc(n.last)}</span></div><small>${esc(d.title)}</small></div>
  <div class="b22-box">${ic('pin')}${ic('phone')}${ic('mail')}</div>
  <div class="b22-adr">${get('location') ? `<h5>ADDRESS</h5><p>${esc(get('location'))}</p>` : ''}${get('phone') ? `<h5>PHONE</h5><p>${esc(get('phone'))}</p>` : ''}${get('email') ? `<h5>E-MAIL</h5><p>${esc(get('email'))}</p>` : ''}</div>
  <i class="b22-vl"></i>
  <div class="b22-l">${hr2([sec('', 'Profile', pH(d.summary)), sec('', 'Experience', exp), xs(d, 'projects', 'xs')])}</div>
  <div class="b22-r">${hr2([sec('', 'Education', edu), sec('', 'Expertise', bl(d.skills.map(s => s.name).slice(0, 8))), sec('', 'References', refsH(d)), awc(d).length ? sec('', 'Awards', awH(d)) : ''])}</div>
  ${lk.length ? `<div class="b22-foot">${lk.map(x => `<span>${x}</span>`).join('')}</div>` : ''}
  </div>`;
};

/* ---------- 23 · Spaced Line ---------- */
T.t23 = d => {
  const n = nameParts(d), ls = Math.max(.12, Math.min(.5, 3.2 / Math.max(n.first.length, n.last.length)));
  const exp = d.experience.map(e => `<div class="x23"><b>${esc(e.company || e.role)}</b><small>${esc([e.role, range(e)].filter(Boolean).join('  |  '))}</small>${bul(e, 3)}</div>`).join('');
  const edu = d.education.map(e => `<div class="ed23"><b>${esc(e.degree)}</b><span>${esc([e.school, range(e)].filter(Boolean).join('  |  '))}</span><span>${esc(e.details || e.location)}</span></div>`).join('');
  const get = k => (contacts(d).find(c => c.k === k) || {}).r || '';
  return `<div class="t t23"><i class="b23-vl"></i>
  <div class="b23-name"><span class="f" style="letter-spacing:${(ls * 1.3).toFixed(2)}em">${esc(n.first)}</span><span class="l" style="letter-spacing:${ls.toFixed(2)}em">${esc(n.last)}</span></div>
  <div class="b23-bar"><i></i><b>${esc(d.title)}</b></div>
  <div class="b23-ct"><div class="tab">${ic('mail')}${ic('phone')}${ic('pin')}</div><p>${esc(get('email'))}</p><p>${esc(get('phone'))}</p><p>${esc(get('location'))}</p></div>
  <i class="b23-blk"></i>
  <div class="b23-l">${sec('', 'Profile', pH(d.summary))}${sec('', 'Experience', exp ? `<div class="tl23">${exp}</div>` : '')}${xs(d, 'projects', 'xs')}</div>
  <div class="b23-r">${sec('', 'Skills', d.skills.length ? `<h6>PROFESSIONAL</h6>` + bl(d.skills.map(s => s.name).slice(0, 8)) : '')}${sec('', 'Education', edu ? `<div class="tl23b">${edu}</div>` : '')}${xs(d, 'certs', 'xs')}${xs(d, 'awards', 'xs')}</div>
  </div>`;
};

/* ---------- 24 · Blue Icons ---------- */
T.t24 = d => {
  const exp = d.experience.map(e => `<div class="x24"><div class="h"><b>${esc(e.role)}</b><span>${esc(range(e))}</span></div><div class="c">${esc([e.company, e.location].filter(Boolean).join(' | '))}</div>${bul(e, 3)}</div>`).join('');
  const edu = d.education.map(e => `<div class="ed24"><b>${esc(e.degree)}</b><span>${esc(e.school)}</span><span>${esc(range(e))}</span></div>`).join('');
  const nsz = Math.max(1.6, Math.min(3.1, 40 / nm(d).length)).toFixed(2);
  return `<div class="t t24">
  <div class="b24-head">${d.tagline ? `<div class="tg2">${esc(d.tagline)}</div>` : ''}<h1 style="font-size:${nsz}em">${esc(nm(d))}</h1><div class="ttl">${esc(d.title)}</div><i></i></div>
  <div class="b24-l">${sec('', 'Contact', ctPlain(d, 'b24ct'), 'user')}${sec('', 'Skills', bl(d.skills.map(s => s.name).slice(0, 8)), 'star')}${sec('', 'Education', edu, 'cap')}${xs(d, 'certs', 'xs')}</div>
  <i class="b24-vl"></i>
  <div class="b24-r">${sec('', 'Professional Summary', pH(d.summary), 'user')}${sec('', 'Experience', exp, 'briefcase')}${xs(d, 'projects', 'xs')}${xs(d, 'awards', 'xs')}</div>
  <i class="b24-bl"></i></div>`;
};

/* ---------- 25 · Monogram ---------- */
T.t25 = d => {
  const sz = Math.max(1.8, Math.min(3.1, 38 / nm(d).length)).toFixed(2);
  const tl = (arr, a, b, c, p) => arr.length ? `<div class="tl25">${arr.map(e => `<div class="i25"><div class="h"><b>${esc(a(e))}</b></div><div class="s"><span>${esc(b(e))}</span><em>${esc(c(e))}</em></div>${p(e)}</div>`).join('')}</div>` : '';
  return `<div class="t t25">
  <div class="b25-mono">${esc(initials(d))}</div>
  <div class="b25-ring"></div><i class="sp s1">✦</i><i class="sp s2">✦</i><div class="b25-photo">${photo(d)}</div>
  <div class="b25-name"><h1 style="font-size:${sz}em">${esc(nm(d))}</h1><div class="ttl">${esc(d.title)}</div></div>
  <div class="b25-l">${sec('', 'Contact', ctPlain(d, 'b25ct'))}${sec('', 'About Me', pH(d.summary))}${sec('', 'Skills', bl(d.skills.map(s => s.name).slice(0, 8)))}${sec('', 'Language', bl(d.languages.map(l => l.name)))}</div>
  <div class="b25-r">
    ${sec('', 'Education', tl(d.education, e => e.degree, e => e.school, e => range(e), e => e.details ? pH(e.details) : ''))}
    ${sec('', 'Experience', tl(d.experience, e => e.role, e => e.company, e => range(e), e => bul(e, 2)))}
    ${d.refs.length ? sec('', 'References', `<div class="b25-ref">${d.refs.slice(0, 4).map(r => `<div><b>${esc(r.name)}</b><span>${esc(r.role)}</span><small>${esc(r.contact)}</small></div>`).join('')}</div>`) : ''}
    ${xs(d, 'certs', 'xs')}${xs(d, 'awards', 'xs')}
  </div></div>`;
};

/* ---------- 26 · Cocoa Blocks ---------- */
T.t26 = d => {
  const n = nameParts(d), sz = nameSize(longest(n.first, n.last), 3.6);
  const edu = d.education.map(e => `<div class="ed26"><span>${esc(range(e))} | ${esc(e.school)}</span><b>${esc(e.degree)}</b></div>`).join('');
  const exp = d.experience.map(e => `<div class="x26"><span>${esc(range(e))} | <b>${esc(e.company || e.role)}</b></span>${e.company ? `<i>${esc(e.role)}</i>` : ''}${bul(e, 3)}</div>`).join('');
  const sk = d.skills.slice(0, 3).map(s => `<div>${donut(s.level, s.level + '%')}<small>${esc(s.name)}</small></div>`).join('');
  const hob = split(d.interests).slice(0, 4);
  const ct = contactList(d).slice(0, 3);
  return `<div class="t t26">
  <div class="b26-name"><h1 style="font-size:${sz}em"><span>${esc(n.first)}</span><span>${esc(n.last)}</span></h1><em>${esc(d.title)}</em></div>
  <div class="b26-tab"></div>
  <ul class="b26-ct">${ct.map(([i, v]) => `<li><span>${ic(i)}</span><b>${esc(v)}</b></li>`).join('')}</ul>
  <div class="b26-band"><h3>PROFIL</h3>${pH(d.summary)}</div>
  <div class="b26-photo">${photo(d)}</div>
  <div class="b26-brk"></div><i class="b26-strip"></i>
  <div class="b26-l">${sec('', 'Education', edu)}${sec('', 'Skills', sk ? `<div class="b26-dn">${sk}</div>` : '')}${hob.length ? sec('', 'Interests', `<div class="b26-hb">${hob.map(h => `<div>${ic('heart')}<span>${esc(h)}</span></div>`).join('')}</div>`) : ''}</div>
  <div class="b26-r">${sec('', 'Work Experience', exp)}${xs(d, 'projects', 'xs')}</div>
  </div>`;
};

/* ---------- 27 · Cocoa Split ---------- */
T.t27 = d => {
  const n = nameParts(d), sz = nameSize(n.first + n.last, 3.1);
  const exp = d.experience.map(e => `<div class="x27"><b>${esc((e.company || e.role).toUpperCase())} | ${esc(range(e))}</b>${e.company ? `<i>${esc(e.role)}</i>` : ''}${bul(e, 4)}</div>`).join('');
  const edu = d.education.map(e => `<div class="ed27"><b>${esc(e.school || e.degree)}</b><ul><li>${esc(e.degree)}</li>${e.grade ? `<li>Grade: ${esc(e.grade)}</li>` : ''}${range(e) ? `<li>${esc(range(e))}</li>` : ''}</ul></div>`).join('') + (d.certs.length ? `<div class="ed27"><b>Certifications</b><ul>${d.certs.map(c => `<li>${esc(c.name)}</li>`).join('')}</ul></div>` : '');
  return `<div class="t t27">
  <i class="b27-t1"></i><i class="b27-t2"></i><div class="b27-photo">${photo(d)}</div>
  <div class="b27-hd"><h1 style="font-size:${sz}em"><span>${esc(n.first)}</span> <b>${esc(n.last)}</b></h1><div class="ttl">${esc(d.title)}</div></div>
  <div class="b27-l">${sec('', 'About Me', pH(d.summary))}${sec('', 'Contact', ctPlain(d, 'b27ct'))}${sec('', 'Education', edu)}</div>
  <div class="b27-r">${sec('', 'Personal Data', dl(d, 'b27dl'))}${sec('', 'Experience', exp)}${sec('', 'Skills', bars(d.skills.slice(0, 7), 'b27bars'))}${xs(d, 'awards', 'xs')}${xs(d, 'projects', 'xs')}${xs(d, 'refs', 'xs')}</div>
  <i class="b27-strip"></i></div>`;
};


/* =====================================================
   Rendering
   ===================================================== */
const themeVars = () => `--dark:${S.theme.dark};--acc:${S.theme.acc};--fs:${S.fs}`;
let saveT, thumbT;

/* Shrink the big title of style 9 until it fits its box, whatever font is in use */
function fitText() {
  $$('.b9-title').forEach(t => {
    let fs = parseFloat(t.style.fontSize) || 5, n = 0;
    while (n++ < 16 && $$('span', t).some(s => s.scrollWidth > s.clientWidth + 1)) { fs *= .93; t.style.fontSize = fs.toFixed(2) + 'em'; }
  });
}

/* =====================================================
   Resize & align: photo, job title, and name only
   ===================================================== */
const FMT_ITEMS = [
  ['name', 'Name'],
  ['title', 'Job title'],
  ['photo', 'Photo', true]
];
const AL_ICON = {
  left: 'M3 5h14M3 9h9M3 13h14M3 17h9',
  center: 'M3 5h14M6 9h8M3 13h14M6 17h8',
  right: 'M3 5h14M8 9h9M3 13h14M8 17h9',
  justify: 'M3 5h14M3 9h14M3 13h14M3 17h14'
};

function applyFmt() {
  const root = $('#resume'), F = S.fmt || {};
  const scaleFont = (el, f) => {
    if (!el || !f || !f.s || f.s === 100) return;
    el.style.fontSize = (parseFloat(getComputedStyle(el).fontSize) * f.s / 100) + 'px';
  };
  const align = (el, f) => {
    if (!el || !f || !f.a) return;
    el.style.textAlign = f.a;
    el.dataset.al = f.a;
    const cs = getComputedStyle(el);
    if (cs.display === 'flex' || cs.display === 'inline-flex') {
      el.style.justifyContent = f.a === 'center' ? 'center' : f.a === 'right' ? 'flex-end' : 'flex-start';
    }
  };

  const nameEl = root.querySelector('h1,.fn,[class*="-name"],.b9-ab h2');
  const titleEl = root.querySelector('.ttl,[class*="-ttl"],.b9-t,.b12-t,.pill,.b8-title,.b9-title');
  scaleFont(nameEl, F.name);
  align(nameEl, F.name);
  scaleFont(titleEl, F.title);
  align(titleEl, F.title);

  const ph = root.querySelector('img[alt="Profile photo"],.ph');
  if (ph && F.photo && F.photo.s && F.photo.s !== 100) {
    const box = ph.parentElement;
    box.style.scale = F.photo.s / 100;
  }
}

function fmtRow(k, label, noAlign) {
  const f = (S.fmt || {})[k] || {};
  return `<div class="fmt" data-fk="${k}"><span class="fl">${label}</span>
    <div class="fr1"><input type="range" min="60" max="150" step="5" value="${f.s || 100}" aria-label="${label} size"><span class="fv">${f.s || 100}%</span>
    ${noAlign ? '' : `<span class="fa">${Object.keys(AL_ICON).map(al => `<button type="button" data-al="${al}" class="${f.a === al ? 'on' : ''}" title="Align ${al}"><svg viewBox="0 0 20 20" width="14" height="14"><path d="${AL_ICON[al]}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg></button>`).join('')}</span>`}
    <button type="button" class="frs" title="Reset ${label}">Reset</button></div></div>`;
}

function initFmt() {
  const firstCard = $('#formPane details.card');
  if (!firstCard) return;
  const box = firstCard.querySelector('summary').nextElementSibling;
  if (!box) return;
  box.insertAdjacentHTML('afterbegin', `<div class="fmt-wrap">${FMT_ITEMS.map(([k, lbl, noAlign]) => fmtRow(k, lbl, noAlign)).join('')}</div>`);
}

function fmtSet(k, patch) {
  S.fmt = S.fmt || {};
  const f = S.fmt[k] = { ...(S.fmt[k] || {}), ...patch };
  if (k === 'photo') delete f.a;
  if ((!f.s || f.s === 100) && !f.a) delete S.fmt[k];
  commit();
}

document.addEventListener('input', e => {
  const row = e.target.closest && e.target.closest('.fmt');
  if (!row || e.target.type !== 'range') return;
  row.querySelector('.fv').textContent = e.target.value + '%';
  fmtSet(row.dataset.fk, { s: +e.target.value });
});

document.addEventListener('click', e => {
  const b = e.target.closest && e.target.closest('.fmt button');
  if (!b) return;
  const row = b.closest('.fmt'), k = row.dataset.fk;
  if (b.classList.contains('frs')) {
    delete S.fmt[k];
    row.querySelector('input').value = 100;
    row.querySelector('.fv').textContent = '100%';
    row.querySelectorAll('.fa button').forEach(x => x.classList.remove('on'));
    commit();
  } else {
    const on = b.classList.contains('on');
    row.querySelectorAll('.fa button').forEach(x => x.classList.remove('on'));
    if (!on) b.classList.add('on');
    fmtSet(k, { a: on ? '' : b.dataset.al });
  }
});

function renderPreview() {
  const el = $('#resume');
  el.setAttribute('style', themeVars());
  el.innerHTML = (T[S.tpl] || T.t1)(view(S.data));
  fitText();
  applyFmt();
  fit();
  checkFit();
}
function renderThumbs() {
  const v = view(S.data);
  $('#tplList').innerHTML = TEMPLATES.map(([id, name]) =>
    `<button class="tcard ${id === S.tpl ? 'on' : ''}" data-t="${id}"><div class="tpv"><div class="page" style="${themeVars()}">${T[id](v)}</div></div><span>${name}</span></button>`).join('');
  const t = TEMPLATES.find(x => x[0] === S.tpl);
  $('#tplHint').textContent = t ? t[2] : '';
  fitText();
}
function fit() {
  const pane = $('#previewPane');
  const s = Math.min(1, (pane.clientWidth - 32) / 794);
  $('#holder').style.transform = `scale(${s})`;
  $('#scaleBox').style.width = 794 * s + 'px';
  $('#scaleBox').style.height = 1123 * s + 'px';
}
/* Warn when text runs off the bottom of the page */
function checkFit() {
  const page = $('#resume'), pr = page.getBoundingClientRect();
  if (!pr.height) return;
  const s = pr.height / 1123;
  let limit = pr.bottom;
  const foot = $('.t2-foot', page);
  if (foot) limit = foot.getBoundingClientRect().top;
  let over = false;
  $$('li,p,.item,small,h1,h3,h4,.ttl', page).forEach(el => {
    if (el.closest('.t2-foot') || el.closest('.t6-prof')) return;
    const r = el.getBoundingClientRect();
    if (r.height && r.bottom > limit + 2 * s) over = true;
  });
  $('#fitWarn').classList.toggle('hidden', !over);
}
function commit(full) {
  renderPreview();
  clearTimeout(thumbT); thumbT = setTimeout(renderThumbs, 250);
  clearTimeout(saveT);
  saveT = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage full */ } }, 300);
  if (full) renderLists();
}

/* ---------- Form lists ---------- */
const attr = (l, i, f) => `data-l="${l}" data-i="${i}" data-f="${f}"`;
const field = (l, i, [f, label, ph, span, kind], v) => `<div class="${span === 2 ? 'col-span-2' : ''}"><label class="lbl">${label}</label>${kind === 'area'
  ? `<textarea class="inp" rows="3" ${attr(l, i, f)} placeholder="${esc(ph)}">${esc(v)}</textarea>`
  : `<input class="inp" ${attr(l, i, f)} placeholder="${esc(ph)}" value="${esc(v)}">`}</div>`;
const tools = (l, i, n) => `<span class="li-t"><button class="mv" data-act="up" data-l="${l}" data-i="${i}" ${i === 0 ? 'disabled' : ''} title="Move up">↑</button><button class="mv" data-act="down" data-l="${l}" data-i="${i}" ${i === n - 1 ? 'disabled' : ''} title="Move down">↓</button><button class="lnk red" data-act="rm" data-l="${l}" data-i="${i}">Remove</button></span>`;
const listItem = (l, it, i, n) => `<div class="li"><div class="li-h"><b>${LISTS[l].one} ${i + 1}</b>${tools(l, i, n)}</div><div class="grid grid-cols-2 gap-2">${LISTS[l].fields.map(f => field(l, i, f, it[f[0]])).join('')}</div></div>`;
const skRow = (s, i, n) => `<div class="sk-row"><input class="inp" ${attr('skills', i, 'name')} placeholder="Skill name" value="${esc(s.name)}">
  <input type="range" min="10" max="100" step="5" ${attr('skills', i, 'level')} value="${s.level}"><span class="val">${s.level}%</span>${tools('skills', i, n)}</div>`;
const LV = [[100, 'Native'], [90, 'Fluent'], [80, 'Advanced'], [60, 'Intermediate'], [40, 'Basic']];
const lgRow = (s, i, n) => `<div class="lg-row"><input class="inp" ${attr('languages', i, 'name')} placeholder="Language" value="${esc(s.name)}">
  <select class="inp" ${attr('languages', i, 'level')}>${LV.map(([v, nm]) => `<option value="${v}" ${+s.level === v ? 'selected' : ''}>${nm}</option>`).join('')}</select>${tools('languages', i, n)}</div>`;

function renderLists() {
  $$('[data-list]').forEach(box => {
    const l = box.dataset.list, arr = S.data[l];
    box.innerHTML = arr.map((it, i) => l === 'skills' ? skRow(it, i, arr.length) : l === 'languages' ? lgRow(it, i, arr.length) : listItem(l, it, i, arr.length)).join('');
  });
}
function renderFields() {
  $$('[data-k]').forEach(el => { el.value = S.data[el.dataset.k] || ''; });
  $('#hideList').innerHTML = HIDE_OPTS.map(([k, n]) => `<label class="chk"><input type="checkbox" data-hide="${k}" ${S.data.hide[k] ? '' : 'checked'}> ${n}</label>`).join('');
  updatePhotoUI();
}
function updatePhotoUI() {
  $('#photoPrev').innerHTML = S.data.photo ? `<img src="${S.data.photo}" class="w-full h-full object-cover" alt="">` : 'No photo';
}
function renderTheme() {
  $('#swatches').innerHTML = THEMES.map((t, i) => `<button class="sw ${t.dark === S.theme.dark && t.acc === S.theme.acc ? 'on' : ''}" data-th="${i}" title="${t.n}" style="background:linear-gradient(135deg,${t.dark} 50%,${t.acc} 50%)"></button>`).join('');
  $('#cDark').value = S.theme.dark; $('#cAcc').value = S.theme.acc; $('#fsRange').value = S.fs;
}

/* ---------- Events ---------- */
document.addEventListener('input', e => {
  const t = e.target;
  if (t.dataset.k) { S.data[t.dataset.k] = t.value; commit(); }
  else if (t.dataset.l) {
    const it = S.data[t.dataset.l][+t.dataset.i]; if (!it) return;
    it[t.dataset.f] = t.dataset.f === 'level' ? +t.value : t.value;
    if (t.type === 'range') t.nextElementSibling.textContent = t.value + '%';
    commit();
  }
});
document.addEventListener('change', e => {
  const h = e.target.dataset.hide;
  if (h) { S.data.hide[h] = !e.target.checked; commit(); renderThumbs(); }
});

document.addEventListener('click', e => {
  if (!e.target.closest('#dlMenu') && !e.target.closest('#btnDl')) $('#dlMenu').classList.add('hidden');
  const th = e.target.closest('[data-th]');
  if (th) { const t = THEMES[+th.dataset.th]; S.theme = { dark: t.dark, acc: t.acc }; renderTheme(); commit(); return; }
  const tc = e.target.closest('[data-t]');
  if (tc) { S.tpl = tc.dataset.t; commit(); renderThumbs(); return; }
  const b = e.target.closest('[data-act]'); if (!b) return;
  const { act, l } = b.dataset, i = +b.dataset.i, arr = S.data[l];
  if (act === 'add') arr.push(NEW[l]());
  if (act === 'rm') arr.splice(i, 1);
  if (act === 'up' && i > 0) [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
  if (act === 'down' && i < arr.length - 1) [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
  commit(true);
});

$('#cDark').addEventListener('input', e => { S.theme.dark = e.target.value; $$('.sw').forEach(s => s.classList.remove('on')); commit(); });
$('#cAcc').addEventListener('input', e => { S.theme.acc = e.target.value; $$('.sw').forEach(s => s.classList.remove('on')); commit(); });
$('#fsRange').addEventListener('input', e => { S.fs = +e.target.value; commit(); });
$('#btnSample').onclick = () => { if (confirm('Replace your current details with the sample resume?')) { S.data = structuredClone(SAMPLE); renderFields(); commit(true); renderThumbs(); } };
$('#btnClear').onclick = () => { if (confirm('Clear all details?')) { S.data = structuredClone(BLANK); renderFields(); commit(true); renderThumbs(); } };

/* Photo upload (resized to keep storage small) */
$('#photoIn').addEventListener('change', e => {
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    const img = new Image();
    img.onload = () => {
      const s = Math.min(1, 700 / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      S.data.photo = c.toDataURL('image/jpeg', .88);
      updatePhotoUI(); commit(); renderThumbs();
    };
    img.src = r.result;
  };
  r.readAsDataURL(f);
  e.target.value = '';
});
$('#photoRm').onclick = () => { S.data.photo = ''; updatePhotoUI(); commit(); renderThumbs(); };

/* =====================================================
   Download: PDF, PNG, JPG (+ print for selectable-text PDF)
   ===================================================== */
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 3200); }
function saveUrl(url, filename) { const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); }
const fileBase = () => ((S.data.name || 'resume').trim().replace(/[^\w\-]+/g, '_').replace(/^_+|_+$/g, '') || 'resume') + '_resume';

/* Embed the Google Fonts into exports (html-to-image cannot read cross-origin stylesheets, so text fell back to default fonts) */
const FONT_CSS_URL = (document.querySelector('link[href*="fonts.googleapis.com/css"]') || {}).href;
let fontEmbedCache = null;
async function buildFontCSS() {
  if (fontEmbedCache !== null) return fontEmbedCache;
  let out = '';
  try {
    const css = await (await fetch(FONT_CSS_URL)).text();
    const urls = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map(m => m[1]))];
    const map = {};
    await Promise.all(urls.map(async u => {
      try {
        const b = await (await fetch(u)).blob();
        map[u] = await new Promise(r => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(b); });
      } catch (e) {}
    }));
    out = css.replace(/url\((https:[^)]+)\)/g, (m, u) => map[u] ? `url(${map[u]})` : m);
  } catch (e) { out = ''; }
  fontEmbedCache = out;
  return out;
}

async function exportAs(type) {
  if (type === 'print') { window.print(); return; }
  if (!window.htmlToImage || (type === 'pdf' && !(window.jspdf && window.jspdf.jsPDF))) { toast('Export tools did not load – check your internet connection'); return; }
  const node = $('#resume'), holder = $('#holder'), prev = holder.style.transform;
  const ratio = +$('#qual').value || 3;
  const base = { width: 794, height: 1123, backgroundColor: '#ffffff', cacheBust: true, style: { transform: 'none' } };
  base.fontEmbedCSS = await buildFontCSS();
  toast('Preparing your ' + type.toUpperCase() + '…');
  holder.style.transform = 'none';
  try {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    fitText();
    await htmlToImage.toPng(node, { ...base, pixelRatio: 1 });
    if (type === 'png') {
      saveUrl(await htmlToImage.toPng(node, { ...base, pixelRatio: ratio }), fileBase() + '.png');
    } else {
      const jpg = await htmlToImage.toJpeg(node, { ...base, pixelRatio: ratio, quality: .95 });
      if (type === 'jpg') saveUrl(jpg, fileBase() + '.jpg');
      else {
        const pdf = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
        pdf.addImage(jpg, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
        pdf.save(fileBase() + '.pdf');
      }
    }
    toast('Download started');
  } catch (err) {
    console.error(err);
    toast('Export failed – try "PDF with selectable text" instead');
  } finally {
    holder.style.transform = prev;
    fit();
  }
}
$('#btnDl').onclick = () => $('#dlMenu').classList.toggle('hidden');
$('#dlMenu').addEventListener('click', e => {
  const b = e.target.closest('[data-dl]'); if (!b) return;
  $('#dlMenu').classList.add('hidden');
  exportAs(b.dataset.dl);
});

/* ---------- Init ---------- */
window.addEventListener('resize', () => { fit(); checkFit(); });
initFmt(); renderFields(); renderLists(); renderTheme(); renderPreview(); renderThumbs();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { renderPreview(); renderThumbs(); });