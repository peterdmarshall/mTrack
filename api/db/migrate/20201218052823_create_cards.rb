class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.belongs_to :board
      t.text :body
      t.string :title
      t.string :category

      t.timestamps
    end
  end
end
