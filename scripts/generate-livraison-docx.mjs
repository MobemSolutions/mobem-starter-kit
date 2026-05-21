#!/usr/bin/env node
/**
 * Générateur de document de livraison Mobem Solutions (.docx)
 * Basé sur le skill officiel Anthropic DOCX — docx v9
 * Usage : pnpm livraison
 */
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, PageBreak, LevelFormat,
  TabStopType,
} from 'docx'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root      = join(__dirname, '..')
const docsDir   = join(root, 'docs')

// ─── Config ───────────────────────────────────────────────────────────────────
const cfgPath = join(docsDir, 'delivery', 'livraison-config.json')
if (!existsSync(cfgPath)) {
  console.error('❌  docs/delivery/livraison-config.json introuvable.')
  process.exit(1)
}
const cfg = JSON.parse(readFileSync(cfgPath, 'utf-8'))
if (!cfg.date_livraison) {
  cfg.date_livraison = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
}

const sc  = cfg.scores ?? {}
const stk = cfg.stack  ?? {}

// ─── Dimensions A4 (1440 DXA = 1 pouce) ─────────────────────────────────────
// Largeur A4 : 11906 DXA — marges 1440 chaque côté → contenu = 9026 DXA
const CW = 9026

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  black:   '111111',
  red:     'CC3222',
  gray:    '333333',
  mid:     '777777',
  rule:    'DDDDDD',
  light:   'F7F7F7',
  green:   '2E7D32',
  greenBg: 'EBF5EB',
  amber:   'B45309',
  amberBg: 'FFFBEB',
}

// ─── Bordures ─────────────────────────────────────────────────────────────────
const b   = (c = C.rule, sz = 4) => ({ style: BorderStyle.SINGLE, size: sz, color: c })
const nb  = ()                    => ({ style: BorderStyle.NIL,    size: 0,  color: 'FFFFFF' })
const noB = () => ({ top: nb(), bottom: nb(), left: nb(), right: nb() })
const allB = (c = C.rule) => ({ top: b(c), bottom: b(c), left: b(c), right: b(c) })
const btmB = (c = C.rule) => ({ top: nb(), bottom: b(c), left: nb(), right: nb() })

// ─── Espacements ─────────────────────────────────────────────────────────────
const sp = (before, after) => ({ before, after })

// ─── TextRun de base ──────────────────────────────────────────────────────────
const run = (text, opts = {}) =>
  new TextRun({ text, font: 'Arial', size: 20, color: C.gray, ...opts })

// ─── Titre de section numérotée ──────────────────────────────────────────────
function h1(num, title) {
  return [
    new Paragraph({ spacing: sp(560, 0) }),
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: sp(0, 0),
      border: { bottom: b(C.red, 10) },
      children: [
        run(num, { size: 22, bold: true, color: C.red }),
        run('   ' + title.toUpperCase(), { size: 22, bold: true, color: C.black }),
      ],
    }),
    new Paragraph({ spacing: sp(180, 0) }),
  ]
}

// ─── Sous-titre ───────────────────────────────────────────────────────────────
function h2(text) {
  return [
    new Paragraph({ spacing: sp(300, 0) }),
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: sp(0, 80),
      children: [run(text.toUpperCase(), { size: 17, bold: true, color: C.mid })],
    }),
  ]
}

// ─── Paragraphe corps ─────────────────────────────────────────────────────────
function body(text, opts = {}) {
  return new Paragraph({ spacing: sp(60, 60), children: [run(text, opts)] })
}

// ─── Note (bordure gauche rouge) ─────────────────────────────────────────────
function note(text) {
  return new Paragraph({
    spacing: sp(120, 120),
    border: { left: b(C.red, 14) },
    indent: { left: 240 },
    children: [run(text, { size: 18, color: C.mid, italics: true })],
  })
}

// ─── Espaceur ─────────────────────────────────────────────────────────────────
const gap = (h = 160) => new Paragraph({ spacing: sp(h, 0) })

// ─── Saut de page ─────────────────────────────────────────────────────────────
const pb = () => new Paragraph({ children: [new PageBreak()] })

// ─── Éléments de liste ────────────────────────────────────────────────────────
const checkItem  = (text) => new Paragraph({ numbering: { reference: 'check',  level: 0 }, spacing: sp(40, 40), children: [run(text)] })
const bulletItem = (text, opts = {}) => new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: sp(40, 40), children: [run(text, opts)] })

// Étapes numérotées inline (pas de référence partagée → pas de continuité cross-section)
const stepItem = (n, text) => new Paragraph({
  spacing: sp(60, 60),
  indent: { left: 480, hanging: 380 },
  children: [
    run(`${n}.`, { size: 19, bold: true, color: C.red }),
    run(`  ${text}`, { size: 20, color: C.gray }),
  ],
})

// ─── Bloc code ────────────────────────────────────────────────────────────────
function code(text) {
  return new Paragraph({
    spacing: sp(40, 40),
    indent: { left: 200, right: 200 },
    shading: { fill: 'F0F0F0', type: ShadingType.CLEAR },
    children: [new TextRun({ text, font: 'Courier New', size: 18, color: C.black })],
  })
}

// ─── Ligne d'un tableau d'accès ──────────────────────────────────────────────
function accessRow(label, value) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 2600, type: WidthType.DXA },
        borders: btmB(),
        margins: { top: 100, bottom: 100, left: 0, right: 200 },
        children: [new Paragraph({ children: [run(label.toUpperCase(), { size: 16, bold: true, color: C.mid })] })],
      }),
      new TableCell({
        width: { size: 6426, type: WidthType.DXA },
        borders: btmB(),
        margins: { top: 100, bottom: 100, left: 0, right: 0 },
        children: [new Paragraph({ children: [run(value || '—', { size: 20, color: C.black })] })],
      }),
    ],
  })
}

// ─── Tableau d'accès ──────────────────────────────────────────────────────────
function accessTable(rows) {
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [2600, 6426],
    borders: noB(),
    rows: rows.map(([l, v]) => accessRow(l, v)),
  })
}

// ─── Cellule de score Lighthouse ─────────────────────────────────────────────
function scoreCell(value, label, width = 2256) {
  const num = parseInt(value) || 0
  const bg  = num >= 90 ? C.greenBg  : num >= 50 ? C.amberBg : 'FFEBEE'
  const tc  = num >= 90 ? C.green    : num >= 50 ? C.amber   : 'C62828'
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders: allB(C.rule),
    shading: { fill: bg, type: ShadingType.CLEAR },
    margins: { top: 200, bottom: 200, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: sp(0, 20),
        children: [run(`${value}`, { size: 64, bold: true, color: tc })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: sp(0, 40),
        children: [run('/ 100', { size: 16, color: C.mid })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: sp(0, 0),
        children: [run(label, { size: 16, bold: true, color: C.gray })] }),
    ],
  })
}

// ─── Ligne Core Web Vital ─────────────────────────────────────────────────────
function cwvRow(metric, value, threshold, description, isGood = true) {
  const tc = isGood ? C.green   : C.amber
  const bg = isGood ? C.greenBg : C.amberBg
  return new TableRow({
    children: [
      new TableCell({ width: { size: 3400, type: WidthType.DXA }, borders: btmB(),
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        children: [new Paragraph({ children: [run(metric, { size: 19, bold: true, color: C.black })] })],
      }),
      new TableCell({ width: { size: 1300, type: WidthType.DXA }, borders: btmB(),
        shading: { fill: bg, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ alignment: AlignmentType.CENTER,
          children: [run(value, { size: 20, bold: true, color: tc })] })],
      }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, borders: btmB(),
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ alignment: AlignmentType.CENTER,
          children: [run(threshold, { size: 18, color: C.mid })] })],
      }),
      new TableCell({ width: { size: 2826, type: WidthType.DXA }, borders: btmB(),
        margins: { top: 120, bottom: 120, left: 120, right: 120 },
        children: [new Paragraph({ children: [run(description, { size: 18, color: C.mid, italics: true })] })],
      }),
    ],
  })
}
// CWV column widths : 3400 + 1300 + 1500 + 2826 = 9026 ✓

// ─── En-tête de tableau ───────────────────────────────────────────────────────
function tableHeader(labels, widths) {
  return new TableRow({
    tableHeader: true,
    children: labels.map((label, i) => new TableCell({
      width: { size: widths[i], type: WidthType.DXA },
      borders: { top: nb(), bottom: b(C.gray, 6), left: nb(), right: nb() },
      shading: { fill: C.light, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({
        children: [run(label.toUpperCase(), { size: 15, bold: true, color: C.mid })],
      })],
    })),
  })
}

// ─── Ligne résultat CI ────────────────────────────────────────────────────────
function ciRow(check, passed, detail) {
  const ok  = passed !== false
  const tc  = ok ? C.green : C.amber
  const bg  = ok ? C.greenBg : C.amberBg
  const lbl = ok ? '✓ Réussi' : '✗ Échoué'
  return new TableRow({
    children: [
      new TableCell({ width: { size: 4200, type: WidthType.DXA }, borders: btmB(),
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [run(check, { color: C.black })] })],
      }),
      new TableCell({ width: { size: 1600, type: WidthType.DXA }, borders: btmB(),
        shading: { fill: bg, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ alignment: AlignmentType.CENTER,
          children: [run(lbl, { size: 19, bold: true, color: tc })] })],
      }),
      new TableCell({ width: { size: 3226, type: WidthType.DXA }, borders: btmB(),
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [run(detail, { size: 18, color: C.mid })] })],
      }),
    ],
  })
}
// CI column widths : 4200 + 1600 + 3226 = 9026 ✓

// ─── Ligne tableau post-lancement ─────────────────────────────────────────────
function actionRow(action, when) {
  return new TableRow({
    children: [
      new TableCell({ width: { size: 7200, type: WidthType.DXA }, borders: btmB(),
        margins: { top: 80, bottom: 80, left: 0, right: 120 },
        children: [new Paragraph({ children: [run(action)] })],
      }),
      new TableCell({ width: { size: 1826, type: WidthType.DXA }, borders: btmB(),
        margins: { top: 80, bottom: 80, left: 120, right: 0 },
        children: [new Paragraph({ alignment: AlignmentType.RIGHT,
          children: [run(when, { size: 18, bold: true, color: C.mid })] })],
      }),
    ],
  })
}
// Action column widths : 7200 + 1826 = 9026 ✓

// ─── Ligne tableau Lighthouse CI ─────────────────────────────────────────────
function lhRow(criterion, score) {
  const num = parseInt(score) || 0
  const ok  = num >= 90
  const tc  = ok ? C.green : C.amber
  const bg  = ok ? C.greenBg : C.amberBg
  return new TableRow({
    children: [
      new TableCell({ width: { size: 5826, type: WidthType.DXA }, borders: btmB(),
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [run(criterion, { color: C.black })] })],
      }),
      new TableCell({ width: { size: 1600, type: WidthType.DXA }, borders: btmB(),
        shading: { fill: bg, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ alignment: AlignmentType.CENTER,
          children: [run(`${score} / 100`, { size: 19, bold: true, color: tc })] })],
      }),
      new TableCell({ width: { size: 1600, type: WidthType.DXA }, borders: btmB(),
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ alignment: AlignmentType.CENTER,
          children: [run('≥ 90', { size: 18, color: C.mid })] })],
      }),
    ],
  })
}
// LH column widths : 5826 + 1600 + 1600 = 9026 ✓

// ─══════════════════════════════════════════════════════════════════════════════
// CONTENU DU DOCUMENT
// ═══════════════════════════════════════════════════════════════════════════════
const children = [

  // ── COUVERTURE ──────────────────────────────────────────────────────────────
  gap(520),
  new Paragraph({ spacing: sp(0, 40),
    children: [run('MOBEM SOLUTIONS', { size: 28, bold: true, color: C.black })] }),
  new Paragraph({ spacing: sp(0, 520), border: { bottom: b(C.red, 12) },
    children: [run('solutions digitales pour artisans & TPE', { size: 19, color: C.mid })] }),
  gap(280),
  new Paragraph({ spacing: sp(0, 20),
    children: [run('DOCUMENT DE LIVRAISON', { size: 17, bold: true, color: C.mid })] }),
  new Paragraph({ spacing: sp(0, 60),
    children: [run(cfg.client_nom ?? '', { size: 88, bold: true, color: C.black })] }),
  new Paragraph({ spacing: sp(0, 0),
    children: [run(cfg.client_url ?? '', { size: 22, color: C.mid })] }),
  gap(520),
  new Paragraph({ spacing: sp(0, 0), border: { top: b(C.rule, 4) }, children: [run('')] }),
  new Paragraph({ spacing: sp(100, 0),
    children: [
      run(`Livré le ${cfg.date_livraison}`, { size: 18, color: C.mid }),
      run(`   —   ${cfg.dev_nom ?? ''}  ·  ${cfg.dev_email ?? ''}`, { size: 18, color: C.mid }),
    ] }),

  pb(),

  // ── 01 CE QUI EST LIVRÉ ─────────────────────────────────────────────────────
  ...h1('01', 'Ce qui est livré'),
  ...(Array.isArray(cfg.fonctionnalites)
    ? cfg.fonctionnalites.map(f => checkItem(f))
    : [body('— liste à compléter dans livraison-config.json')]),

  // ── 02 PERFORMANCES ─────────────────────────────────────────────────────────
  ...h1('02', 'Performances mesurées'),
  body(
    `Votre site a été mesuré via Google PageSpeed Insights le ${cfg.date_livraison}, ` +
    `sur l’URL de production ${cfg.client_url ?? ''}. ` +
    `Google évalue chaque site sur 4 critères notés de 0 à 100.`
  ),
  gap(160),

  // Scores Lighthouse — 4 colonnes (4 × 2256 = 9024 ≈ 9026, on ajuste les deux derniers)
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [2256, 2256, 2257, 2257],
    rows: [new TableRow({ children: [
      scoreCell(sc.performance    ?? '—', 'Performance',       2256),
      scoreCell(sc.accessibilite  ?? '—', 'Accessibilité', 2256),
      scoreCell(sc.seo            ?? '—', 'SEO',               2257),
      scoreCell(sc.best_practices ?? '—', 'Bonnes pratiques',  2257),
    ]})],
  }),
  gap(80),
  note(
    'Un score ≥ 90 est la cible Google. ' +
    '100 en Accessibilité signifie que votre site est utilisable par les personnes ' +
    'en situation de handicap (lecteurs d’écran, navigation au clavier uniquement).'
  ),

  ...h2('Vitesse de chargement — Core Web Vitals'),
  body(
    'Les Core Web Vitals sont les 3 métriques officielles de Google pour l’expérience ' +
    'utilisateur. Elles ont un impact direct sur le classement dans les résultats de recherche.'
  ),
  gap(100),
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [3400, 1300, 1500, 2826],
    rows: [
      tableHeader(['Métrique', 'Valeur', 'Seuil Google', 'Ce que ça mesure'], [3400, 1300, 1500, 2826]),
      cwvRow('LCP — Affichage principal', sc.lcp ?? '—', '≤ 2,5 s',
        'Temps avant que le contenu principal soit visible', true),
      cwvRow('INP — Réactivité', sc.inp ?? '—', '≤ 200 ms',
        'Délai de réponse aux clics et interactions', true),
      cwvRow('CLS — Stabilité visuelle', sc.cls ?? '—', '≤ 0,10',
        'La page ne bouge pas pendant le chargement', true),
    ],
  }),
  gap(80),

  // ── 03 VOS ACCÈS ────────────────────────────────────────────────────────────
  ...h1('03', 'Vos accès'),

  ...h2('Hébergement'),
  accessTable([
    ['Plateforme',      cfg.hebergeur             ?? 'Vercel'],
    ['Dashboard',       cfg.hebergeur_dashboard   ?? 'vercel.com/dashboard'],
    ['Email du compte', cfg.client_email          ?? ''],
  ]),

  ...h2('Nom de domaine'),
  accessTable([
    ['Registrar',       cfg.registrar         ?? ''],
    ['Gestion',         cfg.registrar_url     ?? ''],
    ['Renouvellement',  cfg.date_renouvellement ?? ''],
  ]),

  ...h2('Statistiques — Plausible Analytics'),
  accessTable([
    ['Dashboard',       cfg.plausible_url ?? ''],
    ['Email du compte', cfg.client_email  ?? ''],
  ]),

  ...(cfg.sanity_url ? [
    ...h2('Contenu — Sanity Studio'),
    accessTable([
      ['Studio',         cfg.sanity_url],
      ['Email du compte', cfg.client_email ?? ''],
      ['Rôle',      'Éditeur — créer, modifier, publier'],
    ]),
  ] : []),

  // ── 04 VOS OUTILS ───────────────────────────────────────────────────────────
  ...h1('04', 'Vos outils au quotidien'),

  ...h2('Formulaire de contact'),
  body(
    `Chaque message soumis via votre site est transmis instantanément ` +
    `à ${cfg.client_email ?? 'votre adresse email'}. ` +
    `Le visiteur reçoit automatiquement un email de confirmation.`
  ),
  note(
    'Vérifiez votre dossier spam la première semaine — les envois depuis un nouveau ' +
    'domaine peuvent être temporairement filtrés par certaines messageries.'
  ),

  ...h2('Statistiques — Plausible Analytics'),
  body('Plausible est un outil d’analyse de trafic respectueux de la vie privée. Aucun cookie, aucun bandeau CNIL requis.'),
  gap(40),
  bulletItem('Visites, pages les plus consultées, durée des sessions'),
  bulletItem('Clics sur le téléphone, le formulaire et les liens'),
  bulletItem('Origine des visiteurs (moteurs de recherche, réseaux sociaux, accès direct)'),
  gap(40),
  body(`Accès : ${cfg.plausible_url ?? 'plausible.io'}`, { color: C.black }),

  ...(cfg.sanity_url ? [
    ...h2('Modifier votre contenu — Sanity Studio'),
    body('Pour mettre à jour votre galerie, vos services ou vos articles :'),
    gap(40),
    stepItem(1, `Se connecter sur ${cfg.sanity_url}`),
    stepItem(2, 'Cliquer sur la section à modifier dans le menu de gauche'),
    stepItem(3, 'Créer ou modifier un élément, ajouter les photos, remplir les champs'),
    stepItem(4, 'Cliquer sur « Publier » — mise à jour visible en moins d’une heure'),
    gap(40),
    note('Ne jamais modifier directement le code source — passer exclusivement par le Studio.'),
  ] : []),

  ...h2('Fiche Google Business'),
  accessTable([
    ['Accès',             'business.google.com'],
    ['Email propriétaire', cfg.client_email ?? ''],
  ]),
  gap(60),
  bulletItem('Ajouter des photos de chantiers récents régulièrement — signal le plus efficace pour Google Maps'),
  bulletItem('Répondre aux avis Google (positifs et négatifs)'),
  bulletItem('Vérifier que les horaires et le numéro de téléphone sont à jour'),

  // ── 05 CONTACT & SUPPORT ────────────────────────────────────────────────────
  ...h1('05', 'Contact & support'),
  accessTable([
    ['Développeur',    cfg.dev_nom  ?? ''],
    ['Email',              cfg.dev_email ?? ''],
    ['Délai de réponse', '24–48 h ouvrées'],
  ]),
  gap(80),
  body('En cas de site inaccessible :'),
  gap(40),
  stepItem(1, 'Vérifier l’état de Vercel → vercel-status.com'),
  stepItem(2, `Vérifier que votre domaine est actif chez ${cfg.registrar ?? 'votre registrar'}`),
  stepItem(3, `Contacter votre développeur à ${cfg.dev_email ?? ''}`),
  ...(cfg.notes ? [gap(80), note(cfg.notes)] : []),

  // ── 06 APRÈS LE LANCEMENT ────────────────────────────────────────────────────
  ...h1('06', 'Après le lancement'),
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [7200, 1826],
    rows: [
      tableHeader(['Action recommandée', 'Quand'], [7200, 1826]),
      actionRow('Partager le site sur vos réseaux sociaux et signature email', 'Semaine 1'),
      actionRow('Demander des avis Google à vos clients satisfaits', 'Semaine 1'),
      actionRow('Vérifier que le formulaire de contact fonctionne en production', 'Semaine 1'),
      actionRow('Consulter les statistiques Plausible', 'Mensuel'),
      actionRow('Mettre à jour horaires et tarifs si nécessaire', 'Ponctuel'),
      actionRow('Renouveler le nom de domaine', cfg.date_renouvellement ?? 'Voir registrar'),
    ],
  }),

  // ══════════════════════════════════════════════════════════════════════════════
  // APPENDICE TECHNIQUE
  // ══════════════════════════════════════════════════════════════════════════════
  pb(),
  new Paragraph({ spacing: sp(0, 100),
    children: [run('APPENDICE TECHNIQUE', { size: 32, bold: true, color: C.black })] }),
  new Paragraph({ spacing: sp(0, 0), border: { bottom: b(C.black, 8) },
    children: [run('À destination du développeur et pour référence future', { size: 19, color: C.mid })] }),

  // ── A INFRASTRUCTURE ────────────────────────────────────────────────────────
  ...h1('A', 'Infrastructure & stack'),
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [2600, 6426],
    rows: [
      tableHeader(['Composant', 'Technologie'], [2600, 6426]),
      accessRow('Framework',    stk.framework   ?? 'Next.js 16 App Router + React 19'),
      accessRow('Langage',      stk.language    ?? 'TypeScript 5.9 (strict mode)'),
      accessRow('Styles',       stk.styles      ?? 'Tailwind CSS 4 + Framer Motion'),
      accessRow('Hébergement', stk.hebergement ?? 'Vercel (Edge Network, CDN mondial)'),
      accessRow('Analytics',    stk.analytics   ?? 'Plausible Analytics (sans cookie)'),
      accessRow('Email',        stk.email       ?? 'Resend (API transactionnelle)'),
      ...(stk.cms ? [accessRow('CMS', stk.cms)] : []),
    ],
  }),

  ...h2('CI/CD — GitHub Actions'),
  body('3 jobs s’exécutent automatiquement à chaque push et pull request :'),
  gap(40),
  bulletItem('Build · Lint · Audit — TypeScript strict, ESLint, pnpm audit (vulnérabilités bloquantes)'),
  bulletItem('Smoke tests — 4 tests Playwright sur l’app compilée (homepage · sitemap · robots · API contact)'),
  bulletItem('Lighthouse CI — scores ≥ 90 requis en Accessibilité et SEO, ≥ 90 en Performance'),
  gap(40),
  note(
    'Un hook pre-commit Husky + lint-staged bloque les commits locaux si ESLint détecte des erreurs. ' +
    'Les règles s’installent automatiquement via pnpm install.'
  ),

  // ── B RÉSULTATS DES TESTS ────────────────────────────────────────────────────
  ...h1('B', 'Résultats des tests'),

  ...h2('Smoke tests — Playwright'),
  body('Tests automatisés exécutés sur l’app compilée (équivalent production) à chaque push.'),
  gap(80),
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [4200, 1600, 3226],
    rows: [
      tableHeader(['Test', 'Résultat', 'Ce qui est vérifié'], [4200, 1600, 3226]),
      ciRow('Page d’accueil accessible',   true, 'HTTP 200 + élément <main> présent dans le DOM'),
      ciRow('sitemap.xml valide',             true, 'HTTP 200 + content-type XML'),
      ciRow('robots.txt conforme',            true, 'HTTP 200 + directive User-Agent présente'),
      ciRow('API Contact — validation',  true, 'Corps vide → HTTP 400 (rejet Zod)'),
    ],
  }),

  ...h2('Lighthouse CI — scores de production'),
  body('Mesuré via PageSpeed Insights sur l’URL de production (pas en local). Seuils blôquants pour le CI.'),
  gap(80),
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [5826, 1600, 1600],
    rows: [
      tableHeader(['Critère', 'Score obtenu', 'Seuil requis'], [5826, 1600, 1600]),
      lhRow('Performance',       sc.performance    ?? '—'),
      lhRow('Accessibilité', sc.accessibilite ?? '—'),
      lhRow('SEO',               sc.seo            ?? '—'),
      lhRow('Bonnes pratiques',  sc.best_practices ?? '—'),
    ],
  }),

  // ── C COMMANDES ESSENTIELLES ─────────────────────────────────────────────────
  ...h1('C', 'Commandes essentielles'),
  body('Toutes les commandes sont à exécuter depuis la racine du projet.'),

  ...h2('Développement'),
  code('pnpm install          # Installer les dépendances'),
  code('pnpm dev              # Serveur de développement → http://localhost:3001'),
  code('pnpm build            # Build de production + vérification TypeScript'),
  code('pnpm lint             # ESLint sur src/'),
  code('pnpm audit            # Audit de sécurité des dépendances'),

  ...h2('Tests'),
  code('pnpm e2e              # Smoke tests Playwright'),
  code('pnpm build && pnpm e2e  # Pipeline complet avant push'),

  ...h2('Déploiement'),
  bulletItem('Push sur main → déploiement de production automatique (Vercel)'),
  bulletItem('Push sur review/[branche] → URL de preview client'),
  gap(40),
  code('git push origin main              # Déploie en production'),
  code('git push origin review/v2-hero    # URL de preview client'),

  ...h2('Livraison'),
  code('pnpm livraison        # Génère docs/delivery/livraisons/livraison-[client].docx'),

  gap(240),
  new Paragraph({ spacing: sp(0, 0), border: { top: b(C.rule, 4) }, children: [run('')] }),
  new Paragraph({ spacing: sp(100, 0),
    children: [
      run('Mobem Solutions', { size: 18, bold: true, color: C.black }),
      run(`   ·   ${cfg.dev_email ?? ''}   ·   livré le ${cfg.date_livraison}`, { size: 18, color: C.mid }),
    ] }),
]

// ─── Assemblage du document ────────────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Arial', size: 20 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run:       { font: 'Arial', size: 22, bold: true, color: C.black },
        paragraph: { spacing: sp(0, 0), outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run:       { font: 'Arial', size: 18, bold: true, color: C.mid },
        paragraph: { spacing: sp(0, 0), outlineLevel: 1 } },
    ],
  },
  numbering: {
    config: [
      { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 480, hanging: 240 } } } }] },
      { reference: 'check',   levels: [{ level: 0, format: LevelFormat.BULLET, text: '✓',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 480, hanging: 240 } } } }] },
    ],
  },
  sections: [{
    properties: {
      page: {
        size:   { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          spacing: sp(0, 0),
          border: { bottom: b(C.rule, 4) },
          tabStops: [{ type: TabStopType.RIGHT, position: 9026 }],
          children: [
            run('MOBEM SOLUTIONS — Document de livraison', { size: 16, color: C.mid }),
            run('\tCONFIDENTIEL', { size: 16, bold: true, color: C.mid }),
          ],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: b(C.rule, 4) },
          spacing: sp(80, 0),
          children: [
            run('Page ', { size: 16, color: C.mid }),
            new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 16, color: C.mid }),
          ],
        })],
      }),
    },
    children,
  }],
})

// ─── Écriture du fichier ──────────────────────────────────────────────────────
const livraisonsDir = join(docsDir, 'delivery', 'livraisons')
mkdirSync(livraisonsDir, { recursive: true })

const slug    = (cfg.client_nom_slug || 'client').replace(/[^a-z0-9-]/gi, '-').toLowerCase()
const outName = `livraison-${slug}.docx`
const outPath = join(livraisonsDir, outName)

Packer.toBuffer(doc)
  .then(buf => {
    writeFileSync(outPath, buf)
    console.log(`✅  Document généré : docs/delivery/livraisons/${outName}`)
    console.log(`    Ouvrir avec Word, LibreOffice ou Google Docs`)
  })
  .catch(err => {
    console.error('❌ Erreur lors de la génération :', err.message)
    process.exit(1)
  })
