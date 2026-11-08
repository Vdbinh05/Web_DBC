'use client';

import { useState } from 'react';
import { FileText } from 'lucide-react';
import CertificateModal from '@/components/features/CertificateModal';
import Button from '@/components/ui/Button';

export default function ProductEvidenceButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" className="w-fit max-w-64 text-start" aria-haspopup="dialog" onClick={() => setIsOpen(true)}>
        <FileText className="size-4 shrink-0" aria-hidden="true" />
        Xem ảnh tài liệu và nguồn gốc
      </Button>
      <CertificateModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
