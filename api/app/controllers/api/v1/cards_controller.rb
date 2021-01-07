class Api::V1::CardsController < ApplicationController
    before_action :set_board, only: [:show, :index, :create, :update, :destroy]
    before_action :set_column, only: [:show, :index, :create, :update, :destroy]
    before_action :set_card, only: [:update, :destroy]
    before_action :check_login, only: [:create, :index]
    before_action :check_owner, only: [:index, :create, :show, :update, :destroy]

    # GET /boards/:board_id/columns/:column_id/cards/:id
    # Returns card
    def show
        render json: @card
    end

    # GET /boards/:board_id/columns/:column_id/cards
    # Returns all cards in column
    def index
        render json: Card.where(column: @column).all.order(:position)
    end

    # POST /boards/:board_id/columns/:column_id/cards
    # Creates card for column
    def create
        card = @column.cards.build(card_params)
        if card.save
            render json: card, status: :created
        else
            render json: { errors: card.errors }, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /boards/:board_id/columns/:column_id/cards/:id
    # Updates card
    def update
        if @card.update(card_params.merge(:column_id => params[:update_column_id]))
            render json: @card
        else
            render json: @card.errors, status: :unprocessable_entity
        end
    end

    # PATCH /boards/:board_id/cards
    # Updates all cards
    def update_all
        cards = params[:cards]
        # Update every card in the cards array with its new position
        cards.each do |card|
            current_card = Card.find_by(id: card[:id])
            current_card.update(title: card[:title], description: card[:description], position: card[:position], column_id: card[:column_id])
        end

        render json: Card.where(column: @column).all
    end

    # DELETE /boards/:board_id/columns/:column_id/cards/:id
    # Deletes card
    def destroy
        # TODO: re-order remaining cards
        @card.destroy
        head 204
    end

    private

    def check_owner
        head :forbidden unless @board.user_id == current_user&.id
    end

    def set_board
        @board = Board.find(params[:board_id])
    end

    def set_column
        @column = Column.find(params[:column_id])
    end

    def set_card
        @card = Card.find(params[:id])
    end

    def card_params
        params.require(:card).permit(:title, :description, :position)
    end
end
