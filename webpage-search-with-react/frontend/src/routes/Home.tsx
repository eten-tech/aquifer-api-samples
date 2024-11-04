import { useEffect, useState } from "react";
import {
  ResourceCollection,
  Language,
  Resource,
  fetchFromApi,
  ResourceSearchResponse,
} from "../api";
import { Link } from "wouter";

function Home() {
  const [languageOptions, setLanguageOptions] = useState<Language[] | null>(
    null,
  );
  const [resourceCollectionOptions, setResourceCollectionOptions] = useState<
    ResourceCollection[] | null
  >(null);
  const [isFetchingResults, setIsFetchingResults] = useState(false);
  const [results, setResults] = useState<ResourceSearchResponse | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [languageCode, setLanguageCode] = useState("");
  const [resourceCollectionCode, setResourceCollectionCode] = useState("");

  async function fetchLanguagesAndResourceCollections() {
    const [languagesResponse, resourceCollectionsResponse] = await Promise.all([
      fetchFromApi("/languages"),
      fetchFromApi("/resources/collections"),
    ]);
    setLanguageOptions(languagesResponse);
    setResourceCollectionOptions(resourceCollectionsResponse);
  }

  async function fetchSearchResults() {
    if (searchQuery || resourceCollectionCode) {
      setIsFetchingResults(true);
      const results = await fetchFromApi("/resources/search", {
        query: searchQuery,
        limit: 20,
        languageCode,
        resourceCollectionCode,
      });
      setResults(results);
      setIsFetchingResults(false);
    }
  }

  useEffect(() => {
    fetchLanguagesAndResourceCollections();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">Aquifer API Demo</h1>

      <SearchFilters
        languageOptions={languageOptions}
        resourceCollectionOptions={resourceCollectionOptions}
        languageCode={languageCode}
        resourceCollectionCode={resourceCollectionCode}
        searchQuery={searchQuery}
        onLanguageChange={setLanguageCode}
        onResourceCollectionChange={setResourceCollectionCode}
        onSearchQueryChange={setSearchQuery}
        onSearch={fetchSearchResults}
      />

      {isFetchingResults ? (
        <div className="mt-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading results...</p>
        </div>
      ) : (
        results && <ResourceTable results={results} />
      )}
    </>
  );
}

function SearchFilters({
  languageOptions,
  resourceCollectionOptions,
  languageCode,
  resourceCollectionCode,
  searchQuery,
  onLanguageChange,
  onResourceCollectionChange,
  onSearchQueryChange,
  onSearch,
}: {
  languageOptions: Language[] | null;
  resourceCollectionOptions: ResourceCollection[] | null;
  languageCode: string;
  resourceCollectionCode: string;
  searchQuery: string;
  onLanguageChange: (code: string) => void;
  onResourceCollectionChange: (code: string) => void;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
}) {
  if (!languageOptions || !resourceCollectionOptions) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <select
        className="border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <option value="">Select Language</option>
        {languageOptions.map((language) => (
          <option key={language.code} value={language.code}>
            {language.englishDisplay}
          </option>
        ))}
      </select>
      <select
        className="border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={!languageCode}
        onChange={(e) => onResourceCollectionChange(e.target.value)}
      >
        <option value="">Select Resource Collection</option>
        {resourceCollectionOptions.map((resourceCollection) => (
          <option key={resourceCollection.code} value={resourceCollection.code}>
            {resourceCollection.displayName}
          </option>
        ))}
      </select>
      <div className="flex space-x-2">
        <input
          className="flex-grow border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter search query"
          disabled={!languageCode}
          value={searchQuery}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          onInput={(e) => onSearchQueryChange(e.currentTarget.value)}
        />
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
          disabled={!languageCode || (!searchQuery && !resourceCollectionCode)}
          onClick={onSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}

function ResourceTable({ results }: { results: ResourceSearchResponse }) {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Resource Collection
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              URL
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {results.items.map((resource) => (
            <tr key={resource.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {resource.grouping.collectionTitle}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {resource.localizedName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <Link
                  href={`/resources/${resource.mediaType}/${resource.id}`}
                  className="text-blue-500 hover:text-blue-700 hover:underline"
                >
                  View Resource
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
