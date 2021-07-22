/*
* Conforme documentação da Marvel, para criar a URL é preciso pegar a timeStamp + public + private key
* e então montar isso em um MD5 para passar na URL.
*/
const timeStamp = Math.floor(Date.now() / 1000);
const publicKey = "5db702a0eaf230cab4c321b65c5005f6";
const privateKey = "40af644b0b6d47d46508ef89c7c86db6f22bba97";
const hash = md5(timeStamp+privateKey+publicKey);


const marvel = {
    personagens:()=>{
    const urlAPI = "http://gateway.marvel.com/v1/public/characters?ts="+timeStamp+"&apikey="+publicKey+"&hash="+hash;
    const container = document.querySelector('#personagens-row');
    let contentHTML = "";

    //TESTA SE A URL FOI MONTADA CORRETAMENTE
    //console.log(urlAPI);



    fetch(urlAPI)
        .then(response => response.json())
        .then((json) => {

            //mostrar o json no console
            console.log(json,'RESPONSE.JSON');
            

            for(const herois of json.data.results){
                let urlHeroi = herois.urls[0].url;
                let extensionImg = herois.thumbnail.extension;

                
                // A PARTIR DAQUI TRATA A LISTA DE SÉRIE
                //Pega o Array com a lista de séries, percorre cada valor com o Map e depois separa os nomes por ,
                listaDeSerie = herois.series.items.map(a => a.name);
                let nomesSeriesSeparadoPorVirgula = listaDeSerie.join(", ");

                //console.log(nomesSeriesSeparadoPorVirgula);

                if(nomesSeriesSeparadoPorVirgula == ""){
                    nomesSeriesSeparadoPorVirgula = "Não há serie cadastrada para este herói";
                }            
                // FIM DA LISTA DE SÉRIE
            


                // A PARTIR DAQUI TRATA A LISTA DE EVENTOS
                //Pega o Array com a lista de séries, percorre cada valor com o Map e depois separa os nomes por ,
                let listaDeEventos = herois.events.items.map(a => a.name);
                let nomesEventosSeparadoPorVirgula = listaDeEventos.join(", ");
                //console.log(nomesSeriesSeparadoPorVirgula);

                if(nomesEventosSeparadoPorVirgula == ""){
                    nomesEventosSeparadoPorVirgula = "Não há eventos cadastrado para este herói";
                }
                // FIM DA LISTA DE SÉRIE
   


               /* OBS: Não consegui fazer funcionar :( 
                
                FILTRO 

               let filtro = document.getElementById('buscar');
               let tabela = document.getElementById('listaherois');
                filtro.onkeyup = function() {
                    let nomeFiltro = filtro.value;
                    for (let i = 1; i < tabela.rows.length; i++) {
                        let conteudoCelula = tabela.rows[i].cells[0].innerText;
                        let corresponde = conteudoCelula.toLowerCase().indexOf(nomeFiltro) >= 0;
                        tabela.rows[i].style.display = corresponde ? '' : 'none';
                    }
                };

               FIM FILTRO  */
                
            //MONTA A LISTAGEM EM HTML
               contentHTML += `
                <div class="col-md-12">
                    <table class="table" id="listaherois">

                        <tbody>
                            <tr>
                                <td>
                                    <a href="${urlHeroi}" target="_blank">
                                    <img src="${herois.thumbnail.path}.${extensionImg}" alt="" class="heroi-thumb"/>
                                    </a><h2 class="heroi-nome">${herois.name}</h2>

                                </td>
                                <td>${nomesSeriesSeparadoPorVirgula}</td>
                                <td>${nomesEventosSeparadoPorVirgula}</td>
                            </tr>                        
                        </tbody>
                </table>

                </div>`
            }
            container.innerHTML = contentHTML;
            
        })

    }

};

marvel.personagens();
