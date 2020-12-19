class TeamMembership < ApplicationRecord
    belongs_to :user
    belongs_to :team

    # A team membership has role of owner, admin, or member
    validates_presence_of :role
end
