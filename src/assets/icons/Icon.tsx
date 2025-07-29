// src/assets/icons/Icon.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// Import all solid icons you need
import { 
  faQuestionCircle,
  faChartLine,
  faCode,
  faArrowRight,
  faCheckCircle,
  faTimes,
  faChevronLeft,
  faMoon,
  faSun,
  faBars,
  faCheck,
  faEnvelope,
  faPhoneAlt,
  faMapMarkerAlt,
  faClock,
  faCloudUploadAlt,
  faFileAlt,
  faSpinner,
  faShoppingCart,
  faTasks,
  faMobileAlt,
  faCalculator,
  faUser,
  faUserTie,
  faCopy,
  faT
} from '@fortawesome/free-solid-svg-icons';

// Import all brand icons you need
import { 
  faLinkedinIn, 
  faGithub, 
  faFonticonsFi,
  faBehance,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';

// Define all icon names
export type SolidIconName =
  | 'chart-line'
  | 'code'
  | 'arrow-right'
  | 'check-circle'
  | 'times'
  | 'chevron-left'
  | 'moon'
  | 'sun'
  | 'bars'
  | 'check'
  | 'envelope'
  | 'phone-alt'
  | 'map-marker-alt'
  | 'clock'
  | 'cloud-upload-alt'
  | 'file-alt'
  | 'spinner'
  | 'shopping-cart'
  | 'tasks'
  | 'mobile-alt'
  | 'calculator'
  | 'user' // Add this
  | 'user-tie' // Add this
  | 'copy' // Add this
  | 'check'; // Add this;

export type BrandIconName =
  | 'linkedin-in'
  | 'github'
  | 'fonticons-fi'
  | 'behance'
  | 'twitter-x'; // Add this if you have a Twitter icon

type IconName = SolidIconName | BrandIconName;

// Create icon maps
const solidIconMap: Record<SolidIconName, IconDefinition> = {
  'chart-line': faChartLine,
  'code': faCode,
  'arrow-right': faArrowRight,
  'check-circle': faCheckCircle,
  'times': faTimes,
  'chevron-left': faChevronLeft,
  'moon': faMoon,
  'sun': faSun,
  'bars': faBars,
  'check': faCheck,
  'envelope': faEnvelope,
  'phone-alt': faPhoneAlt,
  'map-marker-alt': faMapMarkerAlt,
  'clock': faClock,
  'cloud-upload-alt': faCloudUploadAlt,
  'file-alt': faFileAlt,
  'spinner': faSpinner,
  'shopping-cart': faShoppingCart,
  'tasks': faTasks,
  'mobile-alt': faMobileAlt,
  'calculator': faCalculator,
  'user': faUser,
  'user-tie':faUserTie,
  'copy': faCopy,
};

const brandIconMap: Record<BrandIconName, IconDefinition> = {
  'linkedin-in': faLinkedinIn,
  'github': faGithub,
  'fonticons-fi': faFonticonsFi,
  'behance': faBehance,
  'twitter-x': faTwitter, // Ensure you have this icon imported
};

// Combined props
// Update IconProps to handle brand icons differently
type IconProps = {
  icon: IconName | { brand: BrandIconName };
  className?: string;
};

export const Icon = ({ icon, className = '' }: IconProps) => {
  let iconDefinition: IconDefinition;
  
  if (typeof icon === 'object' && 'brand' in icon) {
    // Handle brand icons
    iconDefinition = brandIconMap[icon.brand] || faQuestionCircle;
  } else if (typeof icon === 'string') {
    // Handle solid icons
    iconDefinition = solidIconMap[icon as SolidIconName] || faQuestionCircle;
  } else {
    iconDefinition = faQuestionCircle;
  }

  return <FontAwesomeIcon icon={iconDefinition} className={className} />;
};

// Initialize FontAwesome library (optional - can also be in a separate file)
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(
  ...Object.values(solidIconMap),
  ...Object.values(brandIconMap)
);