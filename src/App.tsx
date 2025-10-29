import { useState, useMemo, useEffect, useCallback } from 'react';
import { Container, Theme } from './settings/types';
import './lib/firebase';
import { ScriptBuilderPage } from './components/generated/ScriptBuilderPage';
import { PipelineReactivatorPage } from './components/generated/PipelineReactivatorPage';
import { RevenueStackerPage } from './components/generated/RevenueStackerPage';
import { TargetProspectsPage } from './components/generated/Part 1 - Identify, Build & Refine';
import { ObjectionsFeedbackPage } from './components/generated/ObjectionsFeedbackPage';
import { ScriptBuilderHub } from './components/generated/ScriptBuilderHub';
import { ExecuteBuildPlanPage } from './components/generated/Part 2 - Plan, Manage & Reinforce';
import { ManageCallsPage } from './components/generated/ManageCallsPage';
import { ProspectingConfidencePage } from './components/generated/ProspectingConfidencePage';
import { SignInPage } from './components/generated/SignInPage';
import { SignUpPage } from './components/generated/SignUpPage';
import { NetworkEngagerPage } from './components/generated/NetworkEngagerPage';
import { OpportunityConverterPage } from './components/generated/OpportunityConverterPage';
import { ProspectReactivatorPage } from './components/generated/ProspectReactivatorPage';
import { BorBroComingSoon } from './components/generated/BorBroComingSoon';
import { HomePage } from './components/generated/HomePage';
import { useAuth } from '@/contexts/AuthContext';

const theme: Theme = 'light';
// only use 'centered' container for standalone components, never for full page apps or websites.
const container: Container = 'none';

const PUBLIC_PAGES = new Set(['sign-in', 'sign-up']);
const DEFAULT_PROTECTED_PAGE = 'home';

function App() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>('sign-in');
  const [pendingPage, setPendingPage] = useState<string | null>(DEFAULT_PROTECTED_PAGE);

  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  const normalizePage = useCallback((page?: string) => page ?? DEFAULT_PROTECTED_PAGE, []);

  const requiresAuth = useCallback(
    (page: string) => !PUBLIC_PAGES.has(page),
    [],
  );

  const navigateTo = useCallback(
    (page?: string) => {
      const target = normalizePage(page);

      if (!user && requiresAuth(target)) {
        setPendingPage(target);
        setCurrentPage('sign-in');
        return;
      }

      setCurrentPage(target);
      setPendingPage(null);
    },
    [normalizePage, requiresAuth, user],
  );

  // Listen for custom navigation events
  useEffect(() => {
    const handleNavigation = (event: CustomEvent<{ page?: string }>) => {
      navigateTo(event.detail?.page);
    };

    window.addEventListener('navigate', handleNavigation);
    return () => {
      window.removeEventListener('navigate', handleNavigation);
    };
  }, [navigateTo]);

  // React to auth state changes
  useEffect(() => {
    if (loading) return;

    if (user) {
      setCurrentPage(prev => {
        if (PUBLIC_PAGES.has(prev)) {
          return pendingPage ?? DEFAULT_PROTECTED_PAGE;
        }
        return prev ?? DEFAULT_PROTECTED_PAGE;
      });
      setPendingPage(null);
    } else {
      setPendingPage(prev => prev ?? DEFAULT_PROTECTED_PAGE);
      setCurrentPage(prev => (PUBLIC_PAGES.has(prev) ? prev : 'sign-in'));
    }
  }, [loading, pendingPage, user]);

  const generatedComponent = useMemo(() => {
    // Route to different pages based on currentPage state
    switch (currentPage) {
      case 'pipeline-reactivator':
        return <PipelineReactivatorPage />;
      case 'opportunities':
        return <OpportunityConverterPage />;
      case 'network':
        return <ProspectReactivatorPage />;
      case 'revenue-stacker':
        return <RevenueStackerPage />;
      case 'target-prospects':
        return <TargetProspectsPage />;
      case 'objections-feedback':
        return <ObjectionsFeedbackPage />;
      case 'execute-build-plan':
        return <ExecuteBuildPlanPage />;
      case 'manage-calls':
        return <ManageCallsPage />;
      case 'prospecting-confidence':
        return <ProspectingConfidencePage />;
      case 'script-builder-hub':
        return <ScriptBuilderHub />;
      case 'script-builder-editor':
        return <ScriptBuilderPage />;
      case 'network-engager':
        return <NetworkEngagerPage />;
      case 'bor-bro':
        return <BorBroComingSoon />;
      case 'sign-in':
        return <SignInPage />;
      case 'sign-up':
        return <SignUpPage />;
      case 'home':
        return <HomePage />;
      default:
        return <HomePage />;
    }
  }, [currentPage]);

  const loadingComponent = (
    <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
      Checking account&hellip;
    </div>
  );

  if (container === 'centered') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        {loading ? loadingComponent : generatedComponent}
      </div>
    );
  } else {
    return loading ? loadingComponent : generatedComponent;
  }
}

export default App;
