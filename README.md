# Chor Dai Di (Big 2)

Chor Dai Di (Big 2) is a popular card game in Asia typically played by 4 players. Each player is dealt 13 cards, and the objective is to be the first to play all your cards by forming and playing valid combinations in turn order.


## Goal

This project was built to learn React, game logic, backend architecture, and eventually AI.

This project is mainly a learning project focused on building a complete application while minimizing the use of AI-generated code.

The goal is to understand:
- React fundamentals
- State management
- Game logic design
- Backend communication
- Real-time multiplayer systems
- AI decision making

## Tech Stack

### Current
- React
- Vite
- TypeScript
- CSS

## Development Roadmap

### Phase 1 - Core Game Logic [x]

Goal: Build a playable card system locally.

Features:
- Create deck
- Shuffle deck
- Deal cards
- Card representation
- Hand sorting
- Clickable cards
- Select/deselect cards
- Validate card combinations
- Play cards

Focus:
- React components
- State management
- Clean game logic separation

Key Learnings:
- React re-renders on new state(by reference), always create a new state rather than mutating existing states.
- Separating ui and game logic clearly.
- Using CSS modules to avoid class/id collision for common names like button, card, etc.
- Using CSS tokens to standardize global styles for consistency
- Becoming familiar with typescript and understanding the power of type enforcement. (catching errors and more readable code)
- Game logic: combo validation and comparison 


### Phase 2 — Single Player Mode

Goal: Create a playable game against bots.

Features:
- Bot players
- Turn system
- Basic bot decision making

Bot strategy:
- Play the lowest valid card
- Play the lowest valid combination
- Follow Big 2 rules


### Phase 3 — Multiplayer

Goal: Allow multiple players to play together.

Features:
- Backend server
- Player rooms
- Real-time communication
- Game synchronization
- Player state management


### Phase 4 — AI Extension

Goal: Improve bot intelligence.

Possible extensions:
- Better card evaluation
- Opponent prediction
- Strategy optimization
- Machine learning experiments


## Learning Philosophy

This project is intentionally built step-by-step.

The focus is understanding:
- why things work
- how systems communicate
- how to design scalable code


## Future Ideas

- Online matchmaking
- Player accounts
- Rankings
- Spectator mode
- Advanced AI