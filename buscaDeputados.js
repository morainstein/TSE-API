const baseUrlTodosOsCandidatos = 'https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome';

const input = document.querySelector('#campo');


nome = "Erika Hilton"
    fetch(baseUrlTodosOsCandidatos)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao obter os dados da API');
        })
        .then(data => {
            const candidato = data.dados.find(candidato => candidato.nome === nome)
            if (candidato) {
                resultadoDiv.innerHTML = `
                    <p>Nome: ${candidato.nome}</p>
                    <p>URL da Foto: <img src="${candidato.urlFoto}" alt="Foto do Candidato"></p>
                    <p>Sigla do Partido: ${candidato.siglaPartido}</p>
                    <p>Sigla do Estado: ${candidato.siglaUf}</p>
                    <p>Email: ${candidato.email}</p>
                `;
            } else {
                resultadoDiv.innerHTML = `<p>${nome} não encontrado(a)! Verifique se você digitou o nome completo e corretamente</p>`;
            }
        })
        .catch(error => {
            resultadoDiv.innerHTML = `<p>Erro: ${error.message}</p>`;
        });

