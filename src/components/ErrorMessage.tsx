import { AlertCircle } from 'lucide-react';

type ErrorProps = {
  error: string;
};

export const ErrorMessage = ({ error }: ErrorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-center">
      <AlertCircle className="text-red-500" size={18} />
      <p className="text-red-600">{error}</p>
    </div>
  );
};
