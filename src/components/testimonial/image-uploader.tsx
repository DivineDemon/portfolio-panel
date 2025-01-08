import { type Dispatch, type SetStateAction, useState } from "react";

import { Loader2, Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { cn, imageToUrl } from "@/lib/utils";

import { Button } from "../ui/button";

interface ImageUploaderProps {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}

const ImageUploader = ({ image, setImage }: ImageUploaderProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [], "image/jpg": [] },
    maxFiles: 1,
    maxSize: 2097152,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = async () => {
          if (reader.result) {
            setLoading(true);
            const imageUrl = await imageToUrl(
              reader.result.toString().split(",")[1]
            );
            if (imageUrl) {
              setImage(imageUrl);
              setLoading(false);
            }
          }
        };

        reader.readAsDataURL(file);
      } else {
        setLoading(false);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex w-full cursor-pointer flex-col items-center justify-center gap-2.5 rounded-lg border-2 border-dashed bg-muted p-5",
        {
          "border-blue-500": isDragActive,
          "border-black dark:border-white": !isDragActive,
        }
      )}
    >
      <input {...getInputProps()} />
      {image ? (
        <div className="relative">
          <img
            src={image}
            alt="uploaded-image"
            className="aspect-square size-24 object-cover"
          />
          <Button
            type="button"
            size="icon"
            variant="destructive"
            onClick={() => setImage("")}
            className="absolute right-1 top-1 size-5"
          >
            <X />
          </Button>
        </div>
      ) : loading ? (
        <Loader2 className="size-10 animate-spin" />
      ) : (
        <>
          <Upload className="size-10" />
          <p className="w-full text-center text-sm text-gray-400">
            Drag & Drop
            <br />
            or
            <br />
            <span className="font-medium text-black underline dark:text-white">
              Browse
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
