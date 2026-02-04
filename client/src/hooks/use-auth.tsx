import { ReactNode, createContext, useContext, useState, useEffect, useCallback } from "react";
import { mockStore, User } from "@/lib/mock-store";
import { useToast } from "@/hooks/use-toast";

type LoginData = {
  username: string;
  password: string;
};

type RegisterData = {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

type MutationResult<TData, TError, TVariables> = {
  mutate: (variables: TVariables) => void;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  isPending: boolean;
  isError: boolean;
  error: TError | null;
  data: TData | null;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: MutationResult<User, Error, LoginData>;
  adminLoginMutation: MutationResult<User, Error, LoginData>;
  logoutMutation: MutationResult<void, Error, void>;
  registerMutation: MutationResult<User, Error, RegisterData>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

// Helper to create a mutation-like object
function useMockMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
  }
): MutationResult<TData, Error, TVariables> {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TData | null>(null);

  const mutateAsync = useCallback(async (variables: TVariables): Promise<TData> => {
    setIsPending(true);
    setIsError(false);
    setError(null);

    try {
      // Small delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 300));
      const result = await mutationFn(variables);
      setData(result);
      options?.onSuccess?.(result);
      return result;
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      setIsError(true);
      setError(err);
      options?.onError?.(err);
      throw err;
    } finally {
      setIsPending(false);
    }
  }, [mutationFn, options]);

  const mutate = useCallback((variables: TVariables) => {
    mutateAsync(variables).catch(() => {});
  }, [mutateAsync]);

  return { mutate, mutateAsync, isPending, isError, error, data };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(mockStore.getCurrentUser());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Subscribe to store changes
  useEffect(() => {
    const unsubscribe = mockStore.subscribe(() => {
      setUser(mockStore.getCurrentUser());
    });
    // Initial load complete
    setIsLoading(false);
    return unsubscribe;
  }, []);

  const loginMutation = useMockMutation<User, LoginData>(
    async (credentials) => {
      const loggedInUser = mockStore.login(credentials.username, credentials.password, false);
      if (!loggedInUser) {
        throw new Error('Invalid username or password');
      }
      return loggedInUser;
    },
    {
      onSuccess: (user) => {
        toast({
          title: "Welcome back!",
          description: `Logged in as ${user.firstName || user.username}`,
        });
      },
      onError: (error) => {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
      },
    }
  );

  const adminLoginMutation = useMockMutation<User, LoginData>(
    async (credentials) => {
      const loggedInUser = mockStore.login(credentials.username, credentials.password, true);
      if (!loggedInUser) {
        throw new Error('Invalid username or password');
      }
      return loggedInUser;
    },
    {
      onSuccess: (user) => {
        toast({
          title: "Welcome, Admin!",
          description: `Logged in as ${user.firstName || user.username}`,
        });
      },
      onError: (error) => {
        toast({
          title: "Admin login failed",
          description: error.message,
          variant: "destructive",
        });
      },
    }
  );

  const registerMutation = useMockMutation<User, RegisterData>(
    async (newUser) => {
      return mockStore.register(newUser);
    },
    {
      onSuccess: () => {
        toast({
          title: "Account created!",
          description: "Welcome to Univaciti",
        });
      },
      onError: (error) => {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
      },
    }
  );

  const logoutMutation = useMockMutation<void, void>(
    async () => {
      mockStore.logout();
    },
    {
      onSuccess: () => {
        toast({
          title: "Logged out",
          description: "See you next time!",
        });
      },
      onError: (error) => {
        toast({
          title: "Logout failed",
          description: error.message,
          variant: "destructive",
        });
      },
    }
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        loginMutation,
        adminLoginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
