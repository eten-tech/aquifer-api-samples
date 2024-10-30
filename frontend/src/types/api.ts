export interface ApiListResponse<T> {
  totalItemCount: number;
  returnedItemCount: number;
  offset: number;
  items: T[];
}

export interface Language {
  id: number;
  code: string;
  englishDisplay: string;
  localizedDisplay: string;
  scriptDirection: ScriptDirection;
}

export type MediaType = "Text" | "Image" | "Video" | "Audio";

export type ResourceType =
  | "Guide"
  | "Dictionary"
  | "StudyNotes"
  | "Images"
  | "Videos";

export type ScriptDirection = "RTL" | "LTR";

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
