/** @jsx createElement */
import { createElement, useState, useEffect } from './jsx-runtime';
import { DataService, DataPoint } from './data-service';
import { Chart } from './chart';
import { Card, Modal, Form, Input } from './components';

// src/dashboard.tsx
// Part 4.1: Main Dashboard Component

// Khởi tạo data service
const dataService = new DataService();

const Dashboard = () => {
  // TODO: Create main dashboard component

  // --- State ---
  const [data, setData] = useState<DataPoint[]>(dataService.getData());
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [newDataLabel, setNewDataLabel] = useState('');
  const [newDataValue, setNewDataValue] = useState(0);

  // --- Effects ---
  // TODO: Real-time data updates
  useEffect(() => {
    if (isSimulating) {
      dataService.simulateRealTimeUpdates(setData);
    } else {
      dataService.stopUpdates();
    }
    
    // Cleanup function
    return () => dataService.stopUpdates();
  }, [isSimulating]);
  

  // --- Event Handlers ---
  const handleChartTypeChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    setChartType(target.value as 'bar' | 'line' | 'pie');
  };
  
  const handleToggleSimulation = () => {
    setIsSimulating(prev => !prev);
  };
  
  const handleAddData = (e: Event) => {
    e.preventDefault();
    if (newDataLabel && newDataValue > 0) {
      const newDataPoint = { label: newDataLabel, value: newDataValue, category: 'Manual' };
      setData(prevData => [...prevData, newDataPoint]);
      // Đặt lại form
      setNewDataLabel('');
      setNewDataValue(0);
      setIsModalOpen(false);
    }
  };

  // --- Styles ---
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderRadius: '8px'
  };
  
  const controlGroupStyle = {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    margin: '20px 0'
  };
  
  const selectStyle = {
    padding: '8px 12px',
    fontSize: '1em',
    borderRadius: '4px',
    border: '1px solid #ccc'
  };
  
  const buttonStyle = {
    padding: '8px 16px',
    fontSize: '1em',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'white',
    backgroundColor: '#3498db',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };
  
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  };

  // --- Render ---
  return (
    <div className="dashboard">
      {/* TODO: Header with title and controls */}
      <header style={headerStyle}>
        <h1 style={{ margin: 0, color: '#2c3e50' }}>My Dashboard</h1>
        <button style={{ ...buttonStyle, backgroundColor: '#2ecc71' }} onClick={() => setIsModalOpen(true)}>
          Add Data
        </button>
      </header>

      {/* TODO: Chart type selector & Data filtering options */}
      <div className="controls" style={controlGroupStyle}>
        <label htmlFor="chartType">Chart Type:</label>
        <select id="chartType" onInput={handleChartTypeChange} style={selectStyle}>
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
        </select>
        
        <button style={{ ...buttonStyle, backgroundColor: isSimulating ? '#e74c3c' : '#1abc9c' }} onClick={handleToggleSimulation}>
          {isSimulating ? 'Stop Simulation' : 'Start Real-time Data'}
        </button>
      </div>

      {/* Main Chart */}
      <Card title={`Sales Data (${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart)`}>
        <Chart type={chartType} data={data} width={700} height={400} />
      </Card>
      
      {/* TODO: Responsive grid layout */}
      <div className="stats-grid" style={gridStyle}>
        <Card title="Total Value">
          <h2 style={{ margin: 0, color: '#2980b9' }}>
            ${data.reduce((sum, d) => sum + d.value, 0).toLocaleString()}
          </h2>
        </Card>
        <Card title="Data Points">
          <h2 style={{ margin: 0, color: '#27ae60' }}>{data.length}</h2>
        </Card>
        <Card title="Average Value">
           <h2 style={{ margin: 0, color: '#f39c12' }}>
            ${(data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(0)}
          </h2>
        </Card>
      </div>

      {/* Modal for adding data */}
      <Modal title="Add New Data Point" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Form onSubmit={handleAddData}>
          <label htmlFor="dataLabel">Label:</label>
          <Input 
            id="dataLabel"
            type="text" 
            value={newDataLabel} 
            onInput={(e: Event) => setNewDataLabel((e.target as HTMLInputElement).value)} 
            placeholder="e.g., Day 8"
          />
          <label htmlFor="dataValue" style={{ marginTop: '10px' }}>Value:</label>
          <Input
            id="dataValue"
            type="number"
            value={newDataValue}
            onInput={(e: Event) => setNewDataValue(parseInt((e.target as HTMLInputElement).value, 10))}
            placeholder="e.g., 500"
          />
          <button type="submit" style={{ ...buttonStyle, marginTop: '15px', width: '100%' }}>
            Add
          </button>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;