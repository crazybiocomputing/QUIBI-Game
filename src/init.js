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
  const scene = await fetchJSON(scenario);
  console.log(scene);
  const data = update_id_scenario(scene);
  
  let status = {"char_01" : 0,
  "char_02" : 1,
  "char_03" : 0,
  "char_04" : 0,
  "item_101" : 0,
  "item_102" : 0,
  "item_103" : 1,
  "item_104" : 0,
  "item_105" : 0,
  };
  let historyDialogues = "";

  // Create Game and GUI
  let obj =data;
  //TO DO

  let langue = language();

  //Show the localisation (TO DO only work for the intro)
  //showLoc(data);

  //initDrag();
  //initValue(data);

  //Load the intro of the interaction
  let time = intro(data,langue);

  //Clean the drag and drop
  cleanDragAndDrop();
  //let time = setTime(data);

  //Check the drag and drop and show the interactions bettween two cards
  checkDragAndDrop(data,langue,time,historyDialogues,status);
}



/**
 * 
 * @param {Object} data - in format JSON
 */
function showLoc(data){
  //Show the localisation
  let showlocs=getId('showlocs');
  let nameloc=getId('location');

  let loc = data['gamers'][0]["settings"]['location'];

  nameloc.title=loc.substring(4,7)+" Room "+loc.substring(8);

  showlocs.textContent="Bldg "+loc.substring(4,7)+" Room "+loc.substring(8);
}


function initDrag(){
  //add the function for the drag and drop

  let dragUp= getId("dropzone1");
  let dragDown=getId("dropzone2");

  dragUp.setAttribute("ondrop","drop_handler_top(event)");
  dragUp.setAttribute("ondragover","dragover_handler(event)");

  dragDown.setAttribute("ondrop","drop_handler_bottom(event)");
  dragDown.setAttribute("ondragover","dragover_handler(event)");
}


//Change the language for the game - TO DO
function language(){
  let btn = getId('monselect');
  /*btn.addEventListener('click', updateBtn);

  function updateBtn() {
  if (btn.value === 'fr') {
      //return btn.value;
  } else if (btn.value === 'en') {
      //return 
  }else {
      //console.log('demat');
  }
  }*/
  return btn.value;
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

async function readScenario(scenario){
  const scene = await fetchJSON(scenario);
  const data = update_id_scenario(scene);
  return data;
}