const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco) //transforma o callback em promise
function obterUsuario(){


    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function(){
            return resolve({
                id: 1,
                nome:'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)

    })
}



function obterTelefone(idUsuario){
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(() =>{
            return resolve({
                telefone:'235235325',
                ddd: 11
            })
        }, 2000);
    })    
}



function obterEndereco(idUsuario, callback){
    setTimeout(() =>{
        return callback(null, {
            rua: 'rua alguma coisa',
            numero: 123
        })
    }, 2000);
}

main()
async function main(){
    try{
        const usuario = await obterUsuario()
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const telefone = resultado[0]
        const endereco = resultado[1]
        console.log(`
            Nome: ${usuario.nome},
            Telefone: ${telefone.ddd}, ${telefone.telefone},
            Endereço: ${endereco.rua}, ${endereco.numero}
        `)
    }   
    catch(error) {
        console.error('ERROR', error)    
    }     
}
