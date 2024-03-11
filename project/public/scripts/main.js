class Item {
  constructor(name, imagePath) {
    this.name = name;
    this.imagePath = imagePath;
  }
}

const itemImageMap = {
  proto: new Item("proto", "images/itens-lol/protocinturao-item.png"),
  eco: new Item("eco", "images/itens-lol/eco-item.webp"),
  eco2: new Item("eco", "images/itens-lol/eco-item.webp"),
  eco3: new Item("eco", "images/itens-lol/eco-item.webp"),
  eco4: new Item("eco", "images/itens-lol/eco-item.webp"),
  eco5: new Item("eco", "images/itens-lol/eco-item.webp"),
  eco6: new Item("eco", "images/itens-lol/eco-item.webp"),
};

const displayItems = new Set();

function mostrarImagem() {
  const itemNameInput = document
    .getElementById("item")
    .value.trim()
    .toLowerCase();
  const item = itemImageMap[itemNameInput];
  const imagesContainer = document.querySelector(".imagens");

  console.log("Nome do Item:", itemNameInput);

  if (item && !displayItems.has(itemNameInput) && displayItems.size < 6) {
    const availableSlot = displayItems.size + 1;
    const imgId = `itemImage${availableSlot}`;
    let itemImage = document.getElementById(imgId);

    if (!itemImage) {
      itemImage = document.createElement("img");
      itemImage.id = imgId;
      itemImage.className = "itemImage";
      itemImage.alt = `Imagem do item ${availableSlot}`;
      imagesContainer.appendChild(itemImage);
    }

    itemImage.src = item.imagePath;
    itemImage.style.display = "block";

    displayItems.add(itemNameInput);
  } else {
    console.error("Este item não foi encontrado ou já foi adicionado");
  }

  document.querySelector(".imagens").classList.add("selling-mode");
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
  const imagensContainer = document.querySelector(".imagens");


  imagensContainer
    .querySelectorAll(".itemImage")
    .forEach((itemImage, index) => {
      itemImage.src = "";
      itemImage.style.display = "none";

      const deleteIcon = imagensContainer.querySelector(
        `#deleteIcon${index + 1}`
      );
      if (deleteIcon) {
        deleteIcon.remove();
      }
    });

  imagensContainer.innerHTML = "";

  const imageContainers = imagensContainer.querySelectorAll(".itemImage");
  imageContainers.forEach((imageContainer, index) => {
    const deleteIcon = document.createElement("i");
    deleteIcon.id = `deleteIcon${index + 1}`;
    deleteIcon.className = "bx bx-x delete-icon";
    deleteIcon.addEventListener("click", () =>
      deletarItem(displayItems[index], `itemImage${index + 1}`)
    );
    imageContainer.parentNode.appendChild(deleteIcon);
  });

  displayItems.clear();

  const build = {
    name: buildNameInput,
    items: Array.from(displayItems)
};

  if (displayItems.size === 6 && buildNameInput !== "") {
    console.log("Build Salva:", build);
    miniaturasContainer.innerHTML = "";
    displayItems.forEach((itemName) => {
      const miniaturaImg = document.createElement("img");
      const item = itemImageMap[itemName];
      miniaturaImg.src = item.imagePath;
      miniaturaImg.alt = `Miniatura do ${itemName} na build ${buildNameInput}`;
      miniaturasContainer.appendChild(miniaturaImg);
    });

    displayItems.clear();
    document.querySelector(".imagens").classList.remove("selling-mode");
  } else {
    console.error("Selecione seis itens e insira um nome para salvar a build.");
  }
}

// Comprar itens - FUNCIONANDO
function comprarItens() {
  const imagensContainer = document.querySelector(".imagens");
  const miniaturasContainer = document.getElementById("miniaturasContainer");
  const buildNameInput = prompt("Nome da build.:");


  // verifica se foram seis itens
  if (displayItems.size === 6) {
    if (buildNameInput !== null && buildNameInput.trim() !== "") {
      const buildDiv = document.createElement("div");
      buildDiv.className = "build-salva";
      miniaturasContainer.appendChild(buildDiv);

      displayItems.forEach((itemName) => {
        const miniaturaImg = document.createElement("img");
        miniaturaImg.className = "miniatura-imagem";
        const item = itemImageMap[itemName];
        miniaturaImg.src = item.imagePath;
        miniaturaImg.alt = `Miniatura do ${itemName} na build ${buildNameInput}`;
        miniaturasContainer.appendChild(miniaturaImg);
      });

      imagensContainer.innerHTML = "";

      const buildNameElement = document.createElement("div");
      buildNameElement.className = "build-name";
      buildNameElement.textContent = `Build: ${buildNameInput}`;
      buildDiv.appendChild(buildNameElement);

      // deletar build
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Excluir";
      deleteButton.addEventListener("click", () => deletarBuild(buildDiv));
      buildDiv.appendChild(deleteButton);

      // editar nome da build
      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.addEventListener("click", () => editarBuild(buildNameElement));
      buildDiv.appendChild(editButton);

      document.querySelector(".imagens").classList.remove("selling-mode");
      displayItems.clear();
    } else {
      console.error("Nome da build inválido.");
    }
  } else {
    console.error("Selecione seis itens antes de comprar a build.");
  }
}

// function salvarEdicaoBuild() {
//     const novoNome = document.getElementById('novoNomeBuild').value.trim();

//     if (novoNome !== '') {
//         // faz a att p original
//         const buildNameElement = document.querySelector('.build-name');
//         buildNameElement.textContent = `Build: ${novoNome}`;

//         fecharModalEditar();
//     }

const build = {
  name: buildNameInput,
  items: Array.from(displayItems),
};

console.log("Build Salva:", build);

// // onde as miniaturas vao ficar (criar divs)
// const buildNameElement = document.createElement('div');
// buildNameElement.textContent = `Build: ${buildNameInput}`;
// buildsSalvasContainer.appendChild(buildNameElement);

// limpar

// imagens ainda tao ficando na mesma linha - arrumar isso depos
