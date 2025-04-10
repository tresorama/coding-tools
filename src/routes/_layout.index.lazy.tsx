import { useRef, useState } from 'react';
import { createLazyFileRoute, Link, type LinkProps } from '@tanstack/react-router';
import {
  TerminalIcon,
  WrenchIcon,
  SearchIcon,
  SettingsIcon,
  XCircleIcon,
  // DatabaseIcon,
  // GitBranchIcon,
  // ClockIcon,
  // CodeIcon,
} from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/ui/alert';
import { Input } from '@/components/shadcn/ui/input';
import { Badge } from '@/components/mine/ui/badge';
import { Button } from '@/components/shadcn/ui/button';

export const Route = createLazyFileRoute('/_layout/')({
  component: RouteComponent,
});

type Tool = {
  id: number;
  to: LinkProps['to'];
  name: string;
  category: string;
  icon: JSX.Element;
  description: string;
  usefulFor: string[],
};
const tools: Tool[] = [
  // { id: 1, name: 'JSON Formatter', icon: <CodeIcon className="h-6 w-6" />, description: 'Easily format and validate your JSON', category: 'Formatting' },
  // { id: 2, name: 'SQL Analyzer', icon: <DatabaseIcon className="h-6 w-6" />, description: 'Analyze and optimize your SQL queries', category: 'Database' },
  // { id: 3, name: 'Git Commands', icon: <GitBranchIcon className="h-6 w-6" />, description: 'Quick guide to the most useful Git commands', category: 'Version Control' },
  // { id: 4, name: 'Regex Tester', icon: <SearchIcon className="h-6 w-6" />, description: 'Test your regular expressions in real time', category: 'Development' },
  // { id: 5, name: 'Cron Builder', icon: <ClockIcon className="h-6 w-6" />, description: 'Easily create and verify cron expressions', category: 'Utilities' },
  // { id: 6, name: 'HTTP Status Codes', icon: <TerminalIcon className="h-6 w-6" />, description: 'Complete list of HTTP status codes', category: 'Web' },
  { id: 7, to: "/compare-texts", name: "Compare Multiple Texts", category: 'Text', icon: <SettingsIcon className="h-6 w-6" />, description: 'Compare multiple texts horizontally, giving a single JSON input and definig where each text is inside the JSON (with a path in lodash.get format).', usefulFor: ['Compare LLM responses'] },
];
const toolsCategories = [...new Set(tools.map(tool => tool.category))];



const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredTools = searchQuery.trim() === ''
    ? tools
    : tools.filter(tool =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  return { searchQuery, setSearchQuery, filteredTools };
};

function RouteComponent() {
  const { searchQuery, setSearchQuery, filteredTools } = useSearch();
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-full flex flex-col">

      {/* Header */}
      <header className="bg-white dark:bg-neutral-900/70 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <WrenchIcon className="h-8 w-8 text-neutral-600 dark:text-neutral-400" />
              <h1 className="ml-3 text-2xl font-bold text-neutral-900 dark:text-white">CodeTools</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700">
                <SettingsIcon className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
              </button>
            </div>
          </div>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">Useful tools for Developers</p>
        </div>
      </header>

      {/* Welcome Alert */}
      <div className='mt-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Alert className="bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
          <TerminalIcon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
          <AlertTitle className="text-neutral-800 dark:text-neutral-300">Welcome to CodeTools!</AlertTitle>
          <AlertDescription className="text-neutral-700 dark:text-neutral-400">
            Discover our collection of tools to improve your development workflow.
          </AlertDescription>
        </Alert>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-neutral-400" />
            </div>
            <Input
              ref={searchInputRef}
              type="text"
              className="w-full px-10"
              placeholder="Cerca strumenti..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery.trim() !== '' && (
              <Button
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                variant="ghost"
                className="absolute inset-y-1 right-1 h-auto p-2"
              >
                <XCircleIcon className="h-5 w-5 text-neutral-400" />
              </Button>
            )}
          </div>
        </div>


        {/* Tools Grid */}
        <div className="space-y-8">
          {searchQuery.trim() === '' ? (
            // Show categories when not searching
            toolsCategories.map((category) => (
              <div key={category} className="space-y-4">
                <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tools
                    .filter(tool => tool.category === category)
                    .map(tool => <ToolCard key={tool.id} tool={tool} />)
                  }
                </div>
              </div>
            ))
          ) : (
            // Show filtered results when searching
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                Search results for "{searchQuery}"
              </h2>
              {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
                </div>
              ) : (
                <p className="text-neutral-600 dark:text-neutral-400">No tools found. Try with another search term.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-neutral-900/60 border-t border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-neutral-500 dark:text-neutral-400 text-sm">
            CodeTools © {new Date().getFullYear()} - A collection of essential tools for developers
          </p>
        </div>
      </footer>
    </div>
  );
}


const ToolCard = ({ tool }: { tool: Tool; }) => {
  return (
    <div className="relative bg-white dark:bg-neutral-900/60 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-neutral-200 dark:border-neutral-700 cursor-pointer">
      <div className="flex items-center">
        <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-md">
          {tool.icon}
        </div>
        <h3 className="ml-3 text-lg font-medium text-neutral-900 dark:text-white">{tool.name}</h3>
      </div>
      <p className="mt-6 text-sm/relaxed text-neutral-600 dark:text-neutral-300">{tool.description}</p>
      {/* <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-700 rounded">
        {tool.category}
      </span> */}
      <div className='mt-6'>
        <span className='text-[0.6rem] uppercase text-muted-foreground'>Useful for: </span>
        <div className='mt-1 w-full flex gap-2 overflow-x-auto'>
          {tool.usefulFor.map((usefulFor, index) => (
            <Badge key={index}>{usefulFor}</Badge>
          ))}
        </div>
      </div>
      <Link to={tool.to} className='absolute inset-0 opacity-0'>
        Vai
      </Link>
    </div>
  );
};