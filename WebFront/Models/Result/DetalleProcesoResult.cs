using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class DetalleProcesoResult
    {
        [JsonProperty("estado")]
        public string estado { get; set; }

        [JsonProperty("horaInicio")]
        public string horaInicio { get; set; }

        [JsonProperty("horaFin")]
        public string horaFin { get; set; }

        [JsonProperty("tiempoEjecucion")]
        public string tiempoEjecucion { get; set; }

        [JsonProperty("lote")]
        public string lote { get; set; }
    }
}