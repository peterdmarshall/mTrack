class Board < ApplicationRecord
    belongs_to :board_owner, polymorphic: true
    has_many :cards

    validates_presence_of :description, :title
end
