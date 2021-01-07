class Card < ApplicationRecord
    belongs_to :column

    validates :title, presence: true
    validates :position, presence: true
end
