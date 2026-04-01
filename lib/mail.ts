import nodemailer from "nodemailer";


const domain = process.env.NEXT_PUBLIC_PRODUCTION_URL;


export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PIN,
    },
  });


  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Welcome to Rozgar Hub",
    html: `<p>Your account verification code is ${token}</p>`,
  };

  await transporter.sendMail(mailOptions);
}






export const sendPasswordResetEmail = async (
  email: string, 
  token: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PIN,
    },
  });

  const resetLink = `${domain}/auth/new-password?token=${token}`


  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
  };

  await transporter.sendMail(mailOptions);
}






export const sendTwoFactorEmail = async (
  email: string,
  token: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PIN,
    },
  });


  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Two factor code",
    html: `<p>Your two factor code is ${token}</p>`,
  };

  await transporter.sendMail(mailOptions);
}


export const sendNewApplicationEmail = async (
  employerEmail: string,
  applicantName: string,
  jobTitle: string,
  jobSlug: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PIN,
    },
  });

  const jobUrl = `${domain}/jobs/${jobSlug}`;

  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: employerEmail,
    subject: `New application for "${jobTitle}" - Rozgar Hub`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Application Received</h2>
        <p><strong>${applicantName}</strong> has applied for your job posting:</p>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h3 style="margin: 0 0 8px 0;">${jobTitle}</h3>
          <a href="${jobUrl}" style="color: #2563eb;">View Job Posting</a>
        </div>
        <p>Log in to <a href="${domain}" style="color: #2563eb;">Rozgar Hub</a> to review the application and manage your applicants.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}


export const sendApplicationStatusEmail = async (
  seekerEmail: string,
  seekerName: string,
  jobTitle: string,
  companyName: string,
  status: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PIN,
    },
  });

  const statusMessages: Record<string, { color: string; text: string }> = {
    REVIEWED: { color: "#2563eb", text: "Your application is being reviewed" },
    ACCEPTED: { color: "#16a34a", text: "Congratulations! Your application has been accepted" },
    REJECTED: { color: "#dc2626", text: "Your application was not selected" },
  };

  const statusInfo = statusMessages[status] || { color: "#666", text: `Your application status changed to ${status}` };

  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: seekerEmail,
    subject: `Application Update: ${jobTitle} at ${companyName} - Rozgar Hub`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Application Status Update</h2>
        <p>Hi ${seekerName || "there"},</p>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h3 style="margin: 0 0 8px 0;">${jobTitle}</h3>
          <p style="margin: 4px 0; color: #666;">${companyName}</p>
          <p style="margin: 12px 0 0 0;">
            <span style="background: ${statusInfo.color}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
              ${status}
            </span>
          </p>
        </div>
        <p>${statusInfo.text}.</p>
        <p>Visit <a href="${domain}" style="color: #2563eb;">Rozgar Hub</a> to view your applications.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}