
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
    const imagesContainer = document.querySelector('.imagens');

    console.log('Nome do Item:', itemNameInput);

    if (item && !displayItems.has(itemNameInput) && displayItems.size < 6) {
        const availableSlot = displayItems.size + 1;
        const imgId = `itemImage${availableSlot}`;
        let itemImage = document.getElementById(imgId);

        if (!itemImage) {
            itemImage = document.createElement('img');
            itemImage.id = imgId;
            itemImage.className = 'itemImage';
            itemImage.alt = `Imagem do item ${availableSlot}`;
            imagesContainer.appendChild(itemImage);
        }

        itemImage.src = item.imagePath;
        itemImage.style.display = 'block';

        displayItems.add(itemNameInput);
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


// Vender itens
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

    imagensContainer.innerHTML = '';

    const imageContainers = imagensContainer.querySelectorAll('.itemImage');
    imageContainers.forEach((imageContainer, index) => {
        const deleteIcon = document.createElement('i');
        deleteIcon.id = `deleteIcon${index + 1}`;
        deleteIcon.className = 'bx bx-x delete-icon';
        deleteIcon.addEventListener('click', () => deletarItem(displayItems[index], `itemImage${index + 1}`));
        imageContainer.parentNode.appendChild(deleteIcon);
    });

    displayItems.clear();

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

// Comprar itens
function comprarItens() {
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

    const miniaturasContainer = document.getElementById('miniaturasContainer');
    const buildsSalvasContainer = document.getElementById('buildsSalvas');

    if (buildNameInput !== '') {
        // vai criar uma nova div pra cada nova build
        const buildDiv = document.createElement('div');
        buildDiv.className = 'build-salva';

        displayItems.forEach(itemName => {
            const miniaturaImg = document.createElement('img');
            const item = itemImageMap[itemName];
            miniaturaImg.src = item.imagePath;
            miniaturaImg.alt = `Miniatura do ${itemName} na build ${buildNameInput}`;
            miniaturasContainer.appendChild(miniaturaImg);
        });

        buildsSalvasContainer.appendChild(buildDiv);

        const build = {
            name: buildNameInput,
            items: Array.from(displayItems)
        };

        console.log('Build Salva:', build);

        // onde as miniaturas vao ficar (criar divs)
        const buildNameElement = document.createElement('div');
        buildNameElement.textContent = `Build: ${buildNameInput}`;
        buildsSalvasContainer.appendChild(buildNameElement);
        
        // limpar
        displayItems.clear();
        document.querySelector('.imagens').classList.remove('selling-mode');
    } else {
        console.error('Insira um nome para salvar a build.');
    }
}

