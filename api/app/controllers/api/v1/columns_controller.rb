class Api::V1::ColumnsController < ApplicationController
    before_action :set_board, only: [:index, :create, :update, :destroy]
    before_action :set_column, only: [:update, :destroy]
    before_action :check_login, only: [:create, :index]
    before_action :check_owner, only: [:update, :destroy]

    # GET /boards/:board_id/columns/:id
    # Returns list of columns for board
    def index
        render json: Column.where(board: @board).all
    end

    # POST /boards/:board_id/columns
    # Creates column for board
    def create
        column = @board.columns.build(column_params)
        if column.save
            render json: column, status: :created
        else
            render json: { errors: column.errors }, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /boards/:board_id/columns/:id
    # Updates column if it belongs to current user
    def update
        if @column.update(column_params)
            render json: @column
        else
            render json: @column.errors, status: :unprocessable_entity
        end
    end

    # DELETE /boards/:board_id/columns/:id
    # Deletes column if it belongs to current user
    def destroy
        @column.destroy
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
        @column = Column.find(params[:id])
    end

    def column_params
        params.require(:column).permit(:title)
    end
end

