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

const usuarioPromise = obterUsuario()


usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result){
            return{
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
    })
    .then(function (resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco (result){
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado){
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: ${resultado.telefone.ddd}, ${resultado.telefone.telefone}
        `)           
    })
    .catch(function(error){
        console.error('Falhou', error)
    })
