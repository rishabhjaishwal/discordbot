const emoji = require('../emojis');

module.exports = {

    /**
     * Convert String to Emoji
     * @author Rishabh jaishwal
     * @description Pass string to convert into emoji
     * @param stringData {string}
     */
    emojiConverter: (stringData = '') => {
        let output = '';
        for( emo of stringData.toLowerCase()) {
            output += emoji[emo] ?  " " + emoji[emo]: emo; 
        }
        return Promise.resolve(output.trim());
    }
}