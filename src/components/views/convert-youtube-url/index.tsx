import { useState, useMemo } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import { CopyIcon, MessageCircleQuestionIcon } from 'lucide-react';

import { convertYoutubeUrl } from './utils';
import { toast } from '@/components/mine/ui/toast';
import { Button } from '@/components/shadcn/ui/button';
import { Input } from '@/components/shadcn/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/ui/alert';

// Componente principale
export function ViewConvertYoutubeUrl() {
  // local state - user input
  const [inputUrl, setInputUrl] = useState('');
  const outputUrl = useMemo(() => convertYoutubeUrl(inputUrl), [inputUrl]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, copyToClipboard] = useCopyToClipboard();

  const handleShowExample = () => {
    setInputUrl('https://youtu.be/MhfyvQihMa8?si=VVJJ8hM2yoGK64FK');
  };

  const handleCopyClick = () => {
    if (outputUrl.status === 'error') return;
    copyToClipboard(outputUrl.data.youtube_url)
      .then(() => {
        toast.success('Copied!');
      })
      .catch(() => {
        toast.error('Error in copying!');
      });
  };

  return (
    <div className="flex flex-col p-4 pb-12">
      <h1 className="mb-4 text-2xl font-bold">Convert Youtube Url</h1>

      {/* Esempio d'uso */}
      <Alert className="mb-4 bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
        <MessageCircleQuestionIcon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
        <AlertTitle className="text-neutral-800 dark:text-neutral-300">How to use?</AlertTitle>
        <AlertDescription className="text-neutral-700 dark:text-neutral-400">
          <ol className="list-inside list-decimal space-y-1">
            <li>Paste a Youtube Url in the <strong>Input URL</strong></li>
          </ol>
          <Button variant="outline" className="mt-2" onClick={handleShowExample}>Show example</Button>
        </AlertDescription>
      </Alert>

      {/* Area input */}
      <div className="my-6 space-y-2" >
        <label className="text-xs font-semibold">Input URL</label>
        <Input
          className=""
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder='Paste youtube URL here'
        />
      </div>

      {/* Area output */}
      <div className="my-6 space-y-2" >
        <label className="text-xs font-semibold">Output URL</label>
        <div className='flex gap-2'>
          <Input
            readOnly
            className=""
            value={outputUrl.status === 'success' ? outputUrl.data.youtube_url : ''}
          />
          <Button
            size="icon"
            variant='outline'
            onClick={handleCopyClick}
            disabled={inputUrl == '' || outputUrl.status === 'error'}
          >
            <CopyIcon />
          </Button>
        </div>
        {inputUrl !== '' && outputUrl.status === 'error' && <p className="text-red-500 text-sm mt-1">{outputUrl.message}</p>}
      </div>

    </div>
  );
}
