Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :users, only: [:show, :create, :update, :destroy, :index]
      resources :boards, only: [:show, :create, :update, :destroy, :index] do
        resources :cards
      end
      resources :tokens, only: [:create]
    end
  end
end
