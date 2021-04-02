// Este arquivo está sendo responsável por hospedar as funções que usarei mais a frente


const fs =require('fs')//file sistem
const data =require('./data.json')

exports.show = function(req,res){
    //req.query.id = url.../.../?id=1
    //req.body = pega os dados do formulário quando a gente manda através do post
    //req.params.id = mandar direto na url ex: url.../../:id


    //desetruturando o req.params, dentro do req params esta retirando o id
    const { id }  = req.params //retirando o id e fazendo com que ele seja uma variável

    const foundCaptain = data.captains.find(function(captain) {
        //retornar o captain.id quando ele for igual ao id, criado na desestruturação
        return captain.id == id
    })

    //se o find não encontrar o capitão
    if (!foundCaptain) {
        return res.send("Cap not found, sorry Marvel stan")
    }
}

//post
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
//update

