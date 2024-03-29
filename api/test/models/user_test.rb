require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test 'user with a valid email should be valid' do
    user = User.new(email: 'test@test.org', password_digest: 'test')
    assert user.valid?
  end

  test 'user with invalid email should be invalid' do
    user = User.new(email: 'test', password_digest: 'test')
    assert_not user.valid?
  end

  test 'user with taken email should be invalid' do
    other_user = users(:one)
    user = User.new(email: other_user.email, password_digest: 'test')
    assert_not user.valid?
  end

  test 'destroy user should destroy linked board' do
    assert_difference('Board.count', -1) do
      users(:one).destroy
    end
  end

  test 'destroy user should destroy linked board columns' do
    assert_difference('Column.count', -1) do
      users(:one).destroy
    end
  end

  test 'destroy user should destroy linked column cards' do
    assert_difference('Card.count', -1) do
      users(:one).destroy
    end
  end
end
