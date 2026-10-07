import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { personal, socials } from '../../data/portfolio';
import SectionWrapper from '../../hoc/SectionWrapper';
import { hasWebGL } from '../../utils/device';
import { fadeIn } from '../../utils/motion';
import Icon from '../ui/Icon';
import MagneticButton from '../ui/MagneticButton';
import SectionHeading from '../ui/SectionHeading';
import Toast from '../ui/Toast';

const GlobeCanvas = lazy(() => import('../canvas/GlobeCanvas'));

const EMPTY = { name: '', email: '', message: '', company: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate({ name, email, message }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Please tell me your name.';
  if (!EMAIL_RE.test(email.trim())) errors.email = 'That email doesn’t look right.';
  if (message.trim().length < 10) errors.message = 'A little more detail, please (10+ characters).';
  return errors;
}

function Field({ label, name, as = 'input', error, ...rest }) {
  const Comp = as;
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <Comp
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`mt-2 w-full resize-none rounded-xl border bg-bg/60 px-4 py-3 text-ink outline-none transition placeholder:text-muted/60 focus:border-flutter focus:ring-4 focus:ring-flutter/15 ${
          error ? 'border-red-400/60' : 'border-white/10'
        }`}
        {...rest}
      />
      {error && (
        <span id={`${name}-error`} className="mt-1.5 block text-xs text-red-300">
          {error}
        </span>
      )}
    </label>
  );
}

function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);
  const closeToast = useCallback(() => setToast(null), []);
  const notify = (type, message) => setToast({ id: Date.now(), type, message });

  const reduce = !!useReducedMotion();
  const webgl = useMemo(() => hasWebGL(), []);
  const stage = useRef(null);
  const inView = useInView(stage, { margin: '200px' });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (inView) setMounted(true);
  }, [inView]);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (form.company) return; // honeypot: bots fill hidden fields
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // No EmailJS keys yet → hand the message to the visitor's mail app instead.
    if (!serviceId || !templateId || !publicKey) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n${form.name} (${form.email})`);
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
      notify('info', 'Opening your email app to send the message…');
      return;
    }

    setSending(true);
    try {
      const { send } = await import('@emailjs/browser');
      // Variable names match EmailJS's default "Contact Us" template: {{name}}, {{email}}, {{title}}, {{time}}, {{message}}.
      await send(
        serviceId,
        templateId,
        {
          name: form.name,
          email: form.email,
          title: `New portfolio message from ${form.name}`,
          time: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' }),
          message: form.message,
        },
        { publicKey },
      );
      setForm(EMPTY);
      notify('success', 'Thanks! Your message is on its way, and I’ll get back to you soon.');
    } catch {
      notify('error', `Something went wrong. Please email me directly at ${personal.email}.`);
    } finally {
      setSending(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      notify('success', 'Email address copied to clipboard.');
    } catch {
      window.location.href = `mailto:${personal.email}`;
    }
  };

  return (
    <>
      <SectionHeading
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something <span className="text-gradient">great</span>
          </>
        }
        description="Have a project, a question or just want to say hi? My inbox is always open, and I usually reply within a day."
      />

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
        <motion.form
          variants={fadeIn('right')}
          noValidate
          onSubmit={submit}
          className="glass-fill gradient-border relative space-y-5 rounded-3xl p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" name="name" value={form.name} onChange={update} error={errors.name} placeholder="Jane Doe" autoComplete="name" />
            <Field
              label="Your email"
              name="email"
              type="email"
              value={form.email}
              onChange={update}
              error={errors.email}
              placeholder="jane@company.com"
              autoComplete="email"
            />
          </div>
          <Field
            label="Message"
            name="message"
            as="textarea"
            rows={6}
            value={form.message}
            onChange={update}
            error={errors.message}
            placeholder="Tell me about your app, role or idea…"
          />
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Company
              <input name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={update} />
            </label>
          </div>
          <MagneticButton as="button" type="submit" disabled={sending} strength={0.2} className="w-full sm:w-auto">
            {sending ? 'Sending…' : 'Send message'}
            <Icon name="send" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </MagneticButton>
        </motion.form>

        <motion.div variants={fadeIn('left')}>
          <div ref={stage} className="relative h-[340px] sm:h-[440px] lg:h-[480px]">
            <div aria-hidden="true" className="absolute inset-[20%] rounded-full bg-flutter/20 blur-[80px]" />
            {webgl && mounted && (
              <Suspense fallback={null}>
                <GlobeCanvas active={inView} reduceMotion={reduce} />
              </Suspense>
            )}
          </div>
          <div className="mt-2 flex flex-col items-center gap-4 text-center">
            <p className="flex items-center gap-2 text-sm text-muted">
              <Icon name="mapPin" className="size-4 text-teal" />
              Based in {personal.location}
            </p>
            <div className="glass flex items-center gap-1 rounded-full p-1.5 pl-5">
              <a href={`mailto:${personal.email}`} className="text-sm font-medium text-ink hover:text-flutter">
                {personal.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="ml-2 grid size-9 place-items-center rounded-full bg-white/5 text-muted transition hover:bg-flutter/15 hover:text-flutter"
              >
                <Icon name="copy" className="size-4" />
              </button>
            </div>
            <div className="flex gap-3">
              {socials
                .filter((s) => s.icon !== 'mail')
                .map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/5 text-muted transition hover:-translate-y-0.5 hover:border-flutter/60 hover:text-flutter"
                  >
                    <Icon name={s.icon} className="size-5" />
                  </a>
                ))}
            </div>
          </div>
        </motion.div>
      </div>

      <Toast toast={toast} onClose={closeToast} />
    </>
  );
}

export default SectionWrapper(Contact, 'contact');
