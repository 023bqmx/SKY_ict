import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert, Activity, Package, BatteryWarning, Scan, Crosshair, X, FileText, Camera, Play } from 'lucide-react';

// ใช้รูปลิงก์ X-Ray ของจริงจาก Wikimedia (ตามเวอร์ชันที่ถูกต้อง)
const cargoQueue = [
  {
    id: 'BAG-88320C',
    flight: 'EK-372',
    bagTag: 'DXB-88320C',
    image: 'https://www.airport-technology.com/wp-content/uploads/sites/14/2022/05/GettyImages_1255460753resize1.2048_0_1.jpg',
    hasThreat: true,
    type: 'High-Capacity Power Bank (Li-ion)',
    confidence: '97.5%',
    status: 'Critical',
    density: 'HIGH (Metallic)',
    atomicZ: '25 - 29',
    box: { top: '35%', left: '42%', width: '120px', height: '90px' }
  },
  {
    id: 'BAG-10492X',
    flight: 'TG-930',
    bagTag: 'BKK-10492X',
    image: 'https://thumbs.dreamstime.com/b/x-ray-image-showing-contents-packed-suitcase-365652673.jpg',
    hasThreat: false,
    type: 'Standard Luggage (Organic)',
    confidence: '99.1%',
    status: 'Clear',
    density: 'NORMAL (Textile/Organic)',
    atomicZ: '6 - 8',
    box: null
  },
  {
    id: 'BAG-55219A',
    flight: 'SQ-711',
    bagTag: 'SIN-55219A',
    image: 'https://media.istockphoto.com/id/183249716/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B9%80%E0%B8%AD%E0%B9%87%E0%B8%81%E0%B8%8B%E0%B9%8C%E0%B9%80%E0%B8%A3%E0%B8%A2%E0%B9%8C%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9B%E0%B9%8B%E0%B8%B2%E0%B9%80%E0%B8%94%E0%B8%B4%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%87.jpg?s=612x612&w=0&k=20&c=x6OqP_hFiMVHma7IefjEyRFBgcE2CcBoMZMYxJLm4XE=',
    hasThreat: true,
    type: 'Lithium Battery Pack',
    confidence: '94.2%',
    status: 'Critical',
    density: 'HIGH (Dense Metal)',
    atomicZ: '26 - 30',
    box: { top: '60%', left: '20%', width: '130px', height: '80px' }
  }
];

const CargoDashboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scanStage, setScanStage] = useState('scanning');
  const [scannedCount, setScannedCount] = useState(1265);
  const [selectedAlert, setSelectedAlert] = useState(null);
  
  const [alerts, setAlerts] = useState([
    { id: 1, time: '13:30:45', type: 'High-Density Organic', confidence: '82%', status: 'Warning', flight: 'TG-930', bagTag: 'BKK-10492X' }
  ]);

  const currentItem = cargoQueue[currentIndex];

  useEffect(() => {
    let timer;
    if (scanStage === 'scanning') {
      timer = setTimeout(() => {
        setScanStage('result');
        setScannedCount(prev => prev + 1);

        if (currentItem.hasThreat) {
          const newAlert = {
            id: Date.now(),
            time: new Date().toLocaleTimeString('th-TH', { hour12: false }),
            type: currentItem.type,
            confidence: currentItem.confidence,
            status: currentItem.status,
            flight: currentItem.flight,
            bagTag: currentItem.bagTag
          };
          setAlerts(prev => [newAlert, ...prev].slice(0, 5));
        }
      }, 2500);
    } else if (scanStage === 'result' && !currentItem.hasThreat) {
      timer = setTimeout(() => {
        handleNextItem();
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [scanStage, currentIndex]);

  const handleNextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cargoQueue.length);
    setScanStage('scanning');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-6 font-sans relative overflow-x-hidden">
      
      {/* Header Responsive */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 md:mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-7 h-7 md:w-8 md:h-8 text-red-500" />
          <h1 className="text-xl md:text-2xl font-bold tracking-wider text-white">SKYGUARD <span className="text-red-500">AI VISION</span></h1>
        </div>
        <div className="flex flex-wrap w-full md:w-auto gap-2 md:gap-4">
          <div className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-900 px-3 md:px-4 py-2 rounded-lg border border-slate-800 shadow-inner">
            <Package className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
            <span className="text-xs md:text-sm whitespace-nowrap">Scanned: <span className="text-white font-bold">{scannedCount}</span></span>
          </div>
          <div className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-950 px-3 md:px-4 py-2 rounded-lg border border-green-900">
            <Activity className="w-4 h-4 md:w-5 md:h-5 text-green-500 animate-pulse" />
            <span className="text-xs md:text-sm text-green-500 font-bold tracking-wide whitespace-nowrap">SYSTEM ONLINE</span>
          </div>
        </div>
      </header>

      {/* โครงสร้าง Grid: 1 คอลัมน์บนมือถือ, 3 คอลัมน์บนจอคอม */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* หน้าจอ X-Ray */}
        <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex flex-col shadow-2xl">
          <div className="p-3 md:p-4 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-800/80">
            <div className="flex flex-wrap items-center gap-2">
              <Scan className="w-5 h-5 text-blue-400 hidden sm:block" />
              <h2 className="font-semibold text-base md:text-lg text-slate-200">
                Live X-Ray (Belt A)
              </h2>
              <span className="bg-slate-800 text-blue-400 text-[10px] md:text-xs px-2 py-0.5 rounded border border-slate-700 font-mono">
                Item: {currentItem.id}
              </span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-[10px] md:text-xs text-slate-400 font-mono hidden sm:block">RATIO 16:9 | DUAL-ENERGY</span>
              <span className={`px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-wider text-center w-full sm:w-auto ${
                scanStage === 'scanning' 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' 
                  : currentItem.hasThreat 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse' 
                    : 'bg-green-500/20 text-green-400 border border-green-500/50'
              }`}>
                {scanStage === 'scanning' ? 'ANALYZING...' : currentItem.hasThreat ? 'THREAT DETECTED' : 'PASSED (CLEAR)'}
              </span>
            </div>
          </div>
          
          <div className="relative flex-1 bg-black min-h-[300px] md:min-h-[450px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            <div className="relative w-full max-w-xl flex justify-center items-center p-2 md:p-4">
              <div className="relative w-full h-[250px] sm:h-[320px] bg-slate-900 rounded-lg overflow-hidden border border-slate-700 flex items-center justify-center">
                
                {/* ใช้ object-contain เพื่อให้รูปสมส่วนเหมือนเดิม */}
                <img 
                  src={currentItem.image} 
                  alt="Real X-Ray Scan" 
                  className="w-full h-full object-contain opacity-85 filter contrast-[1.4] brightness-90 transition-all duration-500"
                />
                
                {scanStage === 'scanning' && (
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] animate-[scan_2.5s_ease-in-out_infinite] z-10" />
                )}

                {scanStage === 'result' && currentItem.hasThreat && currentItem.box && (
                  <div 
                    style={{
                      top: currentItem.box.top,
                      left: currentItem.box.left,
                      width: currentItem.box.width,
                      height: currentItem.box.height
                    }}
                    className="absolute border-[2px] border-red-500 bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.6)] z-20 transition-all duration-300"
                  >
                    <Crosshair className="absolute -top-3 -left-3 w-4 h-4 md:w-6 md:h-6 text-red-500 opacity-90" />
                    <Crosshair className="absolute -bottom-3 -right-3 w-4 h-4 md:w-6 md:h-6 text-red-500 opacity-90" />
                    <div className="bg-red-500 text-white text-[9px] md:text-[11px] font-bold px-1.5 py-1 whitespace-nowrap absolute -top-6 md:-top-7 left-[-2px] flex items-center gap-1 shadow-lg">
                      <AlertTriangle className="w-2 h-2 md:w-3 md:h-3" />
                      {currentItem.type} | {currentItem.confidence}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ส่วนแสดงผลลัพธ์และประวัติ */}
        <div className="flex flex-col gap-4 md:gap-6">
          <div className={`p-4 md:p-6 rounded-xl border shadow-lg transition-all duration-500 ${
            scanStage === 'result' && currentItem.hasThreat 
              ? 'bg-red-950/30 border-red-800/50' 
              : scanStage === 'result' && !currentItem.hasThreat
                ? 'bg-green-950/30 border-green-800/50'
                : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
              {scanStage === 'result' && currentItem.hasThreat ? (
                <AlertTriangle className="w-10 h-10 md:w-12 md:h-12 text-red-500 shrink-0 animate-pulse" />
              ) : scanStage === 'result' && !currentItem.hasThreat ? (
                <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-500 shrink-0" />
              ) : (
                <Scan className="w-10 h-10 md:w-12 md:h-12 text-blue-400 shrink-0 animate-spin" />
              )}
              <div>
                <h3 className={`text-lg md:text-xl font-bold mb-1 tracking-wide ${
                  scanStage === 'result' && currentItem.hasThreat 
                    ? 'text-red-400' 
                    : scanStage === 'result' && !currentItem.hasThreat
                      ? 'text-green-400'
                      : 'text-blue-400'
                }`}>
                  {scanStage === 'scanning' 
                    ? 'SCANNING CARGO...' 
                    : currentItem.hasThreat 
                      ? 'CRITICAL THREAT DETECTED' 
                      : 'ALL CLEAR - PASSED'}
                </h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                  {scanStage === 'scanning'
                    ? 'Analyzing dual-energy density profile...'
                    : currentItem.hasThreat 
                      ? 'Hazardous material detected. Cargo belt auto-paused.' 
                      : 'No restricted items detected. Belt operating normally.'}
                </p>
              </div>
            </div>
            
            {scanStage === 'result' && currentItem.hasThreat && (
              <div className="mt-4 pt-4 border-t border-red-900/50">
                <button 
                  onClick={handleNextItem}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg text-sm md:text-base"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Override & Scan Next
                </button>
              </div>
            )}
          </div>

          <div className="bg-slate-900 rounded-xl border border-slate-800 flex-1 flex flex-col overflow-hidden shadow-lg h-[300px] lg:h-auto">
            <div className="p-3 md:p-4 border-b border-slate-800 bg-slate-800/40 flex justify-between items-center">
              <h3 className="font-semibold text-sm md:text-base text-slate-200">Detection Logs</h3>
              <span className="text-[10px] md:text-xs text-slate-400 font-mono">Last 24h</span>
            </div>
            <div className="p-3 md:p-4 flex flex-col gap-2 md:gap-3 overflow-y-auto">
              {alerts.map((alert) => (
                <div key={alert.id} className="bg-slate-950 border border-slate-800 p-2 md:p-3 rounded-lg flex items-center justify-between hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className={`p-1.5 md:p-2 rounded-lg shrink-0 ${alert.status === 'Critical' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                      <BatteryWarning className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs md:text-sm font-bold text-slate-200 truncate">{alert.type}</p>
                      <p className="text-[10px] md:text-xs text-slate-500 font-mono mt-0.5">{alert.time} | Conf: {alert.confidence}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedAlert(alert)}
                    className="text-[10px] md:text-xs bg-slate-800 hover:bg-slate-700 text-blue-400 px-2 md:px-3 py-1 md:py-1.5 rounded transition-colors font-bold border border-slate-700 shrink-0 ml-2"
                  >
                    REVIEW
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Incident Report Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-slate-800 p-3 md:p-4 border-b border-slate-700 flex justify-between items-center sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                <h2 className="text-base md:text-lg font-bold text-slate-200">Incident Report: #{selectedAlert.id.toString().slice(-6)}</h2>
              </div>
              <button 
                onClick={() => setSelectedAlert(null)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
            
            <div className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-6">
                <div className="w-full sm:w-1/3 bg-black rounded-lg border border-slate-700 p-2 flex flex-col items-center justify-center min-h-[100px] md:min-h-[120px]">
                  <Camera className="w-6 h-6 md:w-8 md:h-8 text-slate-600 mb-2" />
                  <span className="text-[10px] md:text-xs text-slate-500 font-mono text-center">Snapshot Captured</span>
                </div>
                <div className="w-full sm:w-2/3 grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                  <div>
                    <p className="text-slate-500 mb-0.5 md:mb-1">Detected Threat</p>
                    <p className="font-bold text-red-400 truncate">{selectedAlert.type}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-0.5 md:mb-1">Confidence</p>
                    <p className="font-bold text-white">{selectedAlert.confidence}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-0.5 md:mb-1">Associated Flight</p>
                    <p className="font-mono font-bold text-blue-400">{selectedAlert.flight}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-0.5 md:mb-1">Bag Tag Number</p>
                    <p className="font-mono font-bold text-yellow-400">{selectedAlert.bagTag}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-950/20 border border-red-900/30 p-3 md:p-4 rounded-lg">
                <h4 className="text-red-400 text-sm md:text-base font-bold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Recommended Action Protocol
                </h4>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  Item exhibits characteristics of a high-capacity lithium-ion battery. This violates IATA Dangerous Goods regulations for checked baggage. 
                  <span className="block mt-2 font-bold text-white">Action: Initiate manual inspection by security personnel (EOD) before loading.</span>
                </p>
              </div>
            </div>
            
            <div className="bg-slate-800/50 p-3 md:p-4 border-t border-slate-700 flex flex-col-reverse sm:flex-row justify-end gap-2 md:gap-3 sticky bottom-0">
              <button 
                onClick={() => setSelectedAlert(null)}
                className="w-full sm:w-auto px-4 py-2 rounded bg-slate-700 text-white text-xs md:text-sm hover:bg-slate-600 transition-colors"
              >
                Close Report
              </button>
              <button className="w-full sm:w-auto px-4 py-2 rounded bg-red-600 text-white text-xs md:text-sm font-bold hover:bg-red-500 transition-colors shadow-lg shadow-red-500/20">
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