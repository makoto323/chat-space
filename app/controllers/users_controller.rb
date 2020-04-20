class UsersController < ApplicationController
  def index
    #キーワードがなければnilを返す
    return nil if params[:keyword] == ""
    #その文字を含むユーザーを探してきて、@usersに代入、ただしログインしている自分は除く。10人まで。
    @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit

  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end