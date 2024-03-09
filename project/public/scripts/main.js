
class Item {
    constructor(name, imagePath) {
        this.name = name;
        this.imagePath = imagePath;
    }
}

const itemImageMap = {
    "proto": new Item("proto", "images/itens-lol/protocinturao-item.png"),
    "eco": new Item("eco", "images/itens-lol/eco-item.webp")
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

            itemImage.src = item.imagePath;
            itemImage.alt = `Imagem do item ${availableSlot + 1}`;
            itemImage.style.display = 'block';

            displayItems.add(itemNameInput);
            
            itemImage.addEventListener('mouseover', () => mostrarNomeItem(imgId, item.name));
            itemImage.addEventListener('mouseout', () => esconderNomeItem(imgId));
        } else {
            console.error('Não há slots disponíveis para exibir a imagem.');
        }
    } else {
        console.error('Este item não foi encontrado ou já foi adicionado');
    }
}

function mostrarNomeItem(imageId, itemName) {
    const abbrElement = document.createElement('abbr');
    abbrElement.textContent = itemName;
    abbrElement.title = itemName;
    document.getElementById(imageId).parentNode.appendChild(abbrElement);
}

function esconderNomeItem(imageId) {
    const abbrElement = document.getElementById(imageId).parentNode.querySelector('abbr');
    if (abbrElement) {
        setTimeout(() => {
            abbrElement.remove();
        },1);
        
    }
}
