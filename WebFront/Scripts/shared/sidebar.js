class Sidebar extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <div class="nav-side-menu flex-shrink-0 p-3">
            <i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
            <div class="menu-list">
            <ul id="menu-content" class="menu-content collapse out">
                
                <li>
                    <a href="/Home/Index">
                        <i class="fa fa-bank fa-fw"></i> Inicio
                    </a>
                </li>

                <li  data-bs-toggle="collapse" data-bs-target="#tirnoper-menu" class="collapsed">
                  <a href="#"><i class="fa fa-bar-chart fa-fw"></i> Tir No Per <span class="arrow"></span></a>
                </li>
                
                <ul class="sub-menu collapse" id="tirnoper-menu">
                    <li>
                    <a href="/TirNoPer/TirNoPer")">Herramienta</a>
                    </li>                    
                </ul>
            </ul>
            </div>
        </div>
    `;
    }
  }
  
  customElements.define('sidebar-component', Sidebar);