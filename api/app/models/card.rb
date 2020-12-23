class Card < ApplicationRecord
    belongs_to :board

    validates :title, presence: true
    validates :body, presence: true
end
