
import { CanvasNative } from './meme-canvas-native';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/shadcn/ui/tabs';

// Componente per il rendering del canvas
export const MemeCanvas = () => {
  return (
    <Tabs defaultValue='native'>
      <TabsList>
        <TabsTrigger value='native'>Native</TabsTrigger>
        {/* <TabsTrigger value='konva'>Konva</TabsTrigger> */}
      </TabsList>
      <TabsContent value='native'>
        <CanvasNative />
      </TabsContent>
    </Tabs>
  );

};



