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
                        let div = create('div');
                        let a = create('a');
                        let p = create('p');
                    
                        div.id = deck[y]['id'];
                        div.setAttribute("class","small item");
                        //a.setAttribute("class","small item");
                        a.href='#';
                        a.id=deck[y]['id'];
                        a.setAttribute("ondragstart","dragstart_handler(event)");
                    
                        p.setAttribute("class","open");
                        p.textContent=type[j];
                        p.title=deck[y]['name'];
                    
                        //li.setAttribute("class","small item");
                    
                        append(a,p);
                        append(div,a);
                        append(li,div);
                        append(narIt,li);
                    }
                }

            }
        }
    }
}


/**
 * 
 * @param {String} text
 */
 function dialog(text){
    let p= getId('dialogue');
    p.textContent = text;
}

/*
function cleanDragAndDrop(){
    //Clear the img of the target darg and drop

    let zone1=getId('zone1');
    let zone2 = getId('zone2');
    let input1 = getId('Retour1')
    let input2 = getId('Retour2');
    
    input2.addEventListener('click', updateRetour2);
    input1.addEventListener('click',updateRetour1);

    
    function updateRetour2() {
      if (zone2.src != '../assets/icons/question-square.svg' || zone2.title !='') {
        zone2.src = '../assets/icons/question-square.svg';
        zone2.alt ='';
        zone2.title='';
        zone2.setAttribute("class","");
      }
    }
    function updateRetour1(){
        if (zone1.src != '../assets/icons/person-bounding-box.svg') {
            zone1.src = '../assets/icons/person-bounding-box.svg';
            zone1.alt ='';
            zone1.title ='';
            }
    }
}*/

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
/**
 * 
 *  @param {Object} data - format JSON
 * @returns Array contains string of the interaction's time cost
 */
function setTime(data){
    //collect the interaction's time cost
    let timeCost=[];
    let move = data['settings']['timecost']['move'];
    let interrogate = data['settings']['timecost']['interrogate'];
    timeCost.push(move);
    timeCost.push(interrogate);
    return timeCost; 
}
/**
 * 
 * @param {Object} data - format JSON
 */
function startTime(data){
    //Show the time when the sernario start
    let time = data['gamers'][0]['settings']['starttime'];
    let showtime = getId('showtimes');
    showtime.textContent=time;
}

/**
 * 
 * @param {Array} array - contains string of the interaction's time cost
 * @param {String} typeUpdate - indicate the type of interaction
 */
function updateTime(array,typeUpdate){
    //uptdate the time of the game
    let showtime = getId('showtimes');
    let time = showtime.textContent;
    let newtime="";
    let days="";
    let hour="";
    let minutes="";
    for(let i =0; i<2; i++){
        days+=time[i];
    }
    for(let i =3; i<5; i++){
        hour+=time[i];
    }
    for(let i =6; i<8; i++){
        minutes+=time[i];
    }

    if(typeUpdate==="move"){
        let addTime = array[0];
        let cal;
        cal = Number(minutes)+Number(addTime);
        let change = cal.toString();
        if (change.length==1){
            let text=minutes[0]+cal.toString();
            minutes=text;
        }else{
            let text=cal.toString();
            minutes=text;
        }
    }

    if(typeUpdate==='interrogate'){
        let addTime = array[1];
        let cal;
            cal = Number(minutes)+Number(addTime);
            let change = cal.toString();
            if (change.length==1){
                let text=minutes[0]+cal.toString();
                minutes=text;
            }else{
                let text=cal.toString();
                minutes=text;
            }
        }else{
            cal = Number(minutes+addTime);
            minutes= cal.toString();
        }
    
    if(minutes[0]==='6'){
        minutes='00';
        let cal = Number(hour)+1;
        let change = cal.toString();
        if (change.length==1){
            let text=hour[0]+cal.toString();
            hour=text;
        }else{
            let text=cal.toString();
            hour=text;
        }
    }
    if(hour==='24'){
        hour='00';
        let cal = Number(days)+1;
        let change = cal.toString();
        if (change.length==1){
            let text=days[0]+cal.toString();
            days=text;
        }else{
            let text=cal.toString();
            days=text;
        }
    }
    if(days==='99'){
        days='00';
        hour='00';
        minutes='00';
        alert("Retour dans le passé");
    }

    days+=":";
    hour+=":";

    for(let i =0; i<3; i++){
        newtime+=days[i];
    }

    for(let i =0; i<3; i++){
        newtime+=hour[i];
    }

    for(let i =0; i<2; i++){
        newtime+=minutes[i];
    }

    showtime.textContent = newtime;
}

/**
 * 
 * @param {Array} char 
 * @returns Booleans
 */
function noDuplicationChar(char){
    for(let j =0; j<char.length;j++){
    let a = getId(char[j])
    if (a === null){
        return true
    }else{
        return false
    }            
    }
}

/**
 * 
 * @param {Array} item 
 * @returns Booleans
 */
function noDuplicationItem(item){
    for(let j =0; j<item.length;j++){
    let a = getId(item[j])
    if (a === null){
        return true
    }else{
        return false
    }            
    }
}

/////////For the variable/////////

/**
 * 
 * @param {Objects} data - in forma Json 
 */
function initValue(data){
    //Init the variable for the game
    let variables = data['gamers'][0]['settings']['variables'];
    for(let i=0; i<variables.length;i++){
        let variable =variables[i]['var'];
        let value=variables[i]['value'];

        let stock = getId('value');

        let span = create('span');

        span.id=variable;
        span.setAttribute("title",value);

        append(stock,span);

    }
}

/**
 * 
 * @param {String} type - the name of the variable
 * @param {String} value - the value you want for the variable
 * @param {String} code  - a unique code
 */
function addvalue(type,value,code){
    //adds the new value with the old one and create a span that take a unique code to memorise the action
  let variable = getId(type);
  let new_value = Number(variable.title)+Number(value);
  variable.title =new_value;
  let span = create('span');
  span.id=code;
  append(variable,span);
}

/**
 * 
 * @param {String} type - the name of the variable
 * @param {String} value - the value you want for the variable
 * @param {String} code  - a unique code
 */
function transformvalue(type,value,code){
    //Transform the value of the variable and create a span that take a unique code to memorise the action
    let variable = getId(type);
    variable.title =value;
    let span = create('span');
    span.id=code;
    append(variable,span);
}

/**
 * 
 * @param {String} type - the name of the variable
 * @param {String} value - the value you want for the variable
 * @returns Boolean
 */
function checkvalue(type,value){
    let variable = getId(type);
    console.log(variable.title);
    if(variable==null||variable==undefined){
        alert("erreur dans le scénario");
    }
    if(value===variable.title){
        return true;
    }
    return false;
}

/**
 * 
 * @param {String} code  - a unique code
 * @returns Boolean
 */
function noDuplicationvalue(code){
    //Chek if the code is allready used
    let variable = getId(code);
    if(variable===null){
        return true
    }else{
        return false;
    }
}

/**
 * 
 * @param {String} type - item's id
 * @returns Boolean
 */
function checkitem(type){
    //Check if the item was find
    let item = getId(type)
    if(item==null||item==undefined){
        return false;
    }
    return true;
}

function startGame(){
    //Init the game
    let start = getId('jeu');
    start.title="0";
}

function stopGame(){
    //Finish the game
    let start = getId('jeu');
    start.title="1";
}

function endtime(data){
    //Check the time limit of the game
    if(checkGame()){
        let time = data['gamers'][0]['settings']['endtime'];
        let showtime = getId('showtimes');
        if(showtime.textContent===time){
            stopGame()
            alert("Vous n'avez plus de temps");
        }
    }
}

function endGame(data,language){
    let el = data['gamers'][0]['settings']['endgame'];
    let valueRequire=el['require'];
    console.log("Fin");
    console.log(el['require'].length);
    let indicat = 0;
    for(let i = 0; i<valueRequire.length;i++){
            //let valueRequire=el[i]['require'];
            console.log(valueRequire);
            console.log(el[language]);
            //for(let j=0;j<valueRequire.length;j++){
                let func = valueRequire[i]['func'];
                switch(func){
                    case "checkvalue" : {
                        let type =valueRequire[i]['args'];
                        let value =valueRequire[i]['value'];
                        if(checkvalue(type,value)){
                            indicat =1;
                        }else{
                            indicat=0;
                        };
                        break;
                    };
                    case "checkitem" :{
                        let type = valueRequire[i]['args']
                        if(checkitem(type)){
                            indicat =1;
                        }else{
                            indicat=0;
                        };
                        break;
                    }
                }
                if(indicat==1){
                    alert(el[language]);
                    dialog(el[language]);
                    alert("You did it !");
                    stopGame();
                    return;
                }
            //}
    }
}

function checkGame(){
    //Check if the game is still in progress
    let start = getId('jeu');
    if(start.title==="1"){
        return false;
    }
    return true;
}