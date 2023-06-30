using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Request
{
    public class CorreccionGuardarRequest
    {
        [JsonProperty("Categoria")]
        public string Categoria { get; set; }

        [JsonProperty("Id")]
        public string Id { get; set; }

        [JsonProperty("IdOperacion")]
        public string IdOperacion { get; set; }

        [JsonProperty("ClasificacionCuenta")]
        public string ClasificacionCuenta { get; set; }

        [JsonProperty("ClasificacionCliente")]
        public string ClasificacionCliente { get; set; }

        [JsonProperty("ClasificacionEmpresa")]
        public string ClasificacionEmpresa { get; set; }

        [JsonProperty("Tabla")]
        public string Tabla { get; set; }
    }
}