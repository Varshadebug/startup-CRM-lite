import React, { useState } from 'react';
import { Plus, LayoutGrid, List } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import LeadTable from '../components/leads/LeadTable';
import LeadCard from '../components/leads/LeadCard';
import LeadForm from '../components/leads/LeadForm';

// Initial sample data
const initialLeads = [
  { id: '1', name: 'Alice Smith', company: 'TechCorp', email: 'alice@techcorp.com', phone: '555-0101', status: 'New', source: 'Website', dateAdded: '2026-06-16T08:00:00Z' },
  { id: '2', name: 'Bob Johnson', company: 'Innovate LLC', email: 'bob@innovate.com', phone: '555-0102', status: 'Contacted', source: 'Referral', dateAdded: '2026-06-15T10:30:00Z' }
];

/**
 * Main Leads page component.
 * 
 * @returns {JSX.Element}
 */
export default function Leads() {
  const [leads, setLeads] = useState(initialLeads);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const handleOpenModal = (lead = null) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedLead(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (formData) => {
    if (selectedLead) {
      // Update existing
      setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, ...formData } : l));
      toast.success('Lead updated successfully!', { icon: '✅' });
    } else {
      // Create new
      const newLead = {
        ...formData,
        id: Date.now().toString(),
        dateAdded: new Date().toISOString()
      };
      setLeads(prev => [newLead, ...prev]);
      toast.success('Lead created successfully!', { icon: '🎉' });
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(prev => prev.filter(l => l.id !== id));
      toast.error('Lead deleted.', { icon: '🗑️' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Lead Management</h1>
            <p className="text-slate-500 mt-1 text-sm">Manage and track your prospective customers.</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Toggle (Hidden on very small screens where cards are forced anyway) */}
            <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-lg p-1">
              <button 
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-slate-100 text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                aria-label="Table view"
              >
                <List size={18} />
              </button>
              <button 
                onClick={() => setViewMode('card')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'card' ? 'bg-slate-100 text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                aria-label="Card view"
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            <button 
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
            >
              <Plus size={18} />
              <span>Add Lead</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full">
          {/* Mobile view forces cards. Desktop view respects the toggle */}
          <div className={`sm:hidden grid grid-cols-1 gap-4`}>
             {leads.map(lead => (
               <LeadCard key={lead.id} lead={lead} onEdit={handleOpenModal} onDelete={handleDelete} />
             ))}
             {leads.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
                  No leads found.
                </div>
             )}
          </div>

          <div className="hidden sm:block">
            {viewMode === 'table' ? (
              <LeadTable leads={leads} onEdit={handleOpenModal} onDelete={handleDelete} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {leads.map(lead => (
                  <LeadCard key={lead.id} lead={lead} onEdit={handleOpenModal} onDelete={handleDelete} />
                ))}
                {leads.length === 0 && (
                  <div className="col-span-full bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
                    No leads found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 id="modal-title" className="text-lg font-semibold text-slate-800">
                {selectedLead ? 'Edit Lead' : 'Add New Lead'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <LeadForm 
                initialData={selectedLead} 
                onSubmit={handleSubmit} 
                onCancel={handleCloseModal} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
