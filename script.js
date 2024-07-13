const pintarCesta = () => {
  const comprasContent = document.getElementById("comprasContent");
  const vistaCesta = document.getElementById("vistaCesta");
  const modalContainer = document.getElementById("modal-container");
  const showAlert = document.getElementById("showAlert");
  const cantidadCarrito = document.getElementById("cantidadCesta");

  let cesta = JSON.parse(localStorage.getItem("compras")) || [];

  const elementos = 

  //let cesta = JSON.parse(localStorage.getItem("compras")) || [];

  elementos.forEach((elements) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <h3>${elements.nombre}</h3>
    <p class="price">${elements.precio} $</p>
    `;

    comprasContent.append(content);

    let comprar = document.createElement("button")
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);
    comprar.addEventListener("click", () => {
      const repeat = cesta.some((repeatProduct) => repeatProduct.id === product.id);

      if (repeat) {
        cesta.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
          }
        });
      } else {
        cesta.push({
          id: product.id,
          img: product.img,
          nombre: product.nombre,
          precio: product.precio,
          cantidad: product.cantidad,
        });
        console.log(carrito);
        console.log(carrito.length);
        carritoCounter();
        saveLocal();
      }
    });
  });

  const vistaCesta = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `

    <h1 class="modal-header-title">Cesta.>/h1>
    
    `;

    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "z";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
      modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

const getProducts=async()=>{
  const response= await fetch("dato.json");
  const dato=await response.json();
  console.log(data);

};

getProducts();

    dato.forEach((product) => {
      let cestaContent = document.createElement("div")
      cestaContent.className = "modal-content"
      cestaContent.innerHTML = `
        <h3>${element.nombre}>/h3>
        <p>${element.precio}$</p>
        <span class="restar"> - </span>
        <p>${product.cantidad}</p>
        <span class="sumar"> + </span>
        <p>Total: ${product.cantidad * product.precio} $</p>
        <span class="delete-product"> ❌ </span>
      `;

      modalContainer.append(cestaContent);

      let restar = cestaContent.querySelector(".restar");

      restar.addEventListener("click", () => {
        if (product.cantidad !== 1) {
          product.cantidad--;
        }
        saveLocal();
        pintarCesta();
      });

      let sumar = cestaContent.querySelector(".sumar");
      sumar.addEventListener("click", () => {
        product.cantidad++;
        saveLocal();
        pintarCesta();
      });

      let eliminar = cestaContent.querySelector(".delete-product");

      eliminar.addEventListener("click", () => {
        eliminarProducto(product.id);
      });
    });

    const total = cesta.reduce((acc, the) => acc + the.valor, 0);
    const totalCompra = document.createElement("div")
    totalCompra.className = "total-content"
    totalCompra.innerHTML = `total a pagar: ${total} $`;
    modalContainer.append(totalCompra);
  }
};
vistaCesta.addEventListener("click", pintarCesta);

const eliminarProducto = (id) => {
  const foundId = cesta.find((element) => element.id === id);

  console.log(foundId);

  cesta = cesta.filter((carritoId) => {
    return cestaId !== foundId;
  });

  cestaCounter();
  saveLocal();
  pintarCesta();
};

const cestaCounter = () => {
  cantidadCesta.style.display = "block";

  const cestaLength = cesta.length;

  localStorage.setItem("cestaLength", JSON.stringify(cestaLength));

  cantidadCesta.innerText = JSON.parse(localStorage.getItem("cestaLength"));
};

cestaCounter();

//set item
const saveLocal = () => {

  localStorage.setItem("compras", JSON.stringify(cesta));
};


