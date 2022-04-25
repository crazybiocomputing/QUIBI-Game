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

const newTeam = (section) => {
  const ids = ['team0','player1','player2','player3','player4','player5'];
  const labels = ['Team Name','Player #1','Player #2','Player #3','Player #4','Player #5'];

  /////////////////////// Private Functions ///////////////////////
  const showKey = (ev) => {
    console.log(ev.target);
    const current = document.querySelector('#letter-container.selected');
    current.textContent = ev.target.textContent;
    current.classList.remove('selected');
    // Update GAME.team
    if (current !== null) {
      const index = [...current.parentElement.children].indexOf(current);
      console.log(index,ev.target.textContent,GAME.team[0]);
      const indexLine = current.parentElement.id.match(/\d+/)[0];
      GAME.team[indexLine] += ev.target.textContent;
      console.log(GAME.team);
    }
    // Find next `#letter-container` sibling
    let sibling = current.nextElementSibling;
    if (sibling !== null) {
      sibling.classList.add('selected');
    }
    else {
      current.classList.add('eol');
    }

  }

  const enterKey = (ev) => {
    const current = document.querySelector('#letter-container.eol');
    current.classList.remove('eol');
    const parent = current.parentNode.id;
    console.log(ids.indexOf(parent) + 1, GAME.players);
    if (ids.indexOf(parent) + 1 > GAME.players) {
      return;
    }
    const nextRow = ids[ids.indexOf(parent)+1];
    const line = document.getElementById(nextRow);
    console.log(parent,nextRow,line);
    // Find the first `letter-container` element
    line.firstElementChild.classList.add('selected');
    // Find next `div` line...


  }

  const delKey = (ev) => {
    const rows = ['team0','player1','player2','player3','player4','player5'];
    let current = document.querySelector('#letter-container.eol');
    console.log(current);
    if (current !==  null) {
      current = document.querySelector('#letter-container.eol');
      current.classList.remove('eol');
      current.classList.add('selected');
      current.textContent = '';
      // Update `GAME.team`
      const index = [...current.parentElement.children].indexOf(current);
      const indexLine = current.parentElement.id.match(/\d+/)[0];
      GAME.team[indexLine] = GAME.team[indexLine].slice(0,index);
      return;
    }
    current = document.querySelector('#letter-container.selected');
    current.classList.remove('selected');
    // Find previous `div` sibling
    let sibling = current.previousElementSibling;
    console.log(sibling);
    if (sibling === null) {
      sibling = current;
    }
    sibling.textContent='';
    sibling.classList.add('selected');
    // Update `GAME.team`
    const index = [...sibling.parentElement.children].indexOf(sibling);
    const indexLine = sibling.parentElement.id.match(/\d+/)[0];
    GAME.team[indexLine] = GAME.team[indexLine].slice(0,index);
    console.log(GAME.team);
  }

  const erase = (index) => (ev) => {
  
  }
  
  const selectPlayer = (index) => (ev) => {
  
  }
  
  /////////////////////// Main - Creating DOM ///////////////////////
  let count = 0;
  for (let i=0;i < GAME.players + 1; i++) {
    // Header
    let label = document.createElement('label');
    label.textContent = labels[i];
    let erase = document.createElement('button');
    erase.className = 'erase';
    section.appendChild(label);
    section.appendChild(erase);
    if (i !== 0) {
      let whoami = document.createElement('button');
      whoami.id = `whoami${i}`;
      whoami.className = 'whoami';
      section.appendChild(whoami);
    }
    // Line
    const line = document.createElement('div');
    line.id = ids[i];
    line.className = 'attempt';
    for (let j=0; j < 3; j++) {
      const letter = document.createElement('div');
      letter.id = 'letter-container';
      if (i === 0 && j === 0) {
        letter.className = 'selected';
      }
      letter.style.transitionDelay = `0s`;
      letter.style.animationDelay = `${count * 0.3}s`;
      line.appendChild(letter);
      count++;
    }
    section.appendChild(line);
  }
  // Add Keyboard
  section.appendChild(newKeyboard('alpha_azerty'));
  

  // Add Events
  const keys = section.querySelectorAll('.keyboard .single');
  keys.forEach ((k) => k.addEventListener('click',showKey) );
  section.querySelector('.keyboard #enter.big').addEventListener('click',enterKey);
  section.querySelector('.keyboard #del.big').addEventListener('click',delKey);
  // Erase buttons
  const erasers = section.querySelectorAll('.erase');
  erasers.forEach ( (e,i) => e.addEventListener('click',erase(i)));
  // SelectPlayer buttons
  const slctplayers = section.querySelectorAll('.whoami');
  slctplayers.forEach ( (e,i) => e.addEventListener('click',selectPlayer(i)));

}
