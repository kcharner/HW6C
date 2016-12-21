//alert("test");

// Creating variables to store API and password

var authKey = "760ead10f07741eab21c9442795b5243"
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

//Creating variables to store values

var queryTerm	= "";
var numResults 	= 0;
var startYear 	= 0;
var endYear 	= 0;
var articleCounter	= 0;


//Function to search for articles

function runQuery(numArticles, queryURL) {
	
//Installing Ajax

$.ajax({url: queryURL, method: 'GET',})
.done(function(NYTData) {
	$("#wellSection").empty();

	for (var i = 0; i <numArticles; i++) {
		console.log(NYTData.response.docs[i].headline.main);
		console.log(NYTData.response.docs[i].section_name);
		console.log(NYTData.response.docs[i].pub_date);
		console.log(NYTData.response.docs[i].byline.original);
		console.log(NYTData.response.docs[i].web_url);

		var wellSection = $("<div>");
		wellSection.addClass("well");
		wellSection.attr("id", "articleWell-" + i);
		$("#wellSection").append(wellSection);

		if(NYTData.response.docs[i].headline.main != "null") {
			console.log(NYTData.response.docs[i].headline.main);
			$("#articleWell-" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");	
		}
		if(NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")) {
			console.log(NYTData.response.docs[i].byline.original);
			$("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");	
		}


		
		$("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
		$("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
		$("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
		$("#articleWell-" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>");
	}


	
})

}

$("#searchBtn").on("click", function(){

	queryTerm = $("#search").val().trim();
	

	var newURL = queryURLBase + "&q=" + queryTerm;


	numResults = $("#numRecords").val();
	
	startYear = $("#startYear").val().trim();
	endYear = $("#endYear").val().trim();

	if (parseInt(startYear)){
		startYear = startYear + "0101";
		newURL = newURL + "&begin_date=" + startYear;
	}
	if (parseInt(endYear)){
		endYear = endYear + "0101";
		newURL = newURL + "&end_date=" + endYear;
	}

	runQuery(numResults, newURL);

	return false;
})
