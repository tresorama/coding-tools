import { useState, useMemo } from 'react';
import _ from 'lodash';
import { produce } from "immer";

import { example } from './example';
import { Button } from '@/components/shadcn/ui/button';
import { Input } from '@/components/shadcn/ui/input';
import { MarkdownRenderer } from '@/components/mine/ui/markdown-renderer';
import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/ui/alert';
import { MessageCircleQuestionIcon, PlusIcon } from 'lucide-react';
import { Textarea } from '@/components/shadcn/ui/textarea';
import { Checkbox } from '@/components/shadcn/ui/checkbox';


export type TextConfig = {
  label: string;
  path: string;
  isMarkdown: boolean;
};
type ExtractedText = {
  label: string;
  text: string;
  isMarkdown: boolean;
};

type ParsedJson = (
  | { status: 'idle'; }
  | { status: 'success', data: unknown; }
  | { status: 'error', error: string; }
);

// Componente principale
export function ViewCompareTexts() {
  // local state - user input
  const [jsonInput, setJsonInput] = useState('');
  const [textConfigs, setTextConfigs] = useState<TextConfig[]>([
    { label: 'Testo 1', path: '', isMarkdown: false },
    { label: 'Testo 2', path: '', isMarkdown: false }
  ]);

  // derived local state
  const parsedJson = useMemo<ParsedJson>(() => {
    if (!jsonInput.trim()) {
      return {
        status: 'idle',
      };
    }

    try {
      const parsed = JSON.parse(jsonInput);
      return {
        status: 'success',
        data: parsed
      };
    } catch (err) {
      return {
        status: 'error',
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }
  }, [jsonInput]);
  const extractedTexts = useMemo<ExtractedText[]>(() => {
    if (parsedJson.status !== 'success') {
      return [];
    }

    const parsedJsonData = parsedJson.data;

    const extractedTexts: ExtractedText[] = textConfigs.map(config => {
      try {
        const extractedText = config.path ? _.get(parsedJsonData, config.path, '') : '';
        return {
          ...config,
          text: typeof extractedText === 'string' ? extractedText : JSON.stringify(extractedText, null, 2),
        } satisfies ExtractedText;
      } catch (err) {
        return {
          ...config,
          text: `Errore: ${err instanceof Error ? err.message : 'Unknown error'}`,
        } satisfies ExtractedText;
      }
    });

    return extractedTexts;
  }, [textConfigs, parsedJson]);

  // Gestisce l'aggiunta di un nuovo testo da confrontare
  const handleAddTextConfig = () => {
    setTextConfigs(current => [
      ...current,
      { label: `Text ${textConfigs.length + 1}`, path: '', isMarkdown: false }
    ]);
  };

  // Rimuove una configurazione di testo
  const handleRemoveTextConfig = (index: number) => {
    if (textConfigs.length <= 1) return;
    setTextConfigs(current => produce(current, newState => {
      newState.splice(index, 1);
    }));
  };

  // Aggiorna una configurazione
  const handleUpdateTextConfig = <K extends keyof TextConfig, T extends TextConfig[K]>(index: number, key: K, value: T) => {
    setTextConfigs(current => produce(current, newState => {
      newState[index][key] = value;
    }));
  };

  const handleShowExample = () => {
    setJsonInput(example.inputJson);
    setTextConfigs(example.textConfigs);
  };

  return (
    <div className="flex flex-col p-4 pb-12">
      <h1 className="mb-4 text-2xl font-bold">Compare Texts</h1>

      {/* Esempio d'uso */}
      <Alert className="mb-4 bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
        <MessageCircleQuestionIcon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
        <AlertTitle className="text-neutral-800 dark:text-neutral-300">How to use?</AlertTitle>
        <AlertDescription className="text-neutral-700 dark:text-neutral-400">
          <ol className="list-inside list-decimal space-y-1">
            <li>Paste a JSON in the <strong>Input JSON</strong></li>
            <li>Configure the extraction of texts:
              <ol className="mt-1 pl-3 list-inside list-decimal space-y-1">
                <li><strong>Label</strong>: is only used for display purpose.</li>
                <li><strong>Path</strong>: in lodash.get format, e.g. <code>data.text</code>, <code>contents[0].body</code>, <code>sections.main.paragraphs[1]</code>)</li>
                <li><strong>isMarkdown</strong>: if you want to render the preview in markdown (enabled) or plain-text(disabled)</li>
              </ol>
            </li>
          </ol>
          <Button variant="outline" className="mt-2" onClick={handleShowExample}>Show example</Button>
        </AlertDescription>
      </Alert>

      {/* Area input JSON */}
      <div className="my-6" >
        <h2 className="mb-2 text-lg font-semibold">Input JSON</h2>
        <Textarea
          className="w-full h-40 text-muted-foreground"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"testo1": "Questo è il primo testo", "oggetto": {"testo2": "Questo è il secondo testo"}}'
        />
        {parsedJson.status === 'error' && <p className="text-red-500 text-sm mt-1">{parsedJson.error}</p>}
      </div>

      {/* Configurazione testi */}
      <div className="my-6">
        <h2 className="mb-2 text-lg font-semibold">Texts configuration to compare</h2>
        <div className="space-y-3">
          {/* Control Labels */}
          <div className='grid grid-cols-[3rem_repeat(3,minmax(0,1fr))] gap-2 text-xs'>
            <p></p>
            <p>Label</p>
            <p>Path</p>
            <p>isMarkdown</p>
          </div>
          {textConfigs.map((config, index) => (
            <div key={index} className="grid grid-cols-[3rem_repeat(3,minmax(0,1fr))] gap-2">
              <Button
                size="icon"
                variant="destructive"
                disabled={textConfigs.length <= 1}
                onClick={() => handleRemoveTextConfig(index)}
                className="justify-self-start"
              >
                ✕
              </Button>
              <Input
                type="text"
                value={config.label}
                onChange={(e) => handleUpdateTextConfig(index, 'label', e.target.value)}
                placeholder="Label"
              />
              <Input
                type="text"
                value={config.path}
                onChange={(e) => handleUpdateTextConfig(index, 'path', e.target.value)}
                placeholder="Path (es: oggetto.testo2)"
              />
              <Checkbox
                className='justify-self-start h-full w-auto aspect-square -[2.8em]'
                checked={config.isMarkdown}
                onCheckedChange={(newValue) => handleUpdateTextConfig(index, 'isMarkdown', Boolean(newValue))}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-start items-center">
          <Button onClick={handleAddTextConfig} variant="outline" size="icon">
            <PlusIcon />
          </Button>
        </div>
      </div>

      {/* Visualizzazione testi */}
      {parsedJson.status === 'success' && extractedTexts.length > 0 && (
        <div className="my-6">
          <h2 className="text-lg font-semibold mb-2">Confronto testi</h2>
          <div className="flex overflow-x-auto gap-4">
            {extractedTexts.map((item, index) => (
              <div key={index} className="w-[min(100%,40rem)] flex-shrink-0">
                <h3 className="font-medium mb-1">{item.label}</h3>
                <div className="h-[80dvh] p-4 border border-input rounded overflow-y-auto">
                  {item.isMarkdown ? (
                    <div className='prose prose-sm dark:prose-invert'>
                      <MarkdownRenderer markdownString={item.text} />
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">{item.text}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
