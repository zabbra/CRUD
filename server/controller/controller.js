const Userdb= require("../model/model")


//create and save new user
module.exports.create = async(req,res) =>{
    //validation request

    if(!req.body){
        res.status(400).json({message:'Le contenu ne peut pas être vide!'})
        return;
    }

    //new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    //save user in the database
    user.save(user)
    .then(data =>{
        //res.status(2001).json(data)
        res.redirect('/add-user')
    })
    .catch(err =>{
      res.status(500).json({
          message: "une erreur s'est produite lors de la création d'une opération de création" || err.message 
        }) 
    });
  

 }

 //retrieve and return all users/ retrive and return a single user

 module.exports.find = async(req,res) =>{

    if(req.query.id){
        const id = req.query.id
        Userdb.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).json({message:"Pas de compte utilisateur avec l'id" + id})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message:"Erreur de récupération de l'utilisateur avec l'id" + id})
        })
    }else{

        Userdb.find()
     .then(user =>{
         res.json(user)
     })
     .catch(err =>{
         res.status(500).json({
             message:"Une erreur s'est produite lors de la récupération des informations sur l'utilisateur." || err.message 
            });
     }); 

    }
     
    

 }

 //Update a new identified user by user id
 module.exports.update = async(req,res) =>{
    if(!req.body){
        res.status(400).json({message:'Les données à mettre à jour ne peuvent pas être vides !'})
        return;
    }

    const id = req.params.id
    Userdb.findByIdAndUpdate(id,req.body,{userFindAndModify:false})
    .then(data =>{
        if(!data){
            res.status(404).send({message:`Impossible de mettre à jour l'utilisateur avec $(id).Peut-être utilisateur non trouvé`})
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({
            message:"Erreur Mise à jour des informations sur l'utilisateur"
        })
    })


    
 }


 //Delete a user specified user id in the request
 module.exports.delete = async(req,res) =>{
    const id = req.params.id
    Userdb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(404).send({message:`Impossible de supprimer l'identifiant $(id). Peut-être que l'identifiant est erroné.`})
        }else{
            res.send({
                message:"L'utilisateur a été supprimé avec succès"
            })
        }

    })
    .catch(err =>{
        res.status(500).send({
            message:"Impossible de supprimer les utilisateurs avec id=" + id 
        });

    }) ;   
}

