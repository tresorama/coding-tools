import { useRef } from "react";

import { useMemeData } from "./data-provider";
import { PRESET_IMAGES } from "./presets";

import { Label } from "@/components/shadcn/ui/label";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { blobToDataUri, downloadRemoteImageAsDataUri } from "./utils/file";

// Componente per il form di input
export const MemeForm = () => {
  const { currentMeme, updateCurrentMeme, uploadedImages, addUploadedImage } = useMemeData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gestisce il caricamento di un'immagine dal disco
  const handleUpdateMemeImage = (imageUrl: string) => {
    updateCurrentMeme({ imageUrl });
  };

  // Gestisce la selezione di un'immagine preimpostata
  const handlePresetSelection = async (imageId: string) => {
    const presetImage = PRESET_IMAGES.find(img => img.id === parseInt(imageId));
    if (!presetImage) return;
    const dataUriResult = await downloadRemoteImageAsDataUri(presetImage.url);
    if (dataUriResult.status === 'error') return;
    handleUpdateMemeImage(dataUriResult.data);
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 gap-4">

        <div>
          <Label htmlFor="topText">Testo in alto</Label>
          <Input
            id="topText"
            value={currentMeme.topText}
            onChange={(e) => updateCurrentMeme({ topText: e.target.value })}
            placeholder="Testo in alto"
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="bottomText">Testo in basso</Label>
          <Input
            id="bottomText"
            value={currentMeme.bottomText}
            onChange={(e) => updateCurrentMeme({ bottomText: e.target.value })}
            placeholder="Testo in basso"
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="image">Immagine</Label>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-[1/2] aspect-square relative bg-muted rounded overflow-hidden">
              {currentMeme.imageUrl && (
                <img src={currentMeme.imageUrl} className="absolute inset-0" />
              )}
            </div>
            <div className="col-[2/-1]">
              <div>
                <p>Caricate</p>
                <div className="flex ">
                  <Card className="aspect-square">
                    <CardContent className="p-0">
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                      >
                        Carica
                      </Button>
                      <Input
                        type="file"
                        className="hidden"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={async e => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          // attempt 1
                          const dataUri = await blobToDataUri(file);
                          if (dataUri.status === 'success') {
                            addUploadedImage({ dataUri: dataUri.data });
                            handleUpdateMemeImage(dataUri.data);
                            return;
                          }

                          // attempt 2
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            const dataUri = e.target?.result;
                            if (!dataUri) return;
                            if (typeof dataUri !== 'string') return;

                            addUploadedImage({ dataUri });
                            handleUpdateMemeImage(dataUri);
                          };
                          reader.readAsDataURL(file);
                        }}
                      />

                    </CardContent>
                  </Card>
                  <div className="flex gap-1 w-full overflow-x-auto">
                    {uploadedImages.map((img) => (
                      <Card
                        key={img.dataUri}
                        onClick={() => handleUpdateMemeImage(img.dataUri)}
                        className="w-[8vw] aspect-square"
                      >
                        <CardContent className="p-0">
                          <img src={img.dataUri} className="object-cover" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p>Presets</p>
                <div className="flex gap-1 w-full overflow-x-auto">
                  {PRESET_IMAGES.map((img) => (
                    <Card
                      key={img.id}
                      onClick={() => handlePresetSelection(img.id.toString())}
                      className="w-[8vw] aspect-square"
                    >
                      <CardContent className="p-0">
                        <img src={img.url} className="object-cover" />
                      </CardContent>
                    </Card>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

