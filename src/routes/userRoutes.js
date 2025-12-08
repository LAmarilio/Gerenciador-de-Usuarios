import express from 'express';
import {
    validateNewUser,
    validateDeleteUser,
    validateEdit
} from '../middlewares/validateUser.js';
import {
    listUsers,
    createUser,
    editUser,
    deleteUser
} from '../controllers/userController.js'

const router = express.Router()

router.get('/usuarios', listUsers)
router.post('/usuarios', validateNewUser, createUser)
router.put('/usuarios', validateEdit, editUser)
router.delete('/usuarios', validateDeleteUser, deleteUser)

export default router