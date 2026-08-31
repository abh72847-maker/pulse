import React, { useState } from 'react';
import AppShell from './components/AppShell';
import DashboardScreen from './components/DashboardScreen';
import AddCommitmentScreen from './components/AddCommitmentScreen';
import WhatIfSimulatorScreen from './components/WhatIfSimulatorScreen';
import AIScheduleRepairScreen from './components/AIScheduleRepairScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isTaskAdded, setIsTaskAdded] = useState(false);
  const [isWeekRepaired, setIsWeekRepaired] = useState(false);

  // Global Demo Reset Callback
  const handleResetDemo = () => {
    setIsTaskAdded(false);
    setIsWeekRepaired(false);
    setActiveTab('dashboard');
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleTaskAdded = () => {
    setIsTaskAdded(true);
    setActiveTab('dashboard');
  };

  const handleExploreRisk = () => {
    setActiveTab('what-if');
  };

  const handleFixMyWeek = () => {
    setActiveTab('repair');
  };

  const handleReturnToDashboard = () => {
    setIsWeekRepaired(true);
    setActiveTab('dashboard');
  };

  const getSystemStatus = () => {
    if (isWeekRepaired) return 'Week Repaired (84% Safe)';
    if (isTaskAdded) return 'Commitment Active';
    return 'Demo Mode Active';
  };

  const getOverallRisk = () => {
    if (isWeekRepaired) return 'low';
    return 'high';
  };

  return (
    <AppShell
      activeTab={activeTab === 'repair' ? 'what-if' : activeTab}
      onTabChange={handleTabChange}
      systemStatus={getSystemStatus()}
      overallRisk={getOverallRisk()}
      onResetDemo={handleResetDemo}
    >
      {activeTab === 'dashboard' && (
        <DashboardScreen
          isTaskAdded={isTaskAdded}
          isWeekRepaired={isWeekRepaired}
          onNavigateToAddCommitment={() => setActiveTab('add-commitment')}
          onExploreRisk={handleExploreRisk}
          onFixMyWeek={handleFixMyWeek}
        />
      )}

      {activeTab === 'add-commitment' && (
        <AddCommitmentScreen
          onBack={() => setActiveTab('dashboard')}
          onTaskAdded={handleTaskAdded}
        />
      )}

      {activeTab === 'what-if' && (
        <WhatIfSimulatorScreen
          onBack={() => setActiveTab('dashboard')}
          onNavigateToScheduleRepair={() => setActiveTab('repair')}
        />
      )}

      {activeTab === 'repair' && (
        <AIScheduleRepairScreen
          onBack={() => setActiveTab('what-if')}
          onReturnToDashboard={handleReturnToDashboard}
        />
      )}
    </AppShell>
  );
}
