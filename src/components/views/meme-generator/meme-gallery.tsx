import { Button } from "@/components/shadcn/ui/button";
import { useMemeData } from "./data-provider";
import { PlusIcon, TrashIcon } from "lucide-react";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import { Card, CardContent } from "@/components/shadcn/ui/card";

// Componente per mostrare tutti i meme creati
export const MemeGallery = () => {
  const { memes, currentMeme, setCurrentMemeId, addNewMeme, deleteMeme } = useMemeData();

  return (
    <div className="w-full mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">I tuoi meme</h2>
        <Button variant="outline" size="sm" onClick={addNewMeme}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Nuovo meme
        </Button>
      </div>

      <ScrollArea className="h-40 w-full border rounded-md p-2">
        <div className="flex gap-4 p-2">
          {memes.map((meme) => (
            <Card
              key={meme.id}
              className={`w-32 flex-shrink-0 cursor-pointer ${meme.id === currentMeme.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setCurrentMemeId(meme.id)}
            >
              <CardContent className="p-2 relative">
                {meme.previewUrl ? (
                  <img
                    src={meme.previewUrl}
                    alt={`Meme ${meme.id}`}
                    className="w-full h-20 object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-20 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">Anteprima</span>
                  </div>
                )}
                <div className="mt-2 flex justify-between">
                  <span className="text-xs truncate">Meme {meme.id}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMeme(meme.id);
                    }}
                  >
                    <TrashIcon className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};