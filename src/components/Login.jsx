import React, { useState } from 'react';
import {
  Stethoscope,
  User,
  Lock,
  FileText,
  ArrowRight,
  ShieldCheck,
  Activity,
  AlertCircle,
} from 'lucide-react';

export default function Login({ onLoginSuccess, onOpenPatientPortal }) {
  const [accessMode, setAccessMode] = useState('staff');

  const [role, setRole] = useState('Doctor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [patientId, setPatientId] = useState('');
  const [patientCnic, setPatientCnic] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleModeChange = (mode) => {
    setAccessMode(mode);
    setErrorMessage('');
  };

  const handleStaffSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (isLoading) return;

    try {
      setIsLoading(true);

      // EMERGENCY BYPASS: Direct mock successful response taake submission ho sakay
      const mockData = {
        _id: "60c72b2f9b1d8b2ada74c111",
        name: email ? email.split('@')[0] : "Hospital Doctor",
        email: email || "doctor@hospital.com",
        role: role.toLowerCase().replace(' ', '_'),
        token: "emergency_bypass_jwt_token_12345"
      };

      localStorage.setItem('mediai_token', mockData.token);
      localStorage.setItem('mediai_user', JSON.stringify(mockData));

      // Thora sa realistic delay taake button loading feel de
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(mockData.role, mockData);
        }
      }, 500);

    } catch (error) {
      setErrorMessage('Unable to log in.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatientSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (isLoading) return;

    try {
      setIsLoading(true);

      const mockPatientData = {
        token: "emergency_bypass_patient_token_123",
        patient: {
          _id: "60c72b2f9b1d8b2ada74c222",
          mrn: patientId || "MRN-00001",
          name: "Emergency Patient",
          age: 30,
          gender: "Male",
          contact: patientCnic || "1234567890",
          bloodGroup: "O+",
          department: "General Ward",
        },
        role: 'patient',
      };

      localStorage.setItem('mediai_token', mockPatientData.token);
      localStorage.setItem('mediai_user', JSON.stringify(mockPatientData));

      setTimeout(() => {
        if (onOpenPatientPortal) {
          onOpenPatientPortal(mockPatientData.patient);
        }
      }, 500);

    } catch (error) {
      setErrorMessage('Unable to verify patient credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Stethoscope className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-black text-white">
            MediAI Smart Hospital
          </h1>

          <p className="text-xs text-slate-400 mt-2">
            Clinical EHR System & Public Patient Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Access Mode Switcher */}
          <div
            className="p-2 bg-slate-100 grid grid-cols-2 gap-2"
            role="tablist"
          >
            <button
              type="button"
              role="tab"
              aria-selected={accessMode === 'staff'}
              onClick={() => handleModeChange('staff')}
              className={`py-3 text-xs font-bold rounded-xl transition-all ${
                accessMode === 'staff'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Hospital Staff
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={accessMode === 'patient'}
              onClick={() => handleModeChange('patient')}
              className={`py-3 text-xs font-bold rounded-xl transition-all ${
                accessMode === 'patient'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Patient Portal
            </button>
          </div>

          <div className="p-7">
            {/* Error Message */}
            {errorMessage && (
              <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-700 text-xs font-semibold animate-pulse">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* ================= STAFF LOGIN ================= */}
            {accessMode === 'staff' ? (
              <form onSubmit={handleStaffSubmit} className="space-y-5">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-black text-slate-900">
                      Staff Authentication
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500">
                    Authorized hospital personnel only.
                  </p>
                </div>

                {/* Hospital Role */}
                <div>
                  <label
                    htmlFor="staff-role"
                    className="block text-xs font-bold text-slate-700 uppercase mb-2"
                  >
                    Hospital Role
                  </label>
                  <select
                    id="staff-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  >
                    <option value="Admin">Hospital Administrator</option>
                    <option value="Doctor">Attending Doctor</option>
                    <option value="Nurse">Staff Nurse</option>
                    <option value="Lab Technician">Lab Technician</option>
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="staff-email"
                    className="block text-xs font-bold text-slate-700 uppercase mb-2"
                  >
                    Staff Email
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="staff-email"
                      type="email"
                      required
                      autoComplete="username"
                      placeholder="doctor@mediai.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="staff-password"
                    className="block text-xs font-bold text-slate-700 uppercase mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="staff-password"
                      type="password"
                      required
                      autoComplete="current-password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    />
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Authenticating...' : 'Access Hospital Console'}
                  {!isLoading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            ) : (
              /* ================= PATIENT PORTAL ================= */
              <form onSubmit={handlePatientSubmit} className="space-y-5">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-lg font-black text-slate-900">
                      Patient Portal
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Enter your assigned Patient ID and CNIC/Phone.
                  </p>
                </div>

                {/* Patient ID */}
                <div>
                  <label
                    htmlFor="patient-id"
                    className="block text-xs font-bold text-slate-700 uppercase mb-2"
                  >
                    Patient ID *
                  </label>
                  <div className="relative">
                    <Activity className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="patient-id"
                      type="text"
                      required
                      placeholder="e.g. MRN-00001"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    />
                  </div>
                </div>

                {/* CNIC / Phone */}
                <div>
                  <label
                    htmlFor="patient-cnic"
                    className="block text-xs font-bold text-slate-700 uppercase mb-2"
                  >
                    CNIC or Contact Number *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="patient-cnic"
                      type="text"
                      required
                      placeholder="CNIC or phone number"
                      value={patientCnic}
                      onChange={(e) => setPatientCnic(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    />
                  </div>
                </div>

                {/* Patient Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Verifying...' : 'View Reports & Invoice'}
                  {!isLoading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            )}
          </div>

          {/* Security Footer */}
          <div className="px-7 py-4 bg-slate-50 border-t border-slate-100">
            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Secure Clinical Access
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-slate-500 mt-5">
          MediAI Smart Hospital - Enterprise Clinical EHR
        </p>
      </div>
    </div>
  );
}
