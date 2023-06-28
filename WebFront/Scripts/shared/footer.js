class Footer extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      
        <footer class="footer card-footer">
          
          <p class="text-center footer-text">
              <a class="links footer-enlace" href="https://www.credicorpcapital.com/" target="_blank">
                Credicorp Capital
              </a> Copyright &#169;
              <script type="text/javascript"> 
                document.write(new Date().getFullYear()); 
              </script>
              (Dise&ntilde;ado y desarrollado por <a target="_blank" class="links footer-enlace" href="https://somosmakers.co/">Makers</a>)
          </p>
        </footer>
      
      `;
    }
  }
  
  customElements.define('footer-component', Footer);