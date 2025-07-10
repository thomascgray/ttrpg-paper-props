# TTRPG Paper Props

A webtool for making "props" for roleplaying games: handouts that you can give your players.

Newspaper clippings, character cards, handwritten notes, etc.

You play with it live [right here!](https://handouts.tomg.cool/)

_Very W.I.P, apologies for any bugs!_

## Quick start

`bun install`
`npm run dev`

## Linting

`bun x tsx`

## Build

`bun run build`

# todo

ok we've refactored so much and i hate to stop here but its already so much better so we just gotta finish it.

new config in @db.ts
thats now powering the form

valtio for app state
thats like what handout is selected, etc.

we're GOING to use dexie for storing snapshots, thats not done yet

we need a plan for how we keep the latest transient version saved. befoer we were doing local storage but maybe better to have like a single row in dexie we keep updating? dno

we also need to redo all the rendering components with the new data format
see the extract functions in @db.ts
we should write a new function in @db.ts that returns all the possible paths or something? idk. could be useful for the handout renderer
