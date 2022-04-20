/*
 *  QB-Game Quest in Bioinformatics Serious Game
 *  Copyright (C) 2021  Jean-Christophe Taveau.
 *
 *  This file is part of QB-Game
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
 *  along with QB-Game.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Jean-Christophe Taveau
 */

'use strict';

const showSection = (name) => (ev) => {
  // Switch off all the main sections

  document.querySelectorAll('.main').forEach( (section) => section.style.display = 'none');
  document.getElementById(name).style.display = 'block';
}

const initGUI = (scenario) => {
  // Update header menu
  
  // Add listener
  document.getElementById('settings').addEventListener('click',showSection('setter'));
  document.getElementById('history').addEventListener('click',showSection('historian'));
  document.getElementById('team').addEventListener('click',showSection('team_builder'));
  document.getElementById('load_session').addEventListener('click',showSection('session_loader'));
  document.getElementById('save_session').addEventListener('click',showSection('session_saver'));
  document.getElementById('chat').addEventListener('click',showSection('interrogate'));
  document.getElementById('scan').addEventListener('click',showSection('scanner'));
  document.getElementById('explore').addEventListener('click',showSection('explorer'));
  document.getElementById('puzzle').addEventListener('click',showSection('solver'));
  document.getElementById('cloud_upload').addEventListener('click',showSection('cloudsender'));
  document.getElementById('cloud_download').addEventListener('click',showSection('cloudreceiver'));
 document.getElementById('location').addEventListener('click',showSection('moveto'));
}
