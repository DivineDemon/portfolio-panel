import { Loader2, Upload, X } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { cn, imageToUrl } from "@/lib/utils";

import { Button } from "./button";

interface ImageUploaderProps {
  // For single image upload
  image?: string;
  setValue?: (name: string, value: string) => void;

  // For multiple image upload
  images?: string[];
  setImages?: (images: string[]) => void;

  // Configuration
  multiple?: boolean;
  minImages?: number;
  maxImages?: number;
  className?: string;
}

const ImageUploader = ({
  image,
  setValue,
  images = [],
  setImages,
  multiple = false,
  minImages = 0,
  maxImages = 10,
  className,
}: ImageUploaderProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = async (acceptedFiles: File[]) => {
    setLoading(true);

    if (acceptedFiles.length === 0) {
      setLoading(false);
      return;
    }

    if (multiple) {
      // Multiple image upload logic
      if (images.length + acceptedFiles.length > maxImages) {
        toast.error(`Cannot upload more than ${maxImages} images.`);
        setLoading(false);
        return;
      }

      const uploadPromises = acceptedFiles.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = async (event) => {
            if (event.target?.result) {
              const url = await imageToUrl(event.target.result.toString().split(",")[1]);
              resolve(url);
            } else {
              resolve("");
            }
          };
          reader.readAsDataURL(file);
        });
      });

      try {
        const uploadedUrls = await Promise.all(uploadPromises);
        const validUrls = uploadedUrls.filter((url) => url !== "");
        if (setImages) {
          setImages([...images, ...validUrls]);
        }
      } catch {
        toast.error("Failed to upload images!");
      } finally {
        setLoading(false);
      }
    } else {
      // Single image upload logic
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = async (event) => {
        if (event.target?.result) {
          const url = await imageToUrl(event.target.result.toString().split(",")[1]);
          if (setValue) {
            setValue("image", url);
          }
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    if (multiple && setImages) {
      const updatedImages = images.filter((_, i) => i !== index);
      setImages(updatedImages);
    }
  };

  const removeSingleImage = () => {
    if (setValue) {
      setValue("image", "");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
  });

  const hasMinimumImages = multiple ? images.length >= minImages : !!image;
  const showValidation = multiple && minImages > 0;

  if (multiple) {
    // Multiple image upload UI
    return (
      <div className={`w-full space-y-4 ${className || ""}`}>
        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={cn(
            "flex w-full cursor-pointer flex-col items-center justify-center gap-2.5 rounded-lg border-2 border-dashed bg-muted p-5",
            {
              "border-blue-500": isDragActive,
              "border-black dark:border-white": !isDragActive,
              "border-green-500": hasMinimumImages && !isDragActive && showValidation,
              "border-red-500": !hasMinimumImages && !isDragActive && showValidation,
            },
          )}
        >
          <input {...getInputProps()} />
          {loading ? (
            <>
              <Loader2 className="size-10 animate-spin" />
              <span>Uploading images...</span>
            </>
          ) : (
            <>
              <Upload className="size-10" />
              <p className="w-full text-center text-gray-400 text-sm">
                Drag & Drop images here
                <br />
                or
                <br />
                <span className="font-medium text-black underline dark:text-white">Browse</span>
              </p>
              {showValidation && (
                <p className="text-gray-500 text-xs">
                  Minimum {minImages} images required ({images.length}/{minImages})
                  {maxImages < 10 && ` • Maximum ${maxImages} images`}
                </p>
              )}
            </>
          )}
        </div>

        {/* Image Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  className="aspect-square w-full rounded-lg object-cover"
                  alt={`uploaded-image-${index + 1}`}
                  src={img}
                />
                <Button
                  onClick={() => removeImage(index)}
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 size-7"
                >
                  <X className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Status Message */}
        {showValidation && !hasMinimumImages && images.length > 0 && (
          <p className="text-red-500 text-sm">
            Please upload at least {minImages} images. Currently have {images.length}.
          </p>
        )}
      </div>
    );
  }

  // Single image upload UI
  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex w-full cursor-pointer flex-col items-center justify-center gap-2.5 rounded-lg border-2 border-dashed bg-muted p-5",
        {
          "border-blue-500": isDragActive,
          "border-black dark:border-white": !isDragActive,
        },
        className,
      )}
    >
      <input {...getInputProps()} />
      {image ? (
        <div className="relative">
          <img className="aspect-square size-24 object-cover" alt="project-image" src={image} />
          <Button
            onClick={removeSingleImage}
            variant="destructive"
            size="icon"
            className="absolute top-1 right-1 size-7"
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
          <p className="w-full text-center text-gray-400 text-sm">
            Drag & Drop
            <br />
            or
            <br />
            <span className="font-medium text-black underline dark:text-white">Browse</span>
          </p>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
