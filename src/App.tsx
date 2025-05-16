import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import EventsListView from './pages/EventsListView';
import ContactsView from './pages/ContactsView';
import TicketSelectionView from './pages/TicketSelectionView';
import BuddyAssignmentView from './pages/BuddyAssignmentView';
import PreviewShareView from './pages/PreviewShareView';
import { TicketsProvider } from './context/TicketsContext';

function App() {
  return (
    <Router>
      <TicketsProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<EventsListView />} />
              <Route path="/contacts" element={<ContactsView />} />
              <Route path="/tickets/:eventId" element={<TicketSelectionView />} />
              <Route path="/assign/:eventId" element={<BuddyAssignmentView />} />
              <Route path="/preview/:eventId" element={<PreviewShareView />} />
            </Routes>
          </main>
        </div>
      </TicketsProvider>
    </Router>
  );
}

export default App;