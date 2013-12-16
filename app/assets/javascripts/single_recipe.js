var recipe_params = {
	'_app_id' : '8883e909',
	'_app_key' : '4d536bbfc100aa3f05e713412c59e7e5'
}
var recipeJSON;
var ingredientJSON;
var shopping_listJSON;
var recipeResult;

//this is hackish - find a better way to pass from controller
var user_id = parseInt($('#recipe-result').attr('data-user'));

function displayRecipe(results) {
	console.log(results);
	recipeResult = results;
	var source = $("#single-recipe-tpl").html();
	var template = Handlebars.compile(source);
	var context = results;
	var html = template(context);
	$('#recipe-result').html(html);

	recipeJSON = buildRecipe(results);
	console.log(recipeJSON);
	shopping_listJSON = buildShopping_list(results, user_id);
	sendRecipe(recipeJSON);
	//createModal(results);

	recipeResult = results;
}

//build recipe, ingredients and shopping list objects
//add user id
function buildRecipe(obj, user_id) {
	var recipe = {};
	user_id = user_id || null;

	recipe.name = obj.name;
	recipe.yummly_id = obj.id;
	recipe.url = obj.source.sourceRecipeUrl;
	recipe.user_id = user_id;
	recipe.ingredient = [];

	for(var i=0; i <= obj.ingredientLines.length; i++) {
		var temp = {};
		temp.ing_name = obj.ingredientLines[i];
		temp.ing_recipe_id = obj.id;
		recipe.ingredient.push(temp);	
	}
	return recipeJSON = JSON.stringify(recipe);
}

//this is currently undefined with the check vals
function buildShopping_list(obj, user_id, list_name) {
	var shopping_list = {};
	user_id = user_id || null;
	list_name = list_name || '';

	shopping_list.name = list_name;
	shopping_list.recipe_id = obj.id;
	shopping_list.user_id = user_id;
	return shopping_listJSON = JSON.stringify(shopping_list);
}
function sendRecipe(obj) {
	$.ajax({
		type: 'POST',
		url: '/recipes',
		data: obj,
		success: recipeSuccess,
		dataType: 'json',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	});
}
function recipeSuccess() {
	console.log('Recipe sent to controller');
}
//save the results obj somewhere I can use it?
function getShoppingList() {
	$.ajax({
		type: 'GET',
		url: '/shopping_lists',
		success: createModal,
		dataType: 'json',
		error: function (xhr, ajaxOptions, thrownError) {
        	console.log(xhr.responseText);
   		},
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	});
}

function createModal(obj) {
	console.log(obj);

	if($('#recipe-result').attr('data-user-id') > 0) {
		var source = $('#add-shoppinglist-tpl').html();
		var template = Handlebars.compile(source);
		var context = obj;
		var html = template(context);
		console.log(html);
		$('#add-shoppinglist-modal').html(html);
		$('.add-to-list-link').click(function(e) {
			e.preventDefault();
			var shopping_list_id = parseInt($(this).attr('data-list-id'));
			var recipe_id = $('#recipe-name').attr('data-yid');

			console.log(shopping_list_id);
			addRecipeToShoppingList(recipe_id, shopping_list_id);
		});
	}else{
		var html = "<p>You must be logged in to create a shopping list.</p>";
		html += '<p><a href="/users/sign_in">Login</a> or <a href="/users/sign_up">Sign up</a></p>';
		$('#add-shoppinglist-modal').html(html);
	}
	
}

function addRecipeToShoppingList(recipe_id, shopping_list_id) {
	var obj = {
		'yummly_id' : recipe_id,
		'shopping_list_id' : shopping_list_id
	};
	var recipe_on_shopping_list = JSON.stringify(obj);
	
	console.log(recipe_on_shopping_list);
	$.ajax({
		type: 'POST',
		url: '/recipe_on_shopping_lists',
		data: recipe_on_shopping_list,
		success: addToListSuccess,
		dataType: 'json',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	});
}
function addToListSuccess() {
	console.log('Recipe on Shopping List sent to controller');
	//this is where I change the modal to show success
}