import type { Result } from "@/lib/utils/ts-result";

/** Download a remote image (from an URL) as a Data URI */
export const downloadRemoteImageAsDataUri = async (url: string): Promise<Result<string>> => {
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      return {
        status: 'error',
        message: "Errore durante la scaricata dell'immagine",
      };
    }
    const blob = await res.blob();
    const dataUri2 = await blobToDataUri(blob);
    if (dataUri2.status === 'error') {
      return {
        status: 'error',
        message: "Errore durante la conversione del blob in data URI",
      };
    }
    return {
      status: 'success',
      data: dataUri2.data,
    };
  } catch (error) {
    return {
      status: 'error',
      message: "Errore durante la scaricata dell'immagine",
    };

  }
};


/** Convert a Blob to a Data URI */
export const blobToDataUri = async (blob: Blob | File) => {
  return new Promise<Result<string>>((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve({
        status: 'success',
        data: e.target?.result as string,
      });
    };
    reader.onerror = () => {
      resolve({
        status: 'error',
        message: 'Errore durante la conversione del blob in data URI',
      });
    };
    reader.readAsDataURL(blob);
  });
};