class IssuesController < SecuredController

    skip_before_action :authorize_request, only: [:index, :show]

    def index
        issues = Issue.all
        render json: issues 
    end

    def show
        issue = Issue.find(params[:id])
        render json: issue
    rescue ActiveRecord::RecordNotFound
        head :not_found
    end

    def create
        issue = Issue.create!(issue_params)
        render json: issue, status: :created
    end

    def destroy
        issue = Issue.find(params[:id])
        issue.delete
        head :no_content
    end

    private

    def issue_params
        params.permit(:body, :title, :category, :board_id)
    end
end
