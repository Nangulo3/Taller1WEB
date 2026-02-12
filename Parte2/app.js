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
    precio: 50,
    imagen: "../Parte2/images/lucario.png",
    condicion: 9
  },
  {
    nombre: "Pikachu",
    tipo1: "Eléctrico",
    tipo2: "Ninguno",
    precio: 40,
    imagen: "../Parte2/images/pikachu.png",
    condicion: 8
  },
  {
    nombre: "Charizard",
    tipo1: "Fuego",
    tipo2: "Volador",
    precio: 120,
    imagen: "../Parte2/images/charizard.png",
    condicion: 10
  },
  {
    nombre: "Greninja",
    tipo1: "Agua",
    tipo2: "Siniestro",
    precio: 95,
    imagen: "../Parte2/images/greninja.webp",
    condicion: 9
  },
  {
    nombre: "Piplup",
    tipo1: "Agua",
    tipo2: "Ninguno",
    precio: 35,
    imagen: "../Parte2/images/piplup.webp",
    condicion: 8
  },
  {
    nombre: "Glaceon",
    tipo1: "Hielo",
    tipo2: "Ninguno",
    precio: 60,
    imagen: "../Parte2/images/glaceon.png",
    condicion: 9
  },
  {
    nombre: "Dragonite",
    tipo1: "Dragón",
    tipo2: "Volador",
    precio: 150,
    imagen: "../Parte2/images/dragonite.png",
    condicion: 10
  },
  {
    nombre: "Noivern",
    tipo1: "Dragón",
    tipo2: "Volador",
    precio: 110,
    imagen: "../Parte2/images/noivern.webp",
    condicion: 9
  }
];



const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const contenedorCarrito = document.getElementById("contenedor-carrito");
const contadorCarrito = document.getElementById("contador-carrito");

const modalCarrito = new bootstrap.Modal(document.getElementById("modalCarrito"));


window.crearTarjetaHTML = function(carta, index, esCarrito = false) {

  let tipos = carta.tipo2 !== "Ninguno"
    ? `${carta.tipo1} / ${carta.tipo2}` // Si tiene 2 tipos los concatena y separa con una barra
    : carta.tipo1;

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


window.agregarAlCarrito = function(index) {

  const cartaSeleccionada = tarjetas[index];

  // buscar si ya existe en el carrito
  const itemExistente = carrito.find(item => item.nombre === cartaSeleccionada.nombre);

  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({ ...cartaSeleccionada, cantidad: 1 });
  }

  renderCarrito();
  actualizarContador();
  modalCarrito.show();
};



function actualizarContador() {
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  contadorCarrito.textContent = total;
}


window.vaciarCarrito = function() {
  carrito = [];
  renderCarrito();
  actualizarContador();
};

function renderCarrito() {
  contenedorCarrito.innerHTML = "";

  carrito.forEach((carta) => {
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


function renderTarjetas() {
  contenedorTarjetas.innerHTML = "";
  tarjetas.forEach((carta, index) => {
    contenedorTarjetas.innerHTML += crearTarjetaHTML(carta, index);
  });
}

// BOTÓN NAVBAR
const btnCarrito = document.getElementById("btn-carrito");

btnCarrito.addEventListener("mouseenter", () => {
  modalCarrito.show();
});

btnCarrito.addEventListener("mouseleave", () => {
  modalCarrito.hide();
});


// FORMULARIO
document.getElementById("form-carta").addEventListener("submit", function(e) {
  e.preventDefault();

  const precioIngresado = Number(document.getElementById("precio").value);

if (precioIngresado < 1000) {
  alert("⚠️ El precio mínimo permitido es 1000");
  return;
}


const nuevaCarta = {
  nombre: document.getElementById("nombre").value,
  tipo1: document.getElementById("tipo1").value,
  tipo2: document.getElementById("tipo2").value,
  precio: precioIngresado,
  imagen: document.getElementById("imagen").value,
  condicion: document.getElementById("condicionRange").value
};


  tarjetas.push(nuevaCarta);
  renderTarjetas();
  this.reset();
});
renderTarjetas();
});













