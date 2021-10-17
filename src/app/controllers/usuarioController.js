const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario')

const SALT=10;

async function _getAllUsers(request, response) {
    try {
        
        let user = await Usuario.findAll(); // Busca a query de todos os usuários
        if(user)
        {
            response.json({user});
        }
        //response.json({user});
    } catch (error) {
        response.status(500).send(error);
    }
};

async function _getSingleUser(request, response) {
    try {
        let id = request.params.id;

        let user = await Usuario.findByPk(id);
        
        response.status(200).json({user});
    } catch (error) {
        console.log(error);
    }
};

async function _createUser(request, response) {
    try {
        let userObj = request.body;

        if (!userObj.nome) {
            throw new Error('Parametros invalidos');
        }
        
        let user = await Usuario.findAll({
            where:{ matricula: userObj.matricula}
        }) //Verificar se a matricula é unica

        if(user)
        {
            let hash = await bcrypt.hash(userObj.senha,SALT);

            const newUser = await Usuario.create({
                nome: userObj.nome,
                matricula: userObj.matricula, 
                senha: hash,
                cargo: userObj.cargo, 
                ativo: userObj.ativo
            });

            response.redirect("/listagem-funcionario");
        }else{
            response.redirect("/listagem-funcionario");
            alert('Usuário já existe no banco de dados!');
        }

    } catch (error) {
        console.log(error)
    }
};

async function _banUser(request, response) {
    try {
        var id = request.params.id;
        const ativo = await Usuario.update(
            {ativo: false},
            {where: {id: id}});
    } catch (error) {
        console.log(error)
    }
}
async function _editUser(request, response) {
    try {
        var id = request.params.id;
        const user = await Usuario.findByPk(id)
        if (user) {
            return response.redirect("/editarFuncionario/"+id)
        } else {
            console.log("nao existe o funcionario")
        }
    } catch (error) {
        console.log(error)
    }

};

async function _updateUser(request, response){
try {
    let userObj = request.body;
    var matricula = userObj.matricula;
    console.log(matricula)

    if (matricula) {

        let hash = await bcrypt.hash(userObj.senha,SALT);

        const update = await Usuario.update({
            nome: userObj.nome,
            matricula: userObj.matricula, 
            senha: hash,
            cargo: userObj.cargo, 
            ativo: userObj.ativo
        }, {where: { matricula: matricula }});
        if(update)
        return response.redirect("/listagem-funcionario")
    } else {
        throw new Error('Parametros invalidos')
    }
    
} catch (error) {
        console.log(error)
    }
};
async function _viewUser(request, response) {
    try {
        var id = request.params.id;
        const ponto = await Usuario.findByPk(id);

        if (ponto) {
            return response.redirect("/visualizarFuncionario/"+id)
        } else {
            console.log("nao existe o funcionario")
        }
    } catch (error) {
        console.log(error)
    }
}
async function _pagination(request, response) {
    try {
        var page = request.params.num;
        var offset = 0;

        if(isNaN(page) || page == 1){
            offset = 0;
        }else{
            offset = (parseInt(page) - 1) * 4;
        }

        let user = await Usuario.findAndCountAll({limit: 4}, {offset:offset});
        var next;
        if(offset + 4 >= user.count){
            next = false;
        }else{
            next = true;
        }
        var result = {
            page: parseInt(page),
            next: next,
            user : user
        }
        response.json({result})

    } catch (error) {
        console.log(error)
    }
};

module.exports = {
  getAllUsers: _getAllUsers,
  getSingleUser: _getSingleUser,
  createUser: _createUser,
  pagination: _pagination,
  banUser: _banUser,
  editUser: _editUser,
  updateUser: _updateUser,
  viewUser: _viewUser
}