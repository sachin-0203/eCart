import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";

export default function ImageUploadField({
  id,
  label,
  file,
  existingImageUrl = "",
  onChange,
}) {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return undefined;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const displayedImage = previewUrl || existingImageUrl;
  const displayedName =
    file?.name ||
    (existingImageUrl
      ? decodeURIComponent(existingImageUrl.split("/").pop()?.split("?")[0] || "")
      : "No image selected");

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor={id}
        className="flex h-36 w-28 cursor-pointer flex-col overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center transition hover:border-cyan-400 hover:bg-cyan-50"
      >
        <input
          id={id}
          type="file"
          accept="image/*"
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
          className="sr-only"
        />
        <span className="flex min-h-0 flex-1 items-center justify-center overflow-hidden">
          {displayedImage ? (
            <img
              src={displayedImage}
              alt={`${label} preview`}
              className="h-full w-full object-cover"
            />
          ) : (
            <ImagePlus className="text-slate-400" size={24} />
          )}
        </span>
        <span className="flex h-9 shrink-0 items-center justify-center border-t border-slate-200 bg-white px-1 text-xs font-semibold text-slate-700">
          Choose image
        </span>
      </label>
      <p
        className="mt-2 line-clamp-2 w-32 break-all text-center text-xs text-slate-500"
        title={displayedName}
      >
        {displayedName}
      </p>
    </div>
  );
}