"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, LoaderIcon } from "lucide-react";

import { cn } from "@/lib/shadcn/utils";
import { Button } from "@/components/shadcn/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { Alert } from "@/components/shadcn/ui/alert";


export function AutocompleteGeneric({
  inputValue,
  setInputValue,
  isLoading,
  isError,
  options,
  onSelectOption,

  inputPlaceholder,
  optionsHeading,
  SelectedItem,
  getOptionIsSelected,
}: {
  // Functional Props

  /** State of the input of the search term. You must keep this state */
  inputValue: string,
  /** Set the state of the input of the search term. You must keep this state */
  setInputValue: (inputValue: string) => void,

  /** Whether the request to fetch options is loading */
  isLoading: boolean,
  /** Whether the request to fetch options has failed */
  isError: boolean,
  /** Items showed in the dropdown that user can select */
  options: { label: string, value: string; }[],
  /** event handler when user select an option */
  onSelectOption: (option: { label: string, value: string; }) => void,

  // UI Props

  /** Placeholder of the input of the search term */
  inputPlaceholder?: string,
  /** Text showed in the heading of the dropdown before options */
  optionsHeading?: React.ReactNode,
  /** component to show when an option is selected  instead of the input */
  SelectedItem?: React.ReactNode,
  /** Whether an option is the selected one, used internally to show differnt UI based on the selection */
  getOptionIsSelected: (option: { label: string, value: string; }) => boolean;
}) {

  // local state - popopver
  const [isOpen, setIsOpen] = useState(false);


  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>

      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-full justify-between pr-[0.5rem]"
        >
          {SelectedItem ?? <span></span>}
          <ChevronsUpDown className="size-[1em]" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command
          // with shouldFilter false we use the input to produce the searchTerm
          // instaed of filtering over the command items
          shouldFilter={false}
        >

          <CommandInput
            placeholder={inputPlaceholder}
            value={inputValue}
            onValueChange={newValue => setInputValue(newValue)}
            className="border-0 focus:ring-0"
          />

          <CommandList
            className="h-[20rem] max-h-[30dvh]"
          >
            {isLoading ? (
              <span className="p-4 flex justify-center text-xs text-muted-foreground">
                <LoaderIcon className="animate-spin size-[1em]" />
                <span className="sr-only">Caricamento in corso</span>
              </span>
            ) : isError ? (
              <Alert variant="destructive">
                <p>Errore durante la ricerca</p>
              </Alert>
            ) : options.length === 0 ? (
              <CommandEmpty>
                <p className="text-muted-foreground">
                  {/* {searchTerm.length > 2 ? "Nessun risultato" : "Inizia a digitare per cercare"}. */}
                  Nessun risultato
                </p>
              </CommandEmpty>
            ) : (
              <CommandGroup heading={optionsHeading}>
                {options.map(option => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      onSelectOption(option);
                      setIsOpen(false);
                    }}
                    className={cn(
                      getOptionIsSelected(option) && "bg-white/5 font-bold"
                    )}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        getOptionIsSelected(option) ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
