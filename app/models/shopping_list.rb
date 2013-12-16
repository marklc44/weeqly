class ShoppingList < ActiveRecord::Base
	has_many :recipe_on_shopping_lists
	has_many :recipes, :through => :recipe_on_shopping_lists
	belongs_to :user
end
