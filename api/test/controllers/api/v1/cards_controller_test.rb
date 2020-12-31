require 'test_helper'

class Api::V1::CardsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @card = cards(:one)
    @column = cards(:one)
    @board = boards(:one)
  end

  test 'should show cards' do
    get api_v1_board_column_cards_url(@board, @column),
    headers: { Authorization: JsonWebToken.encode(user_id: @board.user_id)},
    as: :json
    assert_response :success
  end

  test 'should forbid show cards' do
    get api_v1_board_column_cards_url(@board, @column), as: :json
    assert_response :forbidden
  end

  test 'should show card' do
    get api_v1_board_column_card_url(@board, @column, @card),
    headers: { Authorization: JsonWebToken.encode(user_id: @board.user_id)},
    as: :json
    assert_response :success
  end

  test 'should forbid show card' do
    get api_v1_board_column_card_url(@board, @column, @card),
    as: :json
    assert_response :forbidden
  end

  test 'should create card' do
    assert_difference('Card.count') do
      post api_v1_board_column_cards_url(@board, @column),
        params: { card: { title: @card.title, description: @card.description } },
        headers: { Authorization: JsonWebToken.encode(user_id: @board.user_id)},
        as: :json
    end
    assert_response :created
  end

  test 'should forbid create card' do
    assert_no_difference('Card.count') do
      post api_v1_board_column_cards_url(@board, @column),
          params: { card: { title: @column.title, description: @card.description } },
          as: :json
    end
    assert_response :forbidden
  end

  test 'should update card' do
    patch api_v1_board_column_card_url(@board, @column, @card),
        params: { card: { title: @card.title, description: @card.description } },
        headers: { Authorization: JsonWebToken.encode(user_id: @board.user_id) },
        as: :json
    assert_response :success
  end

  test 'should forbid update card' do
    patch api_v1_board_column_card_url(@board, @column, @card),
        params: { card: { title: @card.title, description: @card.description } },
        headers: { Authorization: JsonWebToken.encode(user_id: users(:two).id ) },
        as: :json
    assert_response :forbidden
  end

  test 'should destroy card' do
    assert_difference('Card.count', -1) do
      delete api_v1_board_column_card_url(@board, @column, @card), 
      headers: { Authorization: JsonWebToken.encode(user_id: @board.user_id ) },
      as: :json
    end
    assert_response :no_content
  end

  test 'should forbid destroy card' do
    assert_no_difference('Card.count') do
      delete api_v1_board_column_card_url(@board, @column, @card),
      headers: { Authorization: JsonWebToken.encode(user_id: users(:two).id ) },
      as: :json
    end
    assert_response :forbidden
  end

end
