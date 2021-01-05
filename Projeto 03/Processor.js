class Processor {
    constructor() {

    }

    static Process(data) {
        let rows = data.split('\r\n')
        data = []
        rows.forEach(row => {
            data.push(row.split(','))
        });
        return data
    }

}

module.exports = Processor