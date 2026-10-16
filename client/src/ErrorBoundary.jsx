import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          background: '#0B0F17',
          color: '#F9FAFB',
          fontFamily: 'Fira Code, monospace',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h2 style={{ color: '#F87171', marginBottom: '16px' }}>⚠️ React Rendering Error Detected</h2>
          <pre style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '20px',
            borderRadius: '8px',
            color: '#FCA5A5',
            maxWidth: '800px',
            whiteSpace: 'pre-wrap'
          }}>
            {this.state.error && this.state.error.toString()}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
