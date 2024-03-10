
class Item {
    constructor(name, imagePath) {
        this.name = name;
        this.imagePath = imagePath;
    }
}

const itemImageMap = {
    "proto": new Item("proto", "images/itens-lol/protocinturao-item.png"),
    "eco": new Item("eco", "images/itens-lol/eco-item.webp"),
    "eco2": new Item("eco", "images/itens-lol/eco-item.webp"),
    "eco3": new Item("eco", "images/itens-lol/eco-item.webp"),
    "eco4": new Item("eco", "images/itens-lol/eco-item.webp"),
    "eco5": new Item("eco", "images/itens-lol/eco-item.webp"),
    "eco6": new Item("eco", "images/itens-lol/eco-item.webp")
};

const displayItems = new Set();

function mostrarImagem() {
    const itemNameInput = document.getElementById('item').value.trim().toLowerCase();
    const item = itemImageMap[itemNameInput];
    const imagesContainer = document.querySelectorAll('.itemImage');

    console.log('Nome do Item:', itemNameInput);

    if (item && !displayItems.has(itemNameInput) && displayItems.size < 6) {
        const availableSlot = Array.from(imagesContainer).findIndex(img => !img.src);
        if (availableSlot !== -1) {
            const imgId = `itemImage${availableSlot + 1}`;
            const itemImage = document.getElementById(imgId);

            // const deleteIcon = document.createElement('i');
            // deleteIcon.className = 'bx bx-x delete-icon';
            // deleteIcon.addEventListener('click', () => deletarItem(itemNameInput, imgId));
            // itemImage.parentNode.appendChild(deleteIcon);

            itemImage.src = item.imagePath;
            itemImage.alt = `Imagem do item ${availableSlot + 1}`;
            itemImage.style.display = 'block';

            displayItems.add(itemNameInput);
            // // displayItems.add(itemNameInput);
            
            // itemImage.addEventListener('mouseover', () => mostrarNomeItem(imgId, item.name));
            // itemImage.addEventListener('mouseout', () => esconderNomeItem(imgId));
        } else {
            console.error('Não há slots disponíveis para exibir a imagem.');
        }
    } else {
        console.error('Este item não foi encontrado ou já foi adicionado');
    }

    document.querySelector('.imagens').classList.add('selling-mode');
}

// function editarItem(imageId) {
//     const novoNome = prompt("Digite a nova palavra-chave para a imagem:");

//     if (novoNome !== null && novoNome.trim() !== "") {
//         const itemImage = document.getElementById(imageId);
//         const deleteButton = itemImage.nextElementSibling;

//         // Atualizar a palavra-chave associada à imagem
//         itemImage.alt = `Imagem do item ${novoNome}`;
//         // Adicionar ou atualizar o evento de deletar com a nova palavra-chave
//         deleteButton.onclick = () => deletarItem(`itemContainer${novoNome}`);
//     }
// }

function venderItens() {
    const imagensContainer = document.querySelector('.imagens');
    const buildNameInput = document.getElementById('buildName').value.trim();

    imagensContainer.querySelectorAll('.itemImage').forEach((itemImage, index) => {
        itemImage.src = '';
        itemImage.style.display = 'none';

        const deleteIcon = imagensContainer.querySelector(`#deleteIcon${index + 1}`);
        if (deleteIcon) {
            deleteIcon.remove();
        }
    });

    const imageContainers = imagensContainer.querySelectorAll('.itemImage');
    imageContainers.forEach((imageContainer, index) => {
        const deleteIcon = document.createElement('i');
        deleteIcon.id = `deleteIcon${index + 1}`;
        deleteIcon.className = 'bx bx-x delete-icon';
        deleteIcon.addEventListener('click', () => deletarItem(displayItems[index], `itemImage${index + 1}`));
        imageContainer.parentNode.appendChild(deleteIcon);
    });

    if (displayItems.size === 6 && buildNameInput !== '') {
        const build = {
            name: buildNameInput,
            items: Array.from(displayItems)
        };

        console.log('Build Salva:', build);
        miniaturasContainer.innerHTML = '';
        displayItems.forEach(itemName => {
            const miniaturaImg = document.createElement('img');
            const item = itemImageMap[itemName];
            miniaturaImg.src = item.imagePath;
            miniaturaImg.alt = `Miniatura do ${itemName} na build ${buildNameInput}`;
            miniaturasContainer.appendChild(miniaturaImg);
        });

        displayItems.clear();
        document.querySelector('.imagens').classList.remove('selling-mode');
    } else {
        console.error('Selecione seis itens e insira um nome para salvar a build.');
    }
}
