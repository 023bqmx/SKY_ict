import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert, Activity, Package, BatteryWarning, Scan, Crosshair, X, FileText, Camera } from 'lucide-react';

const CargoDashboard = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [threatDetected, setThreatDetected] = useState(false);
  const [scannedCount, setScannedCount] = useState(1252);
  const [selectedAlert, setSelectedAlert] = useState(null);
  
  const [alerts, setAlerts] = useState([
    { id: 1, time: '13:30:45', type: 'High-Density Organic', confidence: '82%', status: 'Warning', flight: 'TG-930', bagTag: 'BKK-10492X' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsScanning(true);
      setThreatDetected(false);
      
      setTimeout(() => {
        setIsScanning(false);
        setThreatDetected(true);
        setScannedCount(prev => prev + 1);
        
        const newAlert = {
          id: Date.now(),
          time: new Date().toLocaleTimeString('th-TH', { hour12: false }),
          type: 'High-Capacity Power Bank (Li-ion)',
          confidence: '97.5%',
          status: 'Critical',
          flight: 'EK-372',
          bagTag: 'DXB-88320C'
        };
        setAlerts(prev => [newAlert, ...prev].slice(0, 4)); 
      }, 2500);
    }, 7000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 font-sans relative">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-red-500" />
          <h1 className="text-2xl font-bold tracking-wider text-white">SKYGUARD <span className="text-red-500">AI VISION</span></h1>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 shadow-inner">
            <Package className="w-5 h-5 text-slate-400" />
            <span className="text-sm">Scanned Today: <span className="text-white font-bold">{scannedCount}</span></span>
          </div>
          <div className="flex items-center gap-2 bg-green-950 px-4 py-2 rounded-lg border border-green-900">
            <Activity className="w-5 h-5 text-green-500 animate-pulse" />
            <span className="text-sm text-green-500 font-bold tracking-wide">SYSTEM ONLINE</span>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: X-Ray Scanner Feed */}
        <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex flex-col shadow-2xl">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/80">
            <h2 className="font-semibold text-lg flex items-center gap-2 text-slate-200">
              <Scan className="w-5 h-5 text-blue-400" />
              Live X-Ray Feed (Terminal 1 - Cargo Belt A)
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono">FRAME RATIO: 16:9 | DUAL-ENERGY</span>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider ${isScanning ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' : threatDetected ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse' : 'bg-green-500/20 text-green-400 border border-green-500/50'}`}>
                {isScanning ? 'ANALYZING...' : threatDetected ? 'THREAT DETECTED' : 'CLEAR'}
              </span>
            </div>
          </div>
          
          <div className="relative flex-1 bg-black min-h-[450px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            <div className="relative w-full max-w-xl flex justify-center items-center p-4">
              {/* เปลี่ยนมาใช้ภาพจำลอง X-Ray กระเป๋าแบบปลอดภัยหายห่วง */}
              <div className="relative w-full h-[320px] bg-slate-900 rounded-lg overflow-hidden border border-slate-700 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1581557991964-125469da3b8a?q=80&w=800&auto=format&fit=crop" 
                  alt="Luggage X-Ray" 
                  className="w-full h-full object-cover opacity-75 filter grayscale invert contrast-[1.6] brightness-90"
                />
                
                {isScanning && (
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] animate-[scan_2.5s_ease-in-out_infinite] z-10" />
                )}

                {threatDetected && (
                  <div className="absolute top-[35%] left-[30%] w-[130px] h-[80px] border-[2px] border-red-500 bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.6)] z-20 transition-all duration-300">
                    <Crosshair className="absolute -top-3 -left-3 w-6 h-6 text-red-500 opacity-90" />
                    <Crosshair className="absolute -bottom-3 -right-3 w-6 h-6 text-red-500 opacity-90" />
                    <div className="bg-red-500 text-white text-[11px] font-bold px-2 py-1 whitespace-nowrap absolute -top-7 left-[-2px] flex items-center gap-1 shadow-lg">
                      <AlertTriangle className="w-3 h-3" />
                      Li-ion Battery | 97.5%
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Alerts & Info */}
        <div className="flex flex-col gap-6">
          <div className={`p-6 rounded-xl border shadow-lg transition-all duration-500 ${threatDetected ? 'bg-red-950/30 border-red-800/50' : 'bg-slate-900 border-slate-800'}`}>
            <div className="flex items-start gap-4">
              {threatDetected ? (
                <AlertTriangle className="w-12 h-12 text-red-500 shrink-0 animate-pulse" />
              ) : (
                <CheckCircle className="w-12 h-12 text-green-500 shrink-0" />
              )}
              <div>
                <h3 className={`text-xl font-bold mb-1 tracking-wide ${threatDetected ? 'text-red-400' : 'text-green-400'}`}>
                  {threatDetected ? 'CRITICAL THREAT' : 'ALL CLEAR'}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {threatDetected 
                    ? 'Hazardous material (Lithium-ion) detected. Cargo belt auto-paused. Awaiting manual override by security protocol.' 
                    : 'No restricted items detected in current scan. Belt operating normally.'}
                </p>
              </div>
            </div>
            
            {threatDetected && (
              <div className="mt-4 pt-4 border-t border-red-900/50 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-red-950/50 p-2 rounded border border-red-900/50">
                  <span className="text-slate-400 block mb-1">Density Level</span>
                  <span className="text-red-300 font-mono font-bold">HIGH (Metallic)</span>
                </div>
                <div className="bg-red-950/50 p-2 rounded border border-red-900/50">
                  <span className="text-slate-400 block mb-1">Atomic Z Range</span>
                  <span className="text-red-300 font-mono font-bold">25 - 29</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-900 rounded-xl border border-slate-800 flex-1 flex flex-col overflow-hidden shadow-lg">
            <div className="p-4 border-b border-slate-800 bg-slate-800/40 flex justify-between items-center">
              <h3 className="font-semibold text-slate-200">Detection Logs</h3>
              <span className="text-xs text-slate-400 font-mono">Last 24h</span>
            </div>
            <div className="p-4 flex flex-col gap-3 overflow-y-auto">
              {alerts.map((alert) => (
                <div key={alert.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg flex items-center justify-between hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${alert.status === 'Critical' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                      <BatteryWarning className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200">{alert.type}</p>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">{alert.time} | Conf: {alert.confidence}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedAlert(alert)}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded transition-colors font-bold border border-slate-700 hover:border-blue-500/50 cursor-pointer"
                  >
                    REVIEW
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ป๊อปอัป Review (Modal) */}
      {selectedAlert && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
            
            <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-bold text-slate-200">Incident Report: #{selectedAlert.id.toString().slice(-6)}</h2>
              </div>
              <button 
                onClick={() => setSelectedAlert(null)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex gap-6 mb-6">
                <div className="w-1/3 bg-black rounded-lg border border-slate-700 p-2 flex flex-col items-center justify-center min-h-[120px]">
                  <Camera className="w-8 h-8 text-slate-600 mb-2" />
                  <span className="text-xs text-slate-500 font-mono">Snapshot Captured</span>
                </div>
                <div className="w-2/3 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500 mb-1">Detected Threat</p>
                    <p className="font-bold text-red-400">{selectedAlert.type}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Confidence</p>
                    <p className="font-bold text-white">{selectedAlert.confidence}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Associated Flight</p>
                    <p className="font-mono font-bold text-blue-400">{selectedAlert.flight}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Bag Tag Number</p>
                    <p className="font-mono font-bold text-yellow-400">{selectedAlert.bagTag}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-950/20 border border-red-900/30 p-4 rounded-lg">
                <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Recommended Action Protocol
                </h4>
                <p className="text-sm text-slate-300">
                  Item exhibits characteristics of a high-capacity lithium-ion battery. This violates IATA Dangerous Goods regulations for checked baggage. 
                  <span className="block mt-2 font-bold text-white">Action: Initiate manual inspection by security personnel (EOD) before loading onto flight {selectedAlert.flight}.</span>
                </p>
              </div>
            </div>
            
            <div className="bg-slate-800/50 p-4 border-t border-slate-700 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedAlert(null)}
                className="px-4 py-2 rounded bg-slate-700 text-white text-sm hover:bg-slate-600 transition-colors cursor-pointer"
              >
                Close Report
              </button>
              <button className="px-4 py-2 rounded bg-red-600 text-white text-sm font-bold hover:bg-red-500 transition-colors shadow-lg shadow-red-500/20 cursor-pointer">
                Dispatch Security Team
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(320px); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
};

export default CargoDashboard;