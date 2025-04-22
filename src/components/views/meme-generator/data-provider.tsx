import { createContext, useContext, useMemo, useState } from "react";

import { PLACEHOLDER_IMAGE } from './presets';
import { DebugJson } from "@/components/mine/ui/dev/debug-json-react";
import { useLocalStorage } from "usehooks-ts";

// type
type Meme = {
  id: number,
  topText: string,
  bottomText: string,
  imageUrl: string | null,
  previewUrl: string | null,
};

// Creazione del context per lo stato del meme
type MemeCtx = {
  memes: Meme[];
  addNewMeme: () => void;
  deleteMeme: (id: Meme['id']) => void;
  currentMeme: Meme;
  setCurrentMemeId: (memeId: Meme['id']) => void;
  updateCurrentMeme: (updates: Partial<Meme>) => void;
  savePreview: (previewUrl: Meme['previewUrl']) => void;
  uploadedImages: { dataUri: string; }[];
  setUploadedImages: (uploadedImages: { dataUri: string; }[]) => void;
  addUploadedImage: (uploadedImage: { dataUri: string; }) => void;
};
const MemeContext = createContext<MemeCtx>({} as MemeCtx);

// Provider del context
export const MemeDataProvider = ({ children }: { children: React.ReactNode; }) => {
  // Stato per tutti i meme creati
  const [memes, setMemes] = useLocalStorage<Meme[]>(
    'memes',
    [
      {
        id: 0,
        topText: 'TESTO IN ALTO',
        bottomText: 'TESTO IN BASSO',
        imageUrl: PLACEHOLDER_IMAGE.dataUri,
        previewUrl: null,
      }
    ]
  );
  // derived tate for current meme
  const [currentMemeId, setCurrentMemeId] = useState<Meme['id'] | null>(memes[0].id);
  const currentMeme = useMemo(
    () => currentMemeId === null ? null : memes.find(m => m.id === currentMemeId) ?? null,
    [currentMemeId, memes]
  );

  // state for uploaded images (persited in local storage)
  const [uploadedImages, setUploadedImages] = useLocalStorage<{ dataUri: string; }[]>(
    'uploadedImages',
    []
  );


  // Aggiungi un nuovo meme
  const addNewMeme: MemeCtx['addNewMeme'] = () => {
    const newId = memes.length > 0 ? Math.max(...memes.map(m => m.id)) + 1 : 1;
    const newMeme: Meme = {
      id: newId,
      topText: 'NUOVO MEME',
      bottomText: 'TESTO QUI',
      imageUrl: null,
      previewUrl: null
    };
    setMemes([...memes, newMeme]);
    setCurrentMemeId(newMeme.id);
  };

  // Aggiorna un meme specifico nella lista
  const updateMeme = (id: Meme['id'], updates: Partial<Meme>) => {
    setMemes(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  // Elimina un meme dalla lista
  const deleteMeme: MemeCtx['deleteMeme'] = (id) => {
    setMemes(prev => prev.filter(meme => meme.id !== id));

    if (id === currentMemeId) {
      setCurrentMemeId(memes[0].id ?? null);
    }

    // // Se stiamo eliminando il meme corrente, seleziona il primo meme rimanente
    // if (currentMeme.id === id) {
    //   const remainingMemes = memes.filter(meme => meme.id !== id);
    //   if (remainingMemes.length > 0) {
    //     setCurrentMeme(remainingMemes[0]);
    //   } else {
    //     addNewMeme();
    //   }
    // }


    // setMemes(prev => prev.filter(meme => meme.id !== id));

    // // Se stiamo eliminando il meme corrente, seleziona il primo meme rimanente
    // if (currentMeme.id === id) {
    //   const remainingMemes = memes.filter(meme => meme.id !== id);
    //   if (remainingMemes.length > 0) {
    //     setCurrentMeme(remainingMemes[0]);
    //   } else {
    //     addNewMeme();
    //   }
    // }
  };


  // Aggiorna il meme corrente
  const updateCurrentMeme: MemeCtx['updateCurrentMeme'] = (updates) => {
    if (!currentMeme) {
      throw new Error('Meme non trovato');
    }
    updateMeme(currentMeme.id, updates);
  };
  // Salva l'anteprima del meme corrente
  const savePreview: MemeCtx['savePreview'] = (previewUrl) => {
    updateCurrentMeme({ previewUrl });
  };

  const addUploadedImage: MemeCtx['addUploadedImage'] = (uploadedImage) => {
    setUploadedImages(prev => [...prev, uploadedImage]);
  };



  const value: MemeCtx = {
    memes,
    addNewMeme,
    deleteMeme,

    currentMeme: currentMeme!,
    setCurrentMemeId,
    updateCurrentMeme,
    savePreview,

    uploadedImages,
    setUploadedImages,
    addUploadedImage,
  };

  return (
    <MemeContext.Provider value={value}>
      {currentMeme ? children : <p>No meme sekected</p>}
      <DebugJson json={value} />
    </MemeContext.Provider>
  );
};

// Hook personalizzato per usare il context
export const useMemeData = () => {
  const context = useContext(MemeContext);
  if (!context) {
    throw new Error('useMemeData deve essere usato all\'interno di un MemeDataProvider');
  }
  return context;
};