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

/**
 * Asynchronously Read JSON Scenario
 *
 */
async function fetchJSON(url) {
  const response = await fetch(url);
  return response.json();
}

/**
 * Asynchronously Read Markdown Scenario
 * TODO
 */
async function fetchMD(url) {
  const response = await fetch(url);
  const txt = response.text();
  /*
  const data = parseMD(txt);
  return data;
  */
}

/**
 * Init game from `scenario`
 * To run this example, type in QUIBI-Game
 * `python3 -m http.server 8888`
 */
async function init(scenario) {
  console.log('init');
  // Load scenario in format JSON or Markdown
  const data = await fetchJSON(scenario);
  console.log(data);
  // Create Game and GUI
}
