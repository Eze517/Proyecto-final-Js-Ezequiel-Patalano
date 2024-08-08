const pintarCesta = async () => {
  const comprasContent = document.getElementById("comprasContent");
  const modalContainer = document.getElementById("modal-container");
  const cantidadCesta = document.getElementById("cantidadCesta");

  let cesta = JSON.parse(localStorage.getItem("compras")) || [];

  const getProducts = async () => {
      const response = await fetch("dato.json");
      const data = await response.json();
      return data;
  };

  const products = await getProducts();

  comprasContent.innerHTML = ""; // Limpiar el contenido antes de pintarlo

  products.forEach((product) => {
      let content = document.createElement("div");
      content.className = "card";
      content.innerHTML = `
          <h3>${product.nombre}</h3>
          <p class="price">${product.precio} $</p>
      `;

      comprasContent.append(content);

      let comprar = document.createElement("button");
      comprar.innerText = "Comprar";
      comprar.className = "comprar";

      content.append(comprar);
      comprar.addEventListener("click", () => {
          const repeat = cesta.some((repeatProduct) => repeatProduct.id === product.id);

          if (repeat) {
              cesta = cesta.map((prod) => {
                  if (prod.id === product.id) {
                      prod.cantidad++;
                  }
                  return prod;
              });
          } else {
              cesta.push({
                  id: product.id,
                  nombre: product.nombre,
                  precio: product.precio,
                  cantidad: 1
              });
          }
          console.log(cesta);
          cestaCounter();
          saveLocal();
      });
  });

  const vistaCesta = () => {
      modalContainer.innerHTML = "";
      modalContainer.style.display = "flex";

      const modalHeader = document.createElement("div");
      modalHeader.className = "modal-header";
      modalHeader.innerHTML = `
          <h1 class="modal-header-title">Cesta</h1>
      `;

      modalContainer.append(modalHeader);

      const modalButton = document.createElement("h1");
      modalButton.innerText = "x";
      modalButton.className = "modal-header-button";

      modalButton.addEventListener("click", () => {
          modalContainer.style.display = "none";
      });

      modalHeader.append(modalButton);

      cesta.forEach((product) => {
          let cestaContent = document.createElement("div");
          cestaContent.className = "modal-content";
          cestaContent.innerHTML = `
              <h3>${product.nombre}</h3>
              <p>${product.precio} $</p>
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

      const total = cesta.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
      const totalCompra = document.createElement("div");
      totalCompra.className = "total-content";
      totalCompra.innerHTML = `Total a pagar: ${total} $`;
      modalContainer.append(totalCompra);
  };

  document.getElementById("verCesta").addEventListener("click", vistaCesta);

  const eliminarProducto = (id) => {
      const foundId = cesta.find((element) => element.id === id);

      cesta = cesta.filter((carritoId) => carritoId.id !== foundId.id);

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

  const saveLocal = () => {
      localStorage.setItem("compras", JSON.stringify(cesta));
  };
};

pintarCesta();

// SweetAlert para términos y condiciones
Swal.fire({
  title: "¿Acepta nuestros términos y condiciones?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Sí, acepto."
}).then((result) => {
  if (result.isConfirmed) {
      Swal.fire({
          title: "Excelente, puedes continuar",
          icon: "success"
      });
  }
});
pintarCesta(); 


