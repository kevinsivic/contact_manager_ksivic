Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'contacts' => "contacts#index"
      post 'contacts' => "contacts#create"
    end
  end
  root 'homepage#index'
  get '*path', to: 'homepage#index'
  get "up" => "rails/health#show", as: :rails_health_check
end
