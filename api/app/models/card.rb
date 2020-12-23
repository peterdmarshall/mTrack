class Card < ApplicationRecord
    belongs_to :board

    validates :title, presence: true
    validates :description, presence: true
end
