# [Nom du Client] — Design System

> **Ce fichier est vide.** Il sera généré automatiquement via le prompt d'initialisation.
> Lancer le prompt dans README.md avec le brief client → l'IA proposera palette, typographie, radius et structure.
>
> Une fois rempli, il devient la source de vérité design du projet.
> À lire avant toute modification visuelle ou ajout de composant.
> À mettre à jour après chaque ajout de token, composant ou pattern.

---

## Constantes techniques de la stack (non modifiables)

Ces valeurs sont fixes pour tous les projets Mobem — elles ne changent pas selon le client.

### Grille 8pt — espacements stricts

| Token | rem | px |
|-------|-----|----|
| xs | 0.5rem | 8px |
| sm | 1rem | 16px |
| md | 1.5rem | 24px |
| lg | 2rem | 32px |
| xl | 3rem | 48px |
| 2xl | 4rem | 64px |
| 3xl | 6rem | 96px |
| hero | 8rem | 128px |

Container : max-width `1280px`, padding horizontal `24px`

### Motion

```
Ease    : cubic-bezier(0.25, 0.1, 0.25, 1)
Micro   : 200ms  — hover, focus
Standard: 300ms  — transitions de contenu
Macro   : 400ms  — entrées de section
Stagger : 0.08s entre enfants
```

Règles : `once: true` sur les animations scroll · jamais width/height/padding · respecter `prefers-reduced-motion`

### Couleurs — OKLCH exclusivement

Aucune couleur hex, rgb() ou named dans les composants. Uniquement `var(--...)` ou valeurs OKLCH.

---

## À remplir via le prompt d'initialisation

- **Ambiance / North Star :**
- **Palette OKLCH :** (background · foreground · primary · signal · border · muted)
- **Dark mode :** (fond sombre, texte clair)
- **Typographie :** (police display, corps, mono — ou conserver DM Serif / Inter / JetBrains Mono)
- **Rayon de bordure :** (0px · 2px · 4px — UN seul pour tout le projet)
- **Ombres :** (flat / subtile — voir SKILL.md)
