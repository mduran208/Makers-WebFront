using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace WebFront
{
    /// <summary>
    /// 
    /// </summary>
    public static class HttpWebClient
    {
        private static HttpClient _httpClient;
        private static JsonSerializerSettings _serializerSettings;

        /// <summary>
        /// Metodo Post para llamada al API 
        /// </summary>
        /// <typeparam name="TRequest">Modelo parametros de entrada</typeparam>
        /// <typeparam name="TResult">Modelo parametros de salida</typeparam>
        /// <param name="uri">URL del API</param>
        /// <param name="data">Data de entrada para envio al API</param>
        /// <param name="token">Token de acceso al API</param>
        /// <returns></returns>
        public static TResult Post<TRequest, TResult>(string uri, TRequest data, string token = "")
        {
            #region Implementacion

            try
            {
                if (token != "")
                {
                    CreateHttpClient(token);
                }

                string serialized = JsonConvert.SerializeObject(data, _serializerSettings);
                HttpResponseMessage response = _httpClient.PostAsync(uri, new StringContent(serialized, Encoding.UTF8, "application/json")).Result;

                string responseData = response.Content.ReadAsStringAsync().Result;

                if (response.IsSuccessStatusCode)
                    return JsonConvert.DeserializeObject<TResult>(responseData, _serializerSettings);
                else
                    throw HandleResponse(response, responseData);
            }
            catch(ApiException ex)
            {
                throw ex;
            }
            catch(System.Exception ex)
            {
                throw ex;
            }

            #endregion
        }

        public static string Post(string uri, string token = "")
        {
            #region Implementacion

            try
            {
                if (token != "")
                {
                    CreateHttpClient(token);
                }

                string serialized = JsonConvert.SerializeObject("", _serializerSettings);
                HttpResponseMessage response = _httpClient.PostAsync(uri, new StringContent(serialized, Encoding.UTF8, "application/json")).Result;

                string responseData = response.Content.ReadAsStringAsync().Result;

                if (response.IsSuccessStatusCode)
                    return responseData;
                else
                    throw HandleResponse(response, responseData);
            }
            catch (ApiException ex)
            {
                throw ex;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }

            #endregion
        }

        /// <summary>
        /// Metodo de inicializacion del canal http client
        /// </summary>
        /// <param name="token">Token de acceso al API</param>
        private static void CreateHttpClient(string token)
        {
            #region Implementacion

            try
            {
                _serializerSettings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver(),
                    DateTimeZoneHandling = DateTimeZoneHandling.Utc,
                    NullValueHandling = NullValueHandling.Ignore
                };

                _httpClient = new HttpClient();

                _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                if (!string.IsNullOrEmpty(token))
                {
                    _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                }
            }
            catch(System.Exception ex)
            {
                throw ex;
            }

            #endregion
        }

        /// <summary>
        /// Metodo para creacion de una respuesta de error
        /// </summary>
        /// <param name="response">mensage response</param>
        /// <param name="responseData">Data de respuesta</param>
        /// <returns></returns>
        private static ApiException HandleResponse(HttpResponseMessage response, string responseData)
        {
            #region Implementacion

            try
            {
                return new ApiException { StatusCode = (int)response.StatusCode, HttpStatus = response.StatusCode, Content = responseData };
            }
            catch(System.Exception ex)
            {
                throw ex;
            }
            
            
            #endregion
        }

        public class ApiException : Exception
        {
            public int StatusCode { get; set; }

            public HttpStatusCode HttpStatus { get; set; }

            public string Content { get; set; }
        }
    }

}
