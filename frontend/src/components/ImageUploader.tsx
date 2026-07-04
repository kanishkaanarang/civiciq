import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus } from "lucide-react";

interface Props {
  image: File | null;
  setImage: (file: File | null) => void;
}

export default function ImageUploader({
  image,
  setImage,
}: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="mt-8 cursor-pointer rounded-3xl border-2 border-dashed border-zinc-700 bg-zinc-900 p-10 text-center hover:border-blue-500 transition"
    >
      <input {...getInputProps()} />

      <ImagePlus
        size={40}
        className="mx-auto mb-4 text-blue-500"
      />

      {image ? (
        <>
          <p className="font-semibold">{image.name}</p>

          <img
            src={URL.createObjectURL(image)}
            className="mx-auto mt-5 max-h-60 rounded-2xl"
          />
        </>
      ) : (
        <>
          <p className="text-lg font-semibold">
            Upload an image
          </p>

          <p className="mt-2 text-zinc-400">
            Drag & Drop or Click
          </p>
        </>
      )}
    </div>
  );
}