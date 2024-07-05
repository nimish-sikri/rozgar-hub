"use client";
import { UploadButton } from "@/utils/uploadthing";

function ImageUpload() {
  return (
    <div className="image-upload-container">
      <UploadButton endpoint="imageUploader" />
      
    </div>
  );
}

export default ImageUpload;
