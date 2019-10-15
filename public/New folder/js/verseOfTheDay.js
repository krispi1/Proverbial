"use strict";

/**
 * 👋
 * gksiele
 * sielekrisp@gmail.com
 * https://www.github.com/krispi1
 * 
 * **NOTHING BEATS EXPERIENCE**
**/

// toggle imports: one for node.js environment, one for browser
const Proverbs = require('../dataStore/ProverbsDataSet'); // for node.js 
//import Proverbs from '../dataStore/ProverbsDataSet.js'; // for browser

/**
 * 
 * The suitableVersesPool object holds arrays of indexes, 
 * essentially verse numbers of verses in each 
 * corresponding chapter.
 * 
 * day_1 corresponds to chapter_1, day_31 to chapter_31, etc
 * 
 * The verses are hand-picked to select only those that 
 * could make a good fit as a verse of the day
 * 
 * One shall be picked at random each day of the month
 * at GMT midnight and displayed at the front-end as the 
 * Verse Of The Day
 * 
 */

const suitableVersesPool = {

    "day_1": [7, 8, 10, 22, 23, 32],
    "day_2": [6, 7, 8, 10, 11, 12, 16, 20, 21, 22],
    "day_3": [1, 3, 5, 7, 9, 11, 13, 19, 21, 23, 26, 27, 29, 30, 31, 33, 34, 35],
    "day_4": [1, 6, 7, 11, 12, 13, 14, 18, 19, 24, 27],
    "day_5": [3, 5, 18, 20, 21, 22, 23],
    "day_6": [6, 11, 20, 23, 25, 26, 29, 32],
    "day_7": [1, 2, 4, 5, 25, 26, 27],
    "day_8": [5, 10, 11, 12, 13, 14, 17, 18, 20, 21, 27, 30, 32, 33, 34, 35, 36],
    "day_9": [1, 6, 7, 8, 9, 10, 11, 12],
    "day_10": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
    "day_11": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 27, 28, 29, 30, 31],
    "day_12": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28],
    "day_13": [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 14, 15, 16, 18, 19, 20, 21, 22, 24, 25],
    "day_14": [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35],
    "day_15": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15, 16, 17, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 31, 32, 33],
    "day_16": [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 16, 17, 18, 19, 20, 22, 23, 24, 25, 27, 28, 32],
    "day_17": [1, 2, 5, 9, 10, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
    "day_18": [2, 3, 6, 7, 8, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24],
    "day_19": [2, 3, 4, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 23, 25, 26],
    "day_20": [1, 3, 4, 5, 7, 10, 11, 13, 15, 17, 19, 20, 21, 22, 24, 27],
    "day_21": [1, 3, 4, 5, 6, 8, 9, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 30, 31],
    "day_22": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 22, 24, 26, 28, 29],
    "day_23": [1, 4, 6, 9, 10, 12, 13, 15, 17, 18, 20, 21, 22, 23, 24, 25, 26],
    "day_24": [1, 3, 5, 6, 7, 9, 10, 24, 25, 27, 28],
    "day_25": [2, 3, 4, 5, 6, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28],
    "day_26": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 26, 27, 28],
    "day_27": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24],
    "day_28": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 27, 28],
    "day_29": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27],
    "day_30": [5, 6, 8, 9, 10, 11, 17, 20, 25, 26, 27, 28, 32, 33],
    "day_31": [3, 4, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 20, 21, 22, 23, 25, 26, 27, 28, 30]

} // end suitableVersesPool

// keep track of GMT
let greenwichTime = null;
let GMT_dayOfMonth = null;

// keep track of local time
let local_dateNow = null;
let local_dateToday = null;
let local_dayOfMonth = null;
let local_fullDate = null;

// to store the day's corresponding chapter
let todaysChapterArray = null;

// we shall use this to properly randomize the verse number
local_dateNow = Date.now();

// get time at the GMT -- zero longitude
greenwichTime = new Date().toLocaleString("en-Us", {timeZone: "Africa/Accra"});
greenwichTime = new Date(greenwichTime);
GMT_dayOfMonth = greenwichTime.getDate();

function keepTime(){
    
    // keep track of GMT
    greenwichTime = new Date().toLocaleString("en-Us", {timeZone: "Africa/Accra"});
    greenwichTime = new Date(greenwichTime);
    //greenwichTime = greenwichTime.toLocaleTimeString();

    // generate a random verse number for the corresponding day at GMT midnight
    if(greenwichTime.getHours() === 0 && greenwichTime.getMinutes() === 0 && greenwichTime.getSeconds() === 0){
        generateVerseOfTheDay();
    }else{
        console.log(greenwichTime.toLocaleTimeString());
    }
    

}; // end keepTime

// update GMT with every second tick
//setInterval(keepTime, 1000);

// get local time
local_dateToday = new Date();
local_dayOfMonth = local_dateToday.getDate(); 
local_fullDate = local_dateToday.toDateString();

//console.log("local_dateNow: " + local_dateNow);
//console.log("local_dateToday: " + local_dateToday);
//console.log("timezoneOffset: " + local_dateToday.getTimezoneOffset());
//console.log("local_dayOfMonth: " + local_dayOfMonth);
//console.log("local_fullDate: " + local_fullDate); 
console.log("---------------");

/** generateRandomVerseNumber function
 * 
 * Grab the GMT_dayOfMonth and use it to generate
 * a verse from the chapter that corresponds to that
 * GMT_dayOfMonth in numbering...
 * i.e. day_17 corresponds to 17, i.e. chapter 17
 * 
 * The random verse number generated will be passed to
 * the generateVerseOfTheDay function
 * 
 */
function generateRandomVerseNumber(){

    let verseNumber = null;
    
    // find the day of the month that we are working 
    // with within the suitableVersesPool object
    for(let key in suitableVersesPool){
        if(key.endsWith(GMT_dayOfMonth)){
            todaysChapterArray = suitableVersesPool[key];
        };
    };

    let verseIndex = Math.floor(Math.random(Math.random(local_dateNow)) * todaysChapterArray.length);
    //console.log(`verseNumber: ${verseNumber}`);
    verseNumber = todaysChapterArray[verseIndex];
    //console.log(todaysChapterArray);
    //console.log("verseIndex: " + verseIndex);
    //console.log("verseNumber: " + verseNumber);

    return verseNumber;

}; // end generateRandomVerseNumber

/** generateVerseOfTheDay function
 * 
 * Consume generateRandomVerseNumber function then use its return 
 * value as today's verse number, "verseNumberToday".
 * We'll then use verseNumberToday to grab an actual verse from the 
 * Proverbs data set.
 * Return the verse. It shall be rendered at the front end
 * 
 */
function generateVerseOfTheDay(){

    let chapterToday = GMT_dayOfMonth;
    let verseNumberToday = generateRandomVerseNumber();
    
    // generate verse of the day dynamically
    let verseToday = Proverbs[chapterToday][chapterToday.toString()][verseNumberToday][verseNumberToday.toString()]; 
    verseToday = `${chapterToday}:${verseToday}`;
    
    return verseToday;

}; // end generateVerseOfTheDay

/** testPad IIFE
 * 
 * The IIFE below is my test pad 
 * It helps me speed up my test process & minimize errors
 * I paste in it anything I want to test 
 * I then comment out what I don't wanna see
 * 
 */
(
    function testPad(){

        console.log("greenwichTime: " + greenwichTime);
        console.log("GMT_dayOfMonth: " + GMT_dayOfMonth);
        console.log("GMT_localeString: " + greenwichTime.toLocaleString());
        console.log("GMT_hours: " + greenwichTime.getHours());
        console.log("GMT_minutes: " + greenwichTime.getMinutes());
        console.log("GMT_seconds: " + greenwichTime.getSeconds());
        
        /*console.log(generateVerseOfTheDay());
        console.log("----------------**");
        //generateRandomVerseNumber();
        console.log("todaysChapterArray: " + todaysChapterArray);
        console.log("todaysChapterArrayLength: " + todaysChapterArray.length); */
        //console.log("verseNumber: " + generateRandomVerseNumber());
        //console.log(todaysChapterArray.length);
        //console.log(Proverbs[0].ProverbsSummary);
        //console.log(">>--------------->");
        //keepTime();
        //generateRandomVerseNumber();
        //console.log(Proverbs[14].chapter_14[generateRandomVerseNumber()]);
        //console.log(Proverbs[0].ProverbsSummary);
        console.log(generateVerseOfTheDay());

    }
)(); // end testPad IIFE

//export default generateVerseOfTheDay;
module.exports = generateVerseOfTheDay; // for node.js