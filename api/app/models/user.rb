class User < ApplicationRecord
    has_many :boards, dependent: :destroy
    
    has_secure_password

    validates :email, uniqueness: true
    validates_format_of :email, with: /@/
    validates :password_digest, presence: true
end
