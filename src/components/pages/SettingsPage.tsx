import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

export const SettingsPage = () => {
  const { user } = useAuth();
  const [settings] = useState({
    theme: 'dark',
    notifications: true,
    autoScroll: true,
    fontSize: 'medium'
  });

  return (
    <div className="page-container">
      <div className="page-content">
        <section className="settings-section">
          <h1>Settings</h1>

          <div className="settings-card">
            <h2>Appearance</h2>
            <div className="settings-group">
              <div className="setting-item">
                <label>Theme</label>
                <select defaultValue={settings.theme} disabled>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>

              <div className="setting-item">
                <label>Font Size</label>
                <select defaultValue={settings.fontSize} disabled>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-card">
            <h2>Behavior</h2>
            <div className="settings-group">
              <div className="setting-item">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    disabled
                  />
                  Enable Notifications
                </label>
              </div>

              <div className="setting-item">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.autoScroll}
                    disabled
                  />
                  Auto-scroll to New Messages
                </label>
              </div>
            </div>
          </div>

          <div className="settings-card">
            <h2>Account</h2>
            <div className="settings-group">
              <div className="setting-item">
                <label>Email</label>
                <input type="text" value={user?.email || ''} disabled />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}; 