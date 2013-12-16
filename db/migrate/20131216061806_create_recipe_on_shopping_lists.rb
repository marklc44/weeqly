class CreateRecipeOnShoppingLists < ActiveRecord::Migration
  def change
    create_table :recipe_on_shopping_lists do |t|
      t.integer :recipe_id
      t.integer :shoppling_list_id

      t.timestamps
    end
  end
end
