using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class GrupoEconomicoInfoResult
    {
        [JsonProperty("clienteId")]
        public string clienteId { get; set; }

        [JsonProperty("clienteCuentas")]
        public string clienteCuentas { get; set; }

        [JsonProperty("clienteNombre")]
        public string clienteNombre { get; set; }

        [JsonProperty("fechaInicial")]
        public string fechaInicial { get; set; }

        [JsonProperty("fechaFinal")]
        public string fechaFinal { get; set; }

        [JsonProperty("fechaVinculacion")]
        public string fechaVinculacion { get; set; }

        [JsonProperty("saldoInicial")]
        public string saldoInicial { get; set; }

        [JsonProperty("totalEntradas")]
        public string totalEntradas { get; set; }

        [JsonProperty("totalSalidas")]
        public string totalSalidas { get; set; }

        [JsonProperty("saldosFinal")]
        public string saldosFinal { get; set; }

        [JsonProperty("tir")]
        public string tir { get; set; }

        [JsonProperty("pyG")]
        public string pyG { get; set; }
    }
}