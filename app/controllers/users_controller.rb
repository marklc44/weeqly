class UsersController < ApplicationController
	def show
		@page_title = "Shopping lists"
		@page_class = "shopping-lists"
		@user = current_user

		@shopping_lists = ShoppingList.where(user_id: @user.id)
	end
end
