import { useEffect, useState } from "react";
import {
  ApiListResponse,
  ResourceCollection,
  Language,
  Resource,
} from "./types/api";
import { fetchFromApi } from "./utils";
import { Link } from "wouter";

function Home() {
  const [languageOptions, setLanguageOptions] = useState<Language[] | null>(
    null,
  );
  const [resourceCollectionOptions, setResourceCollectionOptions] = useState<
    ResourceCollection[] | null
  >(null);
  const [isFetchingResults, setIsFetchingResults] = useState(false);
  const [results, setResults] = useState<ApiListResponse<Resource> | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [languageCode, setLanguageCode] = useState("");
  const [resourceCollectionCode, setResourceCollectionCode] = useState("");

  async function fetchLanguagesAndResourceCollections() {
    const [languagesResponse, resourceCollectionsResponse] = await Promise.all([
      fetchFromApi("/languages"),
      await fetchFromApi("/resources/collections"),
    ]);
    setLanguageOptions(languagesResponse as Language[]);
    setResourceCollectionOptions(
      resourceCollectionsResponse as ResourceCollection[],
    );
  }

  async function fetchSearchResults() {
    if (searchQuery || resourceCollectionCode) {
      setIsFetchingResults(true);
      const results = await fetchFromApi("/resources/search", {
        query: searchQuery,
        languageCode,
        resourceCollectionCode,
      });
      setResults(results as ApiListResponse<Resource>);
      setIsFetchingResults(false);
    }
  }

  useEffect(() => {
    fetchLanguagesAndResourceCollections();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">Aquifer API Demo</h1>

      {!languageOptions || !resourceCollectionOptions ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : (
        <div className="flex flex-col space-y-4">
          <select
            className="border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setLanguageCode(e.target.value)}
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
            onChange={(e) => setResourceCollectionCode(e.target.value)}
          >
            <option value="">Select Resource Collection</option>
            {resourceCollectionOptions.map((resourceCollection) => (
              <option
                key={resourceCollection.code}
                value={resourceCollection.code}
              >
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
              onKeyDown={(e) => e.key === "Enter" && fetchSearchResults()}
              onInput={(e) => setSearchQuery(e.currentTarget.value)}
            />
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-700"
              disabled={!languageCode}
              onClick={() => fetchSearchResults()}
            >
              Search
            </button>
          </div>
        </div>
      )}

      {isFetchingResults ? (
        <div className="mt-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading results...</p>
        </div>
      ) : (
        results && (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Type
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
        )
      )}
    </>
  );
}

export default Home;
