let Reader = require('./Reader')
let Processor = require('./Processor')
let Table = require('./Table')
let HtmlParser = require('./HtmlParser')
let Writer = require('./Writer')
let PDFWriter = require('./PDFWriter')

let leitor = new Reader()
//let escritor = new Writer()

async function main(){
    let dados = await leitor.Read('./tab.csv')
    let data = Processor.Process(dados)
    
    let users = new Table(data)
    let html = await HtmlParser.Parse(users)

    PDFWriter.WritePDF('users.pdf', html)
}

main()