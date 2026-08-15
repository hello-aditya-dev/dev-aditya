'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const FAQ_ITEMS = [
  {
    q: 'What format are the products in?',
    a: 'The workbooks are Excel (.xlsx) files. You can open them in Microsoft Excel, Google Sheets, LibreOffice Calc or any spreadsheet app that supports the .xlsx format. Some features like named ranges and data validation may behave differently in non-Excel apps. PDF documentation and ZIP packages are also included.',
  },
  {
    q: 'Is this a subscription?',
    a: 'No. All products are one-time purchases. You buy once, download the files and use them indefinitely. There are no recurring charges.',
  },
  {
    q: 'Can I customise the workbooks for my own workflow?',
    a: 'Yes. The workbooks are unlocked and designed to be adapted. You can add your own service categories, rename tabs, adjust formulas and extend the structure to match how you work. The documentation explains which parts to modify and which core formulas to preserve.',
  },
  {
    q: 'Can my agency team use a single purchase?',
    a: 'Yes for internal use. A single-user commercial license lets one person use the product. If multiple people in your agency need their own copies, purchase one per user. Contact for agency-wide licensing if needed.',
  },
  {
    q: 'Can I resell or redistribute these products?',
    a: 'No. The license is for your own use in your own client work. You may not resell, redistribute, share publicly or incorporate the products into something you sell to others.',
  },
  {
    q: 'Do the workbooks work in Google Sheets?',
    a: 'They can be opened in Google Sheets, but they are built and tested in Excel. Some features — particularly data validation, conditional formatting and certain formula behaviours — may not translate perfectly to Google Sheets. For the best experience, use Microsoft Excel.',
  },
  {
    q: 'How do I get the files after purchase?',
    a: 'After payment, you receive a secure download link via email. The link is time-limited and allows a set number of downloads. If you lose the files, contact support with your order details for a refreshed link.',
  },
  {
    q: 'What happens if my payment fails?',
    a: 'If the payment does not go through, no charge is made and no files are delivered. You can try again with a different payment method. If you believe you were charged but did not receive the files, contact support with your transaction details.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Because these are digital products with immediate access after purchase, refunds are generally not offered. If the product is genuinely defective or materially different from its description, contact support within 7 days of purchase to discuss a resolution.',
  },
  {
    q: 'What is the difference between a template and a tool license?',
    a: 'A tool license (for workbooks and operational systems) is a single-user commercial license — one person uses it in their own client work. A template license (for website templates) is a single-site commercial license — you may deploy the template for one end website. Both prohibit resale or redistribution.',
  },
];

export function StoreFAQ() {
  return (
    <section
      id="faq"
      className="py-16 md:py-24"
      style={{ background: '#FAF9F6' }}
    >
      <div className="mx-auto max-w-3xl px-6">
        {/* Heading */}
        <div className="mb-10">
          <span
            className="mb-3 block text-[11px] font-semibold tracking-[0.2em] uppercase"
            style={{ color: '#5E5E5F' }}
          >
            FAQ
          </span>
          <h2
            className="text-2xl font-bold tracking-tight md:text-3xl"
            style={{ color: '#0B0B0B' }}
          >
            Frequently asked questions
          </h2>
        </div>

        {/* Accordion */}
        <div
          className="rounded-xl border-2 p-4 md:p-6"
          style={{ background: '#FAF9F6', borderColor: '#0B0B0B' }}
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-b-2 last:border-b-0"
                style={{ borderColor: '#E8E7E4' }}
              >
                <AccordionTrigger
                  className="py-4 text-left text-sm font-semibold hover:no-underline md:text-base"
                  style={{ color: '#0B0B0B' }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: '#5E5E5F' }}
                  >
                    {faq.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
