using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class CategoriaResult
    {
        [JsonProperty("nombreCategoria")]
        public string nombreCategoria { get; set; }
    }
}