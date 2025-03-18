class Api::V1::ContactsController < ApplicationController
  def index
    contact = Contact.all
    render json: contact
  end

  def create
    begin
      contact = Contact.create!(create_contact_params)
      render json: contact
    rescue ActiveRecord::RecordInvalid => invalid
      render json: invalid.record.errors, status: 400
    end
  end

  def delete
    puts delete_contact_params[:id]
    contact = Contact.find_by_id(delete_contact_params[:id])
    contact.delete
  end

  private
  def create_contact_params
    params.permit(:name, :email)
  end

  def delete_contact_params
    params.permit(:id)
  end
end
