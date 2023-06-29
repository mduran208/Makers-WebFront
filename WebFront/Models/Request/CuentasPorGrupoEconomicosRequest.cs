using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Request
{
    public class CuentasPorGrupoEconomicosRequest
    {
        [JsonProperty("GrupoEconomico")]
        public string GrupoEconomico { get; set; }

        [JsonProperty("Clientes")]
        public string Clientes { get; set; }
    }
}