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


function b_test1(data,language){
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