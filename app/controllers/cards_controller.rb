class CardsController < SecuredController

    skip_before_action :authorize_request, only: [:index, :show]

    def index
        cards = Card.all
        render json: cards 
    end

    def show
        card = Card.find(params[:id])
        render json: card
    rescue ActiveRecord::RecordNotFound
        head :not_found
    end

    def create
        card = Card.create!(card_params)
        render json: card, status: :created
    end

    def destroy
        card = Card.find(params[:id])
        card.delete
        head :no_content
    end

    private

    def card_params
        params.permit(:body, :title, :category, :board_id)
    end
end
