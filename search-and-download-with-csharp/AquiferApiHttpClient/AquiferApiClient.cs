using Microsoft.Extensions.Options;

namespace AquiferApiFilesDemo.AquiferApiHttpClient;

public interface IAquiferApiClient
{
    Task<HttpResponseMessage> ListCollectionsAsync(CancellationToken ct);
    Task<HttpResponseMessage> SearchResourceItemsAsync(SearchRequest searchRequest, CancellationToken ct);
    Task<HttpResponseMessage> GetResourceItemAsync(GetItemRequest getItemRequest, CancellationToken ct);
    Task<HttpResponseMessage> GetCdnFileAsync(string url, CancellationToken ct);
}

public class AquiferApiClient : IAquiferApiClient
{
    private readonly HttpClient _httpClient;

    public AquiferApiClient(HttpClient httpClient, IOptions<AquiferApiOptions> options)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri(options.Value.BaseUrl);
        _httpClient.DefaultRequestHeaders.TryAddWithoutValidation("api-key", options.Value.ApiKey);
    }

    public async Task<HttpResponseMessage> ListCollectionsAsync(CancellationToken ct)
    {
        return await _httpClient.GetAsync("/resources/collections", ct);
    }

    public async Task<HttpResponseMessage> SearchResourceItemsAsync(SearchRequest searchRequest, CancellationToken ct)
    {
        return await _httpClient.GetAsync(
            $"/resources/search?languageCode={searchRequest.LanguageCode}&resourceCollectionCode={searchRequest.ResourceCollectionCode}&limit={searchRequest.Limit}&offset={searchRequest.Offset}",
            ct);
    }

    public async Task<HttpResponseMessage> GetResourceItemAsync(GetItemRequest getItemRequest, CancellationToken ct)
    {
        return await _httpClient.GetAsync($"/resources/{getItemRequest.ContentId}", ct);
    }

    public async Task<HttpResponseMessage> GetCdnFileAsync(string url, CancellationToken ct)
    {
        return await _httpClient.GetAsync(url, ct);
    }
}