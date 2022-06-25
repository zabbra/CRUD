$(document).ready(function() {

    $("#add_user").submit(function(event){
        alert('Données insérées avec succès')
    })
    
    $("#update_user").submit(function(event){
        event.preventDefault();
    
        var unindexed_array=$(this).serializeArray()
        var data ={}
    
        $.map(unindexed_array,function(n,i){
            data[n['name']] = n['value']
    
        })
    
        var request ={
            "url":`http://localhost:3000/api/users/${data.id}`,
            "method":"PUT",
            "data":data
        }
    
        $.ajax(request).done(function(response){
            alert("Données mises à jour avec succès!")
        })
        console.log(unindexed_array)
    })
    
    if(window.location.pathname == "/"){
        $ondelete=$("table tbody td a.delete");
        $ondelete.click(function(){
            var id=$(this).attr("data-id");
            console.log(id);
            
            var request ={
                "url":`http://localhost:3000/api/users/${id}`,
                "method":"DELETE",
            }

            if(confirm("voulez-vous vraiment supprimer cet enregistrement?")){
                $.ajax(request).done(function(response){
                    alert("Données supprimées avec succès!");
                    location.reload()
                })

            }
            
        })
    }
    
})


