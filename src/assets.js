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

const DECKS = [
  {
    deck: 'NCBI',
    comment: 'NCBI Bioinformatics Tools',
    collection: [
      {
        id: 'item_01',
        name: 'blast',
        code:'IT01'
      },
      {
        id: 'item_02',
        name: 'blast2seq',
        code:'IT02'
      },
      {
        id: 'item_03',
        name:'primer-blast',
        code:'IT03'
      },
      {
        id: 'item_04',
        name:'Entrez',
        code:'IT04'
      },
      {
        id: 'item_05',
        name:'Databank',
        code:'IT05'
      },
      {
        id: 'item_06',
        name:'Organism',
        code:'IT06'
      },
      {
        id: 'item_07',
        name:'Date',
        code:'IT07'
      },
      {
        id: 'item_08',
        name:'Settings',
        code:'IT08'
      }
    ]
  },
  {
    deck: 'EMBOSS',
    comment: 'EMBOSS Bioinformatics Tools',
    collection: [
      {
        id: 'item_10',
        deck: 'EMBOSS',
        name:'needle',
        code:'IT10'
      },
      {
        id: 'item_11',
        deck: 'EMBOSS',
        name:'pepstats',
        code:'IT11'
      },
      {
        id: 'item_12',
        deck: 'EMBOSS',
        name:'primersearch',
        code:'IT12'
      },
      {
        id: 'item_13',
        deck: 'EMBOSS',
        name:'showseq',
        code:'IT13'
      },
      {
        id: 'item_14',
        deck: 'EMBOSS',
        name:'sixpack',
        code:'IT14'
      },
      {
        id: 'item_15',
        deck: 'EMBOSS',
        name:'transseq',
        code:'IT15'
      },
      {
        id: 'item_16',
        deck: 'EMBOSS',
        name:'water',
        code:'IT16'
      }
    ]
  },
  {
    deck: 'NGS',
    comment: 'NGS Bioinformatics Tools',
    collection: [
      {
        id: 'item_20',
        deck: 'NGS',
        name:'bowtie2',
        code:'IT20'
      },
      {
        id: 'item_21',
        deck: 'NGS',
        name:'bedtools',
        code:'IT21'
      },
      {
        id: 'item_22',
        deck: 'NGS',
        name:'samtools',
        code:'IT11'
      }
    ]
  },
  {
    deck: 'PHYLOGENY',
    comment: 'PHYLOGENY Bioinformatics Tools',
    collection: [
      {
        id: 'item_30',
        name:'clustalO',
        code:'IT30'
      },
      {
        id: 'item_31',
        name:'GBlocks',
        code:'IT31'
      },
      {
        id: 'item_32',
        name:'TCoffee',
        code:'IT32'
      },
      {
        id: 'item_33',
        name:'Muscle',
        code:'IT33'
      }
    ]
  },
  {
    deck: 'BASH',
    comment: 'BASH Commands',
    collection: [
      {
        id: 'item_50',
        name:'cd',
        code:'IT50'
      },
      {
        id: 'item_51',
        name:'ls',
        code:'IT51'
      },
      {
        id: 'item_52',
        name:'pwd',
        code:'IT52'
      },
      {
        id: 'item_53',
        name:'cat',
        code:'IT53'
      },
      {
        id: 'item_54',
        name:'cut',
        code:'IT54'
      },
      {
        id: 'item_55',
        name:'grep',
        code:'IT55'
      },
      {
        id: 'item_56',
        name:'head',
        code:'IT56'
      },
      {
        id: 'item_57',
        name:'mkdir',
        code:'IT57'
      },
      {
        id: 'item_58',
        name:'mv',
        code:'IT58'
      },
      {
        id: 'item_59',
        name:'printf',
        code:'IT59'
      },
      {
        id: 'item_60',
        name:'rm',
        code:'IT60'
      },
      {
        id: 'item_61',
        name:'seq',
        code:'IT61'
      },
      {
        id: 'item_62',
        name:'sort',
        code:'IT62'
      },
      {
        id: 'item_63',
        name:'tail',
        code:'IT63'
      },
      {
        id: 'item_64',
        name:'touch',
        code:'IT64'
      },
      {
        id: 'item_65',
        name:'tree',
        code:'IT65'
      },
      {
        id: 'item_66',
        name:'uniq',
        code:'IT66'
      },
      {
        id: 'item_67',
        name:'uniq -c',
        code:'IT67'
      },
      {
        id: 'item_70',
        name:'awk',
        code:'IT70'
      }
    ]
  },
  {
    deck: 'DEVICE',
    comment: 'Biophysical Devices',
    collection: [
      {
        id: 'item_101',
        name: 'spectrophotometer',
        code:'IV01'
      },
      {
        id: 'item_102',
        name: 'Mass Spectrometer',
        code:'IV02'
      }
    ]
  }
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

