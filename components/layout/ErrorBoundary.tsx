"use client";

import { Component, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface Props {
  children: ReactNode;
  /** When this changes (e.g. the route), a shown error is cleared */
  resetKey?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidUpdate(prevProps: Props) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, error: undefined });
    }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center bg-[#F9F6F0] text-primary p-8">
          <div className="text-center max-w-md">
            <p className="font-serif text-2xl mb-2">Something went wrong</p>
            <p className="text-sm text-primary/70 mb-6">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <button suppressHydrationWarning
              onClick={() => this.setState({ hasError: false })}
              className="bg-primary text-white px-6 py-3 text-xs uppercase tracking-widest font-bold"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Clears the error screen when the user navigates to another page
export function RouteErrorBoundary({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <ErrorBoundary resetKey={pathname}>{children}</ErrorBoundary>;
}
