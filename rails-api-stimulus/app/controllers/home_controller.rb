class HomeController < ApplicationController
  
  def index
    @alunos = Aluno.all

    render json: {
      mensagem: "Bem vindo a api com stimulus!",
      endpoint: "/alunos"
    }
  end

end
