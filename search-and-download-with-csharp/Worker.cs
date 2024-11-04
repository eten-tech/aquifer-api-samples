using System.Xml;
using AquiferApiFilesDemo.AquiferApiHttpClient;

namespace AquiferApiFilesDemo;

public class Worker(IHostApplicationLifetime hostApplicationLifetime, IAquiferApiClient aquiferApiClient) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        // var resourceCollections = await ListCollectionsAsync(ct);
        // foreach (var resourceCollection in resourceCollections)
        // {
        //     Console.WriteLine($"{resourceCollection.DisplayName} - {resourceCollection.Code}");
        // }

        var ubsImageItems = await GetUbsImagesAsync(ct);
        // await using var file = File.CreateText("ubs-image-urls.txt");
        for (int i = 0; i < 5; i++)
        {
            var ubsItem = await GetItemAsync(new GetItemRequest(ubsImageItems[i].Id), ct);
            var response = await aquiferApiClient.GetCdnFileAsync(ubsItem.Content.Url, ct);
            var content = await response.Content.ReadAsStreamAsync(ct);

            Directory.CreateDirectory("ubs-images");
            await using var fileStream = File.Create($"ubs-images/{ubsItem.Content.Url.Split('/').Last()}");
            await content.CopyToAsync(fileStream, ct);
            // await file.WriteLineAsync($"{ubsItem.Name} - {ubsItem.Content.Url}");

        }

        hostApplicationLifetime.StopApplication();
    }

    private async Task<List<SearchResponseItem>> GetUbsImagesAsync(CancellationToken ct)
    {
        List<SearchResponseItem> allItems = [];
        int totalItemCount;
        var offset = 0;

        do
        {
            var searchResponse = await SearchAsync(new SearchRequest("ENG", "UbsImages", offset), ct);
            allItems.AddRange(searchResponse.Items);
            totalItemCount = searchResponse.TotalItemCount;
            offset += 100;
        } while (false); // while (offset < totalItemCount);

        await using var file = File.CreateText("ubs-items.txt");
        foreach (var item in allItems)
        {
            await file.WriteLineAsync($"{item.Id} - {item.Name}");
        }

        return allItems;
    }

    private async Task<GetItemResponse> GetItemAsync(GetItemRequest getItemRequest, CancellationToken ct)
    {
        var response = await aquiferApiClient.GetResourceItemAsync(getItemRequest, ct);
        var responseContent = await response.Content.ReadAsStringAsync(ct);

        return JsonUtilities.DefaultDeserialize<GetItemResponse>(responseContent);
    }

    private async Task<SearchResponse> SearchAsync(SearchRequest searchRequest, CancellationToken ct)
    {
        var response = await aquiferApiClient.SearchResourceItemsAsync(searchRequest, ct);
        var responseContent = await response.Content.ReadAsStringAsync(ct);

        return JsonUtilities.DefaultDeserialize<SearchResponse>(responseContent);
    }

    private async Task<List<ListResourceCollectionsResponse>> ListCollectionsAsync(CancellationToken ct)
    {
        var response = await aquiferApiClient.ListCollectionsAsync(ct);
        var responseContent = await response.Content.ReadAsStringAsync(ct);

        return JsonUtilities.DefaultDeserialize<List<ListResourceCollectionsResponse>>(responseContent);
    }
}