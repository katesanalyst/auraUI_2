export interface NavItem {
  title: string;
  icon: string;
  href: string;
  children?: NavItem[];
  chip?: string;
  chipColor?: string;
}

export const sidebarNav: NavItem[] = [
  {
    title: 'Dashboard',
    icon: 'Dashboard',
    href: '/dashboard',
    children: [
      { title: 'Modern', icon: 'Circle', href: '/dashboard/modern' },
      { title: 'eCommerce', icon: 'Circle', href: '/dashboard/ecommerce' },
    ],
  },
  {
    title: 'Apps',
    icon: 'Apps',
    href: '/dashboard/apps',
    children: [
      { title: 'Contacts', icon: 'Contacts', href: '/dashboard/apps/contacts' },
      { title: 'Chat', icon: 'Chat', href: '/dashboard/apps/chat', chip: '3', chipColor: 'secondary' },
      { title: 'Notes', icon: 'Notes', href: '/dashboard/apps/notes' },
      { title: 'Calendar', icon: 'CalendarMonth', href: '/dashboard/apps/calendar' },
      { title: 'Email', icon: 'Email', href: '/dashboard/apps/email', chip: '5', chipColor: 'primary' },
      { title: 'Tickets', icon: 'ConfirmationNumber', href: '/dashboard/apps/tickets' },
    ],
  },
  {
    title: 'Pages',
    icon: 'Description',
    href: '/dashboard/pages',
    children: [
      { title: 'Pricing', icon: 'Circle', href: '/dashboard/pages/pricing' },
      { title: 'FAQ', icon: 'Circle', href: '/dashboard/pages/faq' },
      { title: 'Account Settings', icon: 'Circle', href: '/dashboard/pages/account-settings' },
      { title: 'Landingpage', icon: 'Circle', href: '/dashboard/pages/landing' },
    ],
  },
  {
    title: 'Forms',
    icon: 'EditNote',
    href: '/dashboard/forms',
    children: [
      { title: 'Form Elements', icon: 'Circle', href: '/dashboard/forms/elements' },
      { title: 'Form Layout', icon: 'Circle', href: '/dashboard/forms/layout' },
      { title: 'Form Validation', icon: 'Circle', href: '/dashboard/forms/validation' },
      { title: 'Form Wizard', icon: 'Circle', href: '/dashboard/forms/wizard' },
    ],
  },
  {
    title: 'Tables',
    icon: 'TableChart',
    href: '/dashboard/tables',
    children: [
      { title: 'Basic Table', icon: 'Circle', href: '/dashboard/tables/basic' },
      { title: 'Data Grid', icon: 'Circle', href: '/dashboard/tables/data-grid' },
    ],
  },
  {
    title: 'Charts',
    icon: 'BarChart',
    href: '/dashboard/charts',
    children: [
      { title: 'Line', icon: 'Circle', href: '/dashboard/charts/line' },
      { title: 'Bar', icon: 'Circle', href: '/dashboard/charts/bar' },
      { title: 'Pie', icon: 'Circle', href: '/dashboard/charts/pie' },
      { title: 'Area', icon: 'Circle', href: '/dashboard/charts/area' },
    ],
  },
  {
    title: 'Widgets',
    icon: 'Widgets',
    href: '/dashboard/widgets',
  },
  {
    title: 'Authentication',
    icon: 'Lock',
    href: '/dashboard/auth',
    children: [
      { title: 'Login', icon: 'Circle', href: '/auth/login' },
      { title: 'Register', icon: 'Circle', href: '/auth/register' },
      { title: 'Forgot Password', icon: 'Circle', href: '/auth/forgot-password' },
      { title: 'Two Steps', icon: 'Circle', href: '/auth/two-steps' },
    ],
  },
  {
    title: 'Utilities',
    icon: 'Build',
    href: '/dashboard/utilities',
    children: [
      { title: 'Typography', icon: 'Circle', href: '/dashboard/utilities/typography' },
      { title: 'Color', icon: 'Circle', href: '/dashboard/utilities/color' },
      { title: 'Shadow', icon: 'Circle', href: '/dashboard/utilities/shadow' },
      { title: 'Icons', icon: 'Circle', href: '/dashboard/utilities/icons' },
    ],
  },
];
