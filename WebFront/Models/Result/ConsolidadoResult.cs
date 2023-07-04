using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class ConsolidadoResult
    {
        [JsonProperty("categoria")]
        public string categoria { get; set; }

        [JsonProperty("registros")]
        public string registros { get; set; }

    }
}