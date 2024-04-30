const baseUrlTodosOsCandidatos = 'https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome';

const inputFicha = document.querySelector('#ficha #nomeInput');
const inputPropostas = document.querySelector('#propostas #nomeInput');
const resultadoDiv = document.querySelector('#retorno');

document.querySelector('#buscarFichaButton').addEventListener('click', function() {
    const nome = inputFicha.value.trim().toLowerCase(); // Converter para minúsculas

    fetch(baseUrlTodosOsCandidatos)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao obter os dados da API');
        })
        .then(data => {
            const candidato = data.dados.find(candidato => candidato.nome.toLowerCase() === nome)
            if (candidato) {
                resultadoDiv.innerHTML = `
                    <p>Nome: ${candidato.nome}</p>
                    ${candidato.urlFoto ? `<img src="${candidato.urlFoto}" alt="Foto do Candidato" id="photocandidate"></p>` : ''}
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
});

document.querySelector('#buscarPropostasButton').addEventListener('click', function() {
    const nome = inputPropostas.value.trim().toLowerCase(); // Converter para minúsculas

    fetch(baseUrlTodosOsCandidatos)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao obter os dados da API');
        })
        .then(data => {
            const candidato = data.dados.find(candidato => candidato.nome.toLowerCase() === nome)
            if (candidato) {
                const propostas = `https://dadosabertos.camara.leg.br/api/v2/proposicoes?idDeputadoAutor=${candidato.id}&ordem=DESC&ordenarPor=ano`;

                fetch(propostas)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Erro ao obter os dados da API');
                    })
                    .then(data => {
                        // Aqui você pode fazer algo com as propostas do candidato
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                    });
            } else {
                resultadoDiv.innerHTML = `<p>${nome} não encontrado(a)! Verifique se você digitou o nome completo e corretamente</p>`;
            }
        })
        .catch(error => {
            resultadoDiv.innerHTML = `<p>Erro: ${error.message}</p>`;
        });
});
