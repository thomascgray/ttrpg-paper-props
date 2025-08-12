# TODO this branch

finish the positioning controls, should work on desktop and mobile, make it so they power the position stuff, remove position controls from the form

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

- we've got a good little thing going with the ..imageOpts stuff in db; we should aim for more consistency across all of it

## resources

### book covers

https://unsplash.com/photos/brown-leather-bifold-wallet-on-brown-wooden-table-e47gwnA7KGk
https://unsplash.com/photos/black-leather-case-on-white-table-r2G-GOqj4f4

svg filter bulge stuff

Haven't done much stuff like this in the meantime, but coming back to it I wonder why I didn't try SVG filters back then. Just tried it out here (I got carried away and added some bloom / inner glow filters too)

The idea is that you apply an SVG filter with a displacement map. The map itself is an image that contains red and green pixel values that displace the input image to look like fisheye; something like this. One catch here is that adding a link to the displacement image file directly won't work, and you need to add it encoded as base64 data URI. For low-res images it's not that bad - my example has a janky 128x128px one, but I'm sure with some experimentation you could get it to look better.

https://codepen.io/cauners/pen/ExMaqOW

https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap

https://imgur.com/V6KB8ov
