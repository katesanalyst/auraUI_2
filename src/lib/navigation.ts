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
    href: '/apps',
    children: [
      { title: 'Contacts', icon: 'Contacts', href: '/apps/contacts' },
      { title: 'Chat', icon: 'Chat', href: '/apps/chat', chip: '3', chipColor: 'secondary' },
      { title: 'Notes', icon: 'Notes', href: '/apps/notes' },
      { title: 'Calendar', icon: 'CalendarMonth', href: '/apps/calendar' },
      { title: 'Email', icon: 'Email', href: '/apps/email', chip: '5', chipColor: 'primary' },
      { title: 'Tickets', icon: 'ConfirmationNumber', href: '/apps/tickets' },
    ],
  },
  {
    title: 'Pages',
    icon: 'Description',
    href: '/pages',
    children: [
      { title: 'Pricing', icon: 'Circle', href: '/pages/pricing' },
      { title: 'FAQ', icon: 'Circle', href: '/pages/faq' },
      { title: 'Account Settings', icon: 'Circle', href: '/pages/account-settings' },
      { title: 'Landingpage', icon: 'Circle', href: '/pages/landing' },
    ],
  },
  {
    title: 'Forms',
    icon: 'EditNote',
    href: '/forms',
    children: [
      { title: 'Form Elements', icon: 'Circle', href: '/forms/elements' },
      { title: 'Form Layout', icon: 'Circle', href: '/forms/layout' },
      { title: 'Form Validation', icon: 'Circle', href: '/forms/validation' },
      { title: 'Form Wizard', icon: 'Circle', href: '/forms/wizard' },
    ],
  },
  {
    title: 'Tables',
    icon: 'TableChart',
    href: '/tables',
    children: [
      { title: 'Basic Table', icon: 'Circle', href: '/tables/basic' },
      { title: 'Data Grid', icon: 'Circle', href: '/tables/data-grid' },
    ],
  },
  {
    title: 'Charts',
    icon: 'BarChart',
    href: '/charts',
    children: [
      { title: 'Line', icon: 'Circle', href: '/charts/line' },
      { title: 'Bar', icon: 'Circle', href: '/charts/bar' },
      { title: 'Pie', icon: 'Circle', href: '/charts/pie' },
      { title: 'Area', icon: 'Circle', href: '/charts/area' },
    ],
  },
  {
    title: 'Widgets',
    icon: 'Widgets',
    href: '/widgets',
  },
  {
    title: 'Authentication',
    icon: 'Lock',
    href: '/auth',
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
    href: '/utilities',
    children: [
      { title: 'Typography', icon: 'Circle', href: '/utilities/typography' },
      { title: 'Color', icon: 'Circle', href: '/utilities/color' },
      { title: 'Shadow', icon: 'Circle', href: '/utilities/shadow' },
      { title: 'Icons', icon: 'Circle', href: '/utilities/icons' },
    ],
  },
];
