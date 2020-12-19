class Team < ApplicationRecord
    has_many :users
    has_many :boards, :as => :board_owner
end
