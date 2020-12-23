class Api::V1::BoardsController < ApplicationController
    before_action :set_board, only: [:show, :update, :destroy]
    before_action :check_login, only: [:create, :index]
    before_action :check_owner, only: [:show, :update, :destroy]

    # GET /boards/:id
    # Returns board if it belongs to user
    def show
        render json: @board
    end

    # GET /boards
    # Returns list of boards that belong to current user
    def index
        render json: Board.where(user: current_user).all
    end

    # POST /boards
    # Creates board if it belongs to current user
    def create
        board = current_user.boards.build(board_params)
        if board.save
            render json: board, status: :created
        else
            render json: { errors: board.errors }, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /boards/:id
    # Updates board if it belongs to current user
    def update
        if @board.update(board_params)
            render json: @board
        else
            render json: @board.errors, status: :unprocessable_entity
        end
    end

    # DELETE /boards/:id
    # Deletes board if it belongs to current user
    def destroy
        @board.destroy
        head 204
    end

    private

    def check_owner
        head :forbidden unless @board.user_id == current_user&.id
    end

    def set_board
        @board = Board.find(params[:id])
    end

    def board_params
        params.require(:board).permit(:name)
    end
end
