class RecipeOnShoppingList < ActiveRecord::Base
	belongs_to :recipe
	belongs_to :shopping_list
end
