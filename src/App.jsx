import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import './App.css';
import Home from './pages/Website/Home';
import "./assets/style.css"

// Lazy loading components
const Login = lazy(() => import('./pages/Login'));
const DashboardLayout = lazy(() => import('./components/DashboardLayout'));
const ViewJournal = lazy(() => import('./pages/ViewJournal'));
const JournalDetails = lazy(() => import('./pages/JournalDetails'));
const ViewJournalIssues = lazy(() => import('./pages/ViewJournalIssues'));
const AddJournalIssue = lazy(() => import('./pages/AddJournalIssue'));
const JournalIssueDetails = lazy(() => import('./pages/JournalIssueDetails'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));
const About = lazy(() => import('./pages/Website/About'));
const ScholarShip = lazy(() => import('./pages/Website/ScholarShip'));
const SubmitYourManuScript = lazy(() => import('./pages/Website/SubmitYourManuScript'));
const TermsAndConditions = lazy(() => import('./pages/Website/TermsAndConditions'));
const BecomeAnEditor = lazy(() => import('./pages/Website/BecomeAnEditor'));
const WebsiteLayout = lazy(() => import('./components/WebsiteLayout'));
const PrivacyPolicy = lazy(() => import('./pages/Website/PrivacyPolicy'));
const SiteMap = lazy(() => import('./pages/Website/SiteMap'));
const Contact = lazy(() => import('./pages/Website/Contact'));
const OpenAccessAndLicencing = lazy(() => import('./pages/Website/OpenAccessAndLicencing'));
const ImpactFactors = lazy(() => import('./pages/Website/ImpactFactors'));
const EthicalGuidLine = lazy(() => import('./pages/Website/EthicalGuidLine'));
const MeetOurTeam = lazy(() => import('./pages/Website/MeetOurTeam'));
const WhyPublishWithUs = lazy(() => import('./pages/Website/WhyPublishWithUs'));
const BrowseOfJournals = lazy(() => import('./pages/Website/BrowseOfJournals'));
const AuthorGuidlinens = lazy(() => import('./pages/Website/AuthorGuidlinens'));
const ViewCallForPaper = lazy(() => import('./pages/Website/ViewCallForPaper'));
const ArticleProcessingCharges = lazy(() => import('./pages/Website/ArticleProcessingCharges'));
const Resources = lazy(() => import('./pages/Website/Resources'));
const JournalIndexing = lazy(() => import('./pages/Website/JournalIndexing'));
const PublicEthicAndMalPractices = lazy(() => import('./pages/Website/PublicEthicAndMalPractices'));
const Journals = lazy(() => import('./pages/Website/Journals'));
const PageNotFound = lazy(() => import('./pages/Website/PageNotFound'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route element={<WebsiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/scholarships" element={<ScholarShip />} />
            <Route path="/submit-manuscript" element={<SubmitYourManuScript />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/become-an-editor" element={<BecomeAnEditor />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/sitemap" element={<SiteMap />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/open-access-and-licencing" element={<OpenAccessAndLicencing />} />
            <Route path="/impact-factor" element={<ImpactFactors />} />
            <Route path="/ethical-guidelines" element={<EthicalGuidLine />} />
            <Route path="/meet-our-team" element={<MeetOurTeam />} />
            <Route path="/why-publish-with-us" element={<WhyPublishWithUs />} />
            <Route path="/browse-journals" element={<BrowseOfJournals />} />
            <Route path="/authors-guidelines" element={<AuthorGuidlinens />} />
            <Route path="/view-call-for-papers" element={<ViewCallForPaper />} />
            <Route path="/article-processing-charges" element={<ArticleProcessingCharges />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/journal-indexing" element={<JournalIndexing />} />
            <Route path="/publication-ethics-and-malpractice-statement" element={<PublicEthicAndMalPractices />} />
            <Route path="/journals/:id" element={<Journals />} />
            {/* 404 Page (within layout) */}
            <Route path="*" element={<PageNotFound />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<div className="p-4">Welcome to Dashboard</div>} />
              <Route path="view-journal" element={<ViewJournal />} />
              <Route path="view-journal/:id" element={<JournalDetails />} />
              <Route path="journal-issues" element={<ViewJournalIssues />} />
              <Route path="journal-issues/add" element={<AddJournalIssue />} />
              <Route path="journal-issues/:id" element={<JournalIssueDetails />} />
            </Route>
          </Route>

          {/* Default Redirect (Login) - redundant if catch-all is above, but keeping for logic separation if needed or specific redirects */}
          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
