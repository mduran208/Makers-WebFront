using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class TirMasivaResult
    {
        [JsonProperty("cliente")]
        public string cliente { get; set; }

        [JsonProperty("saldo_Inicial")]
        public string saldo_Inicial { get; set; }

        [JsonProperty("saldo_Final")]
        public string saldo_Final { get; set; }

        [JsonProperty("entradas")]
        public string entradas { get; set; }

        [JsonProperty("salidas")]
        public string salidas { get; set; }

        [JsonProperty("tir")]
        public string tir { get; set; }
    }
}