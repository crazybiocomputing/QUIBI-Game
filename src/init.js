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
 * Louis Texier
 * Léa Chabot
 * Bluwen Guidoux D'Halluin
 * Fatoumata Mangane
*/

'use strict';


/**
 * Asynchronously Read JSON Scenario
 *
 */
async function fetchJSON(url) {
  const response = await fetch(url);
  return response.json();
}

/**
 * Asynchronously Read Markdown Scenario
 * TODO
 */
async function fetchMD(url) {
  const response = await fetch(url);
  const txt = response.text();
  /*
  const data = parseMD(txt);
  return data;
  */
}

/**
 * Init game from `scenario`
 * To run this example, type in QUIBI-Game
 * `python3 -m http.server 8888`
 */
//Pour appler le code dans engine
async function init(scenario) {
  console.log('init');
  // Load scenario in format JSON or Markdown
  const data = await fetchJSON(scenario);
  console.log(data);
  // Create Game and GUI
  let langue = 'fr';
  //TO DO

  //Load the characters
  //showCharacters();

  //Load the dialog with the right language (TO DO right now only work for the intro)
  //dialog(data,'fr');

  //Show the localisation (TO DO only work for the intro)
  showLoc(data);

  //Show the items
  //showItems();

  initDrag();

  //addchar_1(data);

  //additem(data);

  //Load the first scenario : bob_test1
  b_test1(data,langue);

  //Clean the drag and drop
  cleanDragAndDrop();
}

/**
 * 
 * @param {Object} data 
 */
function showLoc(data){
  let navlocs=getId('navlocs');

  let loc = data['gamers'][0]["settings"]['location'];

  let li = create('li');
  let a =create('a');
  let img =create('img');
  let span = create('span');

  li.class="location";
  a.href='#'
  a.textContent=loc.substring(4,7)+" | "+loc.substring(8);
  img.src="../assets/icons/geo-alt-fill.svg";
  img.width=70;
  span.style="font-size:0.5em"
  append(a,img);
  append(a,span);
  append(li,a);
  append(navlocs,li);
}

/**
 * 
 */
function showCharacters(){
  let narch=getId('navchars');

  for(let i =0; i<CHARS.length;i++){

    let li = create('li');
    let a =create('a');
    let img =create('img');

    a.href ='#';
    a.setAttribute("ondragstart","dragstart_handler(event)");
    a.id=CHARS[i].id;
    img.setAttribute("class","close");

    img.src=CHARS[i].url;
    img.id=CHARS[i].id;
    img.draggable ='true';
    img.width=80;


    append(a,img);
    append(li,a);
    append(narch,li);
  }
}

/**
 * 
 */
function showItems(){
  let narIt=getId('navitems');

  for (let i = 0; i<DECKS.length;i++){

    let li = create('li');
    let a = create('a');
    let p = create('p');

    a.href='#';
    a.setAttribute("ondragstart","dragstart_handler(event)");

    p.setAttribute("class","close");
    p.textContent=DECKS[i].deck;

    li.setAttribute("class","small item");

    append(a,p);
    append(li,a);
    append(narIt,li);
  }
}

//modification de l'index html ajout d'id pour les articles
function initDrag(){

  let dragUp= getId("dropzone1");
  let dragDown=getId("dropzone2");

  dragUp.setAttribute("ondrop","drop_handler_up(event)");
  dragUp.setAttribute("ondragover","dragover_handler(event)");

  dragDown.setAttribute("ondrop","drop_handler_down(event)");
  dragDown.setAttribute("ondragover","dragover_handler(event)");
}





/**
 * 
 * @param {String} type 
 * @returns Object
 */
function create(type){
  const el = document.createElement(type);
  return el;
}

/**
 * 
 * @param {String} id 
 * @returns Object
 */
function getId(id){
  const el = document.getElementById(id);
  return el;
}

/**
 * 
 * @param {String} parent 
 * @param {String} child 
 */
function append(parent,child){
  parent.appendChild(child);
}

//fonction affichechar qui affiche toutes les icones des characteres

//fonction afficheitem qui affiche toutes les icones des items

//fonction addchar ajoute dans char le charactere debloquer (vert)

//fonction additem ajoute dans item l'objet debloquer

//fonction dialogue

//init des variables (seq, blast, failure)
