class CreateAlunos < ActiveRecord::Migration[7.1]
  def change
    create_table :alunos do |t|
      t.string :nome
      t.string :matricula
      t.string :telefone

      t.timestamps
    end
  end
end
