'use client';

import { buildDiscussWithAiPrompt, discussWithAiLinks } from '../../lib/content/discussWithAi';
import { useCopyToClipboard } from '../../lib/useCopyToClipboard';
import { useSharePageUrl } from '../../lib/useSharePageUrl';
import ToolbarIcon from './ToolbarIcon';

const linkClass =
  'inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-inherit opacity-90 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 rounded px-1.5 py-1 transition-colors';

const iconWrapClass =
  'inline-flex items-center justify-center w-7 h-7 rounded bg-black/5 dark:bg-white/10 shrink-0';

const ICONS = {
  perplexity: 'discuss-perplexity',
  chatgpt: 'discuss-chatgpt',
  claude: 'discuss-claude',
  gemini: 'discuss-gemini',
};

/**
 * Footer row: open the current content page in Perplexity / ChatGPT / Claude / Gemini,
 * or copy the same prompt to the clipboard.
 */
export default function DiscussWithAi({
  pageUrl: pageUrlProp,
  pagePath,
  title,
  pageKind = 'article',
  label = 'Discuss with AI',
  className = '',
}) {
  const { copied, copy } = useCopyToClipboard();
  const pageUrlFromPath = useSharePageUrl(pagePath || null);
  const pageUrl = pageUrlProp || pageUrlFromPath;
  const prompt = pageUrl ? buildDiscussWithAiPrompt({ pageUrl, title, pageKind }) : '';

  if (!pageUrl) return null;

  const links = discussWithAiLinks({ pageUrl, title, pageKind });

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${className}`.trim()}>
      <span className="shrink-0">{label}</span>
      <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
        {links.map((item) => {
          const icon = ICONS[item.key];
          return (
            <a
              key={item.key}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              title={`Discuss with ${item.label}`}
              aria-label={`Discuss this ${pageKind} with ${item.label}`}
            >
              <span className={iconWrapClass}>
                {icon ? <ToolbarIcon name={icon} size="1rem" /> : null}
              </span>
              {item.label}
            </a>
          );
        })}
        <button
          type="button"
          onClick={() => {
            void copy(prompt);
          }}
          className={linkClass}
          title={copied ? 'Copied' : 'Copy AI chat starter'}
          aria-label={
            copied ? 'AI chat starter copied' : 'Copy AI chat starter to clipboard'
          }
        >
          <span className={iconWrapClass}>
            <ToolbarIcon name={copied ? 'share-check' : 'share-copy'} size="1rem" />
          </span>
          {copied ? 'Copied' : 'Copy AI chat starter'}
        </button>
      </div>
    </div>
  );
}
