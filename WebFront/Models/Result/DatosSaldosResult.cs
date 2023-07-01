using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class DatosSaldosResult
    {
        [JsonProperty("documento")]
        public string documento { get; set; }

        [JsonProperty("tipo_Operacion")]
        public string tipo_Operacion { get; set; }

        [JsonProperty("tipo_Identificacion")]
        public string tipo_Identificacion { get; set; }

        [JsonProperty("cuenta")]
        public string cuenta { get; set; }

        [JsonProperty("fecha")]
        public string fecha { get; set; }

        [JsonProperty("tipo")]
        public string tipo { get; set; }

        [JsonProperty("operacion")]
        public string operacion { get; set; }

        [JsonProperty("fuente")]
        public string fuente { get; set; }

        [JsonProperty("vpn")]
        public string vpn { get; set; }

        [JsonProperty("vpl")]
        public string vpl { get; set; }

        [JsonProperty("especies")]
        public string especies { get; set; }

        [JsonProperty("lote")]
        public string lote { get; set; }
    }
}