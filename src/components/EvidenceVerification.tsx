import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/ui/status-badge";
import { Search, CheckCircle, Clock, ExternalLink } from "lucide-react";

interface VerificationResult {
  cid: string;
  hash: string;
  timestamp: string;
  blockNumber: string;
  txHash: string;
  organization: string;
  status: 'verified' | 'not-found';
}

export const EvidenceVerification = () => {
  const [cid, setCid] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = async () => {
    if (!cid.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock verification result
      const mockResult: VerificationResult = {
        cid: cid,
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        blockNumber: Math.floor(Math.random() * 1000000).toString(),
        txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        organization: "SecureOrg Inc.",
        status: Math.random() > 0.2 ? 'verified' : 'not-found'
      };
      
      setResult(mockResult);
      setIsSearching(false);
    }, 2000);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-card card-3d">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="pulse-3d">
              <Search className="h-5 w-5 text-primary" />
            </div>
            Verify Evidence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="cid">IPFS CID or Evidence Hash</Label>
            <Input
              id="cid"
              placeholder="Qm... or 0x..."
              value={cid}
              onChange={(e) => setCid(e.target.value)}
              className="mt-1 transform transition-all duration-200 focus:scale-[1.02]"
            />
          </div>
          <Button 
            onClick={handleVerify}
            disabled={!cid.trim() || isSearching}
            className="w-full btn-3d"
          >
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                Searching Blockchain...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Verify Evidence
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="shadow-elevated card-3d animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Verification Result</CardTitle>
              <div className={result.status === 'verified' ? 'pulse-3d' : ''}>
                <StatusBadge status={result.status === 'verified' ? 'verified' : 'error'}>
                  {result.status === 'verified' ? 'Verified' : 'Not Found'}
                </StatusBadge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {result.status === 'verified' ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-accent animate-fade-in">
                  <div className="float-animation">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Evidence successfully verified on blockchain</span>
                </div>
                
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg card-3d animate-fade-in" style={{ animationDelay: '0.1s' }}>
                      <Label className="text-xs text-muted-foreground">IPFS CID</Label>
                      <p className="font-mono text-sm break-all">{result.cid}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg card-3d animate-fade-in" style={{ animationDelay: '0.2s' }}>
                      <Label className="text-xs text-muted-foreground">Evidence Hash</Label>
                      <p className="font-mono text-sm break-all">{result.hash}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg card-3d animate-fade-in" style={{ animationDelay: '0.3s' }}>
                      <Label className="text-xs text-muted-foreground">Timestamp</Label>
                      <div className="flex items-center gap-2">
                        <div className="rotate-3d">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <span className="text-sm">{formatTimestamp(result.timestamp)}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg card-3d animate-fade-in" style={{ animationDelay: '0.4s' }}>
                      <Label className="text-xs text-muted-foreground">Organization</Label>
                      <p className="text-sm font-medium">{result.organization}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg card-3d animate-fade-in" style={{ animationDelay: '0.5s' }}>
                      <Label className="text-xs text-muted-foreground">Block Number</Label>
                      <p className="font-mono text-sm">{result.blockNumber}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg card-3d animate-fade-in" style={{ animationDelay: '0.6s' }}>
                      <Label className="text-xs text-muted-foreground">Transaction Hash</Label>
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-sm break-all">{result.txHash}</p>
                        <Button variant="ghost" size="sm" className="btn-3d">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 animate-fade-in">
                <div className="text-destructive mb-2">Evidence not found</div>
                <p className="text-muted-foreground text-sm">
                  No record found for the provided CID or hash
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};