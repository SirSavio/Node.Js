class Dado{
    constructor(faces){
        this.faces = faces
    }

    jogaDado(){
        return Math.ceil(Math.random() * (this.faces))
    }
}

let dadoSeis = new Dado(10)
console.log(dadoSeis.jogaDado())