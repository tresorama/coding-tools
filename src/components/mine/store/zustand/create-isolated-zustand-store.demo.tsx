import { createStore } from "zustand";
import { createIsolatedZustandStore } from "./create-isolated-zustand-store";
import { Button } from "@/components/shadcn/ui/button";

// define zustand store

type State = {
  count: number;
};
type Action = {
  increaseCount: () => void,
  decreaseCount: () => void;
  resetCount: () => void;
};
type Store = State & Action;

const { TheStoreProvider, useTheStore } = createIsolatedZustandStore<Store>({
  createTheStoreVanilla: (initialProps) => {

    const vanillaStore = createStore<Store>()((set) => ({
      // default props
      count: 0,
      increaseCount: () => set(prev => ({ count: prev.count + 1 })),
      decreaseCount: () => set(prev => ({ count: prev.count - 1 })),
      resetCount: () => set({ count: 0 }),
      // initial props coming from initializer
      ...initialProps
    }));

    return vanillaStore;
  }
});

export const Demo = () => {
  return (
    <>
      <TheStoreProvider>
        <Counter />
      </TheStoreProvider>
      <TheStoreProvider>
        <Counter />
      </TheStoreProvider>
      <TheStoreProvider>
        <Counter />
      </TheStoreProvider>
    </>
  );
};


const Counter = () => {
  const count = useTheStore((s) => s.count);
  const increaseCount = useTheStore((s) => s.increaseCount);
  const decreaseCount = useTheStore((s) => s.decreaseCount);
  const resetCount = useTheStore((s) => s.resetCount);

  return (
    <div className="flex gap-2 items-center">
      <span className="inline-block min-w-10 font-light text-3xl/[1]">
        {count}
      </span>
      <Button onClick={increaseCount}>+</Button>
      <Button onClick={decreaseCount}>-</Button>
      <Button onClick={resetCount}>Reset</Button>
    </div>
  );
};