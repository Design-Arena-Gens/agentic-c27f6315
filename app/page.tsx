'use client'

import { useState, useEffect } from 'react'
import {
  Building2, Users, Calendar, TrendingUp, AlertTriangle,
  CheckCircle2, Clock, DollarSign, Truck, HardHat,
  FileText, MapPin, Activity, Zap, Settings, Bell,
  BarChart3, Home, FolderKanban, Menu, X, ChevronRight,
  Wrench, Package, ClipboardCheck, MessageSquare
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [notifications, setNotifications] = useState(5)

  const projects = [
    {
      id: 1,
      name: 'Downtown Office Complex',
      progress: 68,
      status: 'on-track',
      budget: 2400000,
      spent: 1632000,
      deadline: '2025-08-15',
      manager: 'Sarah Johnson',
      location: 'Chicago, IL',
      workers: 45,
      phase: 'Construction'
    },
    {
      id: 2,
      name: 'Riverside Apartments',
      progress: 42,
      status: 'delayed',
      budget: 1800000,
      spent: 918000,
      deadline: '2025-06-30',
      manager: 'Mike Chen',
      location: 'Austin, TX',
      workers: 32,
      phase: 'Foundation'
    },
    {
      id: 3,
      name: 'Highway Bridge Renovation',
      progress: 89,
      status: 'ahead',
      budget: 3200000,
      spent: 2688000,
      deadline: '2025-04-20',
      manager: 'James Wilson',
      location: 'Portland, OR',
      workers: 28,
      phase: 'Finishing'
    },
    {
      id: 4,
      name: 'Retail Shopping Center',
      progress: 24,
      status: 'on-track',
      budget: 1500000,
      spent: 450000,
      deadline: '2025-12-01',
      manager: 'Emily Rodriguez',
      location: 'Denver, CO',
      workers: 38,
      phase: 'Planning'
    },
  ]

  const timelineData = [
    { month: 'Jan', revenue: 340000, expenses: 280000, profit: 60000 },
    { month: 'Feb', revenue: 420000, expenses: 310000, profit: 110000 },
    { month: 'Mar', revenue: 380000, expenses: 295000, profit: 85000 },
    { month: 'Apr', revenue: 510000, expenses: 340000, profit: 170000 },
    { month: 'May', revenue: 490000, expenses: 330000, profit: 160000 },
    { month: 'Jun', revenue: 560000, expenses: 370000, profit: 190000 },
  ]

  const projectStatusData = [
    { name: 'On Track', value: 5, color: '#10b981' },
    { name: 'Delayed', value: 2, color: '#f59e0b' },
    { name: 'At Risk', value: 1, color: '#ef4444' },
    { name: 'Ahead', value: 3, color: '#3b82f6' },
  ]

  const equipmentData = [
    { name: 'Mon', utilization: 85 },
    { name: 'Tue', utilization: 92 },
    { name: 'Wed', utilization: 78 },
    { name: 'Thu', utilization: 88 },
    { name: 'Fri', utilization: 95 },
    { name: 'Sat', utilization: 70 },
    { name: 'Sun', utilization: 45 },
  ]

  const recentActivities = [
    { id: 1, type: 'milestone', message: 'Foundation completed for Downtown Office Complex', time: '2 hours ago', icon: CheckCircle2, color: 'text-green-400' },
    { id: 2, type: 'alert', message: 'Delay reported on Riverside Apartments - Weather conditions', time: '5 hours ago', icon: AlertTriangle, color: 'text-yellow-400' },
    { id: 3, type: 'delivery', message: 'Steel beams delivered to Highway Bridge site', time: '8 hours ago', icon: Truck, color: 'text-blue-400' },
    { id: 4, type: 'inspection', message: 'Safety inspection scheduled for Retail Shopping Center', time: '1 day ago', icon: ClipboardCheck, color: 'text-purple-400' },
    { id: 5, type: 'team', message: 'New crew members assigned to Downtown Office Complex', time: '1 day ago', icon: Users, color: 'text-cyan-400' },
  ]

  const aiInsights = [
    {
      id: 1,
      priority: 'high',
      title: 'Weather Risk Alert',
      message: 'Heavy rain forecasted for Chicago area next week. Consider adjusting Downtown Office Complex schedule.',
      action: 'Review Schedule',
      icon: AlertTriangle,
      color: 'from-red-500/20 to-orange-500/20 border-red-500/30'
    },
    {
      id: 2,
      priority: 'medium',
      title: 'Budget Optimization',
      message: 'Highway Bridge project running 8% under budget. Resources can be reallocated to Riverside Apartments.',
      action: 'Optimize Budget',
      icon: DollarSign,
      color: 'from-green-500/20 to-emerald-500/20 border-green-500/30'
    },
    {
      id: 3,
      priority: 'low',
      title: 'Equipment Suggestion',
      message: 'AI recommends adding one excavator to Retail Shopping Center to meet deadline projections.',
      action: 'View Details',
      icon: Wrench,
      color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30'
    },
  ]

  const taskStats = [
    { label: 'Total Tasks', value: 342, change: '+12%', icon: FileText, color: 'from-blue-500 to-cyan-500' },
    { label: 'Completed', value: 234, change: '+8%', icon: CheckCircle2, color: 'from-green-500 to-emerald-500' },
    { label: 'In Progress', value: 87, change: '+5%', icon: Clock, color: 'from-yellow-500 to-orange-500' },
    { label: 'Overdue', value: 21, change: '-3%', icon: AlertTriangle, color: 'from-red-500 to-pink-500' },
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'on-track': return 'text-green-400'
      case 'delayed': return 'text-yellow-400'
      case 'ahead': return 'text-blue-400'
      case 'at-risk': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusBg = (status: string) => {
    switch(status) {
      case 'on-track': return 'bg-green-500/20 border-green-500/30'
      case 'delayed': return 'bg-yellow-500/20 border-yellow-500/30'
      case 'ahead': return 'bg-blue-500/20 border-blue-500/30'
      case 'at-risk': return 'bg-red-500/20 border-red-500/30'
      default: return 'bg-gray-500/20 border-gray-500/30'
    }
  }

  return (
    <div className="flex h-screen bg-[#0f0f12] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-[#1a1a1f] to-[#16161a] border-r border-gray-800/50 transition-all duration-300 flex flex-col backdrop-blur-xl`}>
        <div className="p-6 flex items-center justify-between border-b border-gray-800/50">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Building2 size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">ConstructPro</h1>
                <p className="text-xs text-gray-400">AI-Powered</p>
              </div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { id: 'overview', icon: Home, label: 'Overview' },
            { id: 'projects', icon: FolderKanban, label: 'Projects' },
            { id: 'analytics', icon: BarChart3, label: 'Analytics' },
            { id: 'team', icon: Users, label: 'Team' },
            { id: 'equipment', icon: Truck, label: 'Equipment' },
            { id: 'calendar', icon: Calendar, label: 'Calendar' },
            { id: 'documents', icon: FileText, label: 'Documents' },
            { id: 'ai-insights', icon: Zap, label: 'AI Insights' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border border-orange-500/30 shadow-lg shadow-orange-500/10'
                  : 'text-gray-400 hover:bg-gray-800/30 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
              {sidebarOpen && activeTab === item.id && <ChevronRight size={16} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800/50">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800/30 hover:text-white transition-all">
            <Settings size={20} />
            {sidebarOpen && <span className="font-medium">Settings</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <header className="h-16 bg-[#1a1a1f]/80 backdrop-blur-xl border-b border-gray-800/50 flex items-center justify-between px-6 shadow-2xl">
          <div>
            <h2 className="text-2xl font-bold">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'projects' && 'Project Management'}
              {activeTab === 'analytics' && 'Analytics & Reports'}
              {activeTab === 'team' && 'Team Management'}
              {activeTab === 'equipment' && 'Equipment Tracking'}
              {activeTab === 'calendar' && 'Project Calendar'}
              {activeTab === 'documents' && 'Document Center'}
              {activeTab === 'ai-insights' && 'AI Insights'}
            </h2>
            <p className="text-sm text-gray-400">Real-time construction management platform</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="relative p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-xs flex items-center justify-center font-bold shadow-lg shadow-red-500/50">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-800/50">
              <div className="text-right">
                <p className="text-sm font-medium">John Anderson</p>
                <p className="text-xs text-gray-400">Project Manager</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center font-bold shadow-lg shadow-orange-500/20">
                JA
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-[#0f0f12] via-[#1a1a1f] to-[#0f0f12]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Active Projects', value: '11', icon: Building2, change: '+2 this month', color: 'from-blue-500 to-cyan-500', bg: 'from-blue-500/10 to-cyan-500/10' },
                  { label: 'Total Budget', value: '$8.9M', icon: DollarSign, change: '+12% growth', color: 'from-green-500 to-emerald-500', bg: 'from-green-500/10 to-emerald-500/10' },
                  { label: 'Active Workers', value: '143', icon: HardHat, change: '98% utilization', color: 'from-orange-500 to-red-500', bg: 'from-orange-500/10 to-red-500/10' },
                  { label: 'Completion Rate', value: '87%', icon: TrendingUp, change: '+5% this week', color: 'from-purple-500 to-pink-500', bg: 'from-purple-500/10 to-pink-500/10' },
                ].map((stat, idx) => (
                  <div key={idx} className={`bg-gradient-to-br ${stat.bg} backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:scale-105 transition-transform cursor-pointer shadow-xl`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <stat.icon size={24} />
                      </div>
                      <Activity className="text-gray-600" size={16} />
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                    <p className="text-green-400 text-xs font-medium">{stat.change}</p>
                  </div>
                ))}
              </div>

              {/* AI Insights Banner */}
              <div className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">AI-Powered Insights</h3>
                    <p className="text-sm text-gray-400">Real-time recommendations for your projects</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aiInsights.map((insight) => (
                    <div key={insight.id} className={`bg-gradient-to-br ${insight.color} backdrop-blur-sm border rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer`}>
                      <div className="flex items-start gap-3 mb-3">
                        <insight.icon size={18} className="mt-1" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                          <p className="text-xs text-gray-300 leading-relaxed">{insight.message}</p>
                        </div>
                      </div>
                      <button className="text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors">
                        {insight.action} →
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-gradient-to-br from-[#1a1a1f] to-[#16161a] backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <TrendingUp size={20} className="text-green-400" />
                    Financial Performance
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2d2d35" />
                      <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1f', border: '1px solid #2d2d35', borderRadius: '8px' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
                      <Line type="monotone" dataKey="profit" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Project Status Pie */}
                <div className="bg-gradient-to-br from-[#1a1a1f] to-[#16161a] backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <BarChart3 size={20} className="text-blue-400" />
                    Project Status Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={projectStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {projectStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1f', border: '1px solid #2d2d35', borderRadius: '8px' }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Projects and Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Projects */}
                <div className="lg:col-span-2 bg-gradient-to-br from-[#1a1a1f] to-[#16161a] backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Building2 size={20} className="text-orange-400" />
                    Active Projects
                  </h3>
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="bg-[#0f0f12]/50 border border-gray-800/50 rounded-xl p-4 hover:border-orange-500/30 transition-all cursor-pointer group">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1 group-hover:text-orange-400 transition-colors">{project.name}</h4>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <MapPin size={12} />
                                {project.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users size={12} />
                                {project.workers} workers
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {project.deadline}
                              </span>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBg(project.status)}`}>
                            {project.status.replace('-', ' ')}
                          </span>
                        </div>
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-400">Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Budget: ${(project.spent / 1000).toFixed(0)}K / ${(project.budget / 1000).toFixed(0)}K</span>
                          <span className={`font-medium ${project.status === 'on-track' ? 'text-green-400' : 'text-yellow-400'}`}>
                            {project.phase}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gradient-to-br from-[#1a1a1f] to-[#16161a] backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Activity size={20} className="text-purple-400" />
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 bg-[#0f0f12]/50 border border-gray-800/30 rounded-lg hover:border-purple-500/30 transition-all cursor-pointer">
                        <activity.icon size={18} className={`${activity.color} mt-1`} />
                        <div className="flex-1">
                          <p className="text-sm mb-1">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold">All Projects</h3>
                  <p className="text-gray-400 text-sm">Manage and monitor construction projects</p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all">
                  + New Project
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gradient-to-br from-[#1a1a1f] to-[#16161a] backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:scale-[1.02] transition-transform cursor-pointer shadow-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                          <Building2 size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{project.name}</h4>
                          <p className="text-sm text-gray-400">{project.manager}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBg(project.status)}`}>
                        {project.status.replace('-', ' ')}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-400">Overall Progress</span>
                          <span className="font-bold">{project.progress}%</span>
                        </div>
                        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#0f0f12]/50 rounded-lg p-3 border border-gray-800/30">
                          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                            <DollarSign size={14} />
                            Budget
                          </div>
                          <p className="font-bold">${(project.budget / 1000).toFixed(0)}K</p>
                          <p className="text-xs text-gray-500">${(project.spent / 1000).toFixed(0)}K spent</p>
                        </div>
                        <div className="bg-[#0f0f12]/50 rounded-lg p-3 border border-gray-800/30">
                          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                            <Calendar size={14} />
                            Deadline
                          </div>
                          <p className="font-bold">{project.deadline}</p>
                          <p className="text-xs text-gray-500">{project.phase}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-800/30">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin size={14} className="text-gray-400" />
                          <span className="text-gray-300">{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <HardHat size={14} className="text-gray-400" />
                          <span className="text-gray-300">{project.workers} workers</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {taskStats.map((stat, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-[#1a1a1f] to-[#16161a] backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                        <stat.icon size={24} />
                      </div>
                      <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#1a1a1f] to-[#16161a] backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold mb-4">Equipment Utilization</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={equipmentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2d2d35" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1f', border: '1px solid #2d2d35', borderRadius: '8px' }}
                      />
                      <Bar dataKey="utilization" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f97316" />
                          <stop offset="100%" stopColor="#dc2626" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-gradient-to-br from-[#1a1a1f] to-[#16161a] backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold mb-4">Monthly Revenue Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2d2d35" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1f', border: '1px solid #2d2d35', borderRadius: '8px' }}
                      />
                      <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} />
                      <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai-insights' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-8 text-center shadow-2xl">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-orange-500/30">
                  <Zap size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-2">AI-Powered Intelligence</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Get real-time recommendations, risk alerts, and optimization suggestions powered by advanced machine learning algorithms
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {aiInsights.map((insight) => (
                  <div key={insight.id} className={`bg-gradient-to-br ${insight.color} backdrop-blur-xl border rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition-transform cursor-pointer`}>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <insight.icon size={28} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{insight.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            insight.priority === 'high' ? 'bg-red-500/30 text-red-300' :
                            insight.priority === 'medium' ? 'bg-yellow-500/30 text-yellow-300' :
                            'bg-blue-500/30 text-blue-300'
                          }`}>
                            {insight.priority} priority
                          </span>
                        </div>
                        <p className="text-gray-200 mb-4">{insight.message}</p>
                        <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors">
                          {insight.action}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Predictive Analytics', desc: 'AI forecasts project completion dates with 95% accuracy', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
                  { title: 'Resource Optimization', desc: 'Automated suggestions save 15% on equipment costs', icon: Wrench, color: 'from-green-500 to-emerald-500' },
                  { title: 'Risk Detection', desc: 'Early warning system prevents 80% of potential delays', icon: AlertTriangle, color: 'from-red-500 to-orange-500' },
                ].map((feature, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-[#1a1a1f] to-[#16161a] backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 shadow-xl">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                      <feature.icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
