class UsersController < SecuredController

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    private

    def user_params
        params.permit(:given_name, :family_name, :user_id, :email)
    end

end
