// Este arquivo está sendo responsável por hospedar as funções que usarei

const { log } = require("console");
const fs = require("fs"); //file sistem
const data = require("../data.json");
// se caso fosse nescessário o uso de data de aniversário utilizaria o comando abaixo para trazer a calculadora de idade porém a Obra de Douglas Adams não menciona tais origens dos personagens com tantos detalhes
const { age } = require("../utilities");

exports.index = function (req, res) {
  return res.render("members/index", { members: data.members });
};

exports.create = function (req, res) {
  return res.render("members/create");
};

exports.post = function (req, res) {
  //VALIDAÇÃO==========================================
  const keys = Object.keys(req.body); //object é uma função que vai criar um objeto para mim;resultado= O keys fez um array somente com as chaves dos inputs sem o conteudo dos mesmos
  // if (req.body == "") {
  //     // return res.send(req.body.name)//irá mostrar o nome colocado no input name
  //     return res.send("I know I maybe sound like a vogon but All fields need to be filled.")
  // }

  for (key of keys) {
    //req.body.avatar_url
    var theKey = key;

    if (req.body[key] == "") {
      //escrever isso é o mesmo que escrever o que está acima
      return res.send(
        `I know I maybe sound like a vogon but the following fields needs to be filed: "${theKey}" field`
      );
    }
  }


    //se caso eu tivesse de pegar a idade do cadastrado seria assim:
    // req.body.birth = Date.parse(req.body.birth) // para traduzir a data para o  formato timestamp



    //se for o primeiro cadastro e não tiver um id preliminar, vamos colocar a id de Número 1 por ser a primeira.
  let id = 1;
  const lastMember = data.members[data.members.length - 1]; // Na última posição do data.members  coloque um id

    // E formando o lastId, para o mesmo não se repetir, ele rodará a seguinte condição à todos novos cadastros
  if (lastMember) {
    //baseando o novo id agora no número anterior e não mais no tamanho do array de membros
    id = lastMember.id + 1 // para não repetir nenhum id já guardado, pegando justamente o ultimo id e somando mais 1
  }



// exportando (sobrescrevendo) os dados atualizados
   data.members.push({
    id,
    ...req.body,
  });



  //número 2 é a formatação do texto,indentaçõ usando 2 espaços (pra ficar bonitinho)
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write file error!")

    //vai colocar na url o /members/${id}assim que salvar
    return res.redirect(`/members/${id}`)
  });
};

exports.show = function (req, res) {
  //req.query.id = url.../.../?id=1
  //req.body = pega os dados do formulário quando a gente manda através do post
  //req.params.id = mandar direto na url ex: url.../../:id

  //desetruturando o req.params, dentro do req params esta retirando o id
  const { id } = req.params; //retirando o id e fazendo com que ele seja uma variável

  const foundMember = data.members.find(function (member) {
    //retornar o member.id quando ele for igual ao id, criado na desestruturação
    return member.id == id; // retorna true or false, está basicamente comparando se o id do params tem no jso
  });

  //se o find não encontrar o capitão, quando eu colocar um id não existente
  if (!foundMember) {
    return res.send("Cap not found, sorry Marvel stan");
  }


  // Arrumando o blood (traduzindo de A1 para A+)
  //ex: blood = "A1"
  let {blood} = foundMember

  var bloodType = blood.slice(-1)//Ultimo Dígito da string "1"

  if ( bloodType == 1 )  {
     bloodType = " +"
     blood = blood.slice(0,-1) + bloodType
  }else{
    bloodType= " -"
    blood = blood.slice(0,-1) + bloodType
  }

  //arrumando o que será exposto no show
  const member = {
    ...foundMember,
    blood,
  };

  return res.render("members/show", { member }); // lá no html vai receber o objeto "member" que acabei de declarar e vaicolocar os dados do foundMember
};

exports.edit = function (req, res) {
  // Responsável por trazer um dos members para a pag:

  //desetruturando o req.params, dentro do req params esta retirando o id
  const { id } = req.params; //retirando o id e fazendo com que ele seja uma variável

  const foundMember = data.members.find(function (member) {
    //retornar o member.id quando ele for igual ao id, criado na desestruturação
    return member.id == id; // retorna true or false, está basicamente comparando se o id do params tem no jso
  });

  //se o find não encontrar o capitão, quando eu colocar um id não existente
  if (!foundMember) {
    return res.send("Cap not found, sorry Marvel stan");
  }

  const member = {
    ...foundMember,
  };

  return res.render("members/edit", { member });
};

//Salvar no BACKEND
exports.put = function (req, res) {
  //Receber os dados

  //VALIDAÇÃO (procurando se um instrutor já está cadastrado), mas agora voltado para atualizar os dados
  const { id } = req.body;
  let index = 0;

  const foundMember = data.members.find(function (member, foundIndex) {
    // identificando o id
    if (id == member.id) {
      //ex: se o index for o 5 iremos saber qual que estaremos tratando
      index = foundIndex;
      return true;
    }
  });

  if (!foundMember) {
    return res.send("Cap not found, sorry Marvel stan");
  }

  const member = {
    ...foundMember,
    ...req.body,
    id: Number(req.body.id), // Para retornar o id em formato numérico, pois estava retornando o numero em string
  };

  data.members[index] = member; //jogando o member no array

  //atualizando o data
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write error");

    return res.redirect(`/members/${id}`);
  });
};

exports.delete = function (req, res) {
  const { id } = req.body;

  //estrutura de repetição que lê todos os members e se o id for diferente ele joga no fs, se for igual o da requisição ele joga fora, ocasionando assim num apagamento de dados
  const filteredMembers = data.members.filter(function (member) {
    return member.id != id;
  }); //filter retorna true ou false, retornado true ele joga na variavel, falso ele joga fora

  //atualizando o data.members
  data.members = filteredMembers; // que contem a lista que acabou de ser atualizada

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error!");

    return res.redirect("/members");
  });
};
