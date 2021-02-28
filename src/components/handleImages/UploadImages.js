import React, { useRef, useState } from "react";
import { Header, Button, Image } from "semantic-ui-react";

function UploadImages() {
  const inputRef = useRef();
  const [image, setImage] = useState(
    "https://react.semantic-ui.com/images/wireframe/image.png"
  );

  function handleInputChange(event) {
    const fileToUpload = event.target.files[0];
    if (!fileToUpload) return;
    const fileSampleUrl = URL.createObjectURL(fileToUpload);
    setImage(fileSampleUrl);
  }

  return (
    <>
      <Header as="h4">Upload your image</Header>
      <Image size="large" src={image} />
      <input
        ref={inputRef}
        type="file"
        onChange={handleInputChange}
        className="hide"
      />
      <Button onClick={() => inputRef.current.click()} className="mt-1">
        Upload Image
      </Button>
    </>
  );
}

export default UploadImages;
