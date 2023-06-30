using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class ClientesPorGrupoEconomicoResult
    {
        [JsonProperty("Id")]
        public string Id { get; set; }

        [JsonProperty("IdCuenta")]
        public string IdCuenta { get; set; }

        [JsonProperty("IdCliente")]
        public string IdCliente { get; set; }

        [JsonProperty("Nombre")]
        public string Nombre { get; set; }

        [JsonProperty("Comercial")]
        public string Comercial { get; set; }
    }
}