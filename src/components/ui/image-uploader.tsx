import { useState } from "react";

import { Loader2, Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { cn, imageToUrl } from "@/lib/utils";

import { Button } from "./button";

interface ImageUploaderProps {
  image?: string;
  setValue: (name: string, value: string) => void;
}

const ImageUploader = ({ image, setValue }: ImageUploaderProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = async (acceptedFiles: File[]) => {
    setLoading(true);

    if (acceptedFiles.length === 0) {
      return;
    }

    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      if (event.target?.result) {
        const url = await imageToUrl(
          event.target.result.toString().split(",")[1]
        );
        setValue("image", url);
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
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
            className="aspect-square size-24 object-cover"
            alt="project-image"
            src={image}
          />
          <Button
            onClick={() => setValue("image", "")}
            variant="destructive"
            size="icon"
            className="absolute right-1 top-1 size-7"
          >
            <X />
          </Button>
        </div>
      ) : loading ? (
        <>
          <Loader2 className="size-10 animate-spin" />
          <span>Uploading...</span>
        </>
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
