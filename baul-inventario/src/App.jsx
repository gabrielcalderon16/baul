import "./scss/styles.scss";
import chestOpen from './assets/Chest.webp'
import chest from './assets/Logo.png'
import { Modal, Form, Badge, ListGroup, Toast, ToastContainer } from 'react-bootstrap'
import { useState, useEffect } from "react";
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

function App() {
  // TODO: agregar compatibilidad con el buscador.
  // TODO: agregar compatibilidad con el ordenamiento.

  // Notificaciones
  const [notificacion, setearNotificacion] = useState(false);
  const [textoNotificacion, setearTextoNotificacion] = useState(false);

  // Editar
  const [esEditar, setearEditar] = useState(false);
  const [idItem, setIdItem] = useState('');

  // Valore del formulario
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formQuantity, setFormQuantity] = useState('');
  const [formCategory, setFormCategory] = useState('');
  // const [cantidadItems, setCantidadItems] = useState(0);

  // Modal
  const [validated, setValidated] = useState(false);
  const [mostrandoseModal, setearModal] = useState(false)

  const ListItems = () => {
    const [listadoItems, setListadoItems] = useState([]);

    // Busqueda de items por categoria
    const filtrarItems = (value) => {
      if (value !== "") {
        // Filtrar los items que incluyan el valor en su categoría
        const itemsFiltrados = listadoItems.filter((item) =>
          item.categoria.toLowerCase().includes(value.toLowerCase())
        );
        setListadoItems(itemsFiltrados);
      } else {
        // Si el valor está vacío, mostrar todos los items
        const itemsOrdenados = obtenerItemsOrdenados();
        setListadoItems(itemsOrdenados);
      }
    };

    function eliminarItem(id) {
      let items = obtenerItems();

      const itemsFiltrados = items.filter((item) => item.id !== id);
      const itemsOrdenados = ordenarItems(itemsFiltrados)

      if (confirm("¿Estás seguro de que quieres eliminar este item?")) {
        setListadoItems(itemsOrdenados);
        guardarItems(itemsFiltrados);
        mostrarNotificacion('Se ha eliminado un item correctamente');
      }
    }

    const obtenerItemsOrdenados = () => {
      const listadoItems = obtenerItems()
      const itemsOrdenados = ordenarItems(listadoItems)
      return itemsOrdenados
    }

    useEffect(() => {
      const itemsOrdenados = obtenerItemsOrdenados()
      // Obtener los items del LocalStorage
      setListadoItems(itemsOrdenados);
    }, [localStorage.getItem('items')]);
  
    return (
      <div className="container">
        {/* Filtros */}

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
            <input
              id="buscar"
              type="search"
              className="form-control form-control-dark text-bg-light"
              placeholder="Buscar por categoria..."
              aria-label="Search"
              onChange={(event) => filtrarItems(event?.target.value)}
            />
          </form>
          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <select className="form-select bg-light" id="ordenar" required>
              <option value="">Ordenar...</option>
              <option>Alfabeticamente</option>
            </select>
          </form>

          <div className="text-end">
            <button type="button" className="btn background-primary-color" onClick={iniciarModal}>+</button>
          </div>
        </header>

        {/* Encabezado */}
        <div className="row">
          <div className="col-8 col-md-10">
            <h1><i className="bi bi-list-task"></i> Items</h1>
          </div>
          <div className="col-4 col-md-2">
            <div className="container-contador" id="contador">
              <span>{listadoItems.length}</span>
            </div>
          </div>
        </div>
    
        <hr className="col-12" />
        
        {/* Lista */}
        <div id="lista">
          {
            listadoItems && listadoItems.length ? listadoItems.map((categoria, i) => (
            <div key={categoria + i}>
              <span className="row p-0 m-0">
                <span className="col-2"></span>
                <span className="col">
                  <h4 className="text-muted font-weight-light">{categoria.categoria}:</h4>
                </span>
              </span>

              <ListGroup as="ol" numbered>
                {categoria.items.map((item) => (
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
                        <BsPencilSquare onClick={() => editarItem(item)}/>
                      </div>
                      <div className="col-3">
                        <BsTrash onClick={() => eliminarItem(item.id)}/>
                      </div>
                      <div className="col-3">
                        <Badge className="text-end background-primary-color" pill>
                          {item.cantidad}
                        </Badge>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
              )) : (
                <div className="row p-5">
                    <span className="col-12 text-center">
                      <h4 className="text-muted font-weight-light">No se encontraron items, prueba agregando uno.</h4>
                    </span>
                </div>
              )
          }
        </div>
      </div>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    // Checkear valores
    if (form.checkValidity() === true) {
      setValidated(false);
      if (esEditar) {
        guardarItemEditado({
          id: idItem,
          nombre: formName,
          descripcion: formDescription,
          categoria: formCategory,
          cantidad: formQuantity
        })
      } else {
        generarItem({
          nombre: formName,
          descripcion: formDescription,
          categoria: formCategory,
          cantidad: formQuantity
        });
      }
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
    let items = obtenerItems();
    console.log('se generara un item, items actuales: ', items);

    const itemAEnviar = {
      ...item,
      id: generarId()
    }
    items.push(itemAEnviar);
    guardarItems(items);

    // Ocultar modal
    iniciarModal();
    limpiarInputs();
    mostrarNotificacion('Se ha agregado un item correctamente');
  }

  const iniciarModal = () => {
    return setearModal(!mostrandoseModal)
  }

  function obtenerItems() {
    const listaItems = localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];
    
    return listaItems;
  }

  function guardarItems(items) {
    localStorage.setItem("items", JSON.stringify(items));
  }

  function limpiarInputs() {
    setFormName('');
    setFormDescription('');
    setFormQuantity('');
    setFormCategory('');
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
  
  function editarItem(item) {
    setearEditar(true);
    setIdItem(item.id);

    // Actualizar valores del formulario
    setFormName(item.nombre);
    setFormDescription(item.descripcion);
    setFormQuantity(item.cantidad);
    setFormCategory(item.categoria);

    iniciarModal();
  }

  function guardarItemEditado(item) {
    let items = obtenerItems();

    let itemEditado = items.map((i) => {
      let itemAEditar = i;
      if (itemAEditar.id === item.id) {
        itemAEditar.nombre = item.nombre;
        itemAEditar.descripcion = item.descripcion;
        itemAEditar.categoria = item.categoria;
        itemAEditar.cantidad = item.cantidad;
      }
      return itemAEditar;
    });

    guardarItems(itemEditado);

    // Ocultar modal y limpiar valores reactivos.
    iniciarModal()
    setearEditar(false)
    setIdItem('')
    mostrarNotificacion('Se ha editado un item correctamente');
  }

  function mostrarNotificacion(texto) {
    console.log('se llamo a mostrarNotificacion', texto)
    setearNotificacion(true);
    setearTextoNotificacion(texto);
  }

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

          <div className="text-end">
            <h4 className="text-muted font-weight-light">Baul - Gestióna tu inventario</h4>
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
      <ListItems />

      {/* Modal con formulario para agregar items */}
      <Modal show={mostrandoseModal}>
        <Modal.Header closeButton onClick={iniciarModal}>
          <Modal.Title>Item</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit} >
          <Modal.Body>
            <div className="modal-body p-5 pt-0 pb-0">
              <Form.Group className="mb-3" controlId="controlNombre">
                <Form.Label>Nombre del ítem</Form.Label>
                <Form.Control
                  name="nombre"
                  value={formName}
                  onChange={(event) => setFormName(event?.target.value)}
                  required 
                  type="text"
                  placeholder="Ingresa un nombre facil de identificar"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="controlDescripción">
                <Form.Label>Descripción del item</Form.Label>
                <Form.Control 
                  name="descripcion"
                  value={formDescription}
                  onChange={(event) => setFormDescription(event?.target.value)}
                  required type="textarea" 
                  placeholder="Detalla las características del item, como su material o algun dato que le describa facilmente"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="controlCategoria">
                <Form.Label>Categoría del item</Form.Label>
                <Form.Control 
                  name="categoria"
                  value={formCategory}
                  onChange={(event) => setFormCategory(event?.target.value)}
                  required type="text" 
                  placeholder="Ingresa la categoría"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="controlCantidad">
                <Form.Label>Cantidad de items</Form.Label>
                <Form.Control 
                  name="cantidad"
                  value={formQuantity}
                  onChange={(event) => setFormQuantity(event?.target.value)}
                  required type="number" 
                  placeholder="Ingresa la cantidad de items disponibles"
                />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="w-100 mb-2 btn btn-lg rounded-3 background-primary-color" type="submit">{esEditar ? 'Actualizar' : 'Agregar'}</button>
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

      <ToastContainer position="bottom-end" className="position-fixed p-3" style={{ zIndex: 1 }}>
        <Toast 
          onClose={() => setearNotificacion(false)}
          show={notificacion}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Exitoso</strong>
            <small>Ahora</small>
          </Toast.Header>
          <Toast.Body>{textoNotificacion}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default App;
