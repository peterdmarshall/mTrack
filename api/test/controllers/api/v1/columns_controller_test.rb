require 'test_helper'

class Api::V1::ColumnsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @column = columns(:one)
    @board = boards(:one)
  end

  test 'should show columns' do
    get api_v1_board_columns_url(@board),
    headers: { Authorization: JsonWebToken.encode(user_id: @board.user_id)},
    as: :json
    assert_response :success
  end

  test 'should forbid show columns' do
    get api_v1_board_columns_url(@board), as: :json
    assert_response :forbidden
  end

  test 'should create column' do
    assert_difference('Column.count') do
      post api_v1_board_columns_url(@board),
        params: { column: { title: @column.title } },
        headers: { Authorization: JsonWebToken.encode(user_id: @board.user_id)},
        as: :json
    end
    assert_response :created
  end

  test 'should forbid create column' do
    assert_no_difference('Column.count') do
      post api_v1_board_columns_url(@board),
          params: { column: { title: @column.title } },
          as: :json
    end
    assert_response :forbidden
  end
  
  test 'should update column' do
    patch api_v1_board_column_url(@board, @column),
    params: { column: { title: @column.title } },
    headers: { Authorization: JsonWebToken.encode(user_id: @board.user_id)},
    as: :json
    assert_response :success
  end

  test 'should forbid update column' do
    patch api_v1_board_column_url(@board, @column),
    params: { column: { title: @column.title } },
    as: :json
    assert_response :forbidden
  end

  test 'should destroy column' do
    assert_difference('Column.count', -1) do
      delete api_v1_board_column_url(@board, @column), 
      headers: { Authorization: JsonWebToken.encode(user_id: @board.user_id ) },
      as: :json
    end
    assert_response :no_content
  end

  test 'should forbid destroy column : no header' do
    assert_no_difference('Column.count') do
      delete api_v1_board_column_url(@board, @column),
      as: :json
    end
    assert_response :forbidden
  end

  test 'should forbid destroy column : incorrect user' do
    assert_no_difference('Column.count') do
      delete api_v1_board_column_url(@board, @column),
      headers: { Authorization: JsonWebToken.encode(user_id: users(:two).id ) },
      as: :json
    end
    assert_response :forbidden
  end
end
