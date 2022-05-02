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
 * 
 * @param {Array} char - contains alls the characters'update 
 * @param {Array} name - contains alls the characters'names 
 */
function addchar(char,name){
    //Show only the caractere that are in green
    let narch=getId('navchars');

    for(let j =0; j<char.length;j++){
        for(let i =0; i<CHARS.length;i++){
            if (char[j]==CHARS[i].id){
                let li = create('li');
                let a =create('a');
                let img =create('img');
            
                a.href ='#';
                a.setAttribute("ondragstart","dragstart_handler(event)");
                a.id=CHARS[i].id;
                a.title=CHARS[i].id;
                img.setAttribute("class","open");
            
                img.src=CHARS[i].url;
                img.id=CHARS[i].id;
                img.draggable ='true';
                img.width=80;
            
            
                append(a,img);
                append(li,a);
                append(narch,li);
                img.title = name[j];
            }
        }
    }
}

/**
 * 
 * @param {Array} array - contains alls the items'update 
 * @param {Array} type - contains alls the items'type
 */
 function additem(array,type){
    //Show the items
    let narIt=getId('navitems');

    for(let j =0; j<array.length;j++){
        for (let i=0; i<DECKS.length;i++){
            if(type[j]===DECKS[i]['deck']){
                let deck=DECKS[i]['collection']; 
                for(let y=0;y<deck.length;y++){
                    if (array[j]===deck[y]['id']){

                        let li = create('li');
                        let a = create('a');
                        let p = create('p');
                    
                        a.href='#';
                        a.id=deck[y]['id'];
                        a.setAttribute("ondragstart","dragstart_handler(event)");
                    
                        p.setAttribute("class","open");
                        p.textContent=type[j];
                        p.title=deck[y]['name'];
                    
                        li.setAttribute("class","small item");
                    
                        append(a,p);
                        append(li,a);
                        append(narIt,li);
                    }
                }

            }
        }
    }
}


/**
 * 
 * @param {Object} data - format JSON
 */
 function dialog(text){
    let p= getId('dialogue');
    p.textContent = text;
}


function cleanDragAndDrop(){
    //Clear the img of the target darg and drop

    let zone1=getId('zone1');
    let zone2 = getId('zone2');
    let input1 = getId('Retour1')
    let input2 = getId('Retour2');
    
    input2.addEventListener('click', updateRetour2);
    input1.addEventListener('click',updateRetour1);
    
    function updateRetour2() {
      if (zone2.src != '../assets/icons/question-square.svg') {
        zone2.src = '../assets/icons/question-square.svg';
        zone2.alt ='';
        zone2.title='';
      }
    }

    function updateRetour1(){
        if (zone1.src != '../assets/icons/person-bounding-box.svg') {
            zone1.src = '../assets/icons/person-bounding-box.svg';
            zone1.alt ='';
            zone1.title ='';
            }
    }
}

/**
 * 
 * @param {String} identifiant - an id 
 * @returns Object
 */
function itemFindId(identifiant){
    //Find un item based on is id and return the item
    for(let i=0;i<DECKS.length;i++){
        let deck=DECKS[i]['collection'];
        for (let j=0;j<deck.length;j++){
            if(identifiant===deck[j]['id']){
                return deck[j];
            }
        }
    }
}

/**
 * 
 * @param {String} identifiant - an id 
 * @returns Object
 */
function charsFindId(identifiant){
    //Find un Character based on is id and return the character
    for(let i=0;i<CHARS.length;i++){
        if (identifiant==CHARS[i]['id']){
            return CHARS[i];
        }
    }
}

//Change the language for the game - TO DO
function language(){
    let btn = getId('monselect');
    btn.addEventListener('click', updateBtn);

    function updateBtn() {
    if (btn.value === 'fr') {
        return btn.value;
    } else if (btn.value === 'en') {
        return
    }else {
        console.log('demat');
    }
    }
    return btn.value;
}
