export default function Notes() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: 'white',
      position: 'relative',
    }}>
      <div style={{
        position: 'relative',
        left: 0,
        width: 'calc(100vw - 250px)', // Sidebar is 250px
        height: '125px',
        backgroundColor: 'rgba(217,217,217,0.2)',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '24px',
        margin: 0,
        marginBottom: '32px',
        boxSizing: 'border-box',
      }}>
        <span style={{
          fontFamily: 'Geist Mono, monospace',
          fontSize: 80,
          color: '#000',
          lineHeight: 1,
        }}>notes.</span>
      </div>
    </div>
  );
} 