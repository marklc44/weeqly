class CreateShoppingLists < ActiveRecord::Migration
  def change
    create_table :shopping_lists do |t|
      t.text :name
      t.boolean :completed
      t.integer :user_id

      t.timestamps
    end
  end
end
