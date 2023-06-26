const pintarCarrito = () => {
  saveLocal();
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
      <h1 class="modal-header-title">Carrito.</h1>
    `;
  modalContainer.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "x";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    saveLocal();
    modalContainer.style.display = "none";
  
  });

  modalHeader.append(modalbutton);

  carrito.forEach((producto) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
        <img src="${producto.img}">
        <h3>${producto.nombre}</h3>
        <p>${producto.precio} $</p>
        <span class="restar"> - </span>
        <p>${producto.cantidad}</p>
        <span class="sumar"> + </span>
        <p>Total: ${(producto.cantidad * producto.precio).toFixed(2)} $</p>
        <span class="eliminar"> ❌ </span>
      `;

    modalContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => {
      if (producto.cantidad !== 1) {
        producto.cantidad--;
      }
      saveLocal();
      pintarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      producto.cantidad++;
      saveLocal();
      pintarCarrito();
    });

    let elimprod = carritoContent.querySelector(".eliminar");
    elimprod.addEventListener("click", () => {
      eliminarProducto(producto.id);
    });


    // let eliminar = document.createElement("span");
    // eliminar.innerText = "❌";
    // eliminar.classList = "delete-producto";
    // carritoContent.append(eliminar);
    // eliminar.addEventListener("click", eliminarProducto);
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const botonpagar = document.createElement("h1")
  botonpagar.innerText = "Pagar";
  botonpagar.className = "modal-pay-button";

  botonpagar.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío. ¿Qué desea comprar?");
    } else {
      alert("¡¡Gracias por su compra!!");
      modalContainer.style.display = "none";
      carrito = [];
  
      saveLocal();
      pintarCarrito();
    }
  });

  const totalBuying = document.createElement("div");

  totalBuying.className = "total-content";
  totalBuying.innerHTML = `Total a pagar: ${total.toFixed(2)} $`;
  modalContainer.append(totalBuying);
  modalContainer.append(botonpagar);

};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);

  console.log(foundId);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });

  saveLocal();
  pintarCarrito();
};

const carritoCounter = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();


