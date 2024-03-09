const itemImageMap = {
    "proto": "images/itens-lol/protocinturao-item.png",
    "eco": "images/itens-lol/eco-item.webp"
};

const displayItems = new Set();

function mostrarImagem() {
    const itemName = document.getElementById('item').value.toLowerCase();
    const imagePath = itemImageMap[itemName];
    const imagesContainer = document.querySelector('.imagens');

    if (imagePath && !displayItems.has(itemName) && displayItems.size < 6) {
        const availableSlot = Array.from(displayItems).findIndex(slot => !displayItems.has(`itemImage${slot + 1}`));
        const imgId = `itemImage${availableSlot + 1}`;

        const itemImage = document.getElementById(imgId);
        itemImage.src = imagePath;
        itemImage.alt = `Imagem do item ${availableSlot + 1}`;
        itemImage.style.display = 'block';

        displayItems.add(itemName);
    } else {
        alert('Este item não foi encontrado ou já foi adicionado');
    }
}