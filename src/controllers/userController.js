import supabase from "../config/supabase.js";

export async function listUsers(req, res) {
    const { data, error } = await supabase
        .from('usuarios')
        .select()

    if (error) {
        return res.status(403).json({ erro: error.message })
    }
    return res.status(200).json(data)
}

export async function createUser(req, res) {
    const { nome, email, senha } = req.body

    const { data, error } = await supabase
        .from('usuarios')
        .insert([{ nome, email, senha }])
        .select()

    if (error) {
        return res.status(403).json({ erro: error.message })
    }
    return res.status(201).json(data)
}

export async function editPassword(req, res) {
    const { idDoUsuario, novaSenha } = req.body

    const { data, error } = await supabase
        .from('usuarios')
        .update({ senha: novaSenha })
        .eq('id', idDoUsuario)
        .select()

    if (error) {
        return res.status(403).json({ erro: error.message })
    }
    if (data.length === 0) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    return res.status(202).json(data)
}

export async function editEmail(req, res) {
    const { idDoUsuario, novoEmail } = req.body

    const { data, error } = await supabase
        .from('usuarios')
        .update({ email: novoEmail })
        .eq('id', idDoUsuario)
        .select()

    if (error) {
        return res.status(403).json({ erro: error.message })
    }
    if (data.length === 0) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    return res.status(202).json(data)
}

export async function editNome(req, res) {
    const { idDoUsuario, novoNome } = req.body

    const { data, error } = await supabase
        .from('usuarios')
        .update({ nome: novoNome })
        .eq('id', idDoUsuario)
        .select()

    if (error) {
        return res.status(403).json({ erro: error.message })
    }
    if (data.length === 0) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    return res.status(202).json(data)
}

export async function deleteUser(req, res) {
    const { idDoUsuario } = req.body    

    const { data, error } = await supabase
        .from('usuarios')
        .delete()
        .eq('id', idDoUsuario)
        .select()

    if (error) {
        return res.status(400).json({ erro: error.message })
    }
    return res.status(200).json(data)
}