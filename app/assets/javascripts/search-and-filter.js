var $q = $('#text-search');
var $course = $('#course');
var $cuisine = $('#cuisine');
var params = {};

function getYummlyRecipes(params) {
	$.ajax({
		url: "http://api.yummly.com/v1/api/recipes?_app_id=8883e909&_app_key=4d536bbfc100aa3f05e713412c59e7e5&maxResult=12",
		success: displayGrid,
		data: params,
		dataType: 'jsonp'
	}); 	
}

function buildQueryParams() {

	var q = $('#text-search').val();
	var course = $('#course').val();
	if(course == 'Filter by Course') {
		course = '';
	}
	var cuisine = $('#cuisine').val();
	if(cuisine == 'Filter by Cuisine') {
		cuisine = '';
	}

	params = {
		'q' : q,
		'allowedCourse' : [course],
		'allowedCuisine' : [cuisine]
	};
	console.log(params);
	return params;
}

function clearSearch() {
	$q.val('');
	$course.val('');
	$cuisine.val('');
}