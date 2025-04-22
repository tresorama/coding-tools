import { Button } from "@/components/shadcn/ui/button";
import { SaveIcon } from "lucide-react";
import { useMemeData } from "./data-provider";

export const Header = () => {
  const { currentMeme } = useMemeData();

  const handleExport = () => {
    if (!currentMeme.previewUrl) {
      alert('error todo');
      return;
    }

    fetch(currentMeme.previewUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'meme.png'; // Nome del file
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Errore durante la scaricata dell\'immagine:', error));
  };

  return (
    <div className='flex justify-between gap-4'>
      <h1 className="text-3xl font-bold mb-6">Generatore di Meme</h1>
      <Button onClick={handleExport}>
        <SaveIcon /> Export
      </Button>
    </div>
  );
};
