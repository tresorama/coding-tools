// import { IS_PRODUCTION } from "@/constants/frontend";

const SHOW_IT = true;
// const SHOW_IT = false;

export const DebugReactHookForm = ({
  watch,
  forceShow = false,
  printInConsole = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: any;
  forceShow?: boolean;
  printInConsole?: boolean;
}) => {

  // if (IS_PRODUCTION) return null;
  if (!SHOW_IT && !forceShow) return null;
  if (printInConsole) {
    console.log({ watch: watch() });
  }

  return (
    <pre
      style={{
        whiteSpace: 'pre',
        maxWidth: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        fontSize: '0.7rem',
      }}
    >
      {JSON.stringify(watch(), null, 2)}
    </pre>
  );
};