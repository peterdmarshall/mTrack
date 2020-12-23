require 'test_helper'

class BoardTest < ActiveSupport::TestCase
  test 'should have a non-empty name' do
    board = boards(:one)
    board.name = ''
    assert_not board.valid?
  end
end
