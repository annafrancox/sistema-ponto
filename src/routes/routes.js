const { Router } = require('express');
const statics = require('./pages');

const usuarioController = require('../app/controllers/usuarioController');
const pontoController = require('../app/controllers/pontoController');
const loginController = require('../app/controllers/loginController');
const authVerify = require('../middlewares/authVerify');
const authRH = require('../middlewares/authRH');

const routes = Router();

routes.use(statics);

routes.post('/', loginController.auth);
routes.post('/logout', loginController.logout);

routes.get('/api/users/page/:num', usuarioController.pagination);
routes.get('/api/users', authVerify, usuarioController.getAllUsers);
routes.post('/api/users', authVerify, usuarioController.createUser);
routes.get('/api/users/:id', authVerify, usuarioController.getSingleUser);
routes.get('/api/users/:id/view', authVerify, usuarioController.viewUser);
routes.post('/api/users/:id/ban', authVerify, usuarioController.banUser);
routes.post('/api/users/update', authVerify, usuarioController.updateUser);
routes.get('/api/users/:id/edit', authVerify, usuarioController.editUser);


routes.post('/api/users/getuser', authVerify, pontoController.usuarioExp);
routes.get('/api/schedules/time/:matricula', authVerify, pontoController.getScheduleTime);
routes.get('/api/schedules/:matricula', authVerify, pontoController.getAllSchedules);
routes.post('/api/schedules', authVerify, pontoController.createSchedule);
routes.get('/api/schedules/:id/single', authVerify, pontoController.getSingleSchedule);
routes.post('/api/schedules/update', authVerify, pontoController.updateSchedule);
routes.get('/api/schedules/:id/edit', authVerify, pontoController.editSchedule);
routes.get('/api/schedules/:id/view', authVerify, pontoController.viewSchedule);
routes.post('/api/schedules/:id/delete', authVerify, pontoController.deleteSchedule);


module.exports = routes;