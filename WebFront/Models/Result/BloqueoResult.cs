using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class BloqueoResult
    {
        [JsonProperty("id")]
        public string id { get; set; }

        [JsonProperty("cliente")]
        public Cliente cliente { get; set; }

        [JsonProperty("Categoria")]
        public string Categoria { get; set; }

        [JsonProperty("observacion")]
        public string observacion { get; set; }
    }

    public class Cliente
    {
        [JsonProperty("identificacion")]
        public string identificacion { get; set; }

        [JsonProperty("nombre")]
        public string nombre { get; set; }
    }
}