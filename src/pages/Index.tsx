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
        className="relative bg-gradient-hero text-white parallax-container min-h-screen flex items-center hero-3d"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 24, 40, 0.95), rgba(30, 41, 59, 0.9)), url(${evidenceHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed'
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
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in text-shadow-glow">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Incident Evidence
                </span>
                <span className="block text-4xl md:text-6xl mt-4 text-white drop-shadow-2xl">
                  Blockchain Registry
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-gray-100 animate-fade-in max-w-3xl mx-auto leading-relaxed" style={{ animationDelay: '0.2s' }}>
                Revolutionary immutable evidence storage using IPFS and blockchain technology. 
                <span className="block mt-2 text-cyan-300 font-semibold">Secure, verifiable, and tamper-proof incident documentation.</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="flex flex-col items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 card-3d">
                  <Shield className="h-8 w-8 text-cyan-400" />
                  <span className="text-white font-semibold">Cryptographically Signed</span>
                </div>
                <div className="flex flex-col items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 card-3d">
                  <Database className="h-8 w-8 text-purple-400" />
                  <span className="text-white font-semibold">IPFS Storage</span>
                </div>
                <div className="flex flex-col items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 card-3d">
                  <Link className="h-8 w-8 text-blue-400" />
                  <span className="text-white font-semibold">Blockchain Verified</span>
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