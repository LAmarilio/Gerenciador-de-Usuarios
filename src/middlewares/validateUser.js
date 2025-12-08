import supabase from "../config/supabase.js";

export async function validateNewUser(req, res, next) {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios!' })
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regexEmail.test(email)) {
        return res.status(400).json({ erro: 'Email inválido' })
    }

    const { data } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', email)
        .limit(1)

    if (data && data.length > 0) {
        return res.status(409).json({ erro: 'Email já cadastrado' })
    }

    next()
}

export async function validateEdit(req, res, next) {
    const { idDoUsuario, novoNome, novoEmail, novaSenha } = req.body
    if (!idDoUsuario || !novoNome || !novoEmail || !novaSenha) {
        return res.status(400).json({ erro: 'O idDoUsuario, novoNome, novoEmail e novaSenha são obrigatórios!' })
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regexEmail.test(novoEmail)) {
        return res.status(400).json({ erro: 'Email inválido' })
    }

    const { data } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', novoEmail)

    if (data && data.length > 0 && data[0].id !== idDoUsuario) {
        return res.status(409).json({ erro: 'Email já cadastrado' })
    }

    next()
}

export async function validateDeleteUser(req, res, next) {
    const { idDoUsuario } = req.body
    if (!idDoUsuario) {
        return res.status(400).json({ erro: 'O idDoUsuario é obrigatórios!' })
    }
    next()
}