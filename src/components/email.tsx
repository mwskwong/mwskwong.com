import { FC } from 'react';

import { firstName } from '@/constants/content';

export interface ContactFormSubmissionNotificationProps {
  name: string;
  message: string;
  email?: string;
}

export const ContactFormSubmissionNotification: FC<
  ContactFormSubmissionNotificationProps
> = ({ name, message, email }) => {
  return (
    <div>
      <p>Hi {firstName},</p>
      <p>
        You got a new message from {name} &lt;{email}&gt;:
      </p>
      <pre
        style={{ fontFamily: 'sans-serif', borderRight: `2px solid #CDD7E1` }}
      >
        <blockquote>
          <p>{message}</p>
        </blockquote>
      </pre>
    </div>
  );
};

export interface ContactFormSubmissionAcknowledgementProps {
  name: string;
}

export const ContactFormSubmissionAcknowledgement: FC<
  ContactFormSubmissionAcknowledgementProps
> = ({ name }) => {
  return (
    <div>
      <p>Hi {name},</p>
      <p>
        Thank you for reaching out. I just wanted to let you know that I&apos;ve
        received your message, and I appreciate you taking the time to write to
        me. I aim to reply within 48 hours, so you&apos;ll hear from me soon.
      </p>
      <p>
        If you&apos;re reaching out with something time-sensitive, please reply
        this email and put &quot;URGENT&quot; in the subject line of your email
        if you decide to follow up, and I&apos;ll do my best to prioritize your
        message.
      </p>
      <p>
        Warm regards,
        <br />
        {firstName}
      </p>
      <hr />
      <p>
        <small>
          **Please note: This is an automated response. Your email has not been
          read yet, but it will be soon!**
        </small>
      </p>
    </div>
  );
};
