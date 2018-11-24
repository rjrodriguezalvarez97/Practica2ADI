var moment = require('moment')
app.post('/login', function(req, resp){
    var response = {}
    try{
        email = req.body.email
        password = req.body.password
        if(email && password){
            findUser(email,password,function(data){
                if(data.id){
                    var payload = {
                        sub: data.id,
                        iat: moment().unix(),
                        exp: moment().add(14, "days").unix(),
                        isAdmin: data.isAdmin,
                    };
                    var token = jwt.encode(payload, SECRET);
                    resp.status(200);
                    resp.send({token: token, id: data.id});
                }
                else{
                    resp.status(401);
                    resp.send({error: "Unauthorized"});
                }
            })
        }
        else{
            resp.status(400).send({error: "Bad Request"});
        }
    }
    catch(err){
        resp.status(500);
        resp.send({error: err.message})
    }
});
function findUser(email, password, callback){
    knex.select('id', 'isAdmin').from('User').where('email',email).andWhere('password',password).
    then(function(data){
        if(data.length > 0)
            callback(data[0]);
        else
            callback(data);
    })
}