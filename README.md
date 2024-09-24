# TTRPG Paper Props

A webtool for making "props" for roleplaying games: handouts that you can give your players.

Newspaper clippings, character cards, handwritten notes, etc.

You play with it live [right here!](https://ttrpg-paper-props.netlify.app/)

_Very W.I.P, apologies for any bugs!_

## Quick start

`npm install`
`npm run dev`

## Build

`npm run build`

# todo

- finish wiring up config2
- use that to power ALL the forms
- use that to set intial state too
  - e.g define lots of handout definitions, but them all in state somewhere initially
  - then we can get rid of the original config
- for getting/setting data into the state, use a context
- and ALSO use lodash get/set functions so we can use dot notation to get/set data
  - this is for nested stuff e.g check config2 for the newspaper form, the title stuff
