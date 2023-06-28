using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Request
{
    public class NombreClienteRequest
    {
        [JsonProperty("Key")]
        public string Key { get; set; }

        [JsonProperty("Nombre")]
        public string Nombre { get; set; }

        [JsonProperty("Rol")]
        public string Rol { get; set; }

    }
}