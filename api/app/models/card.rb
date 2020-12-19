class Card < ApplicationRecord
    belongs_to :board

    validates_presence_of :body, :title, :category
end
