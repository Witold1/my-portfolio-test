const assetBase = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Monochrome glyph from `/public/icons/{name}.svg` (inherits text color via mask). */
export default function ToolbarIcon({ name, className = '', size }) {
  const src = `${assetBase}/icons/${name}.svg`;
  return (
    <span
      className={`toolbar-icon${className ? ` ${className}` : ''}`}
      style={{
        '--toolbar-icon': `url("${src}")`,
        ...(size ? { width: size, height: size } : null),
      }}
      aria-hidden
    />
  );
}
