type ProbeProps = {
  label?: string
}

/** Пробный компонент окружения: показывает, что витрина собирается и рендерит. */
export function Probe({ label = 'ds окружение работает' }: ProbeProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        borderRadius: 8,
        border: '1px solid #d0d0d0',
        font: '14px/1.4 system-ui, sans-serif',
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#2fa84f',
        }}
      />
      {label}
    </div>
  )
}
