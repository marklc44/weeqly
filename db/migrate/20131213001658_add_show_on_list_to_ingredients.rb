class AddShowOnListToIngredients < ActiveRecord::Migration
  def change
    add_column :ingredients, :show_on_list, :boolean
  end
end
