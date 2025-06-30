// import Image from "next/image";
// TODO: Import Geist Mono font for production use

export default function Home() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: 'white',
      position: 'relative',
    }}>
      {/* Top bar: 1262 x 125, 20% opacity, light gray, centered horizontally */}
      <div style={{
        width: '1262px',
        height: '125px',
        backgroundColor: 'rgba(217,217,217,0.2)',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '24px',
        margin: '0 auto',
        marginTop: '0',
        marginBottom: '32px',
        boxSizing: 'border-box',
      }}>
        <span style={{
          fontFamily: 'Geist Mono, monospace',
          fontSize: 80,
          color: '#000',
          lineHeight: 1,
        }}>home.</span>
      </div>
      {/* Main homepage content goes here */}
    </div>
  );
}
