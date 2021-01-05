function enviarEmail(corpo, para){
    setTimeout(() => {
        console.log(
            `Para: ${para}
            
            ${corpo}
            
            `
        )
    }, 1000)
}

enviarEmail('Olá!', 'savio@gmail.com')