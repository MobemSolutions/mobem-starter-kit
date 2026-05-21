---
name: docx
description: "Use this skill whenever the user wants to create, read, edit, or manipulate Word documents (.docx files). Triggers include: any mention of 'Word doc', 'word document', '.docx', or requests to produce professional documents with formatting like tables of contents, headings, page numbers, or letterheads. Also use when extracting or reorganizing content from .docx files, inserting or replacing images in documents, performing find-and-replace in Word files, working with tracked changes or comments, or converting content into a polished Word document. If the user asks for a 'report', 'memo', 'letter', 'template', or similar deliverable as a Word or .docx file, use this skill. Do NOT use for PDFs, spreadsheets, Google Docs, or general coding tasks unrelated to document generation."
license: Proprietary. LICENSE.txt has complete terms
---

# DOCX creation, editing, and analysis

## Quick Reference

| Task | Approach |
|------|----------|
| Create new document | Use `docx` npm — see Creating New Documents below |
| Edit existing document | Unpack → edit XML → repack |

---

## Creating New Documents

Install: `npm install docx` (or `pnpm add -D docx`)

### Setup
```javascript
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, PageBreak, LevelFormat,
  TabStopType
} from 'docx'
import { writeFileSync } from 'fs'

const doc = new Document({ sections: [{ children: [/* content */] }] })
Packer.toBuffer(doc).then(buf => writeFileSync('doc.docx', buf))
```

### Page Size (A4 — standard français)

```javascript
sections: [{
  properties: {
    page: {
      size: { width: 11906, height: 16838 },   // A4 en DXA (1440 DXA = 1 pouce)
      margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }  // marges 1 pouce
    }
  },
  children: []
}]
// Largeur de contenu utile : 11906 − 2 × 1440 = 9026 DXA
```

**US Letter :** width: 12240, height: 15840

### Styles (surcharger les titres intégrés)

Toujours utiliser Arial — universellement supporté, professionnel.

```javascript
const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Arial', size: 20 } } },  // 10pt par défaut
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 24, bold: true, font: 'Arial' },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 20, bold: true, font: 'Arial' },
        paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 1 } },
    ]
  },
  sections: [{ children: [] }]
})
```

### Listes (NE JAMAIS utiliser de caractères unicode bullets)

```javascript
// ❌ INTERDIT
new Paragraph({ children: [new TextRun('• Item')] })
new Paragraph({ children: [new TextRun('• Item')] })

// ✅ CORRECT — numbering config avec LevelFormat.BULLET
const doc = new Document({
  numbering: {
    config: [
      { reference: 'bullets', levels: [{
          level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }] },
      { reference: 'numbers', levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }] },
    ]
  },
  sections: [{ children: [
    new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun('Item')] }),
  ] }]
})

// ⚠️ Même reference = numérotation continue (1,2,3 puis 4,5,6)
// Références différentes = repart à zéro (1,2,3 puis 1,2,3)
```

### Tableaux

**CRITIQUE : double largeur obligatoire** — `columnWidths` sur le tableau ET `width` sur chaque cellule.

```javascript
const border = { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC' }
const borders = { top: border, bottom: border, left: border, right: border }

new Table({
  width: { size: 9026, type: WidthType.DXA },  // toujours DXA (les % cassent dans Google Docs)
  columnWidths: [4513, 4513],  // doit totaliser la largeur du tableau
  rows: [
    new TableRow({ children: [
      new TableCell({
        borders,
        width: { size: 4513, type: WidthType.DXA },  // aussi sur chaque cellule
        shading: { fill: 'F5F5F5', type: ShadingType.CLEAR },  // CLEAR jamais SOLID
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun('Cellule')] })]
      })
    ] })
  ]
})
```

**Règles de largeur :**
- Toujours `WidthType.DXA` — jamais `WidthType.PERCENTAGE` (incompatible Google Docs)
- Largeur tableau = somme des `columnWidths`
- `width` de chaque cellule = `columnWidth` correspondant
- `margins` cellule = padding interne (ne s'ajoute pas à la largeur)
- Ne jamais utiliser un tableau comme séparateur/règle — utiliser une bordure de paragraphe

### Saut de page

```javascript
// CRITIQUE : PageBreak doit être dans un Paragraph
new Paragraph({ children: [new PageBreak()] })
// ou
new Paragraph({ pageBreakBefore: true, children: [new TextRun('Nouvelle page')] })
```

### En-tête et pied de page

```javascript
sections: [{
  headers: {
    default: new Header({ children: [
      new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC' } },
        tabStops: [{ type: TabStopType.RIGHT, position: 9026 }],
        children: [
          new TextRun({ text: 'Titre à gauche', font: 'Arial', size: 16 }),
          new TextRun({ text: '\tDroite', font: 'Arial', size: 16 }),
        ]
      })
    ] })
  },
  footers: {
    default: new Footer({ children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'Page ', font: 'Arial', size: 16 }),
          new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 16 }),
        ]
      })
    ] })
  },
  children: []
}]
```

### Hyperliens

```javascript
import { ExternalHyperlink } from 'docx'

new Paragraph({ children: [
  new ExternalHyperlink({
    children: [new TextRun({ text: 'Lien', style: 'Hyperlink' })],
    link: 'https://example.com',
  })
] })
```

### Ombrage (background cellule)

```javascript
// TOUJOURS ShadingType.CLEAR — jamais SOLID (donne un fond noir)
shading: { fill: 'EBF5EB', type: ShadingType.CLEAR }
```

---

## Règles critiques

- **Taille de police** : unité = demi-points. `size: 20` = 10pt · `size: 24` = 12pt · `size: 32` = 16pt · `size: 48` = 24pt
- **Jamais `\n`** — créer des Paragraph séparés
- **Jamais de bullets unicode** — utiliser `LevelFormat.BULLET` avec numbering config
- **PageBreak dans un Paragraph** — standalone = XML invalide
- **ImageRun nécessite `type`** — spécifier png/jpg/etc obligatoirement
- **Tableaux : double largeur** — `columnWidths` ET `width` sur chaque cellule
- **Largeur tableau = somme des columnWidths** — vérifier que ça additionne
- **`ShadingType.CLEAR`** — jamais SOLID pour les fonds colorés
- **Surcharger les styles intégrés** — utiliser les IDs exacts : "Heading1", "Heading2"
- **`outlineLevel`** — requis pour la table des matières (0 = H1, 1 = H2)
