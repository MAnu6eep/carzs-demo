export interface ComponentRegistryItem {
  id: string;
  name: string;
  type: 'NAVIGATION' | 'SECTION' | 'CONTAINER' | 'CARD' | 'BUTTON' | 'INPUT' | 'SELECT' | 'DROPDOWN' | 'FILTER' | 'SORT' | 'TABLE' | 'FORM' | 'MODAL' | 'DRAWER' | 'BADGE' | 'IMAGE' | 'TEXT' | 'CTA' | 'FOOTER';
  page: string; // '/' | '/cars' | '/cars/[id]' | '/compare' | '/sell-your-car' | '/finance' | '/about' | '/contact' | '/faq' | '/login' | '/register' | '/account' | '/admin' | 'Global'
  location: string;
  sourceFile: string;
  reusable?: boolean;
  usedOnPages?: string[];
  description?: string;
  status?: 'Implemented' | 'Reusable' | 'Deprecated';
}

export const COMPONENT_REGISTRY: ComponentRegistryItem[] = [
  // GLOBAL / NAVIGATION
  {
    id: 'NAV-001',
    name: 'Main Header Container',
    type: 'NAVIGATION',
    page: 'Global',
    location: 'Top sticky header bar',
    sourceFile: 'src/components/Navbar.tsx',
    reusable: true,
    usedOnPages: ['All Pages'],
    status: 'Reusable'
  },
  {
    id: 'NAV-002',
    name: 'Brand Logo & Title',
    type: 'IMAGE',
    page: 'Global',
    location: 'Header → Left',
    sourceFile: 'src/components/Navbar.tsx',
    reusable: true,
    usedOnPages: ['All Pages'],
    status: 'Reusable'
  },
  {
    id: 'NAV-003',
    name: 'Desktop Navigation Menu',
    type: 'CONTAINER',
    page: 'Global',
    location: 'Header → Center',
    sourceFile: 'src/components/Navbar.tsx',
    reusable: true,
    status: 'Implemented'
  },
  {
    id: 'NAV-004',
    name: 'Buy Used Cars Link',
    type: 'CTA',
    page: 'Global',
    location: 'Header → Center (Item 1)',
    sourceFile: 'src/components/Navbar.tsx',
    reusable: true,
    status: 'Implemented'
  },
  {
    id: 'NAV-005',
    name: 'Sell Your Car Link',
    type: 'CTA',
    page: 'Global',
    location: 'Header → Center (Item 2)',
    sourceFile: 'src/components/Navbar.tsx',
    reusable: true,
    status: 'Implemented'
  },
  {
    id: 'NAV-006',
    name: 'Compare Cars Link',
    type: 'CTA',
    page: 'Global',
    location: 'Header → Center (Item 3)',
    sourceFile: 'src/components/Navbar.tsx',
    reusable: true,
    status: 'Implemented'
  },
  {
    id: 'NAV-007',
    name: 'EMI Calculator Link',
    type: 'CTA',
    page: 'Global',
    location: 'Header → Center (Item 4)',
    sourceFile: 'src/components/Navbar.tsx',
    reusable: true,
    status: 'Implemented'
  },
  {
    id: 'NAV-008',
    name: 'Why AutoNest Link',
    type: 'CTA',
    page: 'Global',
    location: 'Header → Center (Item 5)',
    sourceFile: 'src/components/Navbar.tsx',
    reusable: true,
    status: 'Implemented'
  },
  {
    id: 'NAV-009',
    name: 'Contact Us Link',
    type: 'CTA',
    page: 'Global',
    location: 'Header → Center (Item 6)',
    sourceFile: 'src/components/Navbar.tsx',
    reusable: true,
    status: 'Implemented'
  },
  {
    id: 'NAV-010',
    name: 'Sell Car Header CTA Button',
    type: 'BUTTON',
    page: 'Global',
    location: 'Header → Right (CTA 1)',
    sourceFile: 'src/components/Navbar.tsx',
    reusable: true,
    status: 'Implemented'
  },
  {
    id: 'NAV-011',
    name: 'Wishlist Heart Icon Button',
    type: 'BUTTON',
    page: 'Global',
    location: 'Header → Right (Item 2)',
    sourceFile: 'src/components/Navbar.tsx',
    reusable: true,
    status: 'Implemented'
  },
  {
    id: 'NAV-012',
    name: 'User Profile Menu Button',
    type: 'BUTTON',
    page: 'Global',
    location: 'Header → Right (Item 3)',
    sourceFile: 'src/components/Navbar.tsx',
    reusable: true,
    status: 'Implemented'
  },
  {
    id: 'NAV-013',
    name: 'Admin Dashboard Badge',
    type: 'BADGE',
    page: 'Global',
    location: 'Header → Right (Conditional)',
    sourceFile: 'src/components/Navbar.tsx',
    reusable: true,
    status: 'Implemented'
  },
  {
    id: 'NAV-014',
    name: 'Header Logout Button',
    type: 'BUTTON',
    page: 'Global',
    location: 'Header → Right (Conditional)',
    sourceFile: 'src/components/Navbar.tsx',
    reusable: true,
    status: 'Implemented'
  },
  {
    id: 'NAV-015',
    name: 'Mobile Hamburger Toggle',
    type: 'BUTTON',
    page: 'Global',
    location: 'Header → Right (Mobile only)',
    sourceFile: 'src/components/Navbar.tsx',
    reusable: true,
    status: 'Implemented'
  },
  {
    id: 'NAV-016',
    name: 'Mobile Navigation Drawer',
    type: 'DRAWER',
    page: 'Global',
    location: 'Header → Below main bar',
    sourceFile: 'src/components/Navbar.tsx',
    reusable: true,
    status: 'Implemented'
  },

  // HOMEPAGE
  {
    id: 'HERO-001',
    name: 'Hero Section Container',
    type: 'SECTION',
    page: '/',
    location: 'Homepage top below header',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'HERO-002',
    name: 'Hero Trust Badge Pill',
    type: 'BADGE',
    page: '/',
    location: 'Hero section → Top left',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'HERO-003',
    name: 'Hero Main Headline',
    type: 'TEXT',
    page: '/',
    location: 'Hero section → Left center',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'HERO-004',
    name: 'Hero Subtitle Text',
    type: 'TEXT',
    page: '/',
    location: 'Hero section → Below headline',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'HERO-005',
    name: 'Quick Trust Highlights',
    type: 'CONTAINER',
    page: '/',
    location: 'Hero section → Left bottom',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'SEARCH-001',
    name: 'Vehicle Search Form Box',
    type: 'FORM',
    page: '/',
    location: 'Hero section → Right',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'SEARCH-002',
    name: 'Make/Brand Selector',
    type: 'SELECT',
    page: '/',
    location: 'Search box → Row 1',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'SEARCH-003',
    name: 'Body Type Selector',
    type: 'SELECT',
    page: '/',
    location: 'Search box → Row 2 Left',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'SEARCH-004',
    name: 'Max Price Selector',
    type: 'SELECT',
    page: '/',
    location: 'Search box → Row 2 Right',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'SEARCH-005',
    name: 'Fuel Type Selector',
    type: 'SELECT',
    page: '/',
    location: 'Search box → Row 3 Left',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'SEARCH-006',
    name: 'Transmission Selector',
    type: 'SELECT',
    page: '/',
    location: 'Search box → Row 3 Right',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'SEARCH-007',
    name: 'Search CTA Button',
    type: 'CTA',
    page: '/',
    location: 'Search box → Bottom',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'BRAND-001',
    name: 'Brand Carousel Section',
    type: 'SECTION',
    page: '/',
    location: 'Below Hero section',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'BRAND-002',
    name: 'Brand Tile Card',
    type: 'CARD',
    page: '/',
    location: 'Brand section grid',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },

  // CAR CARD (REUSABLE)
  {
    id: 'CARD-001',
    name: 'Reusable Vehicle Card',
    type: 'CARD',
    page: '/cars',
    location: 'Inventory grids',
    sourceFile: 'src/components/CarCard.tsx',
    reusable: true,
    usedOnPages: ['/', '/cars', '/cars/[id]', '/account/favourites'],
    status: 'Reusable'
  },
  {
    id: 'CARD-002',
    name: 'Primary Car Image',
    type: 'IMAGE',
    page: '/cars',
    location: 'Vehicle card top',
    sourceFile: 'src/components/CarCard.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'CARD-003',
    name: 'Inspection Score Badge',
    type: 'BADGE',
    page: '/cars',
    location: 'Vehicle card image overlay top-left',
    sourceFile: 'src/components/CarCard.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'CARD-004',
    name: 'Favourite Heart Button',
    type: 'BUTTON',
    page: '/cars',
    location: 'Vehicle card image overlay top-right',
    sourceFile: 'src/components/CarCard.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'CARD-005',
    name: 'Title & Variant Text',
    type: 'TEXT',
    page: '/cars',
    location: 'Vehicle card content top',
    sourceFile: 'src/components/CarCard.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'CARD-006',
    name: 'Quick Specs Pill Bar',
    type: 'CONTAINER',
    page: '/cars',
    location: 'Vehicle card middle',
    sourceFile: 'src/components/CarCard.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'CARD-007',
    name: 'Price Display',
    type: 'TEXT',
    page: '/cars',
    location: 'Vehicle card bottom left',
    sourceFile: 'src/components/CarCard.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'CARD-008',
    name: 'Estimated Monthly EMI Pill',
    type: 'BADGE',
    page: '/cars',
    location: 'Vehicle card bottom under price',
    sourceFile: 'src/components/CarCard.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'CARD-009',
    name: 'Location Badge',
    type: 'BADGE',
    page: '/cars',
    location: 'Vehicle card bottom right',
    sourceFile: 'src/components/CarCard.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'CARD-010',
    name: 'View Details Button',
    type: 'CTA',
    page: '/cars',
    location: 'Vehicle card bottom',
    sourceFile: 'src/components/CarCard.tsx',
    reusable: true,
    status: 'Reusable'
  },

  // HOMEPAGE SECTIONS
  {
    id: 'TRUST-001',
    name: 'Trust Guarantee Section',
    type: 'SECTION',
    page: '/',
    location: 'Below Featured Cars',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'TRUST-002',
    name: '200+ Pt Inspection Card',
    type: 'CARD',
    page: '/',
    location: 'Trust section grid (Card 1)',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'TRUST-003',
    name: '5-Day Moneyback Card',
    type: 'CARD',
    page: '/',
    location: 'Trust section grid (Card 2)',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'TRUST-004',
    name: 'Transparent EMI Card',
    type: 'CARD',
    page: '/',
    location: 'Trust section grid (Card 3)',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'TRUST-005',
    name: '1-Year Warranty Card',
    type: 'CARD',
    page: '/',
    location: 'Trust section grid (Card 4)',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'HOW-001',
    name: 'How It Works Section',
    type: 'SECTION',
    page: '/',
    location: 'Below Trust section',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'HOW-002',
    name: 'Process Step Card',
    type: 'CARD',
    page: '/',
    location: 'How It Works grid',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'SELL-001',
    name: 'Sell Your Car CTA Banner',
    type: 'SECTION',
    page: '/',
    location: 'Below How It Works',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'REV-001',
    name: 'Customer Reviews Section',
    type: 'SECTION',
    page: '/',
    location: 'Below Sell Banner',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'REV-002',
    name: 'Review Card',
    type: 'CARD',
    page: '/',
    location: 'Reviews grid',
    sourceFile: 'src/app/page.tsx',
    status: 'Implemented'
  },

  // CARS LISTING PAGE
  {
    id: 'FILTER-001',
    name: 'Filter Drawer / Sidebar',
    type: 'DRAWER',
    page: '/cars',
    location: 'Inventory page left',
    sourceFile: 'src/app/cars/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'FILTER-002',
    name: 'Filter Search Input',
    type: 'INPUT',
    page: '/cars',
    location: 'Inventory header top right',
    sourceFile: 'src/app/cars/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'FILTER-003',
    name: 'Brand Filter Select',
    type: 'SELECT',
    page: '/cars',
    location: 'Filter sidebar → Section 1',
    sourceFile: 'src/app/cars/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'FILTER-004',
    name: 'Max Price Filter Select',
    type: 'SELECT',
    page: '/cars',
    location: 'Filter sidebar → Section 2',
    sourceFile: 'src/app/cars/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'FILTER-005',
    name: 'Fuel Type Pill Selector',
    type: 'FILTER',
    page: '/cars',
    location: 'Filter sidebar → Section 3',
    sourceFile: 'src/app/cars/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'FILTER-006',
    name: 'Transmission Pill Selector',
    type: 'FILTER',
    page: '/cars',
    location: 'Filter sidebar → Section 4',
    sourceFile: 'src/app/cars/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'FILTER-007',
    name: 'Body Type Pill Selector',
    type: 'FILTER',
    page: '/cars',
    location: 'Filter sidebar → Section 5',
    sourceFile: 'src/app/cars/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'FILTER-008',
    name: 'City Location Select',
    type: 'SELECT',
    page: '/cars',
    location: 'Filter sidebar → Section 6',
    sourceFile: 'src/app/cars/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'FILTER-009',
    name: 'Min Model Year Select',
    type: 'SELECT',
    page: '/cars',
    location: 'Filter sidebar → Section 7',
    sourceFile: 'src/app/cars/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'FILTER-010',
    name: 'Reset Filters Button',
    type: 'BUTTON',
    page: '/cars',
    location: 'Filter sidebar top right',
    sourceFile: 'src/app/cars/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'SORT-001',
    name: 'Sort Selection Bar',
    type: 'SORT',
    page: '/cars',
    location: 'Inventory content top',
    sourceFile: 'src/app/cars/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'SORT-002',
    name: 'Sort Dropdown Selector',
    type: 'SELECT',
    page: '/cars',
    location: 'Sort bar right',
    sourceFile: 'src/app/cars/page.tsx',
    status: 'Implemented'
  },

  // CAR DETAILS PAGE & GALLERY
  {
    id: 'GALLERY-001',
    name: 'Main Vehicle Gallery',
    type: 'CONTAINER',
    page: '/cars/[id]',
    location: 'Detail page top left',
    sourceFile: 'src/components/CarGallery.tsx',
    reusable: true,
    usedOnPages: ['/cars/[id]'],
    status: 'Reusable'
  },
  {
    id: 'GALLERY-002',
    name: 'Main Active Photo Viewport',
    type: 'IMAGE',
    page: '/cars/[id]',
    location: 'Gallery center',
    sourceFile: 'src/components/CarGallery.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'GALLERY-003',
    name: 'Expand Lightbox Button',
    type: 'BUTTON',
    page: '/cars/[id]',
    location: 'Gallery top right',
    sourceFile: 'src/components/CarGallery.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'GALLERY-004',
    name: 'Photo Counter Badge',
    type: 'BADGE',
    page: '/cars/[id]',
    location: 'Gallery bottom left',
    sourceFile: 'src/components/CarGallery.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'GALLERY-005',
    name: 'Previous/Next Arrows',
    type: 'BUTTON',
    page: '/cars/[id]',
    location: 'Gallery sides',
    sourceFile: 'src/components/CarGallery.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'GALLERY-006',
    name: 'Thumbnail Row',
    type: 'CONTAINER',
    page: '/cars/[id]',
    location: 'Below main photo',
    sourceFile: 'src/components/CarGallery.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'GALLERY-007',
    name: 'Fullscreen Lightbox Modal',
    type: 'MODAL',
    page: '/cars/[id]',
    location: 'Overlay viewport',
    sourceFile: 'src/components/CarGallery.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'DETAIL-001',
    name: 'Vehicle Header Info Card',
    type: 'CARD',
    page: '/cars/[id]',
    location: 'Detail page top right',
    sourceFile: 'src/app/cars/[id]/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'DETAIL-002',
    name: 'Price & EMI Highlight Box',
    type: 'CONTAINER',
    page: '/cars/[id]',
    location: 'Header info card middle',
    sourceFile: 'src/app/cars/[id]/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'ACT-001',
    name: 'Book Test Drive Button',
    type: 'CTA',
    page: '/cars/[id]',
    location: 'Header info card CTAs',
    sourceFile: 'src/app/cars/[id]/DetailPageActions.tsx',
    status: 'Implemented'
  },
  {
    id: 'ACT-002',
    name: 'Get Callback Button',
    type: 'BUTTON',
    page: '/cars/[id]',
    location: 'Header info card CTAs',
    sourceFile: 'src/app/cars/[id]/DetailPageActions.tsx',
    status: 'Implemented'
  },
  {
    id: 'ACT-003',
    name: 'Make Offer Button',
    type: 'BUTTON',
    page: '/cars/[id]',
    location: 'Header info card CTAs',
    sourceFile: 'src/app/cars/[id]/DetailPageActions.tsx',
    status: 'Implemented'
  },
  {
    id: 'ACT-004',
    name: 'Add to Wishlist Button',
    type: 'BUTTON',
    page: '/cars/[id]',
    location: 'Header info card CTAs',
    sourceFile: 'src/app/cars/[id]/DetailPageActions.tsx',
    status: 'Implemented'
  },
  {
    id: 'SPEC-001',
    name: 'Specifications Table Card',
    type: 'CARD',
    page: '/cars/[id]',
    location: 'Detail page middle left',
    sourceFile: 'src/app/cars/[id]/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'INSP-001',
    name: '200+ Pt Inspection Report',
    type: 'CARD',
    page: '/cars/[id]',
    location: 'Detail page middle left',
    sourceFile: 'src/components/InspectionReportCard.tsx',
    reusable: true,
    usedOnPages: ['/cars/[id]'],
    status: 'Reusable'
  },
  {
    id: 'INSP-002',
    name: 'Overall Rating Score Box',
    type: 'CONTAINER',
    page: '/cars/[id]',
    location: 'Inspection report top',
    sourceFile: 'src/components/InspectionReportCard.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'INSP-003',
    name: 'Category Progress Bar',
    type: 'CONTAINER',
    page: '/cars/[id]',
    location: 'Inspection report grid',
    sourceFile: 'src/components/InspectionReportCard.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'INSP-004',
    name: 'Trust Checklist Badges',
    type: 'CONTAINER',
    page: '/cars/[id]',
    location: 'Inspection report bottom',
    sourceFile: 'src/components/InspectionReportCard.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'FEAT-001',
    name: 'Installed Equipment Grid',
    type: 'CARD',
    page: '/cars/[id]',
    location: 'Detail page middle left',
    sourceFile: 'src/app/cars/[id]/page.tsx',
    status: 'Implemented'
  },

  // EMI CALCULATOR (REUSABLE)
  {
    id: 'EMI-001',
    name: 'Live EMI Calculator Widget',
    type: 'CARD',
    page: '/finance',
    location: 'Detail & Finance pages',
    sourceFile: 'src/components/EMICalculatorWidget.tsx',
    reusable: true,
    usedOnPages: ['/cars/[id]', '/finance'],
    status: 'Reusable'
  },
  {
    id: 'EMI-002',
    name: 'Car Price Valuation Slider',
    type: 'INPUT',
    page: '/finance',
    location: 'EMI Calculator top',
    sourceFile: 'src/components/EMICalculatorWidget.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'EMI-003',
    name: 'Down Payment Slider',
    type: 'INPUT',
    page: '/finance',
    location: 'EMI Calculator middle',
    sourceFile: 'src/components/EMICalculatorWidget.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'EMI-004',
    name: 'Interest Rate Input',
    type: 'INPUT',
    page: '/finance',
    location: 'EMI Calculator lower',
    sourceFile: 'src/components/EMICalculatorWidget.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'EMI-005',
    name: 'Loan Tenure Buttons',
    type: 'CONTAINER',
    page: '/finance',
    location: 'EMI Calculator lower',
    sourceFile: 'src/components/EMICalculatorWidget.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'EMI-006',
    name: 'EMI Result Breakdown Card',
    type: 'CARD',
    page: '/finance',
    location: 'EMI Calculator right',
    sourceFile: 'src/components/EMICalculatorWidget.tsx',
    reusable: true,
    status: 'Reusable'
  },

  // COMPARE PAGE
  {
    id: 'COMP-001',
    name: 'Comparison Header',
    type: 'SECTION',
    page: '/compare',
    location: 'Compare page top',
    sourceFile: 'src/app/compare/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'COMP-002',
    name: 'Comparison Vehicle Slot Card',
    type: 'CARD',
    page: '/compare',
    location: 'Compare page top grid',
    sourceFile: 'src/app/compare/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'COMP-003',
    name: 'Vehicle Selector Dropdown',
    type: 'SELECT',
    page: '/compare',
    location: 'Empty comparison slot',
    sourceFile: 'src/app/compare/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'COMP-004',
    name: 'Specs Comparison Table',
    type: 'TABLE',
    page: '/compare',
    location: 'Compare page bottom',
    sourceFile: 'src/app/compare/page.tsx',
    status: 'Implemented'
  },

  // SELL YOUR CAR FORM
  {
    id: 'FORM-001',
    name: 'Sell-Car Form Container',
    type: 'FORM',
    page: '/sell-your-car',
    location: 'Sell page left',
    sourceFile: 'src/app/sell-your-car/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'FORM-002',
    name: 'Vehicle Details Input Group',
    type: 'CONTAINER',
    page: '/sell-your-car',
    location: 'Sell form top',
    sourceFile: 'src/app/sell-your-car/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'FORM-003',
    name: 'Seller Contact Input Group',
    type: 'CONTAINER',
    page: '/sell-your-car',
    location: 'Sell form middle',
    sourceFile: 'src/app/sell-your-car/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'FORM-004',
    name: 'Instant Valuation CTA',
    type: 'CTA',
    page: '/sell-your-car',
    location: 'Sell form bottom',
    sourceFile: 'src/app/sell-your-car/page.tsx',
    status: 'Implemented'
  },

  // MODALS (REUSABLE)
  {
    id: 'MODAL-001',
    name: 'Test Drive Booking Modal',
    type: 'MODAL',
    page: '/cars/[id]',
    location: 'Rendered via CTA buttons',
    sourceFile: 'src/components/TestDriveModal.tsx',
    reusable: true,
    usedOnPages: ['/cars/[id]'],
    status: 'Reusable'
  },
  {
    id: 'MODAL-002',
    name: 'Callback & Enquiry Modal',
    type: 'MODAL',
    page: '/cars/[id]',
    location: 'Rendered via CTA buttons',
    sourceFile: 'src/components/EnquiryModal.tsx',
    reusable: true,
    usedOnPages: ['/cars/[id]'],
    status: 'Reusable'
  },

  // AUTH PAGES
  {
    id: 'AUTH-001',
    name: 'Login Card Container',
    type: 'FORM',
    page: '/login',
    location: 'Login page center',
    sourceFile: 'src/app/login/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'AUTH-002',
    name: 'Quick Demo Fill Buttons',
    type: 'CONTAINER',
    page: '/login',
    location: 'Login page top',
    sourceFile: 'src/app/login/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'AUTH-003',
    name: 'Login Submit Button',
    type: 'CTA',
    page: '/login',
    location: 'Login form bottom',
    sourceFile: 'src/app/login/page.tsx',
    status: 'Implemented'
  },

  // CUSTOMER ACCOUNT AREA
  {
    id: 'ACC-001',
    name: 'Customer Account Layout',
    type: 'CONTAINER',
    page: '/account',
    location: 'Account pages wrapper',
    sourceFile: 'src/app/account/layout.tsx',
    reusable: true,
    usedOnPages: ['/account/profile', '/account/favourites', '/account/test-drives', '/account/enquiries', '/account/settings'],
    status: 'Reusable'
  },
  {
    id: 'ACC-002',
    name: 'Account Sidebar Navigation',
    type: 'NAVIGATION',
    page: '/account',
    location: 'Account area left',
    sourceFile: 'src/app/account/layout.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'ACC-003',
    name: 'Account Profile Card',
    type: 'CARD',
    page: '/account/profile',
    location: 'Profile content',
    sourceFile: 'src/app/account/profile/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'ACC-004',
    name: 'Wishlist Inventory Grid',
    type: 'CONTAINER',
    page: '/account/favourites',
    location: 'Favourites content',
    sourceFile: 'src/app/account/favourites/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'ACC-005',
    name: 'Test Drive Booking List',
    type: 'CONTAINER',
    page: '/account/test-drives',
    location: 'Test Drives content',
    sourceFile: 'src/app/account/test-drives/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'ACC-006',
    name: 'Submitted Enquiry List',
    type: 'CONTAINER',
    page: '/account/enquiries',
    location: 'Enquiries content',
    sourceFile: 'src/app/account/enquiries/page.tsx',
    status: 'Implemented'
  },

  // ADMIN SUITE
  {
    id: 'ADMIN-001',
    name: 'Admin Sidebar Navigation',
    type: 'NAVIGATION',
    page: '/admin',
    location: 'Admin pages left',
    sourceFile: 'src/app/admin/layout.tsx',
    reusable: true,
    usedOnPages: ['/admin/dashboard', '/admin/cars', '/admin/cars/new', '/admin/bookings', '/admin/enquiries', '/admin/sell-leads', '/admin/customers', '/admin/inspections', '/admin/settings'],
    status: 'Reusable'
  },
  {
    id: 'ADMIN-002',
    name: 'Dashboard KPI Metric Card',
    type: 'CARD',
    page: '/admin/dashboard',
    location: 'Admin dashboard top grid',
    sourceFile: 'src/app/admin/dashboard/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'ADMIN-003',
    name: 'Fuel Breakdown Chart Card',
    type: 'CARD',
    page: '/admin/dashboard',
    location: 'Admin dashboard lower left',
    sourceFile: 'src/app/admin/dashboard/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'ADMIN-004',
    name: 'Brand Breakdown Chart Card',
    type: 'CARD',
    page: '/admin/dashboard',
    location: 'Admin dashboard lower right',
    sourceFile: 'src/app/admin/dashboard/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'ADMIN-005',
    name: 'Inventory Management Table',
    type: 'TABLE',
    page: '/admin/cars',
    location: 'Admin inventory page',
    sourceFile: 'src/app/admin/cars/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'ADMIN-006',
    name: 'Stock Status Toggle Button',
    type: 'BUTTON',
    page: '/admin/cars',
    location: 'Inventory table status cell',
    sourceFile: 'src/app/admin/cars/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'ADMIN-007',
    name: 'Vehicle Creation Form',
    type: 'FORM',
    page: '/admin/cars/new',
    location: 'Admin new car page',
    sourceFile: 'src/app/admin/cars/new/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'ADMIN-008',
    name: 'Booking Request Queue',
    type: 'CONTAINER',
    page: '/admin/bookings',
    location: 'Admin test drives page',
    sourceFile: 'src/app/admin/bookings/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'ADMIN-009',
    name: 'Customer Enquiry Manager',
    type: 'CONTAINER',
    page: '/admin/enquiries',
    location: 'Admin enquiries page',
    sourceFile: 'src/app/admin/enquiries/page.tsx',
    status: 'Implemented'
  },
  {
    id: 'ADMIN-010',
    name: 'Valuation Leads Pipeline',
    type: 'CONTAINER',
    page: '/admin/sell-leads',
    location: 'Admin sell leads page',
    sourceFile: 'src/app/admin/sell-leads/page.tsx',
    status: 'Implemented'
  },

  // FOOTER
  {
    id: 'FOOT-001',
    name: 'Global Footer Container',
    type: 'FOOTER',
    page: 'Global',
    location: 'Bottom of page',
    sourceFile: 'src/components/Footer.tsx',
    reusable: true,
    usedOnPages: ['All Pages'],
    status: 'Reusable'
  },
  {
    id: 'FOOT-002',
    name: 'Brand Information Column',
    type: 'CONTAINER',
    page: 'Global',
    location: 'Footer column 1',
    sourceFile: 'src/components/Footer.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'FOOT-003',
    name: 'Top Brands Link Column',
    type: 'CONTAINER',
    page: 'Global',
    location: 'Footer column 2',
    sourceFile: 'src/components/Footer.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'FOOT-004',
    name: 'Services Link Column',
    type: 'CONTAINER',
    page: 'Global',
    location: 'Footer column 3',
    sourceFile: 'src/components/Footer.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'FOOT-005',
    name: 'Dealership Contact Column',
    type: 'CONTAINER',
    page: 'Global',
    location: 'Footer column 4',
    sourceFile: 'src/components/Footer.tsx',
    reusable: true,
    status: 'Reusable'
  },
  {
    id: 'FOOT-006',
    name: 'Copyright & Legal Bar',
    type: 'CONTAINER',
    page: 'Global',
    location: 'Footer bottom',
    sourceFile: 'src/components/Footer.tsx',
    reusable: true,
    status: 'Reusable'
  }
];
