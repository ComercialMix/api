function confereSenha(req, res, next){
        if(req.method == "GET" || req.query.senha === "123456"){
            next();
        }else{
            console.log(req.method)
            res.status(401)
            res.send("senha incorreta")
        }
    }

module.exports = {confereSenha}