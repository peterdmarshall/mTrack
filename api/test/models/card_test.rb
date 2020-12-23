require 'test_helper'

class CardTest < ActiveSupport::TestCase
  test 'should have a non-empty title' do
    card = cards(:one)
    card.title = ''
    assert_not card.valid?
  end
end
