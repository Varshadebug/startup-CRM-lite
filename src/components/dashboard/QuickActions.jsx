import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Users, Download, Loader2, FileSpreadsheet, FileText, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLeads } from '../../context/LeadContext';
import * as XLSX from 'xlsx';
import AddLeadModal from './AddLeadModal';
import { formatDate } from '../../utils/dateHelpers';

export default function QuickActions() {
  const navigate = useNavigate();
  const { leads } = useLeads();
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState(null);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateExportData = () => {
    if (!leads || leads.length === 0) {
      throw new Error("No leads available to export.");
    }
    // Transform to specific requested columns
    return leads.map(lead => ({
      Name: lead.name || '',
      Company: lead.company || '',
      Email: lead.email || '',
      Phone: lead.phone || '',
      Status: lead.status || '',
      Source: lead.source || '',
      'Created Date': formatDate(lead.createdAt || lead.dateAdded)
    }));
  };

  const handleExportExcel = async () => {
    try {
      setIsExporting(true);
      setExportError(null);
      setIsExportMenuOpen(false);
      await new Promise(resolve => setTimeout(resolve, 300)); // UX delay
      
      const data = generateExportData();
      const ws = XLSX.utils.json_to_sheet(data);
      
      // Auto-size columns based on content length
      const colWidths = Object.keys(data[0]).map(key => ({
        wch: Math.max(
          key.length,
          ...data.map(obj => (obj[key] ? obj[key].toString().length : 0))
        ) + 2 // Add padding
      }));
      ws['!cols'] = colWidths;

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Leads");
      XLSX.writeFile(wb, `Leads_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (err) {
      console.error("Excel Export Error:", err);
      setExportError(err.message || 'Excel export failed');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      setIsExporting(true);
      setExportError(null);
      setIsExportMenuOpen(false);
      await new Promise(resolve => setTimeout(resolve, 300)); // UX delay
      
      const data = generateExportData();
      const ws = XLSX.utils.json_to_sheet(data);
      const csv = XLSX.utils.sheet_to_csv(ws);
      
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `Leads_Export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("CSV Export Error:", err);
      setExportError(err.message || 'CSV export failed');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-6">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-5 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
          Quick Actions
        </h2>
        
        <div className="flex flex-col gap-3">
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center justify-between w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                <Plus size={20} />
              </div>
              <span className="font-semibold text-sm md:text-base">Add New Lead</span>
            </div>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/leads')}
            className="group flex items-center justify-between w-full bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 p-4 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Users size={20} />
              </div>
              <span className="font-semibold text-sm md:text-base">View All Leads</span>
            </div>
          </motion.button>

          <div className="relative">
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              disabled={isExporting}
              className="group flex items-center justify-between w-full bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 p-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-wait focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  {isExporting ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                </div>
                <span className="font-semibold text-sm md:text-base">{isExporting ? 'Processing...' : 'Export Data'}</span>
              </div>
              <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 ${isExportMenuOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {isExportMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden z-20"
                >
                  <button 
                    onClick={handleExportExcel}
                    className="flex items-center gap-3 w-full p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200 transition-colors border-b border-slate-100 dark:border-slate-700/50 focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-700/50"
                  >
                    <FileSpreadsheet size={18} className="text-emerald-500" />
                    <span className="font-medium text-sm md:text-base">Export as Excel (.xlsx)</span>
                  </button>
                  <button 
                    onClick={handleExportCSV}
                    className="flex items-center gap-3 w-full p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200 transition-colors focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-700/50"
                  >
                    <FileText size={18} className="text-blue-500" />
                    <span className="font-medium text-sm md:text-base">Export as CSV</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {exportError && (
            <p className="text-sm text-red-500 px-2 mt-1">{exportError}</p>
          )}
        </div>
      </div>
      
      <AddLeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
