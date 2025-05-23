import React from "react";

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; },
  { hasError: boolean; error: Error | null; }
> {
  // @ts-expect-error: props cannot be any
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  // @ts-expect-error: error cannot be any
  // eslint-disable-next-line
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, error });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <h2>{this.state.error?.message}</h2>
        </div>
      );
    }

    return this.props.children;
  }
}