import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import EventsListView from "./pages/EventsListView";
import ContactsView from "./pages/ContactsView";
import TicketSelectionView from "./pages/TicketSelectionView";
import PreviewShareView from "./pages/PreviewShareView";
import { TicketsProvider } from "./context/TicketsContext";
import InviteContactView from "./pages/InviteContactView";
import { CreateGroupView } from "./pages/CreateGroupView";

const MainLayout = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <main className="container mx-auto px-4 py-6">
      <Outlet />
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <TicketsProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<EventsListView />} />
            <Route path="/contacts" element={<ContactsView />} />
            <Route path="/contacts/invite" element={<InviteContactView />} />
            <Route path="/tickets/:eventId" element={<TicketSelectionView />} />
            <Route path="/preview/:eventId" element={<PreviewShareView />} />
          </Route>
          <Route path="/contacts/add-group" element={<CreateGroupView />} />
        </Routes>
      </TicketsProvider>
    </Router>
  );
}

export default App;
