import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Operators from './pages/Archives/Operators';
import Stations from './pages/Archives/Stations';
import Piles from './pages/Archives/Piles';
import Policies from './pages/Charging/Policies';
import Anomalies from './pages/Charging/Anomalies';
import Statistics from './pages/Charging/Statistics';
import Monitor from './pages/Equipment/Monitor';
import Alarms from './pages/Equipment/Alarms';
import WorkOrders from './pages/Equipment/WorkOrders';
import ComplaintList from './pages/Complaints/List';
import Credit from './pages/Complaints/Credit';
import SafetyMonitor from './pages/Safety/Monitor';
import Emergency from './pages/Safety/Emergency';
import Settings from './pages/Settings';
import './styles/global.css';

const App = () => {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="archives">
              <Route path="operators" element={<Operators />} />
              <Route path="stations" element={<Stations />} />
              <Route path="piles" element={<Piles />} />
            </Route>
            <Route path="charging">
              <Route path="policies" element={<Policies />} />
              <Route path="anomalies" element={<Anomalies />} />
              <Route path="statistics" element={<Statistics />} />
            </Route>
            <Route path="equipment">
              <Route path="monitor" element={<Monitor />} />
              <Route path="alarms" element={<Alarms />} />
              <Route path="workorders" element={<WorkOrders />} />
            </Route>
            <Route path="complaints">
              <Route path="list" element={<ComplaintList />} />
              <Route path="credit" element={<Credit />} />
            </Route>
            <Route path="safety">
              <Route path="monitor" element={<SafetyMonitor />} />
              <Route path="emergency" element={<Emergency />} />
            </Route>
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
