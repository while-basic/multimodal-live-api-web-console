import { useAuth } from '../../contexts/AuthContext';

export const DocumentationPage = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="page-content">
        <section className="docs-section">
          <h1>Documentation</h1>
          
          <div className="docs-card">
            <h2>Getting Started</h2>
            <p>Learn how to use the Celaya Live API Console effectively.</p>
            <ul>
              <li>Quick Start Guide</li>
              <li>Basic Concepts</li>
              <li>Authentication</li>
            </ul>
          </div>

          <div className="docs-card">
            <h2>API Reference</h2>
            <p>Detailed information about available API endpoints and features.</p>
            <ul>
              <li>Endpoints</li>
              <li>Request/Response Format</li>
              <li>Error Handling</li>
            </ul>
          </div>

          <div className="docs-card">
            <h2>Examples</h2>
            <p>Sample code and use cases to help you get started quickly.</p>
            <ul>
              <li>Basic Integration</li>
              <li>Advanced Usage</li>
              <li>Best Practices</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}; 