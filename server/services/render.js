const axios = require('axios')

module.exports.homeRouter = (req,res)=>{
    //Make a get request to /api/users
    axios.get("http://localhost:3000/api/users")
    .then(function(response){
        //console.log(response)
        res.render("index",{users:response.data});
    })
    .catch(err =>{
        res.send(err)
    })
}

module.exports.add_user = (req,res)=>{
    res.render("add_user")
}

module.exports.update_user = (req,res)=>{
    axios.get('http://localhost:3000/api/users',{params:{id:req.query.id}})
    .then(function(response){
        res.render("update_user",{user:response.data}); 
    })
    .catch(err =>{
        res.send(err)
    })
    
}