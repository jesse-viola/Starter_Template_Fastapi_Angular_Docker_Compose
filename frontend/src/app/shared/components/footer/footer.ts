import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterLink {
  label: string;
  url: string;
}

interface SocialLink {
  platform: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  currentYear = new Date().getFullYear();

  footerSections: FooterSection[] = [
    {
      title: 'Shop',
      links: [
        { label: 'Yarns', url: '/yarns' },
        { label: 'Needles', url: '/needles' },
        { label: 'Patterns', url: '/patterns' },
        { label: 'Kits', url: '/kits' }
      ]
    },
    {
      title: 'Community',
      links: [
        { label: 'Projects', url: '/projects' },
        { label: 'Forum', url: '/forum' },
        { label: 'Blog', url: '/blog' }
      ]
    },
    {
      title: 'About',
      links: [
        { label: 'Our Story', url: '/about' },
        { label: 'Careers', url: '/careers' },
        { label: 'Contact Us', url: '/contact' }
      ]
    }
  ];

  socialLinks: SocialLink[] = [
    { platform: 'Facebook', icon: 'facebook', url: 'https://facebook.com' },
    { platform: 'Twitter', icon: 'close', url: 'https://twitter.com' },
    { platform: 'Instagram', icon: 'camera_alt', url: 'https://instagram.com' }
  ];
}
