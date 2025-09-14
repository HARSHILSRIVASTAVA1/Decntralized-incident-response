import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { Upload, FileText, Shield, Hash } from "lucide-react";
import { cn } from "@/lib/utils";

interface EvidenceFile {
  file: File;
  hash: string;
  signature: string;
  status: 'pending' | 'processing' | 'verified' | 'error';
  txHash?: string;
  ipfsCid?: string;
  timestamp?: string;
}

export const EvidenceUpload = () => {
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  };

  const processFiles = (files: File[]) => {
    const newEvidenceFiles = files.map(file => ({
      file,
      hash: generateHash(file.name + file.size), // Simplified hash for demo
      signature: generateSignature(file.name), // Simplified signature for demo
      status: 'pending' as const,
      timestamp: new Date().toISOString(),
    }));

    setEvidenceFiles(prev => [...prev, ...newEvidenceFiles]);
    
    // Simulate processing
    newEvidenceFiles.forEach((evidence, index) => {
      setTimeout(() => {
        setEvidenceFiles(prev => 
          prev.map(item => 
            item === evidence 
              ? { 
                  ...item, 
                  status: 'processing',
                  txHash: `0x${Math.random().toString(16).substr(2, 8)}...`
                }
              : item
          )
        );
      }, 1000 * (index + 1));

      setTimeout(() => {
        setEvidenceFiles(prev => 
          prev.map(item => 
            item === evidence 
              ? { 
                  ...item, 
                  status: 'verified',
                  ipfsCid: `Qm${Math.random().toString(36).substr(2, 44)}`
                }
              : item
          )
        );
      }, 3000 * (index + 1));
    });
  };

  const generateHash = (input: string) => {
    // Simplified hash generation for demo
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return `0x${Math.abs(hash).toString(16)}`;
  };

  const generateSignature = (input: string) => {
    return `sig_${input.slice(0, 8)}_${Date.now().toString(36)}`;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-card card-3d">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="pulse-3d">
              <Upload className="h-5 w-5 text-primary" />
            </div>
            Submit Evidence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-smooth transform",
              isDragging 
                ? "border-primary bg-primary/5 shadow-secure scale-105 rotate-1" 
                : "border-border hover:border-primary/50 hover:scale-[1.02]"
            )}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
          >
            <div className={isDragging ? "animate-pulse3d" : "float-animation"}>
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            </div>
            <h3 className="text-lg font-medium mb-2">Drop evidence files here</h3>
            <p className="text-muted-foreground mb-4">
              Logs, PCAP dumps, documents, or any digital evidence
            </p>
            <Input
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
              id="evidence-upload"
            />
            <Button asChild variant="outline" className="btn-3d">
              <label htmlFor="evidence-upload" className="cursor-pointer">
                Select Files
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      {evidenceFiles.length > 0 && (
        <Card className="shadow-card card-3d animate-fade-in">
          <CardHeader>
            <CardTitle>Evidence Records</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {evidenceFiles.map((evidence, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg bg-gradient-card card-3d animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="rotate-3d">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{evidence.file.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Hash className="h-3 w-3" />
                      <span>{evidence.hash}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={evidence.status === 'verified' ? 'pulse-3d' : ''}>
                    <StatusBadge status={evidence.status}>
                      {evidence.status === 'pending' && 'Pending'}
                      {evidence.status === 'processing' && 'Processing'}
                      {evidence.status === 'verified' && 'Verified'}
                      {evidence.status === 'error' && 'Error'}
                    </StatusBadge>
                  </div>
                  {evidence.status === 'verified' && (
                    <div className="float-animation">
                      <Shield className="h-4 w-4 text-accent" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};