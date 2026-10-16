import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export async function exportToDocx(
  text: string,
  fileName: string = 'converted-sinhala-text.docx',
  fontFamily: string = 'FM-Abhaya'
) {
  if (!text) return;

  const lines = text.split('\n');
  const paragraphs = lines.map(line => {
    return new Paragraph({
      children: [
        new TextRun({
          text: line,
          font: fontFamily,
          size: 28, // 14pt in half-points
        })
      ],
      spacing: {
        after: 120, // 6pt
        line: 360,
      }
    });
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, fileName);
}

export function exportToTxt(text: string, fileName: string = 'converted-sinhala-text.txt') {
  if (!text) return;
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, fileName);
}
