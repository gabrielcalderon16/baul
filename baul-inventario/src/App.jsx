import "./scss/styles.scss";
import chestOpen from './assets/Chest.webp'
import chest from './assets/Logo.png'
import { Modal, Form, Badge, ListGroup } from 'react-bootstrap'
import { useState, useEffect } from "react";
import { BsPencilSquare, BsTrash } from 'react-icons/bs';


function App() {
  const [validated, setValidated] = useState(false);
  const [esEditar, setearEditar] = useState(false);
  const [idTarea, setIdTarea] = useState('');
  const [values, setValues] = useState({});

  const ListItems = () => {
    const [listadoItems, setListadoItems] = useState([]);

    useEffect(() => {
      // Obtener los items del LocalStorage
      const listadoItems = obtenerTareas()
      const itemsOrdenados = ordenarItems(listadoItems)
      console.log('items ordenados: ', itemsOrdenados)
      setListadoItems(itemsOrdenados);
    }, []);
  
    return (
      <div>
        {listadoItems.map((categoria, index) => (
          <div key={categoria + index}>
            <div className="row">
              <div className="col-2"></div>
              <div className="col">
                <h3 className="text-muted font-weight-light">{categoria.categoria}:</h3>
              </div>
            </div>

            <ListGroup as="ol" numbered>
              {categoria.items.map((item, i) => (
                <ListGroup.Item
                  as="li"
                  key={item.id}
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{item.nombre}</div>
                    {item.descripcion}
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <BsPencilSquare />
                    </div>
                    <div className="col-3">
                      <BsTrash />
                    </div>
                    <div className="col-3">
                      <Badge className="text-end" bg="primary" pill>
                        {item.cantidad}
                      </Badge>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        ))}
      </div>
    );
  };
  
  // Modal
  const [mostrandoseModal, setearModal] = useState(false)

  const onFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    // Checkear valores
    if (form.checkValidity() === true) {
      setValidated(true);
      generarItem(values);
    }
  };

  function generarHex() {
    let n = Math.floor(Math.random() * 65536);
    let s = n.toString(16).padStart(4, "0");
    return s;
  }

  function generarId() {
    let s1 = generarHex();
    let s2 = generarHex();
    let s3 = generarHex();
    let s4 = generarHex();
    let id = s1 + "-" + s2 + "-" + s3 + "-" + s4;
    return id;
  }

  const generarItem = (item) => {
    let tareas = obtenerTareas();
    console.log('se generara un item, tareas actuales: ', tareas);

    const itemAEnviar = {
      ...item,
      id: generarId()
    }
    tareas.push(itemAEnviar);
    guardarTareas(tareas);

    // Ocultar modal
    iniciarModal();
    limpiarInputs();
  }

  const iniciarModal = () => {
    return setearModal(!mostrandoseModal)
  }

  function obtenerTareas() {
    const listaTareas = localStorage.getItem("tareas")
    ? JSON.parse(localStorage.getItem("tareas"))
    : [];
    
    return listaTareas;
  }

  function guardarTareas(tareas) {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }

  function limpiarInputs() {
    setValues({})
  }


  const ordenarItems = (items) => {

    const callback = (item)  => item.categoria;

    const resultado = items.reduce((grupo, item) => {
      const categoria = callback(item);
      if (!grupo[categoria]) {
        grupo[categoria] = [];
      }
      grupo[categoria].push(item);
      return grupo;
    }, {});

    const array = Object.entries(resultado).map(([categoria, items]) => ({categoria, items}));
    
    return array

  };
  
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

  function eliminarTarea(id) {
    let tareas = obtenerTareas();

    const tareasFiltradas = tareas.filter((tarea) => tarea.id !== id);

    // TODO: agregar modal de confirmacion
    if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      guardarTareas(tareasFiltradas);
    }
  }

  // Editar tarea.
  // $(document).on("click", ".bi-pencil", function (e) {
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
        
        {/* Lista */}
        <ListItems />

      </div>

      {/* Modal con formulario para agregar items */}
      <Modal show={mostrandoseModal}>
        <Modal.Header closeButton onClick={iniciarModal}>
          <Modal.Title>Item</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="modal-body p-5 pt-0 pb-0">
              <Form.Group className="mb-3" controlId="controlNombre">
                <Form.Label>Nombre del ítem</Form.Label>
                <Form.Control name="nombre" onChange={onFormChange} required type="text" placeholder="Ingresa un nombre facil de identificar" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="controlDescripción">
                <Form.Label>Descripción del item</Form.Label>
                <Form.Control name="descripcion" onChange={onFormChange} required type="textarea" placeholder="Detalla las características del item, como su material o algun dato que le describa facilmente" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="controlCategoria">
                <Form.Label>Categoría del item</Form.Label>
                <Form.Control name="categoria" onChange={onFormChange} required type="text" placeholder="Ingresa la categoría" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="controlCantidad">
                <Form.Label>Cantidad de items</Form.Label>
                <Form.Control name="cantidad" onChange={onFormChange} required type="number" placeholder="Ingresa la cantidad de items disponibles" />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="w-100 mb-2 btn btn-lg rounded-3 btn-warning" type="submit">Agregar</button>
          </Modal.Footer>
        </Form>
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
