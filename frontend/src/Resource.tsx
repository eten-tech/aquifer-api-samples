import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { fetchFromApi } from "./utils";
import {
  ImageContent,
  MediaType,
  ResourceDetails,
  TextContent,
  VideoContent,
} from "./types/api";
import useAudioHandler from "./useAudioHandler";

function Resource() {
  const params = useParams();
  const mediaType = params.mediaType as MediaType;
  const resourceId = params.id && parseInt(params.id);

  const [resource, setResource] = useState<ResourceDetails | null>(null);
  const [isFetchingResource, setIsFetchingResource] = useState(true);
  const { isLoading: audioIsLoading, audioUrls } = useAudioHandler(
    mediaType,
    resource,
  );

  useEffect(() => {
    fetchResource();
  }, []);

  if (!resourceId) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <p className="text-center text-red-500 text-xl font-semibold">
          Invalid resource ID
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Go back home
        </Link>
      </div>
    );
  }

  async function fetchResource() {
    if (resourceId) {
      setIsFetchingResource(true);
      const stuff = await fetchFromApi<ResourceDetails>(
        `/resources/${resourceId}`,
        { contentTextType: "html" },
      );
      setResource(stuff);
      setIsFetchingResource(false);
    }
  }

  if (isFetchingResource || audioIsLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-center text-gray-600">Loading resource...</p>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <p className="text-center text-red-500 text-xl font-semibold">
          Resource not found
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <Link
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Back
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">{resource.name}</h1>
      <div className="w-full">
        {(() => {
          switch (mediaType) {
            case "Text":
              return (
                <div className="prose overflow-y-auto">
                  {(resource.content as TextContent).map((content, index) => (
                    <div key={index}>
                      <div dangerouslySetInnerHTML={{ __html: content }} />
                      {index < (resource.content as TextContent).length - 1 && (
                        <hr />
                      )}
                    </div>
                  ))}
                </div>
              );
            case "Image":
              return (
                <img
                  src={(resource.content as ImageContent).url}
                  alt={resource.name}
                  className="max-w-full h-auto"
                />
              );
            case "Video":
              return (
                <video controls className="max-w-full">
                  <source
                    src={(resource.content as VideoContent).url}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              );
            case "Audio":
              return audioUrls.map((url, index) => (
                <audio key={index} controls className="my-2 w-full">
                  <source src={url} type="audio/webm" />
                  Your browser does not support the audio tag.
                </audio>
              ));
            default:
              return <div>Unsupported media type</div>;
          }
        })()}
      </div>
    </>
  );
}

export default Resource;
