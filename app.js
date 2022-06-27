const express = require('express'),
mongoose = require('mongoose'),
app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req,res)=>{
    res.json({msg: 'oioi'})
})

const Usuario = require('./models/Usuario')

app.post('/', async(req,res)=>{
    const {usuario, password, valid} = req.body

    if(!usuario){
        res.status(422).json({ error: 'o usuario é obrigatorio' })
    }
    if(!password){
        res.status(422).json({ error: 'a senha é obrigatoria' })
    }

    const usuarioexiste = await Usuario.findOne({usuario})

    if(usuarioexiste){
        return res.status(422).json({
            message: 'Usuario existente'
        })
    }

    const user = {
        usuario,
        password,
        valid
    }
    try{
        await Usuario.create(user)
        res.status(201).json({message: 'Sucesso ao inserir usuario'})
    }catch(error){
        res.status(500).json({error: 'Erro 500'})
    }
});


mongoose.connect('mongodb+srv://lucas:CyDlTqW96ekCIs2G@cluster0.s5ry1.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('conexao com o db efetuada')
    app.listen(3000)
})
.catch((err) => console.log(err));