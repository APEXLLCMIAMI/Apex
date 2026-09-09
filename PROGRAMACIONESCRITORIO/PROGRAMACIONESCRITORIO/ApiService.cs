using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace PROGRAMACIONESCRITORIO
{
    public class ProductoDto
    {
        public int Id { get; set; }
        private static readonly HttpClient _httpClient = new HttpClient()
        {
            
            Timeout = TimeSpan.FromSeconds(2)
        };
        public decimal Precio { get; set; }
    }

    public class ApiService
    {
        private static readonly HttpClient _httpClient = new HttpClient();

        private readonly JsonSerializerOptions _options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        public async Task<T> GetAsync<T>(string url)
        {
            HttpResponseMessage response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadFromJsonAsync<T>(_options);
        }

        public async Task<bool> PostAsync<T>(string url, T data)
        {
            HttpResponseMessage response = await _httpClient.PostAsJsonAsync(url, data);
            return response.IsSuccessStatusCode;
        }
    }
}