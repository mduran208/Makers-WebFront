using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class EjecutaCargaResult
    {
        [JsonProperty("respuesta")]
        public string respuesta { get; set; }

        [JsonProperty("id_proceso")]
        public string id_proceso { get; set; }
    }
}