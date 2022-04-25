/*
 *  QUIBI-Game Quest in Bioinformatics Serious Game
 *  Copyright (C) 2021  Jean-Christophe Taveau.
 *
 *  This file is part of QUIBI-Game
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with QUIBI-Game.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Jean-Christophe Taveau
 */

'use strict';

const add_char = (params) => {

}

const add_map = (params) => {

}

const add_loc = (params) => {

}

const add_item = (params) => {

}

const add_puzzle = (params) => {

}


const add_var = (params) => {

}

const receive_item = (params) => {
  const alphabet = GAME.cypher;
  const encoded = params[0];
  const unshift = alphabet.length - GAME.team[0].split().reduce ((sh,c) => sh + c.charCodeAt(),0) % alphabet.length;
  let count = 0;
  const decoded = encoded
    .toUpperCase()
    .split('')
    .map( (c) => alphabet[(alphabet.indexOf(c) + unshift) % alphabet.length]);
    
  const team = decoded.slice(0,3).join('');
  const code = GAME.cypher.indexOf(decoded[3]);
  const from = decoded[4];
  const to = decoded.slice(5);

  console.log(decoded,`\nFrom: ${GAME.team[from]} @ ${team}\nTo: ${GAME.team[to]}\nObject:${code}`);
}

const send_item = (params) => {
  // <From><Code><To#1><To#2>
  // <From><Code>ALL
  const alphabet = GAME.cypher;
  const str = GAME.team[0] + alphabet[params[0]] + GAME.whoami + params[1]; // 'TEAM><25><From><ToPlayerI><ToPlayerJ>'
  console.log(str);
  // Julius cypher
  const shift = GAME.team[0].split().reduce ((sh,c) => sh + c.charCodeAt(),0) % alphabet.length;
  console.log(shift);
  // str[6]);
  const encoded = str
    .split('')
    .map( (c) => alphabet[(alphabet.indexOf(c)+shift) % alphabet.length])
    .join('')
    .toLowerCase();

  console.log(encoded);
  return encoded;
}

const set_var = (params) => {

}

const funcs = {
  addchar : add_char,
  additem: add_item,
  addloc: add_loc,
  addmap: add_map,
  addpuzzle: add_puzzle,
  addvar: add_var,
  receiveitem: receive_item,
  senditem: send_item,
  setvar: set_var
}

