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


const keypressed = (key) => (ev) => {
  console.log(`keypressed ${key}`);
}

const newKeyboard = (kb_layout) => {
  const layouts = {
    'azerty': [
      ['1','2','3','4','5','6','7','8','9','0'],
      ['A','Z','E','R','T','Y','U','I','O','P'],
      ['Q','S','D','F','G','H','J','K','L','M'],
      ['enter','W','X','C','V','B','N','del']
    ],
    'alpha_azerty': [
      ['A','Z','E','R','T','Y','U','I','O','P'],
      ['Q','S','D','F','G','H','J','K','L','M'],
      ['enter','W','X','C','V','B','N','del']
    ],
    'qwerty': [
      ['0','1','2','3','4','5','6','7','8','9'],
      ['Q','W','E','R','T','Y','U','I','O','P'],
      ['A','S','D','F','G','H','J','K','L','M'],
      ['enter','Z','X','C','V','B','N','del']
    ],
    'alphabet': [
      ['0','1','2','3','4','5','6','7','8','9'],
      ['A','B','C','D','E','F','G','H','I','J'],
      ['K','L','M','N','O','P','Q','R','S','T'],
      ['enter','U','V','W','X','Y','Z','del']
    ],
    'numerical': [
      ['.','del'],
      ['7','8','9'],
      ['4','5','6'],
      ['1','2','3'],
      ['0','enter']
    ]
  };
    
  const icons = {
    'enter' : '<div><img src="../assets/icons/arrow-return-left.svg" alt="Enter" class="icon"></div>',
    'del'   : '<div><img src="../assets/icons/backspace.svg" alt="Del" class="icon"></div>'    
  };
  
  // Main
  const kboard = document.createElement('div');
  kboard.className = 'keyboard';
  // For each row...
  layouts[kb_layout].forEach( (line) => {
    const kbline = document.createElement('div');
    kbline.className = 'keyboard-line';
    // For each key...
    line.forEach( (key) => {
      let button;
      if (key === 'enter' || key === 'del') {
        button = document.createElement('button');
        button.id=key;
        button.className = `key big ${kb_layout}`;
        button.innerHTML = icons[key];
      }
      else {
        button = document.createElement('button');
        button.className = "key single";
        button.textContent = key;
      }
      button.addEventListener('click',keypressed(key));
      kbline.appendChild(button);
    });
    kboard.appendChild(kbline);
  });
  return kboard;
}

