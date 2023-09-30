import "./scss/styles.scss";
import chestOpen from './assets/Chest.webp'
import chest from './assets/Logo.png'
// import * as bootstrap from "bootstrap";
import { Modal, Button } from 'react-bootstrap'
import { useState } from "react";

function App() {

  // Modal
  const [mostrandoseModal, setearModal] = useState(false)
  const iniciarModal = () => {
    return setearModal(!mostrandoseModal)
  }

  // let esEditar = false;
  // let idTareaEditar = 0;

  // function obtenerTareas() {
    
  //   const listaTareas = localStorage.getItem("tareas")
  //   ? JSON.parse(localStorage.getItem("tareas"))
  //   : [];
    
  //   $('#contador').text(`0 / ${listaTareas.length}`)
  //   return listaTareas;
  // }

  // function guardarTareas(tareas) {
  //   localStorage.setItem("tareas", JSON.stringify(tareas));
  //   $('#contador').text(`0 / ${tareas.length}`)
  // }

  // function ordenarTareas(tareas) {
  //   tareas.sort(function (a, b) {
  //     let fechaA = new Date(a.fecha.dia + " " + a.fecha.horaInicio);
  //     let fechaB = new Date(b.fecha.dia + " " + b.fecha.horaInicio);
  //     return fechaA > fechaB ? -1 : fechaA < fechaB ? 1 : 0;
  //   });
  //   let agrupado = tareas.reduce(function (acumulador, tarea) {
  //     let dia = tarea.fecha.dia;
  //     if (!acumulador[dia]) {
  //       acumulador[dia] = [];
  //     }
  //     acumulador[dia].push(tarea);
  //     return acumulador;
  //   }, {});
  //   let resultado = Object.entries(agrupado).map(function (par) {
  //     let dia = par[0];
  //     let tareas = par[1];
  //     let objeto = {
  //       titulo: dia,
  //       fecha: {
  //         dia: tareas,
  //       },
  //     };
  //     return objeto;
  //   });
  //   return resultado;
  // }

  // function generarHex() {
  //   let n = Math.floor(Math.random() * 65536);
  //   let s = n.toString(16).padStart(4, "0");
  //   return s;
  // }

  // function generarId() {
  //   let s1 = generarHex();
  //   let s2 = generarHex();
  //   let s3 = generarHex();
  //   let s4 = generarHex();
  //   let id = s1 + "-" + s2 + "-" + s3 + "-" + s4;
  //   return id;
  // }

  // function mostrarTareas() {
  //   let tareas = obtenerTareas();
  //   $("#grupo-listas").empty();

  //   const tareasOrdenadas = ordenarTareas(tareas);

  //   tareasOrdenadas.forEach((diaEnGeneral) => {
  //     let tareasRenderizadas;

  //     diaEnGeneral.fecha.dia.forEach((tareaEspecifico, i) => {
  //       const tareaRenderizada = `
  //         <label class="list-group-item d-flex gap-3">
  //           <input class="form-check-input flex-shrink-0" ${tareaEspecifico.check ? 'checked' : ''} type="checkbox" value="" style="font-size: 1.375em;">
  //           <span class="pt-1 form-checked-content">
  //             <strong>${tareaEspecifico.titulo}</strong>
  //             <small class="d-block text-muted">
  //               <i class="bi bi-calendar-event-fill"></i>
  //               ${tareaEspecifico.fecha.horaInicio} – ${tareaEspecifico.fecha.horaFin}
  //             </small>
  //           </span>
  //           <div class="ms-auto p-2 d-flex flex-nowrap">
  //             <i class="bi bi-pencil p-2" style="color: #ffc107;" id="edit_${tareaEspecifico.id}"></i>
  //             <i class="bi bi-x-lg p-2" style="color: red;" id="delete_${tareaEspecifico.id}"></i>
  //           </div>
  //         </label>
  //       `;
  //       tareasRenderizadas = tareasRenderizadas
  //         ? tareasRenderizadas + tareaRenderizada
  //         : tareaRenderizada;

  //       if (i === diaEnGeneral.fecha.dia.length - 1) {
  //         const lista = `
  //           <div class="list-group w-auto">
  //             <p class="mt-sm-0">${diaEnGeneral.titulo}</p>
  //             ${tareasRenderizadas}
  //           </div>
  //         `;
  //         $("#grupo-listas").append(lista);
  //       }
  //     });
  //   });
  // }

  // function crearTarea(titulo, fecha) {
  //   let tareas = obtenerTareas();

  //   let tarea = {
  //     id: generarId(),
  //     check: false,
  //     titulo,
  //     fecha,
  //   };

  //   tareas.push(tarea);

  //   guardarTareas(tareas);
  //   mostrarTareas();
  //   modal.hide();
  // }

  // function editarTarea(id) {
  //   let tareas = obtenerTareas();
  //   let tarea = tareas.filter((tarea) => tarea.id === id)[0];
  //   $("#titulo").val(tarea.titulo);
  //   $("#fecha-inicio").val(tarea.fecha.horaInicio);
  //   $("#fecha-fin").val(tarea.fecha.horaFin);
  //   $("#fecha").val(tarea.fecha.dia);
  //   esEditar = true;
  //   idTareaEditar = id;
  //   modal.show();
  // }

  // function eliminarTarea(id) {
  //   let tareas = obtenerTareas();

  //   const tareasFiltradas = tareas.filter((tarea) => tarea.id !== id);

  //   if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
  //     guardarTareas(tareasFiltradas);
  //     mostrarTareas();
  //   }
  // }

  // $(document).ready(function () {
  //   mostrarTareas();
  // });

  // Editar tarea.
  // $(document).on("click", ".bi-pencil", function (e) {
  //   e.stopPropagation();
  //   let id = $(this).attr("id");
  //   editarTarea(id.split("_")[1]);
  // });

  // Marcar tarea cómo resuelta.
  // $(document).on("click", ".list-group-item", function (e) {
  //   e.stopPropagation();
  //   let id = $(this).attr("id");
  //   editarTarea(id.split("_")[1]);
  // });

  // Eliminar tarea.
  // $(document).on("click", ".bi-x-lg", function (e) {
  //   e.stopPropagation();
  //   let id = $(this).attr("id");
  //   eliminarTarea(id.split("_")[1]);
  // });

  // $("#form-tarea").submit(function (event) {
  //   event.preventDefault();
  //   let titulo = $("#titulo").val();
  //   let fecha = {
  //     dia: $("#fecha").val(),
  //     horaInicio: $("#fecha-inicio").val(),
  //     horaFin: $("#fecha-fin").val(),
  //   };
  //   if (esEditar) {
  //     guardarTareaEditada(idTareaEditar, titulo, fecha);
  //   } else {
  //     crearTarea(titulo, fecha);
  //   }
  //   limpiarInputs();
  // });

  // function guardarTareaEditada(id, titulo, fecha) {
  //   let tareas = obtenerTareas();

  //   let tarea = tareas.map((t) => {
  //     let tareaAEditar = t;
  //     if (t.id === id) {
  //       tareaAEditar.titulo = titulo;
  //       tareaAEditar.fecha = fecha;
  //     }
  //     return tareaAEditar;
  //   });

  //   guardarTareas(tarea);
  //   mostrarTareas();
  //   modal.hide();

  //   esEditar = false;
  //   idTareaEditar = 0;
  // }

  // $("#modalFormLista").on("hidden.bs.modal", function () {
  //   limpiarInputs();
  // });

  // function limpiarInputs() {
  //   $("#titulo").val("");
  //   $("#fecha").val("");
  //   $("#fecha-inicio").val("");
  //   $("#fecha-fin").val("");
  // }

  return (
    <>
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start py-3 mb-4 border-bottom">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <img
              src={chest}
              width="40"
              height="45"
              alt="Baul Logo"
            />
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input id="buscar" type="search" className="form-control form-control-dark text-bg-light" placeholder="Buscar..." aria-label="Search" />
          </form>
          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <select class="form-select bg-light" id="ordenar" required>
              <option value="">Ordenar...</option>
              <option>Alfabeticamente</option>
            </select>
          </form>

          <div className="text-end">
            <button type="button" className="btn btn-plus" onClick={iniciarModal}>+</button>
          </div>
        </header>
      </div>

      {/* Cabecera */}
      <div className="container col-xxl-8 px-4 py-0 py-md-5 ">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-0 py-md-5">
          <div className="col-12 col-sm-8 col-lg-6">
            <img
              src={chestOpen}
              className="d-block mx-lg-auto img-fluid"
              alt="Logo"
              width="600"
              height="400"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-5">
              Maneja tus items de forma facil
            </h1>
            <div className="mt-5">
              <p className="lead">
                ¡Bienvenido a Baul, la aplicación de gestión de inventario inspirada en el objeto más importante de Minecraft!
              </p>
              <p className="lead">
                Baul es la herramienta perfecta para organizar y controlar tus productos, artículos y activos de manera eficiente.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* listado de items */}
      <div className="container">

        <div className="row">
          <div className="col-8 col-md-10">
            <h1><i className="bi bi-list-task"></i> Items</h1>
          </div>
          <div className="col-4 col-md-2">
            <div className="container-contador" id="contador">
            </div>
          </div>
        </div>
    
        <hr className="col-12" />
        
        <div className="container">
          <p className="mt-sm-0 mt-md-3 mx-auto">Listado.</p>
        </div>

        {/* Lista */}
        <div id="grupo-listas">
        </div>

      </div>

      {/* Modal con formulario para agregar items */}
      {/* 
        titulo
        descripcion
        categoria
        cantidad
      */}
      <Modal show={mostrandoseModal}>
        <Modal.Header closeButton onClick={iniciarModal}>
          <Modal.Title>Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body p-5 pt-0 pb-0">
            <form id="form-item">
              <div className="form-floating mb-3">
                <input type="text" className="form-control rounded-3" id="titulo" placeholder="Ingresa un nombre facil de identificar" required />
                <label for="titulo">Nombre del ítem</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control rounded-3" id="descripcion" placeholder="Detalla las características del item, como su material o algun dato que le describa facilmente"
                  required />
                <label for="descripcion">Descripción del ítem</label>
              </div>
              <div className="form-floating mb-3">
                <input type="time" className="form-control rounded-3" id="categoria" required />
                <label for="fecha-fin">Categoría del item</label>
              </div>
              <div className="form-floating">
                <input type="date" className="form-control rounded-3" id="cantidad" placeholder="Ingresa la cantidad de items disponibles" required />
                <label for="fecha">Cantidad de items</label>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="w-100 mb-2 btn btn-lg rounded-3 btn-warning" type="submit">Agregar</button>
        </Modal.Footer>
      </Modal>

      {/* Pie de página */}
      <footer className="pt-5 my-5 text-muted border-top">
        <div className="container">
          <div className="d-flex justify-content-md-between">
            <div className="">
              Baul - Gabriel Calderon
            </div>
            <div className="">
              Todos los derechos reservados &middot; &copy; 2023
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
