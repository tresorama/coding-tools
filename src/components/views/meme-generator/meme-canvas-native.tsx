
import { useRef, useEffect } from 'react';

import { useMemeData } from './data-provider';
import { PLACEHOLDER_IMAGE } from './presets';

export const CanvasNative = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentMeme, savePreview } = useMemeData();

  // Funzione per disegnare il meme sul canvas
  const drawMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();

    img.onload = () => {
      // Pulisci il canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Disegna l'immagine
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Configura lo stile del testo
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 5;
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.lineJoin = 'round';

      // Disegna il testo superiore
      ctx.font = 'bold 36px Impact';
      ctx.textBaseline = 'top';
      ctx.strokeText(currentMeme.topText, canvas.width / 2, 10);
      ctx.fillText(currentMeme.topText, canvas.width / 2, 10);

      // Disegna il testo inferiore
      ctx.textBaseline = 'bottom';
      ctx.strokeText(currentMeme.bottomText, canvas.width / 2, canvas.height - 10);
      ctx.fillText(currentMeme.bottomText, canvas.width / 2, canvas.height - 10);

      // Salva l'anteprima
      const previewImage = canvas.toDataURL();
      savePreview(previewImage);
    };

    img.src = currentMeme.imageUrl ?? PLACEHOLDER_IMAGE.dataUri;
  };

  // Ridisegna il canvas quando cambiano i valori
  useEffect(() => {
    drawMeme();
  }, [
    currentMeme.id,
    currentMeme.topText,
    currentMeme.bottomText,
    currentMeme.imageUrl
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={600}
      className="mx-auto w-full max-w-lg border-2 border-gray-300 rounded-md bg-gray-100"
    />
  );

};


