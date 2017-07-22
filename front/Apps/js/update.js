function update_article(id){
  //var id = document.getElementById("iden").value;
  var description = document.getElementById("desc").value;
  var image = document.getElementById("basic-url").value;
  var url = 'http://207.154.237.111:3000/buildings/' + id;
  var query = {'description': description,'image_url':image}
  var type = 'put';
  var content_type = "application/json; charset=utf-8";
  var data = JSON.stringify(query)

  jQuery.ajax( {
    url: url,

    type: type,
    contentType: content_type,
    data: data,
    success: function( response ) {
      // reponse

      $('#myModal').modal('toggle');


    },
    error: function (data){
      // error
      console.log(`Error: ${data}`);
      console.log("didn't happen man!!")
    }
  } );
}

// sending the request using the picked object id, this will give back the description from MongoDB
function get_description(id, onsuccess){

  var url = 'http://207.154.237.111:3000/buildings/' + id;
  var query = {}
  var type = 'get';
  var content_type = "application/json; charset=utf-8";
  var data = JSON.stringify(query)

  jQuery.ajax( {
    url: url,
    type: type,
    contentType: content_type,
    data: data,
    success: function( response ) {
      // response
    //console.log(response);
    //console.log('set info box with this description: ' + response.description+'and with this image url:'+response.image_url)
    onsuccess(response.description,response.image_url);

    },
    error: function (data){
      // error
      console.log(`Error: ${data}`);
    }
  } );
}
// A $( document ).ready() block.
$( document ).ready(function() {
  var id = location.search.split('id=')[1]
  console.log( "ID is " + id );
  get_description(id, function(description,image_url){
    $('#desc').val(description);
    $('#basic-url').val(image_url);

  })
  $('#update').click(function(){
    update_article(id);

  })


});
