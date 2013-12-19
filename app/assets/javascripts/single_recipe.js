var recipe_params = {
	'_app_id' : '8883e909',
	'_app_key' : '4d536bbfc100aa3f05e713412c59e7e5'
}
var recipeJSON;
var ingredientJSON;
var shopping_listJSON;
var recipeResult;
var global_yummly_id;

//this is hackish - find a better way to pass from controller
var user_id = parseInt($('#recipe-result').attr('data-user'));

function displayRecipe(results) {
	console.log(results);
	recipeResult = results;
	global_yummly_id = results.id;
	var source = $("#single-recipe-tpl").html();
	var template = Handlebars.compile(source);
	var context = results;
	var html = template(context);
	$('#recipe-result').html(html);

	recipeJSON = buildRecipe(results);
	console.log(recipeJSON);
	sendRecipe(recipeJSON);

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
        	console.log('Error loading shopping lists');
   		},
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	});
}

//this is currently undefined with the check vals
function buildShopping_list(user_id, list_name) {
	var shopping_list = {};
	user_id = user_id || null;
	list_name = list_name || '';

	shopping_list.name = list_name;
	shopping_list.user_id = user_id;
	return shopping_listJSON = JSON.stringify(shopping_list);
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
		$('#submit-new-list').click(function() {
			$('#hidden-yummly-id').val(global_yummly_id);
			var user_id = $('#recipe-result').attr('data-user-id');
			var shopping_list_name = $('#shopping-list-name').val();
			shopping_listJSON = buildShopping_list(user_id, shopping_list_name);
			addNewShoppingList(shopping_listJSON);
			var shopping_list_id = parseInt($(this).attr('data-list-id'));
			var recipe_id = $('#recipe-name').attr('data-yid');
			addRecipeToShoppingList(recipe_id, shopping_list_id);
		});
		
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
function addNewShoppingList(obj) {
	$.ajax({
		type: 'POST',
		url: '/shopping_lists',
		data: obj,
		success: newShoppingListSuccess,
		dataType: 'json',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	});
}
function newShoppingListSuccess() {
	console.log('New shopping list sent to controller');
}

function addRecipeToShoppingList(recipe_id, shopping_list_id) {
	var obj = {
		'yummly_id' : recipe_id,
		'shopping_list_id' : shopping_list_id || ''
	};
	var recipe_on_shopping_list = JSON.stringify(obj);
	
	console.log(recipe_on_shopping_list);
	$.ajax({
		type: 'POST',
		url: '/recipe_on_shopping_lists',
		data: recipe_on_shopping_list,
		success: addToListSuccess,
		error: addToListError,
		dataType: 'json',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	});
}
function addToListSuccess() {
	console.log('Recipe on Shopping List sent to controller');
	$('#recipe-to-shopping-list-success').toggleClass('hide');
}
function addToListError(xhr, ajaxOptions, thrownError) {
	$('#recipe-to-shopping-list-error').toggleClass('hide');
}