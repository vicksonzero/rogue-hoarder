# Rogue-Hoarder-13k

Your inventory space is your HP.  
Manage your live priorities vs earnings in this dark adventure game

# How to play

- WASD, ZQSD, or Arrow keys to move.
- Press J or K to attack
- S (while on ground) to block with shield



# Implementation plans

- [x] basic platformer
- [x] moving camera
- [x] switch between hub world and dungeon
- [ ] procedural enemies by level
- [x] procedural traps by level
- [ ] procedural loots on fixed map layout
- [ ] poking sword
- [ ] shooting magic
- [ ] inventory queue linked to hp
- [ ] reorganize items in queue
- [ ] items to get (treasure box, sword and wands)
- [ ] score system
- [ ] toggle off abilities by taking damage
- [x] climbing walls
- [ ] dash
- [ ] getting items and inventory managements (no dnd)
- [ ] discarding health card unlocks more health cards
- [ ] discard multiple health cards to unlock a card
friends and family and doctor
- [ ] after playtest, optional curse of binding and optional losing self or mind
  - curses occur if player hasn't been injured for certain time
- [ ] MVP done
- [ ] procedural dungeon?
- [ ] oneway platform
- [ ] mobile ui?


------------------------------------

# Credits / Starter projects


## Mini 2D Platformer bootstrap/demo

https://xem.github.io/mini2DPlatformer

https://github.com/xem/mini2DPlatformer


## js13k Webpack Starter

https://github.com/sz-piotr/js13k-webpack-starter

(Notes: Size is 889 bytes (6.68%) without game code)

## What is it?

This project aims to be a foundation for creating a game for the [js13k](http://js13kgames.com/) game competition. As such it provides tools such as a development server, automatic code minification and archive creation.

## List of features

1. JS & CSS minification
1. Code inlining (the entire application is a single `index.html` file)
1. Development server with source maps
1. Generation of submission files (including the `.zip` file)
1. *ES2015* module support through webpack
1. Tree shaking and module concatenation

## How can I get started?

The first thing you need to do is make sure you have [node.js](https://nodejs.org/en/download/current/) installed. Then clone the project and in the root directory run the following command:

```
npm install
```

This should install all the required dependencies for developing the project. After the installation finishes you will be able to run the included npm scripts.

## How can I start the development server?

After going through the installation just run the following command:

```
npm start
```

This will setup a server listening at `http://localhost:8080/`.

### Access from another device

You can pass an argument to the development server specifying the interface to listen on.
```
npm start -- --host=0.0.0.0
```
This command will start the development server listening on all interfaces. Having a device on the same network you will be able to view the webpage at `http://[yourLocalIP]:8080` for example `http://192.168.1.1:8080`.

## How can i generate files for submission?

This project provides a npm script for building your application. Just run:
```
npm run build
```

This will generate two files `index.html` and `build.zip` both located in the `dist/` folder. The zip file contains only the generated `index.html`. The output from the command also tells you how large is the generated zip file.


## Resources

1. Webpack [https://webpack.js.org/](https://webpack.js.org/)
<!-- 2. miniDragAndDrop [https://xem.github.io/miniDragAndDrop/](https://xem.github.io/miniDragAndDrop/) -->


