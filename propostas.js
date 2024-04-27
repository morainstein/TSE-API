const baseUrlTodosOsCandidatos = 'https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome';
let candidatoId
nome="Arthur Lira"
fetch(baseUrlTodosOsCandidatos)
  .then(response => {
    // Verifica se a requisição foi bem sucedida (status code 200)
    if (response.ok) {
      // A resposta da API está em formato JSON, então você pode convertê-la em um objeto JavaScript
      return response.json();
    }
    throw new Error('Erro ao obter os dados da API');
  })
  .then(data => {
    const candidato = data.dados.find(candidato => candidato.nome === nome)
    if (candidato){
        candidatoId = candidato.id
        console.log(candidatoId)
        const propostas = `https://dadosabertos.camara.leg.br/api/v2/proposicoes?idDeputadoAutor=${candidatoId}&ordem=DESC&ordenarPor=ano`


        fetch(propostas)
        .then(response => {
            // Verifica se a requisição foi bem sucedida (status code 200)
            if (response.ok) {
            // A resposta da API está em formato JSON, então você pode convertê-la em um objeto JavaScript
            return response.json();
            }
            throw new Error('Erro ao obter os dados da API');
        })
        .then(data => {
            console.log(data.dados[0].ano, ": ",data.dados[0].ementa)
            console.log(data.dados[1].ano, ": ",data.dados[1].ementa)
            console.log(data.dados[2].ano, ": ",data.dados[2].ementa)

        })
        .catch(error => {
            console.error('Erro:', error);
        });
            }else console.log(nome+" não encontrado! Verifique se você digitou o nome completo e corretamente")
        
        })
        .catch(error => {
            console.error('Erro:', error);
        });

