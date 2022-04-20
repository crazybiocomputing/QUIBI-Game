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

// Commentaire seulement en francais a modifier, present juste pour la comprehension lors de l'ecriture, a remettre en anglais
'use strict';

/*
 * Recupere l'objet et check les status, puis les place dans un string pour fabriquer le nombre binaire, puis le convertit en hexadecimal
 * 
 * Renvoie le nombre en hexadecimal
 */
function get_status(object){
    let binaire = "";
    for (let i=0; i<object.length; i++){
        if (object.status == 0 /*(ou false selon object)*/) {
            binaire+="0";
        }
        else {
            binaire+="1";
        }
    }
    let hexa = conversion(binaire);
    return hexa;
}

/*
 * Recupere un string d'un nombre binaire
 * 
 * parseInt(nb,base) transforme le nombre en entier de base 10, toString() le transforme en base 16 en string, toUpperCase() remplace les minuscules par des majuscules 
 * 
 * Renvoie le nombre en hexadecimal
 */
function conversion(binaire){
    let hexadecimal = parseInt(binaire,2).toString(16).toUpperCase();
    return hexadecimal;
}

/*
 * Recupere un string d'un nombre hexadecimal
 *  
 * Renvoie le nombre en binaire
 */
function conversion_2(hexadecimal){
    let binaire = parseInt(hexadecimal,16).toString(2);
    return binaire;
}

/*
 * Recupere le document et le nombre hexadecimal
 *  
 * Cree et place un cookie comprenant l'hexadecimal
 */
function set_cookie(document,hexadecimal){
    document.cookie = `hexadecimal=${hexadecimal}`;
}

/*
 * Recupere le document contenant le cookie
 *  
 * Cree et place un cookie comprenant l'hexadecimal
 */
function get_cookie(document){
    let cookie = document.cookie.split(";");
    let string = "";
    for (let i = 0; i < cookie.length; i++){
        string+=cookie[i];
    }
    return cookie;
}

/*
 * Recupere l'object avec les status et l'hexadecimal
 *  
 * Convertit l'hexadecimal en binaire puis set les status
 */
function set_status(object,hexadecimal){ // Definir object
    let nb = conversion_2(hexadecimal)
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

