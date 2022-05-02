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

function dragstart_handler(ev) {
  // On ajoute l'identifiant de l'élément cible à l'objet de transfert
  console.log(ev.target.id);
  ev.dataTransfer.setData('application/my-app', ev.target.id);
  ev.dataTransfer.effectAllowed = 'copy';
  ev.dataTransfer.dropEffect = 'copy';
}

function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = 'copy';
}

function drop_handler_0(ev) {
  ev.preventDefault();
  // On obtient l'identifiant de la cible et on ajoute l'élément déplacé
  // au DOM de la cible
  const data = ev.dataTransfer.getData('application/my-app');
  const copyNode = document.getElementById(data).cloneNode(true);
  copyNode.id = `${data}_from`;
  console.log(data, ev.dataTransfer.dropEffect);
  if (ev.target.hasChildNodes()) {
    // Remove previous element
    ev.target.childNodes[0].remove();
  }
  const asset = CHARS.find((a) => a.id === data);
  ev.target.style.backgroundImage = `url(${asset.url}`;
}

function drop_handler_down(ev) {
  ev.preventDefault();
  // On obtient l'identifiant de la cible et on ajoute l'élément déplacé
  // au DOM de la cible
  const data = ev.dataTransfer.getData('application/my-app');
  const copyNode = document.getElementById(data).cloneNode(true);
  copyNode.id = `${data}_from`;
  console.log(data, ev.dataTransfer.dropEffect);
  if (ev.target.hasChildNodes()) {
    // Remove previous element
    ev.target.childNodes[0].remove();
  }
  let asset = CHARS.find((a) => a.id === data);
  if (asset === undefined){
    let asset= itemFindId(data);
    ev.target.alt= asset.name;
    ev.target.src="";
    ev.target.title=asset.id;
  }else{
    ev.target.src = asset.url;
    ev.target.title = asset.id;
  }
}
  

  function drop_handler_up(ev) {
    ev.preventDefault();
    // On obtient l'identifiant de la cible et on ajoute l'élément déplacé
    // au DOM de la cible
    const data = ev.dataTransfer.getData('application/my-app');
    const copyNode = document.getElementById(data).cloneNode(true);
    copyNode.id = `${data}_from`;
    console.log(data, ev.dataTransfer.dropEffect);
    if (ev.target.hasChildNodes()) {
      // Remove previous element
      ev.target.childNodes[0].remove();
    }
    let asset = CHARS.find((a) => a.id === data);
    if (asset === undefined){
      window.alert("Don't work")
    }else{
      ev.target.src = asset.url;
      ev.target.title = asset.id;
    }
  }
