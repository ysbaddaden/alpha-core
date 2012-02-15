require "rubygems"
require "sinatra"

module AlphaCore
  class App < Sinatra::Base
    configure do
      set :app_file, __FILE__
      set :public, ::File.expand_path('..', __FILE__)
      set :method_override, true
      set :environment, :development
    end

    get "/" do
      redirect "/test/index.html"
    end
  end
end

run AlphaCore::App

