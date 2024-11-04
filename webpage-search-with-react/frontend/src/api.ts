const apiProxyUrl = "http://localhost:5174";

export type AquiferApiPaths = {
  "/languages": Language[];
  "/resources/collections": ResourceCollection[];
  "/resources/:id": ResourceDetails;
  "/resources/search": ResourceSearchResponse;
};

export async function fetchFromApi<TPath extends keyof AquiferApiPaths>(
  path: TPath,
  params: Record<string, string | number | boolean> = {},
): Promise<AquiferApiPaths[TPath] | null> {
  let updatedPath = path as string;
  const pathMatches = updatedPath.match(/:[^/]+/);
  if (pathMatches) {
    const paramName = pathMatches[0];
    updatedPath = updatedPath.replace(
      paramName,
      params[paramName.substring(1)].toString(),
    );
    delete params[paramName.substring(1)];
  }
  const cleanParams = Object.fromEntries(
    Object.entries(params)
      .filter(([_, value]) => value)
      .map(([key, value]) => [key, value.toString()]),
  );
  const searchParams = new URLSearchParams(cleanParams);
  const url = `${apiProxyUrl}${updatedPath}?${searchParams}`;

  return fetch(url)
    .then((response) =>
      response.ok ? (response.json() as Promise<AquiferApiPaths[TPath]>) : null,
    )
    .catch(() => null);
}

export type MediaType = "Text" | "Image" | "Video" | "Audio";

export type ResourceType =
  | "Guide"
  | "Dictionary"
  | "StudyNotes"
  | "Images"
  | "Videos";

export type ScriptDirection = "RTL" | "LTR";

export interface ResourceSearchResponse {
  totalItemCount: number;
  returnedItemCount: number;
  offset: number;
  items: Resource[];
}

export interface Language {
  id: number;
  code: string;
  englishDisplay: string;
  localizedDisplay: string;
  scriptDirection: ScriptDirection;
}

export interface ResourceCollection {
  code: string;
  displayName: string;
  shortName: string;
  resourceType: ResourceType;
}

export interface Resource {
  id: number;
  name: string;
  localizedName: string;
  mediaType: MediaType;
  languageCode: string;
  grouping: {
    type: string;
    name: string;
    collectionTitle: string;
    collectionCode: string;
  };
}

export interface ResourceDetails {
  id: number;
  name: string;
  localizedName: string;
  content: Content;
  grouping: {
    type: ResourceType;
    name: string;
    mediaType: MediaType;
    licenseInfo: object;
  };
  language: {
    id: number;
    code: string;
    displayName: string;
    scriptDirection: ScriptDirection;
  };
}

export type Content = TextContent | ImageContent | VideoContent | AudioContent;

export type TextContent = string[];

export interface ImageContent {
  url: string;
}

export interface VideoContent {
  url: string;
}

export interface AudioContent {
  webm: { url: string };
  mp3: { url: string };
}
