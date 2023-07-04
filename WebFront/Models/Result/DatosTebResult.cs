using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class DatosTebResult
    {
        [JsonProperty("fecha")]
        public string fecha { get; set; }

        [JsonProperty("tipo_Transaccion")]
        public string tipo_Transaccion { get; set; }

        [JsonProperty("valor")]
        public string valor { get; set; }

        [JsonProperty("clasificacion_Cliente")]
        public string clasificacion_Cliente { get; set; }

        [JsonProperty("clasificacion_Cuenta")]
        public string clasificacion_Cuenta { get; set; }

        [JsonProperty("clasificacion_Empresa")]
        public string clasificacion_Empresa { get; set; }

        [JsonProperty("id")]
        public string id { get; set; }

        [JsonProperty("especies")]
        public string especies { get; set; }
    }
}