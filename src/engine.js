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
 */

'use strict';


//Change the state of the class close to open
function addchar_0(data){
    let el =data['gamers'][0]["settings"]['intro']['update'][0]['args'];

    for(let j =0; j<=el.length;j++){
        for(let i =0; i<CHARS.length;i++){
            if (el[j]==CHARS[i].id){
                let img = getId(CHARS[i].id);
                img.setAttribute("class","open");
                img.titre = "Bob";
            }
        }
    }
}

//Show only the caractere that are in green
//Function used before the simplification
function addchar_1(data){
    let el =data['gamers'][0]["settings"]['intro']['update'][0]['args'];
    let name = data['gamers'][0]["settings"]['intro']['update'][0]['name'];
    console.log(name);
    let narch=getId('navchars');

    for(let j =0; j<el.length;j++){
        for(let i =0; i<CHARS.length;i++){
            if (el[j]==CHARS[i].id){
                let li = create('li');
                let a =create('a');
                let img =create('img');
            
                a.href ='#';
                a.setAttribute("ondragstart","dragstart_handler(event)");
                a.id=CHARS[i].id;
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

//Show only the caractere that are in green -transfrome for intro
function addchar(char,name){
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

/*
function additem_0(data){
    let el =data['gamers'][0]["settings"]['intro']['update'][1]['args'];
    let narIt=getId('navitems');

    for(let j =0; j<el.length;j++){
        let li = create('li');
        let a = create('a');
        let p = create('p');
    
        a.href='#';
        a.id=el[j];
        a.setAttribute("ondragstart","dragstart_handler(event)");
    
        p.setAttribute("class","open");
        p.textContent=el[j];
    
        li.setAttribute("class","small item");
    
        append(a,p);
        append(li,a);
        append(narIt,li);
    }
}
*/

/**
 * 
 * @param {Array} array - contiens alls the items'update 
 */
function additem_1(array){
    let narIt=getId('navitems');

    for(let j =0; j<array.length;j++){
        let li = create('li');
        let a = create('a');
        let p = create('p');
    
        a.href='#';
        a.id=array[j];
        a.setAttribute("ondragstart","dragstart_handler(event)");
    
        p.setAttribute("class","open");
        p.textContent=array[j];
    
        li.setAttribute("class","small item");
    
        append(a,p);
        append(li,a);
        append(narIt,li);
    }
}

/**
 * 
 * @param {Array} array - contiens alls the items'update 
 */
 function additem(array,type){
    let narIt=getId('navitems');

    for(let j =0; j<array.length;j++){
        for (let i=0; i<DECKS.length;i++){ //parcous DZCKS
            if(type[j]===DECKS[i]['deck']){ //si les types ici PAPER correspondent
                let deck=DECKS[i]['collection']; 
                for(let y=0;y<deck.length;y++){ //parcours le nombre d'item comrpris dans la partie paper
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
 * @param {Object} data 
 * @param {String} language 
 */
 function dialog_0(data,language){
    let art= getId('bubble');
    let p = create('p');
    p.textContent = data['gamers'][0]["settings"]['intro'][language];
    append(art,p);
}


/**
 * 
 * @param {Object} data 
 * @param {String} language 
 */
 function dialog(text){
    let art= getId('bubble');
    let p = create('p');
    p.textContent = text;
    append(art,p);
}

/**
 * Clear the img of the target darg and drop
 */
function cleanDragAndDrop(){
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
      }
    }

    function updateRetour1(){
        if (zone1.src != '../assets/icons/person-bounding-box.svg') {
            zone1.src = '../assets/icons/person-bounding-box.svg';
            zone1.alt ='';
            }
    }
}

//Find un item based on is id and return the item
function itemFindId(identifiant){
    for(let i=0;i<DECKS.length;i++){
        let deck=DECKS[i]['collection'];
        for (let j=0;j<deck.length;j++){
            if(identifiant===deck[j]['id']){
                return deck[j];
            }
        }
    }
}

//Change the language for the game
function language(){
    let btn = getId('monselect');

    btn.addEventListener('click', updateBtn);

    function updateBtn() {
    if (btn.value === 'fr') {
        console.log('bonjour');
    } else {
        btn.value = 'en';
        console.log('hello');
    }
    }
    return btn.value;
}



//verification du drag and drop

//init des variables interoge et interoger

//changement d'etat

//affichage dialogue (voir appel de fonction init dialogue)
