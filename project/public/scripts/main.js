
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

let buildNameInput;

const displayItems = new Set();
const builds = [];

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

// Vender itens - FUNCIONANDO
function venderItens() {
  const imagensContainer = document.querySelector(".imagens");
  const buildNameInput = document.getElementById("item").value.trim();
  const miniaturasContainer = document.getElementById("miniaturasContainer");

  const buildNameElement = document.getElementById("buildName");
// so pra ver se o elemento com id existe ja
  if (!buildNameElement) {
    console.error("Elemento com ID 'buildName' não encontrado.");
    return;
}

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

  if (displayItems.size === 6 && buildNameInput !== "") {
    const build = {
      name: buildNameInput,
      items: Array.from(displayItems),
      
    };

    console.log("Itens Vendidos:", build);

    miniaturasContainer = document.getElementById("miniaturasContainer");
    if (!miniaturasContainer) {
      console.error("Elemento com ID 'miniaturasContainer' não encontrado.");
      return;
    }
    miniaturasContainer.innerHTML = "";
    displayItems.forEach((itemName) => {
      const miniaturaImg = document.createElement("img");
      miniaturaImg.className = "miniatura-imagem";
      const item = itemImageMap[itemName];
      miniaturaImg.src = item.imagePath;
      miniaturaImg.alt = `Miniatura do ${itemName} na build ${buildNameInput}`;
      miniaturasContainer.appendChild(miniaturaImg);
    });

    const buildNameElement = document.createElement("div");
    buildNameElement.className = "build-name";
    buildNameElement.textContent = `Build: ${buildNameInput}`;
    buildDiv.appendChild(buildNameElement);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.addEventListener("click", () => deletarBuild(buildDiv));
    buildDiv.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.addEventListener("click", () => editarBuild(buildNameElement));
    buildDiv.appendChild(editButton);


    // displayItems.clear();
    document.querySelector(".imagens").classList.remove("selling-mode");
  } else {
    console.error("Selecione seis itens e insira um nome para salvar a build.");
  }
}

// deletar build
function deletarBuild(buildDiv) {
    const miniaturasContainer = document.getElementById("miniaturasContainer");
    miniaturasContainer.removeChild(buildDiv);

    // if (miniaturasContainer) {
    //   miniaturasContainer.removeChild(buildDiv);
    // } else {
    //   console.error("Elemento com ID 'miniaturasContainer' não encontrado.");
    // }
  }

  function editarBuild(buildNameElement) {
    const novoNome = prompt("Digite o novo nome da build:");
  
    if (novoNome !== null && novoNome.trim() !== "") {
      buildNameElement.textContent = `Build: ${novoNome}`;
    }
  }

// Comprar itens - FUNCIONANDO
function comprarItens() {
    const imagensContainer = document.querySelector(".imagens");
    const miniaturasContainer = document.getElementById("miniaturasContainer");
    const buildNameInput = document.getElementById("item").value.trim();
  
    // verifica se foram seis itens
    if (displayItems.size === 6) {
    const buildNameInput = prompt("Nome da build.:");
      if (buildNameInput !== null && buildNameInput.trim() !== "") {
        const buildDiv = document.createElement("div");
        buildDiv.className = "build-salva";
        builds.push(buildDiv);
        miniaturasContainer.appendChild(buildDiv);
  
        displayItems.forEach((itemName) => {
          const miniaturaImg = document.createElement("img");
          miniaturaImg.className = "miniatura-imagem";
          const item = itemImageMap[itemName];
          miniaturaImg.src = item.imagePath;
          miniaturaImg.alt = (`Miniatura do ${itemName} na build ${buildNameInput}`);
          buildDiv.appendChild(miniaturaImg);
        });
  
        imagensContainer.innerHTML = "";
  
        const buildNameElement = document.createElement("div");
        buildNameElement.className = "build-name";
        buildNameElement.textContent = (`Build: ${buildNameInput}`);
        buildDiv.appendChild(buildNameElement);
  
        // deletar build
        // const deleteButton = document.createElement("button");
        // deleteButton.textContent = "Excluir";
        // deleteButton.addEventListener("click", () => deletarBuild(buildDiv));
        // buildDiv.appendChild(deleteButton);
        function deletarBuild(buildDiv) {
            const miniaturasContainer = document.getElementById("miniaturasContainer");
            const index = builds.indexOf(buildDiv);
            if (index !== -1) {
              builds.splice(index, 1); // Remove a build do array
              miniaturasContainer.removeChild(buildDiv);
            }
          }
          

  
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

//   fynçao p editar noem da build - FUNCIONANDO
  function editarBuild(buildNameElement) {
    const novoNome = prompt("Digite o novo nome da build:");
  
    if (novoNome !== null && novoNome.trim() !== "") {
      buildNameElement.textContent = `Build: ${novoNome}`;
    }
  }

  // // onde as miniaturas vao ficar (criar divs)
  // const buildNameElement = document.createElement('div');
  // buildNameElement.textContent = `Build: ${buildNameInput}`;
  // buildsSalvasContainer.appendChild(buildNameElement);

  // limpar
  




// imagens ainda tao ficando na mesma linha - arrumar isso depos
