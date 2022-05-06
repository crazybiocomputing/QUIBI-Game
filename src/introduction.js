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
            case "additem" : let array = el[i]['args'];let type = el[i]['type'];additem(array,type);break;
        }
    }
    dialog(text);
    startGame();
    startTime(data);
    showLoc(data);
    initValue(data);
    initDrag();
    let time = setTime(data);
    return time;
}

/**
 * 
 * @param {Array} array - contains the id of the drag and drop result 
 * @param {Object} data - in format JSON
 * @param {String} language 
 */
function interaction_naive(array,data,language){
    let el = data['gamers'][0][array[0]]['about'];
    for(let i = 0; i<el.length;i++){
        let dest=el[i]['dest'];
        if (dest === array[1]){
            let update = el[i]['update'];
            let text = el[i][language];
            for (let j =0; j<update.length;j++){
                let func = update[j]['func'];
                switch(func){
                    case "addchar" : {
                        let els =update[j]['args'];
                        if(noDuplicationChar(els)){
                            let name = update[j]['name'];
                            addchar(els,name);
                        };
                        break;
                    }
                    case "additem" : {
                        let array = update[j]['args'];
                        if(noDuplicationItem(array)){
                            let type = update[j]['type']; 
                            additem(array,type);
                        };
                            break;
                        }
                    case "addvalue" : {
                        let type = update[j]['args'];
                        let value =update[j]['value'];
                        let code = update[j]['code'];
                        if(noDuplicationvalue(code)){
                            addvalue(type,value,code);
                        };
                        break;
                    }
                    case "transformvalue" : {
                        let type = update[j]['args'];
                        let value =update[j]['value'];
                        let code = update[j]['code'];
                        if(noDuplicationvalue(code)){
                            transformvalue(type,value,code);
                        };
                        break;
                    }
                }
            }
            dialog(text);
        }
    }
}

/**
 * 
 * @param {Object} position - in format JSON
 * @param {String} language 
 */
function interaction(position,language){
    //Use when there is conditions
    let update = position;
    let text= language;
    for (let j =0; j<update.length;j++){
        let func = update[j]['func'];
        switch(func){
            case "addchar" : {
                let els =update[j]['args'];
                if(noDuplicationChar(els)){
                    let name = update[j]['name'];
                    addchar(els,name);
                };
                break;
            }
            case "additem" : {
                let array = update[j]['args'];
                if(noDuplicationItem(array)){
                    let type = update[j]['type']; 
                    additem(array,type);
                };
                    break;
                }
            case "addvalue" : {
                let type = update[j]['args'];
                let value =update[j]['value'];
                let code = update[j]['code'];
                if(noDuplicationvalue(code)){
                    addvalue(type,value,code);
                };
                break;
            }
            case "transformvalue" : {
                let type = update[j]['args'];
                let value =update[j]['value'];
                let code = update[j]['code'];
                if(noDuplicationvalue(code)){
                    transformvalue(type,value,code);
                };
                break;
            }
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
function require(array,data,language){
    //Check the requirement
    let el = data['gamers'][0][array[0]]['about'];
    let indicat = 0;
    for(let i = 0; i<el.length;i++){
        let dest=el[i]['dest'];
        if (dest === array[1]){
            let valueRequire=el[i]['require'];
            for(let j=0;j<valueRequire.length;j++){
                let func = valueRequire[j]['func'];
                switch(func){
                    case "checkvalue" : {
                        let type =valueRequire[j]['args'];
                        let value =valueRequire[j]['value'];
                        if(checkvalue(type,value)){
                            indicat =1;
                        }else{
                            indicat=0;
                        };
                        break;
                    };
                    case "checkitem" :{
                        let type = valueRequire[j]['args']
                        if(checkitem(type)){
                            indicat =1;
                        }else{
                            indicat=0;
                        };
                        break;
                    }
                }
                if(indicat==1){
                    interaction(el[i]['update'],el[i][language]);
                    return;
                }
            }
            }
        }
    if(indicat==0){
        interaction_naive(array,data,language);
        return;
    }
}

/**
 * 
 * @param {Object} data - in format JSON
 * @param {String} language
 * @param {Array} array - contient le temps (pour les actions)
 */ 
function checkDragAndDrop(data,language,array,string,inventory){
    //Check the drag and drop and show the interactions bettween two cards
    let btn = getId('chek');
    btn.addEventListener('click', chek);

    function chek(){
        if(checkGame()){
            let el =returnId();
            if(el === undefined){
                alert("There is no card or the card is misplaced");
                return;
            }
            if(el.length==1){
                alert("There is only one card");
                return;
            }
            require(el,data,language);
            updateTime(array,'interrogate');

            string = update_history(data, el, string);
            inventory = update_inventory(el,inventory);
            let hexaInventory = create_hexadecimal_inventory(inventory);
            let passphrase = create_cookie_value(hexaInventory, string);
            set_cookie(passphrase);

            endGame(data,language);
            endtime(data);
        }else{
            alert("End of the Game");
        }
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
