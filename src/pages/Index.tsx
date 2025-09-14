import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EvidenceUpload } from "@/components/EvidenceUpload";
import { EvidenceVerification } from "@/components/EvidenceVerification";
import { Background3D } from "@/components/Background3D";
import { Shield, Database, Link, TrendingUp } from "lucide-react";
import evidenceHero from "@/assets/evidence-hero.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("upload");

  const stats = [
    {
      title: "Evidence Records",
      value: "1,247",
      icon: Database,
      change: "+12%"
    },
    {
      title: "Blockchain Txns", 
      value: "892",
      icon: Link,
      change: "+8%"
    },
    {
      title: "Verified Orgs",
      value: "34",
      icon: Shield,
      change: "+3%"
    },
    {
      title: "Success Rate",
      value: "99.8%", 
      icon: TrendingUp,
      change: "+0.1%"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Background3D />
      
      {/* Hero Section */}
      <div 
        className="relative bg-gradient-hero text-white parallax-container"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${evidenceHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="parallax-layer parallax-back opacity-20">
          <div className="float-animation">
            <Shield className="h-32 w-32 text-primary-glow absolute top-20 right-20" />
          </div>
          <div className="rotate-3d">
            <Database className="h-24 w-24 text-accent absolute bottom-20 left-20" />
          </div>
        </div>
        
        <div className="parallax-layer parallax-front">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Incident Evidence
                <span className="block text-primary-glow drop-shadow-lg">Blockchain Registry</span>
              </h1>
              <p className="text-xl mb-8 text-gray-200 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Immutable evidence storage using IPFS and blockchain technology. 
                Secure, verifiable, and tamper-proof incident documentation.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-300 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                  <Shield className="h-4 w-4" />
                  <span>Cryptographically Signed</span>
                </div>
                <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                  <Database className="h-4 w-4" />
                  <span>IPFS Storage</span>
                </div>
                <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                  <Link className="h-4 w-4" />
                  <span>Blockchain Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card 
                key={stat.title} 
                className="bg-gradient-card shadow-card card-3d animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-xs text-accent">↗ {stat.change}</p>
                    </div>
                    <div className="pulse-3d">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Card className="shadow-elevated card-3d animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle className="text-2xl">Evidence Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload" className="flex items-center gap-2 btn-3d">
                  <Database className="h-4 w-4" />
                  Submit Evidence
                </TabsTrigger>
                <TabsTrigger value="verify" className="flex items-center gap-2 btn-3d">
                  <Shield className="h-4 w-4" />
                  Verify Evidence
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="animate-scale-in">
                <EvidenceUpload />
              </TabsContent>
              
              <TabsContent value="verify" className="animate-scale-in">
                <EvidenceVerification />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;