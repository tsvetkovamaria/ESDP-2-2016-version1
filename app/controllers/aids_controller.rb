class AidsController < ApplicationController

  before_action :authenticate_user!, only: [:new, :edit]

  def new
    @aid = Aid.new
    @respond_post = Post.find(params[:respond_post])
  end

  def create
    @aid = Aid.new(aid_params)
    if @aid.save
    redirect_to post_path(params[:aid][:post_id])
    else
      render 'new'
    end
  end

  def edit
    @aid = Aid.find(params[:id])
    @respond_post = @aid.post
  end

  def update
    @aid = Aid.find(params[:id])
    if @aid.update(aid_params)
      redirect_to user_profile_path(current_user.id)
    else
      render 'edit'
    end
  end

  def destroy
    @aid = Aid.find(params[:id])
    if @aid.delete
      redirect_to user_profile_path(current_user.id)
    else
      render @aid
    end
  end

  private
  def aid_params
    params.require(:aid).permit(:description, :status, :organization_id, :user_id, :post_id)
  end
end
