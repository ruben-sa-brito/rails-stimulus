import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.renderLista();
  }
  static base_uri = "http://127.0.0.1:3001/"

  async cadastrar(event) {
    event.preventDefault();
    const nome = this.element.querySelector("input[name='nome']").value;
    const telefone = this.element.querySelector("input[name='telefone']").value;
    const matricula = this.element.querySelector("input[name='matricula']").value;

    if(!nome || nome == "") {
      alert("O nome é obrigatorio!")
      this.element.querySelector("input[name='nome']").focus();
      return;
    }

    if(!telefone || telefone == "") {
      alert("O telefone é obrigatorio!")
      this.element.querySelector("input[name='telefone']").focus();
      return;
    }

    if(!matricula || matricula == "") {
      this.element.querySelector("input[name='matricula']").focus();
      alert("O matricula é obrigatorio!")
      return;
    }

    const payload = {
      nome: nome,
      telefone: telefone,
      matricula: matricula
    }
    const url = `${this.constructor.base_uri}/alunos`
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      this.renderLista();
    } catch (error) {
      console.error('Error ao cadastrar aluno:', error);
    }


    
  }
  async atualizar(event) {
    event.preventDefault();
    const id = this.element.querySelector("input[name='id']").value;
    const nome = this.element.querySelector("input[name='nome']").value;
    const telefone = this.element.querySelector("input[name='telefone']").value;
    const matricula = this.element.querySelector("input[name='matricula']").value;
    if(!nome || nome == "") {
      alert("O nome é obrigatorio!")
      this.element.querySelector("input[name='nome']").focus();
      return;
    }

    if(!telefone || telefone == "") {
      alert("O telefone é obrigatorio!")
      this.element.querySelector("input[name='telefone']").focus();
      return;
    }

    if(!matricula || matricula == "") {
      this.element.querySelector("input[name='matricula']").focus();
      alert("O matricula é obrigatorio!")
      return;
    }

    const payload = {
      nome: nome,
      telefone: telefone,
      matricula: matricula
    }
    const url = `${this.constructor.base_uri}/alunos/${id}`
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      this.renderLista();
    } catch (error) {
      console.error('Error ao cadastrar aluno:', error);
    }


    
  }
  
  novo() {
    this.element.innerHTML = ` 
      <form data-action="submit->alunos#cadastrar">
        <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" class="form-control" name="nome" placeholder="Digite seu nome">
        </div>
        <div class="form-group">
            <label for="telefone">Telefone</label>
            <input type="tel" class="form-control" name="telefone" placeholder="Digite seu telefone">
        </div>
        <div class="form-group">
            <label for="matricula">Matrícula</label>
            <input type="text" class="form-control" name="matricula" placeholder="Digite sua matrícula">
        </div>
        <br>
        <button type="submit" class="btn btn-primary" data-action="submit->alunos#cadastrar">Enviar</button>
        <button class="btn btn-danger" data-action="click->alunos#renderLista">Cancelar</button>
      </form>
    `
  }

  async renderLista() {
    try {
        const response = await fetch(`${this.constructor.base_uri}/alunos`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const alunos = await response.json();
        if (alunos.length > 0) {
          this.element.innerHTML = `
                                    <button class="btn btn-primary" data-action="click->alunos#novo">Novo</button>
                                    <table class="table">
                                      <thead>
                                        <tr>
                                          <th scope="col"></th>
                                          <th scope="col">Nome</th>
                                          <th scope="col">Telefone</th>
                                          <th scope="col">Matricula</th>
                                          <th scope="col"></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                        ${
                                          alunos.map(
                                            aluno =>
                                              `
                                            <tr>
                                              <td>${aluno.id}</td>
                                              <td>${aluno.nome}</td>
                                              <td>${aluno.telefone}</td>
                                              <td>${aluno.matricula}</td>
                                              <td>
                                                <button type="button" class="btn btn-warning" data-action="click->alunos#editar" data-aluno-id=${aluno.id}>Editar</button>
                                                <button type="button" class="btn btn-danger" data-action="click->alunos#excluir" data-aluno-id=${aluno.id}>Excluir</button>
                                              </td>
                                              </tr>
                                            `
                                          ).join('')
                                        }
                                        
                                      </tbody>
                                    </table>`
        }
        else {
          this.element.innerHTML = '<h3> Não tenho alunos cadastrados </h3>'

        }                            
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
    }
    
  }

  async editar(event) {
    const id = event.currentTarget.dataset.alunoId
    const response = await fetch(`${this.constructor.base_uri}/alunos/${id}`);
    const aluno = await response.json();
    this.element.innerHTML = ` 
      <form data-action="submit->alunos#atualizar">
        <div class="form-group">
          <label for="nome">Id</label>
          <input type="text" class="form-control" name="id" placeholder="Digite seu nome" value="${aluno.id}">
      </div>
        <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" class="form-control" name="nome" placeholder="Digite seu nome" value="${aluno.nome}">
        </div>
        <div class="form-group">
            <label for="telefone">Telefone</label>
            <input type="tel" class="form-control" name="telefone" placeholder="Digite seu telefone" value="${aluno.telefone}">
        </div>
        <div class="form-group">
            <label for="matricula">Matrícula</label>
            <input type="text" class="form-control" name="matricula" placeholder="Digite sua matrícula" value="${aluno.matricula}">
        </div>
        <br>
        <button type="submit" class="btn btn-primary" data-action="submit->alunos#atualizar" >Enviar</button>
      </form>
    `

  }


  async excluir(event) {
    const id = event.currentTarget.dataset.alunoId
    if(confirm("Confima exclusão?")){
      const url = `${this.constructor.base_uri}/alunos/${id}`
      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'content-Type': 'application/json',
          }
        })
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        this.renderLista();
      } catch (error) {
        console.error('Error ao cadastrar aluno:', error);
      }

    }
  }
}
