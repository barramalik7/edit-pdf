import {
    FileText,
    Scissors,
    Minimize2,
    FileType,
    Image as ImageIcon,
    Lock,
    Unlock,
    RotateCw,
    Type,
    PenTool,
    Layers,
    Settings,
    ArrowRightLeft,
} from "lucide-react";
import type { Tool } from "@/components/home/ToolCard";

export const toolsData: Tool[] = [
    {
        id: "merge",
        title: "Merge PDF",
        description:
            "Combine PDFs in the order you want with the easiest PDF merger available.",
        icon: Layers,
        href: "/merge-pdf",
        allowMultiple: true,
    },
    {
        id: "split",
        title: "Split PDF",
        description:
            "Separate one page or a whole set for easy conversion into independent PDF files.",
        icon: Scissors,
        href: "/split-pdf",
    },
    {
        id: "compress",
        title: "Compress PDF",
        description:
            "Reduce file size while optimizing for maximal PDF quality.",
        icon: Minimize2,
        href: "/compress-pdf",
    },
    {
        id: "pdf-to-word",
        title: "PDF to Word",
        description:
            "Easily convert your PDF files into easy to edit DOC and DOCX documents.",
        icon: FileText,
        href: "/pdf-to-word",
    },
    {
        id: "pdf-to-powerpoint",
        title: "PDF to PowerPoint",
        description: "Turn your PDF files into easy to edit PPT and PPTX slideshows.",
        icon: FileType,
        href: "/pdf-to-powerpoint",
    },
    {
        id: "pdf-to-excel",
        title: "PDF to Excel",
        description:
            "Pull data straight from PDFs into Excel spreadsheets in a few short seconds.",
        icon: FileType,
        href: "/pdf-to-excel",
    },
    {
        id: "word-to-pdf",
        title: "Word to PDF",
        description:
            "Make DOC and DOCX files easy to read by converting them to PDF.",
        icon: FileText,
        href: "/word-to-pdf",
    },
    {
        id: "powerpoint-to-pdf",
        title: "PowerPoint to PDF",
        description:
            "Make PPT and PPTX slideshows easy to view by converting them to PDF.",
        icon: FileType,
        href: "/powerpoint-to-pdf",
    },
    {
        id: "excel-to-pdf",
        title: "Excel to PDF",
        description:
            "Make EXCEL spreadsheets easy to read by converting them to PDF.",
        icon: FileType,
        href: "/excel-to-pdf",
    },
    {
        id: "edit",
        title: "Edit PDF",
        description:
            "Add text, images, shapes or freehand annotations to a PDF document.",
        icon: PenTool,
        href: "/edit-pdf",
    },
    {
        id: "pdf-to-jpg",
        title: "PDF to JPG",
        description:
            "Convert each PDF page into a JPG or extract all images contained in a PDF.",
        icon: ImageIcon,
        href: "/pdf-to-jpg",
    },
    {
        id: "jpg-to-pdf",
        title: "JPG to PDF",
        description:
            "Convert JPG images to PDF in seconds. Easily adjust orientation and margins.",
        icon: ImageIcon,
        href: "/jpg-to-pdf",
    },
    {
        id: "sign",
        title: "Sign PDF",
        description: "Sign yourself or request electronic signatures from others.",
        icon: Type,
        href: "/sign-pdf",
    },
    {
        id: "watermark",
        title: "Watermark",
        description:
            "Stamp an image or text over your PDF in seconds. Choose the typography, transparency and position.",
        icon: Settings,
        href: "/watermark",
    },
    {
        id: "rotate",
        title: "Rotate PDF",
        description:
            "Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!",
        icon: RotateCw,
        href: "/rotate-pdf",
    },
    {
        id: "unlock",
        title: "Unlock PDF",
        description:
            "Remove PDF password security, giving you the freedom to use your PDFs as you want.",
        icon: Unlock,
        href: "/unlock-pdf",
    },
    {
        id: "protect",
        title: "Protect PDF",
        description:
            "Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access.",
        icon: Lock,
        href: "/protect-pdf",
    },
    {
        id: "organize",
        title: "Organize PDF",
        description:
            "Sort pages of your PDF file however you like. Delete PDF pages or add PDF pages to your document.",
        icon: Settings,
        href: "/organize-pdf",
    },
    {
        id: "pdf-to-pdfa",
        title: "PDF to PDF/A",
        description:
            "Transform your PDF to PDF/A, the ISO-standardized version of PDF for long-term archiving.",
        icon: FileText,
        href: "/pdf-to-pdfa",
    },
    {
        id: "repair",
        title: "Repair PDF",
        description:
            "Repair a damaged PDF and recover data from corrupt PDF. Fix PDF files with our Repair tool.",
        icon: Settings,
        href: "/repair-pdf",
    },
    {
        id: "page-numbers",
        title: "Page Numbers",
        description:
            "Add page numbers into PDFs with ease. Choose your positions, dimensions, typography.",
        icon: Type,
        href: "/page-numbers",
    },
    {
        id: "scan-to-pdf",
        title: "Scan to PDF",
        description:
            "Capture document scans from your mobile device and send them instantly to your browser.",
        icon: ArrowRightLeft,
        href: "/scan-to-pdf",
        isNew: true,
    },
    {
        id: "ocr",
        title: "OCR PDF",
        description:
            "Convert scanned PDFs and images into editable Word, Excel, and PPT documents.",
        icon: Type,
        href: "/ocr-pdf",
    },
    {
        id: "compare",
        title: "Compare PDF",
        description:
            "Show side-by-side comparison. Easily spot changes between different file versions.",
        icon: ArrowRightLeft,
        href: "/compare-pdf",
        isNew: true,
    },
];
