class RecipeOnShoppingListsController < ApplicationController
	def create
		recipe_on_shopping_list = RecipeOnShoppingList.new
		recipe_on_shopping_list.shopping_list = ShoppingList.find(params[:shopping_list_id])
		recipe_on_shopping_list.recipe = Recipe.where(:yummly_id => params[:yummly_id]).first
		# recipe_on_shopping_list.save
	end
end
