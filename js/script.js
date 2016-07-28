function getPageName() {
    var index = window.location.href.lastIndexOf("/") + 1,
        filenameWithExtension = window.location.href.substr(index),
        filename = filenameWithExtension.split(".")[0];  
    return filename;                                     
}
function mostData(mostUrl){
	$.ajax({ 
        type: 'GET', 
        url: mostUrl, 
        dataType:'json',
        success: function (data) {
        	return data.name;
        }
    });
}
function getApi(theUrl){
	var current = getPageName();
	$("#the-list").html("<!-- show list -->");
	$("#button-cont").html("<!-- show button -->");
	if (!theUrl){
		switch(current) {
		    case 'index':
			    theUrl = 'http://swapi.co/api/films/';
		        break;
		    case 'people':
		        theUrl = 'http://swapi.co/api/people/';
		        break;
		} 
	}
    $.ajax({ 
        type: 'GET', 
        url: theUrl, 
        dataType:'json',
        success: function (data) {
        	switch(current) {
			    case 'index':
				        for (var i=0;i<data.results.length;++i){
				            $("#the-list").append('<div class="col-md-4 col-sep"> \
				            	<div class="data"> \
								<p><a href="movie.html#'+ data.results[i].episode_id +'">'+ data.results[i].title +'</a></p> \
								<p>Episode '+ data.results[i].episode_id +'</p> \
								<p>'+ data.results[i].opening_crawl +'</p> \
								<p>'+ data.results[i].release_date +'</p> \
								<p><b>Director: </b>'+ data.results[i].director+'</p> \
								<p><b>Producer: </b>'+ data.results[i].producer +'</p> \
								</div> \
								</div>');
				        }
			    break;
			    case 'people':
				        for (var i=0;i<data.results.length;++i){
					            $("#the-list").append('<div class="col-md-4 col-sep"> \
					            	<div class="data"> \
									<p>'+ data.results[i].name +'</p> \
									<p>'+ mostData(data.results[i].homeworld) +'</p> \
									</div> \
									</div>');
					    }
			    break;
			}
       		if (data.previous){
       			var url = "'"+data.previous+"'";
       			$("#button-cont").append('<button onclick="getApi('+url+');">Previous</button>');
       		}
       		if (data.next){
       			var url = "'"+data.next+"'";
       			$("#button-cont").append('<button onclick="getApi('+url+');">Next</button>');
       		}
        }
    });
}