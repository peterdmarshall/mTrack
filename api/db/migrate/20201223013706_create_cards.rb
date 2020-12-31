class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.belongs_to :column
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
