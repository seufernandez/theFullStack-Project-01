// Este arquivo está sendo responsável por hospedar as funções que usarei 


const fs = require('fs')//file sistem
const data = require('./data.json')
// se caso fosse nescessário o uso de data de aniversário utilizaria o comando abaixo para trazer a calculadora de idade porém a Obra de Douglas Adams não menciona tais origens dos personagens com tantos detalhes
const { age } = require('./utilities')




exports.index =  function (req, res) {

    



    return res.render("captains/index", {captains: data.captains});
}


exports.show = function(req,res){
    //req.query.id = url.../.../?id=1
    //req.body = pega os dados do formulário quando a gente manda através do post
    //req.params.id = mandar direto na url ex: url.../../:id


    //desetruturando o req.params, dentro do req params esta retirando o id
    const { id }  = req.params //retirando o id e fazendo com que ele seja uma variável

    const foundCaptain = data.captains.find(function(captain) {
        //retornar o captain.id quando ele for igual ao id, criado na desestruturação
        return captain.id == id // retorna true or false, está basicamente comparando se o id do params tem no jso
        })


    //se o find não encontrar o capitão, quando eu colocar um id não existente
    if (!foundCaptain) {
        return res.send("Cap not found, sorry Marvel stan")
    }
<<<<<<< HEAD

    const captain = {
        ...foundCaptain,
        //Tranformando string em array
        services:foundCaptain.services.split(","),// split vai quebrar a string em array, a gente só precisa de declarar qual será o divisor.

        //formatando o timestamp no formato de data dos EUA
        createdAt:Intl.DateTimeFormat("en-US").format(foundCaptain.createdAt),
    } 

     return res.render("captains/show", {captain}) // lá no html vai receber o objeto "captain" que acabei de declarar e vaicolocar os dados do foundCaptain
}


//create
=======
     return res.render("captains/show", {captain: foundCaptain}) // lá no html vai receber o objeto "captain" que acabei de declarar e vaicolocar os dados do foundCaptain
}
//post
>>>>>>> b1912fafdcc547e7fcdc70cccc26f143448889c6
exports.post = function(req, res) {
    
    //VALIDAÇÃO==========================================
    const keys = Object.keys(req.body) //object é uma função que vai criar um objeto para mim;resultado= O keys fez um array somente com as chaves dos inputs sem o conteudo dos mesmos
    // if (req.body == "") {
        //     // return res.send(req.body.name)//irá mostrar o nome colocado no input name
    //     return res.send("I know I maybe sound like a vogon but All fields need to be filled.")
    // }
    
    
    for (key of keys){
    //req.body.avatar_url
    var theKey = key 

        if (req.body[key] == ""){//escrever isso é o mesmo que escrever o que está acima
            return res.send(`I know I maybe sound like a vogon but the following fields needs to be filed: "${theKey}" field`)
        }

    }
    

<<<<<<< HEAD
=======

>>>>>>> b1912fafdcc547e7fcdc70cccc26f143448889c6
    //desestruturando objeto req.body pra colocar no data json
    let {
        avatar_url,
        name,
        ocupation,
        origin,
        services,
    } = req.body
    
    //req.body.createdAt 
    const createdAt = Date.now()//marcar as horas que foi cadastrado
    
    //se caso eu tivesse de pegar a idade do cadastrado seria assim:
    // req.body.birth = Date.parse(req.body.birth) // para traduzir a data para o  formato timestamp
    
    //req.body.id
    const id = Number(data.captains.length + 1)//Number está tranformando esta lógica (parametro) em objeto numérico
    

    
    
    
    
    
    
    //[{...}]
    data.captains.push({
        id,
        avatar_url,
        name,
        ocupation,
        origin,
        services,
        createdAt})//[{...},{...}]  //vai adicionando sempre mais um array = não mais apagando e escrevendo novamente os dados recebidos 
        
        
        

        //número 2 é a formatação do texto,indentaçõ usando 2 espaços (praficar bonitinho)
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){ 
        if (err) {return res.send('write file error!')
    }
    else{
        //vai colocar na url o /captains assim que salvar
        return res.redirect('/captains')
    }
    })
    //return res.send(req.body);
}

//edit
exports.edit = function(req, res) {


    // Responsável por trazer um dos captains para a pag:

 //desetruturando o req.params, dentro do req params esta retirando o id
 const { id }  = req.params //retirando o id e fazendo com que ele seja uma variável

 const foundCaptain = data.captains.find(function(captain) {
     //retornar o captain.id quando ele for igual ao id, criado na desestruturação
     return captain.id == id // retorna true or false, está basicamente comparando se o id do params tem no jso
     })


 //se o find não encontrar o capitão, quando eu colocar um id não existente
 if (!foundCaptain) {
     return res.send("Cap not found, sorry Marvel stan")
 }

 const captain = {
     ...foundCaptain,
     //Tranformando string em array
     services:foundCaptain.services.split(","),// split vai quebrar a string em array, a gente só precisa de declarar qual será o divisor.

     //formatando o timestamp no formato de data dos EUA
     createdAt:Intl.DateTimeFormat("en-US").format(foundCaptain.createdAt),
 } 

  return res.render("captains/edit", {captain})
    
}



//Salvar no BACKEND
exports.put = function (req, res){

    //Receber os dados

    //VALIDAÇÃO (procurando se um instrutor já está cadastrado), mas agora voltado para atualizar os dados
    const { id }  = req.body 
    let index = 0


    const foundCaptain = data.captains.find(function(captain, foundIndex) {
        // identificando o id 
        if (id == captain.id ) { //ex: se o index for o 5 iremos saber qual que estaremos tratando
            index = foundIndex
            return true
        }
    })


    if (!foundCaptain) {
     return res.send("Cap not found, sorry Marvel stan")
    }

    const captain = {
        ...foundCaptain,
        ...req.body,

    }

    data.captains[index] = captain//index para sabermos a posição do objeto ja existente

    //atualizando o data
    fs.writeFile("data.json", JSON.stringify(data, null,2), function(err){
        if(err) return res.send("write error")

        return res.redirect(`/captains/${id}`)
    })
}

//delete
exports.delete = function(req, res){
    const {id} = req.body


    //estrutura de repetição que lê todos os captains e se o id for diferente ele joga no fs, se for igual o da requisição ele joga fora, ocasionando assim num apagamento de dados
    const filteredCaptains = data.captains.filter(function(captain){
        return captain.id != id
    })//filter retorna true ou false, retornado true ele joga na variavel, falso ele joga fora

    //atualizando o data.captains
    data.captains = filteredCaptains// que contem a lista que acabou de ser atualizada

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

    return res.redirect("/captains")

        
    })
}