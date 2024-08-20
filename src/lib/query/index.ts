import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const queryErrorHandler = (error: unknown) => {
  if (error instanceof Error) {
    toast.error(error.message);
  }

  return;
};

export const createQueryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.errorMessage) {
        queryErrorHandler(query.meta?.errorMessage);
      }

      queryErrorHandler(error);
    },
  }),

  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.options.onError) {
        queryErrorHandler(mutation.options.onError);
      }

      queryErrorHandler(error);
    },
  }),
});
