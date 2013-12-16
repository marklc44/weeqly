require 'json'

class RecipesController < ApplicationController
	def index
		# display ajax call results
		# filter results; also w/api
	end

	def show
		# look up individual recipe by ID on Yummly, display data w/ recipe info in iframe
		@yummly_id = params[:id]
		@user_id = get_user
	end

	def get_user
		if user_signed_in?
			@user_id = current_user.id
		else
			@user_id = nil
		end
	end

	def new

	end

	def create
		recipe = Recipe.where(:yummly_id => params[:yummly_id], :name => params[:name], :url => params[:url]).first_or_create
		recipe.save

		# loop through recipes array to do below
		ingredients = params[:ingredient]
		@inspection = ingredients.inspect

		if recipe.save
			ingredients.each do |ingredient|
				ingredient = Ingredient.where(:name => ingredient[:ing_name], :recipe_id => Recipe.select(:id).last, :show_on_list => true).first_or_create
				ingredient.save
			end
		end

		respond_to do |format|
			format.json do
				render :json => {} # change empty object to @object where object is ruby object
			end
		end
	end

	def edit
	end

	def update
	end

	def destroy
		@recipe = Recipe.find(params[:id])
		@recipe.destroy
		
		redirect_to user_path(current_user)
	end

	private

	def get_recipe_id(yummly_id)
		return recipe_id = Recipe.select(:id).where(yummly_id: yummly_id)
	end

end
