using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebFront.Models.Result
{
    public class CategoriaInformeResult
    {
        [JsonProperty("informes")]
        public List<informes> informes { get; set; }
    }

    public class informes
    {
        [JsonProperty("categoria")]
        public string categoria { get; set; }
    }
}