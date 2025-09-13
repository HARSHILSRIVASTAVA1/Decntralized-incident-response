import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EvidenceUpload } from "@/components/EvidenceUpload";
import { EvidenceVerification } from "@/components/EvidenceVerification";
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative bg-gradient-hero text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${evidenceHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Incident Evidence
              <span className="block text-primary-glow">Blockchain Registry</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Immutable evidence storage using IPFS and blockchain technology. 
              Secure, verifiable, and tamper-proof incident documentation.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Cryptographically Signed</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span>IPFS Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                <span>Blockchain Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.title} className="bg-gradient-card shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-xs text-accent">↗ {stat.change}</p>
                    </div>
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="text-2xl">Evidence Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Submit Evidence
                </TabsTrigger>
                <TabsTrigger value="verify" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Verify Evidence
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload">
                <EvidenceUpload />
              </TabsContent>
              
              <TabsContent value="verify">
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