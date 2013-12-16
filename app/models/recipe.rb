class Recipe < ActiveRecord::Base
	has_many :ingredients
	has_many :recipe_on_shopping_lists
	has_many :shopping_lists, :through => :recipe_on_shopping_lists

end
