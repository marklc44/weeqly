class UsersController < ApplicationController
	def show
		@user = current_user

		@shopping_lists = ShoppingList.where(user_id: @user.id)
	end
end
