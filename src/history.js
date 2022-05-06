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
 * Convert a number into another base
 *
 * @param {string} string -  String containing the number to convert
 * @param {int} base_string -  Current base in which the string is
 * @param {int} base_convert -  Base for the conversion
 * @return {string} - String containing the new number
*/
function convert(string, base_string, base_convert){
    let conversion = parseInt(string,base_string).toString(base_convert).toUpperCase();
    return conversion;
}


/**
 * Create and set a cookie for the key 'hexadecimal'
 *
 * @param {string} value - String containing the history string
*/
function set_cookie(value){
    localStorage.setItem('history',value);
}

/**
 * Get the cookie for the key 'hexadecimal'
 *
 * @return {string} - String containing the hexadecimal number
*/
function get_cookie(){
    let cookie = localStorage.getItem('history')
    return cookie;
}


/**
 * Update the scenario and apply an id for each text
 *
 * @param {object} data - Object containing the scenario
 * @return {object} - Data with id apply
*/
function update_id_scenario(data){
    let count = 0;
    for (let i in data["gamers"]){
        for (let j in data['gamers'][i]){
            if (j.substring(0,4)=="char" ){
                for (let k in data['gamers'][i][j]){
                    if (k == "about"){
                        for (let l in data['gamers'][i][j][k]){
                            data['gamers'][i][j][k][l]["id"]=count;
                            count++;
                        }
                    }
                }
            }
        }
    }
    return (data);
}

function update_history(data, array, string){
    let j=0;
    let dest = 0;
    for (let i of data["gamers"][0][array[0]]["about"]){
        if (i["dest"]==array[1]){
            dest = j;
        }
        j++;
    }
    let id = data["gamers"][0][array[0]]["about"][dest]["id"];
    if (string.includes(id) != true){
        if (id.toString().length == 1){
            id="0"+id.toString();
        }
        string+=id.toString();
    }
    return (string);
}

function fill_history(string, data){
    let array = [[data['gamers'][0]['settings']['intro']['fr']],[data['gamers'][0]['settings']['intro']['en']]];
    if (string.length % 2 == 1){
      string = "0" + string;
    }
    console.log(string);
    for (let a=0; a<string.length; a+=2){
        for (let i in data["gamers"]){
            for (let j in data['gamers'][i]){
                if (j.substring(0,4)=="char" ){
                    for (let k in data['gamers'][i][j]){
                        if (k == "about"){
                            for (let l in data['gamers'][i][j][k]){
                                if (data['gamers'][i][j][k][l]["id"] == string.substring(a,a+2)) {
                                    array[0].push(data['gamers'][i][j][k][l]["fr"]);
                                    array[1].push(data['gamers'][i][j][k][l]["en"]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return (array);
}



function create_cookie_value(inventory, history){
    history = convert(history,10,16);
    let passphrase = "^"+history+"_"+inventory+"$";
    console.log(passphrase);
    return passphrase;
}

function transform_cookie(cookie){
    let array = [];
    if (cookie.substring(0,1)=="^" && cookie.substring(cookie.length - 1)=="$"){
        for (let i=0; i<cookie.length-1; i++){
            if (cookie.substring(i,i+1)=="_"){
                array.push(cookie.substring(1,i));
                array.push(cookie.substring(i+1,cookie.length-1));
            }
        }
    }
    array[1] = convert(array[1],16,2);
    array[0] = convert(array[0],16,10);
    return (array);
}

function loading(data,inventory,cookie){
    let array = transform_cookie(cookie);
    let array_2 = fill_history(array[0],data);
    console.log(array_2);
    //set_status(data,inventory,array[1]);
}

const sessionSaver = (name,ev) => {
  let passphrase = get_cookie();
  alert(passphrase);
}

const history = (name,ev) => {
  let data = readScenario('./bob_test5.json');
  data.then((value)=>{
    let passphrase = get_cookie();
    let array = transform_cookie(passphrase);
    let history = fill_history(array[0],value);
    let string = '';
    for (let i of history[0]){
      string+=i;
      string += "\r\n";
    }
    let el = document.getElementById('historian');
    el.textContent = string;
  });
}
