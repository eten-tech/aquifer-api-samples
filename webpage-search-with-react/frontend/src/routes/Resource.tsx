import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import {
  ImageContent,
  MediaType,
  ResourceDetails,
  TextContent,
  VideoContent,
  fetchFromApi,
} from "../api";
import useAudioHandler from "../hooks/useAudioHandler";

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

  const fetchResource = useCallback(async () => {
    if (resourceId) {
      setIsFetchingResource(true);
      const resource = await fetchFromApi(`/resources/:id`, {
        contentTextType: "html",
        id: resourceId,
      });
      setResource(resource);
      setIsFetchingResource(false);
    }
  }, [resourceId]);

  useEffect(() => {
    fetchResource();
  }, [fetchResource]);

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

  if (isFetchingResource || audioIsLoading) {
    return <Loader />;
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
      <div className="w-full h-full overflow-y-auto">
        {(() => {
          switch (mediaType) {
            case "Text":
              return (
                <div className="prose">
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
                <ImageWithLoader
                  src={(resource.content as ImageContent).url}
                  alt={resource.name}
                  className="w-full max-w-full h-auto"
                />
              );
            case "Video":
              return (
                <VideoWithLoader
                  src={(resource.content as VideoContent).url}
                  className="w-full max-w-full"
                />
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

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="text-center text-gray-600">Loading resource...</p>
    </div>
  );
}

function ImageWithLoader({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        className={`${className} ${isLoading ? "hidden" : ""}`}
      />
    </>
  );
}

function VideoWithLoader({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader />}
      <video
        controls
        onLoadedData={() => setIsLoading(false)}
        className={`${className} ${isLoading ? "hidden" : ""}`}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
}

export default Resource;
