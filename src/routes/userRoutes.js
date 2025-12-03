import express from 'express';
import {
    validateNewUser,
    validateDeleteUser,
    validateEditEmail,
    validateEditNome,
    validateEditSenha
} from '../middlewares/validateUser.js';
import {
    listUsers,
    createUser,
    editEmail,
    editNome,
    editPassword,
    deleteUser
} from '../controllers/userController.js'

const router = express.Router()

router.get('/usuarios', listUsers)
router.post('/usuarios', validateNewUser, createUser)
router.put('/usuarios/email', validateEditEmail, editEmail)
router.put('/usuarios/nome', validateEditNome, editNome)
router.put('/usuarios/senha', validateEditSenha, editPassword)
router.delete('/usuarios', validateDeleteUser, deleteUser)

export default router