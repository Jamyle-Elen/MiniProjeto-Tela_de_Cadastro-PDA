
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
    const itemNameInput = document.getElementById('item').value.trim();
    const itemName = itemNameInput.toLowerCase();
    const imagePath = itemImageMap[itemName];
    const imagesContainer = document.querySelectorAll('.itemImage');

    console.log('Nome do Item:', itemName);

    if (imagePath && !displayItems.has(itemName) && displayItems.size < 6) {
        const availableSlot = Array.from(imagesContainer).findIndex(img => img.src === '');
        if (availableSlot !== -1) {
            const imgId = `itemImage${availableSlot + 1}`;
            const itemImage = document.getElementById(imgId);

            itemImage.src = imagePath.imagePath;
            itemImage.alt = `Imagem do item ${availableSlot + 1}`;
            itemImage.style.display = 'block';

            displayItems.add(itemName);
        } else {
            console.error('Não há slots disponíveis para exibir a imagem.');
        }
    } else {
        console.error('Este item não foi encontrado ou já foi adicionado');
    }
}
