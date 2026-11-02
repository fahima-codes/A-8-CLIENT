import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Mission Split */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
        <img
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800"
          alt="Studio"
          className="rounded-xl object-cover aspect-[4/3] w-full"
        />
        <div>
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Our Mission
          </span>
          <h1 className="text-4xl font-bold mt-2 mb-4">
            Built for Creators, By Creators
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-4">
            StudioSpace is a high-performance peer-to-peer marketplace. We
            connect studio owners who have empty photo cyc walls, cinema sound
            stages, podcast lounges, music suites with creators who need them
            hourly.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We believe professional creation should not require owning expensive
            space. Book transparently, create freely.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-20">
        {[
          { k: '100+', v: 'Verified Spaces' },
          { k: '500+', v: 'Active Creators' },
          { k: '4.8/5', v: 'Average Rating' },
        ].map(s => (
          <Card key={s.v} className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold">{s.k}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.v}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Values */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Why Choose StudioSpace</h2>
        <p className="text-muted-foreground mt-2">
          Everything you need for a smooth creative workflow
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        <Card className="h-full">
          <CardContent className="p-6">
            <DollarSign className="mb-3 text-primary" />
            <h3 className="font-semibold text-lg">Transparent Pricing</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Hourly rate + security deposit shown upfront. No hidden fees on
              checkout.
            </p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardContent className="p-6">
            <ShieldCheck className="mb-3 text-primary" />
            <h3 className="font-semibold text-lg">Secure Booking</h3>
            <p className="text-sm text-muted-foreground mt-2">
              JWT httpOnly cookie auth and double-booking prevention with
              MongoDB checks.
            </p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardContent className="p-6">
            <Users className="mb-3 text-primary" />
            <h3 className="font-semibold text-lg">Creator Community</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Connect with filmmakers, photographers, podcasters, musicians
              across Bangladesh.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <Card className="bg-primary text-primary-foreground text-center">
        <CardContent className="p-10">
          <h2 className="text-3xl font-bold mb-3">Ready to Host Your Space?</h2>
          <p className="mb-6 opacity-90">
            List your studio today and start earning from unused hours.
          </p>
          <Link href="/add-studio">
            <Button variant="secondary" size="lg">
              Add New Studio
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
