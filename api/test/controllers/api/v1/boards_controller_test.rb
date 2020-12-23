require 'test_helper'

class Api::V1::BoardsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @board = boards(:one)
  end

  test 'should show user boards' do
    get api_v1_boards_url(), 
    headers: { Authorization: JsonWebToken.encode(user_id: @board.user_id) },
    as: :json
    assert_response :success
  end

  test 'should forbid show user boards' do
    get api_v1_boards_url(), as: :json
    assert_response :forbidden
  end

  test 'should show board' do
    get api_v1_board_url(@board), 
    headers: { Authorization: JsonWebToken.encode(user_id: @board.user_id) },
    as: :json
    assert_response :success

    json_response = JSON.parse(self.response.body)
    assert_equal @board.name, json_response['name']
  end

  test 'should forbid show board' do
    get api_v1_board_url(@board), as: :json
    assert_response :forbidden
  end

  test 'should create board' do
    assert_difference('Board.count') do
      post api_v1_boards_url,
          params: { board: { name: @board.name } },
          headers: { Authorization: JsonWebToken.encode(user_id: @board.user_id) },
          as: :json
    end
    assert_response :created
  end

  test 'should forbid create board' do
    assert_no_difference('Board.count') do
      post api_v1_boards_url,
          params: { board: { name: @board.name } },
          as: :json
    end
    assert_response :forbidden
  end

  test 'should update board' do
    patch api_v1_board_url(@board),
        params: { board: { name: @board.name } },
        headers: { Authorization: JsonWebToken.encode(user_id: @board.user_id) },
        as: :json
    assert_response :success
  end

  test 'should forbid update board' do
    patch api_v1_board_url(@board),
        params: { board: { name: @board.name } },
        headers: { Authorization: JsonWebToken.encode(user_id: users(:two).id ) },
        as: :json
    assert_response :forbidden
  end

  test 'should destroy board' do
    assert_difference('Board.count', -1) do
      delete api_v1_board_url(@board), 
      headers: { Authorization: JsonWebToken.encode(user_id: @board.user_id ) },
      as: :json
    end
    assert_response :no_content
  end

  test 'should forbid destroy board' do
    assert_no_difference('Board.count') do
      delete api_v1_board_url(@board),
      headers: { Authorization: JsonWebToken.encode(user_id: users(:two).id ) },
      as: :json
    end
    assert_response :forbidden
  end
end
