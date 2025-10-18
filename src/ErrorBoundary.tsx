import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 p-4 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full max-h-screen overflow-y-auto">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              ⚠️ Application Error
            </h1>

            <div className="mb-4">
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Reload Page
              </button>
            </div>

            {this.state.error && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Error Message:
                </h2>
                <div className="bg-red-100 border border-red-300 rounded p-3 text-red-800 font-mono text-sm break-words">
                  {this.state.error.toString()}
                </div>
              </div>
            )}

            {this.state.error?.stack && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Stack Trace:
                </h2>
                <div className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto">
                  <pre className="text-xs font-mono text-gray-800 whitespace-pre-wrap break-words">
                    {this.state.error.stack}
                  </pre>
                </div>
              </div>
            )}

            {this.state.errorInfo?.componentStack && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Component Stack:
                </h2>
                <div className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto">
                  <pre className="text-xs font-mono text-gray-800 whitespace-pre-wrap break-words">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </div>
            )}

            <div className="text-sm text-gray-600 mt-4">
              <p>
                This error was caught by the application's error boundary.
                Please check the error details above to diagnose the issue.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
