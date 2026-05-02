'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Link2 } from 'lucide-react';

interface SubmissionModalProps {
  isOpen: boolean;
  assignmentTitle: string;
  onClose: () => void;
  onSubmit: (data: { type: 'link' | 'file'; value: string | File }) => void;
  isLoading?: boolean;
}

export function SubmissionModal({
  isOpen,
  assignmentTitle,
  onClose,
  onSubmit,
  isLoading = false,
}: SubmissionModalProps) {
  const [linkInput, setLinkInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'link' | 'file'>('link');

  const handleLinkSubmit = () => {
    if (linkInput.trim()) {
      onSubmit({ type: 'link', value: linkInput });
      setLinkInput('');
      setFile(null);
      setActiveTab('link');
    }
  };

  const handleFileSubmit = () => {
    if (file) {
      onSubmit({ type: 'file', value: file });
      setLinkInput('');
      setFile(null);
      setActiveTab('link');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
      } else {
        alert('Please upload a PDF or Word document');
        e.target.value = '';
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="sm:max-w-md !p-5 bg-white">
        <DialogHeader>
          <DialogTitle className='!p-1 !text-slate-700'>Submit Assignment</DialogTitle>
          <DialogDescription className='!mt-1'>{assignmentTitle}</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v:any) => setActiveTab(v as 'link' | 'file')}
            >
          <TabsList className="grid w-full grid-cols-2 !px-2"
          >
            <TabsTrigger value="link" className="flex items-center gap-2  !px-2">
              <Link2 className="w-4 h-4" />
              Link
            </TabsTrigger>
            <TabsTrigger value="file" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              File
            </TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="!space-y-4">
            <div className="!space-y-3">
              <label className="text-sm font-medium !text-gray-700 !py-2">
                Paste your submission link
              </label>
              <Input
                placeholder="https://github.com/username/repo or https://codesandbox.io/..."
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                disabled={isLoading}
                className="text-sm !px-2"
              />
            </div>
            <p className="text-xs text-gray-500">
              Paste a link to your GitHub repository, CodeSandbox, or any other platform where your work is hosted.
            </p>
          </TabsContent>

          <TabsContent value="file" className="!space-y-4">
            <div className="!space-y-2">
              <label className="text-sm font-medium text-gray-700 !p-3 !mt-4">
                Upload PDF or Word document
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col items-center justify-center !pt-5 !pb-6">
                    <Upload className="w-8 h-8 text-gray-400 !mb-2" />
                    <p className="text-xs font-semibold text-gray-700">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 !mt-1">PDF or DOC (max 10MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    disabled={isLoading}
                  />
                </label>
              </div>
              {file && (
                <div className="!p-3 !bg-blue-50 border !border-blue-200 rounded-md">
                  <p className="text-sm font-medium !text-blue-900">
                    Selected: {file.name}
                  </p>
                  <p className="text-xs text-blue-700 !mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className='gap-3 !p-3'>
          <Button variant="outline" onClick={onClose} disabled={isLoading} className='!px-3 !py-3 text-foreground'>
            Cancel
          </Button>
          <Button
            onClick={() => (activeTab === 'link' ? handleLinkSubmit() : handleFileSubmit())}
            disabled={
              isLoading ||
              (activeTab === 'link' && !linkInput.trim()) ||
              (activeTab === 'file' && !file)
            }
            className='!px-3 !py-3'
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
