class RecipeOnShoppingListsController < ApplicationController
	def create
		recipe_on_shopping_list = RecipeOnShoppingList.new(:shopping_list_id => params[:shopping_list_id])
		recipe = Recipe.where(:yummly_id => params[:yummly_id])
		recipe_on_shopping_list.recipe_id = recipe.id
		# recipe_on_shopping_list.save
	end
end
