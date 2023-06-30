using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class VerificarEstadoTareaResult
    {
        [JsonProperty("GUID")]
        public string GUID { get; set; }
    }
}