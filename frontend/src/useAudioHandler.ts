import JSZip from "jszip";
import { useEffect, useState } from "react";
import { AudioContent, MediaType, ResourceDetails } from "./types/api";

export default function useAudioHandler(mediaType: MediaType, resource: ResourceDetails | null) {
  const [audioUrls, setAudioUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mediaType === 'Audio' && resource) {

      const handleZipFile = async (url: string) => {
        try {
          setIsLoading(true);
          const response = await fetch(url);
          const blob = await response.blob();
          const zip = await JSZip.loadAsync(blob);
          const audioFiles = Object.values(zip.files).filter(file =>
            file.name.endsWith('.webm') || file.name.endsWith('.mp3')
          );

          console.log(audioFiles)
          if (audioFiles.length === 0) {
            setAudioUrls([]);
            return;
          }

          const urls = await Promise.all(audioFiles.map(async (file) => {
            const blob = await file.async('blob');
            return URL.createObjectURL(blob);
          }));
          setAudioUrls(urls);
        } catch (error) {
          console.error(error)
          setAudioUrls([]);
        } finally {
          setIsLoading(false);
        }
      };

      const audioContent = resource.content as AudioContent
      if (audioContent.webm.url.endsWith('.zip')) {
        handleZipFile(audioContent.webm.url);
      } else {
        setAudioUrls([audioContent.webm.url]);
      }
    }
  }, [mediaType, resource]);

  return { audioUrls, isLoading };
}
