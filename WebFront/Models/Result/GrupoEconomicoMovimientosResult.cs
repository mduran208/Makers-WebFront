using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class GrupoEconomicoMovimientosResult
    {
        [JsonProperty("Id")]
        public string Id { get; set; }

        [JsonProperty("fecha")]
        public string fecha { get; set; }

        [JsonProperty("producto")]
        public string producto { get; set; }

        [JsonProperty("Nombre_Producto")]
        public string Nombre_Producto { get; set; }

        [JsonProperty("CCLI")]
        public string CCLI { get; set; }

        [JsonProperty("nombre")]
        public string nombre { get; set; }

        [JsonProperty("FK_Id")]
        public string FK_Id { get; set; }

        [JsonProperty("cuenta")]
        public string cuenta { get; set; }

        [JsonProperty("tipo")]
        public string tipo { get; set; }

        [JsonProperty("valor")]
        public string valor { get; set; }

        [JsonProperty("Entradas")]
        public string Entradas { get; set; }

        [JsonProperty("Salidas")]
        public string Salidas { get; set; }

        [JsonProperty("id_Cliente")]
        public string id_Cliente { get; set; }
    }
}