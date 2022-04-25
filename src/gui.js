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

const showSection = (name) => (ev) => {
  // Switch off all the main sections
  document.querySelectorAll('.main').forEach( (section) => section.style.display = 'none');
  // Switch on the section `name`
  document.getElementById(name).style.display = 'block';
}

const cloud_sender = (scenario,lang) => {
  const trads = {
    en: [
      '<p>Drag and drop the item you want from your inventory to send it to another player...</p>',
      '<p>... Then, give him.her the following code by voice, by e-mail, by instant messaging, etc.</p>'
    ],
    fr: [
      '<p>Glissez-déposez l\'item de votre inventaire que vous voulez envoyer à un autre joueur...</p>',
      '<p>... Ensuite, donnez-lui le code suivant à haute voix, par e-mail, par messagerie instantanée, etc.</p>'
    ]
  }
  const html = `<span class="elem">section: Cloud Upload</span>${trads[lang][0]}<article id="empty-container"></article>${trads[lang][1]}`;
}

const initGUI = (scenario) => {
  const sections = [
    {buttonid:'settings',title:'Settings',sectionid:'setter'},
    {buttonid:'history',title:'History',sectionid:'historian'},
    {buttonid:'team',title:'Team',sectionid:'team_builder'},
    {buttonid:'load_session',title:'Load Session',sectionid:'session_loader'},
    {buttonid:'save_session',title:'Save Session',sectionid:'session_saver'},
    {buttonid:'chat',title:'Interrogate',sectionid:'interrogate'},
    {buttonid:'scan',title:'Scan',sectionid:'scanner'},
    {buttonid:'explore',title:'Explore',sectionid:'explorer'},
    {buttonid:'puzzle',title:'Solve',sectionid:'solver'},
    {buttonid:'cloud_upload',title:'Send in Cloud',sectionid:'cloudsender',func: cloud_sender},
    {buttonid:'cloud_download',title:'Receive from Cloud',sectionid:'cloudreceiver'},
    {buttonid:'location',title:'Location',sectionid:'moveto'}
  ];
  
  // Get language
  const lang = navigator.language || 'en';
  
  // Create all the sections required for the scenario
  
  // Update header menu
  /*
     <nav style="display: flex">
      <ul style="flex-grow: 1">
        <li class="menu"><a id="settings" class="child" href="#" title="Settings"></a></li>
*/
  const list = document.getElementById('menubar');
  
  sections.forEach( (s) => {
    const item = document.createElement('li');
    item.className = 'menu';
    list.appendChild(item);
    const button = document.createElement('a');
    button.id = s.buttonid;
    button.className = 'child';
    button.href='#';
    button.title = s.title;
    item.appendChild(button);

    // Add listener
    button.addEventListener('click',showSection(s.sectionid));
  });
  

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



