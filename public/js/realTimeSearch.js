"use strict"; // enforce strict mode for error checking

/**
 * 👋 
 * gksiele
 * sielekrisp@gmail.com
 * https://www.github.com/krispi1
 * 
 * **NOTHING BEATS EXPERIENCE**
**/

// toggle imports: one for node.js environment, one for browser
//const Proverbs = require('../dataStore/ProverbsDataSet'); // for node.js 
import Proverbs from '../dataStore/ProverbsDataSet.js'; // for browser

// declare/initialize variables & grab respective DOM elements 
let search = document.getElementById("search");
let searchResults = document.getElementById("searchResults");
let searchKey = null;
let chapter = null;
let verse = null;
let structuredVerse = null;
let dataSet = [];

// set search bar as the default active element
search.focus();
console.log(Boolean(searchKey));
// Initialize searchResults div with Proverbs summary by default
for (let key in Proverbs[0].ProverbsSummary) {
  searchResults.innerHTML += `<li>${key} : ${(Proverbs[0].ProverbsSummary[key])
    .toString()}</br></li>`;
}

// Watch out for keyboard input on the search bar
// Delay invocation of realTimeSearch by 1 second to facilitate
// ample time for reasonable input by the user
search.addEventListener("keyup", () => setTimeout(realTimeSearch, 500));

// construct an array out of the entire Proverbs book
function structureData() {

  // ''+i is used to implicitly cast i into a string
  for (let i = 1; i < Proverbs.length; i++) {
    for (let j = 1; j < Proverbs[i]['' + i].length; j++) {
      chapter = i;
      verse = Proverbs[i]['' + i][j]['' + j]; // access each verse of Proverbs dynamically
      //console.log(Proverbs[i][''+i][j][''+j]); // console log all Proverbs verses
      //console.log(`${chapter}:${verse}`);
      structuredVerse = `${chapter}:${verse}`;
      //console.log(structuredVerse);
      dataSet.push(structuredVerse);
    }
  }

  return dataSet;

} // end structureData

(
  // Cache the data locally in localStorage
  // Populate the dataSet array
  () => {
    localStorage.setItem('proverbsData', JSON.stringify(structureData()));
    if (!dataSet) {
      dataSet = localStorage.getItem(JSON.parse('proverbsData'));
    }
  }
)()

function realTimeSearch() {
  // grab a user's search input
  searchKey = search.value;
  let versesFound = []; // to hold results per search 

  console.log(searchKey);
  console.log(Boolean(searchKey));

  // Clear previous div results 
  searchResults.innerHTML = '';

  // capitalize either "god" or "lord"
  switch (searchKey.toLowerCase()) {

    case "god":
      search.value = "God";
      searchKey = "God";
      break;
    case "god ":
      search.value = "God ";
      searchKey = "God ";
      break;
    case " god":
      search.value = " God";
      searchKey = " God";
      break;
    case " god ":
      search.value = " God ";
      searchKey = " God ";
      break;
    case "lord":
      search.value = "Lord";
      searchKey = "Lord";
      break;
    case "lord ":
      search.value = "Lord ";
      searchKey = "Lord ";
      break;
    case " lord":
      search.value = " Lord";
      searchKey = " Lord";
      break;
    case " lord ":
      search.value = " Lord ";
      searchKey = " Lord ";
      break;
    default:
      searchKey = searchKey;
      break;

  } // end switch

  // For an unbiased comparison, we need to level the 
  // playground by turning both the searchKey and each 
  // verseFound below to capital letters temporarily 
  let ucSearchKey = searchKey.toUpperCase();
  // Loop through the entire dataSet and filter out verses that do not contain ucSearchKey
  // Populate versesFound with verses that contain the search term (ucSearchKey)
  dataSet.filter(verse => {
    if (verse.toUpperCase().indexOf(ucSearchKey) !== -1) {
      versesFound.push(verse);
    }
  });

  // Set search results title whenever some search results actually exist
  if (searchKey.length >= 1 && versesFound.length > 0) {
    searchResults.innerHTML = `Verses Containing '"<span style="color: orangered;"><strong>  
        ${searchKey}  </strong></span> "' : 
        ${versesFound.length}</br></br>`;
    console.clear(); 
    console.log(versesFound.length); // For debugging

    // Populate searchResults div with verses that contain
    // the given search term
    versesFound.map(verse => {
      searchResults.innerHTML += `<li>${verse}</li>`;
    })
  } 

  // No verses containing the given search term were found
  else if (searchKey.length >= 1 && versesFound.length === 0) {
    searchResults.innerHTML = `No Verses Containing '"<span style="color: orangered;"><strong>  
        ${searchKey}  </strong></span> "' Were Found!`;
  }
  
  else if (searchKey.length === 0) {
    // Initialize searchResults div with Proverbs summary by default
    searchResults.innerHTML = "";
    for (let key in Proverbs[0].ProverbsSummary) {
      searchResults.innerHTML += `<li>${key} : ${(Proverbs[0].ProverbsSummary[key])
        .toString()}</br></li>`;
    }
  }

} // end realTimeSearch

/** testPad IIFE
 * 
 * I use this to:
 *     - test code bits fast
 *     - think through a possible solution
 * 
 */
(
  function testPad() {
    // console.log(Proverbs[2]); // yields entire chapter 2 object {2: Array(23)}
    // console.log(Proverbs[2][''+2]); // yields entire chapter 2 array of objects
    // console.log(Proverbs[2][''+2].length); // yields chapter 2 array's length: 23

    for (var i = 1; i < Proverbs[2]['' + 2].length; i++) { // loop through chapter 2 array
      // console.log(Proverbs[2][''+2][i]); // console log each [verse object] within chapter 2 array
      // console.log(Proverbs[2][''+2][i][''+i]); // console log each [verse] within chapter 2 array
    }
  }
)(); // end testPad IIFE

export default realTimeSearch;
//module.exports = realTimeSearch;