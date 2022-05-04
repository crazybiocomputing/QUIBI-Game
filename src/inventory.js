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
 * Update the status of the characters and items
 * 
 * 
 *  let status = {"char_01" : 0,
  "char_02" : 1,
  "char_03" : 0,
  "char_04" : 0,
  "item_101" : 0,
  "item_102" : 0,
  "item_103" : 1,
  "item_104" : 0,
  "item_105" : 0,
  };
 * 
 * @param {object} data -  Object containing the current status of the events
 * @param {array} array -  Array containing the status of the last action of the player
 * @return {object} - Object containing the new status of the events
*/
function update_inventory(array,data){
    for (let i in data) {
        console.log(i);
        if (array[0] == i){
            data[`${i}`] = 1;
        }
    }
    return data;
}

/** 
 * Creation of the hexadecimal number
 * 
 * @param {object} object -  Object containing the status of the events
 * @return {String} - String containing the hexadecimal number
*/
function create_hexadecimal_inventory(data){
    let binary = "";
    for (let i in data){
        binary += data[`${i}`].toString();
    }
    let hexa = convert(binary,2,16);
    return hexa;
}

/** 
 * Set the status of the event depending of the hexadecimal keep in the cookie 
 * 
 * @param {object} data - Object containing the scenario from the json file
 * @param {object} object -  Object containing the status of the events (Define object and status)
 * @param {string} hexadecimal -  String containing the hexadecimal number
*/
function set_status(data,object,hexadecimal){
    let j = 0;
    let binary = convert(hexadecimal,16,2);
    let str = "";
    let el =data['gamers'][0]["settings"]['intro']['update'];

    if (binary.length != Object.keys(object).length){
        for (let k=0; k<Object.keys(object).length-binary.length; k++){
            str += "0";
        }
        str += binary;
    }

    for (let i in object){
        console.log(i);
        console.log(str[j]);
        if ( i.substring(0,4) == "char" && str[j] == 1){
            let els =el[j]['args']; 
            let name = el[j]['name'];
            addchar(els,name);
        }
        if ( i.substring(0,4) == "item" && str[j] == 1){
            let array = el[i]['args'];
            let type = el[i]['type']; 
            additem(array,type);
        }
        j++;
    }
}