class Header extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        this.innerHTML =



            `
        <header>
            <nav class="navbar navbar-expand navbar-light topbar navbar-main">
                    <li class="navbar" href="/">                      
                        <img class="img-logo" src=".././resource/img/logo-blanco-header.svg" alt="credicorp capital logo" padding-top="10%">                      
                    </li>
                    <div class="collapse navbar-collapse">
                      <ul class="navbar-nav ml-auto">
                        <div class="navbar-content flex-column"></div>
                      </ul>
                    </div>
               
            </nav>
        </header>
      `;
    }
  }

  customElements.define('header-component', Header);