import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import KPIGrid from "../components/KPIGrid";
import LiveInsights from "../components/LiveInsights";
import QuickActions from "../components/QuickActions";
import ReportForm from "../components/ReportForm";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <Hero />

      <KPIGrid />

      <LiveInsights />

      <QuickActions />

      <ReportForm />

      <Dashboard />

      <Footer />
    </div>
  );
}