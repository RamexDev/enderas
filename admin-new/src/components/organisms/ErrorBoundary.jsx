import { Component } from 'react'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
          <h1 className="font-heading text-2xl font-semibold text-primary-900 dark:text-white">
            Something went wrong
          </h1>
          <p className="mt-3 max-w-md text-sm text-primary-700 dark:text-primary-200">
            We encountered an unexpected error. Please refresh the page or return home.
          </p>
          <div className="mt-6 flex gap-3">
            <Button variant="primary" onClick={() => window.location.reload()}>
              Refresh
            </Button>
            <Button to="/" variant="outline">
              Go home
            </Button>
          </div>
        </Container>
      )
    }

    return this.props.children
  }
}
