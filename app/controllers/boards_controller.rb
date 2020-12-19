class BoardsController < SecuredController

    skip_before_action :authorize_request, only: [:index, :show]

    def index
        boards = Board.includes(:issues).all
        render json: boards 
    end

    def show
        board = Board.includes(:issues).find(params[:id])
        render json: { "board": board, "issues": board.issues }
    rescue ActiveRecord::RecordNotFound
        head :not_found
    end

    def create
        board = Board.create!(board_params.merge(board_owner: User.find_by(user_id: params[:user_id])).except(:user_id))
        render json: board, status: :created
    end

    def destroy
        board = Board.find(params[:id])
        board.delete
        head :no_content
    end

    private

    def board_params
        params.permit(:description, :title, :user_id)
    end

end
