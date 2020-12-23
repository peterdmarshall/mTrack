class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.belongs_to :board
      t.string :title
      t.string :body
      
      t.timestamps
    end
  end
end
