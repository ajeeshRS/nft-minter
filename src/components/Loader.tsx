import { LoaderCircle } from "lucide-react";

export default function Loader({ mx }: { mx?: string }) {
  return (
    <LoaderCircle className={`h-5 w-5 ${mx} origin-center  animate-spin repeat-infinite`} />
  );
}
