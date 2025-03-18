class Api::V1::ContactsController < ApplicationController
  def index
    contact = Contact.all
    render json: contact
  end
end
