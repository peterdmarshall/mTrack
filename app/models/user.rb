class User < ApplicationRecord
    has_many :boards, :as => :board_owner
    has_many :teams, :through => :team_memberships
    has_many :team_memberships

    validates :given_name, presence: true
    validates :family_name, presence: true
    validates :user_id, presence: true
    validates :email, presence: true
end
