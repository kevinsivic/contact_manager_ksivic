class Api::V1::ContactsController < ApplicationController
  def index
    contact = Contact.all
    render json: contact
  end

  def create
    begin
      contact = Contact.create!(contact_params)
      render json: contact
    rescue ActiveRecord::RecordInvalid => invalid
      render json: invalid.record.errors, status: 400
    end
  end

  private
  def contact_params
    params.permit(:name, :email)
  end
end
