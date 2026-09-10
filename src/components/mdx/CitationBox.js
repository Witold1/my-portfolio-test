'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  buildBibTeX,
  buildPlainCitation,
  formatAccessedDate,
} from '../../lib/content/citationFormats';
import { mergeCitationPageMeta } from '../../lib/content/citation';
import { slugifyHeading } from '../../lib/content/toc';
import { useCopyToClipboard } from '../../lib/useCopyToClipboard';
import { useCitationPageMeta } from './CitationContext';
import MdxLink from './MdxLink';

function CopyBtn({ label, text, title: tip }) {
  const { copied, copy } = useCopyToClipboard();
  if (!text) return null;

  return (
    <button
      type="button"
      className="mdx-citation-copy"
      title={tip || label}
      onClick={() => {
        void copy(text);
      }}
    >
      {copied ? 'Copied' : label}
    </button>
  );
}

/**
 * @param {object} props
 * @param {string} [props.title] Section heading (default “How to cite”); becomes `<h2 id>` for ToC
 * @param {string} [props.citation] Manual attribution line (overrides auto plain when set)
 * @param {string} [props.url] Link (overrides merged url when set)
 * @param {import('react').ReactNode} [props.children]
 * @param {object} [props.citeMeta] Merged on top of page context from CitationProvider
 * @param {boolean} [props.ignorePageMeta] If true, only `citeMeta` is used (no provider merge)
 * @param {boolean} [props.codeSnippet] Show BibTeX + plain snippets (default true when derived or plain text exists)
 * @param {boolean} [props.copyFormats] Copy buttons (default true)
 */
export default function CitationBox({
  title = 'How to cite',
  citation,
  url,
  children,
  citeMeta,
  ignorePageMeta = false,
  codeSnippet = true,
  copyFormats = true,
}) {
  const pageMeta = useCitationPageMeta();
  const mergedMeta = useMemo(
    () => mergeCitationPageMeta(ignorePageMeta ? null : pageMeta, citeMeta),
    [pageMeta, citeMeta, ignorePageMeta]
  );

  const [accessed, setAccessed] = useState(null);
  useEffect(() => {
    setAccessed(formatAccessedDate(new Date()));
  }, []);

  const metaWithAccess = useMemo(() => {
    if (!mergedMeta || typeof mergedMeta !== 'object') return null;
    if (!accessed) return mergedMeta;
    return {
      ...mergedMeta,
      accessed: accessed.human,
      urldate: accessed.iso,
    };
  }, [mergedMeta, accessed]);

  const derived = useMemo(() => {
    if (!metaWithAccess) return null;
    const plain = buildPlainCitation(metaWithAccess);
    const bibtex = buildBibTeX(metaWithAccess);
    return { plain, bibtex };
  }, [metaWithAccess]);

  const accessedNote = accessed ? `Accessed ${accessed.human}.` : '';

  const content = citation || children || (derived ? derived.plain : null);
  const linkUrl = url ?? mergedMeta?.url;

  const attributionSnippetText = (() => {
    if (typeof content === 'string') {
      if (!accessedNote) return content;
      if (/accessed\s+/i.test(content)) return content;
      return `${content.replace(/\s+$/, '')} ${accessedNote}`;
    }
    if (derived) return derived.plain;
    return '';
  })();

  const showSnippets =
    codeSnippet && (Boolean(attributionSnippetText) || Boolean(derived));

  if (!showSnippets && !linkUrl) return null;

  const urlAlreadyInPlain = Boolean(linkUrl && attributionSnippetText.includes(String(linkUrl).trim()));
  const plainCopyText = [attributionSnippetText || null, linkUrl && !urlAlreadyInPlain ? linkUrl : null]
    .filter(Boolean)
    .join('\n');

  const showHumanBlock = Boolean(attributionSnippetText);
  const showUrlInSnippet = Boolean(linkUrl && !urlAlreadyInPlain);
  const headingId = slugifyHeading(title);

  return (
    <section className="mdx-citation">
      <h2 id={headingId} className="mdx-citation-header">
        {title}
      </h2>

      {showSnippets ? (
        <div className="mdx-citation-subsection mdx-citation-snippet-block">
          {showHumanBlock ? (
            <div className="mdx-citation-human-block">
              <p className="mdx-citation-code-label">For human-readable attribution, please cite this work as:</p>
              <pre className="mdx-citation-bib mdx-citation-plain-snippet" aria-label="Plain text attribution">
                <code>
                  {attributionSnippetText}
                  {showUrlInSnippet ? (
                    <>
                      {'\n'}
                      <MdxLink href={linkUrl} className="mdx-citation-snippet-url">
                        {linkUrl}
                      </MdxLink>
                    </>
                  ) : null}
                </code>
              </pre>
            </div>
          ) : null}
          {derived ? (
            <>
              <p className="mdx-citation-code-label">BibTeX</p>
              <pre className="mdx-citation-bib" aria-label="BibTeX entry">
                <code>{derived.bibtex}</code>
              </pre>
            </>
          ) : null}
          {copyFormats && (plainCopyText || derived) ? (
            <div className="mdx-citation-actions" role="group" aria-label="Copy citation formats">
              {plainCopyText ? <CopyBtn label="Plain" text={plainCopyText} /> : null}
              {derived ? <CopyBtn label="BibTeX" text={derived.bibtex} /> : null}
            </div>
          ) : null}
        </div>
      ) : linkUrl ? (
        <div className="mdx-citation-subsection mdx-citation-snippet-block">
          <div className="mdx-citation-human-block">
            <p className="mdx-citation-code-label">For human-readable attribution, please cite this work as:</p>
            <pre className="mdx-citation-bib mdx-citation-plain-snippet" aria-label="Page link">
              <code>
                <MdxLink href={linkUrl} className="mdx-citation-snippet-url">
                  {linkUrl}
                </MdxLink>
                {accessedNote ? `\n${accessedNote}` : null}
              </code>
            </pre>
          </div>
          {copyFormats ? (
            <div className="mdx-citation-actions" role="group" aria-label="Copy citation formats">
              <CopyBtn
                label="Plain"
                text={[linkUrl, accessedNote].filter(Boolean).join('\n')}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
