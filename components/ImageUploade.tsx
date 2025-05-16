import React, { useCallback, useState, useEffect } from "react";
import { useDropzone, FileRejection } from "react-dropzone";

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
  multiple?: boolean;
  value?: string | null; // New prop for the saved image name
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUpload,
  multiple = true,
  value = null, // Default value for saved image name
}) => {
  const [latestFileName, setLatestFileName] = useState<string | null>(null);

  useEffect(() => {
    // Update the latestFileName when the savedImageName prop changes
    setLatestFileName(value);
  }, [value]);

  console.log("multiple", multiple);

  const handleDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (!multiple && acceptedFiles.length > 1) {
        // If multiple is set to false, only use the first file if more than one is dropped
        acceptedFiles = [acceptedFiles[0]];
      }

      if (acceptedFiles.length > 0) {
        setLatestFileName(acceptedFiles[0].name); // Use the name of the first file
        onUpload(acceptedFiles);
      }

      // Handle rejected files if needed
      if (fileRejections.length > 0) {
        console.error("Rejected files:", fileRejections);
      }
    },
    [onUpload, multiple]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*",
    multiple: multiple,
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? "active" : ""}`}
    >
      <input {...getInputProps()} />
      <div className="border-2 border-dashed border-gray-300 rounded-lg cursor-pointer py-5">
        <div className="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="57"
            height="54"
            viewBox="0 0 57 54"
            fill="none"
          >
            <path
              d="M8.99142 2.87598H36.5724C37.5877 3.00191 37.6178 3.55736 37.3253 4.86071C35.888 14.9897 45.6749 22.518 55.3932 18.6854C56.6116 18.2812 57.0358 18.6854 56.9673 19.5752V44.4186C56.9673 49.4147 52.6557 54.0001 47.3858 54.0001H9.4705C4.47443 54.0001 0.0258789 49.5515 0.0258789 44.6239V11.91C0.0258789 6.5717 5.02194 2.87598 8.99142 2.87598Z"
              fill="#F7FBFC"
            />
            <path
              d="M48.207 14.168V7.52943C46.7732 8.7652 46.1228 9.08961 45.401 8.62467C45.401 8.62467 44.5482 8.1456 44.1691 7.52943C42.9373 5.9555 45.8116 3.42328 48.686 0.75394C49.7911 -0.272287 50.8764 -0.230118 52.108 0.75394C55.5301 4.10782 57.4464 5.68193 56.7619 7.52943L55.7353 8.48758C54.918 9.21397 54.1519 8.79937 52.5871 7.52943V14.168C52.6557 16.8375 48.207 16.7006 48.207 14.168Z"
              fill="#F7FBFC"
            />
            <path
              d="M12.0026 49.6196C6.12427 49.6145 4.02355 48.2193 4.40588 40.9278L12.0711 33.2626C13.3468 32.1792 15.014 32.6467 15.6299 33.2626L18.0937 35.5895C19.3754 36.9726 20.0962 36.9434 21.3788 35.5895L35.2035 21.7648C36.8558 20.5062 37.7494 20.6367 39.3099 21.7648L52.5871 35.042V43.7338C52.5871 47.6349 50.1233 49.6196 46.7013 49.6196H12.0026Z"
              fill="#BBCDDF"
            />
            <circle cx="16.8619" cy="19.7115" r="3.8326" fill="#BBCDDF" />
          </svg>
          <p className="flex flex-col items-center justify-center text-xl">
            <span className="text-[10px] text-left">
              Click or drag file to this area
            </span>
            {multiple
              ? "Drag & drop images here, or click to select images"
              : "Drag & drop an image here, or click to select an image"}
          </p>
        </div>
        <p className="flex justify-center">{latestFileName}</p>
      </div>
    </div>
  );
};

export default ImageUploader;
