class CreateTeamMemberships < ActiveRecord::Migration[6.0]
  def change
    create_table :team_memberships do |t|
      t.belongs_to :user
      t.belongs_to :team

      t.timestamps
    end
  end
end
