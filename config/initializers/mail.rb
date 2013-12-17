if Rails.env.production?
    ActionMailer::Base.smtp_settings = {
      :address        => 'smtp.sendgrid.net',
      :port           => '587',
      :authentication => :plain,
      :user_name      => ENV['SENDGRID_USERNAME'],
      :password       => ENV['SENDGRID_PASSWORD'],
      :domain         => 'heroku.com',
      :enable_starttls_auto => true
    }
    ActionMailer::Base.delivery_method = :smtp
else
    ActionMailer::Base.smtp_settings = {
      :address        => 'smtp.sendgrid.net',
      :port           => '587',
      :authentication => :plain,
      :user_name      => 'app19384436@heroku.com',
      :password       => 'b5gaijwx',                
      :domain         => 'heroku.com',
      :enable_starttls_auto => true
    }
    ActionMailer::Base.delivery_method = :smtp
    # ActionMailer::Base.delivery_method = :smtp
end