const Ponto = require('../models/ponto')
const authRH = require('../../middlewares/authRH');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const { QueryTypes } = require('sequelize');
const sequelize = require('../../database/database');
const Op = require('../../database/database').Sequelize.Op;

const decodingJWT = (token) => {

    if(token !== null || token !== undefined){
     const base64String = token.split('.')[1];
     const decodedValue = JSON.parse(Buffer.from(base64String,    
                          'base64').toString('ascii'));
     return decodedValue;
    }
    return null;
}


async function _usuarioExp (request, response) {

    try {
        let cookie = request.body.cookie;

        if(cookie !== null || cookie !== undefined)
        {
            const cookieParsed = cookie.split('=')[1];
            const base64String = cookieParsed.split('.')[1];
            const decodedValue = JSON.parse(Buffer.from(base64String,    
                'base64').toString('ascii'));
            let id = decodedValue.id;
            
            let user = await await Usuario.findOne({id});

            response.json({user});
        }  
    } catch (error) {
        console.log(error)
    }
}

async function _getAllSchedules(request, response) {
    try {
        let matricula = request.params.matricula;
        let now = new Date();
        let dataI = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + '01'
        let dataF = now.getFullYear() + '-' + (now.getMonth() + 2) + '-' + '01'
        
        let startDate= new Date(dataI)
        let endDate= new Date(dataF)
        let ponto = await Ponto.findAll({
            where: {matricula: matricula, data: {[Op.between]: [startDate, endDate]}}
        });
        if (ponto) {
            
            response.json({ponto});            
        }
    } catch (error) {
        response.status(500).send(error);
    }

}
async function _getScheduleTime(request, response) {
    try {
        let matricula = request.params.matricula;
        let now = new Date();
        let dataI = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + '01'
        let dataF = now.getFullYear() + '-' + (now.getMonth() + 2) + '-' + '01'
        
        let startDate= new Date(dataI)
        let endDate= new Date(dataF)
        let entrada = await Ponto.sum('hora', { where: { 
                                    matricula: matricula,
                                    tipo: 'Entrada',
                                    data: {[Op.between]: [startDate, endDate]}
                                }});
        let saida = await Ponto.sum('hora', { where: {
                                    matricula: matricula,
                                    tipo: 'Saida',
                                    data: {[Op.between]: [startDate, endDate]}
                                }});
        console.log(entrada, saida)
        let hs = parseInt(saida.hours);
        let ms = parseInt(saida.minutes);
        let he = parseInt(entrada.hours);
        let me = parseInt(entrada.minutes);
        let horaSaida, horaEntrada
            if(ms>0){
                horaSaida = ms + (hs*60)
            }
            else{
                horaSaida =hs*60
            }
            if (me>0) {
                horaEntrada = me + (he*60)
            } else{
                horaEntrada = he*60
            }
        
                        

        let resultado = (horaSaida - horaEntrada)

        let hora = parseInt(resultado/60)
        let min = resultado%60
        
        return response.json({hora, min})
    } catch (error) {
        console.log(error)
    }
}
async function _getSingleSchedule(request, response) {
    try {
        let id = request.params.id;
        let ponto = await Ponto.findByPk(id);
        console.log(ponto)
        return response.json({ponto});
    } catch (error) {
        console.log(error)
    }
}

async function _viewSchedule(request, response) {
    try {
        var id = request.params.id;
        const ponto = await Ponto.findByPk(id);

        if (ponto) {
            return response.redirect("/visualizarRegistro/"+id)
        } else {
            console.log("nao existe o registro")
        }
    } catch (error) {
        console.log(error)
    }
}

async function _createSchedule(request, response) {
    try {
        let pontoF = request.body;
        if (!(pontoF.tipo && pontoF.data && pontoF.hora)) {
            throw new Error('Parametros invalidos')
        }
      
        const newSchedule = await Ponto.create({
            matricula: pontoF.matricula,
            tipo:pontoF.tipo,
            data: pontoF.data,
            hora: pontoF.hora,
            observacao: pontoF.observacao
        });
        response.redirect("/historico")
    } catch (error) {
        console.log(error)
    }
}

async function _deleteSchedule(request, response){
    try {
        var id = request.params.id;
        if(id != undefined){
            if(!isNaN(id)){
                Ponto.destroy({
                    where: {
                        id: id
                    }
                }).then(() => {
                    response.redirect("/historico");
                });
            }else{// NÃO FOR UM NÚMERO
                response.redirect("/historico");
            }
        }else{ // NULL
            response.redirect("/historico");
        }
    } catch (error) {
        console.log(error)
    }
}

async function _editSchedule(request, response) {
    try {
        var id = request.params.id;
        
        const ponto = await Ponto.findByPk(id)
        if (ponto) {
            return response.redirect("/editarRegistro/"+id)
        } else {
            console.log("nao existe o ponto")
        }
    } catch (error) {
        console.log(error)
    }

};

async function _updateSchedule(request, response){
try {
    let pontoF = request.body;
    var matricula = pontoF.matricula;
    // fazer validacao aq
    if (pontoF.matricula) {
        const update = await Ponto.update({
            tipo:pontoF.tipo,
            data: pontoF.data,
            hora: pontoF.hora,
            observacao: pontoF.observacao
        }, {where: { matricula: matricula }});
        if(update) return response.redirect("/historico")
    } else {
        throw new Error('Parametros invalidos')
    }
    
} catch (error) {
        console.log(error)
    }
};

module.exports = {
  getAllSchedules: _getAllSchedules,
  getSingleSchedule: _getSingleSchedule,
  createSchedule: _createSchedule,
  deleteSchedule: _deleteSchedule,
  viewSchedule:_viewSchedule,
  editSchedule: _editSchedule,
  updateSchedule: _updateSchedule,
  usuarioExp: _usuarioExp,
  getScheduleTime: _getScheduleTime
}