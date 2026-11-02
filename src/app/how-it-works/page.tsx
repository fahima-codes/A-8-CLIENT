'use client';
import {
  Search,
  CalendarCheck,
  CreditCard,
  Camera,
  Building2,
  BadgeCheck,
  Banknote,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

const creatorSteps = [
  {
    no: '01',
    icon: Search,
    title: 'Discover Spaces',
    desc: 'Filter by Photo Studio, Film Stage, Podcast Lounge, Music Suite, Art Workshop by location, price and rating.',
  },
  {
    no: '02',
    icon: CalendarCheck,
    title: 'Select Shoot Hours',
    desc: 'Check real-time availability calendar. See hourly rate and security deposit with transparent pricing.',
  },
  {
    no: '03',
    icon: CreditCard,
    title: 'Book Instantly',
    desc: 'Secure booking with JWT httpOnly protection. No double-booking, instant confirmation with toast.',
  },
  {
    no: '04',
    icon: Camera,
    title: 'Create & Produce',
    desc: 'Check-in, shoot, record, and leave a review to support the host community.',
  },
];

const hostSteps = [
  {
    no: '01',
    icon: Building2,
    title: 'List Your Space',
    desc: 'Add title, category, hourly rate, deposit, amenities, and upload images via imgbb.',
  },
  {
    no: '02',
    icon: BadgeCheck,
    title: 'Get Verified',
    desc: 'We verify profiles and spaces to build trust and ensure equipment safety.',
  },
  {
    no: '03',
    icon: CalendarCheck,
    title: 'Get Booked',
    desc: 'Manage availability, confirm bookings, and track earnings from dashboard.',
  },
  {
    no: '04',
    icon: Banknote,
    title: 'Get Paid',
    desc: 'Secure payouts with liability protection and 24/7 host support.',
  },
];

export default function HowItWorksPage() {
  const [tab, setTab] = useState<'creator' | 'host'>('creator');
  const steps = tab === 'creator' ? creatorSteps : hostSteps;

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          How StudioSpace Works
        </h1>
        <p className="text-muted-foreground text-lg">
          From discovery to creation in 4 simple steps. Designed for filmmakers,
          photographers, podcasters and musicians.
        </p>
        <div className="flex justify-center gap-3 mt-6">
          <Button
            variant={tab === 'creator' ? 'default' : 'outline'}
            onClick={() => setTab('creator')}
          >
            For Creators
          </Button>
          <Button
            variant={tab === 'host' ? 'default' : 'outline'}
            onClick={() => setTab('host')}
          >
            For Hosts
          </Button>
        </div>
      </div>

      {/* Steps Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {steps.map(s => (
          <Card key={s.no} className="h-full hover:shadow-lg transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center">
                  {s.no}
                </span>
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust */}
      <Card className="bg-muted/50 border-dashed">
        <CardContent className="p-8 grid md:grid-cols-3 gap-6 text-center">
          <div>
            <BadgeCheck className="mx-auto mb-2" />
            <h4 className="font-semibold">Verified Profiles</h4>
            <p className="text-sm text-muted-foreground">
              Every host and creator is reviewed
            </p>
          </div>
          <div>
            <Building2 className="mx-auto mb-2" />
            <h4 className="font-semibold">Equipment Safety</h4>
            <p className="text-sm text-muted-foreground">
              Liability protection & deposit system
            </p>
          </div>
          <div>
            <CalendarCheck className="mx-auto mb-2" />
            <h4 className="font-semibold">24/7 Support</h4>
            <p className="text-sm text-muted-foreground">
              We help you before and after booking
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mt-10">
        <Link href="/studios">
          <Button size="lg">Explore Studios</Button>
        </Link>
      </div>
    </div>
  );
}
