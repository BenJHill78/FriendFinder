            $("#search").on("click", function(){
                var sur = [];
                for (var i = 0; i < 10; i++){ 
                    sur.push($("#q" + (i+1)).val());
                }
                var newFriend = {
                    name: $("#in1").val().trim(),
                    pics: $("#in2").val().trim(),
                    score: sur
                }
                console.log(newFriend);
                console.log("On click is running.");
                $.post("api/new", newFriend)
                .done(function(data){
                   $("#friend").html("<h5>" + data.name + "</h5><br><img src='" + data.pics + "'>");
                    console.log(".done running");
                })
            })