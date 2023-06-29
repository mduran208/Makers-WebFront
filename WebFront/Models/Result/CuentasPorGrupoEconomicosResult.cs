using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class CuentasPorGrupoEconomicosResult
    {
        [JsonProperty("Cuenta")]
        public string Cuenta { get; set; }

        [JsonProperty("Numero")]
        public string Numero { get; set; }
    }
}