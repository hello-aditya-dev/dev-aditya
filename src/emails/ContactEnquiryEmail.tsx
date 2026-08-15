/**
 * Contact enquiry email — React template rendered by Resend.
 *
 * Renders a clean, branded plain-HTML email that Aditya receives when a
 * visitor submits the /contact form. No external images, no tracking
 * pixels, no marketing fluff — just the enquiry details.
 */

import * as React from "react";

export const CONTACT_ENQUIRY_EMAIL_SUBJECT = "New website enquiry — dev-aditya.com";

export interface ContactEnquiryEmailProps {
  name: string;
  email: string;
  company: string;
  website: string;
  projectType: string;
  scope: string;
  timing: string;
  details: string;
}

function line(label: string, value: string): React.ReactElement {
  return (
    <tr>
      <td
        style={{
          padding: "6px 12px",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: "11px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#5E5E5F",
          verticalAlign: "top",
          width: "140px",
        }}
      >
        {label}
      </td>
      <td
        style={{
          padding: "6px 12px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          fontSize: "14px",
          color: "#0B0B0B",
          verticalAlign: "top",
        }}
      >
        {value || "—"}
      </td>
    </tr>
  );
}

export function ContactEnquiryEmail(props: ContactEnquiryEmailProps): React.ReactElement {
  const { name, email, company, website, projectType, scope, timing, details } = props;

  return (
    <div
      style={{
        backgroundColor: "#FAF9F6",
        padding: "32px 24px",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <table
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        style={{ maxWidth: "640px", margin: "0 auto" }}
      >
        <tbody>
          <tr>
            <td style={{ paddingBottom: "24px" }}>
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0B0B0B",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                New website enquiry
              </h1>
              <p
                style={{
                  fontSize: "13px",
                  color: "#5E5E5F",
                  margin: "4px 0 0 0",
                }}
              >
                Submitted via dev-aditya.com/contact
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <table
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #0B0B0B",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <tbody>
                  {line("Name", name)}
                  {line("Email", email)}
                  {line("Company", company)}
                  {line("Website", website)}
                  {line("Project type", projectType)}
                  {line("Scope", scope)}
                  {line("Timing", timing)}
                  <tr>
                    <td
                      style={{
                        padding: "6px 12px",
                        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#5E5E5F",
                        verticalAlign: "top",
                        width: "140px",
                      }}
                    >
                      Details
                    </td>
                    <td
                      style={{
                        padding: "6px 12px",
                        fontFamily: "ui-sans-serif, system-ui, sans-serif",
                        fontSize: "14px",
                        color: "#0B0B0B",
                        verticalAlign: "top",
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.55,
                      }}
                    >
                      {details}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style={{ paddingTop: "16px" }}>
              <p style={{ fontSize: "12px", color: "#8A8A8B", margin: 0 }}>
                Reply directly to this email to respond to {name.split(" ")[0] || "the sender"}.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/** Plain-text version for email clients that don't render HTML. */
export function contactEnquiryEmailText(props: ContactEnquiryEmailProps): string {
  const lines = [
    "New website enquiry",
    "Submitted via dev-aditya.com/contact",
    "",
    `Name: ${props.name}`,
    `Email: ${props.email}`,
    `Company: ${props.company || "—"}`,
    `Website: ${props.website || "—"}`,
    `Project type: ${props.projectType || "—"}`,
    `Scope: ${props.scope || "—"}`,
    `Timing: ${props.timing || "—"}`,
    "",
    "Details:",
    props.details,
  ];
  return lines.join("\n");
}
