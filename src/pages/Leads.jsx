import React, { useState } from 'react';
import { Plus, LayoutGrid, List } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import LeadTable from '../components/leads/LeadTable';
import LeadCard from '../components/leads/LeadCard';
import LeadForm from '../components/leads/LeadForm';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';
import { useLeads } from '../context/LeadContext';
import { useResponsive } from '../hooks/useMediaQuery';

/**
 * Main Leads page component.
 * 
 * @returns {JSX.Element}
 */
export default function Leads() {
  const { leads, addLead, updateLead, deleteLead } = useLeads();
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const { isMobile, isDesktop } = useResponsive();

  React.useEffect(() => {
    if (isMobile) setViewMode('card');
    if (isDesktop) setViewMode('table');
  }, [isMobile, isDesktop]);

  const filteredLeads = leads
    .filter(lead => activeFilter === 'All' || lead.status === activeFilter)
    .filter(lead =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveFilter('All');
  };

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
      updateLead(selectedLead.id, formData);
      toast.success('Lead updated successfully!', { icon: '✅' });
    } else {
      // Create new
      addLead(formData);
      toast.success('Lead created successfully!', { icon: '🎉' });
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      deleteLead(id);
      toast.error('Lead deleted.', { icon: '🗑️' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 p-4 md:p-8">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Lead Management</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Manage and track your prospective customers.</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="hidden md:flex lg:hidden items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
              <button 
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
                aria-label="Table view"
              >
                <List size={18} />
              </button>
              <button 
                onClick={() => setViewMode('card')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'card' ? 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
                aria-label="Card view"
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            <button 
              onClick={() => handleOpenModal()}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm min-h-[44px]"
            >
              <Plus size={18} />
              <span>Add Lead</span>
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col space-y-4 mb-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} leads={leads} />
        </div>

        {/* Content Area */}
        <div className="w-full">
          {viewMode === 'table' ? (
            <>
              {filteredLeads.length > 0 ? (
                <LeadTable leads={filteredLeads} onEdit={handleOpenModal} onDelete={handleDelete} />
              ) : (
                <EmptyState totalLeads={leads.length} onClearFilters={handleClearFilters} />
              )}
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredLeads.map(lead => (
                <LeadCard key={lead.id} lead={lead} onEdit={handleOpenModal} onDelete={handleDelete} />
              ))}
              {filteredLeads.length === 0 && (
                <EmptyState totalLeads={leads.length} onClearFilters={handleClearFilters} />
              )}
            </div>
          )}
        </div>

      </div>

      {/* Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-none md:rounded-xl shadow-xl w-full h-full md:h-auto md:max-w-lg lg:max-w-2xl overflow-hidden flex flex-col" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h2 id="modal-title" className="text-lg font-semibold text-slate-800 dark:text-white">
                {selectedLead ? 'Edit Lead' : 'Add New Lead'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2 rounded-lg"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
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
