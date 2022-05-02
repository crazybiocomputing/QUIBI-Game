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
 * Louis Texier
 * Léa Chabot
 * Bluwen Guidoux D'Halluin
 * Fatoumata Mangane
*/

'use strict';

/**
 * 
 * @param {Object} data - in format JSON
 * @param {String} language
 */
function intro(data,language){
    let el =data['gamers'][0]["settings"]['intro']['update']
    let text= data['gamers'][0]["settings"]['intro'][language];
    for (let i =0; i<el.length;i++){
        let func = el[i]['func'];
        switch(func){
            case "addchar" : let els =el[i]['args']; let name = el[i]['name'];addchar(els,name); break;
            case "additem" : let array = el[i]['args'];let type = el[i]['type']; additem(array,type);break;
        }
    }
    dialog(text);
}

/**
 * 
 * @param {Array} array - contains the id of the drag and drop result 
 * @param {Object} data - in format JSON
 * @param {String} language 
 */
function interaction(array,data,language){
    let el = data['gamers'][0][array[0]]['about'];
    for(let i = 0; i<el.length;i++){
        let dest=el[i]['dest'];
        if (dest === array[1]){
            let update = el[i]['update'];
            let text = el[i][language];
            for (let j =0; j<update.length;j++){
                let func = update[j]['func'];
                console.log(func)
                console.log(update[j]['args']);
                switch(func){
                    case "addchar" : let els =update[j]['args']; let name = update[j]['name'];addchar(els,name); break;
                    case "additem" : let array = update[j]['args'];let type = update[j]['type']; additem(array,type);break;
                }
            }
            dialog(text);
        }
    }
}

/**
 * 
 * @param {Object} data - in format JSON
 * @param {String} language 
 */
function checkDragAndDrop(data,language){
    //Check the drag and drop and show the interactions bettween two cards
    let btn = getId('chek');
    btn.addEventListener('click', chek);

    function chek(){
        let el =returnId();
        if(el === undefined){
            alert("There is no card or the card is misplaced");
            return;
        }
        if(el.length==1){
            alert("There is only one card");
            return;
        }
        interaction(el,data,language);
    }
}
/**
 * 
 * @returns Array - contains the id of the drag and drop result 
 */
function returnId(){
    let el = getId('zone1');
    let el_down =getId('zone2');
    if (el.title==''){
        return;
    }
    let array=[];
    array.push(el.title);
    if(el_down.title===''){
        return array;
    }else{
        array.push(el_down.title);
        return array;
        
    }
}