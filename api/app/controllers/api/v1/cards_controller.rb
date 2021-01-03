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
        render json: Card.where(column: @column).all
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
        if @card.update(card_params.merge(:column_id => params[:new_column_id]))
            render json: @card
        else
            render json: @card.errors, status: :unprocessable_entity
        end
    end

    # DELETE /boards/:board_id/columns/:column_id/cards/:id
    # Deletes card
    def destroy
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
        params.require(:card).permit(:title, :description)
    end
end
