import "./scss/styles.scss";
import chestOpen from './assets/Chest.webp'
import chest from './assets/Logo.png'

function App() {
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
            <input type="search" className="form-control form-control-dark text-bg-light" placeholder="Buscar..." aria-label="Search" />
          </form>

          <div className="text-end">
            <button type="button" className="btn btn-plus"  data-bs-toggle="modal" data-bs-target="#modalFormLista">+</button>
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
      <div className="modal modal-signin py-5" tabindex="-1" role="dialog" id="modalFormLista">
        <div className="modal-dialog" role="document">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header p-5 pb-4 border-bottom-0">
              <h1 className="fw-bold mb-0 fs-2">Item</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body p-5 pt-0">
              {/* 
              titulo
              descripcion
              categoria
              cantidad
               */}
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
                {/* TODO: convertir a select */}
                <div className="form-floating mb-3">
                  <input type="time" className="form-control rounded-3" id="categoria" required />
                  <label for="fecha-fin">Categoría del item</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="date" className="form-control rounded-3" id="cantidad" placeholder="Ingresa la cantidad de items disponibles" required />
                  <label for="fecha">Cantidad de items</label>
                </div>
                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-warning" type="submit">Agregar</button>
              </form>
            </div>
          </div>
        </div>
      </div>

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
