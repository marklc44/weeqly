class SendShoppingList < ActionMailer::Base
  default from: "marklc44@gmail.com"

  def send_shopping_list_email(shopping_list)
  	@shopping_list = shopping_list
  	@user = @shopping_list.user
  	@recipes = @shopping_list.recipes
  	mail( :to => @user.email, :subject => "Your shopping list from Weeqly")
  end
end
