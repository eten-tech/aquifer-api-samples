using AquiferApiFilesDemo;
using AquiferApiFilesDemo.AquiferApiHttpClient;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.Configure<AquiferApiOptions>(builder.Configuration.GetSection(nameof(AquiferApiOptions)));
builder.Services.AddHttpClient<IAquiferApiClient, AquiferApiClient>();
builder.Services.AddHostedService<Worker>();

var host = builder.Build();
host.Run();