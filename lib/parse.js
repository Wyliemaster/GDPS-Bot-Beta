var parse = {
    //Credits to Colon for this function
    parseResponse: function (responseBody, splitter) {
        if (!responseBody || responseBody == "-1") return {};
        let response = responseBody.split('#')[0].split('|')[0].split(splitter || ':');
        let res = {};
        for (let i = 0; i < response.length; i += 2) {
            res[response[i]] = response[i + 1]
        }
        return res
    },

    decodeLevelDesc: function (description) {
        return new Buffer.from(description, 'base64').toString('utf-8')
    }
}

module.exports = parse