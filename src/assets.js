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

const ITEMS = [
  /* Items Bioinformatics Tools */
  {
    id: 'item_01',
    category: 'NCBI',
    name: 'blast',
    code:'IT01'
  },
  {
    id: 'item_02',
    category: 'NCBI',
    name: 'blast2seq',
    code:'IT02'
  },
  {
    id: 'item_03',
    category: 'NCBI',
    name:'primer-blast',
    code:'IT03'
  },
  {
    id: 'item_04',
    category: 'EMBOSS',
    name:'needle',
    code:'IT04'
  },
  {
    id: 'item_05',
    category: 'EMBOSS',
    name:'pepstats',
    code:'IT05'
  },
  {
    id: 'item_06',
    category: 'EMBOSS',
    name:'primersearch',
    code:'IT06'
  },
  {
    id: 'item_07',
    category: 'EMBOSS',
    name:'showseq',
    code:'IT07'
  },
  {
    id: 'item_08',
    category: 'EMBOSS',
    name:'water',
    code:'IT08'
  },
  {
    id: 'item_20',
    category: 'NGS',
    name:'bowtie2',
    code:'IT20'
  },
  {
    id: 'item_21',
    category: 'NGS',
    name:'bedtools',
    code:'IT21'
  },
  {
    id: 'item_22',
    category: 'NGS',
    name:'samtools',
    code:'IT11'
  },
  {
    id: 'item_30',
    category: 'PHYLOGENY',
    name:'clustalO',
    code:'IT30'
  },
  {
    id: 'item_31',
    category: 'PHYLOGENY',
    name:'GBlocks',
    code:'IT31'
  },
  {
    id: 'item_32',
    category: 'PHYLOGENY',
    name:'TCoffee',
    code:'IT32'
  },
  {
    id: 'item_33',
    category: 'PHYLOGENY',
    name:'Muscle',
    code:'IT33'
  },
  {
    id: 'item_50',
    category: 'BASH',
    name:'cd',
    code:'IT50'
  },
  {
    id: 'item_51',
    category: 'BASH',
    name:'ls',
    code:'IT51'
  },
  {
    id: 'item_52',
    category: 'BASH',
    name:'pwd',
    code:'IT52'
  },
  {
    id: 'item_53',
    category: 'BASH',
    name:'cut',
    code:'IT53'
  },
  {
    id: 'item_54',
    category: 'BASH',
    name:'tree',
    code:'IT54'
  },

  /* Items Biophysical Devices */
  {
    id: 'item_101',
    category: 'DEVICE',
    name: 'spectrophotometer',
    code:'IV01'
  },
  {
    id: 'item_102',
    category: 'DEVICE',
    name: 'Mass Spectrometer',
    code:'IV02'
  },
];

const CHARS = [
  {
    id: 'char_01',
    code:'CH01',
    url:'assets/chars/char_01.svg'
  },
  {
    id: 'char_02',
    code:'CH02',
    url:'assets/chars/char_02.svg'
  },
  {
    id: 'char_01',
    code:'CH03',
    url:'assets/chars/char_03.svg'
  },
  {
    id: 'char_04',
    code:'CH04',
    url:'assets/chars/char_04.svg'
  },
];

