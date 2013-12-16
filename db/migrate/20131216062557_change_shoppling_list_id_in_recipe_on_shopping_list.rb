class ChangeShopplingListIdInRecipeOnShoppingList < ActiveRecord::Migration
  def change
  	rename_column :recipe_on_shopping_lists, :shoppling_list_id, :shopping_list_id
  end
end
