# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Board.delete_all
User.delete_all

5.times do
    user = User.create! email: Faker::Internet.email, password: 'password1234'
    puts "Created a new user: #{user.email}"

    3.times do
        board = Board.create!(
            name: Faker::App.name,
            user: user
        )
        puts "Created a new board for #{user.email}: #{board.name}"
    end
end