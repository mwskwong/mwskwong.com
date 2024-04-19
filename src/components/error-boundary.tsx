'use client';

import {
  Component,
  type ErrorInfo,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

export interface ErrorBoundaryProps extends PropsWithChildren {
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { error: undefined };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error & { digest?: string }, errorInfo: ErrorInfo) {
    // console.log({ error, errorInfo });
    // console.error(error, errorInfo);
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // logErrorToMyService(error, info.componentStack);
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- misleading, state.error is mutated by getDerivedStateFromError
    if (this.state.error) return this.props.fallback;
    return this.props.children;
  }
}
