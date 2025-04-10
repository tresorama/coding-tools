import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { AutocompleteGeneric } from ".";


export const Demo = () => {

  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string; } | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const searchResults = useQuery({
    queryKey: ["json-posts", debouncedSearchTerm],
    queryFn: async () => {
      // search on json placeholder
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
      const json = await res.json() as { title: string; }[];
      const foundItems = json.filter((item) => item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
      return foundItems;
    },
    enabled: debouncedSearchTerm.length > 2,
    retry: false,
  });

  return (
    <AutocompleteGeneric
      inputValue={searchTerm}
      setInputValue={setSearchTerm}
      isLoading={searchResults.isLoading}
      isError={searchResults.isError}
      options={searchResults.data?.map(item => ({ label: item.title, value: item.title })) ?? []}
      onSelectOption={(option) => setSelectedOption(option)}
      inputPlaceholder="Dove vorresti andare?"
      optionsHeading="Città"
      SelectedItem={!selectedOption ? null : <span>{selectedOption.label}</span>}
      getOptionIsSelected={(option) => (!selectedOption ? false : option.value === selectedOption.value)}
    />
  );
};