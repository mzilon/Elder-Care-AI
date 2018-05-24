/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.ad138521-682f-4da1-90a3-ac6d42749e14';

const SKILL_NAME = 'New York Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a New York fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [
    'New York is the third most populous state in the United States after California and Texas. Of its population of 19 million, a little over 8 million live in New York City alone. In fact, about 1 in every 38 people in the U.S. lives in New York City, and more people live in New York City than in Australia and Switzerland combined.',
'While New York City is the largest city in New York, the state capital is actually Albany, which has 1/80 the population of New York City.', 
'Albany, the state capital of New York, is known as the city of many names. The original inhabitants, the Mohicans, called the city PempotowwathutMuhhcanneuw, or "the 1st fireplace of the Mohican nation," while the Dutch called it Beverwijck or "Beaver District." In 1664, the English would name the city after the Duke of Albany.',
'The New York capitol building in Albany took 28 years (1867–1899), 5 different architects, and over $25 million to build. Composed of granite, the building has 5 floors total and a Million Dollar Staircase with 300 carved stone portraits of famous New Yorkers and others.',
'New York City, New York, is the most linguistically diverse city with over 800 languages spoken, and 4 in 10 households speak a language other than English.',
    'The Woodstock Music Festival was actually held on a dairy farm in Bethel, NY, after the towns of Woodstock and Wallkill refused to host it. The festival took place for three days in August 1969 with 400,000 people attending.',
'Lake Placid, NY, is the only U.S. city to have hosted the Winter Olympics twice, first in 1932 and again in 1980.',
'According to a report in November 2015, New York is the second safest state in the U.S. to drive in after Massachusetts, with 6.1 deaths per 100,000 state residents; 1,199 automobile-related deaths in 2013; and 91% of New Yorkers choosing to wear their seatbelts, which is above the national average of 87%.',
'In 1848, the first womens rights convention in the United States was held in Seneca Falls, NY, officially starting off the fight for womens rights. Women would win the right to vote in New York in 1917.',
'A 2015 study found that New York is the 13th best state to live in, with one of the factors being an average income of $58,878 per year, which is the 16th highest in the United States.',
'New York was the 6th state to legalize same-sex marriage when Governor Cuomo passed the Marriage Equality Act on June 4, 2011. After the act was passed, 823 same-sex couples were married in New York City alone.',
'Due to struggles with the potato famine and political issues, by 1850 more native-born Irish lived in New York City, NY, than in Dublin, Ireland. New York City is still home to more people of Irish ancestry than Irelands capital city.',
'New Yorkers bite 10 times more people than sharks do worldwide each year.',
'With 54,556 square feet, New York is the 27th largest state in the United States. The state of Rhode Island would fit into New York more than 35 times.',
'Adirondack Park in northeast New York has 6 million acres, making it the largest national park in the United States. It is larger than Yellowstone, Glacier, Everglades, and Grand Canyon National Parks combined.',
'Niagara Falls State Park was the first state park in the United States when New York made it the Niagara Reservation in 1885. The three falls cascade 150,000 gallons of water over 176 feet and attract 12 million visitors each year.',
'The Niagara River has two hydroelectric plants that are capable of producing 2.5 million kilowatts of energy, which is enough to power the state of New York and the province of Ontario, Canada.',
'The worlds smallest church is found in Oneida, NY. The Cross Island Chapel is 51" x 81", making it large enough to sit two people.',
'With 18,000 cattle and calf farms, New York state is the third leading producer of dairy products in the United States.',
'From 1886 to 1924, over 14 million immigrants entered through New York harbor into the United States. About 40% of Americans can trace at least one ancestor to Ellis Island.',
'In 1901, New York was the first state to require all automobiles to have license plates. However, the plates were not issued by the state but were made by the owner and were required to have the owners initials.',
'The state of New York has produced more governors than any other state in the U.S. With 116 governors claiming New York as their birth state, Virginia is a distant second with only 78.',
'In 1971, the bloodiest prison rebellion to ever take place in the United States happened at the Attica State Correctional Facility in Attica, New York. A total of 43 inmates and officers lost their lives during the riot.',
'Oysters were such a popular food item in New York in the 19th century that the shells were actually used to pave Pearl Street in New York City. They were also used for lime for the masonry of the Trinity Church.',
'New York is known as the "Empire State" due to its growth and prosperity early in its history. George Washington is said to have seen New York as "the seat of the empire."',
'The Genesee River of New York is one of only 33 rivers in the world that runs from south to north.',
'The September 11, 2001, terrorist attacks on the World Trade Center in New York City were the worst single foreign assault on American soil. The attack was the nations deadliest tragedy for U.S. firefighters, and 2,753 people in total lost their lives.',
'In 2012, Hurricane Sandy took the lives of 150 people along the Atlantic Coast, about 50 of which were New Yorkers. Large portions of New York City lost electricity, 650,000 homes and businesses were lost, and the total damages were about $68 billion, with $33 million of the damage in New York state.',
'If the state of New York were its own country, its economy would rank 15th in the world, being slightly smaller than the economies of Canada and Spain. New Yorks economy ranks 3rd in the United States, after California and Texas.',
'France gifted the Statue of Liberty to the United States in 1886 as a celebration of 100 years of U.S. independence and continued allegiance between the two countries. The statue was shipped as 350 pieces in 214 crates and took 4 months to assemble at its current home on New York’s Ellis Island.',
'The New York Stock Exchange is the largest exchange in the world, with a trading volume of $5.5 million. The second largest is the NASDAQ, which is also located in New York.',
"New York City's Federal Reserve Bank has the largest gold storage in the world. The vault is 80 feet below street level and contains $90 billion in gold.",
'The state of New York disposes of nearly 23 million tons of trash each year. New York city alone sends a 9-mile-long fleet of trucks of trash each day to sites up to 300 miles away.',
'Chittenango, NY, is the home of The Wizard of Oz author L. Frank Baum. The town has yellow brick sidewalks that lead up to The Wizard of Oz themed businesses, such as Auntie Ems, as well as an annual Munchkins parade.',
'The New York Yankees have won baseball’s World Series 27 times as of 2015, which is the most of any other baseball team.',
'The Bronx Zoo in New York is the largest city zoo in the United States with over 500 species and 4,000 animals.',
'In the 16th century, six Native American nations formed the Iroquois League in New York State, creating the oldest active democracy in the world. Many ideas were taken from it to form the government of the United States, such as federalism, elected representatives, caucuses, and impeachment.',
'The popular belief that Dutch settlers bought Manhattan Island from Natives in 1626 comes from a letter called the "Schaghenbrief” composed by Pieter Schager to leaders in Amsterdam. While the letter does mention that the island was purchased for 60 guilders (about US$24), it does not mention any involvement of the director of the colony, Peter Minuit.',
'In 1664, the English took the territory of New Amsterdam from the Dutch settlers living there. King Charles II named the territory New York after his brother the Duke of York and gave it to him as a gift.',
'New York was the 11th state in the United States and was a part of the original 13 colonies. New York City was the first capital of the nation from 1789 to 1790, and George Washington was inaugurated as the first U.S. president in the city’s Federal Hall on Wall Street on April 30, 1789.',
'A third of the military engagements during the Revolutionary War took place in New York. During the war, 30,00 people left New York to escape the conflicts.',
'The New York Public Library has over 50 million books and other items and is the second largest library system in the nation after the Library of Congress. It is also the 3rd largest library in the world.',
'The first railroad in the United States ran 11 miles in New York, from Albany to Schenectady.',
'During WWII, President Franklin D. Roosevelt invited 982 refugees to stay in a holocaust refugee shelter called Safe Haven in Oswego, NY. The refugees consisted of survivors of concentration camps that had skills that would contribute to the refugee shelter. The president also had to promise that the refugees would return to their home country after the war, but many of the families gained clearance to stay in America.',
'Oneida, NY, was home to the Oneida Community from 1848 to 1880, a utopian society founded by John Humphreys. The 300 members of the community practiced abandonment of the self for the good of the whole, with men and women working side by side sharing all labor, property, and responsibility. Complex marriage was practiced, with each man being the husband of every woman and vice versa, and reproduction was heavily monitored with certain men and women being chosen to have children together. The children stayed with their moms until they could walk, at which time they would be placed in the community nursery.',
'After WWII, the United Nations headquarters was established in New York City in 1952.',
'The New York Post, established by Alexander Hamilton in 1803, is the longest-running newspaper in the United States.',
'According to a report by CNBC, New York was the 3rd most expensive state to live in for the year 2014, after Hawaii and Connecticut. The average price of a home in New York that year was $1.3 million, the highest in the United States.',
'New York is the home of many inventions, including toilet paper and chewing gum. Rochester, NY, alone was the birthplace of marshmallows, Jell-O, Frenchs Mustard, baby shoes, gold teeth, mail chutes, and bloomers.',
'Famous New Yorkers include Billy Joel, Alicia Keys, Jennifer Lopez, Mariah Carey, Arthur Miller, Denzel Washington, Adam Sandler, Vera Wang, Kareem Abdul-Jabaar, Lou Gehrig, Eleanor Roosevelt, Theodore Roosevelt, Franklin D. Roosevelt, Lucille Ball, Tom Cruise, Washington Irving, Norman Rockwell, Michael Jordan, Herman Melville, Aaron Copland, George Gershwin, Maria Callas, Barbara Streisand, Walt Whitman, The Marx Brothers, and many more.',

];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.attributes.lastSpeech = randomFact // by adding the last fact to the session attributes, we can use it to repeat it if asked by the user.
        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput + " Do you want to hear another fact?").listen(" Do you want to hear another fact?"); // addig the  + " Do you want to hear another fact?" section allows the skill to continue. the .listen also added
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.RepeatIntent': function () {
        this.response.speak(this.attributes.lastSpeech + " Do you want to hear another fact?").listen(" Do you want to hear another fact?"); // addig the  + " Do you want to hear another fact?" section allows the skill to continue. the .listen also added
        this.emit(':responseReady');
    },
      'AMAZON.YesIntent': function () {
        this.emit('GetNewFactIntent');
    },
    'AMAZON.NoIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
