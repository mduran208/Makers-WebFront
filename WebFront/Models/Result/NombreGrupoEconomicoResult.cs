using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class NombreGrupoEconomicoResult
    {
        [JsonProperty("Id")]
        public string Id { get; set; }
        [JsonProperty("IdGrupoEconomico")]
        public string IdGrupoEconomico { get; set; }
        [JsonProperty("Nombre")]
        public string Nombre { get; set; }
    }
}