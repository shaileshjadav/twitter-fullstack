import axios from "axios";
import apiSecure from "../libs/axios";

const useAwsUpload = () => {
  const generatePresignedUrl = async (url: string) => {
    try {
      const response = await apiSecure.get(url);
      return {
        presigneUrl: response.data.url,
        filePath: response.data.filePath,
      };
    } catch (e: any) {
      console.log(e);
      throw e;
    }
  };

  function dataURItoBlob(dataURI: string) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    const binary = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: mimeString });
  }

  const uploadObject = async (presignedUrl: string, dataURI: string) => {
    try {
      const blobData = dataURItoBlob(dataURI);

      return await axios.put(presignedUrl, blobData);
    } catch (e: any) {
      console.log(e);
      throw e;
    }
  };

  return {
    generatePresignedUrl,
    uploadObject,
  };
};
export default useAwsUpload;
