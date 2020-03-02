const fetch = require('node-fetch');
const { SEARCH_ENGINE_ID, GOOGLE_KEY, URL } = require('../config.json');

module.exports = {
    
    /**
     * Google Custom Search API
     * @author Rishabh jaishwal
     * @description Used to search keyword on google
     * @param query {string} <keyword> 
     * @param start {number} Starting record 
     * @param length {number} Count of record 
     * @param URL_NAME {string} Custom Search Google URL 
     * @param KEY {string} GOOGLE AUTH TOKEN 
     * @param ID {string} Search Engine ID 
     */
    searchApi: async (query = 'rishabh jaishwal', start = 0, length = 5, URL_NAME = URL, KEY = GOOGLE_KEY, ID = SEARCH_ENGINE_ID ) => {
            try {
            var searchedData = await fetch(`${URL_NAME}?key=${KEY}&q=${query}&cx=${ID}&num=${length}&start=${start}`);
            searchedData = await searchedData.text();
            searchedData = await JSON.parse(searchedData);
            searchedData = searchedData['items'];
            searchedData = searchedData ? searchedData.map(ele=> ele['link']) : ['No Result Found'];
            return Promise.resolve(searchedData);
            } catch(e) {
                console.log("GOT SOME ERROR!!!!!!!",e);
            }
    },

    /**
     * Recent Search API
     * @author Rishabh jaishwal
     * @description Used to search recent searched commands 
     * @param query {string} <keyword> data want to search
     * @param searchedCommand {string} <keyword> command want to search
     * @param message reference to discord class
     */
    recentApi: async (query,searchedCommand,message) => {
        try {
        let data = await message.channel.fetchMessages()
        data = await data.filter(m => m.author.id);
        data = await data.map(ele => ele.content.toLowerCase());
        data = await data.filter(ele => ele.includes(`${searchedCommand}`) && ele.includes(`${query}`));
        let outputData =  new Set(data.map(ele => ele.replace(" ","###").split('###')[1]));
        return  Promise.resolve([...outputData]);
        } catch(e) {
            console.log("GOT SOME ERROR!!!!!!!",e);
        }
    }

}