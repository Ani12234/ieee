import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useDispatch, useSelector } from "react-redux";
import { uploadEventImage } from "../../store/admin/events-slice";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode = false,
  isCustomStyling = false,
}) {
  const dispatch = useDispatch();
  const { imageLoading, uploadedImageUrl: reduxImageUrl } = useSelector((state) => state.events);
  const inputRef = useRef(null);

  console.log(isEditMode, "isEditMode");

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    
    if (selectedFile) {
      setImageFile(selectedFile);
      setImageLoadingState(true);
      
      // Local preview first
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        setUploadedImageUrl(imageUrl);
      };
      reader.readAsDataURL(selectedFile);
      
      // Then upload to server
      dispatch(uploadEventImage(selectedFile))
        .then((result) => {
          if (uploadEventImage.fulfilled.match(result)) {
            // If server upload successful, update with the server URL
            const serverUrl = result.payload?.result?.secure_url;
            if (serverUrl) {
              setUploadedImageUrl(serverUrl);
            }
          }
          setImageLoadingState(false);
        })
        .catch(() => {
          setImageLoadingState(false);
        });
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
      setImageLoadingState(true);
      
      // Local preview first
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        setUploadedImageUrl(imageUrl);
      };
      reader.readAsDataURL(droppedFile);
      
      // Then upload to server
      dispatch(uploadEventImage(droppedFile))
        .then((result) => {
          if (uploadEventImage.fulfilled.match(result)) {
            // If server upload successful, update with the server URL
            const serverUrl = result.payload?.result?.secure_url;
            if (serverUrl) {
              setUploadedImageUrl(serverUrl);
            }
          }
          setImageLoadingState(false);
        })
        .catch(() => {
          setImageLoadingState(false);
        });
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl(""); // Clear the image URL
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  // When the Redux state changes, update the local file state
  useEffect(() => {
    if (reduxImageUrl) {
      // If we get an image URL from Redux but no local file, create a dummy one
      if (!imageFile) {
        // Create a dummy file object just to indicate we have an image
        setImageFile({ name: "Uploaded Image" });
        setUploadedImageUrl(reduxImageUrl);
      }
    }
  }, [reduxImageUrl, imageFile]);

  return (
    <div
      className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
    >
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile && !uploadedImageUrl ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>{imageLoadingState ? "Uploading..." : "Drag & drop or click to upload image"}</span>
          </Label>
        ) : imageLoadingState ? (
          <div className="h-32 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <Skeleton className="h-10 w-10 rounded-full bg-gray-200 mb-2" />
              <span className="text-sm text-gray-500">Uploading image...</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {uploadedImageUrl ? (
              <div className="relative w-full h-32">
                <img 
                  src={uploadedImageUrl} 
                  alt="Uploaded Event Image" 
                  className="w-full h-full object-cover rounded-md"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white rounded-full"
                  onClick={handleRemoveImage}
                >
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only">Remove Image</span>
                </Button>
              </div>
            ) : imageFile ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileIcon className="w-8 text-primary mr-2 h-8" />
                </div>
                <p className="text-sm font-medium">{imageFile.name}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={handleRemoveImage}
                >
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only">Remove File</span>
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
