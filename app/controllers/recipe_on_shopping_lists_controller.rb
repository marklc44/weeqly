class RecipeOnShoppingListsController < ApplicationController
    def create
        user = current_user
        recipe_on_shopping_list = RecipeOnShoppingList.new
        
        if params[:shopping_list_id] != ""
            recipe_on_shopping_list.shopping_list = ShoppingList.find(params[:shopping_list_id])
        else
            new_shopping_list = ShoppingList.where(:user_id => user.id).last
            recipe_on_shopping_list.shopping_list = new_shopping_list
        end
        recipe_on_shopping_list.recipe = Recipe.where(:yummly_id => params[:yummly_id]).first
        recipe_on_shopping_list.save

        if recipe_on_shopping_list.save
            # here also I can respond with json and send recipe/shopping_list back to the page
	        render :nothing => true
	    else
	    	render :new
	    end
    end
end