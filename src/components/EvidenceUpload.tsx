"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

// Fake hash + signature generator (demo)
const generateHash = (input: string) =>
  "0x" +
  Array.from(input)
    .map((char) => char.charCodeAt(0).toString(16))
    .join("")
    .slice(0, 64);

const generateSignature = (input: string) =>
  "0xSIG" +
  Array.from(input)
    .map((char) => char.charCodeAt(0).toString(16))
    .join("")
    .slice(0, 32);

interface EvidenceFile {
  file: File;
  hash: string;
  signature: string;
  status: "pending" | "processing" | "verified" | "error";
  timestamp: string;
  txHash?: string;
  ipfsCid?: string;
}

export default function EvidenceUpload() {
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([]);

  // 🔥 Upload handler
  const processFiles = async (files: File[]) => {
    const newEvidenceFiles = files.map((file) => ({
      file,
      hash: generateHash(file.name + file.size),
      signature: generateSignature(file.name),
      status: "pending" as const,
      timestamp: new Date().toISOString(),
    }));

    setEvidenceFiles((prev) => [...prev, ...newEvidenceFiles]);

    for (const evidence of newEvidenceFiles) {
      try {
        // Set → processing
        setEvidenceFiles((prev) =>
          prev.map((item) =>
            item === evidence ? { ...item, status: "processing" } : item
          )
        );

        const formData = new FormData();
        formData.append("file", evidence.file);

        const res = await fetch("http://localhost:5000/api/submit-evidence", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();

        // Success → verified
        setEvidenceFiles((prev) =>
          prev.map((item) =>
            item === evidence
              ? {
                  ...item,
                  status: "verified",
                  txHash:
                    data.txHash ||
                    `0x${Math.random().toString(16).substr(2, 8)}...`,
                  ipfsCid:
                    data.ipfsCid ||
                    `Qm${Math.random().toString(36).substr(2, 44)}`,
                }
              : item
          )
        );
      } catch (err) {
        console.error(err);
        setEvidenceFiles((prev) =>
          prev.map((item) =>
            item === evidence ? { ...item, status: "error" } : item
          )
        );
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <Tabs defaultValue="submit" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="submit">Submit Evidence</TabsTrigger>
        <TabsTrigger value="verify">Verify Evidence</TabsTrigger>
      </TabsList>

      {/* ✅ Submit Evidence */}
      <TabsContent value="submit">
        <div className="space-y-4">
          {/* Upload Area */}
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              id="evidence-upload"
              className="hidden"
              onChange={handleFileUpload}
              multiple
            />
            <label
              htmlFor="evidence-upload"
              className="cursor-pointer text-blue-500 hover:underline"
            >
              Select Files
            </label>{" "}
            or drag and drop here
          </div>

          {/* Evidence Cards */}
          <div className="space-y-4">
            {evidenceFiles.map((evidence, idx) => (
              <Card key={idx}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-gray-500" />
                    <div>
                      <p className="font-medium">{evidence.file.name}</p>
                      <p className="text-sm text-gray-500">
                        {evidence.hash.slice(0, 10)}...
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {evidence.status === "pending" && (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    )}
                    {evidence.status === "processing" && (
                      <Clock className="h-5 w-5 text-blue-500 animate-spin" />
                    )}
                    {evidence.status === "verified" && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {evidence.status === "error" && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </TabsContent>

      {/* ✅ Verify Evidence */}
      <TabsContent value="verify">
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600">
              Upload a file to verify against stored evidence.
            </p>
            <Button className="mt-4">Upload for Verification</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
