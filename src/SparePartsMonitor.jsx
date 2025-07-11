import React, { useState, useEffect } from 'react';
import {
  Bell, Settings, AlertTriangle, CheckCircle, Clock, BarChart3, Wrench,
  LayoutDashboard, Package, Users, MessageCircle, HelpCircle, TrendingUp,
  Activity, Zap, Shield, Target, Gauge, Thermometer, Volume2, Vibrate
} from 'lucide-react';

const pieData = [
  { name: 'Critical', value: 1 },
  { name: 'Warning', value: 1 },
  { name: 'Good', value: 1 },
];

const COLORS = ['#ef4444', '#facc15', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

const SparePartsMonitor = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSpare, setSelectedSpare] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const [machines] = useState([
    {
      id: 1,
      name: 'CNC Mill #1',
      location: 'Workshop A',
      spares: [
        {
          id: 1, name: 'Ball Screw X-Axis', type: 'Ball Screw', currentHours: 4200, thresholdHours: 5000,
          status: 'warning', temperature: 70, soundLevel: 80, vibration: 4.2, efficiency: 84
        },
        {
          id: 2, name: 'LM Guideway Y-Axis', type: 'LM Guideway', currentCycles: 850000, thresholdCycles: 1000000,
          status: 'good', temperature: 60, soundLevel: 65, vibration: 2.5, efficiency: 85
        },
        {
          id: 3, name: 'Tool Magazine', type: 'Tool Magazine', currentCycles: 45000, thresholdCycles: 50000,
          status: 'critical', temperature: 90, soundLevel: 95, vibration: 6.0, efficiency: 90
        }
      ]
    }
  ]);

  const kpiCardBackgrounds = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'good': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'critical': return <AlertTriangle className="w-5 h-5" />;
      case 'warning': return <Clock className="w-5 h-5" />;
      case 'good': return <CheckCircle className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return 'text-green-400';
    if (efficiency >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const calculateUsagePercentage = (current, threshold) => Math.min((current / threshold) * 100, 100);

  const handleCardClick = (spare) => {
    setSelectedSpare(spare);
    setModalOpen(true);
  };

  const DashboardView = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="loading-spinner"></div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="stat-card">
            <div className="stat-icon bg-blue-500/20">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="stat-value">3</h3>
              <p className="stat-label">Active Spares</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon bg-green-500/20">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="stat-value">1</h3>
              <p className="stat-label">Good Status</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon bg-yellow-500/20">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="stat-value">1</h3>
              <p className="stat-label">Warning</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon bg-red-500/20">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="stat-value">1</h3>
              <p className="stat-label">Critical</p>
            </div>
          </div>
        </div>

        {/* Main Cards Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {machines[0].spares.map((spare, index) => (
            <div
              key={spare.id}
              className="enhanced-kpi-card cursor-pointer group"
              onClick={() => handleCardClick(spare)}
              style={{ background: kpiCardBackgrounds[index % kpiCardBackgrounds.length] }}
            >
              <div className="card-glow"></div>
              <div className="card-content">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{spare.name}</h3>
                    <p className="text-sm text-white/80 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      {spare.type}
                    </p>
                  </div>
                  <div className={`status-badge ${getStatusColor(spare.status)}`}>
                    {getStatusIcon(spare.status)}
                    <span className="text-xs font-semibold">{spare.status.toUpperCase()}</span>
                  </div>
                </div>

                {/* Efficiency Indicator */}
                <div className="efficiency-indicator mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white/90">Efficiency</span>
                    <span className={`text-sm font-bold ${getEfficiencyColor(spare.efficiency)}`}>
                      {spare.efficiency}%
                    </span>
                  </div>
                  <div className="efficiency-bar">
                    <div
                      className="efficiency-fill"
                      style={{ width: `${spare.efficiency}%` }}
                    ></div>
                  </div>
                </div>

                {/* Usage Progress */}
                {spare.currentHours && (
                  <div className="usage-section mb-4">
                    <div className="flex justify-between text-sm text-white/90 mb-2">
                      <span>Hours Used</span>
                      <span>{spare.currentHours} / {spare.thresholdHours}</span>
                    </div>
                    <div className="progress-enhanced">
                      <div
                        className="progress-fill"
                        style={{ width: `${calculateUsagePercentage(spare.currentHours, spare.thresholdHours)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {spare.currentCycles && (
                  <div className="usage-section mb-4">
                    <div className="flex justify-between text-sm text-white/90 mb-2">
                      <span>Cycles</span>
                      <span>{spare.currentCycles.toLocaleString()} / {spare.thresholdCycles.toLocaleString()}</span>
                    </div>
                    <div className="progress-enhanced">
                      <div
                        className="progress-fill"
                        style={{ width: `${calculateUsagePercentage(spare.currentCycles, spare.thresholdCycles)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Metrics Grid */}
                <div className="metrics-grid">
                  <div className="metric-item">
                    <Thermometer className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-white/90">{spare.temperature}°C</span>
                  </div>
                  <div className="metric-item">
                    <Volume2 className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-white/90">{spare.soundLevel} dB</span>
                  </div>
                  <div className="metric-item">
                    <Vibrate className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-white/90">{spare.vibration} mm/s</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Chart Placeholders with Enhanced Design */}
          <div className="chart-card col-span-1 md:col-span-2">
            <div className="chart-header">
              <h3 className="chart-title">Usage Overview</h3>
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div className="chart-placeholder">
              <div className="chart-animation"></div>
              <p className="chart-text">Interactive charts coming soon!</p>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Status Distribution</h3>
              <BarChart3 className="w-5 h-5 text-green-400" />
            </div>
            <div className="chart-placeholder">
              <div className="chart-animation"></div>
              <p className="chart-text">Analytics dashboard</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-slate-400">Monitor your spare parts performance</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="action-button secondary">
              <Settings className="w-4 h-4" />
              Filter
            </button>
            <button className="action-button primary">
              <Zap className="w-4 h-4" />
              Export
            </button>
            <div className="avatar">
              <div className="avatar-ring"></div>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && <DashboardView />}

        {/* Enhanced Modal */}
        {modalOpen && selectedSpare && (
          <div className="modal-overlay" onClick={() => setModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">{selectedSpare.name}</h2>
                <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="modal-stats">
                  <div className="modal-stat">
                    <Target className="w-5 h-5 text-blue-400" />
                    <div>
                      <span className="stat-number">{selectedSpare.efficiency}%</span>
                      <span className="stat-label">Efficiency</span>
                    </div>
                  </div>
                  <div className="modal-stat">
                    <Thermometer className="w-5 h-5 text-red-400" />
                    <div>
                      <span className="stat-number">{selectedSpare.temperature}°C</span>
                      <span className="stat-label">Temperature</span>
                    </div>
                  </div>
                  <div className="modal-stat">
                    <Volume2 className="w-5 h-5 text-green-400" />
                    <div>
                      <span className="stat-number">{selectedSpare.soundLevel} dB</span>
                      <span className="stat-label">Sound Level</span>
                    </div>
                  </div>
                </div>
                <p className="modal-description">
                  Detailed analysis and maintenance recommendations for {selectedSpare.name}.
                </p>
              </div>
              <div className="modal-footer">
                <button className="modal-button secondary" onClick={() => setModalOpen(false)}>
                  Close
                </button>
                <button className="modal-button primary">
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Sidebar - Now on the right */}
      <aside className="w-64 bg-slate-800/50 backdrop-blur-xl border-l border-slate-700/50 p-6 space-y-6">
        <div className="flex items-center gap-3 text-xl font-bold text-white">
          <div className="logo-container">
            <Wrench className="w-7 h-7 text-blue-400" />
          </div>
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            SmartMonitor
          </span>
        </div>

        <nav className="space-y-2">
          {[{ label: 'Dashboard', icon: LayoutDashboard, key: 'dashboard' }].map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`nav-button ${activeTab === item.key ? 'nav-active' : ''}`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <button className="help-button">
            <HelpCircle className="w-4 h-4" />
            <span>Help Center</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default SparePartsMonitor;