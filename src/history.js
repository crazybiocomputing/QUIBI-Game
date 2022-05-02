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
 * Convert a binary number into hexadecimal
 * 
 * @param {string} binary -  String containing the binary number
 * @return {string} - String containing the hexadecimal number
*/
function convert_to_hexa(binary){
    let hexadecimal = parseInt(binary,2).toString(16).toUpperCase();
    return hexadecimal;
}

/** 
 * Convert a hexadecimal number into binary
 * 
 * @param {string} hexadecimal -  String containing the hexadecimal number
 * @return {string} - String containing the binary number
*/
function convert_to_binary(hexadecimal){
    let binary = parseInt(hexadecimal,16).toString(2);
    return binary;
}




/** 
 * Create and set a cookie for the key 'hexadecimal'
 * 
 * @param {string} hexadecimal - String containing the hexadecimal number
*/
function set_cookie(hexadecimal){
    localStorage.setItem('hexadecimal',hexadecimal.toString());
}

/** 
 * Get the cookie for the key 'hexadecimal'
 * 
 * @return {string} - String containing the hexadecimal number
*/
function get_cookie(){
    let cookie = localStorage.getItem('hexadecimal')
    return cookie;
}




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
function get_status(array,data){
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
function create_hexadecimal(data){
    let binary = "";
    for (let i in data){
        binary += data[`${i}`].toString();
    }
    console.log(binary);
    let hexa = convert_to_hexa(binary);
    return hexa;
}

/** 
 * Set the status of the event depending of the hexadecimal keep in the cookie 
 * 
 * @param {object} object -  Object containing the status of the events (Define object and status)
 * @param {string} hexadecimal -  Object containing the hexadecimal number
*/
function set_status(object,hexadecimal){
    let nb = convert_to_binary(hexadecimal)
    let string = toString(nb);
    if (nb.length != object.length){
        let diff = object.length - nb.length;
        for (let d = 0; d<diff; d++){
            string = "0" + string;
        }
    }
    for (let i=0; i < object.length; i++){
        if (string[i] == 0){
            object.status[i] = False; 
        }
        else {
            object.status[i] = True;
        }
        /* object.status[i] = string[i] si 0 et 1 utilise */
    }
}