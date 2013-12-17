class ShoppingListsController < ApplicationController
	before_action :authenticate_user!, :only => [:new, :create]
	
	def index
		
		@user_id = current_user
		@shopping_lists = ShoppingList.where(user_id: @user_id)
		@shopping_list = ShoppingList.new
	
		respond_to do |format|
			format.json do
				render :json => {lists: @shopping_lists}
			end
		end
	end

	def new
		@shopping_list = ShoppingList.new
	end

	def create
		yummly_id = params[:recipe => yummly_id]
		user = current_user
		shopping_list = ShoppingList.where(:name => params[:name], :user_id => user.id).first_or_create
		shopping_list.save

		# if shopping_list.save
		# 	redirect_to recipes_path
		# else
		# 	render :new
		# end

		respond_to do |format|
			format.json do
				render :json => {} # change empty object to @object where object is ruby object
			end
		end
	end

	def show
		@page_title = "Shopping list"
		@page_class = "shopping-list"
		@shopping_list = ShoppingList.find(params[:id])
		@recipes = @shopping_list.recipes
	end

	def destroy
		@shopping_list = ShoppingList.find(params[:id])
		@shopping_list.destroy
		
		redirect_to root_path
	end

	private

	def safe_shopping_list_params
		return params.require(:shopping_list).permit(:name)
	end
end
