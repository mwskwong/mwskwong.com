'use client';

import { Component, type PropsWithChildren, type ReactNode } from 'react';

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

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- misleading, state.error is mutated by getDerivedStateFromError
    if (this.state.error) return this.props.fallback;
    return this.props.children;
  }
}
