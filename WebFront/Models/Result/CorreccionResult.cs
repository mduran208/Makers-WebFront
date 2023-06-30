using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class CorreccionResult
    {
        [JsonProperty("id")]
        public string id { get; set; }

        [JsonProperty("fK_Id_Transaccion")]
        public string fK_Id_Transaccion { get; set; }

        [JsonProperty("idCliente")]
        public string idCliente { get; set; }

        [JsonProperty("cliente")]
        public string cliente { get; set; }

        [JsonProperty("lote")]
        public string lote { get; set; }

        [JsonProperty("proceso")]
        public string proceso { get; set; }

        [JsonProperty("operacion")]
        public string operacion { get; set; }

        [JsonProperty("valor")]
        public string valor { get; set; }

        [JsonProperty("cuenta")]
        public string cuenta { get; set; }
    }
}