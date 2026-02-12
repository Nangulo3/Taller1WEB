document.addEventListener("DOMContentLoaded", () => {

//SLIDER
const range = document.getElementById("condicionRange");
const valor = document.getElementById("valorCondicion");

if (range && valor) {
  valor.textContent = range.value;
  range.addEventListener("input", () => {
    valor.textContent = range.value;
  });
}


let carrito = [];
let tarjetas = [
  {
    nombre: "Lucario",
    tipo1: "Lucha",
    tipo2: "Acero",
    precio: 50000,
    imagen: "../Parte2/images/lucario.png",
    condicion: 9
  },
  {
    nombre: "Pikachu",
    tipo1: "Eléctrico",
    tipo2: "Ninguno",
    precio: 40000,
    imagen: "../Parte2/images/pikachu.png",
    condicion: 8
  },
  {
    nombre: "Charizard",
    tipo1: "Fuego",
    tipo2: "Volador",
    precio: 120000,
    imagen: "../Parte2/images/charizard.png",
    condicion: 10
  },
  {
    nombre: "Greninja",
    tipo1: "Agua",
    tipo2: "Siniestro",
    precio: 95000,
    imagen: "../Parte2/images/greninja.webp",
    condicion: 9
  },
  {
    nombre: "Mewtwo",
    tipo1: "Psiquico",
    tipo2: "Ninguno",
    precio: 35000,
    imagen: "../Parte2/images/mewtwo.avif",
    condicion: 8
  },
  {
    nombre: "Glaceon",
    tipo1: "Hielo",
    tipo2: "Ninguno",
    precio: 60000,
    imagen: "../Parte2/images/glaceon.png",
    condicion: 9
  },
  {
    nombre: "Dragonite",
    tipo1: "Dragón",
    tipo2: "Volador",
    precio: 150000,
    imagen: "../Parte2/images/dragonite.png",
    condicion: 10
  },
  {
    nombre: "Noivern",
    tipo1: "Dragón",
    tipo2: "Volador",
    precio: 110000,
    imagen: "../Parte2/images/noivern.webp",
    condicion: 9
  }
];


// ==========================
// REFERENCIAS AL DOM
// ==========================

// Contenedor donde se renderizan las tarjetas disponibles
const contenedorTarjetas = document.getElementById("contenedor-tarjetas");

// Contenedor donde se renderizan los productos dentro del carrito
const contenedorCarrito = document.getElementById("contenedor-carrito");

// Elemento que muestra el número total de productos en el carrito
const contadorCarrito = document.getElementById("contador-carrito");

// Inicializa el modal de Bootstrap para mostrar el carrito
const modalCarrito = new bootstrap.Modal(document.getElementById("modalCarrito"));


// ==========================
// FUNCIÓN PARA CREAR TARJETAS (HTML DINÁMICO)
// ==========================

// Función global que genera el HTML de una carta
// carta → objeto con la información
// index → posición dentro del arreglo
// esCarrito → indica si la tarjeta se está creando para el carrito
window.crearTarjetaHTML = function(carta, index, esCarrito = false) {

  // Si la carta tiene dos tipos los concatena, si no solo muestra el primero
  let tipos = carta.tipo2 !== "Ninguno"
    ? `${carta.tipo1} / ${carta.tipo2}`
    : carta.tipo1;

  // Retorna la estructura HTML como string
  return `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card h-80 shadow">
        <img src="${carta.imagen}" class="card-img-top" object-fit:cover;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${carta.nombre}</h5>
          <p class="card-text">Tipo: ${tipos}</p>
          <p class="card-text">Condición: ${carta.condicion}/10</p>
          <p class="fw-bold">$${carta.precio}</p>

          ${
            // Si NO es carrito, muestra el botón para agregar
            !esCarrito 
            ? `<button class="btn btn-primary mt-auto" onclick="agregarAlCarrito(${index})">
                 <img src="../Parte2/images/boton-mas.png"> Agregar al carrito
               </button>`
            : ""
          }
        </div>
      </div>
    </div>
  `;
};


// ==========================
// AGREGAR PRODUCTO AL CARRITO
// ==========================

window.agregarAlCarrito = function(index) {

  // Obtiene la carta seleccionada según su índice
  const cartaSeleccionada = tarjetas[index];

  // Busca si la carta ya existe en el carrito
  const itemExistente = carrito.find(item => item.nombre === cartaSeleccionada.nombre);

  if (itemExistente) {
    // Si ya existe, incrementa la cantidad
    itemExistente.cantidad++;
  } else {
    // Si no existe, la agrega con cantidad 1
    carrito.push({ ...cartaSeleccionada, cantidad: 1 });
  }

  // Actualiza visualmente el carrito
  renderCarrito();

  // Actualiza el número del contador
  actualizarContador();

  // Muestra el modal del carrito
  //modalCarrito.show();
};


// ==========================
// ACTUALIZAR CONTADOR DEL CARRITO
// ==========================

function actualizarContador() {

  // Suma todas las cantidades de los productos en el carrito
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // Actualiza el texto del contador
  contadorCarrito.textContent = total;
}


// ==========================
// VACIAR CARRITO
// ==========================

window.vaciarCarrito = function() {

  // Reinicia el arreglo carrito
  carrito = [];

  // Vuelve a renderizar
  renderCarrito();
  actualizarContador();
};


// ==========================
// RENDERIZAR CARRITO
// ==========================

function renderCarrito() {

  // Limpia el contenido previo
  contenedorCarrito.innerHTML = "";

  // Recorre cada carta del carrito
  carrito.forEach((carta) => {

    // Agrega el HTML dinámicamente
    contenedorCarrito.innerHTML += `
      <div class="col-12">
        <div class="d-flex align-items-center gap-3 border p-2 rounded">
          <img src="${carta.imagen}" width="70">
          <div class="flex-grow-1">
            <h6 class="mb-0">${carta.nombre}</h6>
            <small>Cantidad: ${carta.cantidad}</small>
          </div>
          <strong>$${carta.precio * carta.cantidad}</strong>
        </div>
      </div>
    `;
  });
}


// ==========================
// RENDERIZAR TARJETAS PRINCIPALES
// ==========================

function renderTarjetas() {

  // Limpia el contenedor
  contenedorTarjetas.innerHTML = "";

  // Recorre todas las cartas disponibles
  tarjetas.forEach((carta, index) => {

    // Genera el HTML usando la función crearTarjetaHTML
    contenedorTarjetas.innerHTML += crearTarjetaHTML(carta, index);
  });
}


// ==========================
// EVENTOS DEL BOTÓN DEL CARRITO (NAVBAR)
// ==========================

// Obtiene el botón del carrito
const btnCarrito = document.getElementById("btn-carrito");

// Muestra el carrito cuando el mouse entra
btnCarrito.addEventListener("mouseenter", () => {
  modalCarrito.show();
});

// Oculta el carrito cuando el mouse sale
btnCarrito.addEventListener("mouseleave", () => {
  modalCarrito.hide();
});


// ==========================
// FORMULARIO PARA AGREGAR NUEVAS CARTAS
// ==========================

document.getElementById("form-carta").addEventListener("submit", function(e) {

  // Evita que la página se recargue
  e.preventDefault();

  // Convierte el precio ingresado a número
  const precioIngresado = Number(document.getElementById("precio").value);

  // Validación: precio mínimo permitido
  if (precioIngresado < 1000) {
    alert("⚠️ El precio mínimo permitido es 1000");
    return;
  }

  // Crea un nuevo objeto carta con los datos del formulario
  const nuevaCarta = {
    nombre: document.getElementById("nombre").value,
    tipo1: document.getElementById("tipo1").value,
    tipo2: document.getElementById("tipo2").value,
    precio: precioIngresado,
    imagen: document.getElementById("imagen").value,
    condicion: document.getElementById("condicionRange").value
  };

  // Agrega la nueva carta al arreglo principal
  tarjetas.push(nuevaCarta);

  // Vuelve a renderizar las tarjetas
  renderTarjetas();

  // Limpia el formulario
  this.reset();
});

// Renderiza las tarjetas al cargar la página
renderTarjetas();

});













