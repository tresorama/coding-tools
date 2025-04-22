import { MemeDataProvider } from './data-provider';
import { Header } from './header';
import { MemeCanvas } from './meme-canvas';
import { MemeForm } from './meme-form';
import { MemeGallery } from './meme-gallery';

export const ViewMemeGenerator = () => {
  return (
    <MemeDataProvider>
      <div className="p-6 max-w-2xl mx-auto flex flex-col">
        <Header />
        <div className="w-full mb-6">
          <MemeCanvas />
        </div>
        <MemeForm />
        <MemeGallery />
      </div>
    </MemeDataProvider>
  );
};
