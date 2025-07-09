import React from 'react';
import Particles from 'react-tsparticles';
import { loadStarsPreset } from 'tsparticles-preset-stars';

const ParticleBackground = () => {
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
            {/* Starfield */}
            <div style={{
                position: 'absolute',
                inset: 0,
            }}>
                <Particles
                    id="tsparticles"
                    init={async (main) => await loadStarsPreset(main)}
                    options={{
                        preset: 'stars',
                        background: { color: '#0a0a1a' },
                        fullScreen: { enable: false },
                        particles: {
                            number: { value: 60 },
                            color: { value: '#fff' },
                            opacity: { value: 0.8 },
                            size: { value: { min: 0.5, max: 3 } },
                            move: {
                                enable: true,
                                speed: 1,
                                direction: 'none',
                                random: true,
                                straight: false,
                                outModes: { default: 'out' },
                            },
                        },
                        interactivity: {
                            events: {
                                onHover: { enable: true, mode: 'repulse' },
                            },
                        },
                    }}
                    style={{ position: 'absolute', inset: 0 }}
                />
            </div>
            {/* Nebula gradient overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at 70% 20%, rgba(127,85,255,0.18) 0%, rgba(0,0,0,0) 60%), radial-gradient(ellipse at 20% 80%, rgba(0,200,255,0.13) 0%, rgba(0,0,0,0) 70%)',
                zIndex: 1,
                pointerEvents: 'none',
            }} />
            {/* Planet at the bottom */}
            <div style={{
                position: 'absolute',
                left: '50%',
                bottom: '-8vh',
                transform: 'translateX(-50%)',
                width: '80vw',
                height: '18vh',
                background: 'radial-gradient(ellipse at center, #23234a 60%, #7f5cff44 100%)',
                borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
                boxShadow: '0 -8px 64px 16px #7f5cff33',
                zIndex: 2,
                opacity: 0.85,
                pointerEvents: 'none',
            }} />
        </div>
    );
};

export default ParticleBackground;