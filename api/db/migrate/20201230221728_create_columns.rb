class CreateColumns < ActiveRecord::Migration[6.0]
  def change
    create_table :columns do |t|
      t.belongs_to :board

      t.string :title

      t.timestamps
    end
  end
end
