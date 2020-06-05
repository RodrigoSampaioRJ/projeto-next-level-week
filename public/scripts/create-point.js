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

    citySelect.innerHTML = "<option value=>Selecione a Cidade</option>";
    citySelect.disabled = true;

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`)
        .then( res => res.json())
        .then( cities => {

            // Preenchendo Options com as Cidades vindas da api do IBGE
            for(city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
            }
        })

    citySelect.disabled = false;

}

document.querySelector('select[name=uf]')
        .addEventListener('change', populateCities)



//Itens de Coleta

const collectItens = document.querySelectorAll('.items-grid li')

for(item of collectItens){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')

let selectedItems = [];

function handleSelectedItem(event) {
    //Adicona e remove class na tag 
    const itemLi = event.target;

    itemLi.classList.toggle('selected')

    const itemId = itemLi.dataset.id;

    //Verificar se existem itens selecionados 
    const alreadySelected = selectedItems.findIndex( item => item == itemId)
    
    //Se ja estiver selecionado, retirar do array
    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => item != itemId)
    
    selectedItems = filteredItems
    }else {
    //Se não estiver, adiciona ao array
        selectedItems.push(itemId)
    }
    
    collectedItems.value = selectedItems;
    //Atualiza os valores no input hidden para ser enviado ao formulario

}