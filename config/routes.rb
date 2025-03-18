Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'contacts' => "contacts#index"
    end
  end
  root 'homepage#index'
  get "up" => "rails/health#show", as: :rails_health_check
end
