import * as React from "react";

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error): void {
        console.error('Error caught by boundary:', error);
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return (
                <stackLayout backgroundColor="#fee2e2" padding={16} margin={16} borderRadius={8}>
                    <label
                        text="Something went wrong!"
                        color="#dc2626"
                        fontSize={20}
                        fontWeight="bold"
                        textAlignment="center"
                    />
                    <label
                        text={this.state.error?.message || 'Unknown error'}
                        color="#991b1b"
                        fontSize={16}
                        textAlignment="center"
                        marginTop={8}
                    />
                </stackLayout>
            );
        }

        return this.props.children;
    }
}