const fs = require('fs');
const util = require('util')

class Reader{

    constructor(){
        this.reader = util.promisify(fs.readFile)
    }

    async Read(filePatch){
        try {return await this.reader(filePatch, 'utf8')}
        catch(error) {return undefined}
    }
}

module.exports = Reader
