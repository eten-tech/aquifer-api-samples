namespace AquiferApiFilesDemo.AquiferApiHttpClient;

public record ListResourceCollectionsResponse(string Code, string DisplayName);

public record SearchRequest(string LanguageCode, string ResourceCollectionCode, int Offset, int Limit = 100);

public record SearchResponse(int TotalItemCount, List<SearchResponseItem> Items);

public record SearchResponseItem(int Id, string Name);

public record GetItemRequest(int ContentId);

public record GetItemResponse(string Name, GetItemResponseContent Content);

public record GetItemResponseContent(string Url);