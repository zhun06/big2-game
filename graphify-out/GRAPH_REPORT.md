# Graph Report - .  (2026-07-03)

## Corpus Check
- Corpus is ~6,615 words - fits in a single context window. You may not need a graph.

## Summary
- 185 nodes · 277 edges · 16 communities (14 shown, 2 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.81)
- Token cost: 72,934 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Package Dependencies & Tooling|Package Dependencies & Tooling]]
- [[_COMMUNITY_Game Engine & State|Game Engine & State]]
- [[_COMMUNITY_Combo Evaluation Rules|Combo Evaluation Rules]]
- [[_COMMUNITY_App TSConfig|App TSConfig]]
- [[_COMMUNITY_Node TSConfig|Node TSConfig]]
- [[_COMMUNITY_React UI Components|React UI Components]]
- [[_COMMUNITY_Card & Combo Types|Card & Combo Types]]
- [[_COMMUNITY_Project Docs & Roadmap|Project Docs & Roadmap]]
- [[_COMMUNITY_Card Sorting & Strength Tables|Card Sorting & Strength Tables]]
- [[_COMMUNITY_Logo & Icon Assets|Logo & Icon Assets]]
- [[_COMMUNITY_Hero Image Artwork|Hero Image Artwork]]
- [[_COMMUNITY_Bot Naming|Bot Naming]]
- [[_COMMUNITY_Root TSConfig|Root TSConfig]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `evaluateCombo()` - 16 edges
3. `compilerOptions` - 16 edges
4. `GameEngine()` - 14 edges
5. `evaluateFiveCardCategory()` - 8 edges
6. `evaluateFiveCardStrength()` - 7 edges
7. `isValidMove()` - 6 edges
8. `sortCards()` - 6 edges
9. `cardStrength()` - 6 edges
10. `Chor Dai Di (Big 2) Project` - 6 edges

## Surprising Connections (you probably didn't know these)
- `GameEngine()` --indirect_call--> `cardId()`  [INFERRED]
  frontend/src/game-logic/gameEngine.ts → frontend/src/types/card.ts
- `Game()` --indirect_call--> `GameEngine()`  [INFERRED]
  frontend/src/pages/game/Game.tsx → frontend/src/game-logic/gameEngine.ts
- `Tech Stack (React, Vite, TypeScript, CSS)` --conceptually_related_to--> `React + TypeScript + Vite Template`  [INFERRED]
  README.md → frontend/README.md
- `App Favicon (Browser Tab Icon)` --semantically_similar_to--> `Vite Logo`  [INFERRED] [semantically similar]
  frontend/public/favicon.svg → frontend/src/assets/vite.svg
- `GameEngine()` --indirect_call--> `resetPlayer()`  [INFERRED]
  frontend/src/game-logic/gameEngine.ts → frontend/src/game-logic/player.ts

## Import Cycles
- 1-file cycle: `frontend/src/game-logic/sort.ts -> frontend/src/game-logic/sort.ts`

## Hyperedges (group relationships)
- **Development Roadmap Phases** — readme_phase1_core_game_logic, readme_phase2_single_player, readme_phase3_multiplayer, readme_phase4_ai_extension [EXTRACTED 1.00]

## Communities (16 total, 2 thin omitted)

### Community 0 - "Package Dependencies & Tooling"
Cohesion: 0.07
Nodes (27): dependencies, lucide-react, react, react-dom, react-router-dom, devDependencies, eslint, @eslint/js (+19 more)

### Community 1 - "Game Engine & State"
Cohesion: 0.17
Nodes (15): createDeck(), dealCards(), shuffleDeck(), GameEngine(), createBot(), createPlayer(), resetPlayer(), setPlayerHand() (+7 more)

### Community 2 - "Combo Evaluation Rules"
Cohesion: 0.22
Nodes (22): compareCombo(), evaluateCombo(), evaluateFiveCardCategory(), evaluateFiveCardStrength(), evaluatePairStrength(), evaluateSingleStrength(), evaluateTripleStrength(), fiveCardComboBeatsTable() (+14 more)

### Community 3 - "App TSConfig"
Cohesion: 0.10
Nodes (20): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+12 more)

### Community 4 - "Node TSConfig"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+9 more)

### Community 5 - "React UI Components"
Cohesion: 0.16
Nodes (4): App(), suitIcons, PlayerInfo(), Game()

### Community 6 - "Card & Combo Types"
Cohesion: 0.14
Nodes (13): Card, cardId(), Rank, RANKS, Suit, SUITS, Combo, ComboCategory (+5 more)

### Community 7 - "Project Docs & Roadmap"
Cohesion: 0.18
Nodes (14): Frontend HTML Entry Point, main.tsx Module Script Entry, Root Mount Div (#root), ESLint Type-Aware Configuration, React Compiler (disabled), React + TypeScript + Vite Template, Bot Strategy (Lowest Valid Card/Combination), Chor Dai Di (Big 2) Project (+6 more)

### Community 8 - "Card Sorting & Strength Tables"
Cohesion: 0.29
Nodes (6): ALLOWED_STRAIGHTS, FLUSH_RULES, RANK_STRENGTH, STRAIGHT_STRENGTH, STRAIGTH_FLUSH_RULES, SUIT_STRENGTH

### Community 9 - "Logo & Icon Assets"
Cohesion: 0.50
Nodes (4): App Favicon (Browser Tab Icon), UI Icon Sprite Sheet (social/documentation symbols), React Logo, Vite Logo

### Community 10 - "Hero Image Artwork"
Cohesion: 0.67
Nodes (3): Stacked Card / Deck Visual Metaphor, Big 2 Hero Image (Stacked Isometric Card Slabs), Purple Gradient Accent Motif

## Knowledge Gaps
- **87 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+82 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `evaluateCombo()` connect `Combo Evaluation Rules` to `Game Engine & State`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `GameEngine()` (e.g. with `resetPlayer()` and `cardId()`) actually correct?**
  _`GameEngine()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _89 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Package Dependencies & Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `App TSConfig` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `Node TSConfig` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `React UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.13970588235294118 - nodes in this community are weakly interconnected._