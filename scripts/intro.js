

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");
        
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then( res => res.json())
        .then( states => {

            // Preenchendo Options com os Estados vindos da api do IBGE
            for(state of states){
                ufSelect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`;
            }
        })
}

populateUFs();

function populateCities(event) {

    const citySelect = document.querySelector('select[name=city]');
    const stateInput = document.querySelector('input[name=state]');

    stateInput.value = event.target.options[event.target.selectedIndex].text;

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`)
        .then( res => res.json())
        .then( cities => {

            // Preenchendo Options com as Cidades vindas da api do IBGE
            for(city of cities) {
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
            }
        })

    citySelect.removeAttribute('disabled');

}

document.querySelector('select[name=uf]')
    .addEventListener('change', populateCities)

