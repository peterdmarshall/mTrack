require 'test_helper'

class BoardTest < ActiveSupport::TestCase
  test 'should have a non-empty title' do
    board = boards(:one)
    board.title = ''
    assert_not board.valid?
  end
end
