using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class DetalleTebResult
    {
        [JsonProperty("fecha")]
        public string fecha { get; set; }

        [JsonProperty("estado_Entrada")]
        public string estado_Entrada { get; set; }

        [JsonProperty("estado_Salida")]
        public string estado_Salida { get; set; }

        [JsonProperty("nombre")]
        public string nombre { get; set; }

        [JsonProperty("especie")]
        public string especie { get; set; }

        [JsonProperty("isin")]
        public string isin { get; set; }

        [JsonProperty("cantidad")]
        public string cantidad { get; set; }

        [JsonProperty("detalle")]
        public string detalle { get; set; }
    }
}