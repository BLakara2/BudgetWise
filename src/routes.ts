import Dashboard from './pages/Dashboard.svelte';
import Transactions from './pages/Transactions.svelte';
import Analytics from './pages/Analytics.svelte';
import Goals from './pages/Goals.svelte';
import Statistics from './pages/Statistics.svelte';
import Budgets from './pages/Budgets.svelte';
import Settings from './pages/Settings.svelte';

export const routes = {
  '/': Dashboard,
  '/dashboard': Dashboard,
  '/transactions': Transactions,
  '/analytics': Analytics,
  '/goals': Goals,
  '/stats': Statistics,
  '/budgets': Budgets,
  '/settings': Settings,
};
