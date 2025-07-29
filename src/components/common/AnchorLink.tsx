// src/components/common/AnchorLink.tsx
import { Link, LinkProps } from 'react-router-dom';
import { HTMLAttributes } from 'react';

type AnchorLinkProps = LinkProps & HTMLAttributes<HTMLAnchorElement>;

export function AnchorLink({ to, children, className, ...props }: AnchorLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(to.toString().replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Link 
      to={to} 
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}


// for use this link two setps
// 1. Import AnchorLink from '../common/AnchorLink';
// 2. Use it like this:
// <AnchorLink to="#sectionId">Link Text</AnchorLink>
