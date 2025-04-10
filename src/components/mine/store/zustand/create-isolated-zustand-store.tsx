import { createContext, useContext, useRef } from 'react';
import { type StoreApi, useStore } from 'zustand';


export const createIsolatedZustandStore = <
  TheStore,
>({
  createTheStoreVanilla
}: {
  createTheStoreVanilla: (initialProps: Partial<TheStore>) => StoreApi<TheStore>;
}) => {

  // create a react context
  const ctx = createContext<StoreApi<TheStore> | null>(null);


  // create a context provider
  const TheStoreProvider = ({
    children,
    initialProps = {},
  }: {
    children: React.ReactNode;
    initialProps?: Partial<TheStore>,
  }) => {

    // initialize the store (vanilla store)
    const storeVanillaRef = useRef<StoreApi<TheStore>>();
    if (!storeVanillaRef.current) {
      storeVanillaRef.current = createTheStoreVanilla(initialProps);
    }

    return (
      <ctx.Provider value={storeVanillaRef.current}>
        {children}
      </ctx.Provider>
    );
  };

  // create a hook to access the context
  const useTheStore = <T,>(selector: (state: TheStore) => T): T => {
    const storeVanilla = useContext(ctx);
    if (!storeVanilla) throw new Error('Missing <StoreProvider> in the tree');
    return useStore(storeVanilla, selector);
  };


  return {
    TheStoreProvider,
    useTheStore,
  };

};