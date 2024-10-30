export interface ApiListResponse<T> {
  totalItemCount: number;
  returnedItemCount: number;
  offset: number;
  items: T[];
}

export interface Resource {
  id: number;
  name: string;
  localizedName: string;
  mediaType: string;
  languageCode: string;
  grouping: {
    type: string;
    name: string;
    collectionTitle: string;
    collectionCode: string;
  };
}
