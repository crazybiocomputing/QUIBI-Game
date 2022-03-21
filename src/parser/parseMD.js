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

  // Constants for state
  const MD = {
    NONE: 0,
    SEPARATOR: 1,
    EOL: 2,
    COMMENT: 3,
    TOKEN: 4,
    FUNCTION: 5,
    MULTISTRING: 6,
    STRING: 7,
    WORD: 8,
    NUMBER: 9
  };
  Object.freeze(MD);
  
const reserved = ['addScore','isState','setState'];

/////////////////////::: T O K E N I Z E R ::://///////////////////

/**
 * Markdown Tokenizer
 */
const tokenize = (txt) => {

  // Predicates
  const isFirst = (symbol) => w => (w[0] === symbol);
  const isComment = isFirst('>');
  const isToken = isFirst('-');
  const isComparator = w => (w === '==');
  const isMultilineString = (w) => (w === '```');
  const isString = (w) => (w[0] === '\"' || w[0] === '\'');
  const isNumber = (w) => (!isNaN(Number(w)));
  const isSeparator = (w) => w.split('').every( ch => [' ','\t'].includes(ch) );
  const isEOL = (w) => w.split('').every( ch => ['\n'].includes(ch) );
  const isExpression = w => (w.indexOf('(') !== -1);
  const isFunction = (w) => w.split('(').filter( ww => reserved.includes(ww)).length > 0;
  const isWord = (w) => true;
  
  // Create Token
  // w ('-') and array[i+1] (sep) are removed.
  // Only array[i+2](key) is kept
  const basicToken = (type) => (w,i,array) => [{type: type,v:array[i+2]},i+2];
  
  // Create word
  const wordToken = (type) => (w,i,array) => [{type: type,v:w},i];

  
  // Create Numeric Token
  const numericToken = (type) => (w,i,array) => [{type: type,v:parseFloat(w)},i];
  
  // Create StringToken using Recursion
  const appendWord = (predicate,array,j,str='') => {
    let word = array[++j];
    str += word; // (predicate(word) === false) ? '' : word;
    return (predicate(word) === false) ? [j,str] : appendWord(predicate,array,j,str);
  }

  const stringToken = (type,predicate) => (w,i,array) => {
    let [j,v] = appendWord(predicate,array,i,w);
    // Remove first delimiter.s
    console.log(v);
    const cleaned = v.replace(/^\`\`\`\n|^\'|^\"/i,'').replace(/\n\`\`\`$|\'$|\"$/i,'');
    console.log(v,cleaned);
    return [{type,v:cleaned},j];
  }

  const keywords = [
    {
      predicate: isComment,
      newToken: stringToken(MD.COMMENT,word => word[0] !== '\n')
    },
    {
      predicate: isSeparator,
      newToken: wordToken(MD.SEPARATOR) 
    },
    {
      predicate: isEOL,
      newToken: wordToken(MD.EOL) 
    },
    {
      predicate: isToken,
      newToken: basicToken(MD.TOKEN)
    },
    {
      predicate: isMultilineString,
      newToken: stringToken(MD.MULTISTRING, word => (word !== '```') )
    },
    {
      predicate: isFunction,
      newToken: stringToken(MD.FUNCTION, word => (word[word.length-1] !== ')') )
    },
    {
      predicate: isString,
      newToken: stringToken(MD.STRING, word => (word[word.length-1] !== '\"' && word[word.length-1] !== '\'') )
    },
    {
      predicate: isNumber,
      newToken: numericToken(MD.NUMBER)
    },
    {
      predicate: isWord,
      newToken: wordToken(MD.WORD) 
    }
  ];

  const setToken = (words) => (index) => {
    let w = words[index];
    // Get Token corresponding to keyword
    const toks = keywords.reduce( (accu,kw) => {
      console.log('word',w);
      if (kw.predicate(w)) {
        accu.push(kw.newToken(w,index,words));
      }
      return accu;
    },[]);
    console.log(toks);
    // Add new Token. Only the first one because the last one is always `CIF.WORD`
    return toks[0]; // keyword.newToken(w,index,words);
  };
  
  ///// M A I N /////
  const words = txt.split(/(\s+)/);
  let tokens = [];
  let index = 0;
  let tok;
  const setTokenFrom = setToken(words);

  // TODO Use (tail) recursion
  while (index < words.length) {
    [tok,index] = setTokenFrom(index);
    tok.index = index;
    tokens.push(tok);
    index++;
  }
  console.info(tokens);
  return tokens;
}

/////////////////////::: P A R S E R ::://///////////////////

const DATASTRUCTS = {
  root : {
    props : ['game'],
    types : ['object']
  },
  game : {
    props : ['settings','loc','char','item','event'],
    types : ['object','array','array','array','array'],
    parent: 'game'
  },
  settings : {
    props : ['general','ending','var'],
    types : ['object','object'],
    parent: 'game'
  },
  char: {
    props: ['scan','state'], 
    types: ['array','array']
  },
  event: {
    props: ['trigger'], 
    types: ['array']
  },
  reference: {
    props: ['dummy'], 
    types: ['object']
  },
  item: {
    props: ['scan','state'], 
    types: ['array','array']
  },
  loc: {
    props: ['scan','state'], 
    types: ['array','array']
  },
  scan: {
    props: ['response'],
    types: ['array']
  },
  response: {
    props: ['require','update'],
    types: ['array','array']
  },
  ending: {
    props: ['dummy'],
    types: ['object']
  },
  general: {
    props: ['dummy'],
    types: ['object']
  },
  state: {
    props: ['dummy'],
    types: ['object']
  },
  when: {
    props: ['dummy'],
    types: ['object']
  },
  action: {
    props: ['dummy'],
    types: ['object']
  },
  trigger: {
    props: ['when','action'],
    types: ['object','object']
  }

};

/*
 * Get classname from keyword in heading 1,2,3,4
 */
const getClassName = (str, classes = ['game','settings','loc','char','item','event', 'var','reference','general','ending','question','scan','state','response','trigger','when','action']) => {
  return classes.find( klass => str.includes(klass));
}


const parseListItems = (txt) => {

  // Tokenize for multiline strings
  const toks = tokenize(txt).filter(tok => tok.type !== MD.SEPARATOR && tok.type !== MD.COMMENT);
  console.info(toks);

  let obj = {};
  let key = MD.NONE;
  toks.forEach( tok => {
    if (tok.type === MD.TOKEN) {
      // Remove useless bold and italic layout used in markdown
      key = tok.v.replaceAll('**','').replaceAll('_','');
    }
    else if (tok.type !== MD.SEPARATOR && tok.type !== MD.EOL && key !== MD.NONE){
      let [cat,prop] = key.split('.');
      if (prop) {
        if (cat in obj === false) {
          obj[cat] = {};
        }
        obj[cat][prop] = tok.v;
      }
      else {
        obj[cat] = tok.v;
      }
      key = MD.NONE;
    }
  });

  return obj;
}


const getParent = (obj,parentLevel) => {
  // HACK console.log('parent',obj.classname,obj.level,parentLevel);

  let parent = obj;
  while (parent.level !== parentLevel) {
    // HACK console.log(parent.level,parent.classname);
    parent = parent.parent;
  }
  // HACK console.log('parent',obj.classname,parent.classname,parentLevel);

  return parent;
}

/**
 *
 *
 * @author Jean-Christophe Taveau
 */
const parseBlock = (root,div) => {
  
  if (div.length === 0) {
    return root;
  }
  
  // Get level by counting the number of`#`
  const level = (div.slice(0,5).match(/\#/g) || []).length;
  // Get parent
  let parent = (level >= 1) ? getParent(root.lastnode,level-1) : root;

  // First row contains classname:title
  const idx = div.indexOf('\n');
  const obj = parseListItems(div);
  obj.level = level;
  obj.classname = getClassName(div.slice(0,idx));
  obj.parent = parent;
    
  console.log(`Level ${level} from parent "${parent.classname}" entitled "${div.slice(0,idx)}" with ${div.length} chars`);

  const index = DATASTRUCTS[parent.classname].props.indexOf(obj.classname);
  const type = DATASTRUCTS[parent.classname].types[index];
  const prop = obj.classname;
  console.log(`${JSON.stringify(DATASTRUCTS[parent.classname])}Type ${type}[${index}] Prop. ${prop}`,parent.classname,'>',obj.classname);
  if ( type === 'object') {
    parent[prop] = obj;
  }
  else { // Array
    if (!parent[`${prop}s`]) {
      parent[`${prop}s`] = [];
    }
    parent[`${prop}s`].push(obj);
  }

  root.lastnode = obj;
  return root;
}




const parseMD = (txt) => {
  const divs = txt.split('\n#');
  
  const scenario = divs.reduce( (accu,div) => {
    parseBlock(accu,div);
    console.log(accu);
    return accu;
  },{classname: 'root', level: 0});
  
  return scenario;
}

